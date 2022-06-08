import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import Vuex from 'vuex'
import routes from './routes/index.js'
import interfaceUrl from '@/api/interfaceUrl.js'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './styles/index.scss'
import store from './store/index.js'
import VueDND from 'awe-dnd'
import {getCookie} from './until/getToken'
import access from './routes/accessControl'
import 'echarts/map/js/world.js'
import {Message} from 'iview'
//引入字体
import './styles/font.scss'
import waterMark from '@/until/watermark.js'
import routeForm from '@/until/routeForm.js'
import { publicInter } from "@/api/http";

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView)
Vue.use(VueDND)   //   拖拽插件


Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts;
Vue.prototype.$InterfaceUrl=interfaceUrl
const router=new VueRouter({ routes })

router.beforeEach(function(to,from,next){
  const token = getCookie('roler')
  const p=[]
  // console.log(to.name!='login'&&to.name!='roleSelect',to.name)
  if(to.name!='login'&&to.name!='roleSelect'&&to.name!='zbhLogin'&&to.name!='companyRank'&&to.name!='companyRankDetail'
  &&to.name!='companyRankEchart'){
    if(token){
      var roler=token.split(',')
      roler.forEach(item=>{
        if(access[item]){
          p.push(...access[item])
        }
      })
      var q=Array.from(new Set(p)) 
      // console.log('q',q)
      if(q.indexOf(to.name)>=0){
        next()
        let waterMarkArr = ['proofApprove','proofDetail','materialLift',
        'ciieQueryStatistics','flowOfCommod','agencyDisposal','dzbh','dzbd',
        'crossbussiness','zwlist','jy']
     
        if(waterMarkArr.indexOf(to.name) >=0){
          // waterMark.set(getCookie('user'))
          getCookie('newUserName')?waterMark.set(getCookie('newUserName')):waterMark.set(getCookie('user'))
        }else{
          waterMark.set('')
        }  
      }else{
        Message.error('您暂无权限访问该页面！')
        //next({name:p[0]})
        
        // next({name:'category'})
      }
    }else{
      router.push({path:'/login'})
    }

  }else{
    next()
  }
  
  //记录路由
  const user = getCookie('user')
  let message={
     userName:getCookie('newUserName')?getCookie('newUserName'):'', //用户名称
     userMac:getCookie('newdeviceMac')?getCookie('newdeviceMac'):'', //用户mac
     userIp:getCookie('newdeviceIp')?getCookie('newdeviceIp'):'', //ip
     cameraid:getCookie('carameId')?getCookie('carameId'):'',//摄像头
     officeName:getCookie('newofficeName')?getCookie('newofficeName'):'',//办公点名称
     officeAddr:getCookie('newofficeAddr')?getCookie('newofficeAddr'):'',//办公点地址
  }
  if(roler&&roler.indexOf('ESH')>=0){
    message.functionName = to.name
    routeForm.forEach((item,index)=>{
      if(message.functionName==item.rout)
         message.functionName=item.cnName;
      })
    publicInter(interfaceUrl.addOperationFunction,message).then(res=>{
      // console.log('res',res)
    })
    
  }
  
})
var vm=new Vue({
  el: '#app',
  router:router,
  store: new Vuex.Store(store),
  render: h => h(App)
})
global.vm = vm; 