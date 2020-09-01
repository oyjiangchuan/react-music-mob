import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { playMode } from '../../../api/config';

const defaultState = fromJS({
  fullScreen: false,  // 播放器是否为全屏播放
  playing: false,    // 是否播放当前歌曲
  sequencePlayList: [
    {
      name: '拾梦纪',
      id: 1416767593,
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },

      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      publishTime: 0,
      rurl: null
    },
    {
      name: "木偶人",
      id: 1374051000,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5781,
          name: "薛之谦",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "",
      fee: 8,
      v: 10,
      crbt: null,
      cf: "",
      al: {
        id: 80003734,
        name: "尘",
        picUrl: "https://p1.music.126.net/DHUrNjC-1d6Snpcfg20Umw==/109951164583315133.jpg",
        tns: [],
        pic_str: "109951164583315133",
        pic: 109951164583315140
      },
      dt: 286627,
      h: {
        br: 320000,
        fid: 0,
        size: 11467799,
        vd: -33123
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6880697,
        vd: -30512
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4587146,
        vd: -28813
      },
      a: null,
      cd: "01",
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mst: 9,
      cp: 22036,
      mv: 10875070,
      rtype: 0,
      rurl: null,
      publishTime: 1561478400000
    },
    {
      name: "我好像在哪见过你",
      id: 417859631,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5781,
          name: "薛之谦",
          tns: [],
          alias: []
        }
      ],
      alia: [
        "电影《精灵王座》主题曲"
      ],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 76,
      crbt: null,
      cf: "",
      al: {
        id: 34780271,
        name: "初学者",
        picUrl: "https://p1.music.126.net/hti_a0LADoFMBHvOBwAtRA==/1369991500930171.jpg",
        tns: [],
        pic: 1369991500930171
      },
      dt: 279145,
      h: {
        br: 320000,
        fid: 0,
        size: 11168958,
        vd: -2
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6701392,
        vd: 0
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4467609,
        vd: -2
      },
      a: null,
      cd: "1",
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 5342354,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1466611202051
    }
  ], // 顺序列表(之后会有随机播放模式，列表会乱，拿着个保存顺序列表)
  playList: [
    {
      name: '拾梦纪',
      id: 1416767593,
      ftype: 0,
      djId: 0,
      a: null,
      cd: '01',
      crbt: null,
      no: 1,
      st: 0,
      rt: '',
      cf: '',
      alia: [
        '手游《梦幻花园》苏州园林版推广曲'
      ],
      rtUrls: [],
      fee: 0,
      s_id: 0,
      copyright: 0,
      h: {
        br: 320000,
        fid: 0,
        size: 9400365,
        vd: -45814
      },
      mv: 0,
      al: {
        id: 84991301,
        name: '拾梦纪',
        picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
        tns: [],
        pic_str: '109951164627180052',
        pic: 109951164627180050
      },

      l: {
        br: 128000,
        fid: 0,
        size: 3760173,
        vd: -41672
      },
      rtype: 0,
      m: {
        br: 192000,
        fid: 0,
        size: 5640237,
        vd: -43277
      },
      cp: 1416668,
      mark: 0,
      rtUrl: null,
      mst: 9,
      dt: 234947,
      ar: [
        {
          id: 12084589,
          name: '妖扬',
          tns: [],
          alias: []
        },
        {
          id: 12578371,
          name: '金天',
          tns: [],
          alias: []
        }
      ],
      pop: 5,
      pst: 0,
      t: 0,
      v: 3,
      publishTime: 0,
      rurl: null
    },
    {
      name: "木偶人",
      id: 1374051000,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5781,
          name: "薛之谦",
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: "",
      fee: 8,
      v: 10,
      crbt: null,
      cf: "",
      al: {
        id: 80003734,
        name: "尘",
        picUrl: "https://p1.music.126.net/DHUrNjC-1d6Snpcfg20Umw==/109951164583315133.jpg",
        tns: [],
        pic_str: "109951164583315133",
        pic: 109951164583315140
      },
      dt: 286627,
      h: {
        br: 320000,
        fid: 0,
        size: 11467799,
        vd: -33123
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6880697,
        vd: -30512
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4587146,
        vd: -28813
      },
      a: null,
      cd: "01",
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mst: 9,
      cp: 22036,
      mv: 10875070,
      rtype: 0,
      rurl: null,
      publishTime: 1561478400000
    },
    {
      name: "我好像在哪见过你",
      id: 417859631,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5781,
          name: "薛之谦",
          tns: [],
          alias: []
        }
      ],
      alia: [
        "电影《精灵王座》主题曲"
      ],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 76,
      crbt: null,
      cf: "",
      al: {
        id: 34780271,
        name: "初学者",
        picUrl: "https://p1.music.126.net/hti_a0LADoFMBHvOBwAtRA==/1369991500930171.jpg",
        tns: [],
        pic: 1369991500930171
      },
      dt: 279145,
      h: {
        br: 320000,
        fid: 0,
        size: 11168958,
        vd: -2
      },
      m: {
        br: 192000,
        fid: 0,
        size: 6701392,
        vd: 0
      },
      l: {
        br: 128000,
        fid: 0,
        size: 4467609,
        vd: -2
      },
      a: null,
      cd: "1",
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 5342354,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1466611202051
    }
  ],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1,  // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', action.data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', action.data);
    case actionTypes.SET_SEQUECE_PLAYLIST:
      return state.set('sequencePlayList', action.data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', action.data);
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', action.data);
    case actionTypes.SET_PLAYLIST:
      return state.set('playList', action.data);
    case actionTypes.SET_PLAY_MODE:
      return state.set('mode', action.data);
    case actionTypes.SET_SHOW_PLAYLIST:
      return state.set('showPlayList', action.data);
    default:
      return state;
  }
}