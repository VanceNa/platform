import Vue from 'vue'
import Vuex from 'vuex'
import global from '@/global.js'
import compose from './compose'
import qaStore from './qaStore'
import algorithmStore from './algorithmStore'
import portraitStore from './portraitStore'
import webrtcStore from './webrtcStore'
import tabStore from './tabStore'
import menuStore from './menuStore'
import metaStore from './metaStore'
import modelStore from './modelStore'

Vue.use(Vuex)

export const baseStore = {
  state: {
    userInfo: {
      name: '',
      isLogin: false,
    },
    isHrisLogin: false, // 是否登录人机融合接口
    // tabs: [],
    activeKey: '',
    token: null,
    headInfo: {
      Title: '',
      Data: '',
    },
    comInfo: {
      Data: '',
      Data2: '',
    },
    baseURL: global.baseUrl,
    iframeUrl: [],
    isLoginPage: true,
    recordingPlayPage: {
      from: '',
      frompage: '',
      callId: '',
      recordId: '',
      callName: '',
      callIDs: '',
      engineID: '',
      checkedRecordList: [],
    },
    playerInfo: {
      page: '', // 播放器界面属于哪个界面

      voiceTotalTime: '',
      currentTime: '',
      timeSection: [],
      exist: false,
      extendClassName: '',
      maxCallback: null, // 播放器最大化回调事件
    },
    actInfo: {
      departmentID:'',
    },
  },
  mutations: {
    setName: function(state, name) {
      state.userInfo.name = name
    },

    setIsLoginPage(state, flag) {
      state.isLoginPage = flag
    },

    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      console.log('token has been set')
    },
    logOut(state) {
      state.token = null
      state.tabs = []
      localStorage.setItem('menuList', null)
      state.menu.leftNavigations = []
      localStorage.removeItem('token')
    },

    logOutInpage(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setHeadInfo(state, headInfo) {
      state.headInfo = headInfo
    },
    setComInfo(state, comInfo) {
      state.comInfo = comInfo
    },
    setHrisLogin(state, payload) {
      state.isHrisLogin = payload
    },
  },
}

export default new Vuex.Store(
  compose(
    qaStore,
    baseStore,
    portraitStore,
    algorithmStore,
    webrtcStore,
    tabStore,
    menuStore,
    metaStore,
    modelStore
  )
)
