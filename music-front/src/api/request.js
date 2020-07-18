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

export { getBannerRequest, getRecommendListRequest, getHotSingerListRequest, getSingerListRequest };