import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
import axios from 'axios'
import regionTable from '@/until/corresponding'
import { setCookie, getUserRole, removeCookie, getCookie, getRouterName} from "@/until/getToken";
function getRegionName(code) {
    var obj = regionTable.filter(item => {
        return item.value == code
    })
    return obj[0].nameCH || '全球';
}
function saveDecimalNum(Fson, Fmom) {
    if (Fmom == 0) {
        return 0
    }
    return ((Fson || 0) * 100 / Fmom).toFixed(2)
}
function  sum(arr){
    let obj = {
        COUNTRY_NUM: 0,
        aPercent: 100,
        COMPANY: 0,
        bPercent: 100,
        POSITION: 0,
        cPercent: 100,
        BATCHNUM: 0,
        dPercent: 100,
        TOTALPRICE: 0,
        ePercent: 100
    };
    arr.forEach(ele => {
        if (ele.STATISTIC_TYPE === '1') {
            obj.COUNTRY_NUM++;
            obj.COMPANY += parseInt(ele.COMPANY || 0)
            obj.POSITION += parseInt(ele.POSITION || 0)
            obj.BATCHNUM += parseInt(ele.BATCHNUM || 0)
            obj.TOTALPRICE += parseInt((ele.TOTALPRICE)  || 0)
        }
    });
    return obj;

}
const zjStore = {
    namespaced: true,
    state: {
        /*
        *控制组件状态
        **/
        viewsOff: [true, true],
        /**
         * 当前选中的区域代码
         */
        selectedRegion: 0,
        selectedRegion2: 0,
        /**
         * 滚动数字部分，全球的总数
         */
        GlobalTotal: {},
        /**
         * 仪表盘部分的，全球总数
         */
        GlobalGauge: {},
        /**
         * 返给组件当前区域应该展示的数据
         */
        zjglobalData: {
            name: '全球概况',
            scrollData: {
                regionNum: 0,
                aPercent: 100,
                exhibitor: 0,
                bPercent: 100,
                exPlatform: 0,
                cPercent: 100,
                exhibits: 0,
                dPercent: 100,
                worth: 0,
                ePercent: 100
            },
            gaugeData: {
                costumeValue: 0,
                costumePrice: 0,
                equipValue: 0,
                equipPrice: 0,
                medicalValue: 0,
                medicalPrice: 0,
                homeAppliancesValue: 0,
                homeAppliancesPrice: 0,
                foodValue: 0,
                foodPrice: 0,
                serviceValue: 0,
                servicePrice: 0,
                carValue: 0,
                carPrice: 0
            }
        },
        compareData:{
            now:{
                regionNum: 0,
                aPercent: 100,
                exhibitor: 0,
                bPercent: 100,
                exPlatform: 0,
                cPercent: 100,
                exhibits: 0,
                dPercent: 100,
                worth: 0,
                ePercent: 100

            },
            lastYears:{
                regionNum: 0,
                aPercent: 100,
                exhibitor: 0,
                bPercent: 100,
                exPlatform: 0,
                cPercent: 100,
                exhibits: 0,
                dPercent: 100,
                worth: 0,
                ePercent: 100

            }
        },
        /**
         * 滚动部分所有的数据  
         */
        scroll_AllData: [],
        new_scroll_AllData: [],
        scrolData20: [], //20年滚动数据
        /**
         * 仪表盘部分所有数据
         */
        gauge_AllData: {},
        /**
         * 特许进境动植物检疫审批商品种类
         */
        franchiseGoods: [],
        /**
         * 特许进境动植物检疫审批商品来源
         */
        franchiseGoodsRegion: {},
        /**
         * 特许食品
         */
        foodSpec: [],
        /**
         * 检疫审批明细
         */
        foodComm: [],
        /**
         * 巡展记录详情开关
        */
    },
    mutations: {
        viewChange(state, viewState) {
            state.viewsOff = viewState
        },
        /**
         * 区域代码变化引起视图上数据变更
         * @param {*} state 
         * @param {*} code 选中区域的代码
         */

        changeSelected(state, code) {
            console.log(state.new_scroll_AllData,code)
            state.selectedRegion = code;
            var arr = [], brr = [];
            
            let d =  state.new_scroll_AllData

            if (!isNaN(code)) {   // 选中的是国家
                state.zjglobalData.name = getRegionName(code);
                arr = d.filter(item => {
                    return item.COUNTRY == code
                })
                brr = state.gauge_AllData.filter(item => {
                    return item.COUNTRYNUMBER == code
                })
            }  else if (code === 'GLB') {  // 选中的是全球
                state.zjglobalData.name = '全球概况';
                arr = d ,brr = state.gauge_AllData
            } 
            
            else if (code === 'C$E') {  // 选中的是国家馆
                state.zjglobalData.name = '国家馆';
                arr = d.filter(item => {
                    return item.STATISTIC_TYPE == 4;
                })
               
                brr = state.gauge_AllData.filter(item => {
                    return item.REGIONTYPE == 5;
                })

            } else if (code === 'B$R') {  // 选中的是一带一路
                state.zjglobalData.name = '一带一路';
                arr = d.filter(item => {
                    return item.STATISTIC_TYPE == 3;
                })
                brr = state.gauge_AllData.filter(item => {
                    return item.REGIONTYPE == 3;
                })
            } else {  // 选中的是大洲
                var regionRelative = {
                    AS: '亚洲',
                    AF: '非洲',
                    NA: '北美洲',
                    SA: '南美洲',
                    OC: '大洋洲',
                    EU: '欧洲'
                }
                state.zjglobalData.name = regionRelative[code];
                arr = d.filter(item => {
                    return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                })
                brr = state.gauge_AllData.filter(item => {
                    return item.REGIONTYPE == 2 && item.COUNTRYCODE == code;
                })
            }
           
            if(arr.length>0){
                var obj = arr[0];
                state.zjglobalData.scrollData = {
                    regionNum: obj['COUNTRY_NUM'] || 0,
                    aPercent: saveDecimalNum(obj['COUNTRY_NUM'], state.GlobalTotal.regionNum),
                    exhibitor: obj['COMPANY'] || 0,
                    bPercent: saveDecimalNum(obj['COMPANY'], state.GlobalTotal.exhibitor),
                    exPlatform: obj['POSITION'] || 0,
                    cPercent: saveDecimalNum(obj['POSITION'], state.GlobalTotal.exPlatform),
                    exhibits: obj['BATCHNUM'] || 0,
                    dPercent: saveDecimalNum(obj['BATCHNUM'], state.GlobalTotal.exhibits),
                    worth: (Math.round(obj['TOTALPRICE'] / 10000)) || 0,
                    ePercent: saveDecimalNum((Math.round(obj['TOTALPRICE'] / 10000)), state.GlobalTotal.worth)
                }
            }else{
                state.zjglobalData.scrollData = {
                    regionNum:  0,
                    aPercent:0 ,
                    exhibitor: 0,
                    bPercent:0,
                    exPlatform:  0,
                    cPercent:0,
                    exhibits: 0,
                    dPercent:0,
                    worth:0,
                    ePercent:0
                }
            }
           
            if(code === 'C$E') {
                state.zjglobalData.scrollData.regionNum = 67;
                state.zjglobalData.scrollData.aPercent = saveDecimalNum(67, state.GlobalTotal.regionNum);
                state.zjglobalData.scrollData.exhibitor = 70;
                state.zjglobalData.scrollData.bPercent = saveDecimalNum(70, state.GlobalTotal.exhibitor);
                state.zjglobalData.scrollData.exPlatform = 70;
                state.zjglobalData.scrollData.cPercent = saveDecimalNum(70, state.GlobalTotal.exPlatform);
            }
            state.zjglobalData.gaugeData = {
                costumeValue: brr[0]['COMMODITY'] * 80,
                costumePrice: brr[0]['COMMODITYPRICE'],
                equipValue: brr[0]['INTELLIGENCE'] * 80,
                equipPrice: brr[0]['INTELLIGENCEPRICE'],
                medicalValue: brr[0]['MEDICALDEVICES'] * 80,
                medicalPrice: brr[0]['MEDICALDEVICESPRICE'],
                homeAppliancesValue: brr[0]['CONSUMERELECTRONICS'] * 80,
                homeAppliancesPrice: brr[0]['CONSUMERELECTRONICSPRICE'],
                foodValue: brr[0]['FOOD'] * 80,
                foodPrice: brr[0]['FOODPRICE'],
                serviceValue: brr[0]['TRADESERVICES'] * 80,
                servicePrice: brr[0]['TRADESERVICESPRICE'],
                carValue: brr[0]['CAR'] * 80,
                carPrice: brr[0]['CARPRICE']
            }
        },

        SET_SCROLLALLDATA(state, res) {
            state.scroll_AllData = res;
            let obj = {
                regionNum: 0,
                aPercent: 100,
                exhibitor: 0,
                bPercent: 100,
                exPlatform: 0,
                cPercent: 100,
                exhibits: 0,
                dPercent: 100,
                worth: 0,
                ePercent: 100
            };
            res.forEach(ele => {
                if (ele.STATISTIC_TYPE === '1') {
                    obj.regionNum++;
                    obj.exhibitor += parseInt(ele.COMPANY || 0)
                    obj.exPlatform += parseInt(ele.POSITION || 0)
                    obj.exhibits += parseInt(ele.BATCHNUM || 0)
                    obj.worth += parseFloat((ele.TOTALPRICE) /10000 || 0)
                }
            });
            obj.worth = Math.round(obj.worth);
            state.compareData.lastYears=obj
        },

        SET_NEW_SCROLLALLDATA(state, res) {
            state.new_scroll_AllData = res;
            let obj = {
                regionNum: 0,
                aPercent: 100,
                exhibitor: 0,
                bPercent: 100,
                exPlatform: 0,
                cPercent: 100,
                exhibits: 0,
                dPercent: 100,
                worth: 0,
                ePercent: 100
            };
            res.forEach(ele => {
                if (ele.STATISTIC_TYPE === '1') {
                    obj.regionNum++;
                    obj.exhibitor += parseInt(ele.COMPANY || 0)
                    obj.exPlatform += parseInt(ele.POSITION || 0)
                    obj.exhibits += parseInt(ele.BATCHNUM || 0)
                    obj.worth += parseFloat((ele.TOTALPRICE) /10000 || 0)
                }
            });
            obj.worth = Math.round(obj.worth);
            // obj.exhibitor = 3653;
            // obj.exPlatform = 3637;
            state.compareData.now=obj
        },

        SET_GLOBALTOTAL(state, value) {
            state.GlobalTotal = value
            state.zjglobalData.scrollData = value
        },
        SET_GLOBALGAUGE(state, value) {
            state.zjglobalData.gaugeData = value
        },
        SET_GAUGEALLDATA(state, res) {
            state.gauge_AllData = res
        },
        SET_FRANCHISEGOODS(state, value) {
            state.franchiseGoods = value
        },
        SET_FRANCHISEGOODSREGION(state, value) {
            state.franchiseGoodsRegion = value
        },
        SET_FOODCOMM(state, value) {
            state.foodComm = value
        },
        SET_FOODSPEC(state, value) {
            state.foodSpec = value
        }
    },
    getters: {
        getViewState: state => state.viewsOff,
        getRegionCode: state => state.selectedRegion,
        getDataS$G: state => state.zjglobalData,
        getDataS$Gg: state => state.zjglobalData2,
        getFranchiseGoods: state => state.franchiseGoods,
        getFranchiseGoodsRegion: state => state.franchiseGoodsRegion,
        getCompareData:state=>state.compareData,
        getAllZjdata:state => state.new_scroll_AllData
    },
    actions: {
        //获取国家信息详情
        getZjData({ commit }) {
            //只查询证明函数据
            publicInter(interfaceUrl.qryRGForCertificate,{}).then(r => {
                let obj = {
                    regionNum: 0,
                    aPercent: 100,
                    exhibitor: 0,
                    bPercent: 100,
                    exPlatform: 0,
                    cPercent: 100,
                    exhibits: 0,
                    dPercent: 100,
                    worth: 0,
                    ePercent: 100
                };
                if (r.code = '200' ) {
                    // commit('SET_SCROLLALLDATA',r.allListMap[getCookie('date')*1 - 1]) //上一年数据
                    commit('SET_NEW_SCROLLALLDATA', r.allListMap[getCookie('date')*1]) //当前年数据
                    console.log(r)
                    let d =  r.allListMap[getCookie('date')*1]
                    let allZjNum = r.continentMap.ZJ[getCookie('date')*1]
                    console.log(allZjNum)
                    let newObj = []
                    d.forEach(ele => {
                        if (ele.STATISTIC_TYPE === '1') {
                            newObj.push(ele)
                        }
                    });
                            obj.regionNum = allZjNum.COUNTRY_NUM;
                            obj.exhibitor = allZjNum.COMPANY
                            obj.exPlatform = allZjNum.POSITION
                            obj.exhibits = allZjNum.BATCHNUM
                            obj.worth = (allZjNum.TOTALPRICE/10000).toFixed(0)
                    commit('SET_GLOBALTOTAL', obj)
                }

            })
        },
        
        //设置展品价值总额函数
        getGaugeData({ commit }) {
            //datasource:1 表示全部价值   datasource:2 表示暂进价值
            publicInter(interfaceUrl.queryExhPrice, {datasource:2}).then(r => {
                if (r.code === 200) {
                    let newPrice = r[getCookie('date')*1]
                    commit('SET_GAUGEALLDATA',newPrice) //当前年数据
                    let obj = {}
                    let arr =newPrice.filter(item => {
                        return item.REGIONTYPE == 4
                    })
                    obj = {
                        costumeValue: arr[0]['COMMODITY'] * 80,
                        costumePrice: arr[0]['COMMODITYPRICE'],
                        equipValue: arr[0]['INTELLIGENCE'] * 80,
                        equipPrice: arr[0]['INTELLIGENCEPRICE'],
                        medicalValue: arr[0]['MEDICALDEVICES'] * 80,
                        medicalPrice: arr[0]['MEDICALDEVICESPRICE'],
                        homeAppliancesValue: arr[0]['CONSUMERELECTRONICS'] * 80,
                        homeAppliancesPrice: arr[0]['CONSUMERELECTRONICSPRICE'],
                        foodValue: arr[0]['FOOD'] * 80,
                        foodPrice: arr[0]['FOODPRICE'],
                        serviceValue: arr[0]['TRADESERVICES'] * 80,
                        servicePrice: arr[0]['TRADESERVICESPRICE'],
                        carValue: arr[0]['CAR'] * 80,
                        carPrice: arr[0]['CARPRICE']
                    }
                    commit('SET_GLOBALGAUGE', obj)
                    
                }
            })
        },
        getJsonData({ commit }) {
            axios.get('/dater.json').then(r => {
                var franchiseGoods = r.data.simpleValiter.classify, arr = []
                var franchiseGoodsRegion = r.data.simpleValiter.keyValue, obj = {}
                franchiseGoods.forEach(item => {
                    arr.push(
                        { isActive: false, name: item.name, key: item.value }
                    )
                })
                obj = franchiseGoodsRegion
                commit('SET_FRANCHISEGOODS', arr)
                commit('SET_FRANCHISEGOODSREGION', obj)
                commit('SET_FOODCOMM', r.data.foodComm)
                commit('SET_FOODSPEC', r.data.foodSpec)
            })
        }


    }
}
export default zjStore;