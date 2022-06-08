// import api from '../../api/chartui.js'
import interfaceUrl from '@/api/interfaceUrl'
import {publicInter} from '@/api/http'

const chartui = {
  namespaced: true,
  state: {
    chartuiData: {},
    totalBefore: '',
    totalAfter: ''
  },

  mutations: {
    getChartuiData (state, res) {
      state.chartuiData = res
      if (res.mapNoJoin['a7']) {
        state.totalBefore = res.mapNoJoin['a7'].time
      }
      if (res.mapJoin['a7']) {
        state.totalAfter = res.mapJoin['a7'].time
      }
    }
  },
  actions: {
    async getChartuiData ({ commit }, param) {
      // api..
      let res = await publicInter(interfaceUrl.queryStatistic,param)
      commit('getChartuiData', res)
    }
  }
}

export default chartui;
