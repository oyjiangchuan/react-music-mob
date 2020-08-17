import { axiosInstance } from './config';

const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};

export const getAlbumDetailRequest = id => {
  return axiosInstance.get (`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export { getBannerRequest, getRecommendListRequest, getHotSingerListRequest, getSingerListRequest };