import { getSingerListRequest, getHotSingerListRequest } from '../../../api/request';
import {
  CHANGE_SINGER_LIST,
  CHANGE_CATEGORY,
  CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './constant';

import { fromJS } from 'immutable';

const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data
});

const changeCategory = (data) => ({
  type: CHANGE_CATEGORY,
  data
});

const changeAlpha = (data) => ({
  type: CHANGE_ALPHA,
  data
});

//进场loading
const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

//滑动最底部loading
const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});

//顶部下拉刷新loading
const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
})

//第一次加载热门歌手
const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      dispatch(changeSingerList(res.artists))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false));
    }).catch(err => {
      console.log('热门歌手数据获取失败')
    })
  }
}

//加载更多热门歌手
const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(err => {
      console.log('歌手数据获取失败')
    })
  }
}

//第一次加载对应类别的歌手
const getSingerList = () => {
  return (dispatch, getState) => {
    const category = getState().getIn(['singers', 'category']);
    const alpha = getState().getIn(['singers', 'alpha']);
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

//加载更多歌手
const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

export {
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading,
  changeCategory,
  changeAlpha,
  getHotSingerList,
  refreshMoreHotSingerList,
  getSingerList,
  refreshMoreSingerList
}