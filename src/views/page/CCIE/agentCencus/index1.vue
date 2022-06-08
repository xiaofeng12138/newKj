<template>
    <div>
      <Tabs @on-click="tabClick" value="2018" class="agentCencus1">
        <TabPane label="2018" name="2018">
          <Table class="customTable " :data='list' style="margin-top:1rem;" :columns="keyList2"></Table>
        </TabPane>
        <TabPane label="2019" name="2019">
          <Table class="customTable " :data='list2' style="margin-top:1rem;" :columns="keyList2"></Table>
        </TabPane>
      </Tabs>
        
      <div class="scrollBox">
        <div class="content">
          <img src="../../../../assets/qietu/zhcz/icon-money.svg" style="margin-top: 30%">
          <p>各主场承运商<br>实际后续流向金额占比</p>
        </div>
        <div class="cences" ref='bar'>
          
          
        </div>
        

      </div> 
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      keyList2: [
        {
          title: "公司名称",
          key: "AGENTNAME",
          width: 300
        },
        {
          title: "总金额",
          key: "TOTALPRICE",
          width: 170
        },
        {
          title: "实际后续流向",
          align: "center",
          children: [
            {
              title: "复运出境",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PBPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PBPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "留购",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PAPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PAPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "转保税区域",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PFPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PFPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "消耗",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PCPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PCPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: '放弃',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PHPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PHPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: '灭失',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE1",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE2",
                  width: 115
                }
              ]
            },
            {
              title: '其他',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE3",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE4",
                  width: 115
                }
              ]
            },
            {
              title: '外借',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE5",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE6",
                  width: 115
                }
              ]
            }

          ]
        }
      ],
      keyList3: [
        {
          title: "公司名称",
          key: "AGENTNAME"
        },
        {
          title: "总金额",
          key: "TOTALPRICE",
          width: 170
        },
        {
          title: "实际后续流向",
          align: "center",
          children: [
            {
              title: "复运出境",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PBPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PBPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "留购",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PAPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PAPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "转保税区域",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PFPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PFPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: "消耗",
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PCPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PCPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: '放弃',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "PHPRICE",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "PHPERCENT",
                  width: 115
                }
              ]
            },
            {
              title: '灭失',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE1",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE2",
                  width: 115
                }
              ]
            },
            {
              title: '其他',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE3",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE4",
                  width: 115
                }
              ]
            },
            {
              title: '外借',
              align: "center",
              children:[
                {
                  title: "金额",
                  align: "center",
                  key: "NOTE5",
                  width: 150
                },
                {
                  title: "金额占比",
                  align: "center",
                  key: "NOTE6",
                  width: 115
                }
              ]
            }

          ]
        }
      ],
      list: [],
      list2: [],
      echarts: null,
      options: {
        xAxis: {
          show: false
        },
        grid: {
          left: '30%'
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff',
            fontSize: '14',
          },
          axisTick: {
            length: '10'
          },
          data: []
        },
        legend: {
          left: "2%",
          icon: "circle",
          data: [
            "复运出境",
            "留购", 
            "转保税区域",
            "消耗",
            "放弃",
            "灭失",
            "其他",
            "外借"
          ],

          itemGap: 20,
          top: "20",
          orient: "vertical",
          align: "left",
          borderRadius: 5,
          textStyle: {
            fontSize: 14,
            color: [
              "#2c98f2",
              "#f16b3f",
              "#77e644",
              "#ffc83e",
              "#f22c67",
              "#3eea22",
              "#13d44a",
              "#5ad22e",
            ]
          }
        },
        color: [
          "#2c98f2",
          "#f16b3f",
          "#77e644",
          "#ffc83e",
          "#f22c67",
          "#3eea22",
          "#13d44a",
          "#5ad22e",
        ],
        tooltip: {
          // trigger: "axis",
          // formatter: "{b}<br>{d}%",
          // backgroundColor: "#fff",
          
          trigger: 'axis',
          confine: true,
          axisPointer: {
            type: 'shadow'
          }
        },
        title: [],
        series: [
          {
            name: '复运出境',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },
            data: []
          },
          {
            name: '留购',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          },
          {
            name: '转保税区域',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            data: []
          },
          {
            name: '消耗',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          },
          {
            name: '放弃',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          },
          {
            name: '灭失',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          },
          {
            name: '其他',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          },
          {
            name: '外借',
            type: "bar",
            stack: '总量',
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            label: {
              show: false
            },

            data: []
          }
        
        ]
      }
    };
  },
  mounted() {
    var echartsBox = this.$refs.bar;
    this.charts = echarts.init(echartsBox);
    this.charts.setOption(this.options);
    this.pieData();
  },
  methods: {
    tabClick(name) {
      if( name == '2018') {
        this.setData(this.list);
        
      } else if( name == '2019') {
        this.setData(this.list2);
      }
    },
    pieData() {
      publicInter(interfaceUrl.statisticExhibitFlowByTransComp, {}).then(r => {
        if (r && r.result.length > 0) {
          this.list = r.result;
          this.list2 = r.result2;
          this.setData(this.list);
        } else {
          this.list = [];
          this.list2 = [];
        }
      });
    },
    setData(data) {
      var Arr = data.map(item => {
        let res = [];
        res.title = item["AGENTNAME"];
        res.arr = [
          {
            name: "复运出境",
            value: item["PBPERCENT"]
          },
          {
            name: "留购",
            value: item["PAPERCENT"]
          },
          {
            name: "转保税区域",
            value: item["PFPERCENT"]
          },
          {
            name: "消耗",
            value: item["PCPERCENT"]
          },
          {
            name: "放弃",
            value: item["PHPERCENT"]
          },
          {
            name: "灭失",
            value: item["NOTE2"]
          },
          {
            name: "其他",
            value: item["NOTE4"]
          },
          {
            name: "外借",
            value: item["NOTE6"]
          },
        ];
        return res;
      });
      this.setChartData(Arr);
    },
    setChartData(arr1) {
      if(arr1.length > 0) {
        let ar = []
        if(arr1.length > 0) {
          arr1.forEach((item, index) => {
          ar.push(item.title);
          for(let i = 0; i < 8; i++) {
              this.options.series[i].data[index] = item.arr[i].value
            }
          })
        }
        this.options.yAxis.data = ar;
        this.charts.setOption(this.options);
      } else {
        this.charts.clear()
      }
      
      
      
    }
  }
};
</script>
<style lang="scss" scoped>
.scrollBox::after {
  clear: both;
  height: 0;
  content: '';
  display: block;
}
.scrollBox {
  height: 300px;
  overflow-y: hidden;
  overflow-x: auto;
  margin-bottom: 5px;
  border: 1px solid #155ff2;
  .content {
    width: 20%;
    height: 100%;
    float: left;
    background: rgba(255, 255, 255, 0.05);
    p {
      color: #fff;
      font-size: 18px
    }
  }
  .cences {
    float: left;
  }

  margin-top: 1vh;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6e6e6e;
    outline: #333 solid 1px;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
.cences {
  width: 80%;
  height: 100%;
  // min-height: 250px;
  display: flex;
  h2 {
    width: 12%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    padding: 1rem;
    color: #fff;
    background: rgb(17, 42, 109);
    img {
      width: 3rem;
      height: 3rem;
      //   display: block;
    }
  }
  > div {
    width: 88%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #6e6e6e;
      outline: #333 solid 1px;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    height: 100%;
    display: flex;

    min-width: 2000px;
    li {
      width: 10%;
      height: 100%;
    }
  }
}
</style>

