import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
import axios from 'axios'
import regionTable from '@/until/corresponding'
import {
    setCookie,
    getUserRole,
    removeCookie,
    getCookie,
    getRouterName
  } from "@/until/getToken";
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
        COMPANY: 0,
        POSITION: 0,
        BATCHNUM: 0,
        TOTALPRICE: 0,
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
const newComputed = {
    namespaced: true,
    state: {
        nowyears:'',
        viewsOff: [true, true],
        /**
         * 当前选中的区域代码
         */
        selectedRegion: 0,
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
        nowYearsData: {
            name: '全球概况',
            countryData: {
                regionNum: 0,
                exhibitor: 0,
                exPlatform: 0,
                exhibits: 0,
                worth: 0,
            },
            priceData: {
                costumePrice: 0,
                equipPrice: 0,
                medicalPrice: 0,
                homeAppliancesPrice: 0,
                foodPrice: 0,
                servicePrice: 0,
                carPrice: 0
            }
        },
        /**
         * 滚动部分所有的数据  
         */
        scroll_AllData: [],
        new_scroll_AllData: [],
        /**
         * 仪表盘部分所有数据
         */
        gauge_AllData: {},
        
    },
    mutations: {

        SET_NEW_TITLE(state,value){
           state.nowYearsData.name = value
        },
        viewChange(state, viewState) {
            state.viewsOff = viewState
        },
        /**
         * 区域代码变化引起视图上数据变更
         * @param {*} state 
         * @param {*} code 选中区域的代码
         */
        changeSelected(state,code) {    //设置价值
            state.selectedRegion = code;
            var arr = [], brr = [];
            let d = state.scroll_AllData
            let countryId = []
            d.forEach(ele=>{
                countryId.push((ele.COUNTRY)*1)
            })
           
            if( !isNaN(code) && countryId.indexOf(code) === -1){
                state.nowYearsData.name = getRegionName(code);
                state.nowYearsData.countryData = {
                    regionNum:  0,
                    exhibitor: 0,
                    exPlatform: 0,
                    exhibits:  0,
                    worth:0,
                }
                state.nowYearsData.priceData = {
                    costumePrice: 0,
                    equipPrice: 0,
                    medicalPrice: 0,
                    homeAppliancesPrice:0,
                    foodPrice: 0,
                    servicePrice: 0,
                    carPrice:0
                }
                return  false
            }else{
                if (!isNaN(code)) {   // 选中的是国家
                    state.nowYearsData.name = getRegionName(code);
                    arr = d.filter(item => {
                        return item.COUNTRY == code
                    })
                    brr = state.gauge_AllData.filter(item => {
                        return item.COUNTRYNUMBER == code
                    })
                }  else if (code === 'GLB') {  // 选中的是全球
                    state.nowYearsData.name = '全球概况';
                    let obj = {
                        COUNTRY_NUM: 0,
                        COMPANY: 0,
                        POSITION: 0,
                        BATCHNUM: 0,
                        TOTALPRICE: 0,
                    };
                    d.forEach(ele => {
                        if (ele.STATISTIC_TYPE === '1') {
                            obj.COUNTRY_NUM++;
                            obj.COMPANY += parseInt(ele.COMPANY || 0)
                            obj.POSITION += parseInt(ele.POSITION || 0)
                            obj.BATCHNUM += parseInt(ele.BATCHNUM || 0)
                            obj.TOTALPRICE += parseFloat((ele.TOTALPRICE)|| 0)
                        }
                    });
                    if(state.nowyears == '2019'){
                        obj.COMPANY = 3653;
                        obj.POSITION = 3637;
                     }
                    obj.worth = Math.round(obj.worth)
                    // obj.COMPANY = 3653;  //这两个数字写死的 
                    // obj.POSITION = 3637;
                    arr.push(obj)


                    let obj2 = {}
                    let preArr =[]
                    preArr = state.gauge_AllData.filter(item => {
                        return item.REGIONTYPE == 4
                    })
                    obj2 = {
                        COMMODITYPRICE: preArr[0]['COMMODITYPRICE'],
                        INTELLIGENCEPRICE: preArr[0]['INTELLIGENCEPRICE'],
                        MEDICALDEVICESPRICE: preArr[0]['MEDICALDEVICESPRICE'],
                        CONSUMERELECTRONICSPRICE: preArr[0]['CONSUMERELECTRONICSPRICE'],
                        FOODPRICE: preArr[0]['FOODPRICE'],
                        TRADESERVICESPRICE: preArr[0]['TRADESERVICESPRICE'],
                        CARPRICE: preArr[0]['CARPRICE']
                     }

                     brr.push(obj2)

                } 
                
                else if (code === 'C$E') {  // 选中的是国家馆
                    state.nowYearsData.name = '国家馆';
                    arr = d.filter(item => {
                        return item.STATISTIC_TYPE == 4;
                    })
                   
                    brr = state.gauge_AllData.filter(item => {
                        return item.REGIONTYPE == 5;
                    })
    
                } else if (code === 'B$R') {  // 选中的是一带一路
                    state.nowYearsData.name = '一带一路';
                    arr = d.filter(item => {
                        return item.STATISTIC_TYPE == 3;
                    })
                    brr = state.gauge_AllData.filter(item => {
                        return item.REGIONTYPE == 3;
                    })
                    console.log(arr)
                } else {  // 选中的是大洲
                    var regionRelative = {
                        AS: '亚洲',
                        AF: '非洲',
                        NA: '北美洲',
                        SA: '南美洲',
                        OC: '大洋洲',
                        EU: '欧洲'
                    }
                    state.nowYearsData.name = regionRelative[code];
                    arr = d.filter(item => {
                        return item.STATISTIC_TYPE == 2 && item.CONTINENT == code;
                    })
                    brr = state.gauge_AllData.filter(item => {
                        return item.REGIONTYPE == 2 && item.COUNTRYCODE == code;
                    })
                }
                var obj = arr[0];
                console.log(obj)
                state.nowYearsData.countryData = {
                    regionNum: obj['COUNTRY_NUM'] || 0,
                    exhibitor: obj['COMPANY']||0,
                    exPlatform:   obj['POSITION']|| 0,
                    exhibits:  obj['BATCHNUM']|| 0,
                    worth:(Math.round(obj['TOTALPRICE'] / 10000)) || 0,
                }
                // if(code === 'C$E') {
                //     state.nowYearsData.countryData.regionNum = 67;
                //     state.nowYearsData.countryData.exhibitor = 70;
                //     state.nowYearsData.countryData.exPlatform = 70;
                // }
                state.nowYearsData.priceData = {
                    costumePrice: brr[0]['COMMODITYPRICE'],
                    equipPrice:  brr[0]['INTELLIGENCEPRICE'],
                    medicalPrice: brr[0]['MEDICALDEVICESPRICE'],
                    homeAppliancesPrice: brr[0]['CONSUMERELECTRONICSPRICE'],
                    foodPrice: brr[0]['FOODPRICE'],
                    servicePrice:brr[0]['TRADESERVICESPRICE'],
                    carPrice: brr[0]['CARPRICE']
                }

            }
            
        },

        
        SetNewData(state, res) {
            state.scroll_AllData = res;
            let obj = {
                regionNum: 0,
                exhibitor: 0,
                exPlatform: 0,
                exhibits: 0,
                worth: 0,
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
        },
        setYears(state,year){
            state.nowyears = year
            console.log(state.nowyears)
        },
        SET_GLOBALTOTAL(state, value) {
            state.GlobalTotal = value
            state.nowYearsData.countryData = value
        },
        SET_GLOBALGAUGE(state, value) {
            state.nowYearsData.priceData = value
        },
        SET_GAUGEALLDATA(state, res) {
            state.gauge_AllData = res
        },
    },
    getters: {
        getViewState: state => state.viewsOff,
        getRegionCode: state => state.selectedRegion,
        getDataS$G: state => state.nowYearsData,
    },
    actions: {
        getNewRegionData({ commit },years) {   //设置全球国家地区数量
            commit('setYears',years)
            publicInter(interfaceUrl.queryRegionalGrouping).then(r => {
                let obj = {
                    regionNum: 0,
                    exhibitor: 0,
                    exPlatform: 0,
                    exhibits: 0,
                    worth: 0,
                };
                console.log(years)
                // return false
                if (r.code == '200') {
                    // let nowYear = getCookie('date')*1
                    let paramsYear = years*1
                    
                   commit('SetNewData', r.allListMap[paramsYear])
                    
                    let d = r.allListMap[paramsYear];
                    d.forEach(ele => {
                        if (ele.STATISTIC_TYPE === '1') {
                            obj.regionNum++;
                            obj.exhibitor += parseInt(ele.COMPANY || 0)
                            obj.exPlatform += parseInt(ele.POSITION || 0)
                            obj.exhibits += parseInt(ele.BATCHNUM || 0)
                            obj.worth += parseFloat((ele.TOTALPRICE) / 10000 || 0)
                        }
                    });
                    if(years == '2019'){
                        obj.exhibitor = 3653;
                        obj.exPlatform = 3637;
                     }
                    obj.worth = Math.round(obj.worth)
                    // obj.exhibitor = 3653;  //这两个数字写死的 
                    // obj.exPlatform = 3637;
                    commit('SET_GLOBALTOTAL', obj)

                }
            })
        },
        getNewGaugeData({ commit },years) {  //设置全球价值
            publicInter(interfaceUrl.queryExhPrice, {}).then(r => {
                if (r.code === 200) {
                    let newPrice = r[years*1]
                    commit('SET_GAUGEALLDATA',newPrice)
                    let obj = {}
                    let arr = newPrice.filter(item => {
                        return item.REGIONTYPE == 4
                    })
                    obj = {
                        costumePrice: arr[0]['COMMODITYPRICE'],
                        equipPrice: arr[0]['INTELLIGENCEPRICE'],
                        medicalPrice: arr[0]['MEDICALDEVICESPRICE'],
                        homeAppliancesPrice: arr[0]['CONSUMERELECTRONICSPRICE'],
                        foodPrice: arr[0]['FOODPRICE'],
                        servicePrice: arr[0]['TRADESERVICESPRICE'],
                        carPrice: arr[0]['CARPRICE']
                     }
                    commit('SET_GLOBALGAUGE', obj)
                }
            })
        },


    }
}

export default newComputed;