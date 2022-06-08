<template>
<div>
    <div v-if='hiddenNormal' class="myunit hiddenNormal">
      <div class='after' @click='taggleShow'></div>
      <!-- 不显示一般贸易 -->
        <div></div>
        <div class="transportClass">
          <div class="top">
            <div class="top-left">
              <img src="@/assets/qietu/zpgk/ATA.svg" class="top-img" />
              <span class="top-span">ATA</span>
            </div>
            <div class="top-right" @click="showCompare(0)">
              <span>历届数据对比</span>
            </div>
          </div>
          <div class="ATA">
            <div class="ATA-left">
              <div class="ATA-leftt">
                <p class="p1" style="color: #2c98f2">{{compareData.ataImportPrice}}</p>
                <p class="p2">进口总额(万美元)</p>
              </div>
              <div class="ATA-rightt">
                <p class="p1" style="color: #2c98f2">{{compareData.ataImportBatch}}</p>
                <p class="p2">进口批次(批次)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="transportClass">
          <div class="top">
            <div class="top-left">
              <img src="@/assets/qietu/zpgk/zlp.svg" class="top-img" />
              <span class="top-span">展览品</span>
            </div>
            <div class="top-right" @click="showCompare(1)">
              <span>历届数据对比</span>
            </div>
          </div>
          <div class="ATA">
            <div class="ATA-left">
              <div class="ATA-leftt">
                <p class="p1" style="color: #2c98f2">{{compareData.exhibitsImportPrice}}</p>
                <p class="p2">进口总额(万美元)</p>
              </div>
              <div class="ATA-rightt">
                <p class="p1" style="color: #2c98f2">{{compareData.exhibitsImportBatch}}</p>
                <p class="p2">进口批次(批次)</p>
              </div>
            </div>
          </div>
        </div>
        <div class="transportClass">
          <div class="top">
            <div class="top-left">
              <img src="@/assets/qietu/zpgk/bszs.svg" class="top-img" />
              <span class="top-span">保税展示</span>
            </div>
            <div class="top-right" @click="showCompare(2)">
              <span>历届数据对比</span>
            </div>
          </div>
          <div class="ATA">
            <!-- <div class="ATA-slider"> -->
            <div class="ATA-left">
              <div class="ATA-leftt">
                <p class="p1" style="color: #2c98f2">{{compareData.bondImportPrice}}</p>
                <p class="p2">进口总额(万美元)</p>
              </div>
              <div class="ATA-rightt">
                <p class="p1" style="color: #2c98f2">{{compareData.bondImportBatch}}</p>
                <p class="p2">进口批次(批次)</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 显示一般贸易 -->
    <div class='myunit' v-else>
          <div class='after' @click='taggleShow'></div>
          <div class="transportClass">
            <div class="top">
              <div class="top-left">
                <img src="@/assets/qietu/zpgk/ATA.svg" class="top-img" />
                <span class="top-span">ATA</span>
              </div>
              <div class="top-right" @click="showCompare(0)">
                <span>历届数据对比</span>
              </div>
            </div>
            <div class="ATA">
              <div class="ATA-left">
                <div class="ATA-leftt">
                  <p class="p1" style="color: #2c98f2">{{compareData.ataImportPrice}}</p>
                  <p class="p2">进口总额(万美元)</p>
                </div>
                <div class="ATA-rightt">
                  <p class="p1" style="color: #2c98f2">{{compareData.ataImportBatch}}</p>
                  <p class="p2">进口批次(批次)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="transportClass">
            <div class="top">
              <div class="top-left">
                <img src="@/assets/qietu/zpgk/zlp.svg" class="top-img" />
                <span class="top-span">展览品</span>
              </div>
              <div class="top-right" @click="showCompare(1)">
                <span>历届数据对比</span>
              </div>
            </div>
            <div class="ATA">
              <div class="ATA-left">
                <div class="ATA-leftt">
                  <p class="p1" style="color: #2c98f2">{{compareData.exhibitsImportPrice}}</p>
                  <p class="p2">进口总额(万美元)</p>
                </div>
                <div class="ATA-rightt">
                  <p class="p1" style="color: #2c98f2">{{compareData.exhibitsImportBatch}}</p>
                  <p class="p2">进口批次(批次)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="transportClass">
              <div class="top">
                <div class="top-left">
                  <img src="@/assets/qietu/zpgk/bszs.svg" class="top-img" />
                  <span class="top-span">保税展示</span>
                </div>
                <div class="top-right" @click="showCompare(2)">
                  <span>历届数据对比</span>
                </div>
              </div>
              <div class="ATA">
                <div class="ATA-left">
                  <div class="ATA-leftt">
                    <p class="p1" style="color: #2c98f2">{{compareData.bondImportPrice}}</p>
                    <p class="p2">进口总额(万美元)</p>
                  </div>
                  <div class="ATA-rightt">
                    <p class="p1" style="color: #2c98f2">{{compareData.bondImportBatch}}</p>
                    <p class="p2">进口批次(批次)</p>
                  </div>
                </div>
                </div>
          </div>
          <div class="transportClass">
            <div class="top">
              <div class="top-left">
                <img src="@/assets/qietu/zpgk/ybmy.svg" class="top-img" />
                <span class="top-span">一般贸易等</span>
              </div>
              <div class="top-right" @click="showCompare(3)">
                <span>历届数据对比</span>
              </div>
            </div>
            <div class="ATA">
              <div class="ATA-left">
                <div class="ATA-leftt">
                  <p class="p1" style="color: #2c98f2">{{compareData.normalImportPrice}}</p>
                  <p class="p2">进口总额(万美元)</p>
                </div>
              </div>
          </div>
      </div>

      <!-- </div> -->
      

      <!-- </div> -->
    

      
    
    </div>
    <Modal v-model="show" width=800 class="customModal">
      <div slot="header"></div>
      <div class="body">
        <div class="img">
          <div>
            <img src="@/assets/qietu/zpgk/ATA.svg" @click="setOption(0)" :class="{active:imgList[0]}" alt="">
            <p style="text-align: center; color: #fff">ATA</p>
          </div>
          <div>
            <img src="@/assets/qietu/zpgk/zlp.svg" @click="setOption(1)" :class="{active:imgList[1]}" alt="">
            <p style="text-align: center; color: #fff">展览品</p>
          </div>
          <div>
            <img src="@/assets/qietu/zpgk/bszs.svg" @click="setOption(2)" :class="{active:imgList[2]}" alt="">
            <p style="text-align: center; color: #fff">保税展示</p>
          </div>
          <div v-show='!hiddenNormal'>
            <img src="@/assets/qietu/zpgk/ybmy.svg" @click="setOption(3)" :class="{active:imgList[3]}" alt="">
            <p style="text-align: center; color: #fff">一般贸易等</p>
          </div>
        </div>
        <div id="barPictrue"></div>
      </div>
      <div slot="footer"></div>

    </Modal>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import {getCookie} from '@/until/getToken'
export default {
  data() {
    return {
      hiddenNormal:true,
      //海运空运其他的数据
      AJK18:0,
      show: false,
      chart: null,
      imgList: [true, false, false, false],
      options1:{},
      options0: {
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
            // console.log('params',parmas)
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
            data: ["进口总额"],
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
            data: ["进口批次"],
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
            data: [],
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
            data: [],
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
          },

          {
            name: "2018",
            type: "bar",
            barWidth: "15%",
            data: [],
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
            data: [],
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
            },
            {
              name: "2020",
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
            // console.log('params',parmas)
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
            data: ["进口总额"],
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
            data: ["进口批次"],
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
            data: [],
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
            data: [],
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
          },
          {
            name: "2020",
            type: "bar",
            data: [],
            barWidth: "15%",
            dataType: "万美元",
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F60"
                  },
                  {
                    offset: 1,
                    color: "#F60"
                  }
                ]),
                barBorderRadius: 20
              }
            },
          },

          {
            name: "2018",
            type: "bar",
            barWidth: "15%",
            data: [],
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
            data: [],
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
          ,
          {
            name: "2020",
            type: "bar",
            barWidth: "15%",
            data: [],
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#F60"
                  },
                  {
                    offset: 1,
                    color: "#F60"
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

      //19年数据
      a: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      b: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      c: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      d: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      //20年数据
      e: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      f: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      g: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      h: {
        IMPORTPRICE: 0,
        IMPORTBATCH: 0
      },
      _Data: [],
      hoverRight: false,
      reg: /(?=(?!\b)(\d{3})+$)/g,
      compareData:{
        ataImportPrice:'-',
        ataImportBatch:'-',
        exhibitsImportPrice:'-',
        exhibitsImportBatch:'-',
        bondImportPrice:'-',
        bondImportBatch:'-',
        normalImportPrice:'-',
        normalImportBatch:'-',
      }
    };
  },
  mounted() {
   
    this.initQueryTypeOfTransportation();
    this.initChart();
  },
  methods: {
     //切换隐藏
    taggleShow(){
      this.hiddenNormal = !this.hiddenNormal
    },
    showCompare(num) {
      this.show = true;
      this.setOption(num);
    },

    setOption(num) {
      this.imgList = [false, false, false, false];
      this.imgList[num] = true;
      var data = this._Data[num];
      var datas=[]
      this.options.series.forEach((item, i) => {
        console.log('123',item)
        if (data[i]) {
          item.data = data[i];
        } else {
          item.data = [];
        }
      });
      // console.log('123',this.options)
      this.charts.setOption(this.options, true);
    },
    initChart() {
      var echartsBox = document.getElementById("barPictrue");
      this.charts = echarts.init(echartsBox);
      this.charts.setOption(this.options);
    },
    //初始化左1第一个
    initQueryTypeOfTransportation() {
      publicInter(interfaceUrl.queryTypeOfTransportation, {}).then(r => {
        // console.log('queryTypeOfTransportation-res',r[2018])
        if (r) {
          if (r.isOk) {
            // console.log('rr',r)
            //18年数据
            //ATA
          //  this.A.IMPORTPRICE = r[2018][0]? (r[2018][0].IMPORTPRICE/10000).toFixed(0) :'0'
          //  this.A.IMPORTBATCH = r.msg[0]?  r.msg[0].IMPORTBATCH :'0'

          //  //展览品
          //  this.B.IMPORTPRICE = r.msg[1]?  (r.msg[1].IMPORTPRICE/10000).toFixed(0) :'0'
          //  this.B.IMPORTBATCH = r.msg[1]?  r.msg[1].IMPORTBATCH :'0'

          //  //保税
          //  this.C.IMPORTPRICE = r.msg[2]?  (r.msg[2].IMPORTPRICE/10000).toFixed(0) :'0'
          //  this.C.IMPORTBATCH = r.msg[2]?  r.msg[2].IMPORTBATCH :'0'

          //  //一般贸易
          //  this.D.IMPORTPRICE = r.msg[3] ?   (r.msg[3].IMPORTPRICE/10000).toFixed(0) :'0'
          //  this.D.IMPORTBATCH = r.msg[3] && r.msg[3].IMPORTBATCH != "" ? r.msg[3].IMPORTBATCH :'0'
          this.A.IMPORTPRICE = r[2018][0]? (r[2018][0].IMPORTPRICE/10000).toFixed(0) :'0'
           this.A.IMPORTBATCH = r[2018][0]?  r[2018][0].IMPORTBATCH :'0'

           //展览品
           this.B.IMPORTPRICE = r[2018][1]?  (r[2018][1].IMPORTPRICE/10000).toFixed(0) :'0'
           this.B.IMPORTBATCH = r[2018][1]?  r[2018][1].IMPORTBATCH :'0'

           //保税
           this.C.IMPORTPRICE = r[2018][2]?  (r[2018][2].IMPORTPRICE/10000).toFixed(0) :'0'
           this.C.IMPORTBATCH = r[2018][2]?  r[2018][2].IMPORTBATCH :'0'

           //一般贸易
           this.D.IMPORTPRICE = r[2018][3] ?   (r[2018][3].IMPORTPRICE/10000).toFixed(0) :'0'
           this.D.IMPORTBATCH = r[2018][3] && r[2018][3].IMPORTBATCH != "" ? r.msg[3].IMPORTBATCH :'0'

          //  console.log(this.A.IMPORTPRICE,this.B.IMPORTPRICE,this.C.IMPORTPRICE,this.D.IMPORTPRICE)

            //19年数据
            //ATA
           this.a.IMPORTPRICE = r[2019][0]?  (r[2019][0].IMPORTPRICE/10000).toFixed(0) :'0'
           this.a.IMPORTBATCH = r[2019][0]?  r[2019][0].IMPORTBATCH :'0'

           //展览品
           this.b.IMPORTPRICE = r[2019][1]?  (r[2019][1].IMPORTPRICE/10000).toFixed(0) :'0'
           this.b.IMPORTBATCH = r[2019][1]?  r[2019][1].IMPORTBATCH :'0'

           //保税
           this.c.IMPORTPRICE = r[2019][2]?  (r[2019][2].IMPORTPRICE/10000).toFixed(0) :'0'
           this.c.IMPORTBATCH = r[2019][2]?  r[2019][2].IMPORTBATCH :'0'
          this.c.IMPORTPRICE = 1357.23;
          this.c.IMPORTBATCH = 43;

           //一般贸易
           this.d.IMPORTPRICE = r[2019][3]?  (r[2019][3].IMPORTPRICE/10000).toFixed(0) :'0'
           this.d.IMPORTBATCH = r[2019][3]?  r[2019][3].IMPORTBATCH:'0'


            //20年数据
            //ATA
           this.e.IMPORTPRICE = r[2020][0]?  (r[2020][0].IMPORTPRICE/10000).toFixed(0) :'0'
           this.e.IMPORTBATCH = r[2020][0]?  r[2020][0].IMPORTBATCH :'0'

           //展览品
           this.f.IMPORTPRICE = r[2020][1]?  (r[2020][1].IMPORTPRICE/10000).toFixed(0) :'0'
           this.f.IMPORTBATCH = r[2020][1]?  r[2020][1].IMPORTBATCH :'0'

           //保税
           this.g.IMPORTPRICE = r[2020][2]?  (r[2020][2].IMPORTPRICE/10000).toFixed(0) :'0'
           this.g.IMPORTBATCH = r[2020][2]?  r[2020][2].IMPORTBATCH :'0'

           //一般贸易
           this.h.IMPORTPRICE = r[2020][3]?  (r[2020][3].IMPORTPRICE/10000).toFixed(0) :'0'
           this.h.IMPORTBATCH = r[2020][3]?  r[2020][3].IMPORTBATCH:'0'

            this._Data = [
              [
                [{ value: this.A.IMPORTPRICE, type: "万美元"}],
                [{ value: this.a.IMPORTPRICE, type: "万美元" }],
                [{ value: this.e.IMPORTPRICE, type: "万美元" }],
                [{ value: this.A.IMPORTBATCH, type: "批次" }],
                [{ value: this.a.IMPORTBATCH, type: "批次" }],
                [{ value: this.e.IMPORTBATCH, type: "批次" }],
              ],
              [
                [{ value: this.B.IMPORTPRICE, type: "万美元"}],
                [{ value: this.b.IMPORTPRICE, type: "万美元"}],
                [{ value: this.f.IMPORTPRICE, type: "万美元"}],
                [{ value: this.B.IMPORTBATCH, type: "批次" }],
                [{ value: this.b.IMPORTBATCH, type: "批次" }],
                [{ value: this.f.IMPORTBATCH, type: "批次" }],
              ],
              [
                [{ value: this.C.IMPORTPRICE, type: "万美元"}],
                [{ value: 5474.69, type: "万美元" }],
                [{ value: this.g.IMPORTPRICE, type: "万美元"}],
                [{ value: this.C.IMPORTBATCH, type: "批次" }],
                [{ value: 167, type: "批次" }],
                [{ value: this.g.IMPORTBATCH, type: "批次" }],
              ],
              [
                [{ value: this.D.IMPORTPRICE, type: "万美元"}],
                [{ value: this.d.IMPORTPRICE, type: "万美元" }],
                [{ value: this.h.IMPORTPRICE, type: "万美元" }],
                // [{ value: 70000, type: "万美元" }],
                [{ value: this.D.IMPORTBATCH, type: "批次" }],
                [{ value: this.d.IMPORTBATCH, type: "批次" }],
                [{ value: this.h.IMPORTBATCH, type: "批次" }],
              ]
            ];
          }
        }
        this.setData()
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
    },
    setData(){
      var date=getCookie('date')
      if(date=='2019'){
        this.compareData.ataImportPrice=this.a.IMPORTPRICE;
        this.compareData.ataImportBatch=this.a.IMPORTBATCH
        this.compareData.exhibitsImportPrice=this.b.IMPORTPRICE;
        this.compareData.exhibitsImportBatch=this.b.IMPORTBATCH;
        this.compareData.bondImportPrice=this.c.IMPORTPRICE;
        this.compareData.bondImportBatch=this.c.IMPORTBATCH;
        this.compareData.normalImportPrice=this.d.IMPORTPRICE;
        this.compareData.normalImportBatch=this.d.IMPORTBATCH
        // this.options=this.options1
      }else if(date=='2020'){
        this.compareData.ataImportPrice=this.e.IMPORTPRICE;
        this.compareData.ataImportBatch=this.e.IMPORTBATCH
        this.compareData.exhibitsImportPrice=this.f.IMPORTPRICE;
        this.compareData.exhibitsImportBatch=this.f.IMPORTBATCH;
        this.compareData.bondImportPrice=this.g.IMPORTPRICE;
        this.compareData.bondImportBatch=this.g.IMPORTBATCH;
        this.compareData.normalImportPrice=this.h.IMPORTPRICE;
        this.compareData.normalImportBatch=this.h.IMPORTBATCH
        // this.options=this.options1
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../../styles/mixin.scss";
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
    // width: 20%;
    // float: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.myunit::after {
  display: block;
  content: "";
  clear: both;
  height: 0;
}
.myunit {
   position:relative;
  .after::before{
    position:absolute;
    top:10px;
    right:10px;
    width:10px;
    height:10px;
    border-bottom:2px solid #02a6d5;
    border-right:2px solid #02a6d5;
    transform:rotate(-45deg);
    content:'';
    cursor:pointer;
  }
  
  @include thumb;
  overflow-y: auto;
  padding-top: 10px;
  > .transportClass {
    // display: flex;
    align-items: center;
    height: 25%;
    width: 22%;
    float: left;
    min-height: 3rem;
    margin-left: 2.5%;
    justify-content: space-between;
    position: relative;
    border: 0.5px solid #182766;
    overflow: hidden;
    white-space: nowrap;

    .top {
      border-bottom: 1px solid #182766;
      height: 64px;
      .top-left {
        width: 50%;
        height: 100%;
        float: left;

        .top-img {
          filter: none;
          margin-left: 20px;
          margin-top: 10px;
          cursor: default !important;
        }
        .top-span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #ffffff;
          margin-left: 10px;
          font-size: 1.125rem;
        }
      }

      .top-right {
        width: 50%;
        height: 100%;
        float: left;
        cursor: pointer;
        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #ffffff;
          margin-left: 30px;
          font-size: 0.875rem;
        }
      }
    }
  }
}
.hiddenNormal{
 .transportClass{
   width:30%;
 }
}
.transportClass {
  &.sipg {
    background: url("../../../../../assets/sipg.png") no-repeat 100% 50%;
    background-size: 10% 70%;
  }

  img {
    width: 42px;
    height: 42px;
  }

  > div {
    display: block;
    vertical-align: middle;
    width: 100%;
    position: relative;
    margin-right: -3px;
    text-align: left;
    > span {
      // position: absolute;
      // left: 36px;
      // top: 6px;
      // display: inline-block;
      // width: 70px;
      // height: 30px;
      // // border: 1px solid #1deaef;
      // border-left: none;
      // border-radius: 0 15px 15px 0;
      // line-height: 30px;
      // text-align: center;
      // padding-right: 6px;
      // color: #FFFFFF
      // border-color: rgba(29, 234, 239, 0.6);
    }
  }
  .sipgBackground {
    background: url("../../../../../assets/sipg.png");
    width: 66px;
    height: 48px;
    vertical-align: top;
  }
  .ATA::after {
    clear: both;
    content: "";
    height: 0;
    display: block;
  }
  .ATA {
    width: 100%;
    text-align: left;
    overflow: hidden;
    margin-left: -3px;

    // &:hover {
    //   > div.ATA-slider {
    //     transform: translate(-50%, 0);
    //     &.imgSlider {
    //       transform: translate(-10%, 0);
    //     }
    //   }
    // }
    > div.ATA-slider {
      // display: block;
      transition: all 1s ease-in-out;
      justify-content: flex-start;
      flex-wrap: nowrap;
      width: 100%;
      > div {
        width: 50%;
      }
    }

    .ATA-left {
      width: 100%;
      .ATA-leftt{
        width: 50%;
        float: left;
        .p1{
          font-size: 1.125rem;
          margin-left: 20px;
          margin-bottom: 5px;
          margin-top: 10px;
        }
        .p2{
          font-size: 1rem;
          margin-left: 20px;
          margin-bottom: 20px;
          color: #ffffff;
        }
      }
      .ATA-rightt{
        width: 50%;
        float: left;
        .p1{
          font-size: 1.125rem;
          margin-left: 20px;
          margin-bottom: 5px;
          margin-top: 10px;
        }
        .p2{
          font-size: 1rem;
          margin-left: 20px;
          margin-bottom: 20px;
          color: #ffffff;
        }
      }
    }

    .ATA-right {
      width: 50%;
      float: left;
      p {
        margin-left: 20px;
        margin-top: 5px;
        margin-bottom: 3px;
      }
      .ATA-right-p1 {
        font-size: 24px;
        color: #ffffff;
        line-height: 28px;
      }

      .ATA-right-p2 {
        font-size: 14px;
        color: #ffffff;
        line-height: 18px;
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