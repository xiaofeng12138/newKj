<template>
    <div class="pageBreakBefore myIndex myIndex2" v-bind:class="{printCss:isPrintCss}">
        <p class="attachmentP" v-if="detailLength">附2</p>
        <p v-if="detailLength" style="position: absolute;right: 0;top: 0;font-size: 16pt;">证明函编号:{{ basis2.listheadno }}</p>
        <img v-if="isPrintCss" :src="printUrl"  style="width: 50mm;display: inline-block;position: absolute;top: 10mm;left: 0mm;"/>
        <h2 v-if="detailLength" style="margin-bottom: 10px">List of Overseas Exhibits {{titleDate}}中国国际进口博览会进境物资清单</h2>
        <div class="tablePane" style="margin-bottom: 20px">
            <Row v-if="!isPrintCss" style="text-align: left;margin-bottom: 10px" >
                <Col span='19' :class="{inputHasBorder:true,needStar:!disableStatus}">
                 展品类别：
                     <Select v-model="basis2.exhtype" style="width:200px" placeholder="请选择展品类别(必选)" >
                       <Option v-for="item in exhtypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                     </Select>
                </Col>

                <Col span='5' style='display:flex' >
                   <a href="/excel/uploadFileTemplate.xls"><Button type="primary" size ='large' style='margin-right:20px'>模板下载</Button></a>
                   <Button type="primary" @click='openModal' :disabled="disableStatus" >物资清单导入</Button>
                </Col>
                <!-- <span style="display: inline-block;padding-left: 30px;">展商ID：</span>
                <div style="display: inline-block;width: 200px">{{ basis2.exhibitorid }}</div> -->
                <!-- <Input v-else v-model="basis2.exhibitorid" :disabled="disableStatus || iHaveId" style="width: 200px;border: 1px;"></Input> -->
                
            </Row>
            <Row class="row row1">
                <Col span="12">
                    Company公司:
                    <div v-if="disableStatus" style="display: inline-block">{{ basis2.company }}</div>
                    <Input v-else v-model="basis2.company"  style="width: calc(100% - 100px)" placeholder="请填写公司"></Input>
                </Col>
                <Col span="12">
                    Tel电话:
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 70px)">{{ basis2.tel }}</div>
                    <Input v-else v-model="basis2.tel"   style="width: calc(50% - 70px)" placeholder="请填写电话"></Input>
                    Fax传真:
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 70px)">{{ basis2.fax }}</div>
                    <Input v-else  v-model="basis2.fax"  style="width: calc(50% - 70px)" placeholder="请填写传真"></Input>
                </Col>
            </Row>
            <Row class="row">
                <Col span="12">
                    Booth No.展台号:
                    <div style="display: inline-block;width:calc(50% - 120px)"  v-if="disableStatus">{{ basis2.boothno2 }}</div>
                    <Input v-else v-model="basis2.boothno2"   style="width: calc(50% - 120px)" placeholder="例:6.1C1-06"></Input>
                    Contact 负责人:
                    <div style="display: inline-block;width:calc(50% - 120px)"  v-if="disableStatus">{{ basis2.contact }}</div>
                    <Input v-else v-model="basis2.contact"  style="width: calc(50% - 120px)" placeholder="请填写负责人"></Input>
                </Col>
                <Col span="12">
                    Email电邮:
                    <div style="display: inline-block;width:calc(50% - 120px)"  v-if="disableStatus">{{ basis2.email }}</div>
                    <Input v-else v-model="basis2.email"   style="width: calc(50% - 120px)" placeholder="请填写电邮"></Input>
                    
                    <!-- <span :class="{needStar:!disableStatus}">展商编号:</span>
                    
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 120px)">{{ basis2.exhibitorid }}</div>
                    <Input v-else  v-model="basis2.exhibitorid"  style="width: calc(50% - 120px)" placeholder="请填写展商编号"></Input> -->
                    <span :class="{needStar:!disableStatus}">展商编号:</span>
                    
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 120px)">{{ basis2.companyid }}</div>
                    <Input v-else  v-model="basis2.companyid"  style="width: calc(50% - 80px)" placeholder="请填写单一窗口展商备案编号"></Input>
                </Col>
            </Row>
        </div>
        <div class="tablePane">
            <Row type="flex" class="row row1 row2">
                <Col span="12">
                    <div>
                        EXHIBITION:{{ basis.exhibitionname }}
                    </div>
                    <div>
                        展览会：{{ basis.exhibitionnamecn }}
                    </div>
                </Col>
                <Col span="10" v-if="detailLength">
                    <div>
                        VENUE: {{ basis.exhibitionvenue }}
                    </div>
                    <div>
                        地点：{{ basis.exhibitionvenuecn }}
                    </div>
                </Col>
                <Col span="12" v-else>
                    <div>
                        VENUE: {{ basis.exhibitionvenue }}
                    </div>
                    <div>
                        地点：{{ basis.exhibitionvenuecn }}
                    </div>
                </Col>
                <Col span="2" v-if="detailLength">
                    PAGE NO
                    <div>
                        页数:{{ detailLength }}
                    </div>
                </Col>
            </Row>
            <Row type="flex" class="row row2" style="margin-bottom: 20px;">
                <Col span="2" :class="{needStar:!disableStatus}">
                    Exhibitor
                    <div>
                        参展商
                    </div>
                </Col>
                <Col span="4" v-if="disableStatus">
                    <div style="height: 100%;" >{{ basis2.exhibitor }}</div>
                </Col>
                <Col span="2" v-else>
                    <Input style="height: 100%;" v-model="basis2.exhibitor"></Input>
                </Col>
                <!-- <Col span="2" style="overflow: visible" v-else>
                    <Input v-model="basis2.exhibitor" :disabled="disableStatus" style="width: 100%;height: 100%;"></Input>
                    <cvague :firstVal = 'basis2' :urlkey = "urlkey" :vkey="vagueKey" :rkey='rkey' :url='vagueUrl' 
                     @changeexhibitor='changeexhibitor' style="width:100%;display:inline-block"></cvague>
                </Col> -->
                <Col span="3" :class="{needStar:!disableStatus}">
                    Country/Region
                    <div>
                        国别/地区
                    </div>
                </Col>
                <Col span="2" style="overflow: visible">
                    <div>
                        <vague v-if='!disableStatus'  @regionVal="regionChange" :basis='basis' :firstVal="basis2" :vagplaceholder="vagplaceholdert"></vague>                
                        <div v-else-if="isPrintCss">{{ basis2.cnname }}</div>
                        <div v-else>{{ basis2.exhibitorcountry }}</div>
                    </div>
                </Col>
                <Col span="2" :class="{needStar:!disableStatus}">
                    Hall No.
                    <div>
                        馆号
                    </div>
                </Col>
                <Col span="2" v-if="disableStatus">
                    <div>
                        <div>{{ basis2.hallno }}</div>
                    </div>
                </Col>
                <Col v-else span="4" style="overflow: visible" >
                    <div>
                        <Select v-model="basis2.hallnoArr" style="width:100%;height: 32px">
                            <Option v-for="item in positionList" :value="item.ID" :key="item.NAME">{{item.NAME }}</Option>
                        </Select>
                    </div>
                </Col>
                <Col span="2" :class="{needStar:!disableStatus}">
                    Booth No.
                    <div>
                        展台号
                    </div>
                </Col>
                <Col span="3">
                    <div style="height: 100%;" v-if="disableStatus">{{ basis2.boothno }}</div>
                    <Input v-else  v-model="basis2.boothno"  style="width: 100%;height: 100%;" placeholder="例:6.1C1-06"></Input>
                </Col>
                <Col span="2" :class="{needStar:!disableStatus}">
                    Total Pkgs.
                    <div>
                        总件数
                    </div>
                </Col>
                <Col span="2">
                    <div style="height: 100%;" v-if="disableStatus">{{ basis2.totalpackages }}</div>
                    <Input v-else  v-model="basis2.totalpackages"  style="width: 100%;height: 100%;" placeholder="请填写总件数" />
                </Col>
            </Row>

            <Table class="zmh-table" :columns="detailColumns" :data="basisBody" border width="100%"  id="box"></Table>
            <!-- 打印时候的位置 -->
            <Row class="allClass" v-if="isPrintCss" style="font-size:12px;">
                <span style="left:263px;width:84px;">{{ allSum.growssweight }}</span>
                <span style="left:347px;width:84px;border-left:none;">{{ allSum.netweight }}</span>
                <span style="left:995px;width:88px;">{{ allSum.totalprice }}</span>
            </Row>
            <Row class="allClassEdit" v-else style="font-size:14px;">
                <span>{{"Grand G.W. 总毛重："+ allSum.growssweight }}</span>
                <span>{{"Grand N.W. 总净重："+ allSum.netweight }}</span>
                <span>{{"Grand Value 总值："+ allSum.totalprice }}</span>
            </Row>
            <!-- 查看时候的位置 -->
            <Row  class="allClass2" v-if="isPrintCss">
                <span style="left:263px;width:72px;">Grand G.W.<br/>总毛重</span>
                <span style="left:347px;width:72px;">Grand N.W.<br/>总净重</span>
                <span style="left:995px;width:88px;">Grand Value<br/>总值</span>
            </Row>
        </div>
        <p v-if="detailLength">Remarks 备注:</p>
        <p v-if="detailLength">Detail description of exhibitis,i.e,model no.and serial no.of machine,equipment,accessories,materials of exhitits
        must be specified.展品（机器、设备、配件、原材料等）的详细规格资料，即型号、序号必须详细填报。</p>

        <!-- excel上传的组件 -->
        <upload ref='upload' @func = 'getMessage' />
    </div>
</template>

<script>
import {publicInter} from '@/api/http'
import vague from "@/views/exhibits/unit/vague"
import vague1 from "@/views/exhibits/unit/vague1"
import {mapState,mapActions} from 'vuex'
import interfaceUrl from '@/api/interfaceUrl'
import { getCookie } from "@/until/getToken";
import upload from './components/upload'

    export default {
        name: "detailTable",
        //myLook:是否是查看状态
        props:['disableStatus','basis','basis2',"positionList",'index','detailLength','basisBody','printCSS','iHaveId','myLook'],
        components:{vague, vague1,upload},
        data(){
            return {
                quantityunitList: [],
                detailColumns:[],
                isPrintCss:false,
                titleDate: '2018年首届',
                exhtypeList:[
                    {value:'1',label:'服务贸易'},
                    {value:'2',label:'汽车'},
                    {value:'3',label:'智能及高端装备'},
                    {value:'4',label:'消费电子及家电'},
                    {value:'5',label:'服装服饰及日用消费品'},
                    {value:'6',label:'医疗器械及医药保健'},
                    {value:'7',label:'食品及农产品'},
                    {value:"8",label:"国家馆"}
                ],
                printUrl:"",
                vagplaceholdert:"请填写国别",
                unitPlaceholdert: "请填写单位"
            }
        },
        created(){
            let timeArr = ['一','二','三','四','五','六','七','八','九','十']
            let nowYear = getCookie('date')*1;
            let period = nowYear - 2018
            this.titleDate = `${nowYear}年第${timeArr[period]}届`;

            this.printUrl = require('../../assets/zbhPrint.jpg');
            this.isPrintCss  = this.printCSS?true:false
            this.init();

            publicInter(interfaceUrl.queryCountryCode,{unitName:''}).then(r=>{
                if(r && r.unitList.length > 0){
                    this.quantityunitList = r.unitList
                }
            })
        },
        methods:{
            //获取子组件传过来的数值
            getMessage(data){
            if( this.basisBody.length > 0){
                this.basisBody= []
            }
            let newObj = {}
              data.forEach((item)=>{
                  this.basisBody.push(item)
              })
              this.$store.commit('exhibition/changeBodyValue',this.basisBody)
            },
            //打开文件上传组件
            openModal(){
                this.$refs.upload.openModal()
            },
            ...mapActions('exhibition',[
                'changeBodyUnit'
            ]),
            init(){
              const that=this;
              if(this.detailLength){
                  this.detailColumns = [
                      {
                          title: 'Case No.\n箱号',
                          key:'caseno',
                          align:'center',
                          width:50
                      },
                      {
                          title: 'Dimension\n体积',
                          key:'dimension',
                        width:55
                      },
                      {
                          title: 'L(长)\ncm',
                          key:'length',
                        width:40
                      },
                      {
                          title: 'W(宽)\ncm',
                          key:'width',
                        width:35
                      },
                      {
                        title: 'H(高)\ncm',
                        key:'height',
                        width:35
                      },
                      {
                          title: 'Gross Wt.\n毛重(Kg)',
                          key:'growssweight',
                          width:68
                      },
                      {
                          title: 'Net Wt.\n净重(Kg)',
                          key:'netweight',
                          width:68,
                          renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Net Wt.\n净重(Kg)')
                            },
                        },
                      {
                          title: 'Description of Exhibits\n展品名称规格',
                          align: 'center',
                          children: [
                              {
                                title: 'English\n英文',
                                key: 'goodsdescription',
                                align: 'center',
                                width:175
                              }, {
                                  title: 'Chinese\n中文',
                                  key: 'goodsdescriptioncn',
                                  align: 'center',
                                  width:77
                              }]
                      },
                      {
                        title: 'Country of \nOrigin\n原产地',
                        key:'countryoforigin',
                        width:58
                      },
                      {
                          title: 'Quantity\n数量',
                          key:'quantity',
                          width:50
                      },
                      {
                          title: 'unit\n单位',
                          key:'quantityunit',
                          width:100,
                          render(h,params){
                              return h("span", params.row.quantityunit == '011' ? "件" : "")
                          },
                      },
                      {
                          title: 'unit Price\n单价(US$)',
                          key:'unitprice',
                        //   render(h,params){
                        //       let number = (parseFloat(params.row.totalprice)/parseFloat(params.row.quantity)).toFixed(4);
                        //       return h("span", number == 'NaN'?"":number)
                        //   },
                        //   width:60
                          width:60
                      },
                      {
                          title: 'Total Price\n总价(US$)',
                          key:'totalprice',
                          width:72,
                          render(h,params){

                              let number = (parseFloat(params.row.unitprice) * parseFloat(params.row.quantity)).toFixed(2);
                              return h("span", number == 'NaN'?"":number)
                          },
                      },
                      {
                          title: 'H.S.No.\n商品代号',
                          key:'hscode',
                         width:100
                      },
                      {
                          title: 'Disposals展品处理方法\na.Sold已售\nb.Return运回\nc.Abandoned & Consumed放弃和消耗\nd.Others其他',
                          key:'disposals',
                          width:105
                      }
                  ]
              }
              else if(this.disableStatus){
                  //表示需要填写的内容
                  this.detailColumns = [
                      {
                          title: 'Case No.\n箱号',
                          key:'caseno',
                          width:70,
                          align:'center',
                          renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Case No.\n箱号')
                          },
                      },
                      {
                          title: 'Dimension\n体积',
                          key:'dimension',
                          width:90
                        // width:55
                      },
                      {
                          title: 'L(长)\ncm',
                          key:'length',
                          width:50,
                        // width:40
                      },
                      {
                          title: 'W(宽)\ncm',
                          key:'width',
                          width:50,
                        // width:35
                      },
                      {
                          title: 'H(高)\ncm',
                          key:'height',
                          width:50
                        // width:35
                      },
                      {
                          title: 'Gross Wt.\n毛重(Kg)',
                          key:'growssweight',
                          width:80
                      },
                      {
                          title: 'Net Wt.\n净重(Kg)',
                          key:'netweight',
                          width:80,
                          renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Net Wt.\n净重(Kg)')
                            },
                        },
                      {
                          title: 'Description of Exhibits\n展品名称规格',
                          align: 'center',
                          children: [
                              {
                                  title: 'English\n英文',
                                  key: 'goodsdescription',
                                  align: 'center',
                                width:175
                              }, {
                                  title: 'Chinese\n中文',
                                  key: 'goodsdescriptioncn',
                                  align: 'center',
                                  width:100
                              }]
                      },
                      {
                          title: 'Country of Origin\n原产地',
                          key:'countryoforigin',
                          width:90
                        // width:58
                      },
                      {
                          title: 'Quantity\n数量',
                          key:'quantity',
                          width:70,
                        //   width:50
                      },
                      {
                          title: 'unit\n单位',
                          key:'quantityunit',
                          width:100,
                          render(h,params){
                              return h("span", params.row.quantityunit == '011' ? "件" : "")
                          },
                      },
                      {
                          title: 'unit Price\n单价(US$)',
                          key:'unitprice',
                          width:80
                      },
                      {
                          title: 'Total Price \n总价(US$)',
                          key:'totalprice',
                          width:100,
                          render(h,params){
                              let number = (parseFloat(params.row.unitprice) * parseFloat(params.row.quantity)).toFixed(2);
                              return h("span", number == 'NaN'?"":number)
                          },
                      },
                      {
                          title: 'H.S.No.\n商品代号',
                          key:'hscode',
                          width:86
                      },
                      {
                          title: 'Disposals展品处理方法\na.Sold已售\nb.Return运回\nc.Abandoned & Consumed放弃和消耗\nd.Others其他',
                          key:'disposals',
                          width:180
                      },
                      {
                          title:"是否试用",
                          key:'tryout',
                          width:100,
                          render:(h,params)=>{
                              console.log(params.row)
                              
                              let val = parseInt(params.row.tryout)===  0 ?"否":params.row.tryout;
                              return h('span',val)
                          }
                      },
                      {
                          title:"是否品尝",
                          key:'taste',
                          width:100,
                          render:(h,params)=>{
                              console.log(params.row)
                              let val = parseInt(params.row.taste)=== 0 ?"否":params.row.taste;
                              return h('span',val)
                          }
                      },
                      {
                          title:"是否散发",
                          key:'distribute',
                          width:100,
                          render:(h,params)=>{
                              console.log(params.row)
                              let val = parseInt(params.row.distribute)=== 0?"否":params.row.distribute;
                              return h('span',val)
                          }
                      }
                  ]
              }
              else{
                  this.detailColumns = [
                      {
                          title: 'Case No.\n箱号',
                          key:'caseno',
                          width:70,
                          align:'center',
                          renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Case No.\n箱号')
                                  },
                          render(h,params){
                              return that.renderTable(h,params,"caseno")
                          }
                      },
                      {
                          title: 'Dimension\n体积',
                          key:'dimension',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"dimension")
                          }
                      },
                      {
                          title: 'L(长)\ncm',
                          key:'length',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"length")
                          }
                      },
                      {
                          title: 'W(宽)\ncm',
                          key:'width',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"width")
                          }
                      },
                      {
                          title: 'H(高)\ncm',
                          key:'height',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"height")
                          }
                      },
                      {
                          title: 'Gross Wt.\n毛重(Kg)',
                          key:'growssweight',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"growssweight")
                          }
                      },
                      {
                          title: 'Net Wt.\n净重(Kg)',
                          key:'netweight',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"netweight")
                          },
                          renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Net Wt.\n净重(Kg)')
                            },
                          },
                      {
                          title: 'Description of Exhibits\n展品名称规格',
                          align: 'center',
                          children: [
                              {
                                  title: 'English\n英文',
                                  key: 'goodsdescription',
                                  align: 'center',
                                  width:100,
                                  render(h,params){
                                      return that.renderTable(h,params,"goodsdescription")
                                  },
                                  renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'English\n英文')
                                  },
                              }, {
                                  title: 'Chinese\n中文',
                                  key: 'goodsdescriptioncn',
                                  align: 'center',
                                  width:100,
                                  render(h,params){
                                      return that.renderTable(h,params,"goodsdescriptioncn")
                                  },
                                  renderHeader(h,params){
                                    return h('span',{
                                        class: {
                                            needStar: true
                                        }
                                    },'Chinese\n中文')
                                  },
                              }]
                      },
                      {
                          title: 'Country of Origin\n原产地',
                          key:'countryoforigin',
                          width:200,
                          renderHeader(h,params){
                            return h('span',{
                                class: {
                                    needStar: true
                                }
                            },'Country of Origin\n原产地')
                          },
                          render(h,params){
                            return h(vague1, {
                                on: {
                                    regionVal: that.regionChange,
                                    // "on-blur":(event)=>{
                                    //     this.changeBodyUnit({key: 'countryoforigin',value:event.target.value,index:params.index})
                                    // }
                                },
                                props: {
                                    index: params.index,
                                    firstVal: params.row,
                                    vagplaceholder: that.vagplaceholdert
                                },
                                style:{
                                    // width:'100px',
                                    //height:'100px',
                                    'margin-top':'2px',
                                    // 'display':params.row[key1]=='1'?"inline-block":"none"
                                },
                            })
                        }
                      },
                      {
                          title: 'Quantity\n数量',
                          key:'quantity',
                          width:70,
                          render(h,params){
                              return that.renderTable(h,params,"quantity")
                          },
                          renderHeader(h,params){
                            return h('span',{
                                class: {
                                    needStar: true
                                }
                            },'Quantity\n数量')
                          },
                      },
                    {
                          title: 'unit\n单位',
                          key:'quantityunit',
                          width:100,
                          renderHeader(h,params){
                            return h('span',{
                                class: {
                                    needStar: true
                                }
                            },'unit\n单位')
                          },
                          render: (h,params) => {
                            //   return h('span','件',this.changeBodyUnit({key: 'quantityunit',value:'件',index:params.index}))
                            // this.changeBodyUnit({key: 'quantityunit',value:'件',index:params.index})
                            return h('Select', {
                                on: {
                                    'on-change': (val) =>{
                                        this.changeBodyUnit({key: 'quantityunit',value:val,index:params.index})
                                    }
                                },
                                props: {
                                    value: params.row.quantityunit,
                                    filterable: true,
                                    // remote: true
                                },
                                // style:{
                                //     'margin-top':'2px',
                                //     width:'100%',
                                //     height:'32px',
                                // },
                            },
                            this.quantityunitList.map( val => {
                                return h('Option', {
                                    props: {value: val.CODE, label: val.NAME}
                                })
                            })
                            )
                        }
                      },
                      {
                          title: 'unit Price\n单价(US$)',
                          key:'unitprice',
                          width:90,
                          render(h,params){
                                let number = (parseFloat(params.row.totalprice)/parseFloat(params.row.quantity)).toFixed(4);
                                return h("span",{style:{
                                    background:'#ebebeb',
                                    display:'inline-block',
                                    'text-align':'left',
                                    width:'100%',
                                    height:'32px',
                                    padding:'3px 0 0 8px'
                                }}, number == 'NaN'?"":number)
                            },
                            renderHeader(h,params){
                                return h('span',{
                                    class: {
                                        needStar: true
                                    }
                                },'unit Price\n单价(US$)')
                            },
                      },
                      {
                          title: 'Total Price \n总价(US$)',
                          key:'totalprice',
                          width:100,
                          render(h,params){
                              return that.renderTable(h,params,"totalprice")
                          },
                          renderHeader(h,params){
                            return h('span',{
                                class: {
                                    needStar: true
                                }
                            },'Total Price \n总价(US$)')
                          },
                      },
                      {
                          title: 'H.S.No.\n商品代号',
                          key:'hscode',
                          width:100,
                          render(h,params){
                              return that.renderTable(h,params,"hscode")
                          },
                          renderHeader(h,params){
                            return h('span',{
                                class: {
                                    needStar: true
                                }
                            },'H.S.No.\n商品代号')
                          },
                      },
                      {
                          title: 'Disposals 展品处理方法1：\na.Sold已售\nb.Return运回\nc.Abandoned & Consumed放弃和消耗\nd.Others其他',
                          key:'disposals',
                          width:120,
                          render(h,params){
                              return h('Select',{
                                  on:{
                                      'on-change':(value)=>{
                                          that.changeBodyUnit({key:'disposals',value:value,index:params.index})
                                      }
                                  },
                                  attrs:{
                                      value:params.row['disposals']
                                  }
                              },[
                                  h('Option',{
                                      attrs:{
                                          value:'a',
                                          label:'已售'
                                      }
                                  }),
                                  h('Option',{
                                      attrs:{
                                          value:'b',
                                          label:'运回'
                                      }
                                  }),
                                  h('Option',{
                                      attrs:{
                                          value:'c',
                                          label:'放弃和消耗'
                                      }
                                  }),
                                  h('Option',{
                                      attrs:{
                                          value:'d',
                                          label:'其他'
                                      }
                                  })
                              ])
                          }
                      },
                      {
                          title:"是否试用",
                          key:'tryout',
                          width:150,
                          render:(h,params)=>{
                              return that.newRenderTable(h,params,'tryoutFlag',"tryout")
                          }
                      },
                      {
                          title:"是否品尝",
                          key:'taste',
                          width:150,
                          render:(h,params)=>{
                              return that.newRenderTable(h,params,'tasteFlag','taste')
                          }
                      },
                      {
                          title:"是否散发",
                          key:'distribute',
                          width:150,
                          render:(h,params)=>{
                              return that.newRenderTable(h,params,'distributeFlag','distribute')
                          }
                      }
                  ]
              }
            },
            regionChange(val){
                this.basis2.exhibitorcountry = val;
            },
            renderTable(h,params,key){
                if(0){
                    return h('span',{
                        style:{
                            width:'100%',
                            display:'inline-block',
                            'text-align': 'center'
                        }
                    },params.row[key])
                }
                else{
                    if(key == 'totalprice'){
                        return h("Input",{
                        props:{
                            value:params.row[key],
                        },
                        style:{
                            width:'100%',
                            height:'32px',
                        },
                        
                        attrs:{
                        },
                        on:{
                            "on-blur":(event)=>{
                                if(!/^[1-9]+\d*(\.\d{0,2})?$|^0?\.\d{0,2}$/.test(event.target.value)){
                                    event.target.value = ''
                                    this.$Message.error("只能输入正数且小数点后只保留两位");
                                }
                                this.changeBodyUnit({key,value:event.target.value,index:params.index})
                                let basisBodyV = this.$store.state.exhibition.basisBody[params.index]
                                    let k = 'unitprice'
                                    this.changeBodyUnit({key: k,value:(basisBodyV.totalprice / basisBodyV.quantity).toFixed(4), index:params.index})
                                    this.$emit("changeData");
                            }
                        }
                     })
                    } else {
                        return h("Input",{
                        props:{
                            value:params.row[key],
                        },
                        style:{
                            width:'100%',
                            height:'32px',
                        },
                        
                        attrs:{
                            // disabled:this.disableStatus
                        },
                        on:{
                            "on-blur":(event)=>{
                                this.changeBodyUnit({key,value:event.target.value,index:params.index})
                                let basisBodyV = this.$store.state.exhibition.basisBody[params.index]
                                if(key == 'quantity') {
                                    let k = 'unitprice'
                                    this.changeBodyUnit({key: k,value:(basisBodyV.totalprice / basisBodyV.quantity).toFixed(4), index:params.index})
                                    // this.changeBodyUnit({key: k,value:basisBodyV.unitprice, index:params.index})
                                }
                                this.$emit("changeData");
                            }
                        }
                    })
                    }
                    
                }
                return h('span',"")
            },
            //2018年10月16日，新增三列：试用、品尝、散发。编辑和查看时都需要，打印时不需要。
            //需求：有两种状态：是，否。默认选择是，在是的时候，必填数字，传给后台输入的数字，在否的时候，input框隐藏，传给后台0
            newRenderTable(h,params,key1,key2){
                return h('div',[
                    h('RadioGroup',{
                        props:{
                            value:params.row[key1]
                        },
                        attrs:{
                            vertical:true,
                            size:'small',
                        },
                        on:{
                            'on-change':(value)=>{
                                console.log(value)
                                this.changeBodyUnit({key:key1,value:value,index:params.index})
                                //数据变化
                                this.$emit("changeData");
                            }
                        }
                    },[
                        h('Radio',{
                            attrs:{
                                label:"1"
                            },
                            style:{
                                height:'15px',
                                'line-height':'15px'
                            },
                        },'是'),
                        h('Radio',{
                            attrs:{
                                label:"0"
                            },
                            style:{
                                height:'15px',
                                'line-height':'15px'
                            },
                        },'否'),
                    ]),
                    h('Input',{
                        style:{
                            width:'100px',
                            height:'32px',
                            'margin-top':'2px',
                            'text-align':'center',
                            'display':params.row[key1]=='1'?"inline-block":"none"
                        },
                        props:{
                            value:params.row[key2],
                        },
                        on:{
                            'on-blur':(value)=>{
                                this.changeBodyUnit({key:key2,value:event.target.value,index:params.index});
                            }
                        }
                        
                    })
                ]);
            }
        },
        computed:{
            ...mapState('exhibition',{
                basisBodyMap:state => state.basisBody
            }),
            allSum:function(){
                try{
                    let sum = {
                        dimension:0,
                        growssweight:0,
                        netweight:0,
                        totalprice:0
                    };
                    
                    for(let i = 0; i < this.basisBody.length; i++){
                        sum.dimension += parseFloat(this.basisBody[i].dimension || 0);
                        sum.growssweight += parseFloat(this.basisBody[i].growssweight || 0);
                        sum.netweight += parseFloat(this.basisBody[i].netweight || 0);
                        // console.log(this.basisBody[i].totalprice)
                        if(this.basisBody[i].totalprice != ''){
                            sum.totalprice += parseFloat(this.basisBody[i].totalprice);
                        }
                        
                    }
                    sum.dimension = parseFloat(sum.dimension).toFixed(2);
                    sum.growssweight = parseFloat(sum.growssweight).toFixed(3);
                    sum.netweight = parseFloat(sum.netweight).toFixed(3);
                    sum.totalprice = parseFloat(sum.totalprice).toFixed(2);
                    return sum;
                }catch(e){
                    return {
                        dimension:0,
                        growssweight:0,
                        netweight:0,
                        totalprice:0
                    }
                }
                
            }

        },
       
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss" media="screen">
    h1,h2{
        text-align: center;
    }
    .myIndex2{
        margin: 0 20px;
    }
    .tablePane {
        font-size: 14px;
        color: #212121;
        .row{
            border-right: 1px solid #dedede;
            .ivu-col {
                border-left: 1px solid #dedede;
                border-bottom: 1px solid #dedede;
                padding: 2px 4px;
                overflow: hidden;
                white-space: nowrap;
                text-align: left;
                text-overflow: ellipsis;
                > span {
                    display: inline-block;
                    width: auto;
                    text-align: left;
                    font-weight: 500;
                    vertical-align: middle;
                }
            }
        }
        .row1{
            border-top: 1px solid #dedede;
        }
        .ivu-table-cell{
            padding: 0;
        }
        .tablePane .ivu-table-body .ivu-table-cell{
            text-align: center;
        }
        .allClass{
            position: relative;
            width: 100%;
            height: 30px;
            line-height: 30px;
            span{
                display: inline-block;
                position: absolute;
                border: 1px solid #e9eaec;
                text-align: center;
                border-top: 0;
            }
        }
        .allClassEdit{
            position: relative;
            width: 100%;
            height: 30px;
            line-height: 30px;
            span{
                display: inline-block;
                width: 33%;
                font-size: 14px;
                text-align: left;
                border-top: 0;
            }
        }
        .allClass2{
           position: relative;
            width: 100%;
            height: 30px;
            span{
                display: inline-block;
                position: absolute;
                font-size: 12px;
                text-align: center;
            } 
        }
    }

    .myIndex2 .ivu-table td, .myIndex2 .ivu-table th{
        height: 0.2cm;
    }

</style>
<style lang='scss' scoped  media="print">
    @media print{
        @page :first {
            /*竖屏*/
            size: 290mm 290mm;
            margin: 2mm 2mm 2mm 30mm;
        }

        @page{
            /*横屏*/
            margin: 6mm 0mm 2mm 6mm;
            size:290mm 210mm;
        }

        /*nav,aside{*/
            /*display: none;*/
        /*}*/
        .pageBreakBefore{
            page-break-before: always;
        }
        .myIndex2{
            width: 34cm;
            margin: 0;
        }

        .myIndex2 h2{
            font-size: 18pt;
        }

        .myIndex2 .tablePane{
            font-size: 12pt;
            color: #000;
            font-weight: normal;
            font-family: SimSun;
        }

        .myIndex2 .tablePane .row {
            border-right: 1px solid #000;
        }

        .myIndex2 .tablePane .row .ivu-col {
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
            padding: 2px 4px;
            overflow: hidden;
            height: 0.8cm;
            line-height: 0.8cm;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .myIndex2 .tablePane .row2 .ivu-col{
            height: 1.6cm;
        }

        .myIndex2 .tablePane .row1{
            border-top: 1px solid #000;
        }

        .myIndex2 .tablePane .ivu-table td, .ivu-table th{
            height: 0.6cm;
        }

        .tablePane .allClass span{
            border: 1px solid #000;
            border-top: none;
        }
    }
    
</style>
