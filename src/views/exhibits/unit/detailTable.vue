<template>
    <div class="pageBreakBefore">
        <p>附件2</p>
        <h2 style="margin-bottom: 10px">List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</h2>
        <div class="tablePane" style="margin-bottom: 20px">
            <Row class="row row1">
                <Col span="12">
                    Company公司:
                    <div v-if="disableStatus" style="display: inline-block">{{ basis.company }}</div>
                    <Input v-else v-model="basis.company" :disabled="disableStatus" style="width: calc(100% - 100px)"></Input>
                </Col>
                <Col span="12">
                    Tel电话:
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 70px)">{{ basis.tel }}</div>
                    <Input v-else v-model="basis.tel" :disabled="disableStatus" style="width: calc(50% - 70px)"></Input>
                    Fax传真:
                    <div v-if="disableStatus" style="display: inline-block;width: calc(50% - 70px)">{{ basis.fax }}</div>
                    <Input v-else v-model="basis.fax" :disabled="disableStatus" style="width: calc(50% - 70px)"></Input>
                </Col>
            </Row>
            <Row class="row">
                <Col span="12">
                    Booth No.展台号:
                    <div style="display: inline-block;width:calc(50% - 110px)"  v-if="disableStatus">{{ basis.boothno }}</div>
                    <Input v-else v-model="basis.boothno" :disabled="disableStatus" style="width: calc(50% - 110px)"></Input>
                    Contact 负责人:
                    <div style="display: inline-block;width:calc(50% - 110px)"  v-if="disableStatus">{{ basis.contact }}</div>
                    <Input v-else v-model="basis.contact" :disabled="disableStatus" style="width: calc(50% - 110px)"></Input>
                </Col>
                <Col span="12">
                    Email电邮:
                    <div style="display: inline-block;width:calc(100% - 70px)"  v-if="disableStatus">{{ basis.email }}</div>
                    <Input v-else v-model="basis.email" :disabled="disableStatus" style="width: calc(100% - 70px)"></Input>
                </Col>
            </Row>
        </div>
        <div class="tablePane" style="margin-bottom: 20px">
            <Row type="flex" class="row row1">
                <Col span="12">
                    <div>
                        EXHIBITION:{{ basis.exhibitionname }}
                    </div>
                    <div>
                        展览会：{{ basis.exhibitionnamecn }}
                    </div>
                </Col>
                <Col span="9">
                    <div>
                        VENUE: {{ basis.exhibitionvenue }}
                    </div>
                    <div>
                        地点：{{ basis.exhibitionvenuecn }}
                    </div>
                </Col>
                <Col span="3">
                    PAGE NO
                    <div>
                        页数:{{ (index+1)+"/"+detailLength }}
                    </div>
                </Col>
            </Row>
            <Row type="flex" class="row" style="margin-bottom: 20px;">
                <Col span="2">
                    Exhibitor
                    <div>
                        参展商
                    </div>
                </Col>
                <Col span="3">
                    <div style="height: 100%;" v-if="disableStatus">{{ basis.exhibitor }}</div>
                    <Input v-else v-model="basis.exhibitor" :disabled="disableStatus" style="width: 100%;height: 100%;"></Input>
                </Col>
                <Col span="3">
                    Country/Region
                    <div>
                        国别/地区
                    </div>
                </Col>
                <Col span="4" style="overflow: visible">
                    <div>
                        <vague v-if="disableStatus === false" @regionVal="regionChange" :firstVal="basis.exhibitorcountry"></vague>
                        <div v-else>{{ basis.exhibitorcountry }}</div>
                    </div>
                </Col>
                <Col span="2">
                    Hall No.
                    <div>
                        馆号
                    </div>
                </Col>
                <Col span="2" style="overflow: visible">
                    <div>
                        <Select v-if="disableStatus === false" v-model="basis.hallno" style="width:100%;" :disabled="disableStatus">
                            <Option v-for="item in positionList" :value="item.ID" :key="item.ID">{{item.NAME }}</Option>
                        </Select>
                        <div v-else>{{ basis.hallno }}</div>
                    </div>
                </Col>
                <Col span="2">
                    Booth No.
                    <div>
                        展台号
                    </div>
                </Col>
                <Col span="2">
                    <div style="height: 100%;" v-if="disableStatus">{{ basis.boothno2 }}</div>
                    <Input v-else v-model="basis.boothno2" :disabled="disableStatus" style="width: 100%;height: 100%;"></Input>
                </Col>
                <Col span="2">
                    Total Pkgs.
                    <div>
                        总件数
                    </div>
                </Col>
                <Col span="2">
                    <div>
                        {{ basis.packagequantity }}
                    </div>
                </Col>
            </Row>

            <Table :columns="detailColumns" :data="detailData" border></Table>
        </div>
    </div>
</template>

<script>
    import vague from "../orignUnit/vague"
    export default {
        name: "detailTable",
        props:['disableStatus',"detailData",'basis','basis2',"positionList",'index','detailLength'],
        components:{vague},
        data(){
            return {
                detailColumns:[],
                // detailData:[],
                detailDataUnit:{
                    caseno:"",
                    dimension:"",
                    length:"",
                    width:"",
                    height:"",
                    growssweight:"",
                    netweight:"",
                    goodsdescription:"",
                    goodsdescriptioncn:"",
                    countryoforigin:"",
                    quantity:"",
                    quantityunit:"",
                    unitprice:"",
                    totalprice:"",
                    hscode:"",
                    disposals:""
                }
            }
        },
        created(){
            for (let i = this.detailData.length; i < 13;i++){
                this.detailData.push(this.copyObj(this.detailDataUnit))
            }
            this.init();
        },
        methods:{
            init(){
              const that=this;
              this.detailColumns = [
                  {
                      title: 'Case No. 箱号',
                      key:'caseno',
                      width:70,
                      render(h,params){
                          return that.renderTable(h,params,"caseno")
                      }
                  },
                  {
                      title: 'Dimension 体积',
                      key:'dimension',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"dimension")
                      }
                  },
                  {
                      title: 'L(长) cm',
                      key:'length',
                      width:70,
                      render(h,params){
                          return that.renderTable(h,params,"length")
                      }
                  },
                  {
                      title: 'W(宽) cm',
                      key:'width',
                      width:70,
                      render(h,params){
                          return that.renderTable(h,params,"width")
                      }
                  },
                  {
                      title: 'H(高)cm',
                      key:'height',
                      width:70,
                      render(h,params){
                          return that.renderTable(h,params,"height")
                      }
                  },
                  {
                      title: 'Gross Wt. 毛重(Kg)',
                      key:'growssweight',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"growssweight")
                      }
                  },
                  {
                      title: 'Net Wt. 净重(Kg)',
                      key:'netweight',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"netweight")
                      }
                  },
                  {
                      title: 'Description of Exhibits 展品名称规格',
                      align: 'center',
                      children: [
                          {
                              title: 'English 英文',
                              key: 'goodsdescription',
                              align: 'center',
                              width:100,
                              render(h,params){
                                  return that.renderTable(h,params,"goodsdescription")
                              }
                          }, {
                              title: 'Chinese 中文',
                              key: 'goodsdescriptioncn',
                              align: 'center',
                              width:100,
                              render(h,params){
                                  return that.renderTable(h,params,"goodsdescriptioncn")
                              }
                          }]
                  },
                  {
                      title: 'Country of Origin 原产地',
                      key:'countryoforigin',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"countryoforigin")
                      }
                  },
                  {
                      title: 'Quantity 数量',
                      key:'quantity',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"quantity")
                      }
                  },
                  {
                      title: 'unit 单位',
                      key:'quantityunit',
                      width:70,
                      render(h,params){
                          return that.renderTable(h,params,"quantityunit")
                      }
                  },
                  {
                      title: 'unit Price 单价（US$）',
                      key:'unitprice',
                      width:100,
                      render(h,params){
                          return h("span",{
                              style:{
                                  width:'100%',
                                      display:'inline-block',
                                      'text-align': 'center'
                              }
                          },params.row.unitprice)
                      }
                  },
                  {
                      title: 'Total 总价（US$）',
                      key:'totalprice',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"totalprice")
                      }
                  },
                  {
                      title: 'H.S.No. 商品代号',
                      key:'hscode',
                      width:80,
                      render(h,params){
                          return that.renderTable(h,params,"hscode")
                      }
                  },
                  {
                      title: 'Disposals 展品处理方法： a.Sold已售 b.Return运回 c.Abandoned & Consumed放弃和消耗 d.Others其他',
                      key:'disposals',
                      width:100,
                      render(h,params){
                          return that.renderTable(h,params,"disposals")
                      }
                  }
              ]
            },
            copyObj(obj){
                var newObj = {};
                for (var attr in obj){
                    newObj[attr] = obj[attr];
                }
                return newObj;
            },
            regionChange(val){
                this.basis.exhibitorcountry = val;
            },
            renderTable(h,params,key){
                if(this.disableStatus){
                    return h('span',{
                        style:{
                            width:'100%',
                            display:'inline-block',
                            'text-align': 'center'
                        }
                    },params.row[key])
                }
                else{
                    return h("Input",{
                        props:{
                            value:params.row[key]
                        },
                        style:{
                            width:'100%',
                            height:'32px'
                        },
                        attrs:{
                            disabled:this.disableStatus
                        },
                        on:{
                            "on-blur":(event)=>{
                                this.detailData[params.index][key] = event.target.value;
                                if(key === "totalprice" || key === 'quantity'){
                                    this.detailData[params.index]['unitprice'] = parseFloat(params.row.totalprice)/parseFloat(params.row.quantity) || "";
                                }
                            }
                        }
                    })
                }
                return h('span',"")
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss" media="screen">
    h1,h2{
        text-align: center;
    }
    .tablePane {
        font-size: 14px;
        color: #212121;
        .ivu-row{
            border-right: 1px solid #ececec;
            .ivu-col {
                border-left: 1px solid #ececee;
                border-bottom: 1px solid #ececec;
                padding: 2px 4px;
                overflow: hidden;
                white-space: nowrap;
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
            border-top: 1px solid #ececec;
        }
        .ivu-table-cell{
            padding: 0;
        }
        .tablePane .ivu-table-body .ivu-table-cell{
            text-align: center;
        }
    }
</style>