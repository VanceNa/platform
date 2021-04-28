export default {
  state: {
    user: '', // 登录用户
    sessionid: '', // 会话id
    isApplyAgain: true, // 是否需要重新申请 - 用于分机申请接口请求失败时 - 默认为true, 第一次进入页面时候需要申请

    accountInfo: {},
    isRegisterSuccessOnce: false, // 之前是否注册成功过 - 成功过则请求失败时需要续签 | 没有成功过则直接提示注册失败
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSessionid(state, sessionid) {
      state.sessionid = sessionid
    },
    setIsApplyAgain(state, isApplyAgain) {
      state.isApplyAgain = isApplyAgain
    },
    setAccountInfo(state, accountInfo) {
      state.accountInfo = accountInfo
    },
    setIsRegisterSuccessOnce(state, isRegisterSuccessOnce) {
      state.isRegisterSuccessOnce = isRegisterSuccessOnce
    },
  },
  actions: {},
}
