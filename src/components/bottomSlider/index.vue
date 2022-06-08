<template>
     <div class="topCopy">
        <p class="topCountry">
            参展商最多: <span>日本</span>  
        </p>
        <div class="scorllWrap">
            <ul id='con1' class="scorllWrap_target" ref="scorllWrap">
                <li v-for="(item,index) in imgData" :key="index" @click="showImg(index)">{{item.descTitle}}——<span>{{item.title}}</span></li>
                <!-- <li>最高的展品——<span>Miniload料箱堆垛机</span></li>
                <li>最快的巡逻船——<span>法拉帝FSD 195 高速巡逻船</span></li>
                <li>最会打球的机器人——<span>FORPHEUS</span></li>
                <li>最先进治疗加速器——<span>高场强磁共振放疗系统</span></li>
                <li>最先进的血糖探头技术——<span>混合式闭环胰岛素泵/NGP670G</span></li>
                <li>最新的直线电机驱动技术——<span>5轴联动车铣复合加工中心</span></li> -->
            </ul>
            <ul id='con2'></ul>
        </div>  
         
         <!-- 图片放大框 -->
        <div class="goodsDetail" v-if="imgShow">
            <span @click="closeModal" class="closewin">×</span>
            <h3 class="title">{{imgData[imgIndex].title}}</h3>
            <div 
                :class="{'main-img':true,'my-show-img':true}" 
                :style="{backgroundImage:'url('+imgData[imgIndex].imgSrc}"> 
            </div>
            <span class="desc" @click="showModalBtn(imgData[imgIndex].position)">{{imgData[imgIndex].desc}}<a>{{imgData[imgIndex].position}}</a></span>
        </div>

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
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import TableList from '@/views/page/CCIE/rangerInfor/components/flowlist.vue'

export default {
      components:{TableList},
    data(){
        return{
            //图片滚动列表
            imgData: [
                {
                descTitle:'最大的黑钻',
                title: 'Korloff Norr黑钻',
                desc: '世界上最大的明亮圆形切割黑钻。',
                imgSrc: '/featureExhi/U000000011501_展品_515.jpg',
                position: '5.2B1-06'
                },
                {
                descTitle:'最爽的游戏体验',
                title: '飞利浦主机游戏超级巨幕屏',
                desc: '飞利浦55也可采用液晶显示器1>55"UHD 144Hz主机游戏超级巨幕屏；2>全球顶级音响品牌Bowers&Wilkins为飞利浦全新打造高保真音响；3>HDR1000高动态范围画面增强技术；',
                imgSrc: '/featureExhi/U000000012905_展品_450.jpg',
                position: '4.1A5-003'

                },
                {
                descTitle:'最酷跑车',
                title: 'Apollo IE 跑车',
                desc: 'Apollo IE标志着回归超级跑车最真实、最根本的形态，也充分体现了Apollo所蕴含的品牌精神。',
                imgSrc: '/featureExhi/C202001060006_展品_32.jpg',
                position: '1.2C1-001'
                },
                {
                descTitle:'最强清洗机',
                title: 'EcoCvelox清洗机',
                desc: '得益于可根据工艺来配置的模块化设计，EcoCvelox是一款性价比高且性能强的去毛刺和清洗系统。它可以在一个系统内可靠并快速的实现零件去毛刺，清洗和干燥',
                imgSrc: '/featureExhi/U000000008872_展品_252.jpg',
                position: '3A3-004'
                },
                {
                descTitle:'最先进的手术台系统',
                title: 'MAGNUS手术台',
                desc: 'MAGNUS手术台系统被设计用于复合手术台中，多种可替换床面适用于不同术中影像检测诊断（DSA、CT、MR等）和多学科手术的需要，独特的台柱和模块化床面设计提供更多体位选择。',
                imgSrc: '/featureExhi/Z201904162615_展品_2270.jpg',
                position: '8.1C06-004'
                },
                {
                descTitle:'最科学实用',
                title: '多功能潜水器',
                desc: '此款多功能潜器，可以进行海底的科学考察、勘探、测绘。搭载的机械臂和水下高清摄像头、照明灯，可以进行水下作业养殖、取样、救援等；搭载的多功能水文探测仪可进行水文监测。',
                imgSrc: '/featureExhi/C201911110033_展品_164.jpg',
                position: '3C2-001'
                },
                {
                descTitle:'最健康的水设备',
                title: 'Active Water氧水设备',
                desc: '世界第一台单线态氧水设备，它能极大提高人体有氧能力。艾云泉态氧水设备具有独特的水路设计，一机三水（纯净水、矿物水、态氧能量水），满足不同需求。',
                imgSrc: '/featureExhi/Z201901103110_展品_2055.jpg',
                position: '8.1C03-003'
                },
                {
                descTitle:'最大的黑钻',
                title: 'Korloff Norr黑钻',
                desc: '世界上最大的明亮圆形切割黑钻。',
                imgSrc: '/featureExhi/U000000011501_展品_515.jpg',
                position: '5.2B1-06'
                },
                {
                descTitle:'最爽的游戏体验',
                title: '飞利浦主机游戏超级巨幕屏',
                desc: '飞利浦55也可采用液晶显示器1>55"UHD 144Hz主机游戏超级巨幕屏；2>全球顶级音响品牌Bowers&Wilkins为飞利浦全新打造高保真音响；3>HDR1000高动态范围画面增强技术；',
                imgSrc: '/featureExhi/U000000012905_展品_450.jpg',
                position: '4.1A5-003'
                },
                {
                descTitle:'最酷跑车',
                title: 'Apollo IE 跑车',
                desc: 'Apollo IE标志着回归超级跑车最真实、最根本的形态，也充分体现了Apollo所蕴含的品牌精神。',
                imgSrc: '/featureExhi/C202001060006_展品_32.jpg',
                position: '1.2C1-001'

                },
                {
                descTitle:'最强清洗机',
                title: 'EcoCvelox清洗机',
                desc: '得益于可根据工艺来配置的模块化设计，EcoCvelox是一款性价比高且性能强的去毛刺和清洗系统。它可以在一个系统内可靠并快速的实现零件去毛刺，清洗和干燥',
                imgSrc: '/featureExhi/U000000008872_展品_252.jpg',
                position: '3A3-004'
                },
            ],
            imgShow:false,
            imgIndex:0,
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
               if(r.list.length > 0 ){
                      this.addData = r.list[0]
                 }
            })
        },
        scorllFn(){
            let num = 30
            let top1 = 0
            let timer = null;
            let oUl = this.$refs.scorllWrap

            timer = setInterval(()=>{
                top1 -= num
                oUl.style.left = top1 +'px'
                oUl.style.transition = '1s linear'
                if(top1 < -3150){
                    top1 = 0
                    oUl.style.left = top1 +'px'
                    oUl.style.transition = '0s linear'
                }
            },1000)

            oUl.onmouseover = ()=>{
                clearInterval(timer)
            }

             oUl.onmouseout = ()=>{
                timer = setInterval(()=>{
                     top1 -= num
                    oUl.style.left = top1 +'px'
                    oUl.style.transition = '1s linear'
                     if(top1 < -3150){
                      top1 = 0
                      oUl.style.left = top1 +'px'
                      oUl.style.transition = '0s linear'
                    }
                },1000)
            }

        },
        showImg(parmas){
           this.imgIndex = parmas
           this.imgShow = true
        },
        closeModal(){
            this.imgShow = false
        }
    
    },
    mounted(){
        this.scorllFn()
    }
}
</script>

<style lang="scss" scoped>

.topCopy{
    display: flex;
    width: 100%;
    height: 70PX;
    line-height: 70px;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #0037B2;
    >p.topCountry{
        &:first-child{
            margin-right: 1rem;
            margin-left: 20px;
        }
        width: 10rem;
        font-size: .9rem;
        color: #fff;
        border-right: 1px solid #0037B2;
        span{
            color: #FFDE1D;
            cursor: pointer;
        }

    }
    .scorllWrap{
        position: relative;
        width: 80%;
        height: 70px;
        overflow: hidden;
        .scorllWrap_target{
            position: absolute;
            top: 15px;
            left: 0;
            width: 800%;
            height: 70px;
            display: flex;
            li{
               list-style: none;
               min-width: 450px;
               height: 40px;
               line-height: 40px;
               text-align: center;
               border-right: 1px solid #0037B2;
               font-size: 18px;
               span{
                    color: #FFDE1D;
                    cursor: pointer;
                }
            }
        }
    }
}
.goodsDetail{
            position: absolute;
            top: calc(50% - 25rem);
            left: calc(50% - 37rem);
            width: 74rem;
            height: 42rem;
            background: url('../../assets/bg.png') no-repeat;
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
                background: url('../../assets/toLeft.png'); 
                left: 3rem;
            }
            .to-left:hover{
                background: url('../../assets/toRight.png'); 
                transform: rotateY(180deg)
            }
            .to-right{
                position:absolute;
                background: url('../../assets/toLeft.png');
                transform: rotateY(180deg);
                right: 3rem;
            }
            .to-right:hover{  
                background: url('../../assets/toRight.png');
                transform: rotateY(0deg)
            }
            .closewin{
                position: absolute;
                top: 0.9rem;
                right: 3rem;
                font-size: 1.7rem;
                display: inline-block;
                cursor: pointer;
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
                font-size: 0.8rem;
                display: inline-block;
                word-break: break-all;
                white-space: normal;
                overflow: hidden;
                width: 46rem;
                position: absolute;
                // margin: 0 14rem;
                left: 50%;
                transform: translateX(-50%);
                bottom: 3.5rem;
                line-height: 2;
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