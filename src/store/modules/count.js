const count = {
  namespaced: true,
  state: { count: 0 },

  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state) {
      state.count--
    }
  },

  getters: {
    //
  },

  actions: {
    increment (ctx) {
      ctx.commit('increment')
    },
    decrement (ctx) {
      ctx.commit('decrement')
    }
  }
}

export default count
