<template>
  <div class="bar">
    <div class="header">
      <span>{{title}}</span>
    </div>
    <div
      class="content"
      :id="barId"
    >
    </div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import {getCookie,setCookie} from '@/until/getToken'
export default {
  props: ['barData', 'title', 'barType', 'barId'],
  data() {
    return {
      labelAttr: [],
      charts: '',
      unit: ['(家)', '(家)', '', '(件)', '(万美元)'],
      axisLabel: ['参展国家/地区数', '参展商数(家)', '展位数', '展品种类', '展品价值总额(万美元)', ],
      option: {
        textStyle: {
          color: '#fff'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          // formatter: '{b}<br/> {a}:{c}'
          formatter: function(params) {
            let tooltipLabel = params[0].axisValue;
            for(let i = 0; i < params.length; i++){
              tooltipLabel = tooltipLabel + '<br/>' + params[i].marker + params[i].seriesName + ':' + params[i].value;
            }
            return tooltipLabel
          }
        },
        color: ['#178fff', '#ffe445'],
        legend: {
          data: ['2018', '2019'],
          textStyle: {
            color: '#fff'
          },
          top: '4%'
        },
        xAxis: [
          {
            type: 'log',
            show: false
          },
        ],
        yAxis: {
          type: 'category',
          axisLabel: {
              show: true,
              textStyle: {
                  color: '#fff',
                  fontSize: 16
              }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: ['展品价值总额(万美元):','展品种类:','展位数:','参展商数:', '参展国家/地区数:'   ],

        },
        series: [
          {
            name: '2018',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          },
          {
            name: '2019',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      },
      option2: {
        baseOption: {
          textStyle: {
            color: '#fff'
          },
          grid: [
            {
              show: false,
              left: '1%',
              // top: '10%',
              bottom: '3%',
              containLabel: true,
              width: '0'
            },
            {
              show: false,
              left: '26%',
              // top: '10%',
              bottom: '3%',
            //   containLabel: true,
              width: '30%'
            },
            {
              show: false,
              right: '12%',
              bottom: '3%',
              // top: '10%',
              containLabel: true,
              width: '30%'
            },
            {
              show: false,
              right: '2%',
              bottom: '3%',
              // top: '10%',
              containLabel: true,
              width: '10%'
            }
          ],
          tooltip: {
            show: false
          },
          // color: ['#178fff', '#ffe445'],
          color: ['#ffe445', '#178fff'],
          legend: {
            data: ['2018', '2019'],
            // data:[(getCookie('date')*1 - 1),getCookie('date')*1],
            textStyle: {
              color: '#fff'
            },
            top: '4%'
          },
          xAxis: [
            {
              show: false,
            },
            {
              type: 'log',
              inverse: true,
              splitLine: {
                  show: false,
              },
              axisLine: {
                  show: false,
              },
              axisLabel: {
                  show: false,
              },
              show: false,
              gridIndex: 1
            },
            {
              type: 'log',
              splitLine: {
                  show: false,
              },
              axisLine: {
                  show: false,
              },
              axisLabel: {
                  show: false,
              },
              show: false,
              gridIndex: 2,
            },
            {
              show: false,
              gridIndex: 3,
            },
          ],
          yAxis: [
            {
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#fff',
                      fontSize: 18
                  }
              },
              data: ['参展国家/地区数:', '参展商数(家):', '展位数:', '展品种类:', '展品价值总额(万美元):'],
            },
            {
              type: 'category',
              gridIndex: 1,
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                  show: false
              },
              data: ['参展国家/地区数:', '参展商数(家):', '展位数:', '展品种类:', '展品价值总额(万美元):'],

            },
            {
              type: 'category',
              gridIndex: 2,
              inverse: true,
              position: 'left',
              axisLabel: {
                  show: false
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              data: ['参展国家数/地区:', '参展商数(家):', '展位数:', '展品种类:', '展品价值总额(万美元):'],

            },
            {
              type: 'category',
              inverse: true,
              gridIndex: 3,
              position: 'right',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                  show: true,
                  formatter: (params, index) => {
                      if(this.labelAttr[index].color == "#f22b2b") {
                        return '{imgUp|} ' + this.labelAttr[index].result
                      } else {
                        return '{imgDown|} ' + this.labelAttr[index].result
                      }
                  },
                  rich: {
                      imgUp: {
                          height: 15,
                          width: 15,
                          backgroundColor: {
                              image: "up.png"
                          }
                      },
                      imgDown: {
                          height: 15,
                          width: 15,
                          backgroundColor: {
                              image: 'down.png'
                          }
                      },
                  },
                  position: 'center',
                  textStyle:{
                      color: (params, index) => {
                        return this.labelAttr[index].color;
                      },
                      fontSize: 22
                  }
              },
              data: [11,11,11,11,11],
            },
          ],
          series: [
            {
              name: '0',
              type: 'bar',
              // stack: 'one',
              xAxisIndex: 1,
              yAxisIndex: 1,
              barWidth: 30,
              label: {
                  normal: {
                      show: true,
                      position: 'insideRight',
                      textShadowColor: '#000',
                      textShadowBlur: 4,
                      textShadowOffsetY: 4,
                      textStyle: {
                        fontSize: 16
                      }
                  }
              },
              data: [0, 0, 0, 0, 0]
            },
            {
              name: '0',
              type: 'bar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              // stack: 'right',
              barWidth: 30,
              label: {
                  normal: {
                      show: true,
                      position: 'insideLeft',
                      textShadowColor: '#000',
                      textShadowBlur: 4,
                      textShadowOffsetY: 4,
                      textStyle: {
                        fontSize: 16
                      }
                  }
              },
              data: [0, 0, 0, 0, 0]
            }
          ]
        },

      }
    }
  },
  methods: {
    init() {
      if(this.barType == '1'){
        if(this.barData.hasOwnProperty('2018')) {
          let data2018 = [];
          data2018.push(Math.round(this.barData['2018']['TOTALPRICE'] / 10000));
          data2018.push(this.barData['2018']['EXHICATEGORY']);
          data2018.push(this.barData['2018']['POSITION']);
          data2018.push(this.barData['2018']['COMPANY']);
          data2018.push(this.barData['2018']['COUNTRY_NUM']);
          this.option.series[0].data = data2018;
        }
        if(this.barData.hasOwnProperty('2019')) {
          let data2019 = [];
          data2019.push(Math.round(this.barData['2019']['TOTALPRICE'] / 10000));
          data2019.push(this.barData['2019']['EXHICATEGORY']);
          data2019.push(this.barData['2019']['POSITION']);
          data2019.push(this.barData['2019']['COMPANY']);
          data2019.push(this.barData['2019']['COUNTRY_NUM']);
          this.option.series[1].data = data2019;
        }
        
        this.charts.setOption(this.option, true)

      } else if (this.barType == '2') {
        let nowYearData = [] //当前年数据
        let preYearData = [] //上一年数据
        let nowYear = getCookie('date')*1 //判断当前年
        let preYear =( getCookie('date')*1 - 1) //判断当前年
        // this.option2.baseOption.legend.data=[2019,2020]
        
        console.log('aaa',this.option2.baseOption.legend.data)
          nowYearData.push(this.barData[nowYear]['COUNTRY_NUM']);
          nowYearData.push(this.barData[nowYear]['COMPANY']);
          nowYearData.push(this.barData[nowYear]['POSITION']);
          nowYearData.push(this.barData[nowYear]['EXHICATEGORY']);
          nowYearData.push(Math.round(this.barData[nowYear]['TOTALPRICE'] / 10000));
          this.option2.baseOption.series[1].data= nowYearData; 
          this.option2.baseOption.series[1].name= nowYear; 

          //上一年数据
          this.barData[preYear]['COMPANY'] = 4081 ? this.barData[preYear]['COMPANY'] = 3653 : this.barData[preYear]['COMPANY']
          
          this.barData[preYear]['POSITION'] = 4026 ? this.barData[preYear]['POSITION'] = 3637 : this.barData[preYear]['POSITION']
          
          preYearData.push(this.barData[preYear]['COUNTRY_NUM']);
          preYearData.push(this.barData[preYear]['COMPANY']);
          preYearData.push(this.barData[preYear]['POSITION']);
          preYearData.push(this.barData[preYear]['EXHICATEGORY']);
          preYearData.push(Math.round(this.barData[preYear]['TOTALPRICE'] / 10000));
          this.option2.baseOption.series[0].data= preYearData; 
          this.option2.baseOption.series[0].name= preYear; 

        this.setEvent();
        this.setResult();
        this.option2.baseOption.legend.data[0]=preYear.toString()
        this.option2.baseOption.legend.data[1]=nowYear.toString()
        this.charts.setOption(this.option2)
      }
      
    },
    setResult() {
      let arr = [];
      for(let i = 0; i < 5; i++) {
        let attr = {
          result: '',
          color: ''
        };
        let data2018 = this.option2.baseOption.series[0].data[i],
            data2019 = this.option2.baseOption.series[1].data[i];
        if(Number(data2018) >= Number(data2019)) {
            attr.result = Number((1 - data2019 / data2018) * 100).toFixed(2) + '%';
            attr.color = '#27d980'
        } else if (Number(data2018) < Number(data2019)) {
            attr.result = Number((data2019 / data2018 - 1) * 100).toFixed(2) + '%';
            attr.color = '#f22b2b'
        }
        this.labelAttr.push(attr)
      }

    },
    setEvent() {
      this.charts.on('mouseover', (params) => {
          let parentP = {
              value2018: '',
              value2019: '',
              color: '',
              result: '',
              unit: '',
              imgSrc: ''
          };
          let index = this.axisLabel.indexOf(params.name.replace(':', ''));
          if(index < 0) {
              return ;
          }
          parentP.value2018 = this.option2.baseOption.series[0].data[index];
          parentP.value2019 = this.option2.baseOption.series[1].data[index];
          parentP.unit = this.unit[index];
          if( parentP.value2019 >= parentP.value2018) {
              parentP.imgSrc = "up.png";
              parentP.result = Number((parentP.value2019 / parentP.value2018 - 1) * 100).toFixed(2) + '%';
              parentP.color = "#f22b2b";
          } else {
              parentP.imgSrc = "down.png";
              parentP.result = Number((1 - parentP.value2019 / parentP.value2018) * 100).toFixed(2) + '%';
              parentP.color = "#27d980";
          }
          params.parentP = parentP;
          this.$emit('showTip', params)
      });
      this.charts.on('mouseout', (params) => {
            let index = this.axisLabel.indexOf(params.name.replace(':', ''));
            if(index < 0) {
                return ;
            };
            this.$emit('hideTip')
        })
    }
  },
  mounted() {
    this.charts = echarts.init(document.getElementById(this.barId));
    this.charts.setOption(this.option)
    
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
