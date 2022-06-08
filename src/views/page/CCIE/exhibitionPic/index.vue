<template>
<div class="wrap">
    <div class='legend'>
       <ul>
          <li>
            <img src="./components/img/red.png" >
            <span>冷链展位</span>
          </li>
        <li>
          <img src="./components/img/oragin.png" >
          <span>高风险展位</span>
        </li>
       </ul>
       <ul>
          <li>
          <img src="./components/img/yellow.png" >
          <span>重点关注展位</span>
         </li>
        <li>
          <img src="./components/img/green.png" >
          <span>暂进展位</span>
        </li>
       </ul>
        
    </div>
    <div class="pictrue" v-if="nowYear == '2019'">
        <div>
            <exhibitionTemp :platform='platformOne' :highLight='highLight1' class="exhibitionTemp"></exhibitionTemp>
            <div class="floor" @click="clickFloor(1)">
                <img src="@/assets/qietu/zggk/floor.svg" alt="">
                <span>一楼</span>
            </div>
        </div>
        <div>
            <exhibitionTemp :platform='platformTwo' :highLight='highLight2' class="exhibitionTemp"></exhibitionTemp> 
            <div class="floor" @click="clickFloor(2)">
                <img src="@/assets/qietu/zggk/floor.svg" alt="">
                <span>二楼</span>
            </div>
        </div>
        <!-- 视频相关-->
        <!-- <div v-show='myModal' style="z-index:101;width:51vh;height:calc(68vh + 20px);border-radius:4px;overflow:hidden;position:absolute;top:calc(50% - 34vh - 10px);background:#fff;left:calc(50% - 25.5vh)">
            <view-index :wrapModal = "myModal" v-on:editWin = 'openMyModal' :videoUrl = "pVideoUrl" ref="child"></view-index>
        </div>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:1rem;" @click="showVideo('1')"/>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:5rem;" @click="showVideo('2')"/>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:9rem;" @click="showVideo('3')"/> -->
        <!-- 视频相关-->
        <div class="description" v-show="show">
          <h2>{{description.floorTitle}}</h2>
          <div>
            <ul>
              <li>总面积：</li>
              <li>可展览面积 ：</li>
              <li>总馆数：</li>
              <li>展位总数/暂进展位：</li>
              <li>总参展/暂进国家|地区：</li>
              <li>总参展商/暂进数：</li>
            </ul>
            <ul>
              <li>{{description.area}} 万平方米</li>
              <li>{{description.ableArea}}万平方米</li>
              <li>{{description.venus}}</li>
              <li>{{description.siteNum}}/{{zjData.positionnum}}</li>
              <li>{{description.country}}/{{zjData.counttrynum}}</li>
              <li>{{description.exhibtor}}/{{zjData.exhibitornum}}</li>
            </ul>
          </div>
        </div>
    </div> 
    <div class="pictrue" v-else>
        <div>
            <exhibitionTemp20 :platform='platformOne20' :highLight='highLight1' class="exhibitionTemp"></exhibitionTemp20>
            <div class="floor" @click="clickFloor(1)">
                <img src="@/assets/qietu/zggk/floor.svg" alt="">
                <span>一楼</span>
            </div>
        </div>
        <div>
            <exhibitionTemp20 :platform='platformTwo20' :highLight='highLight2' class="exhibitionTemp"></exhibitionTemp20> 
            <div class="floor" @click="clickFloor(2)">
                <img src="@/assets/qietu/zggk/floor.svg" alt="">
                <span>二楼</span>
            </div>
        </div>
        <!-- 视频相关-->
        <!-- <div v-show='myModal' style="z-index:101;width:51vh;height:calc(68vh + 20px);border-radius:4px;overflow:hidden;position:absolute;top:calc(50% - 34vh - 10px);background:#fff;left:calc(50% - 25.5vh)">
            <view-index :wrapModal = "myModal" v-on:editWin = 'openMyModal' :videoUrl = "pVideoUrl" ref="child"></view-index>
        </div>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:1rem;" @click="showVideo('1')"/>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:5rem;" @click="showVideo('2')"/>
        <img src="@/assets/camera.jpg" class="cameraJpg" style="left:9rem;" @click="showVideo('3')"/> -->
        <!-- 视频相关-->
        <div class="description" v-show="show" @click="openBigModal">
          <h2>{{description.floorTitle}}</h2>
          <div>
            <ul>
              <li>总面积：</li>
              <li>可展览面积 ：</li> 
              <li>展览面积 ：</li>
              <li>总馆数：</li>
              <li>展位总数/暂进展位：</li>
              <li>总参展/暂进国家|地区：</li>
              <li>总参展商/暂进数：</li>
            </ul>
            <ul>
              <li>{{default20.area}}万平方米</li>
              <li>{{default20.ableArea}}万平方米</li>
              <li>36万平方米</li>
              <li>{{default20.venus}}</li>
              <li>{{default20.siteNum}}/{{zjData.positionnum}}</li>
              <li>{{default20.country}}/{{zjData.counttrynum}}</li>
              <li>{{default20.exhibtor}}/{{zjData.exhibitornum}}</li>
            </ul>
          </div>
        </div>
    </div> 
    <!-- 弹出层modal -->
    <Modal
                v-model="bigModal"
                    width = "1300px"
                    :footer-hide = true
                    :mask-closable = "false"
                    class="forbidBody"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="bigModal=false" size='30' />
                </p>
                <h2 style="text-align:center;color:#fff;font-size:25px">展馆概况</h2>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"> <Col span="22">总面积：150万平方米</Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"><Col span="22">可展览面积：60万平方米 </Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"><Col span="22" >展览面积：36万平方米</Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"><Col span="22" >总馆数：15</Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"> <Col span="22">展位总数/暂进展位：{{default20.siteNum}}/{{zjData.positionnum}}</Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"><Col span="22">总参展/暂进国家|地区：{{default20.country}}/{{zjData.counttrynum}} </Col> </Row>
                <Row style="height:60px; line-height:60px;font-size:20px;color:#fff;text-align:center"><Col span="22" >总参展商/暂进数：{{default20.exhibtor}}/{{zjData.exhibitornum}}</Col> </Row>
                 
        </Modal>
</div>
    
</template>
<script>
import {setCookie,getCookie,} from "@/until/getToken";
import exhibitionTemp from "./components/index";
import exhibitionTemp20 from './components/index2020/index20.vue'
import axios from 'axios';
import viewIndex from './components/viewIndex'
import interfaceUrl from '@/api/interfaceUrl'
import {publicInter,filedownload} from '@/api/http'
const default1 = {
  area: 150,
  ableArea: 50,
  venus: 13,
  siteNum: 3637,
  country: 153,
  exhibtor: 3653,
  floorTitle:'展馆概况'
};
const one = {
  area: 75,
  ableArea: 25,
  venus: 9,
  siteNum: 2421,
  country: 135,
  exhibtor: 2473,
  floorTitle:'一楼概况'
};
const two = {
  area: 29,
  ableArea: 13,
  venus: 4,
  siteNum: 1603,
  country: 115,
  exhibtor: 1606,
  floorTitle:'二楼概况'
};

const one20 = {
  area: 75,
  ableArea: 40,
  venus: 9,
  siteNum: 960,
  country: 116,
  exhibtor: 1610,
  floorTitle:'一楼概况'
};
const two20 = {
  area: 75,
  ableArea: 40,
  venus: 6,
  siteNum: 457,
  country: 109,
  exhibtor: 1202,
  floorTitle:'二楼概况'
};
export default {
  components: {
    exhibitionTemp,viewIndex,exhibitionTemp20
  },
  mounted() {
    var target = document.getElementsByClassName("toolTipBox")[0];
    var body = document.getElementsByTagName("body")[0];
    if (target) {
      body.removeChild(target);
    }
  },
  data() {
    return {
      bigModal:false,
      //视频通话
      myModal:false,
      pVideoUrl:'http://www.tradeportal.sh.cn/exvideo/token/181007001',

      platformOne: [
        { numeber: '1.1', clickable: true ,choose:true},
        { numeber: '2.1', clickable: true ,choose:true},
        { numeber: '3', clickable: true ,choose:true },
        { numeber: '4.1', clickable: true ,choose:true},
        { numeber: '5.1', clickable: true ,choose:true},
        { numeber: '6.1', clickable: true ,choose:true},
        { numeber: '7.1', clickable: true,choose:true },
        { numeber: '8.1', clickable: true ,choose:true},
      ],
      platformTwo: [
        { numeber: '1.1', clickable: false ,choose:false},
        { numeber: '2.1', clickable: false ,choose:false},
        { numeber: '3', clickable: false  ,choose:false},
        { numeber: '4.2', clickable: false,choose:false },
        { numeber: '5.2', clickable: true ,choose:false},
        { numeber: '6.2', clickable: true ,choose:false},
        { numeber: '7.2', clickable: true ,choose:false},
        { numeber: '8.2', clickable: true ,choose:false},
      ],
      platformOne20: [
        { numeber: '1.1', clickable: true,choose:true },
        { numeber: '2.1', clickable: true,choose:true },
        { numeber: '3', clickable: true,choose:true },
        { numeber: '4.1', clickable: true,choose:true },
        { numeber: '5.1', clickable: true,choose:true },
        { numeber: '6.1', clickable: true,choose:true},
        { numeber: '7.1', clickable: true ,choose:true},
        { numeber: '8.1', clickable: true ,choose:true},
      ],
      platformTwo20: [
        { numeber: '1.2', clickable: true ,choose:false},
        { numeber: '2.2', clickable: true ,choose:false},
        { numeber: '3', clickable: false ,choose:false},
        { numeber: '4.2', clickable: false ,choose:false},
        { numeber: '5.2', clickable: true ,choose:false},
        { numeber: '6.2', clickable: true ,choose:false},
        { numeber: '7.2', clickable: true,choose:false },
        { numeber: '8.2', clickable: true ,choose:false},
      ],
      nowYear:getCookie('date'),
      description:default1,
      show:true,
      highLightDefault1: true,
      highLight1:false,
      highLight2:false,
      zjData:{},
      allTotalNum:{},
      default20:{
        area: 150,
        ableArea: 60,
        venus: 15,
        siteNum: 2812,
        country: 121,
        exhibtor: 1058,
        floorTitle:'展馆概况'
      },
      
    };
  },
  methods:{
    openBigModal(){
      this.bigModal = true
    },
    //查询暂进展位数量
    queryZjNum(){
      publicInter(interfaceUrl.qryAllHallCounts,{}).then(res=>{
        console.log(res)
          this.zjData = res
          let allList = res.list
          let compareArr = ['1.1','2.1','3','4.1','5.1','6.1','7.1','8.1']
          let emptyArr =[]
          let firstCountry = 0
          let firstZw = 0
          let firstZS = 0
          allList.forEach((item)=>{
            if(compareArr.includes(item.HALLNO)){
              firstCountry = 42
              firstZw += item.EXHIBITORNUM
              firstZS += item.POSITIONNUM
            }
          })
          let secondCountry = 36
          let secondZW = res.exhibitornum - firstZw
          let secondZS = res.positionnum - firstZS
          this.allTotalNum = {
            firstCountry,
            firstZw,
            firstZS,
            secondCountry,
            secondZW,
            secondZS
          }
        })
    },
    clickFloor(num){
      this.show=true;
      if(num==1){
        this.description = one
        this.default20 = one20
        this.highLight1=true;
        this.highLight2=false
        this.highLightDefault1 = false;

        this.zjData.counttrynum =this.allTotalNum.firstCountry
        this.zjData.exhibitornum = this.allTotalNum.firstZw
        this.zjData.positionnum = this.allTotalNum.firstZS

      }else{
        this.description = two
        this.default20 = two20
        this.highLight1=false;
        this.highLight2=true;
        this.highLightDefault1 = false;

        this.zjData.counttrynum = this.allTotalNum.secondCountry
        this.zjData.exhibitornum = this.allTotalNum.secondZW
        this.zjData.positionnum = this.allTotalNum.secondZS
      }
    },
    openMyModal(value){
        this.myModal = value;
    },
    //显示直播窗口
        showVideo(value){
            // this.modal = true;
            // this.videoSrc='https://video.shangboost.com:8888/video/view/18100700'+value;
            this.pVideoUrl = "https://www.tradeportal.sh.cn/exvideo/token/18100700"+value;
            axios({
                method: 'GET',
                url: this.pVideoUrl
                }).then(r=>{
                if(r){
                    let req = r.data;
                    let arg = {
                        "userId": req.userId,
                        "sdkappid":req.sdkappid,
                        "userSig": req.userSig,
                        "privateMapKey":req.privateMapKey,
                        "accountType": req.accountType,
                        "closeLocalMedia": true,
                        "roomid": req.roomid
                    }
                    this.$refs.child.initRTC(arg);
                    this.myModal = true;
                }
            })
        }
  },
  mounted(){
    this.queryZjNum()
  }
};
</script>
<style lang="scss" scoped>
 .cameraJpg{
        font-size:1.5rem;
        cursor:pointer;
        position:absolute;
        bottom:3rem;
        width:20px;
}
.pictrue {
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  > div {
    width: 38%;
    height: 100%;
    overflow: hidden;
    position: relative;
    left: 2%;
    &:nth-of-type(2) {
      left: -2%;
    }
    .exhibitionTemp {
      margin-top:  1.5rem
    }
    .floor {
      position: absolute;
      display: flex;
      align-items: center;
      padding: 0.4rem 2rem;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      background: #155ff1;
      border-radius: 5px;
      img {
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
      }
      &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        bottom: -7px;
        left: 50%;
        transform: translate(-50%, 0);
        border-bottom: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid #155ff1;
        
        
      }
    }
  }
  .description {
    position: absolute;
    left: 0;
    top: 10px;
    width: 300px;
    height: 280px;
    background: #0c1435;
    border: 1px solid #1f5ff2;
    cursor: pointer;
    h2 {
      color: #fff;
      background: rgba(31, 95, 242, 0.3);
      padding: 10px 0;
      font-size: 18px;
    }
    > div {
      display: flex;
      // padding-top: 10px;
      ul {
        width: 60%;
        list-style: none;
        &:nth-child(2) {
          width: 40%;
          li {
            text-align: left;
            padding-left: 10px;
            color: #ffc83e;
          }
        }
        li {
          font-size: 14px;
          padding: 5px 0;
          text-align: right;
          color: #fff;
        }
      }
    }
  }
}
.desc {
  position: absolute;
  width: 300px !important;
  height: 200px !important;
  border: 1px solid #155ff1;
  h3 {
    background: #155ff2;
    height: 42px;
    line-height: 42px;
    color: #FFF
  }
  .content {
    width: 100%;
    display: flex;
    color: #fff;
    ul {
      margin: 0;
      padding: 0.8rem 0.4rem;
      list-style: none;
      width: 50%;
      text-align: right;
      li {
        margin-bottom: 0.2rem;
        font-size: 12px;
      }
      &:last-child {
        text-align: left;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}
.legend{
  position: absolute;
  right: 50px;
  top: 80px;
  width: 250px;
  height: 100px;
  text-align: left;
  span{
    display: inline-block;
    height: 30px;
    width: 100%;
    line-height: 30px;
    color: #fff;
  }
  ul{
    display: flex;
    li{
    display: flex;
    height: 50px;
    width: 50%;
    margin-left: 5px;
    img{
      width: 30px;
      height: 30px;
      display: block;
    }
    span{
      margin-left: 10px;
    }
  }
  }
}
</style>
