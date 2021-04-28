import axios from '@/util/http'

export default {
  actions: {
    initMetadata(context) {
      return Promise.all([
        axios
          .get('/sys/logo/queryLoginImg.do', { params: { flag: 1 } })
          .then((res) => {
            let r = res.data
            if (r.code == 0) {
              if (r.data && r.data.png) {
                const logoUrl = 'data:image/png;base64,' + r.data.png

                context.commit('setLogoUrl', logoUrl)
              }
            } else {
              console.log(r.message)
            }
          }),
        axios
          .get(hrmApi + '/defaultIndex/companyCopyRight.do', {})
          .then((res) => {
            context.commit('setCopyrights', {
              copyRight: res.data.Data2,
              version: res.data.Data,
            })
          })
          .catch((err) => {
            console.log(err)
          }),

        axios
          .get('/sys/logo/queryDescs.do', { params: { flag: 1 } })
          .then((res) => {
            let r = res.data
            if (r.code == 0) {
              if (r.data && r.data.desc) {
                context.commit('setLogoName', r.data.desc)
              }
            } else {
              console.log(r.message)
            }
          }),

        axios
          .get(hrmApi + '/userLogin/playformIcon.do', {})
          .then((res) => {
            const platformDescribe = res.data.Data
            const platformTitle = res.data.Title

            context.commit('setPlatformDescription', {
              platformDescribe,
              platformTitle,
            })
          })
          .catch((err) => {
            console.log(err)
          }),
      ])
    },
  },
  state: {
    metadata: {
      logoData: {
        logoName: '',
        logoUrl: '',
      },
      platformDescribe: '',
      platformTitle: '',
      copyRight: '',
      version: '',
      initSrc: '',
    },
  },
  mutations: {
    setLogoUrl(state, logoUrl) {
      state.metadata.logoData.logoUrl = logoUrl
    },
    setInitSrc(state, initSrc) {
      state.metadata.initSrc = initSrc
    },
    setCopyrights(state, { copyRight, version }) {
      state.metadata.copyRight = copyRight
      state.metadata.version = version
    },
    setLogoName(state, logoName) {
      state.metadata.logoData.logoName = logoName
    },
    setPlatformDescription(state, { platformDescribe, platformTitle }) {
      state.metadata.platformDescribe = platformDescribe
      state.metadata.platformTitle = platformTitle
    },
  },
}
