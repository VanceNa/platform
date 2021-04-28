import router from '@/router'
import axios from '@/util/http'
const menuData = JSON.parse(localStorage.getItem('menuList'))
const leftNavigations = menuData && menuData.length ? menuData : []

let initResolve = () => {}
let initResolved = false
export const onInitFinished = () => {
  if (initResolved) return Promise.resolve()
  return new Promise((resolve) => {
    initResolve = () => {
      resolve()
      initResolved = true
    }
  })
}

export default {
  actions: {
    generateDevMenu(context) {
      if (process.env.NODE_ENV !== 'production') {
        const devId = `${Math.floor(Math.random() * 10e6)}`
        const devMenus = []
        if (devMenus.length) {
          const menu = {
            menuId: devId,
            menuName: '开发模式',
            childs: devMenus,
            icon: 'icon-Demo icon-development-mode',
          }

          context.commit('appendDevMenu', menu)
        }
      }
    },

    initTopNavigations(context) {
      return axios
        .get(global.hrmApi + '/userLogin/getFrameInfo')
        .then((res) => {
          let menu = res.data.menu || []
          // 过滤掉应用侧的菜单
          menu = menu.filter((item) => !item.isClient)
          menu.forEach((item) => {
            item.childs = item.childs.filter((child) => !child.isClient)
          })
          const menuDropdown = res.data.menu || []
          menuDropdown.forEach((item) => {
            if (
              item.menuId === '0341bcc8970e11e5b1b094de80818398' &&
              item.url
            ) {
              context.commit('setInitSrc', item.url)
            }
          })

          context.commit('setTopNavigation', menuDropdown)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(initResolve)
    },
  },
  state: {
    menu: { leftNavigations, topNavigations: [], devMenus: [] },
  },
  mutations: {
    setTopNavigation(state, data) {
      state.menu.topNavigations = data
    },

    setLeftNavigations(state, data) {
      localStorage.setItem('menuList', JSON.stringify(data))
      state.menu.leftNavigations = data || []
    },

    appendDevMenu(state, data) {
      state.menu.devMenus = data || []
    },
  },
}
