<template>
    <Modal v-model="show" width=800 class="customModal" >
        <div slot="header" ></div>
        <div class="body">
            <ul class="area">
                <li v-for="ele in area" :key='ele.id' :class="{'active':ele.isActive}" @click="clickArea(ele.key)">{{ele.name}}</li>
            </ul>
            <div id="barPictrue" ref='barPictrue'></div>
        </div>
        <div slot="footer"></div>
    </Modal>   
</template>
<script>
let echarts = require('echarts/lib/echarts');
import { mapGetters, mapMutations, mapActions } from "vuex";
import store from 'vuex'
export default {
  data() {
    return {
      show: false,
      area: [
        {
          isActive: true,
          name: "全球",
          key: "ALL"
        },
        {
          isActive: false,
          name: "亚洲",
          key: "AS"
        },
        {
          isActive: false,
          name: "欧洲",
          key: "EU"
        },
        {
          isActive: false,
          name: "南美洲",
          key: "SA"
        },
        {
          isActive: false,
          name: "北美洲",
          key: "NA"
        },
        {
          isActive: false,
          name: "大洋洲",
          key: "OC"
        },
        {
          isActive: false,
          name: "非洲",
          key: "AF"
        },
        {
          isActive: false,
          name: "国家馆",
          key: "C$E"
        },
        {
          isActive: false,
          name: "一带一路国家/地区",
          key: "B$R"
        }
      ],
      chart:null,
      options: {
        legend: {
          top: "center",
          right: "2%",
          orient: "vertical",
          textStyle: {
            color: "#fff"
          }
        },
        grid:{
          width:'60%',
          left:'20%',
          right:'20%',
          top: '0'
        },

        tooltip: {
          show: "true",
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.7)", // 背景
          padding: [8, 10], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
          formatter: function(params) {
            // console.log(params)
            if(params.seriesIndex==2||params.seriesIndex==3||params.seriesIndex==4||params.seriesIndex==5){
              return (
                params.name +
                "<br>" +
                params.seriesName +
                " ：" +
                params.data.valueA + params.data.unit
              );
            }
          }
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: "14"
              }
            },
            data: [
              "参展国家/地区:",
              "参展商：",
              "展位数：",
              "展品数量：",
              "展品价值总额："
            ]
          },
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: "14"
              }
            },
            data: [
              "参展国家/地区:",
              "参展商：",
              "展位数：",
              "展品数量：",
              "展品价值总额："
            ]
          },
          //第三年的图例
          {
            type: "category",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: "14"
              }
            },
            data: [
              "参展国家/地区:",
              "参展商：",
              "展位数：",
              "展品数量：",
              "展品价值总额："
            ]
          },
        ],
        series: [
          {
            type: "bar",
            yAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
              normal: {
                color: "#121847",
                borderWidth: 0,
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            },
            barWidth: "20%",
            data: [100, 100, 100,100,100]
          },
          {
            type: "bar",
            yAxisIndex: 1,
            barGap: "30%",
            data: [100, 100, 100,100,100],
            zlevel: 1,
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "#121847",
                borderWidth: 0,
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            }
          },
          {
            type: "bar",
            yAxisIndex: 1,
            barGap: "30%",
            data: [100, 100, 100,100,100],
            zlevel: 1,
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "#121847",
                borderWidth: 0,
                shadowBlur: {
                  shadowColor: "rgba(255,255,255,0.31)",
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                }
              }
            }
          },
          {
            name: "2018",
            type: "bar",
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#174CFF"
                  },
                  {
                    offset: 1,
                    color: "#178FFF"
                  }
                ]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barWidth: "20%",
            data: [8, 15, 10]
          },
          {
            name: "2019",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#FFDE1D"
                  },
                  {
                    offset: 1,
                    color: "#FFE445"
                  }
                ]),
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barGap: "30%",
            data: [8, 17, 26]
          },
          {
            name: "2020",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                show: true,
                color:'#f60',
                barBorderRadius: 50,
                borderWidth: 0
              }
            },
            zlevel: 2,
            barGap: "30%",
            data: [8, 17, 26]
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters("exhibitionStore", [
      "getCompareData","getCompareData18","getCompareData19","getCompareData20"
      ])
  },

  mounted(){
    
  },
  methods: {
    ...mapMutations('exhibitionStore',['compareDataChange']),
    initChart(){
         var echartsBox=document.getElementById('barPictrue');
        this.charts=echarts.init(echartsBox);
        this.dataHanlde()
        // this.charts.setOption(this.options)
        


    },
    dataHanlde(){
      //18年
      var data18=[
        {value:this.getCompareData18['regionNum'],valueA:this.getCompareData18['regionNum'],unit:'个'},
        {value:this.getCompareData18['exhibitor']/50,valueA:this.getCompareData18['exhibitor'],unit:'家'},
        {value:this.getCompareData18['exPlatform']/50,valueA:this.getCompareData18['exPlatform'],unit:'个'},
        {value:this.getCompareData18['exhibits']/20000,valueA:this.getCompareData18['exhibits'],unit:'件'},
        {value:this.getCompareData18['worth']/200,valueA:this.getCompareData18['worth'],unit:'万美元'}
      ];
      //19年
      var data19=[
        {value:this.getCompareData19['regionNum'],valueA:this.getCompareData19['regionNum'],unit:'个'},
        {value:this.getCompareData19['exhibitor']/50,valueA:this.getCompareData19['exhibitor'],unit:'家'},
        {value:this.getCompareData19['exPlatform']/50,valueA:this.getCompareData19['exPlatform'],unit:'个'},
        {value:this.getCompareData19['exhibits']/20000,valueA:this.getCompareData19['exhibits'],unit:'件'},
        {value:this.getCompareData19['worth']/200,valueA:this.getCompareData19['worth'],unit:'万美元'}
      ]
      //20年
      var data20=[
        {value:this.getCompareData20['regionNum'],valueA:this.getCompareData20['regionNum'],unit:'个'},
        {value:this.getCompareData20['exhibitor']/50,valueA:this.getCompareData20['exhibitor'],unit:'家'},
        {value:this.getCompareData20['exPlatform']/50,valueA:this.getCompareData20['exPlatform'],unit:'个'},
        {value:this.getCompareData20['exhibits']/20000,valueA:this.getCompareData20['exhibits'],unit:'件'},
        {value:this.getCompareData20['worth']/200,valueA:this.getCompareData20['worth'],unit:'万美元'},
      ]
      this.options.series[3]['data']=data18;
      this.options.series[4]['data']=data19
      
      this.options.series[5]['data']= data20
      this.charts.setOption(this.options)
      // console.log('CompareData',this.getCompareData.now20['regionNum'])
      
    },
    
    clickArea(key) {
      
      this.compareDataChange(key)
      this.dataHanlde();
      this.area.forEach(item=>{
        if(item.key==key){
          item.isActive=true
        }else{
          item.isActive=false
        }
      })

    }
  }
};
</script>

<style lang="scss" scoped>
.body {
  
  width: 100%;
}
#barPictrue {
  width: 800px;
  padding: 0 4rem;
  height: 400px;
}

ul.area {
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem 1rem;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    width:  15%;
    height: 2.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    line-height: 2.5rem;
    color: #fff;
    // padding: 0.3rem 0.8rem;
    // margin: 0 0.55rem 0.9rem;
    margin-bottom:1rem;
    margin-right: 2%;
    text-align: center;
    background: url("../../../../assets/sandbarD.png") 100% 100% no-repeat;
    background-size: cover;
    &.active,
    &:hover {
      color: #000;
      background: url("../../../../assets/sandbarH.png") 100% 100% no-repeat;
    }
  }
  li:nth-child(6) {
    margin-right: 0
  }
  li:last-child {
    width: 32%;
    margin-right: 0
  }
}
</style>
