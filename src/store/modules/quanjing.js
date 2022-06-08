
import {publicInter,publicInterNoCus} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'

const quanjing = {
  namespaced: true,
  state: {
    resdata: {},
    blnumList: []
  },

  mutations: {
    getQuanJingData (state, res) {
      state.resdata = res.data
      // console.log(state);
    },
    getBillNoList (state, res) {
      state.blnumList = res
    }
  },

  getters: {
    datakeys: (state) => {
      // console.log(Object.keys(state.resdata).length);
      return Object.keys(state.resdata).length
    }
  },
  actions: {
    async getQuanJingData ({ dispatch, commit }, param) {
      console.log(param )
      if(param.queryType && param.number =='COSU6271072070'){
        let res = {
          "result":{
            "msg":"查询成功",
            "code":"200"
          },
          "data":{
            "taxBill":{},
            "yard":[
              {
                "VSL_NME":"CMA CGM BOUGAINVILLE",
                "VSL_NME_CN":"达飞布甘维尔",
                "VOY_REF":"0FL70E",
                "IEFG":"I",
                "CNTR_NO":"DFSU7327637",
                "CNTR_STATUS":"进口重箱",
                "CNTR_TYPE":"GP",
                "CNTR_SIZE":"40",
                "CNTR_DNGCD":"",
                "CNTR_TEMP":"",
                "CNTR_VGM":"",
                "CNTR_OPMOD":"卸船进场",
                "CNTR_OPPRC":"船―场",
                "OPPC_TIME":"2020-10-11 05:06:24",
                "TERMINAL":"盛东(洋1)",
                "FLOW_YARD":"",
                "TRUCK_NO":"",
                "BILL_NO":"COSU6271072070",
                "PHONE_NO":"",
                "REC_UPD_DT":"2020-10-11",
                "UPLOAD_IND":"2",
                "MESSAGE_SENDER":"mq_port",
                "CNTR_NUM":"DFSU7327637"
              }
            ],
            "firstPOL":{
              "LOC":"DEHAM",
              "BOOKING_NUM":"6271072070",
              "EVENT_TIME":"2020-08-22 11:13:00"
            },
            "declare":{
              "data":{},
              "remind":"0"
            },
            "contractInfo":{},
            "liftOff":{
              "data":[],
              "remind":"0"
            },
            "release":{},
            "bookingInfo":{},
            "handoverEquipment":{
              "data":{},
              "remind":"1"
            },
            "importManifest":{},
            "deliveryPlace":{
              "LOC":"DEULM",
              "BOOKING_NUM":"6271072070",
              "EVENT_TIME":"2020-08-14 18:48:00"
            },
            "billInfo":{
              "billInfo":{
                "BL_REF_CDE":"6271072070",
                "BILLDATE":"2020-08-17",
                "POR":"Hamburg",
                "FND":"Shanghai",
                "SHIPPER_NAME":"RHENUS FREIGHT LOGISTICS\nGMBH & CO. KG\nLUFTFRACHTZENTRUM 610/3\n70629 STUTTGART / GERMANY \nAS AGENT FOR AND ON BEHALF OF *\n",
                "CONSIGNEE_NAME":"RHENUS LOGISTICS CHINA LTD.\n23/F, PUJIANG INTERNATIONAL FINANCI\nPLAZA, NO.1158 DONGDAMING ROAD,\n200082 SHANGHAI - CHINA\nUSCI 913100007178518739/**\n",
                "NOTIFYPARTY_NAME":"RHENUS LOGISTICS CHINA LTD.\n23/F, PUJIANG INTERNATIONAL FINANCI\nPLAZA, NO.1158 DONGDAMING ROAD,\n200082 SHANGHAI - CHINA\nUSCI 913100007178518739/**\n"
              },
              "billGood":[
                {
                  "GOODSWEIGHT":"6679KG",
                  "GOODSNUM":"3PK",
                  "FULL_DESC":"LASER WELDING MACHINE"
                }
              ],
              "billPack":[
                {
                  "CNTR_NUM":"DFSU7327637",
                  "CNTR_TYPE":"40HQ",
                  "SEAL_ID":"SB090011"
                }
              ]
            },
            "taxCompletion":{},
            "planShoreUp":{},
            "transportPath":[
              {
                "pod":{
                  "VSL_NME":"CMA CGM BOUGAINVILLE",
                  "LLOYDS_NUM":"9702156",
                  "GSP_PORT_NME":"Shanghai",
                  "CALL_NUM":1,
                  "BERTH_ARR_DT_GMT":"2020-10-10 00:00:00",
                  "ARR_EXT_VOY_REF":"0FL7NW1MA",
                  "BERTH_DEP_DT_GMT":"2020-10-11 16:58:00",
                  "DEP_EXT_VOY_REF":"0FL7NW1MA",
                  "VERSION":"20201012065904",
                  "MESSAGE_OWNER":"COS",
                  "MESSAGE_SENDER":"mq_ship",
                  "GSP_PORT_CDE":"",
                  "CARRIER_VAT":"",
                  "CARRIER_COUNTRY_CDE":"CN",
                  "CARRIER_CDE":"913100001322933273",
                  "LAST_UPD_DT":"2020-10-12",
                  "UPLOAD_IND":"2",
                  "DO_NOT_LOAD":"N",
                  "DO_NOT_DISCHARGE":"N",
                  "REC_UPD_DT":"2020-10-12",
                  "DF_UPLOAD_IND":"2"
                },
                "pol":{
                  "VSL_NME":"CMA CGM BOUGAINVILLE",
                  "LLOYDS_NUM":"9702156",
                  "GSP_PORT_NME":"Hamburg",
                  "CALL_NUM":1,
                  "BERTH_ARR_DT_GMT":"2020-08-20 17:07:00",
                  "ARR_EXT_VOY_REF":"0FL70E1MA",
                  "BERTH_DEP_DT_GMT":"2020-08-22 11:00:00",
                  "DEP_EXT_VOY_REF":"0FL70E1MA",
                  "VERSION":"20200821065944",
                  "MESSAGE_OWNER":"COS",
                  "MESSAGE_SENDER":"mq_ship",
                  "GSP_PORT_CDE":"",
                  "CARRIER_VAT":"",
                  "CARRIER_COUNTRY_CDE":"CN",
                  "CARRIER_CDE":"913100001322933273",
                  "LAST_UPD_DT":"2020-08-21",
                  "UPLOAD_IND":"2",
                  "DO_NOT_LOAD":"N",
                  "DO_NOT_DISCHARGE":"N",
                  "REC_UPD_DT":"2020-08-21",
                  "DF_UPLOAD_IND":"2"
                },
                "bookingNum":"6271072070"
              }
            ],
            "deliveryPlan":{
              "data":[],
              "remind":"0"
            },
            "actualShore":{},
            "billLadingInfo":{
              "data":{},
              "remind":"1"
            }
          }
        }
        commit('getQuanJingData', res)
        return res.data
      }else if(param.queryType){
        let res = await publicInterNoCus(interfaceUrl.queryData,param)
        commit('getQuanJingData', res)
        return res.data
      }
      else{
      let res = await publicInter(interfaceUrl.queryData,param)
      commit('getQuanJingData', res)
      return res.data
      }
     
    },

    async getBillNoList ({ commit }, { blnum }) {
      let res = await publicInter(interfaceUrl.queryBillnumList,{billno:blnum })
      // console.log(res);
      commit('getBillNoList', res)
      return res
    }
  }
}

export default quanjing
