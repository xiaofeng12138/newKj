<template>
    <div class="myunit">
        <div class="newTransportClassF" >
            <div class="transportClass">
                <div style="cursor:pointer" @click="showCompare(0)">
                    <img src="../../../assets/ATA.png"/>
                    <span>ATA</span>
                </div>
                <div class="ATA">
                    <div class="ATA-slider">
                        <div class="transportClass2" >
                            <p>进口总额：<span style="color: #1DEAFF;">{{A.IMPORTPRICE + '万美元' }}</span></p>
                            <p>进口批次：<span style="color: #1DEAFF;">{{A.IMPORTBATCH + '批次' }}</span></p>
                        </div>
                        <div class="transportClass2" >
                            <p>核销总额：<span style="color: #1DEAFF;">325万美元</span></p>
                            <p>核销批次：<span style="color: #1DEAFF;">46批次</span></p>
                        </div>
                    </div>
                    
                </div>
                
                <!-- <div class="sipgBackground" @click='sipgShow'></div> -->
            </div> 
        </div>
        <div class="transportClass">
            <div style="cursor:pointer" @click="showCompare(1)">
                <img src="../../../assets/zlp.png"/>
                <span style="border-color: rgba(255,222,29,0.6);">展览品</span>
            </div>
            <div class="ATA">
                <div class="ATA-slider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #FFE91A;">{{B.IMPORTPRICE + '万美元' }}</span></p>
                        <p>进口批次：<span style="color: #FFE91A;">{{B.IMPORTBATCH + '批次' }}</span></p>
                    </div>
                    <div class="transportClass2">
                        <p>核销总额：<span style="color: #FFE91A;">325万美元</span></p>
                        <p>核销批次：<span style="color: #FFE91A;">205批次</span></p>
                    </div>
                </div>
            </div>

        </div>
        <div class="transportClass">
            <div style="cursor:pointer" @click="showCompare(2)">
                <img src="../../../assets/bszs.png"/>
                <span style="border-color: #95EF65;">保税展示</span>
            </div>
            <div class="ATA">
                <div class="ATA-slider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #95EF65;">{{C.IMPORTPRICE + '万美元' }}</span></p>
                        <p>进口批次：<span style="color: #95EF65;">{{C.IMPORTBATCH+ '批次' }}</span></p>
                    </div>
                    <div class="transportClass2">
                        <p>核销总额：<span style="color: #95EF65;">10783万美元</span></p>
                        <p>核销批次：<span style="color: #95EF65;">113批次</span></p>
                    </div>
                </div>
            </div>

            
        </div> 
        <div class="transportClass"  style="border-bottom: none">
            <div style="cursor:pointer" @click="showCompare(3)">
                <img src="../../../assets/ybmy.png"/>
                <span style="border-color: rgba(255,118,118,0.6);">一般贸易等</span>
            </div>
            <div class='ATA'>
                <div class="ATA-slider imgSlider">
                    <div class="transportClass2">
                        <p>进口总额：<span style="color: #FF7676;">{{D.IMPORTPRICE + '万美元' }}</span></p>
                        
                    </div>
                    <div class="transportClass2">
                        <img src="../../../assets/sipg.png" style="height:100%" alt="">

                    </div>
                </div>
              
            </div>

            
        </div>  
          <Modal v-model="show" width=800 class="customModal" >
            <div slot="header"></div>
            <div class="body">
                <div class="img">
                    <img src="@/assets/ATA.png" @click="setOption(0)" :class="{active:imgList[0]}" alt="">
                    <img src="@/assets/zlp.png" @click="setOption(1)" :class="{active:imgList[1]}"  alt="">
                    <img src="@/assets/bszs.png" @click="setOption(2)" :class="{active:imgList[2]}"  alt="">
                    <img src="@/assets/bszs.png" @click="setOption(3)" :class="{active:imgList[3]}"  alt="">
                </div>
                <div id="barPictrue" ></div>
            </div>
            <div slot="footer"></div>
        

        
    </Modal>  
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
  data() {
    return {
      //海运空运其他的数据
      show: false,
      chart: null,
      imgList: [true, false, false, false],
      options: {
        legend: {
          data: [
            {
              name: "2018",
              icon: "rect"
            },
            {
              name: "2019",
              icon: "rect"
            }
          ],
          textStyle: {
            color: "#fff"
          },
          top: 25
        },
        tooltip: {
          formatter: function(parmas) {
            // console.log(parmas)

            if (parmas.seriesType === "bar") {
              return (
                parmas.seriesName + "届:" + parmas.data.value + parmas.data.type
              );
            }
          },
          padding: 10,
          extraCssText: {}
        },

        xAxis: [
          {
            data: ["进口总额", "核销总额"],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: "14"
              }
            }
          },
          {
            data: ["进口批次", "核销批次"],
            gridIndex: 1,
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
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
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            name: "(万美元)",
            // max:3500,

            nameTextStyle: {
              color: "#fff"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisLabel: {
              color: "#fff"
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },

            axisTick: {
              show: false
            }
          },
          {
            gridIndex: 1,
            nameTextStyle: {
              color: "#fff"
            },
            name: "(批次)",
            // max:3500,
            axisLabel: {
              color: "#fff"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        grid: [
          {
            xAxisIndex: 0,
            yAxisIndex: 0,
            left: "15%",
            // left: 30,
            bottom: 40,
            width: "30%",
            top: 100
          },
          {
            left: "55%",
            // right: 10,
            width: "30%",
            bottom: 40,
            top: 100
          }
        ],
        series: [
          {
            name: "2018",
            type: "bar",
            data: [
              { value: 347, type: "万美元" },
              { value: 325, type: "万美元" }
            ],
            barWidth: "15%",
            dataType: "",
            itemStyle: {
              normal: {
                borderWidth: 0,

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
                barBorderRadius: 20
              }
            },
            barGap: "30%",
            barCategoryGap: "40%"
          },
          {
            name: "2019",
            type: "bar",
            barWidth: "15%",
            dataType: "万美元",
            itemStyle: {
              normal: {
                borderWidth: 0,
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
                barBorderRadius: 20
              }
            },
            data: [
              { value: 600, type: "万美元" },
              { value: 3200, type: "万美元" }
            ]
          },
          {
            name: "2018",
            type: "bar",
            barWidth: "15%",
            data: [{ value: 53, type: "批次" }, { value: 47, type: "批次" }],
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                borderWidth: 0,

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
                barBorderRadius: 20
              }
            },
            barGap: "30%",
            barCategoryGap: "40%"
          },
          {
            name: "2019",
            type: "bar",
            barWidth: "15%",
            data: [{ value: 53, type: "批次" }, { value: 47, type: "批次" }],
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                borderWidth: 0,
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
                barBorderRadius: 20
              }
            }
          }
        ]
      },
      A: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      B: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      C: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      D: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      _Data: [],
      hoverRight: false,
      reg: /(?=(?!\b)(\d{3})+$)/g
    };
  },
  mounted() {
    this.initQueryTypeOfTransportation();
    this.initChart();
  },
  methods: {
    showCompare(num) {
      this.show = true;

      this.setOption(num);
    },

    setOption(num) {
      this.imgList = [false, false, false, false];
      this.imgList[num] = true;
      var data = this._Data[num];
      var dataOptions = this.options.series;

      this.options.series.forEach((item, i) => {
        if (data[i]) {
          item.data = data[i];
        } else {
          item.data = [];
        }
      });

      this.charts.setOption(this.options, true);

      // console.log(this.options)
    },
    initChart() {
      var echartsBox = document.getElementById("barPictrue");
      this.charts = echarts.init(echartsBox);
      this.charts.setOption(this.options);
    },
    //初始化左1第一个
    initQueryTypeOfTransportation() {
      publicInter(interfaceUrl.queryTypeOfTransportation, {}).then(r => {
        console.log(r)
        if (r) {
          if (r.isOk) {
            this.A = {
              IMPORTPRICE: this.formateTransport(r.msg[0].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg[0].IMPORTBATCH
                ? (parseInt(r.msg[0].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            this.B = {
              IMPORTPRICE: this.formateTransport(r.msg[1].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg[1].IMPORTBATCH
                ? (parseInt(r.msg[1].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            this.C = {
              IMPORTPRICE: this.formateTransport(r.msg[2].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg[2].IMPORTBATCH
                ? (parseInt(r.msg[2].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            this.D = {
              IMPORTPRICE: this.formateTransport(r.msg[3].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg[3].IMPORTBATCH
                ? (parseInt(r.msg[3].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            var a = {
              IMPORTPRICE: this.formateTransport(r.msg2[0].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg2[0].IMPORTBATCH
                ? (parseInt(r.msg2[0].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            var b = {
              IMPORTPRICE: this.formateTransport(r.msg2[1].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg2[1].IMPORTBATCH
                ? (parseInt(r.msg2[1].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            var c = {
              IMPORTPRICE: this.formateTransport(r.msg2[2].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg2[2].IMPORTBATCH
                ? (parseInt(r.msg2[2].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };
            var d = {
              IMPORTPRICE: this.formateTransport(r.msg2[3].IMPORTPRICE) || "0",
              IMPORTBATCH: r.msg2[3].IMPORTBATCH
                ? (parseInt(r.msg2[3].IMPORTBATCH) + "").replace(this.reg, ",")
                : "0"
            };

            this._Data = [
              [
                [
                  {
                    value: this.A.IMPORTPRICE.replace(/,|,/, ""),
                    type: "万美元"
                  },
                  { value: a.IMPORTPRICE.replace(/,|,/, ""), type: "万美元" }
                ],
                [
                  { value: 325, type: "万美元" },
                  { value: 320, type: "万美元" }
                ],
                [
                  {
                    value: this.A.IMPORTBATCH.replace(/,|,/, ""),
                    type: "批次"
                  },
                  { value: a.IMPORTPRICE.replace(/,|,/, ""), type: "批次" }
                ],
                [{ value: 46, type: "批次" }, { value: 40, type: "批次" }]
              ],
              [
                [
                  {
                    value: this.B.IMPORTPRICE.replace(/,|,/, ""),
                    type: "万美元"
                  },
                  { value: b.IMPORTPRICE.replace(/,|,/, ""), type: "万美元" }
                ],
                [
                  { value: 325, type: "万美元" },
                  { value: 300, type: "万美元" }
                ],
                [
                  {
                    value: this.B.IMPORTBATCH.replace(/,|,/, ""),
                    type: "批次"
                  },
                  { value: b.IMPORTPRICE.replace(/,|,/, ""), type: "批次" }
                ],
                [{ value: 20, type: "批次" }, { value: 30, type: "批次" }]
              ],
              [
                [
                  {
                    value: this.C.IMPORTPRICE.replace(/,|,/, ""),
                    type: "万美元"
                  },
                  { value: c.IMPORTPRICE.replace(/,|,/, ""), type: "万美元" }
                ],
                [
                  { value: 10783, type: "万美元" },
                  { value: 10645, type: "万美元" }
                ],
                [
                  {
                    value: this.C.IMPORTBATCH.replace(/,|,/, ""),
                    type: "批次"
                  },
                  { value: c.IMPORTPRICE.replace(/,|,/, ""), type: "批次" }
                ],
                [{ value: 113, type: "批次" }, { value: 120, type: "批次" }]
              ],
              [
                [
                  {
                    value: this.D.IMPORTPRICE.replace(/,|,/, ""),
                    type: "万美元"
                  }
                ],
                [{ value: d.IMPORTPRICE.replace(/,|,/, ""), type: "万美元" }]
              ]
            ];
          }
        }
      });
    },
    formateTransport(value) {
      if (value) {
        if (value > 10000) {
          return (parseInt(value / 10000) + "").replace(this.reg, ",");
        } else {
          return parseFloat(value / 10000).toFixed(2);
        }
      } else {
        return "0";
      }
    },
    sipgShow() {
      this.$emit("showSipg");
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../styles/mixin.scss";
.body {
  img {
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    filter: grayscale(100%);
    &.active {
      filter: none;
    }
  }
  #barPictrue {
    width: 800px;
    padding: 0 2rem;

    height: 300px;
  }
  .img {
    display: flex;
    align-items: center;
    padding: 2rem 8rem;
    justify-content: space-between;
  }
}
.newTransportClassF {
  min-height: 3.5rem;
  margin: 0 20px;
  height: 25%;
  position: relative;
  border-bottom: 0.5px solid #182766;
  overflow: hidden;
  cursor: pointer;
  // padding-top:10px;
  .transportClass {
    overflow: visible;
    position: relative;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
// .transportRight{
//     left: -70px;
//     animation: mymove 1s;
// }
.myunit {
  @include thumb;
  overflow-y: auto;
  padding-top: 10px;
  > .transportClass {
    display: flex;
    align-items: center;
    height: 25%;
    min-height: 3rem;
    margin: 0 20px;
    justify-content: space-between;
    position: relative;
    border-bottom: 0.5px solid #182766;
    overflow: hidden;
    white-space: nowrap;
  }
}
.transportClass {
  &.sipg {
    background: url("../../../assets/sipg.png") no-repeat 100% 50%;
    background-size: 10% 70%;
  }

  img {
    width: 42px;
    height: 42px;
  }

  > div {
    display: inline-block;
    vertical-align: middle;
    width: 40%;
    position: relative;
    margin-right: -3px;
    text-align: left;
    > span {
      position: absolute;
      left: 36px;
      top: 6px;
      display: inline-block;
      width: 70px;
      height: 30px;
      border: 1px solid #1deaef;
      border-left: none;
      border-radius: 0 15px 15px 0;
      line-height: 30px;
      text-align: center;
      padding-right: 6px;
      border-color: rgba(29, 234, 239, 0.6);
    }
  }
  .sipgBackground {
    background: url("../../../assets/sipg.png");
    width: 66px;
    height: 48px;
    vertical-align: top;
  }
  .ATA {
    width: 55%;
    text-align: left;
    overflow: hidden;
    margin-left: -3px;

    &:hover {
      > div.ATA-slider {
        transform: translate(-50%, 0);
        &.imgSlider {
          transform: translate(-10%, 0);
        }
      }
    }
    > div.ATA-slider {
      display: flex;
      transition: all 1s ease-in-out;
      justify-content: flex-start;
      flex-wrap: nowrap;
      width: 200%;
      > div {
        width: 50%;
      }
    }
    // padding-left: 10px;
  }
}

@keyframes mymove {
  from {
    left: 0;
  }
  to {
    left: -70px;
  }
}
</style>
<style scoped rel="stylesheet/css">
@media screen and (min-width: 1800px) {
  .myunit .transportClass img {
    width: 44px;
    height: 44px;
  }
  .myunit .transportClass > div > span {
    width: 128px;
    height: 38px;
    top: 4px;
    left: 32px;
    border-radius: 0 19px 19px 0;
    line-height: 38px;
    font-size: 1.1rem;
  }
  .transportClass2 {
    font-size: 1.1rem;
  }
}
</style>