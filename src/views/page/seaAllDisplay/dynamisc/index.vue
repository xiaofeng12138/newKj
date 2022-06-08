<template>
    <div  class="overView" >
        <div id='chart'  :style={width:width,height:height}>
        </div>
        <div class="query">
            <Row>
                <Col span=10>
                    <Col span=6>
                        <Select v-model="queryParams.type"  style="width:100%" size='large'>
                            <Option v-for="item in queryItem" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                         
                    </Col>
                    <Col span=18>
                        <Input size='large' v-model="queryParams.number" placeholder="请输入查询编号" style="width: 100%"></Input>
                    </Col>
                </Col>
                <Col span=2 push=1>
                     <Button style="background:#FFB860;border-color:#FFB860 " type="info" long size='large' @click="query">查询</Button>
                </Col>
                <Col span=2 push=2>
                     <Button type="info" style="background:#FFB860;border-color:#FFB860 " long size='large' @click="goback">返回</Button>
                </Col>
                <Col span=6 push=3>
                    <Col span=6 style="color:#fff;padding-top:6px;font-size:14px;">展示船速</Col>
                    <Col span=18>
                        <Slider v-model="value" :step="1" :min='2' :max='60' @on-change='changeSpeed'></Slider>
                    </Col>
                   
                </Col>
            </Row>
        </div>
        <div class="events-swepper">
            <span class="title">事件</span>
            <div class="box">
                <div class="clear">
                <ul>
                    <li  class="events-li" v-for="(item,index) in eventsArray" :key="item.id" :class="{active:item.active}" @click="eventsEmphasis(index)">
                        <i></i>
                         <p v-for="(val,i) in item.name" :key="val.id">
                            <span>{{val}}</span><br>
                            <span>{{item.time[i]}}</span> 
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import options from "./option";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

let echarts = require("echarts/lib/echarts.js");

export default {
  created() {
    this.setWidthHeight();
  },
  data() {
    return {
      queryItem: [
        { label: "订单号", value: "0" },
        { label: "提单号", value: "1" },
        { label: "报关单号", value: "2" }
      ],
      echartsBox: "",
      height: "",
      width: "",
      chart: "",
      value: 45,
      move: 0,
      dataMsg: {
        coordinate: [],
        eventsName: []
      },
      queryParams: {
        number: "",
        type: "0"
      },
      eventsArray: []
    };
  },
  mounted() {
    const that = this;
    //    this.originOption=JSON.parse(JSON.stringify(options))
    this.echartsBox = document.getElementById("chart");
    this.charts = echarts.init(this.echartsBox);
    this.charts.setOption(options, true);
    // this.charts.on('click',function(params){
    //     if(params.seriesType=='effectScatter'){
    //         // that.eventsEmphasis(params.dataIndex)
    //     }
    // })
    //从中博会动态监测2里面跳转过来的
    if (this.$route.params.from === "dynamic") {
      this.queryParams.number = this.$route.params.billNo;
      this.queryParams.type = "1";
      this.query();
    }
  },

  methods: {
    changeSpeed(val) {
      options.series[2]["effect"]["period"] = val;
      this.charts.setOption(options);
      console.log(options.series[2]["effect"]["period"]);
    },
    concatEvent(arr) {
      for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (
          i >= 1 &&
          item.jindu === arr[i - 1].jindu &&
          item.weidu === arr[i - 1].weidu
        ) {
          arr[i - 1]["zwName"] += "," + item.zwName;
          arr[i - 1]["time"] += "," + item.time;
          arr.splice(i, 1);
          i--;
        }
      }
      arr.forEach(item => {
        item.value = [item.jindu, item.weidu];
      });
      return arr;
    },
    iscrossEW() {
      var less = false,
        greater = false;
      this.dataMsg.coordinate.forEach(item => {
        if (item[0] < -170) {
          less = true;
        } else if (item[0] > 170) {
          greater = true;
        }
      });
      return less && greater;
    },
    query() {
      (this.dataMsg = {
        coordinate: [],
        eventsName: []
      }),
        publicInter(interfaceUrl.qureyShipMsg, this.queryParams).then(r => {
          if (r.isOk) {
            this.clearData();
            //  this.charts.setOption(options)
            this.charts.clear();
            this.eventsArray = [];
            var len = r.msg.length;
            r.msg.forEach((item, i) => {
              this.dataMsg.eventsName = this.concatEvent(item.describeData); // 地图 事件描述
              item.pol_pod.forEach(val => {
                // 收集所有坐标点
                if (val.LONGITUDE && val.LATITUDE) {
                  this.dataMsg.coordinate.push([val.LONGITUDE, val.LATITUDE]);
                }
              });
            });
            let flag = this.iscrossEW();
            this.dataMsg.coordinate = this.dataMsg.coordinate.reverse();
            if (flag) {
              var start = this.dataMsg.coordinate[0][0];
              var segment1 = [],
                segment2 = [];
              this.dataMsg.coordinate.forEach(item => {
                if (item[0] < start && item[0] > -180) {
                  segment1.push(item);
                  // segment2.push([item[0]+360,item[1]])
                } else {
                  // segment1.push([item[0]-380,item[1]])
                  segment2.push(item);
                }
              });

              var len1 = segment1.length,
                len2 = segment2.length;
              options.series[3]["data"] = [
                { coords: segment1.reverse() },
                { coords: segment2.reverse() }
              ];
              options.series[2]["data"] = [
                { coords: segment1 },
                { coords: segment2 }
              ];
            } else {
              options.series[3]["data"] = [{ coords: this.dataMsg.coordinate }];
              options.series[2]["data"][0] = {
                coords: this.dataMsg.coordinate.reverse()
              };
            }
            options.series[1]["data"] = this.dataMsg.eventsName;

            this.dataMsg.eventsName.forEach((val, i) => {
              var arr1 = val.time.split(/[,|，]/g);
              var arr2 = val.zwName.split(/[,|，]/g);
              this.eventsArray.push({
                name: arr2,
                active: i === 0,
                time: arr1
              });
            });
            this.charts.setOption(options, true);
          } else {
            this.$Message.error("未查询到数据！");
            this.clearData();
            this.eventsArray = [];
            this.charts.setOption(options, true); // COSU4512710100,COSU8018768790
          }
        });
    },
    setWidthHeight() {
      const that = this;
      that.width = window.innerWidth + "px";
      that.height = window.innerHeight + "px";
    },
    goCurrent(index) {
      this.eventsEmphasis(index);
      this.timechange(index);
      this.changeOption(index);
    },
    timechange(index) {
      this.style.progress = this.style.current = this.position[index].x;
      this.position.forEach((item, i) => {
        if (i < index) {
          item.emphasis = false;
          item.isactive = true;
        } else if (i === index) {
          item.isactive = true;
          item.emphasis = true;
        } else {
          item.emphasis = false;
          item.isactive = false;
        }
      });
    },
    changeOption(index) {
      var dataline = options.series[3]["data"][0]["coords"]; // 航线坐标
      var icondata = options.series[2]["data"][0]["coords"]; // 船Icon坐标
      var eventsSpot = options.series[1]["data"][index]["value"]; // 事件地点
      // console.log(icondata)
      var last = icondata[icondata.length - 1]; // 最后一次事件发生地
      var endIndex;
      var startPosition = dataline[dataline.length - 1];
      dataline.forEach((item, i) => {
        if (item[0] === eventsSpot[0] && item[1] === eventsSpot[1]) {
          endIndex = i;
        }
      });
      if (index === 0) {
        options.series[2]["data"][0]["coords"] = dataline
          .slice(endIndex)
          .concat([
            this.dataMsg.coordinate[this.dataMsg.coordinate.length - 1]
          ]);
      } else {
        options.series[2]["data"][0]["coords"] = dataline
          .slice(endIndex)
          .reverse();
      }
      this.charts.setOption(options, true);
    },
    eventsEmphasis(index) {
      const that = this;
      that.charts.dispatchAction({
        type: "showTip",
        seriesIndex: 1, //第几条series
        dataIndex: index //第几个tooltip
      });

      this.eventsArray.forEach((item, i) => {
        this.move = index * 90;
        if (i === index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    goback() {
      this.$router.go(-1);
    },
    clearData() {
      options.series[1]["data"] = [];
      options.series[2]["data"] = [];
      options.series[3]["data"] = [];
      options.series[2]["effect"]["period"] = 45;
    }
  },
  beforeDestroy() {
    console.log("组件销毁前");
    this.clearData();
    this.charts.clear();
  },
  destroyed() {
    console.log("组件销毁");
  }
};
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
.overView {
  .charts-tooltip {
    background: #fff;
    padding: 16px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
  overflow: hidden;
  position: relative;
  background: #294da0;
  .query {
    position: absolute;
    width: 70%;
    bottom: 50px;
    left: 50px;
  }
  .events-swepper {
    position: absolute;
    width: 240px;
    height: 100%;
    top: 0;
    right: 0;
    padding: 30px 15px;
    background: #1a3a84;
    box-shadow: 0 2px 12px 0 rgba(12, 22, 47, 0.3);
    .box {
      height: 85%;
      width: 100%;
      margin-top: 15%;
      overflow: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .clear {
      height: 100%;
      transition: all 0.7s cubic-bezier(0.6, -0.3, 0.74, 0.05);
    }
    .title {
      display: block;
      width: 100%;
      font-size: 16px;
      color: #8fc7f3;
      letter-spacing: 0;
      height: 45px;
      text-align: center;
      line-height: 45px;
      background-size: cover;
      background: url("../../../assets/as.png") no-repeat 50% 50%;
    }
    ol,
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      float: left;
    }
    ol {
      height: 100%;
      width: 2px;
      margin-left: 8px;
      margin-right: 16px;
      position: relative;
      // opacity: 0.53;
      overflow: visible;
      background: #8fc7f3;
      li {
        position: absolute;
        width: 16px;
        height: 16px;
        background: #8fc7f3;
        border-radius: 50%;
        left: -7px;
        border: 3px solid #8fc7f3;
        top: 0;
        // top: 10px;
        &.active {
          background: #1d356e;
          // border: px solid #979797;
        }
      }
    }
    ul {
      width: 100%;
      margin: 0 10px;
      border-left: 2px solid #8fc7f3;
      // margin-left: 15px;
      li {
        width: 100%;
        font-size: 14px;
        color: #8adeff;
        letter-spacing: 0;
        padding-left: 30px;
        margin-top: 30px;
        background-size: cover;
        // opacity: 0.7;
        position: relative;
        font-size: 14px;
        color: #ffffff;
        transition: all 0.4s ease-in-out;
        &:first-child {
          margin-top: 0;
        }
        // margin-bottom: 20px;
        &:hover {
          p {
            opacity: 1;
          }
        }
        &.active {
          i {
            background: #1d356e;
          }
          p {
            opacity: 1;
          }
          // opacity: 1;
        }
        &:after {
          content: "- -";
          position: absolute;
          font-size: 12px;
          color: #ffffff;
          top: -3px;
          left: 12px;
        }
        i {
          position: absolute;
          width: 16px;
          opacity: 1;
          height: 16px;
          border: 3px solid #8adeff;
          border-radius: 50%;
          background: #8adeff;
          left: -9px;
          top: 0;
        }
        p {
          margin-bottom: 5px;
          opacity: 0.7;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
