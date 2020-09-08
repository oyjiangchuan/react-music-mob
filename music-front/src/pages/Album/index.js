import React, { useState, useRef, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './../../baseUI/header/index';
import { CSSTransition } from 'react-transition-group';
import { Container, TopDesc, Menu } from './style';
import style from "../../assets/global-style";
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import MusicNote from "../../baseUI/music-note/index";
import { isEmptyObject } from './../../api/utils';
import { getAlbumList, changeEnterLoading } from './store/actionCreators';
import SongList from "../../components/SongList/index";

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const id = props.match.params.id;
  const HEADER_HEIGHT = 45
  const { getAlbumDataDispatch } = props;
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  // 同时将 mock 数据的代码删除
  let currentAlbum = currentAlbumImmutable.toJS();

  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);// 是否跑马灯
  const headerEl = useRef();
  const musicNoteRef = useRef();
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, [])
  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom = headerEl.current;
    // 滑过顶部的高度开始变化
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  // MusicNote组件中的startAnimation方法
  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({ x, y });
  };
  // 组件模板
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    )
  }
  const renderMenu = () => {
    return (
      <Menu>
        <div><i className="iconfont">&#xe6ad;</i>评论</div>
        <div><i className="iconfont">&#xe86f;</i>点赞</div>
        <div><i className="iconfont">&#xe62d;</i>收藏</div>
        <div><i className="iconfont">&#xe606;</i>更多</div>
      </Menu>
    )
  }
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack} /* 在退出动画执行结束时跳转路由 */
    >
      <Container>
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongList songs={currentAlbum.tracks} showCollect={false} musicAnimation={musicAnimation}>
              </SongList>
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading></Loading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
})
const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));