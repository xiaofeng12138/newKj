import interfaceUrl from '@/api/interfaceUrl'
import {publicInter,filedownload} from '@/api/http'

const search = {
  namespaced: true,

  state: {
    list: [],
    costomList: [],
    costomBackList: []
  },

  mutations: {
    portSearch (state, res) {
      state.list = res.list
    },

    costomSearch (state, res) {
          state.costomList = res.list

    },

    costomSearchBack (state, res) {
      state.costomBackList = res.list
    },
      resetState(state){
       state.costomList = [];
      }
  },

  getters: {
    //
  },

  actions: {
    async portSearch ({ commit }, {blnum}) {
      // console.log(param);
      let res = await publicInter(interfaceUrl.queryWharfInfo,{blnum})
      commit('portSearch', res)
    },

    async costomSearch ({ commit }, {declareNum, blnum}) {
      let res = await publicInter(interfaceUrl.qryCustomsClearStatus,{declareNum, blnum})
      commit('costomSearch', res)
        return res;
    },

    async costomSearchBack ({ commit }, {startDate, endDate}) {
      let res = await publicInter(interfaceUrl.qryCustomsBatchInfo,{startDate, endDate})
      commit('costomSearchBack', res)
    },

    async costomDownload ({ commit }, {startDate, endDate}) {
      let res = await filedownload(interfaceUrl.downloadBatchInfo,{startDate, endDate})
      return res
    },
      async resetState({commit}){
        commit('resetState')
      }
  }
}

export default search
