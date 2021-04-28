import axios from '@/util/http'

export default {
  actions: {
    loadAlgorithms(context) {
      return axios
        .get(global.aiApi + '/algorithms/cla/listWithAlg')
        .then((res) => {
          const body = res.data
          const { code, message, data } = body
          if (code !== 0) {
            Promise.reject(message)
          } else {
            context.commit('setAlgorithms', data)
          }
        })
    },
  },
  state: {
    algorithmStore: {
      backDestinationStack: [],

      algorithms: [],
      algorithmsLibrary:[],
      defaultAlgorithm: {},
    },
  },
  mutations: {
    registerBackDestination(state, data) {
      if (data && data.call) {
        state.algorithmStore.backDestinationStack.push(data)
      } else {
        throw Error('invalid Function')
      }
    },
    resetGoBackStack(state) {
      state.algorithmStore.backDestinationStack = []
    },
    triggerGoBackTo(state) {
      if (state.algorithmStore.backDestinationStack.length > 1) {
        const func = state.algorithmStore.backDestinationStack.pop()
        func()
      } else if (state.algorithmStore.backDestinationStack.length == 1) {
        state.algorithmStore.backDestinationStack[0]()
      }
    },

    setAlgorithms(state, data) {
      data.forEach((item) => {
        if (item.algs.length > 0) {
          item.algs.forEach((i) => {
            i['parentId'] = item.id
          })
        }
      })
      state.algorithmStore.algorithms = data
      state.algorithmStore.algorithmsLibrary = data
      // 设置默认选中第一个算法
      state.algorithmStore.defaultAlgorithm = data[0].algs[0] || {}
      state.algorithmStore.algorithms.get = (cIndex, aIndex) => {
        return this.state.algorithmStore.algorithms[cIndex].algs[aIndex]
      }
    },
  },
}
