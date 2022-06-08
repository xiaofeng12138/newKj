import interfaceUrl from '@/api/interfaceUrl'
import {publicInter} from '@/api/http'
const bill = {
  namespaced: true,
  state: {
    // 判断是否是订单
    isOrder:'',  
    // 后台要求的确认弹窗提示内容（搞不明白有何用）
    msgModal:{},
    // 提单 list
    billList: [],
    // 订单 list
    orderList: [],
    // 订单 对应 物料
    materialList: [],
    // 归并前 物料
    preMergeList: [],
      preMergeListDisable:false,
    // 归并结果 test.result,
    mergeResultList: [],
    // 已关联 订单
    orderListYGL: [],
    // 已关联提单的订单 对应 物料表
    materialListYGL: [],
    // 报关单预览 list
    billPreviewList: [],
    // 报关单 预览 详细信息
    viewModalData: {
      resultHead: {},
      resultList: []
    },
    isShangChuanDisable:false,
    isZongShuDisable:false,
    //拆单的查询的billno
    dismantlingBillNo:''
  },

  mutations: {
    getBillList (state, {res, status}) {
      state.billList = res.result.map(item => {
        item['allBLListMap']['_status'] = status
        item['allBLListMap']['statusFront'] = item.statusFront;
        return item['allBLListMap']
      })
      console.log(state.billList);
    },

    getOrderList (state, res) {
      if(res['code']==='500'){

      }else{
        state.msgModal={
          count:res.count,
          msg:res.result2
        }
        state.orderList = res.result.map((item,index) => {
          item['poList']['_checked'] = true
          item['poList']['_disabled'] = state.isOrder!=='yes'
          item['poList']['_id']=index
          item['poMaterialList'] = item['poMaterialList'].map((m, i) => {
            m.currentSumitCount = m.TOTALQUANTITY
            m._checked = true
            m._disabled= state.isOrder!=='yes'
            m._index = i
            return m
          })
          return item
        })

      }
     
    },

    getMaterialList (state, {idx, status,dingDan}) {
      if (status === '未关联') {
          state.materialList = state.orderList[idx]['poMaterialList']
      } else if (status === '已关联') {
        state.materialList = state.orderListYGL[idx]['poMaterialList']
      }
    },

    modifyMaterialListData (state, { orderIndex, materialIndex, type, value }) {

      if (type === 'count') {
        state['orderList'][orderIndex]['poMaterialList'][materialIndex]['TOTALQUANTITY'] = value
      } else if (type === 'unit') {
        state['orderList'][orderIndex]['poMaterialList'][materialIndex]['UNITPRICE'] = value
      }

      let count = state['orderList'][orderIndex]['poMaterialList'][materialIndex]['TOTALQUANTITY']
      let unit = state['orderList'][orderIndex]['poMaterialList'][materialIndex]['UNITPRICE']
      // console.log(count, unit);

      state['orderList'][orderIndex]['poMaterialList'][materialIndex]['TOTALPRICE'] = (count * unit).toFixed(2)
    },

    materialCheckBox (state, { orderIndex, materialArr }) {

      state.orderList = state.orderList.map((item, idx) => {
        if (idx === orderIndex) {
          // 物料 list CheckBox 逻辑
          item['poMaterialList'] = item['poMaterialList'].map((m, i) => {
            let _arr = materialArr.filter(_m => _m['materialIndex'] == i)
            if (_arr.length > 0) {
              m._checked = true
            } else {
              m._checked = false
            }
            return m
          })
          // 订单 list CheckBox 逻辑
          if (materialArr.length > 0) {
            item['poList']['_checked'] = true
          } else {
            item['poList']['_checked'] = false
          }
        }else{

        }
        return item
      })
    },

    submitMergeRelationShip (state, billNo) {
      // console.log();
    },

    resetBillList (state) {
      state.billList = []
      state.orderList = []
      state.materialList = []
    },

    getPreMergeList (state, res) {
      state.preMergeList = res.result
        state.preMergeListDisable = res.isMergered;
    },

    getMergeResultList (state, res) {
      state.mergeResultList = res.result
    },

    getOrderListYGL (state, res) {
      console.log('asda')
      state.orderListYGL = res.result.map(item => {
        item['poList']['_checked'] = true
        item['poList']['_disabled'] = true
          item['poMaterialList'] = item['poMaterialList'].map((m, i) => {
              m.currentSumitCount = m.TOTALQUANTITY
              m._checked = true
              m._index = i
              return m
          })
        return item
      })
    },

    billPreview (state, res) {
      // console.log(res);
      /**********************lll************** */
      state.billPreviewList = res.result
      
    },

    getViewModalData (state, res) {
      // console.log(res);
      state.viewModalData = res.result;
        state.viewModalData.isCntrCompleted = res.isCntrCompleted == 'true'?true:false;
        state.isShangChuanDisable = res.isYiTongWangYeDisable == 'true'?true:false;
        state.isZongShuDisable = res.isZongShuDisable == 'true'?true:false;
    },

    resetBillPreviewList (state) {
      state.billPreviewList = []
    },
    selectOrderAll(state,arr){
      // arr为勾选的订单 
      var indexArr=[]    // 订单下标数组
      var selected=[]  // 被选中的数组
      state.orderList.forEach((val,index)=>{
        indexArr.push(index)
      })
      if(arr.length>0){
        arr.forEach(item=>{
          state.orderList.forEach((val,i)=>{

            if(item._id===val.poList['_id']){  // 根据PURCHASEORDERNO确定在state.orderList中被选中的订单
              val._checked=true
              for(let m=0;m<indexArr.length;m++){
                if(indexArr[m]===i){
                  var k=indexArr.splice(m,1)
                  selected.push(k[0])
                }
              }
            }else{
              val._checked=false
            }
          })
        })
      }else{
        state.orderList.forEach(val=>{
          val.poList['_checked']=false
        })

      }
      console.log(indexArr,selected)
      if(indexArr.length>0){
        indexArr.forEach(val=>{
          state.orderList[val]['poList']['_checked']=false
          state.orderList[val]['poMaterialList'].forEach((item)=>{
            item['_checked']=false
          })
        })
        selected.forEach(val=>{
          state.orderList[val]['poList']['_checked']=true
          state.orderList[val]['poMaterialList'].forEach((item)=>{
            item['_checked']=true
          })
        })
      }else{
        state.orderList.forEach(item=>{
          item.poList['_checked']=true
          item.poMaterialList.forEach(val=>{
            val['_checked']=true
          })
        })
      }
      
      


    },
    isOrderType(state,type){
      // console.log(type)
      state.isOrder=type
    },
    setDismantBillNo(state,billNo){
      state.dismantlingBillNo = billNo;
      console.log('billNo:'+state.dismantlingBillNo);
    }
  },

  getters: {
    pureOrderList: state => state.orderList.map(item => item['poList']),
    pureOrderListYGL: state => state.orderListYGL.map(i => i['poList']),
    confirmMsg:state=>state.msgModal
  },

  actions: {
    async getBillList ({ dispatch, commit }, param) {
      console.log(param,'1');
       let url=param.air=='yes'?interfaceUrl.queryAirTranBLList:interfaceUrl.queryBLList;
       console.log(url,3)
      let res = await publicInter(url,param)
      commit('getBillList', {res, status: param.status})
      return res
    },

    async resetBillList ({ commit }, param) {
      commit('resetBillList')
    },
    async selectOrderAll({commit},arr){
      commit('selectOrderAll',arr)
    },
    async getOrderList ({ dispatch, commit }, param) {
      console.log(param,"daying")
      let url=interfaceUrl.queryUnNulNotePOList;
      let res = await publicInter(url,param)
      commit('getOrderList', res);
        return res;
    },

    async getMaterialList ({ dispatch, commit }, idx) {
      commit('getMaterialList', idx)
    },

    async modifyMaterialListData ({ dispatch, commit }, param) {
      commit('modifyMaterialListData', param)
    },

    async materialCheckBox ({ dispatch, commit }, param) {
      commit('materialCheckBox', param)
    },

    async submitMergeRelationShip ({ dispatch, commit, state }, param) {
      let arr = []
      state.orderList.forEach(order => {
        let orderNo = order['poList']['PURCHASEORDERNO']

        let mArr = order['poMaterialList'].filter(m => m['_checked'] === true)

        mArr.forEach(m => {
          arr.push({
            "BILLNO": param.billNo, // 提单号
            "PURCHASEORDERNO": orderNo,// 订单号
            "MATERIALNO": m['MATERIALNO'], // 物料号
            "ALNULNOTEMATERIALAMOUNT": m['TOTALQUANTITY'], // 数量
            "UNITPRICEBLLINKPO": m['UNITPRICE'], // 单价
            "ITEM": m['ITEM']
          })
        })
      })
      if(param.air=='yes'){
       var res = await publicInter(interfaceUrl.addBlAlLinkPOList,{air:'yes', list: arr })
      }else{
        var  res = await publicInter(interfaceUrl.addBlAlLinkPOList,{ list: arr })
      }
      return res
    },

    async getPreMergeList ({ commit }, param) {
      let res = await publicInter(interfaceUrl.queryAlNulNotePOListAddMatRela,param)
      if (res.code === '200') {
        commit('getPreMergeList', res)
      }
    },
    // 1: no merge, 2: merge
    async sumbitMergeList ({ commit }, { billNo, flag }) {
      let res = await publicInter(interfaceUrl.changeBlAlLinkPOList,{ billNo, flag })
      return res
    },
    async getMergeResultList ({ commit }, param) {
      let res = await publicInter(interfaceUrl.POListAfMerger,param)
      commit('getMergeResultList', res)
    },
    async getOrderListYGL ({ commit }, { billNo }) {
      let res = await publicInter(interfaceUrl.queryAlNulNotePOList,{ billNo })
      commit('getOrderListYGL', res)
    },

    async delOrderYGL ({ dispatch, commit }, params) {
      let res = await publicInter(interfaceUrl.removeAlNulNotePOList,params)
      return res
    },

    async billPreview ({ commit }, { billNo, date,role,air}) {

      let res = "";
      if(role[0] === "ROLE_CB"){
          res = await publicInter(interfaceUrl.customsBrokerGetMergeredBLList,{ billNo, date })
      }else{
          if(air){
            res = await publicInter(interfaceUrl.getMergeredBLListAirTrans,{billNo, date,air})
          }else{
            res = await publicInter(interfaceUrl.getMergeredBLList,{billNo, date})
          }
  
      }
      commit('billPreview', res)
    },

    async getViewModalData ({ commit }, {billNo, CNCOMPANYCODE,url,id,transmode,air}) {
      console.log(CNCOMPANYCODE,'hhhh')
      url = url || interfaceUrl.seeBlAlLinkPOListEP;
      let res = {};
      if(CNCOMPANYCODE){
        if(id){

          res = await publicInter(url,{ billNo, CNCOMPANYCODE,id,transmode })
        }
        else{
          res = await publicInter(url,{ billNo, CNCOMPANYCODE,transmode})
        }
          
      }
      else{
        if(air=='yes'){
          res = await publicInter(url,{ billNo,transmode,air })
        }else{
          res = await publicInter(url,{ billNo,transmode })
        }
         
      }
      commit('getViewModalData', res)
    },

    async resetBillPreviewList ({ commit }) {
      commit('resetBillPreviewList')
    },
    async isOrderType({commit},param){
      commit('isOrderType',param)
    },
    async xmlDownload ({ commit }, {transmode,billNo, clickType,CNCOMPANYCODE,url=interfaceUrl.downloadXmlFileByBLNo,edi='',id=''}) {
      if(clickType === "true"){
        if(CNCOMPANYCODE && CNCOMPANYCODE !== ""){
          if(id){
            let res = publicInter(url,{ billNo, clickType,CNCOMPANYCODE,edi,id,transmode})
            return res
          }
          else{
            let res = publicInter(url,{ billNo, clickType,CNCOMPANYCODE,edi,transmode })
            return res
          }
        }
        else if(id){
          let res = publicInter(url,{ billNo, clickType,edi,id,transmode })
          return res
        }
        else{
            let res = publicInter(url,{ billNo, clickType,edi,transmode })
            return res
        }

      }
      else{
          if(CNCOMPANYCODE && CNCOMPANYCODE !== ""){
              let res = publicInter(url,{ billNo, clickType,CNCOMPANYCODE,edi ,id,transmode})
              return res
          }
          else if(id){
            let res = publicInter(url,{ billNo, clickType,edi,id,transmode })
            return res
          }
          else{
              let res = publicInter(url,{ billNo, clickType,edi,transmode })
              return res
          }

      }
      return ""
    },
    setDismantBillNo({commit},billNo){
      commit('setDismantBillNo',billNo)
    }
  }
}

export default bill
