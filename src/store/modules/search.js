import interfaceUrl from '@/api/interfaceUrl'
import {publicInter,} from '@/api/http'

const search = {
  namespaced: true,

  state: {
    cntrData: [],
    cargoData: [],
    pathData: []
  },
  mutations: {
    tidanSearch (state, res) {
      state.cntrData = res['CUSTOMS_BL_CNTR']
      state.cargoData = res['CUSTOMS_BL_CARGO']
      state.pathData = res['CUSTOMS_BOOKING_ROUTE']
    }
  },

  getters: {

  },

  actions: {
    async tidanSearch ({ commit }, number) {
      // console.log(number);
      let res = await publicInter(interfaceUrl.queryLadingbill,{ billCode: number })
      commit('tidanSearch', res)
      return res
    }
  }
}

export default search
