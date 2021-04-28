import router from '@/router'
export default {
  actions: {},
  state: {
    tabs: [],
  },
  mutations: {
    addTab(state, tabItem) {
      state.tabs.push(tabItem)

      // router.push(tabItem.path)
      console.log('tab has been added')
    },
    setActiveKey(state, name) {
      // router.push(name)

      state.activeKey = name
      console.log('active key has been set')
    },
    clearTabs(state) {
      state.tabs = []
    },
    removeTab(state, index) {
      state.tabs.splice(index, 1)
      console.log('tab has been removed')
    },

    changeTabParams(state, { menuId, params }) {
      try {
        state.tabs.filter((tab) => tab.menuId === menuId)[0].params = params
      } catch {
        throw new Error('menuId无法找到')
      }
    },
  },
}
