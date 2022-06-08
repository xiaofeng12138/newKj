<template>
  <div class ='tt'>
      
      <div class="modal" v-show="modalShow" ref="modal">
          <div class="header">
              <Icon type="md-pin"></Icon>
              <span>{{showNumber}}</span>
          </div>
          <Table :columns="columns" :data="zwData" class="customTable" style="width: 100%" max-height="400">

          </Table>
      </div>
      <div class="gwTooltip" ref="gwTooltip" v-show="gwTooltipShow">{{gwMsg}}</div>
      <Modal v-model="detailZWModalShow" :footer-hide="hide" width="1200" class="detailZWModal">
          <div slot="header" class="header">
              <img src="../../../../../assets/zwTitle.png" />
              <span>{{detailZW}}</span>
          </div>
          <Table :columns="detailColumns" :data="detailZWData" class="customTable" style="width: 100%">

          </Table>
      </Modal>
      <Modal v-model="xgModalShow" width="1400" class="detailZWModal" :mask-closable="false" footer-hide>
            <div slot="header" class="header">
                <img src="../../../../../assets/zwTitle.png" />
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
                <!-- <thead class="normal">
                  <tr>
                    <th colspan="4">
                      <span>普通展位核查情况记录</span>
                    </th>
                  </tr>
                </!-->
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
export default {
    props: {
        showNumber:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            problemsValue: ['正常', '异常'],
            childIndexValue: 0,
            xgModalShow: false,
            modalShow: true,
            detailZWModalShow: false,
            detailZW: '',
            hide: true,
            gwMsg: '',
            gwTooltipShow: false,
            xgList: [
                {
                    RECODE_TIME: '',
                    list:[
                        
                    ]
                }
            ],
            imgRightList: [
                '1.1C1', '1.1C2', '1.1C4', '1.1B9', '1.1A2', '1.1A3', '1.1A7', '1.1A8'
            ],
            zwData: [],
            detailZWData: [],
            detailColumns: [
                {
                    title: '展商名称',
                    key: 'EXHIBITOR'
                },
                {
                    title: '国家/地区',
                    key: 'COUNTRYCNNAME'
                },
            ],
            columns: [
                {
                    title: '展位号',
                    key: 'PLACEPOSITION',
                    align: 'center',
                    render: (h, params) => {
                        return h('span', {
                            style: {
                                 color: (params.row.COLDSTATUS == 1)? "red":(params.row.GFXSTATUS == 1)?"#FFFF29":(params.row.GWSTATUS == 1)?"#FF7521":(params.row.ENTRYSTATUS == 1)?"#6BFF29":"#A5B6DE"
                            },
                            on: {
                                'click': () =>{ }
                            },
                        }, params.row.PLACEPOSITION)
                    },
                },
                {
                    title: '巡馆记录',
                    key: 'STATUS',
                    align: 'center',
                    render: (h, params) => {
                        let imgSrc = params.row.STATUS ? "ranger1.png" : "";
                        return h('img', {
                            attrs: {
                                src: imgSrc
                            },
                            style: {
                                cursor: 'pointer'
                            },
                            on: {
                            click: () => {
                                publicInter(interfaceUrl.qrySignsByBooth, {booth: params.row.PLACEPOSITION}).then(r => {
                                    this.xgList = r.list;
                                    this.xgModalShow = true;
                                })
                            }
                            }
                        })
                    },
                },
                {
                    title: '操作',
                    key: '_text',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span',{
                                props: {row: params.row},
                                style: { 
                                    color: params.row._text == '展开' ? '#fff' : '#ffc83e',
                                    cursor: 'pointer'
                                },
                                on: {
                                    'click': () => {
                                        this.expand(params.row, params.index)
                                    }
                                }
                            }, params.row._text),
                            h('img', {
                                attrs: {
                                    src: params.row._img
                                },
                                style: {
                                    'margin-left': '10px',
                                }
                            })
                        ])
                    }
                },
                {
                    type: 'expand',
                    width: 1,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row._detail,
                            },
                            on: {
                                showImgs: value => {
                                    publicInter(interfaceUrl.queryImagePathByExhibitor, {exhibitor: value}).then( r => {
                                        if(r.list.length > 0) {
                                            this.imgs = r.list;
                                            this.imgIndex = 0;
                                            // this.$refs.goodImg.style.backgroundImage = 'url(http://172.16.2.51/exhibitorImage'+ this.imgs[this.imgIndex] + ')';
                                            this.imgShow = true;
                                        }
                                        
                                    })
                                }
                            }
                        })
                    }
                },
            ]
        }
    },
    created() {  
    },
    mounted(){},
   
    methods: {
        closewin() {
            this.imgShow = false;
        },

        expand(item, index) {
            if(item._expanded) {
                this.zwData.sort();
                this.zwData[index]._expanded = false;
                this.zwData[index]._text = "展开";
                this.zwData[index]._img = 'arrow-zk.png';
            } else {
                publicInter(interfaceUrl.qryExhibitorsByBooth, {booth: item.PLACEPOSITION}).then(r => {
                    console.log(r)
                    this.zwData[index]._detail = r.list
                })
                this.zwData.splice();
                this.zwData[index]._expanded = true;
                this.zwData[index]._text = "收回";
                this.zwData[index]._img = 'arrow-sh.png';
            }
        },
        pisitionClick(t) {
            let e =t;
            publicInter(interfaceUrl.queryBoothListByArea, {bootharea: e}).then(r => {
                console.log(r)
                // this.zwData = r.list;
                this.zwData = r.list.map(item => {
                    item._expanded = false;
                    item._text = '展开';
                    item._img = 'arrow-zk.png';
                    item._detail = [];
                    return item
                })
            })
            this.modalShow = true;
        },
        insertAfter(newEle, targetEle) {
            let parent = targetEle.parentNode;
            if(parent.lastChild == targetEle) {
                parent.appendChild(newEle);
            } else {
                parent.insertBefore(newEle, targetEle.nextSibling);
            }
        },
        userClick(index) {
            this.childIndexValue = index;
        }
    },
    // watch:{
    //     showNumber:{
    //         hander(newValve){
    //             console.log(newValve)
    //         //    if(newValve){
    //         //        this.pisitionClick(newValve)
    //         //    }
    //         },
    //          immediate:true
    //     }
    // },
}
</script>

<style lang="scss" scoped>
.gwTooltip {
    position: fixed;
    z-index: 111;
    color: #fff;
    font-size: 1rem;
    background: #ff0000
}
.modal {
    position: fixed;
    left: 23%;
    // top: 50%;
    z-index: 100;
    width: 48rem;
    .header {
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1.125rem;
        text-align: center;
        color: #fff;
        background: #1f5ff2;
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
  thead:nth-last-of-type(){
    

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
.rect {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  background: transparent;
  z-index: 999;
  &.left {
    left: -1px;
    border-left: 2px solid rgba(31, 95, 242, 1);
  }
  &.top {
    top: -1px;
    border-top: 2px solid rgba(31, 95, 242, 1);
  }
  &.right {
    right: -1px;
    border-right: 2px solid rgba(31, 95, 242, 1);
  }
  &.bottom {
    bottom: -1px;
    border-bottom: 2px solid rgba(31, 95, 242, 1);
  }
}
.goodsDetail {
    position: absolute;
    top: calc(50% - 20rem);
    left: calc(50% - 37rem);
    width: 74rem;
    height: 42rem;
    background: url('../../../../../assets/bg.png') no-repeat;
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
        background: url('../../../../../assets/toLeft.png'); 
        left: 3rem;
    }
    .to-left:hover{
        background: url('../../../../../assets/toRight.png'); 
        transform: rotateY(180deg)
    }
    .to-right{
        position:absolute;
        background: url('../../../../../assets/toLeft.png');
        transform: rotateY(180deg);
        right: 3rem;
    }
    .to-right:hover{  
        background: url('../../../../../assets/toRight.png');
        transform: rotateY(0deg)
    }
    .closewin{
        position: absolute;
        top: 0.9rem;
        right: 2.5rem;
        font-size: 1.7rem;
        color: #fff;
        display: inline-block;
        cursor: pointer;
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
        background-size: cover;   
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
</style>
