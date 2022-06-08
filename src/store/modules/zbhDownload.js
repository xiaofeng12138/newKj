import api from '@/api/zbhDownload.js'

const zbhDownload = {
  namespaced: true,
  state: {
    downloadTable: []
  },

  mutations: {
    getDownloadTable (state, res) {
      // console.log(res);
      state.downloadTable = res
    }
  },
  actions: {
    async getDownloadTable ({ commit },parma) {
        let res = await api.getDownloadTable(parma)
        commit('getDownloadTable', res)
        return res
     
    },
    async downloadSomeFile ({ commit }, parma) {
      let res = await api.downloadSomeFile(parma)
      return res
    }
  }
}

export default zbhDownload
