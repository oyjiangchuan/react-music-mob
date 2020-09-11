import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MiniPlayer from './miniPlayer/index';
import NormalPlayer from './normalPlayer/index';
import PlayList from './playList/index';
import { getSongUrl, isEmptyObject, findIndex, shuffle } from '../../api/utils';
import {
  changeCurrentSong,
  changeCurrentIndex,
  changeFullScreen,
  changePlayList,
  changePlayMode,
  changePlayingState,
  changeShowPlayList
} from './store/actionCreators';
import Toast from '../../baseUI/toast/index';
import { playMode } from '../../api/config';

function Player(props) {
  const { fullScreen, playing, currentIndex, currentSong: immutableCurrentSong, playList: immutablePlayList, mode, sequencePlayList: immutableSequencePlayList } = props;
  const { toggleFullScreenDispatch, togglePlayingDispatch, togglePlayListDispatch, changeCurrentIndexDispatch, changeCurrentDispatch, changeModeDispatch, changePlayListDispatch } = props;
  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const [modeText, setModeText] = useState("");
  const songReady = useRef(true);
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const audioRef = useRef();
  const toastRef = useRef();
  // 播放暂停按钮
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  }
  // 根据时间进度条的百分比计算需要当前播放的时间
  const onProgressChange = (curPercent) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }
  // 更新当前的播放时间 通过audio标签的onTimeUpdate
  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };
  // 单曲循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    audioRef.current.play();
  }
  // 上一曲
  const handlePrev = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length -1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }
  // 下一曲
  const handleNext = () => {
    // 播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }
  // 改变播放模式
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      // 顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      // 单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show(); // 拿到子组件ref的方法进行调用
  }
  // 歌曲播放完之后的处理
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  }
  // 歌曲播放出错异常处理
  const handleError = () => {
    songReady.current = true;
    alert("播放出错")
  }
  
  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current // 标志位为false
    )
      return;
    let current = playList[currentIndex];
    changeCurrentDispatch(current);//赋值currentSong
    setPreSong(current);
    songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    audioRef.current.src = getSongUrl(current.id);
    // audioRef.current.autoplay = true;
    setTimeout(() => {
      // 注意play方法返回的是一个promise对象
      audioRef.current.play().then(() => {
        songReady.current = true; // 当歌曲能播放时 将歌曲的准备播放状态设置为true
      });
    });
    togglePlayingDispatch(true);//播放状态
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长 |0表示向下取整(位运算符)
    // eslint-disable-next-line
  }, [playList, currentIndex]);

  // 根据playing切换音乐(audio标签)播放和暂停
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
    // eslint-disable-next-line
  }, [playing])

  return (
    <div>
      {isEmptyObject(currentSong) ? null :
        <MiniPlayer
          percent={percent}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
          clickPlaying={clickPlaying}
        />
      }
      {isEmptyObject(currentSong) ? null :
        <NormalPlayer
          percent={percent}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
          clickPlaying={clickPlaying}
          duration={duration}//总时长
          currentTime={currentTime}//播放时间
          mode={mode}
          onProgressChange={onProgressChange}
          changeMode={changeMode}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      }
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} onError={handleError}></audio>
      <Toast ref={toastRef} text={modeText}></Toast>
      <PlayList></PlayList>
    </div>
  )
}

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  mode: state.getIn(["player", "mode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),
});

const mapDisPatchToProps = (dispatch) => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data));
    },
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(React.memo(Player));