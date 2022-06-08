<template>
    <!-- 
        强监管与优化服务
     -->
    <div class="JY">
        <ol>
            <li :class="{active:!onOff}" @click="onOff=false">强监管</li>
            <li :class="{active:onOff}" @click="onOff=true">优服务</li>
        </ol>
        <div class="swipper-view">
            <div class="swipper" :class="{active:onOff}">
                <div class="swipper-item">
                    <div class="item-left">
                        <ol>
                            <li>展品入境查验数:<br><span>{{CHKNUM}}</span></li>
                            <li>展品入境查获数:<br><span>0</span></li>
                            <li>巡展记录:<br><span style="cursor: pointer" @click="recordHandle">{{record}}</span></li>
                        </ol>
                    </div>
                    <div class="item-right">
                        <ul class="scrollUl">
                            <li >
                                <div>
                                    <span>
                                        <img src="@/assets/shajiashu.png" alt="">监测送样(批)
                                    </span>
                                    <b>30</b>
                                    <a >
                                        <b>已出结果30批</b> <br>
                                        <b>合格29批，不合格1批</b>
                                    </a>
                                </div>
                                <div class="last">
                                    <span>
                                        <img src="@/assets/mapc.png" alt="">除害(件)
                                    </span>
                                    <b>1</b>
                                    <a class="aa">
                                        <b>检疫性有害生物咖啡果小蠹 1批</b>
                                    </a>
                                </div>
                            </li>
                            <li >
                                <div>
                                    <span @click="showModal(2)">
                                        <img src="@/assets/jianyipici.png" alt="">食品检疫审批(批)
                                    </span>
                                    <b>2</b>
                                </div>
                                <div class="last">
                                    <span>
                                        <img src="@/assets/mapd.png" alt="">销毁
                                    </span>
                                    <b>0</b>
                                </div>
                            </li>
                            <li>             
                                <div>
                                    <span>
                                        <img src="@/assets/mapf.png" alt="">退运(件)
                                    </span>
                                    <b>0</b>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="swipper-item">
                    <div class="item-left blue">
                        <Carousel  loop autoplay :autoplay-speed=10000 class="coutom-carousel" arrow='hover' dots='none' trigger='hover'>
                            <CarouselItem v-if="proof&&sheji&&tiqian&&tili&&dataA" >
                                <div>
                                    <ul class="itemOne" >
                                        <li>
                                            已开具证明函份数：
                                            <span>{{proof}}</span>
                                           
                                        </li>
                                        <li>
                                            涉及展商数：
                                            <span>{{sheji}}</span>
                                        
                                        </li>
                                        <li>
                                            提前申报数：
                                            <span>{{tiqian}}</span>
                                           
                                        </li>
                                        <li>
                                            快速提离数：
                                            <span>{{tili}}</span>
                                        </li>
                                        <li>
                                            担保额度监控: <br>
                                            2
                                            <span @click="showModal(0)">5(亿元) / {{(dataA/10000).toFixed(0)}}(万元)</span>
                                        </li>
                                    </ul>
                                </div>
                            </CarouselItem>
                            <CarouselItem v-if="proof&&sheji&&tiqian&&tili&&dataA">
                                <div>
                                    <ol class="itemTwo">
                                        <li>
                                            <div>
                                                特殊区域保税展示：<br>
                                                <span>{{money[1]['a']}}(万美元) / {{money[1]['b']}}(批次)</span>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                保税仓库保税展示：<br>
                                                <span>{{money[2]['a']}}(万美元) / {{money[2]['b']}}(批次)</span>
                                            </div>
                                        </li>
                                        <li  :style="{opacity:money[0]['a']!=0?1:0}">
                                            <div>
                                                特殊区域转展览品：<br>
                                                <span>{{money[0]['a']}}(万美元) / {{money[0]['b']}}(批次)</span>
                                            </div>
                                        </li>
                                        <li :style="{opacity:money[3]['a']!=0?1:0}">
                                            <div>
                                                保税仓库转展览品:<br>
                                                <span >{{money[3]['a']}}(万美元) / {{money[3]['b']}}(批次)</span>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </CarouselItem>
                        </Carousel>    
                    </div>
                    <div class="item-right blue">
                        <ul class="scrollUl">
                            <li >
                                <div >
                                    <span style="cursor: pointer" @click="showModal(3)">
                                        <img src="@/assets/teshu.png" alt="">特许食品检疫审批
                                    </span>
                                    <b>30</b>
                                </div>
                                <div class="last">
                                    <span>
                                        <img src="@/assets/mape.png" alt="">免于入境验证批次
                                    </span>
                                    <b>1</b>
                                </div>
                            </li>
                            <li >
                                <div style="cursor: pointer" @click="approve">
                                    <span>
                                        <img src="@/assets/teshu.png" alt="">特许进境动植物检疫审批
                                    </span>
                                    <b>2</b>
                                </div>
                                <div class="last">
                                    <span style="cursor: pointer" @click="showModal(1)">
                                        <img src="@/assets/mape.png" alt="">免于入境验证金额(美元)
                                    </span>
                                    <b>0</b>
                                </div>
                            </li>
                            <li>             
                                <div>
                                    <span>
                                        <img src="@/assets/mape.png" alt="">免于强制验证件数
                                    </span>
                                    <b>0</b>
                                </div>
                            </li>
                        </ul>

                    </div>
                            
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Scroll from './scroll.js'
import {mapMutations} from 'vuex'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            onOff:false,
            CHKNUM:0,
            record:0,
            proof:0,
            sheji:0,
            tiqian:0,
            tili:0,
            dataA:0,
            dataTable:[],
            mianyu:{ZJE:0,ZJS:0,ZPC:0},
            money:[
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0},
                {a:0,b:0}
            ],
            rangerList:[]
        }
    },
    created(){
        this.initData();
    },
    beforeMount(){
        
    },
    mounted(){
        var target=document.getElementsByClassName('scrollUl');
        var a=new Scroll({target:target[0]});
        var b=new Scroll({target:target[1]});
        
    },
    methods:{
        ...mapMutations('exhibitionStore',[
            'viewChange'
        ]),
        approve(){
            this.viewChange([false,true])
            this.$emit('Tclick')
        },
        showModal(num){
            this.$emit('modalShow',num)
        },
        recordHandle(){
            this.$emit('recordDetail',this.rangerList)
        },
        initData(){
            /**
            *展品入境查验数
            */
             publicInter(interfaceUrl.chkStatistics,{}).then(r=>{
                if(r.code===200){
                    this.CHKNUM=r.CHKNUM
                    // this.CHDNUM=r.CHDNUM
                }
            })
            /**
             *特殊区域保税展示、保税仓库保税展示、特殊区域转展览品、保税仓库转展览品   
             */
            publicInter(interfaceUrl.queryOptimalService,{}).then(r=>{
                if(r.isOk){
                    r.msg.forEach(element => {
                        this.money[element.SERVICE_TYPE]={a:element.SERVICE_TOTAL||0,b:element.SERVICE_BATCH||0}    
                    });

                }
            })
            /**
             *担保额度监控
             */
            publicInter(interfaceUrl.queryStatisticUsedQuota,{}).then(r=>{
                if(r.code===200){
                    this.dataA=r.USED_QUOTA
                }
            })
            /**
             *快速提离数
             */
            publicInter(interfaceUrl.queryExpoToPort,{}).then(r=>{
                if(r.isOk){
                    this.tili=r.totalRow
                }
            })
            /**
             *提前申报数
            */
            publicInter(interfaceUrl.queryStatisticDeclare,{}).then(r=>{
                if(r.code===200){
                    this.tiqian=r.NUM;
                }

            }),
            /***
             *已开具证明函份数
             */
            publicInter(interfaceUrl.proof,{status:"7"}).then(r=>{
                if(r.code===200){
                    this.proof=r.NUM
                }
            })
            /**
             *涉及展商数
             */
            publicInter(interfaceUrl.national,{}).then(r=>{
                if(r.code===200){
                    this.sheji=r.COMPANYTOTAL
                }
            })
            /**
             *免于验证类
             */
            publicInter(interfaceUrl.LPreferential,{}).then(r=>{
                if(r.code===200){
                    this.mianyu.ZJE=r.ZJE
                    this.mianyu.ZJS=r.ZJS
                    this.mianyu.ZPC=r.ZPC
                    this.dataTable=r.body
                }
            })
            /**
             *巡展记录数
            */
             publicInter(interfaceUrl.queryPatrolRecordStatic,{}).then(r=>{
                if(r.PRCOUNT){
                    this.record=r.PRCOUNT
                    r.PRList.forEach(item=>{
                        this.rangerList.push(item.PMCOUNT)
                    })
                    
                }

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.lineFun{
  &:before,&:after{
    content: '';
    width: 1px;
    height: 80%;
    position: absolute;
    background: rgba(29,234,255,.5);
    top: 10%;
  }
  &:before{
    left: -5%;
  }
  &:after{
    right: -5%;
  }
}
.JY{
    width: 100%;
    height: 100%;
    padding: 1rem;
     >ol{
        list-style: none;
        display: flex;
        width: 15rem;
        margin: 0 auto;
        padding: 0;
        border: 1px solid rgba(29,234,255,.5);
        position: relative;
        @extend .lineFun;
        li{
          width: 50%;
          text-align: center;
          color: #fff;
          padding: .3rem 0;
          cursor: pointer;
          font-size: 1rem;
          &.active{
            background:linear-gradient(170deg, #116B89 0%,rgba(17,107,137,.3) 70%);
          }
          &:first-child{
            border-right: 1px solid rgba(29,234,255,.5);
          }
        }
      }
      .swipper-view{
        height: calc(100% - 1.5rem);
        padding-top: .5rem;
        width: 100%;
        overflow: hidden;
        .swipper{
          width: 200%;
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          transition: all 1s ease-in;
          -moz-transition: all 1s ease-in;
          -webkit-transition: all 1s ease-in;
          -ms-transition:all 1s ease-in;
          -o-transition: all 1s ease-in;
          justify-content: flex-start;
          &.active{
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
              -o-transform: translateX(-50%);
          }
          .swipper-item{
            display:flex;
            justify-content: space-between;
            width: 50%;
            height: 100%;
            .item-left{
              width: 35%;
              min-width: 12rem;
              height: 100%;
              padding: 0.5rem;
              border: 1px solid #F4A213;
              background: rgba(244,162,19,0.10);
              &.blue{
                  border-color: #0037B2;
                  
              }
              >ol{
                margin: 0;
                padding: 0;
                height: 100%;
                list-style: none;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                li{
                  color: #FFA71A;
                  font-size: .9rem;
                  line-height: 1.15;
                  span{
                    color: #fff;
                    display: inline-block;
                    margin-top: .4rem;
                  }
                }
              }
            }
            .item-right{
              width: 55%;
              height: 100%;
              &.blue{
                  >ul{
                      >li{
                          >div{
                              border-color: #0037B2;
                              color: #1deaff;
                          }
                      }
                  }

              }
              >ul{
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                list-style: none;
                >li{
                  height: 30%;
                  transform-style: preserve-3d;
                  -webkit-transition:  transform 1s ease-in-out ;
                  -moz-transition:  transform 1s ease-in-out ;
                  -ms-transition:  transform 1s ease-in-out;
                  -o-transition:  transform 1s ease-in-out ;
                  transition:  transform 1s ease-in-out;
                  position: relative;
                  max-height: 3.5rem;
                  &:first-child{
                      z-index: 11;
                      >div{
                        cursor: pointer;
                        &:hover{
                            >a{
                                display: block;
                                opacity: 1;
                            }
                        } 
                    }
                  }
                  &.active{
                    -webkit-transform: rotateX(180deg);
                    -moz-transform: rotateX(180deg);
                    -ms-transform: rotateX(180deg);
                    -o-transform: rotateX(180deg);
                    transform: rotateX(180deg);
                  }
                  &:nth-child(2){
                      transition-delay: .5s;
                      -moz-transition-delay: .5s;
                      -o-transition-delay: .5s;
                      -webkit-transition-delay: .5s;
                      -ms-transition-delay:.5s;
                      cursor: pointer;
                  }
                  &:last-child{
                      transition-delay: 1s;
                      -moz-transition-delay: 1s;
                      -o-transition-delay: 1s;
                      -webkit-transition-delay: 1s;
                      -ms-transition-delay:1s;
                  }
                  >div{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border: 1px solid #F4A213;
                    backface-visibility: hidden;
                    -moz-backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    -ms-backface-visibility: hidden;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: .5rem;
                    color: #F4A213;
                    font-size: .9rem;
                    >a{
                        &.aa{
                            width: 80%;
                        }
                        position: absolute;
                        left: 0;
                        top: 54px;
                        width: 50%;
                        display: none;
                        font-size: .9rem;
                        color:  #F48000;
                        background: #090D39;
                        border-radius: 4px;
                        padding: 10px;
                        opacity: 0;
                        border: 1px solid  #F4A213;
                        transition: all 0.3s ease-in;                               
                        box-shadow: 0 2px 4px 0 rgba(0,96,183,0.10);
                        b{
                            color: #f48000;
                        }
                    }
                    img{
                      width: 1rem;
                      height: 1rem;
                      margin-top: -3px;
                      vertical-align: middle;
                      margin-right: 5px;
                    }
                    b{
                      color: #fff;
                      font-size: .8rem;
                    }
                    &.last{
                      transform: rotateX(-180deg);
                    }
                  }
                }
              }
              
            }
          }
        }
        
      }
}
.itemOne{
    >li{
        height: 18%;
        &:last-child{
            height:24%;
            min-height: 2.5rem;
            &:hover{
                span{
                    cursor: pointer;
                    text-decoration: underline;

                }
                
            }

        }

    }

}

.itemOne,.itemTwo{
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0 0 0 .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    li{
        font-size: .78rem;
        color: #1deaff;
        span{
            color: #fff;
        }
    }
    
}

</style>

