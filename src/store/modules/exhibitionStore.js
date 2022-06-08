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
const exhibitionStore = {
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
        scroll$gauge: {
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
                ePercent: 100,
                exhicategoryNum:0,
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
            now18:{
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
            now19:{
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
            now20:{
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
        new_scroll_AllData: [], //当前年

        scorollData18:[], //18年数据
        scorollData19:[], //19年数据
        scorollData20:[], //20年数据

        new20_scroll_AllData: [],
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
            state.selectedRegion = code;
            console.log(code)
            var arr = [], brr = [], crr=[];
            let d = state.new_scroll_AllData
            if (!isNaN(code)) {   // 选中的是国家
                state.scroll$gauge.name = getRegionName(code);
                arr = d.filter(item => {
                    return item.COUNTRY == code
                })
                brr = state.gauge_AllData.filter(item => {
                    return item.COUNTRYNUMBER == code
                })
            }  else if (code === 'GLB') {  // 选中的是全球
            //    console.log(arr)
                state.scroll$gauge.name = '全球概况';
                arr = d ,brr = state.gauge_AllData
            } 
            
            else if (code === 'C$E') {  // 选中的是国家馆
                state.scroll$gauge.name = '国家馆';
                arr = d.filter(item => {
                    return item.STATISTIC_TYPE == 4;
                })
               
                brr = state.gauge_AllData.filter(item => {
                    return item.REGIONTYPE == 5;
                })

                // console.log(arr)
                // console.log(brr)

            } else if (code === 'B$R') {  // 选中的是一带一路
                state.scroll$gauge.name = '一带一路';
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
                state.scroll$gauge.name = regionRelative[code];
                arr = d.filter(item => {
                    return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                })
                brr = state.gauge_AllData.filter(item => {
                    return item.REGIONTYPE == 2 && item.COUNTRYCODE == code;
                })
            }
            var obj = arr[0];
            console.log(obj)
            state.scroll$gauge.scrollData = {
                regionNum: obj['COUNTRY_NUM'] || 0,
                aPercent: saveDecimalNum(obj['COUNTRY_NUM'], state.GlobalTotal.regionNum),
                exhibitor: obj['COMPANY'] || 0,
                bPercent: saveDecimalNum(obj['COMPANY'], state.GlobalTotal.exhibitor),
                exPlatform: obj['POSITION'] || 0,
                cPercent: saveDecimalNum(obj['POSITION'], state.GlobalTotal.exPlatform),
                exhibits: obj['BATCHNUM'] || 0,
                dPercent: saveDecimalNum(obj['BATCHNUM'], state.GlobalTotal.exhibits),
                worth: (Math.round(obj['TOTALPRICE'] / 10000)) || 0,
                ePercent: saveDecimalNum((Math.round(obj['EXHICATEGORY'])), state.GlobalTotal.exhicategoryNum),
                exhicategoryNum:obj['EXHICATEGORY'] || 0,
            }
            if(code === 'C$E') {
                state.scroll$gauge.scrollData.regionNum = 67;
                state.scroll$gauge.scrollData.aPercent = saveDecimalNum(67, state.GlobalTotal.regionNum);
                state.scroll$gauge.scrollData.exhibitor = 70;
                state.scroll$gauge.scrollData.bPercent = saveDecimalNum(70, state.GlobalTotal.exhibitor);
                state.scroll$gauge.scrollData.exPlatform = 70;
                state.scroll$gauge.scrollData.cPercent = saveDecimalNum(70, state.GlobalTotal.exPlatform);
            }
            state.scroll$gauge.gaugeData = {
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
        //1  国家  2 大洲  3 一带一路  4 国家馆
        compareDataChange(state,code){
            var arr = []//19
            var brr = [] //18
            var crr = [] //20
            if (code === 'C$E') {  // 选中的是国家馆
                // state.scroll$gauge.name = '国家馆';
                
                arr = state.scorollData18.filter(item => {
                    return item.STATISTIC_TYPE == 4;
                })
                brr = state.scorollData19.filter(item => {
                    return item.STATISTIC_TYPE == 4;
                })
                crr = state.scorollData20.filter(item => {
                    return item.STATISTIC_TYPE == 4;
                })
            } else if (code === 'B$R') {  // 选中的是一带一路
                // state.scroll$gauge.name = '一带一路';
                arr = state.scorollData18.filter(item => {
                    return item.STATISTIC_TYPE == 3;
                })
                brr = state.scorollData19.filter(item => {
                    return item.STATISTIC_TYPE == 3;
                })
                crr = state.scorollData20.filter(item => {
                    return item.STATISTIC_TYPE == 3;
                })
            }else if(code==='ALL'){
                arr=[sum(state.scorollData18)];
                brr=[sum(state.scorollData19)]
                crr=[sum(state.scorollData20)];
            }
            else{
                arr=state.scorollData18.filter(item => {
                    return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                })
                brr=state.scorollData19.filter(item => {
                    return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                })
                crr=state.scorollData20.filter(item => {
                    return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                })

            }
            var obj = arr[0],obj1=brr[0],obj2=crr[0];
           
            state.compareData.now18 = {
                regionNum: obj['COUNTRY_NUM'] ||obj['regionNum']|| 0,
                exhibitor: obj['COMPANY'] ||obj['exhibitor'] ||0,
                exPlatform: obj['POSITION'] ||obj['exPlatform']|| 0,
                exhibits: obj['BATCHNUM'] ||obj['exhibits'] ||0,
                worth: (Math.round((obj['TOTALPRICE'])/ 10000)) || 0,
            }
            
            state.compareData.now19={
                regionNum: obj1['COUNTRY_NUM'] ||obj1['regionNum']|| 0,
                exhibitor: obj1['COMPANY'] ||obj1['exhibitor'] ||0,
                exPlatform: obj1['POSITION'] ||obj1['exPlatform']|| 0,
                exhibits: obj1['BATCHNUM'] ||obj1['exhibits'] ||0,
                worth: (Math.round((obj1['TOTALPRICE'])/ 10000)) || 0,
            }

            state.compareData.now20={
                regionNum: obj2['COUNTRY_NUM'] ||obj2['regionNum']|| 0,
                exhibitor: obj2['COMPANY'] ||obj2['exhibitor'] ||0,
                exPlatform: obj2['POSITION'] ||obj2['exPlatform']|| 0,
                exhibits: obj2['BATCHNUM'] ||obj2['exhibits'] ||0,
                worth: (Math.round((obj2['TOTALPRICE'])/ 10000)) || 0,
            }
            // if(code === 'C$E') {
            //     state.compareData.now.regionNum = 67;
            //     state.compareData.now.exhibitor = 70;
            //     state.compareData.now.exPlatform = 70;
            // } else if(code === 'ALL') {
            //     state.compareData.now.exhibitor = 3653;
            //     state.compareData.now.exPlatform = 3637;
            // }

        },

        // compareDataChange(state,code){
        //     var arr = []//19
        //     var brr = [] //18
        //     var crr = [] //20
        //     if (code === 'C$E') {  // 选中的是国家馆
        //         // state.scroll$gauge.name = '国家馆';
        //         crr = state.new20_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 4;
        //         })
        //         arr = state.new_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 4;
        //         })
        //         brr = state.scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 4;
        //         })
        //     } else if (code === 'B$R') {  // 选中的是一带一路
        //         // state.scroll$gauge.name = '一带一路';
        //         crr = state.new20_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 3;
        //         })
        //         arr = state.new_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 3;
        //         })
        //         brr = state.scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 3;
        //         })
        //     }else if(code==='ALL'){
        //         crr=[sum(state.new20_scroll_AllData)];
        //         arr=[sum(state.new_scroll_AllData)];
        //         brr=[sum(state.scroll_AllData)]
        //     }
        //     else{
        //         crr=state.new20_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
        //         })
        //         arr=state.new_scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
        //         })
        //         brr=state.scroll_AllData.filter(item => {
        //             return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
        //         })

        //     }
        //     var obj = brr[0],obj1=arr[0],obj2=crr[0];
        //     state.compareData.lastYears = {
        //         regionNum: obj['COUNTRY_NUM'] ||obj['regionNum']|| 0,
        //         exhibitor: obj['COMPANY'] ||obj['exhibitor'] ||0,
        //         exPlatform: obj['POSITION'] ||obj['exPlatform']|| 0,
        //         exhibits: obj['BATCHNUM'] ||obj['exhibits'] ||0,
        //         worth: (Math.round((obj['TOTALPRICE'])/ 10000)) || 0,
        //     }
            
        //     state.compareData.now={
        //         regionNum: obj1['COUNTRY_NUM'] ||obj1['regionNum']|| 0,
        //         exhibitor: obj1['COMPANY'] ||obj1['exhibitor'] ||0,
        //         exPlatform: obj1['POSITION'] ||obj1['exPlatform']|| 0,
        //         exhibits: obj1['BATCHNUM'] ||obj1['exhibits'] ||0,
        //         worth: (Math.round((obj1['TOTALPRICE'])/ 10000)) || 0,
        //     }

        //     state.compareData.now20={
        //         regionNum: obj2['COUNTRY_NUM'] ||obj2['regionNum']|| 0,
        //         exhibitor: obj2['COMPANY'] ||obj2['exhibitor'] ||0,
        //         exPlatform: obj2['POSITION'] ||obj2['exPlatform']|| 0,
        //         exhibits: obj2['BATCHNUM'] ||obj2['exhibits'] ||0,
        //         worth: (Math.round((obj2['TOTALPRICE'])/ 10000)) || 0,
        //     }
        //     if(code === 'C$E') {
        //         state.compareData.now.regionNum = 67;
        //         state.compareData.now.exhibitor = 70;
        //         state.compareData.now.exPlatform = 70;
        //     } else if(code === 'ALL') {
        //         state.compareData.now.exhibitor = 3653;
        //         state.compareData.now.exPlatform = 3637;
        //     }

        // },
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

        //设置当前年
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
                ePercent: 100,
                exhicategoryNum:0,

            };
            res.forEach(ele => {
                if (ele.STATISTIC_TYPE === '1') {
                    obj.regionNum++;
                    obj.exhibitor += parseInt(ele.COMPANY || 0)
                    obj.exPlatform += parseInt(ele.POSITION || 0)
                    obj.exhibits += parseInt(ele.BATCHNUM || 0)
                    obj.exhicategoryNum += parseInt(ele.EXHICATEGORY || 0)
                    obj.worth += parseFloat((ele.TOTALPRICE) /10000 || 0)
                }
            });
            obj.worth = Math.round(obj.worth);
            // obj.exhibitor = 3653;
            // obj.exPlatform = 3637;
            state.compareData.now=obj
        },
        //设置18年数据
        setData18(state, res) {
            state.scorollData18 = res;
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
            state.compareData.now18=obj
        },
        
        //设置19年数据
        setData19(state, res) {
            state.scorollData19 = res;
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
            obj.exhibitor = 3653;
            obj.exPlatform = 3637;
            state.compareData.now19=obj
        },
        
        //设置20年数据
        setData20(state, res) {
            state.scorollData20 = res;
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
            state.compareData.now20=obj
        },
        SET_GLOBALTOTAL(state, value) {
            state.GlobalTotal = value
            state.scroll$gauge.scrollData = value 
            state.scroll$gauge.name = '全球概况'
        },
        SET_GLOBALGAUGE(state, value) {
            state.scroll$gauge.gaugeData = value
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
        getDataS$G: state => state.scroll$gauge,
        getDataS$Gg: state => state.scroll$gauge2,
        getFranchiseGoods: state => state.franchiseGoods,
        getFranchiseGoodsRegion: state => state.franchiseGoodsRegion,
        getCompareData:state=>state.compareData.now, //当前年
        getCompareData18:state=>state.compareData.now18,
        getCompareData19:state=>state.compareData.now19,
        getCompareData20:state=>state.compareData.now20,
    },
    actions: {
        getRegionData({ commit }) {
            publicInter(interfaceUrl.queryRegionalGrouping).then(r => {
                console.log(r)
                if (r.code == '200') {
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
                        ePercent: 100,
                        exhicategoryNum:0
                    };
                    let nowYear = getCookie('date')*1
                    //当期年大屏滚动数据
                    commit('SET_NEW_SCROLLALLDATA', r.allListMap[nowYear]) //当前年

                    commit('setData18', r.allListMap[2018]) //18年数据
                    commit('setData19', r.allListMap[2019]) //19年数据
                    commit('setData20', r.allListMap[2020]) //20年数据


                   
                   
                    // commit('SET_NEW20_SCROLLALLDATA', r.allListMap[nowYear+1]) //20年
                    let d =  r.allListMap[nowYear]
                  
                    d.forEach(ele => {
                        if (ele.STATISTIC_TYPE === '1') {
                            obj.regionNum++;
                            obj.exhibitor += parseInt(ele.COMPANY || 0)
                            obj.exPlatform += parseInt(ele.POSITION || 0)
                            obj.exhibits += parseInt(ele.BATCHNUM || 0)
                            obj.worth += parseFloat((ele.TOTALPRICE) / 10000 || 0)
                            obj.exhicategoryNum += parseInt(ele.EXHICATEGORY || 0)
                        }
                    });
                    obj.worth = Math.round(obj.worth)
                    commit('SET_GLOBALTOTAL', obj)
                }

            })
        },
        getGaugeData({ commit }) {
            publicInter(interfaceUrl.queryExhPrice, {datasource:3}).then(r => {
                console.log(r)
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
                    console.log(obj)
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
                // commit('SET_FOODCOMM', newPrice.foodComm)
                // commit('SET_FOODSPEC', newPrice.foodSpec)
            })
        }


    }
}
export default exhibitionStore;