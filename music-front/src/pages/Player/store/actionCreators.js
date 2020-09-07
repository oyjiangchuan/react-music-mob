import {
  SET_CURRENT_SONG,
  SET_CURRENT_INDEX,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_SEQUECE_PLAYLIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_SHOW_PLAYLIST,
  SET_INSERT_SONG,
  SET_DELETE_SONG
} from './constants';
import { fromJS } from 'immutable';
import { getSongDetailRequest } from '../../../api/request';

export const changeCurrentSong = (data) => ({
  type: SET_CURRENT_SONG,
  data: fromJS(data)
});

export const changeCurrentIndex = (data) => ({
  type: SET_CURRENT_INDEX,
  data: fromJS(data)
});

export const changeFullScreen = (data) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequecePlayList = (data) => ({
  type: SET_SEQUECE_PLAYLIST,
  data: fromJS(data)
});

export const changePlayList = (data) => ({
  type: SET_PLAYLIST,
  data: fromJS(data)
});

export const changePlayMode = (data) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeShowPlayList = (data) => ({
  type: SET_SHOW_PLAYLIST,
  data
});

export const insertSong = (data) => ({
  type: SET_INSERT_SONG,
  data
})

export const deleteSong = (data) => ({
  type: SET_DELETE_SONG,
  data
})

export const getSongDetail = (id) => {
  return (dispatch) => {
    getSongDetailRequest(id).then(data => {
      let song = data.songs[0];
      console.log(song)
      dispatch(insertSong(song));
    })
  }
}