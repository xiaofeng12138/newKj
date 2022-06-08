<template>
    <div class="visual">
       <div class="header">
           <div class="h_title">
               通关全程可视化
           </div>
           <div class="h_searh">
             报关单号:<Input size="large" placeholder="请输入报关单号"  style="width:70%;margin-left:10px" v-model="searchContent"/>
           </div>
          <Button type='primary' style="width:160px;font-size:16px" @click="queryBgdId">查  询</Button>
       </div>
       <div class="tgBody">
           <div class="tgHeader">
                  <img src="./img/icon_tg.png" alt="">
                   <p>通关环节</p>
           </div>
           <div class="noInfo slider_target" id="silder-row" v-if="this.nowCusEnterStep.length == 0"  >暂无数据</div>
            <div class="tgStep" v-else>
               <div id="silder-row">
                    <li>
                      <!-- <div class="overtop" v-if="this.allCusEnterStep >9">
                         <span>通关完成</span>
                         <p>......................</p>
                      </div> -->
                       <div class="top" >
                        <img src="./img/tg_icon_dot.png" alt="">
                         <p>............................</p>
                      </div>
                      <div class="pro_body">
                          <p class="choose">{{nowCusEnterStep.STEP_MESSAGE}}</p>
                          <div style="margin-top:15px">
                              <img src="./img/tg_icon_time@3x.png" alt="">
                              {{nowCusEnterStep.CREATE_DATE}}
                          </div>
                           <div>
                              <img src="./img/tg_icon_depart@3x.png" alt="">
                             {{nowCusEnterStep.DEPARTMENT}}
                          </div>
                      </div>
                  </li>
                  <li v-for="(item,index) in allCusEnterStep" :key="index">
                      <div class="top">
                        <img src="./img/pass_icon_dot.png" alt="">
                         <p>............................</p>
                      </div>
                      <div class="pro_body">
                          <p class="normal">{{item.STEP_MESSAGE}}</p>
                          <div style="margin-top:15px">
                              <img src="./img/sz.png" alt="">
                              {{item.CREATE_DATE}}
                          </div>
                           <div>
                              <img src="./img/user.png" alt="">
                              {{item.DEPARTMENT}}
                          </div>
                      </div>
                  </li>
               </div>
               
            </div>
       </div>

        <div class="czBody">
           <div class="czHeader">
                  <img src="./img/icon_cz.png" alt="">
                   <p>出证环节</p>
           </div>
            <div class="noInfo" v-if="this.nowCZstep.length == 0" >暂无数据</div>
            <div class="czStep" v-else>
                   <li>
                        <div class="top" >
                                <img src="./img/cz_icon_dot.png" alt="">
                                <p>............................</p>
                            </div>
                            <div class="pro_body">
                                <p class="choose" style="color:#F7AE39">{{nowCZstep.PROCESS_NODE_MESSAGE}}</p>
                                <div>
                                    <img src="./img/cz_icon_time@2x.png" alt="">
                                    {{nowCZstep.OPER_DATE}}
                                </div>
                                <div>
                                    <img src="./img/cz_icon_time@2x.png" alt="">
                                    {{nowCZstep.END_DATE}}
                                </div>
                                <div>
                                    <img src="./img/cz_icon_depart@2x.png" alt="">
                                    {{nowCZstep.TREA_ORG_CODE_NAME}}
                                </div>
                            </div>
                   </li>
                       
                    <li v-for="(item,index) in allCZstep" :key="index">
                            <div class="top">
                                <img src="./img/pass_icon_dot.png" alt="">
                                <p>............................</p>
                            </div>
                            <div class="pro_body">
                                <p class="normal">
                                    {{item.PROCESS_NODE_MESSAGE}}
                                </p>
                                <div>
                                    <img src="./img/sz.png" alt="">
                                    {{item.OPER_DATE}}
                                </div>
                                <div>
                                    <img src="./img/sz.png" alt="">
                                    {{item.END_DATE}}
                                </div>
                                <div>
                                    <img src="./img/user.png" alt="">
                                    {{item.TREA_ORG_CODE_NAME}}
                                </div>
                            </div>
                    </li>
            </div>
       </div>

       <div class="specialContent">
              <div class="c_header">
                  <img src="./img/icon_sshy.png" alt="">
                   <p>涉税化验进度</p>
              </div>
               <div class="noInfo" v-if="this.hydata.length == 0" >暂无数据</div>
               <div class="showTable" v-else>
                    <Table border :columns = 'columns' :data='hydata' ></Table>
                </div>
          </div>
    </div>
</template>

<script>
import {publicGetInter,publicInter} from '@/api/http';
import interfaceUrl from '@/api/interfaceUrl'
import Mousewheel from './js/mousewheel'
export default {
    data () {
        return {
            //通关环节数据
             nowCusEnterStep:[],
             allCusEnterStep:[],
             noallInfo:[],
             searchContent:'',
            columns:[
                {
                   title: '序号',
                   align:'center',
                   width:'100',
                   render:(h,params,index)=>{
                          return h('span',(params.index)+1)
                    }
               },
               {
                   title: '品名',
                   align:'center',
                   key: 'G_NAME'
               },{
                   title: '涉及化验状态',
                   align:'center',
                   key: 'STATE',
                //    render:(h,params)=>{
                //           let tmpStr = "";
                //           if(params.row.status == 1){
                //             tmpStr="未送检";
                //           }else if(params.row.status== 2){
                //             tmpStr="化验完成";
                //           }else if(params.row.status== 3){
                //             tmpStr="退样";
                //           }
                //           return h('span',{
                //               style:{
                //                  color: (params.row.status == 1)? "#BDBABD":(params.row.status == 2)?"#63E35A":"#EF5552"
                //               }
                //           },tmpStr)
                //         }
               }
            ],
             hydata:[],

            //出征环节数据
             nowCZstep:[],
             allCZstep:[]
        }
    },
  

    methods:{
        queryCount(){
            publicInter(interfaceUrl.recordLoginCount,{}).then((res)=>{
                console.log(res)
            })
        },

        //报关单查询函数
        queryBgdId(){
            let requestData = this.searchContent
            if(!requestData){
                this.$Message.error('报关单号不能为空！！！')
            }else{
               this.queryEnter()
            }
           
        },

        //通关查询函数
        queryEnter(){
            let requestData = this.searchContent
            let url = interfaceUrl.queryDec+'?entryId='+ requestData 
            publicGetInter(url).then(r=>{
                 this.resolveEnter(r)
                 this.resolveCZ(r)
                })
        },
         //出证查询函数
        // queryCZ(){
        //     let requestData = this.searchContent
        //     let url = interfaceUrl.queryDec+'?entryId='+ requestData 
        //      publicGetInter(url).then(r=>{
        //             if(r.eciqData.length == 0 ){
        //                this.nowCZstep = []
        //                this.allCZstep =[]
        //                this.$Message.error('暂无出证数据')
        //                return false
        //             }else if(r.eciqData.length == 1){
        //                 this.nowCZstep = r.eciqData[0]
        //                 this.allCZstep = []
        //                 return false
        //             }else{
        //                  let CZInfo = r.eciqData
        //                  this.nowCZstep = CZInfo[0]
        //                  this.allCZstep = CZInfo.splice(1)
        //             }
        //         })
        // },

        resolveEnter(r){
            if(r.taxData.length > 0){
                        this.hydata = r.taxData;
                    }else{
                       this.hydata = []
                       this.$Message.error('暂无涉税化验数据')
                    }

                    if(r.entryData.length == 0 ){
                       this.nowCusEnterStep = []
                       this.allCusEnterStep = []
                       this.$Message.error('暂无通关数据')
                       return false
                    }else if(r.entryData.length == 1){
                        this.nowCusEnterStep = r.entryData[0]
                        this.allCusEnterStep = []
                         return false
                    }else{
                         let dataInfo = r.entryData
                         this.nowCusEnterStep = dataInfo[0]
                         this.allCusEnterStep = dataInfo.splice(1)
                    }
        },
        resolveCZ(r){
           if(r.eciqData.length == 0 ){
                       this.nowCZstep = []
                       this.allCZstep =[]
                       this.$Message.error('暂无出证数据')
                       return false
                    }else if(r.eciqData.length == 1){
                        this.nowCZstep = r.eciqData[0]
                        this.allCZstep = []
                        return false
                    }else{
                         let CZInfo = r.eciqData
                         this.nowCZstep = CZInfo[0]
                         this.allCZstep = CZInfo.splice(1)
                    }
        }

        

    },
     mounted(){
        this.queryCount()
    },
}
</script>

<style lang="scss" scoped>
.visual{
    .noInfo{
        width:100vw;
        height: 200px;
        font-size: 16px;
        font-weight: bold;
        line-height: 200px;
        margin-left: 20px;
    }
     li{
        list-style: none;
      }
    .header{
        height: 64px;
        width: 100%;
        background-color: #F7FBFE;
        padding: 12px 24px;
        display: flex;
        .h_title{
            height: 40px;
            width: 200px;
            text-align: center;
            line-height: 40px;
            font-size: 24px;
            border-right: 2px solid #ccc;
            color: #000;
        }
        .h_searh{
            width: 360px;
            height: 40px;
            margin-left: 30px;
            font-size: 14px;
            color: #000;
        }
    }
    .tgBody{
        width: 100%;
        height: 240px;
        .tgHeader{
                height: 45px;
                width: 100%;
                border-bottom: 2px solid #eee;
                display: flex;
                img{
                   margin-top: 5px;
                   width: 30px;
                   height: 30px;
                   display: block;
                }
                p{
                    line-height: 45px;
                    font-size: 14px;
                    color: #000;
                    display: inline-block;
                    margin-left: 10px;
                    font-weight: bold;
                }
        }
        .tgStep{
            height: 195px;
            width: 100% ;
            #silder-row {
                    display: flex;
                    width: 100%;
                    height: 195px;
                    overflow: hidden;
                    overflow-x: scroll;
                    li {
                        width: 260px;
                        height: 210px;
                        margin: 10px;
                        float: left;
                          .top{
                            height: 30px;
                            display: flex;
                            img{
                                display:block;
                                width: 20px;
                                height: 20px;
                                margin-top: 5px;
                                margin-left: 10px;
                            }
                            p{
                                line-height: 12px;
                                    font-size: 30px;
                                    color:#E7E7E7;
                                    display: inline-block;
                                    margin-left: 10px;
                                    font-weight: bold;
                                    overflow: hidden;
                            }
                        }
                        .pro_body{
                            padding-left: 10px;
                            .choose{
                                font-size: 16px;
                                color: #4A9EF7;
                                font-weight: bold;
                                margin-bottom: 5px;
                            }
                            .normal{
                                font-size: 16px;
                                font-weight: bold;
                                margin-bottom: 5px;
                            }
                            div{
                                display: flex;
                                height: 30px;
                                line-height: 30px;
                                font-size: 15px;
                                img{
                                    display: block;
                                    width: 20px;
                                    height: 20px;
                                    margin-top: 5px;
                                    margin-right: 10px;
                                }
                                
                            }
                        }
                    }
                }
        }
        
    }
    .czBody{
        width: 100%;
        height: 240px;
        .czHeader{
                height: 45px;
                width: 100%;
                border-bottom: 2px solid #eee;
                display: flex;
                img{
                   margin-top: 5px;
                   width: 30px;
                   height: 30px;
                   display: block;
                }
                p{
                    line-height: 45px;
                    font-size: 14px;
                    color: #000;
                    display: inline-block;
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
        .czStep{
            height: 195px;
            width: 100%;
            overflow: hidden;
            display: flex;
            overflow-x: scroll;
                    li {
                        width: 260px;
                        height: 175px;
                        margin: 10px;
                          .top{
                            height: 30px;
                            display: flex;
                            img{
                                display:block;
                                width: 20px;
                                height: 20px;
                                margin-top: 5px;
                                margin-left: 10px;
                            }
                            p{
                                line-height: 12px;
                                    font-size: 30px;
                                    color:#E7E7E7;
                                    display: inline-block;
                                    margin-left: 10px;
                                    font-weight: bold;
                                    overflow: hidden;
                            }
                        }
                        .pro_body{
                            padding-left: 10px;
                            .choose{
                                font-size: 16px;
                                color: #F7AA29;
                                font-weight: bold;
                                margin-bottom: 5px;
                            }
                            .normal{
                                font-size: 16px;
                                font-weight: bold;
                                margin-bottom: 5px;
                            }
                            div{
                                display: flex;
                                height: 30px;
                                line-height: 30px;
                                font-size: 15px;
                                img{
                                    display: block;
                                    width: 20px;
                                    height: 20px;
                                    margin-top: 5px;
                                    margin-right: 10px;
                                }
                                
                            }
                        }
                    }
                
        }
        
    }
    .specialContent{
            width: 100%;
            padding: 0 15px;
            margin-bottom: 10px;
            .c_header{
                height: 45px;
                width: 100%;
                border-bottom: 2px solid #eee;
                display: flex;
                img{
                   margin-top: 5px;
                   width: 30px;
                   height: 30px;
                   display: block;
                }
                p{
                    line-height: 45px;
                    font-size: 14px;
                    color: #000;
                    display: inline-block;
                    margin-left: 10px;
                    font-weight: bold;
                }
                
            }
            .showTable{
                margin-top: 15px;
                width: 50%;
            }
        }
}
</style>