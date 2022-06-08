<template>
    <div class="zwlist">

         <Button type="primary" size='large' class="btn" @click="goback">返  回</Button>
       <div class="zwwrap">
            <div class="zwleft">
                <li v-for="(item,index) in zwListArr" :key="index" @click="clickHallNo(item)">
                    <img v-if="item.STATUS == 1" src="./img/ranger1.png" alt="">
                    <img v-if="item.COLDSTATUS == 1" src="./img/red.png" alt="">
                    <img v-if="item.COLDSTATUS == 0 && item.GWSTATUS == 1" src="./img/oragin.png" alt="">
                    <img v-if="item.COLDSTATUS == 0 && item.GWSTATUS == 0 && item.GFXSTATUS == 1" src="./img/yellow.png" alt="">
                    <img v-if="item.COLDSTATUS == 0 && item.GWSTATUS == 0 && item.GFXSTATUS == 0 && item.ENTRYSTATUS == 1" src="./img/green.png" alt="">
                    <span>{{item.PLACEPOSITION}}</span>
                    </li>
            </div>
         <div class="zwright">
             <div class='legend'>
                <ul>
                    <li>
                        <img src="./img/red.png" >
                        <span>冷链展位</span>
                    </li>
                    <li>
                    <img src="./img/oragin.png" >
                    <span>高风险展位</span>
                    </li>
                </ul>
                <ul>
                    <li>
                    <img src="./img/yellow.png" >
                    <span>重点关注展位</span>
                    </li>
                    <li>
                    <img src="./img/green.png" >
                    <span>暂进展位</span>
                    </li>
                </ul>
                    
                </div>
        </div>
       </div>

       <!-- 弹出层 -->
        <Modal
                v-model="showModal"
                width = "1000px"
                class-name='vertical-center-modal forbidBody'
                :footer-hide = true
                :styles="{top:'150px'}"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="openShowModal" size='30' />
            </p>
            <div class="wrap" v-for="(item,index) in zwData" :key="index" >
              <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
                <Col span="14">展商名称：{{item.EXHIBITOR}}</Col>
                <Col span="7">展位号：{{item.BOOTHN}}</Col>
             </Row>
                <Row style="height:40px;line-height:40px;color:#fff;font-size:18px">
               
                  <Col span="14">巡馆记录：<span v-if="addData.STATUS == 1" @click="openXgModal(item.BOOTHN)"> <img src="./img/ranger1.png" alt=""></span><span v-else>暂无巡馆记录</span></Col>
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
                 <Col span="14">联系电话：<span v-if="item.TEL">{{item.TEL}}</span><span v-else>空</span></Col>
                <!-- <Col span="9">展品后续流向及明细：<span style="color:#ffdf18; cursor: pointer;"  @click="openModal(item.EXHIBITORID)">流向及后续</span> </Col> -->
                <Col span="9">展品后续流向及明细：<span style="color:#ffdf18; cursor: pointer;"  @click="openModal(item)">流向及后续</span> </Col>
             </Row>
             <div class="imgList">
                 <span>采集照片：</span>
                 <template v-if="item.imglist">
                        <div v-for="(ele,index) in item.imglist" :key="index">
                            <img :src="`data:image/patrol;base64,${ele.FILEBASE64}`" style="display:block;width:200px;height:100px;margin-top:20px" @click='openImg(ele.FILEBASE64)'/>
                         </div>
                </template>    
             </div>
            <div v-if="showImgWrap" class="showImg">
                <img class="bigImg" :src="imgSrc" @click="rotate" id="bigImg" >
             </div>
             <Icon v-if="showImgWrap"  type="md-close" @click="hideImg" class="icon-close"></Icon>
            </div>
        </Modal>

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
               <!-- <TableList :zsId='exhibitorid' /> -->
               <TableList :zsId='{exhibitorid,exhibitor}' />
            </div>
        </Modal>

        <!-- 巡馆记录表 -->
        <Modal v-model="xgModalShow" width="1400" class="detailZWModal" :mask-closable="false" footer-hide>
            <div slot="header" class="header">
                <img src="@/assets/zwTitle.png" />
                <span>巡馆记录表</span>
            </div>
            <div class="users">
                <div class="user" v-for="(item, index) in xgList" :key="index" :class="{active: index == childIndexValue}" @click="userClick(index)">
                    {{item.RECODE_USER}}
                    <span class="rect left top"></span>
                    <span class="rect right top"></span>
                    <span class="rect left bottom"></span>
                    <span class="rect right bottom"></span>
                </div>
            </div>
            <div class="time">巡馆时间:{{xgList[childIndexValue].RECODE_TIME}}</div>
            <div class="table">
              <div class="box">
                <table class="probermList">
                <thead class="head">
                  <tr>
                    <th>序号</th>
                    <th>检查内容</th>
                    <th>是否存在问题</th>
                    <th>问题描述</th>
                  </tr>
                </thead>
                <tbody> 
                  <tr>
                    <td>1</td>
                    <td>展览品是否符合禁止清单、限制清单的要求。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[0].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[0].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>展览品是否有擅自移出展馆、违规销售等情况</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[1].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[1].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td> 展览品是否有未经批准的试用、品尝、馈赠等情况。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[2].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[2].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>展览品是否存在非法出版物、印刷品、音像制品等违禁品。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[3].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[3].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>展览品中是否存在未经海关审批入境的动植物及其产品、动植物源性食品、特殊物品。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[4].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[4].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>未获检疫准入的动植物产品是否与其他参展动植物产品相对隔离，是否做好每日消耗核销记录。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[5].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[5].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>特殊物品包装是否安全无破损，存在生物安全风险的特殊物品是否具有生物危害标识并具备相关生物安全控制条件。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[6].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[6].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>动植物及其产品、动植物源性食品废弃物是否按海关要求进行收集和处理。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[7].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[7].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>是否发现动植物疫情疾病。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[8].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[8].PROBLEM_RECODE}}</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>是否存在其他不符合海关规定的情况。</td>
                    <td>{{xgList[childIndexValue].list.length && problemsValue[xgList[childIndexValue].list[9].IS_PROBLEM]}}</td>
                    <td>{{xgList[childIndexValue].list.length && xgList[childIndexValue].list[9].PROBLEM_RECODE}}</td>
                  </tr>
                </tbody>
              </table>
              </div>
              
            </div>
            
        </Modal>
      
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import expandRow from './expand.vue';
import { getCookie, removeCookie,setCookie } from "@/until/getToken";
import TableList from './flowlist'

export default {
    components:{TableList},
    data() {
        return {
            showImgWrap:false,
            imgSrc:'',
            angle:0,
            xgModalShow:false,
            problemsValue: ['正常', '异常'],
            xgList: [
                {
                    RECODE_TIME: '',
                    list:[
                        
                    ]
                }
            ],
            toggleModal:false,
            exhibitorid:'',
            exhibitor:'',
            zwListArr:[],
            showModal:false,
            zwData:{},
            addData:{},
            childIndexValue:0
        }
    },
    methods:{
        goback(){
            this.$router.go('-1')
        },
         queryZWlist(exhibitionNum) {
            let e = exhibitionNum;
            let numSite = getCookie('hallNo');
            // if(numSite == '5.2') {
            //     e = '5.2' + exhibitionNum
            // }
            publicInter(interfaceUrl.queryBoothListByArea, {bootharea: e}).then(r => {
                this.zwListArr = r.list
            })
        },

        clickHallNo(params){
          console.log(params)
             this.addData = params
             this.showModal = true
              publicInter(interfaceUrl.qryExhibitorsByBooth, {booth: params.PLACEPOSITION}).then(r => {
                   this.zwData = r.list
                })
        },
        openModal(params){
             this.toggleModal = true
             this.exhibitorid = params.EXHIBITORID
             this.exhibitor = params.EXHIBITOR

        },
        openXgModal(params){
             this.xgModalShow = true
              publicInter(interfaceUrl.qrySignsByBooth, {booth: params}).then(r => {
                        this.xgList = r.list;
                    })
        },
        userClick(index) {
            this.childIndexValue = index;
        },
         openImg(e){
                this.imgSrc ='data:image/patrol;base64,'+ e
                this.showImgWrap =true
            },
        rotate() {
                let img = document.getElementById('bigImg');
                this.angle += 90;
                img.style.transform = `rotate(${this.angle}deg)`
            },
        hideImg(){
             this.showImgWrap =false
            },
        openShowModal(){
            this.showModal = false
            this.zwData ={}

        }
    },
    mounted(){
       let queryHallno = this.$route.params.zwNum
       
       this.queryZWlist(queryHallno)
    }
}
</script>


<style lang="scss" scoped>
    .zwlist{
        position: relative;
        width: 100%;
        min-height: 600px;
        border:1px solid #185DF7;
           
        .btn{
            position: absolute;
            right: 10px;
            top: 20px;
            z-index: 999;
        }
        .zwwrap{
            width: 100%;
            min-height: 600px;
            display: flex;
        .zwleft{
            width: 75%;
            height: 100%;
             li{
                list-style: none;
                margin: 6px;
                width: 13%;
                height: 60px;
                background-color: #103484;
                float: left;
                border: 2px solid #0886BD;
                box-shadow:#0886BD 0px 0px 1px 1px inset;
                line-height: 60px;
                cursor: pointer;
                img{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    margin: 0 auto;
                }
                span{
                    font-size: 16px;
                    color: #fff;
                }
            }
            li:hover{
                 background-color: #00c1ff;
            }
        }
        .zwright{
            position: relative;
            width: 25%;
            height: 100%;
            margin-left: 50px;
            .legend{
                position: absolute;
                right: 90px;
                top: 20px;
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
           }
        }
        
    }
    .wrap{
            height: 400px;
            width: 100%;
            margin-top: 30px;
            position: relative;
            .imgList{
                min-height: 200px;
                width: 100%;
                span{
                    color: #fff;
                    display: inline-block;
                    font-size: 18px;
                    line-height: 40px;
                }
            }
             .showImg {
                position: absolute;
                top: 0%;
                left: 50%;
                width:500px;
                height:150px;
                transform: translateX(-50%);
                z-index: 999;
                .bigImg{
                    display:block;
                    width:400px;
                    height:250px;
                }
            }
             .icon-close {
                    position: absolute;
                    color: #fff;
                    font-size: 30px;
                    cursor: pointer;
                    top: 0%;
                    right: 10%;
                }
            
        }
.detailZWModal {
    .header {
        position: relative;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: #fff;
        font-size: 1.25rem;
        span {
            z-index: 22;
        }
        img {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 3rem;
            width: 13rem;
        }
    }
}
.table{
  padding: 1rem;
  h2{
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .box{
    width: 100%;
    overflow: auto;
    max-height: 500px;
    padding-right: 1rem;
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
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
  }
  .probermList{
    width: 100%;
    border-collapse: collapse;
    // table-layout: fixed;
    background: #0C1435;
    border: 1px solid #1F5FF2;
    color: #fff;
    font-size: 1rem;
  thead.important{
    tr{
      background: rgba(245,66,79,.1);
      th{
        
      }
      

    }
  }
  td:first-child{
    width: 10%;
    text-align: center;
  }
  td:nth-child(2){
    width: 50%;
  }
  td:nth-child(3){
    text-align: center;
    width: 15%;
  }
  tr:last-child{
    td{
      border-bottom:0; 
      
    }
  }
  tbody{
    tr:nth-child(odd){
    background: rgb(24, 24, 34);;
  }

  }
  
  td,th{
    padding: 5px 10px;
    border-right:1px solid rgba(255, 255, 255,0.4);
    border-bottom: 1px solid rgba(255, 255, 255,0.4); 
    
    &:last-child{
      border-right:0;
      // border-bottom:0;

    }
  }
  thead{
    tr{
      padding: 10px 0;
      text-align: left;
      height: 40px;
      border-top: 1px solid rgba(255, 255, 255,0.2);
      
      span{
        padding:10px 0 10px 30px;

      } 
    }
  }
  thead.head{
    background: #1F5FF2;
    
    tr{
      border-top: 0;
      th{
         text-align: center;

      }
     
    }
  }
}
}
.users {
    display: flex;
    .user {
        position: relative;
        border: 1px solid rgba(31, 95, 242, 0.3);
        cursor: pointer;
        width: 10rem;
        height: 3rem;
        margin: 1rem;
        font-size: 1rem;
        line-height: 3rem;
        text-align: center;
        &.active {
            border: 1px solid rgba(31, 95, 242, 1);
            background: #1f5ff2;
            color: #fff;
        }
    }
}
.time {
    margin-right: 0.5rem;
    text-align: right;
    color: #fff;
    font-size: 0.8rem;
}
</style>