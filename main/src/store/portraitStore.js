import axios from '@/util/http'

export default {
  actions: {
    loadPortraitStoreGroupings(context) {
      return (
        axios
          .get(global.dmpUrl + '/user/profile/data/group')
          // .tap(console.log)
          .then((res) => {
            let { code, data, message } = res.data

            if (code !== 0) {
              return Promise.reject(message)
            } else {
              context.commit('setPortraitStoreGroupings', data)
            }
          })
      )
    },

    loadPortraitStoreColumns(context) {
      return (
        axios
          .get(global.dmpUrl + '/user/profile/columns')
          // .tap(console.log)
          .then((res) => {
            let { code, data, message } = res.data
            console.log(res)

            if (code !== 0) {
              return Promise.reject(message)
            } else {
              console.log('commit')
              context.commit(
                'setRemotePortraitStoreColumns',
                JSON.parse(JSON.stringify(data))
              )
              context.commit('setPortraitStoreColumns', data)
              return data
            }
          })
      )
    },

    syncPortraitStoreColumns(context, { withLocal }) {
      withLocal
        ? context.commit(
            'setRemotePortraitStoreColumns',
            JSON.parse(JSON.stringify(context.state.portraitStore.columns))
          )
        : context.commit(
            'setPortraitStoreColumns',
            JSON.parse(
              JSON.stringify(context.state.portraitStore.remoteColumns)
            )
          )
    },
  },
  state: {
    portraitStore: {
      columns: [],
      remoteColumns: [],
      groupings: [],
    },
  },
  mutations: {
    setRemotePortraitStoreColumns(state, data) {
      state.portraitStore.remoteColumns = data
    },
    setPortraitStoreColumns(state, data) {
      state.portraitStore.columns = data
    },
    setPortraitStoreGroupings(state, data) {
      state.portraitStore.groupings = data
    },
    setColumnCheckStateChange(state, { id, checked }) {
      const found = state.portraitStore.columns.filter(
        (column) => column.id === id
      )
      !!found[0] && (found[0].display = checked)
    },
  },
}
