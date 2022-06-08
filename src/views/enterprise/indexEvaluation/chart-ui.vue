<template lang="html">
  <div class="chartWrapper">
    <chart :options="options" class="chart1"></chart>
    <!-- <div class="chart-tag">
      改造前
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      options: {
        title : { text: '贵企业进口口岸作业时间分段分析   总平均（小时）' },
        itemStyle: {
          color: 'rgb(0, 104, 190)'
        },
        barWidth: 20,
        series : [
          {
              name:'总平均',
              type:'bar',
              stack: 'all',
              label: {
                  normal: {
                      show: true,
                      position: 'left'
                  }
              },
              itemStyle: {
                  normal: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                  }
              },
              data:[]
          },
          {
              name:'总平均',
              type:'bar',
              stack: 'all',
              label: {
                  normal: {
                      show: true,
                      position: 'top',
                      formatter ({ value }) {
                        if (value !== 0) {
                          return value > 0 ? value : value * -1
                        }
                      }
                  }
              },
              data:[]
          },
          {
              name:'总平均',
              type:'bar',
              stack: 'all',
              label: {
                  normal: {
                      show: true
                  }
              },
              itemStyle: {
                  normal: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                  }
              },
              data:[]
          },
          {
              name:'总平均',
              type:'bar',
              stack: 'all',
              label: {
                  normal: {
                      show: true,
                      position: 'top'
                  }
              },
              data:[]
          }
        ],
        xAxis: [
          {
            type: 'value',
            // min: -100
          }
        ],
        yAxis : [
            {
                type : 'category',
                axisTick : {show: false},
                data : [],
                axisLabel: {
                  rotate: 40
                },
                name: '靠泊',
                nameTextStyle: {
                  color: 'rgb(0, 104, 190)',
                  fontWeight: 'bold'
                }
            }
        ]
      },

      chartJson: {}
    }
  },
  methods: {
    loadChartJson (data) {
      let options = this.options
      let data1 = [], data2 = [], data3 = [], data4 = [], yarr = []

      for (let key in data) {
        let d = data[key], dataObj

        switch (key) {
          case 'a7':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 0, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[0] = d.name
            break;
          case 'a6':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 1, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[1] = d.name
            break;
          case 'a5':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 2, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[2] = d.name
            break;
          case 'a4':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 3, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[3] = d.name
            break;
          case 'a3':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 4, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[4] = d.name
            break;
          case 'a2':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 5, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[5] = d.name
            break;
          case 'a1':
            // console.log(d);
            dataObj = this.setAlldatas(data1, data2, data3, data4, 6, d)
            data1 = dataObj.data1
            data2 = dataObj.data2
            data3 = dataObj.data3
            data4 = dataObj.data4
            yarr[6] = d.name
            break;
          default:
        }
      }

      options.series[0].data = data1
      options.series[1].data = data2
      options.series[2].data = data3
      options.series[3].data = data4
      options.yAxis[0].data = yarr
      this.options = options
      // console.log(options);
    },


    setAlldatas (data1, data2, data3, data4, index, d) {

    // data1[0] = d.end >= 0 ? d.end : '-'
    // data2[0] = d.start >= 0 ? d.end : '-'
    // data3[0] = d.end >= 0 ? d.end : '-'
    // data4[0] = d.end >= 0 ? d.end : '-'

        if (d.start < 0 && d.end >= 0) {
          data1[index] = '-'
          data2[index] = d.start
          data3[index] = '-'
          data4[index] = d.end
        }

        if (d.start < 0 && d.end < 0) {
          data1[index] = d.end
          data2[index] = (d.start - d.end).toFixed(2)
          data3[index] = '-'
          data4[index] = '-'
        }

        if (d.start >= 0) {
          data1[index] = '-'
          data2[index] = '-'
          data3[index] = d.start
          data4[index] = (d.end - d.start).toFixed(2)
        }

        return { data1, data2, data3, data4 }
    }
  },
  watch: {
    chartuiData () {
      // console.log(this.chartuiData);
      if (this.chartuiData) {
        this.loadChartJson(this.chartuiData[this.type])
      }
    }
  },
  computed: {
    ...mapState('chartui', {
      chartuiData: state => state.chartuiData
    })
  },
  props: ['type']
}
</script>

<style lang="css">
.echarts {
  height: 400px;
  width: 900px;
}

.chartWrapper {
  position: relative;
    height: 400px;
    width: 900px;
}

.chart-tag {
  position: absolute;
  top: 0;
  right: 80px;
  border: 1px solid rgb(0, 104, 190);
  width: 80px;
  text-align: center;
  height: 30px;
  line-height: 28px;
  color: rgb(0, 104, 190);
}
</style>
