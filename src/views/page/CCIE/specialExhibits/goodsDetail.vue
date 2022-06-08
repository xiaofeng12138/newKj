<template>
    <!-- 商品详情展示 -->
    <div class="goodsDetail">
        <span @click="closewin()" class="closewin">×</span>
        <h3 class="title">{{ showArr.length>0 ? showArr[goodsIndex].GOODSDESCRIPTIONCN:"" }}</h3>
        <div v-for="(item,index) in showArr" :key="item.uuid" 
            :class="{'main-img':index==goodsIndex,'my-show-img':true}" 
            :style="{backgroundImage:'url(' +item.IMAGEPATH}"> 
        </div>
        <span class="desc" v-if="showArr.length > 0">{{ showArr[goodsIndex].GOODSDESCRIPTION }}<a @click="showBooth(showArr[goodsIndex].POSITION)">{{showArr[goodsIndex].POSITION?("("+showArr[goodsIndex].POSITION+")"):""}}</a></span>
        <div class="switch to-left" @click="turn(-1)"></div>
        <div class="switch to-right" @click="turn(1)"></div>

         <!-- 弹出层 -->
        <Modal
                v-model="showModal"
                width = "1100px"
                class-name='vertical-center-modal forbidBody showmodal'
                :footer-hide = true
                :mask-closable="false"
                :styles="{top:'150px'}"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon style="z-index:999" type="md-close" @click="showModal = false" size='30' />
            </p>
            <div class="wrap" v-for="(item,index) in zwData" :key="index" >
              <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
                <Col span="14">展商名称：{{item.EXHIBITOR}}</Col>
                <Col span="7">展位号：{{item.BOOTHN}}</Col>
             </Row>
                <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
                <Col span="14">联系电话：<span v-if="item.TEL">{{item.TEL}}</span><span v-else>空</span></Col>
                
                <Col span="7">展位类型：
                  <span v-if="addData.COLDSTATUS == 1">冷链展位</span>
                  <span v-if="addData.COLDSTATUS == 0 && addData.GWSTATUS == 1">高风险展位</span>
                  <span v-if="addData.COLDSTATUS == 0 && addData.GWSTATUS == 0 && addData.GFXSTATUS == 1">重点关注展位</span>
                  <span v-if="addData.COLDSTATUS == 0 && addData.GWSTATUS == 0 && addData.GFXSTATUS == 0 && addData.ENTRYSTATUS == 1">暂进展位</span>
                  <span v-if="addData.COLDSTATUS == 0 && addData.GWSTATUS == 0 && addData.GFXSTATUS == 0 && addData.ENTRYSTATUS == 0 ">普通展位</span>
                </Col>
             </Row>
               <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
                <Col span="14">国家/地区：{{item.COUNTRYCNNAME}}</Col>
                <Col span="7">摄像头编号：空</Col>
             </Row>
            <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
                 <!-- <Col span="14">联系电话：<span v-if="item.TEL">{{item.TEL}}</span><span v-else>空</span></Col> -->
                <!-- <Col span="9">展品后续流向及明细：<span style="color:#ffdf18; cursor: pointer;"  @click="openModal(item.EXHIBITORID)">流向及后续</span> </Col> -->
                <Col span="9">展品后续流向及明细：<span style="color:#ffdf18; cursor: pointer;"  @click="openModal(item)">流向及明细</span> </Col>
             </Row>
            </div>
        </Modal>

        <!-- 展品信息弹出层 -->
        
         <Modal
                v-model="toggleModal"
                width = "1500px"
                class-name='vertical-center-modal forbidBody'
                :footer-hide = true
                :mask-closable = "false"
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="toggleModal=false" size='30' />
            </p>
            <div class="ttt">
                <h1>展品明细及流向监控</h1>
               <TableList :zsId='{exhibitorid,exhibitor}' />
            </div>
        </Modal>
    </div>
</template>
<script>
import config from '@/until/config.js'
import axios from 'axios'
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import TableList from '@/views/page/CCIE/rangerInfor/components/flowlist.vue'

export default {
      components:{TableList},
    data(){
        return {
            arr:[],
            showArr:[],
            goodsIndex: 0,
            config: '',
            showModal:false,
            zwData:{},
            showFlag:false,
            addData:{
                "GWSTATUS":0,
                "STATUS":0,
                "ENTRYSTATUS":0,
                "GFXSTATUS":0,
                "COLDSTATUS":0
            },
            toggleModal:false,
            exhibitorid:'',
            exhibitor:''
        }
    },
    created(){
        // this.getDetailArr();
        this.config = location.host;
    },
    methods:{
        openModal(params){
             this.toggleModal = true
             this.exhibitorid = params.EXHIBITORID
             this.exhibitor = params.EXHIBITOR
        },
        showModalBtn(params){
            this.showModal = true
            this.queryZWtype(params)
            publicInter(interfaceUrl.qryExhibitorsByBooth, {booth:params}).then(r => {
                   this.showFlag = true
                   this.zwData = r.list
            })
        },
        queryZWtype(params){
             publicInter(interfaceUrl.queryBoothListByArea, {bootharea: params}).then(r => {
                 if(r.list.length > 0){
                      this.addData = r.list[0]
                 }
            })
        },
        closewin(){
            this.$emit('myCloseWin','goodsDetailShow');
        },
        showDetail(uuid,goodsList){
            this.showArr = goodsList.filter(function(x,index){
                return x.show == true;
            });
            for(let index in this.showArr){
                if(this.showArr[index].UUID == uuid){
                    this.goodsIndex = index;
                }
            }
            // this.showArr = this.showArr.filter(function(x,index){
            //     if(x.uuid == uuid){
            //         this.mainIndex = index;
                    
            //     }
            //     return x.url;
            // });
            // this.turn();    
        },
        getDetailArr(){
            axios.get('./dynamic.json').then(r=>{
                this.arr = r.data.goodsDetail;         
            });
        },
        turn(num){
            let index = this.goodsIndex + num;
            if(index < 0) {
                this.goodsIndex = this.showArr.length - 1;
            } else if(index > (this.showArr.length - 1)) {
                this.goodsIndex = 0;
            } else {
                this.goodsIndex = index;
            }
        },
        showBooth(booth){
            this.showModal = true
            this.queryZWtype(booth)
            publicInter(interfaceUrl.qryExhibitorsByBooth, {booth:booth}).then(r => {
                   this.showFlag = true
                   this.zwData = r.list
            })

            this.$emit('showBooth',booth);
        },
        
    }
}
</script>
<style lang="scss" scoped>
.goodsDetail{
    position: absolute;
    top: calc(50% - 20rem);
    left: calc(50% - 37rem);
    width: 74rem;
    height: 42rem;
    background: url('../../../../assets/bg.png') no-repeat;
    background-size: 100% 100%;
    z-index: 110;
    .switch{
        width: 34px;
        height: 84px;
        top: calc(50% - 42px);
        background-repeat: no-repeat;
        cursor: pointer;
    }
    .to-left{
        position:absolute;
        background: url('../../../../assets/toLeft.png'); 
        left: 3rem;
    }
    .to-left:hover{
        background: url('../../../../assets/toRight.png'); 
        transform: rotateY(180deg)
    }
    .to-right{
        position:absolute;
        background: url('../../../../assets/toLeft.png');
        transform: rotateY(180deg);
        right: 3rem;
    }
    .to-right:hover{  
        background: url('../../../../assets/toRight.png');
        transform: rotateY(0deg)
    }
    .closewin{
        position: absolute;
        top: 0.9rem;
        right: 1.5rem;
        font-size: 1.7rem;
        display: inline-block;
        cursor: pointer;
        color: #fff;
        font-size: 50px;
    }
    .title{
        font-family: Mic;
        font-size: 1.6rem;
        color: #FFDE1D;
        display: inline-block;
        width: 80%;
        // position: absolute;
        text-align: center;
        margin: 3.5rem 10% 0;
    }
    .desc{
        font-family: SourceHanSansCN-Medium;
        font-size: 1.2rem;
        display: inline-block;
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
        width: 46rem;
        position: absolute;
        // margin: 0 -23rem;
        left: 50%;
        transform: translateX(-50%);
        bottom: 3.5rem;
        // height: 90px;
    }
    .my-show-img{
        // transition: all 0.5s ease-in-out;
        background-repeat:no-repeat;
        background-size: 100% 100%;   
        position: absolute;
        border:4px solid #135DA8;
    }
    .main-img{
        width: 45rem;
        height: 26rem;    
        // background-size: cover;   
        top: 7rem;
        left: 14rem;
        z-index: 2;
    }
    .secondary-img{
        width: 31rem;
        height: 18rem;
        opacity: 0;
        z-index: 1;
        top: 11rem;
    }
    .left-img{ 
        left: 12rem;
    }
    .right-img{
        left: 31rem;
    }
}
.wrap{
            min-height: 250px;
            width: 100%;
            margin-top: 30px;
            position: relative;
           
             .icon-close {
                    position: absolute;
                    color: #fff;
                    font-size: 30px;
                    cursor: pointer;
                    top: 0%;
                    right: 10%;
                    z-index: 999;
                }
            
        }
</style>
