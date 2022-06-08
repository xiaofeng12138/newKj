import Vue from 'vue'
import Vuex from 'vuex'
// import count from './modules/count.js'
import menuState from './modules/menu'
import user from './modules/user'
import getters from './getter'
import chartui from './modules/chartui.js'
import bill from './modules/guibing'
import text from './modules/roleText'
import mergeLists from './modules/concatedLists'
import status from './modules/reloadRouter'
import quanjing from './modules/quanjing.js'
import search from './modules/search'
import portSearch from './modules/portSearch'
import exhibition from'./modules/exhibition'
  
import zbhDownload from './modules/zbhDownload'
import exhibitionStore from './modules/exhibitionStore'

import newComputed from './modules/newComputedStore'
import oldComputed from './modules/oldComputeStore'

//展览品对比store
import zjStore from './modules/zjStore'

Vue.use(Vuex)
const store = {
  modules: {
    // count,
    quanjing,
    exhibitionStore,
    exhibition,
    user,
    bill,
    chartui,
    menuState,
    text,
    mergeLists,
    status,
    portSearch,
    zbhDownload,
    search,
    newComputed,
    oldComputed,
    zjStore
  },
  getters
}

export default store
