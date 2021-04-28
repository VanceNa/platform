export default {
  actions: {
    
  },
  state: {
    tableData: [], // 存储表格的数据
  },
  mutations: {
    setTableData(state, data) {
        state.tableData = data;
    }
  },
}
