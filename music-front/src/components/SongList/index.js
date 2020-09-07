import React, { useState, useEffect } from "react";
import { SongList, SongItem } from "./style";
import { getName } from "../../api/utils";
import { changePlayList, changeCurrentIndex, changeSequecePlayList } from "../../pages/Player/store/actionCreators";
import { connect } from 'react-redux';

const SongsList = React.forwardRef((props, refs) => {

  const [startIndex, setStartIndex] = useState(0);

  const { collectCount, showCollect, songs, loading=false} = props;

  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    // changePlayListDispatch(songs);
    // changeSequecePlayListDispatch(songs);
    // changeCurrentIndexDispatch(index);
  };

  // useEffect(() => {
  //   if(!loading) return;
  //   if(startIndex + 1 + ONE_PAGE_COUNT >= totalCount)
  //     return;
  //   setStartIndex(startIndex + ONE_PAGE_COUNT);
  // }, [loading, startIndex, totalCount]);

  let songList = (list) => {
    let res = [];
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      res.push(
        <li key={item.id} onClick={(e) => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} - {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      )
    }
    return res;
  };

  const collect = (count) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span>收藏({Math.floor(count / 1000) / 10}万)</span>
      </div>
    )
  }

  return (
    <SongList ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>
        {songList(songs)}
      </SongItem>
    </SongList>
  )
})

const mapStateToProps = (state) => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playing: state.getIn(["player", "playing"]),
  currentSong: state.getIn(["player", "currentSong"]),
  // scrollY: state.getIn("album", "scrollY")
});

const mapDisPatchToProps = (dispatch) => {
  return {
    changePlayListDispatch(data){
      dispatch(changePlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(changeCurrentIndex(data));
    },
    changeSequecePlayListDispatch(data) {
      dispatch(changeSequecePlayList(data))
    }
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(React.memo(SongsList));