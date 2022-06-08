<template>
  <div class="bar">
    <div class="header">
      <span>{{title}}</span>
    </div>
    <div
      class="content"
      id="polar"
    >
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import { setCookie, getUserRole, removeCookie, getCookie, getRouterName} from "@/until/getToken";
export default {
  props: ['barData', 'title', 'barType', 'barId'],
  data() {
    return {
        charts: '',
        option: {
            color: ['#178fff', '#ffe445'],
            legend: {
                // data: ['2018', '2019'],
                data:[(getCookie('date')*1 - 1).toString(),getCookie('date')],
                textStyle: {
                    color: '#fff'
                },
                top: '4%'
            },
            title: [],
            series: []
        }
    }
  },
  methods: {
    init() {
        let title = ['参展国家数/地区', '参展商数(家)', '展位数', '展品种类', '展品价值总额\n(万美元)'];
        let key = ['COUNTRY_NUM', 'COMPANY', 'POSITION', 'EXHICATEGORY', 'TOTALPRICE'];
        let nowYear = getCookie('date')*1 //判断当前年
        let preYear =( getCookie('date')*1 - 1) //判断当前年
        for(let i = 0; i < title.length; i++) {
             let nowYearData = this.barData[nowYear][key[i]] //当前年数据
             let preYearData = this.barData[preYear][key[i]] //上一年数据
            if( i == 4) {
                preYearData = Math.round(preYearData / 10000);
                nowYearData = Math.round(nowYearData / 10000);
            }
            let percent2018, percent2019, result;
            if(Number(preYearData) > Number(nowYearData)) {
                percent2018 = 0.75;
                percent2019 = parseFloat(0.75 * nowYearData / preYearData).toFixed(2);
                result = Number((1 - nowYearData / preYearData) * 100).toFixed(2) + '%';
            } else if (Number(preYearData) < Number(nowYearData)) {
                percent2019 = 0.75;
                percent2018 = parseFloat(0.75 * preYearData / nowYearData).toFixed(2);
                result = Number((nowYearData / preYearData - 1) * 100).toFixed(2) + '%';

            } else {
                percent2018 = percent2019 = 0.75;
                result = '0.00'
            }
            let center = [ i*20 + 10 + '%', '50%'];
            this.option.title.push({
                text: title[i],
                left: center[0],
                top: '80%',
                textAlign: 'center',
                textStyle: {
                    fontSize: 16,
                    color: '#fff'
                }
            })
            this.option.title.push({
                text: preYearData,
                left: i*20 + 5 + '%',
                top: '20%',
                textAlign: 'center',
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                }
            })
            this.option.title.push({
                text: nowYearData,
                left: i*20 + 5 + '%',
                top: '25%',
                textAlign: 'center',
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                }
            })
            this.option.series.push({
                name: preYear,
                type: 'pie',
                radius: [60, 75],
                center: center,
                hoverAnimation: false,
                label: {
                    show: false
                },
                data: [
                    {
                        value: percent2018,
                        name: percent2018,
                        itemStyle: {
                                color: '#178fff'
                        },
                    },{
                        value: 1-percent2018,
                        itemStyle: {
                                color: 'transparent'
                        },
                    }
                ]
            }),
            this.option.series.push({
                name: nowYear,
                type: 'pie',
                radius: [45, 60],
                center: center,
                hoverAnimation: false,
                label: {
                    show: false
                },
                data: [
                    {
                        value: percent2019,
                        name: percent2019,
                        itemStyle: {
                                color: '#ffe445'
                        },
                        label: {
                            normal: {
                                formatter: function(params) {
                                    return '{img|}\r\n' + result
                                },
                                rich: {
                                    img: {
                                        height: 15,
                                        width: 15,
                                        backgroundColor: {
                                            image: percent2019 >= percent2018 ?  "up.png" : 'down.png'
                                        }
                                    }
                                },
                                position: 'center',
                                show: true,
                                textStyle:{
                                    color: percent2019 >= percent2018 ? '#f22b2b' : '#27d980',
                                    fontSize: 22
                                }
                            }
                        }
                    },{
                        value: 1-percent2019,
                        itemStyle: {
                                color: 'transparent'
                        },
                    }
                ]
            })
        }
        this.charts.setOption(this.option)
    },
    changeStyle(percent, num) {
        return [{
            value: percent,
            name: percent,
            itemStyle: {
                    color: num ? '#178fff' : '#ffe445'
            },
            label: {
                normal: {
                    formatter: function(params) {
                        return '11%'
                    },
                    position: 'center',
                    show: true,
                    textStyle:{
                        color: 'red',
                        fontSize: 18
                    }
                }
            }
        },{
            value: 1-percent,
            itemStyle: {
                    color: 'transparent'
            },
        }]
    }
  },
  mounted() {
    this.charts = echarts.init(document.getElementById("polar"));
    // this.init()
  },
  watch: {
    barData(newVal, oldVal) {
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
  border: 1px solid #0037b2;
  .header {
    height: 15%;
    border-bottom: 1px solid #0037b2;
    color: #fff;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(90deg, #1f5ff2 0%, rgba(31, 95, 242, 0.03) 100%)
  }
  .content {
    height: 85%;
  }
}
</style>
