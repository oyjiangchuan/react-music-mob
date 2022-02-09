import * as actionTypes from './constant';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => { // 这里必须返回一个函数 必须使用函数包裹一层才不会报错
  return (dispatch) => {
    getBannerRequest().then(res => {
      dispatch(changeBannerList(res.banners))
    }).catch(err => {
      console.log('轮播图数据传输错误');
    })
  }
}

export const getRecommendList = () => { // 这里必须返回一个函数 必须使用函数包裹一层才不会报错
  return (dispatch) => {
    getRecommendListRequest().then(res => {
      dispatch(changeRecommendList(res.result));
      dispatch(changeEnterLoading(false));// 改变 loading
    }).catch(err => {
      console.log('推荐歌单数据传输错误');
    })
  }
}