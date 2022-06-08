<template>
    <div id="radar">
        <div class="header">
            <span>{{title}}</span>
        </div>
        <div :id="radarId" style="height: 100%"></div>
        <!-- <div class="tooltip" ref="tooltip" v-show="tooltipShow">
            <span class="title">{{axisLabel[index]}}</span>
            <div class="row">
                <div class="marker" style="background: #ffe445"></div>
                <span>2019:</span>
                <span class="value">{{value[1]}}</span>
                <span class="unit">{{unit[this.index]}}</span>
                <img :src="imgSrc" />
                <span class="result" ref="result">{{result}}</span>
            </div>
            <div class="row">
                <div class="marker" style="background: #1f5ff2"></div>
                <span>2018:</span>
                <span class="value">{{value[0]}}</span>
                <span class="unit">{{unit[this.index]}}</span>
            </div>
        </div> -->
    </div>    
</template>

<script>
let echarts = require("echarts/lib/echarts");
import { setCookie, getUserRole, removeCookie, getCookie, getRouterName} from "@/until/getToken";
export default {
    props: ['title', 'radarId', 'radarData'],
    data() {
        return {
            imgSrc: '',
            unit: ['(家)', '(万美元)', '(件)', '', '(家)'],
            result: '',
            axisLabel: ['参展国家数/地区', '展品价值总额\n(万美元)', '展品种类', '展位数', '参展商数(家)'],
            value: [],
            index: 0,
            charts: '',
            tooltipShow: false,
            option: {
                // tooltip: {
                    // trigger: 'item',
                    // formatter: function(params) {
                    //     console.log(params)
                    // }
                // },
                legend: {
                    data: [(getCookie('date')*1 - 1),getCookie('date')*1],
                    selected: {
                        '展位数': false
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    top: 10,
                    right: 10,
                },
                color: ['rgba(31,95,242,0.8)', 'rgba(255,200,62,0.8)'],
                radar: {
                    radius: '50%',
                    center: ['50%', '60%'],
                    splitNumber: 4,
                    name: {
                        textStyle: {
                            fontSize: 18
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: 0.3
                        }
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#fff',
                            opacity: 0.3
                        }
                    },
                    splitLabel: {
                        show: true
                    },
                    splitArea: {
                        areaStyle: {
                            opacity: 0,
                        }
                    },
                    triggerEvent: true,
                    indicator:[
                        {
                            name: '参展国家数/地区',
                        },
                        {
                            name: '展品价值总额\n(万美元)',
                        },
                        {
                            name: '展品种类',
                        },
                        {
                            name: '展位数',
                        },
                        {
                            name: '参展商数(家)',
                        },
                    ]
                },
                series:[{
                    type: 'radar',
                    areaStyle: {
                        normal: {
                            // opacity: 0.4
                        }
                    },
                    data: [
                        {
                            name: '2018',
                            value: []
                        },
                        {
                            name: '2019',
                            value: []
                        }
                    ]
                }]
            }
        }
    },
    mounted() {
        this.charts = echarts.init(document.getElementById(this.radarId));
        this.charts.on('mouseover', (params) => {
            this.index = this.axisLabel.indexOf(params.name);
            if(this.index < 0) {
                return ;
            }
            this.option.radar.indicator[this.index].color = '#fbc500'
            this.charts.setOption(this.option)
            // this.$refs.tooltip.style.left = params.event.event.x + 10 + "px";
            // this.$refs.tooltip.style.top = params.event.event.y + 10 + "px";
            // this.tooltipShow = true;
            this.value = [];
            let parentP = {
                value2018: '',
                value2019: '',
                color: '',
                result: '',
                unit: '',
                imgSrc: ''
            };
            for(let i = 0; i < this.option.series[0].data.length; i++) {
                this.value.push(this.option.series[0].data[i].value[this.index])
            }
            parentP.value2018 = this.option.series[0].data[0].value[this.index];
            parentP.value2019 = this.option.series[0].data[1].value[this.index];
            parentP.unit = this.unit[this.index];
            if(this.value.length > 1) {
                if( Number(this.value[1]) > Number(this.value[0])) {
                    parentP.imgSrc = "up.png";
                    parentP.result = Number((parentP.value2019 / parentP.value2018 - 1) * 100).toFixed(2) + '%';
                    parentP.color = "#f22b2b";
                } else {
                    parentP.imgSrc = "down.png";
                    if(parentP.value2019==0&&parentP.value2018==0)
                        parentP.result=0+'%'
                    else
                        parentP.result = Number((1 - parentP.value2019 / parentP.value2018) * 100).toFixed(2) + '%';
                    parentP.color = "#27d980";
                }
            } else {
                parentP.imgSrc = "";
            }
            params.parentP = parentP;
            this.$emit('showTip', params)

        })
        this.charts.on('mouseout', (params) => {
            let index = this.axisLabel.indexOf(params.name);
            if(index < 0) {
                return ;
            };
            // this.tooltipShow = false;
            this.$emit('hideTip')
            this.option.radar.indicator[index].color = '#fff'
            this.charts.setOption(this.option)
        })
        this.charts.setOption(this.option)
    },
    methods: {
        init() {
            console.log(this.radarData)
            let nowYear = getCookie('date')*1 //判断当前年
            let preYear =( getCookie('date')*1 - 1) //判断当前年
            let nowYearData = [] //当前年数据
            let preYearData = [] //上一年数据

            preYearData.push(this.radarData[preYear].COUNTRY_NUM);
            preYearData.push(parseFloat(this.radarData[preYear].TOTALPRICE /10000).toFixed(2));
            preYearData.push(this.radarData[preYear].EXHICATEGORY);
            preYearData.push(this.radarData[preYear].POSITION);
            preYearData.push(this.radarData[preYear].COMPANY);

            nowYearData.push(this.radarData[nowYear].COUNTRY_NUM);
            nowYearData.push(parseFloat(this.radarData[nowYear].TOTALPRICE /10000).toFixed(2));
            nowYearData.push(this.radarData[nowYear].EXHICATEGORY);
            nowYearData.push(this.radarData[nowYear].POSITION);
            nowYearData.push(this.radarData[nowYear].COMPANY);

            for(let i = 0; i < 5; i++) {
                this.option.radar.indicator[i].max = Math.max(preYearData[i], nowYearData[i]) * 4/3;
            }

            this.option.series[0].data[0].value = preYearData;
            this.option.series[0].data[1].value = nowYearData;

            this.option.series[0].data[0].name = preYear;
            this.option.series[0].data[1].name = nowYear;

            //设置图例
            this.option.legend.data[0] = preYear;
           this.option.legend.data[1] = nowYear;


            this.charts.setOption(this.option)
        }
    },
    watch: {
        radarData(newVal, oldVal) {
            this.init()
        }
    }
}
</script>

<style lang="scss" scoped>
#radar {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #0037b2;
    transform: none;
    .header {
        position: absolute;
        height: 15%;
        width: 100%;
        border-bottom: 1px solid #0037b2;
        color: #fff;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: linear-gradient(90deg, #1f5ff2 0%, rgba(31, 95, 242, 0.03) 100%);
        span {
            margin-left: 1rem
        }
    }
    
}
</style>
