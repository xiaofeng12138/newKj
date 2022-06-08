<template>
    <div>
        <h1 style="margin-bottom:20px;">进博会展期内销售审核</h1>
        <Row  :gutter="16">
            <Col span=8 >
                <Row :gutter="8">
                    <Col span=12>
                        <DatePicker style='width:100%'  @on-change="startTime = $event" v-model="queryParmas.startTime" type='date' class="self" size='large' placeholder="请选择起始时间"></DatePicker>
                    </Col>
                    <Col span=12> 
                        <DatePicker style='width:100%' v-model="queryParmas.endTime" type='date' size='large' class="self" placeholder="请选择结束时间"></DatePicker>
                    </Col>
                </Row>
                
            </Col>
            <Col span=3>
                <Select style='width:100%' size='large' v-model="queryParmas.state">
                    <Option v-for="(item,i) in selectLists" :value="item.value" :key="i">{{item.label}}</Option>
                </Select>
            </Col>
            <Col span=4>
             <Select  v-model="zmhBH" size='large' filterable style="width:250px;"  placeholder="请输入证明函编号"  :remote-method ='queryPosition'  @on-change ='fn'>
                 <Option v-for="(item,index) in entryIdList" :key="index" :value="item.CERTIFICATENO">{{item.CERTIFICATENO}}
                </Option>
            </Select>
             
                <!-- <Input type="text" size='large' v-model="queryParmas.entryId" placeholder="请输入证明函编号" @on-change="queryPosition"></Input> -->
            </Col>
              <Col span=5>
               <Select  v-model="queryParmas.cysName" size='large' filterable style="width:300px;margin-right:20px;"  placeholder="请输入展商名称"  :remote-method ='queryCysName'  @on-change ='fn2' >
                 <Option v-for="(item,index) in cysNameList" :key="index" :value="item.EXHIBITOR">{{item.EXHIBITOR}}
                </Option>
            </Select>
            </Col>
            <Col span=2>
                <Button type="primary" size='large' long @click="query(1)">查询</Button>
            </Col>
        </Row>
        <Table :columns='columns' border :data='tableData' class="self" style="margin-top:20px"></Table>
        <div style="margin-top:20px;display:flex;justify-content: center">
            <Page :total='showTatol' show-total :pageSize=20 v-show="tableData.length>0" @on-change='pageChange'></Page>
        </div>
        <!-- 打印部分 -->
        <div class="print-container" v-show="printShow" id="myRiskPrintt">
            <div class="print-content">
                <div class="opration">
                    <Button type='primary' size='large' style="margin-right:20px" @click="printModal">打印</Button>
                    <Button type='default' size='large' @click="printShow=false">取消</Button>
                </div>
                <h2>中国国际进口博览会享受税收优惠政策展品确认清单</h2>
                <div class="des">
                    上海海关: <br>
                    <p>经我单位确认，以下商品为进博会享受税收优惠政策展品</p>
                    <p>特此确认。</p>
                </div>
                <div class="who">
                    <p>参展商: {{zsName}}</p>
                    <p>编号: {{zmhName}}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>商品编码</th>
                            <th>商品名称</th>
                            <th>规则型号</th>
                            <th>数量</th>
                            <th>件数</th>
                            <th>货值(美元)(证明函总价)</th>
                            <th>原产地</th>
                            <th>暂时进境报关单号或保税展示出区备案清单编号</th>
                            <th>对应贸易代理商</th>
                            <th>备注</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item,index) in printData" :key="index">
                        <tr>
                            <td>{{item.ROWNUM}}</td>
                            <td>{{item.HSCODE}}</td>
                            <td>{{item.GOODSDESCRIPTIONCN}}</td>
                            <td>{{item.G_MODEL}}</td>
                            <td>{{item.QUANTITY}}</td>
                            <td>{{item.QUANTITYUNIT}}</td>
                            <td>{{item.TOTALPRICE}}</td>
                            <td>{{item.COUNTRYOFORIGIN}}</td>
                            <td>{{item.ENTRY_ID}}</td>
                            <td>{{item.AGENTNAME}}</td>
                            <td>{{item.NOTES}}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="remark">确认单位：国家会展中心(上海)有限责任公司</p>

            </div>
        </div>

          <Modal
                v-model="detailShow"
                     width = "1300px"
                    :footer-hide = true
                    :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="detailShow=false" size='30' />
                </p>
                 <div class="detailTable">
                        <h2 style="text-align:center;margin-bottom:20px">中国国际进口博览会享受税收优惠政策展品确认清单</h2>
                        <Table border :columns='columns2' :data='detailDataa' class="self"></Table>
                 </div>
               
        </Modal>

     <!-- 文件上传的modal -->
     <Modal
                v-model="uploadModal"
                     width = "600px"
                    :footer-hide = true
                    :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                <Icon type="md-close" @click="uploadModal=false" size='30' />
                </p>
                 <div class="detailTable">
                        <h2 style="text-align:center;margin-bottom:20px">上传附件列表</h2>
                        <Table border :columns='columns3' :data='uploadInfo' class="self"></Table>
                 </div>
               
        </Modal>

    </div>
</template>
<script>
import { publicInter,filedownload } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
    data(){
        return{
            uploadModal:false,
              zsName:'',
              zmhName:'',
            showTatol:0,
            zmhBH:'',
            entryIdList:[],
           //证明函modal
           zmhModal:false,

        columns2:[
             {
              title:'序号',
              key:'ROWNUM',
              width:'80',
              align:'center'
             },
              {
              title:'商品编码',
              key:'HSCODE',
              width:200,
              align:'center'
             },
              {
              title:'商品名称',
              key:'GOODSDESCRIPTIONCN',
              width:200,
              align:'center',
             },
             {
              title:'规则型号',
              key:'G_MODEL',
              width:200,
              align:'center',
             },
             {
              title:'数量',
              key:'QUANTITY',
              width:200,
              align:'center',
             },
             {
                title: '计量单位',
                key: 'QUANTITYUNIT',
                width: 200,
                align: 'center',
                render(h,params){
                    return h("span", params.row.QUANTITYUNIT == '011' ? "件" : "")
                },
            },
            //  {
            //   title:'货值（证明函总价）',
            //   key:'ITEM_UNITPRICE',
            //   width:200,
            //   align:'center',
            //  },
            //  {
            //   title:'币种（美元）',
            //   key:'CURRENCY',
            //   width:200,
            //   align:'center',
            //  },
             {
              title:'货值（美元）（证明函总价）',
              key:'TOTALPRICE',
              width:200,
              align:'center',
             },
             {
              title:'原产地',
              key:'COUNTRYOFORIGIN',
              width:200,
              align:'center',
             },
             {
              title:'暂时进境报关单号或保税展示出区备案清单编号',
              key:'ENTRY_ID',
              width:200,
              align:'center',
             },
              {
              title:'对应贸易代理商',
              key:'AGENTNAME',
              width:200,
              align:'center',
             },
             {
              title:'备注',
              key:'NOTES',
              width:200,
              align:'center',
             },
          ],
            detailDataa:[], //证明函详情data
            detailShow:false,
            printShow:false,
            printData:[],
            selectLists:[
                {label:'全部',value:''},
                {label:'已申报',value:1},
                {label:'已审批',value:7},
                {label:'已拒绝',value:8},
                {label:'已退回',value:9},
            ],
            queryParmas:{
                startTime:'',
                endTime:'',
                state:'',
                cysName:'',
                entryId:'',
                pageSize:20,
                pageNum:1
            },
            entryIdList:[],  //证明函编号列表
            cysNameList:[], //承运商名称list
            tableData:[],
            columns:[
                {
                    title:'序号',
                    align:'center',
                    width:80,
                    key:'NUM'
                },
                
                {
                    title:'承运商名称',
                    align:'center',
                    key:'AGENTNAME'
                },
                {
                    title:'参展商名称',
                    align:'center',
                    key:'EXHIBITOR'
                },
                {
                    title:'物资证明函编号',
                    align:'center',
                    key:'CERTIFICATENO'
                },
                {
                    title:'申请状态',
                    align:'center',
                    key:'',
                    render:(h,params)=>{
                       switch (params.row.STATUS){
                        case "0":
                            return h('span','暂存')
                            break;
                        case "1":
                            return h('span','已申报')
                            break;
                        case "7":
                            return h('span','已审批')
                            break;
                        case "8":
                            return h('span','已拒绝')
                            break;
                         case "9":
                            return h('span','已退回')
                            break;
                       }
                    }
                },
                {
                    title:'随附资料',
                    align:'center',
                    key:'',
                     render:(h,params)=>{
                        return h('div',
                        {
                            style:{
                                textAlign:'center'
                            }
                        },
                        [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{
                                        this.uploadModal = true;
                                        
                                      let data = {
                                                itemuuid:params.row.ITEMUUID2, //证明函编号
                                            }
                                            publicInter(interfaceUrl.qryFileList, data).then(r=>{
                                              //console.log(r)
                                              this.uploadInfo = r.list
                                            });
                                    }
                                }
                            },'查看'),
                        ])
                    }
                },
                {
                    title:'操作',
                    align:'center',
                    width:430,
                    key:'',
                    render:(h,params)=>{
                        return h('div',
                        {
                            style:{
                                textAlign:'center'
                            }
                        },
                        [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                    disabled:(params.row.STATUS === "7" || params.row.STATUS === "8"|| params.row.STATUS === "9")
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{

                                         this.$Modal.confirm({
                                                title:"提示",
                                                content:'您确认审批这条内容吗？',
                                                onOk:()=>{
                                                    let data = {
                                                        certificateno:params.row.CERTIFICATENO, //证明函编号
                                                        exhibitorid:params.row.EXHIBITORID,   //展商id
                                                        status:"7"
                                                    }
                                                    publicInter(interfaceUrl.updateDiscountStatus, data).then(r=>{
                                                    this.query(1);
                                                    });
                                                }
                                            })
                                        
                                     l
                                    }
                                }
                            },'审批'),
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                    disabled:(params.row.STATUS === "7" || params.row.STATUS === "8"|| params.row.STATUS === "9")
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{

                                        this.$Modal.confirm({
                                                title:"提示",
                                                content:'您确认拒绝这条内容吗？',
                                                onOk:()=>{
                                                    let data = {
                                                        certificateno:params.row.CERTIFICATENO, //证明函编号
                                                        exhibitorid:params.row.EXHIBITORID,   //展商id
                                                        status:"8"
                                                    }
                                                    publicInter(interfaceUrl.updateDiscountStatus, data).then(r=>{
                                                      this.query(1);
                                                    });
                                                }
                                            })
                                    }
                                }
                            },'拒绝'),
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                    disabled:(params.row.STATUS === "7" || params.row.STATUS === "8" || params.row.STATUS === "9")
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{
                                        let data = {
                                                certificateno:params.row.CERTIFICATENO, //证明函编号
                                                exhibitorid:params.row.EXHIBITORID,   //展商id
                                                status:"9"
                                            }
                                            publicInter(interfaceUrl.updateDiscountStatus, data).then(r=>{
                                               this.query(1);
                                            });
                                    }
                                }
                            },'退回'),

                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                   
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{

                                        this.$Modal.confirm({
                                                title:"提示",
                                                content:'您确认重置这条内容吗？',
                                                onOk:()=>{
                                                    let data = {
                                                        certificateno:params.row.CERTIFICATENO, //证明函编号
                                                        exhibitorid:params.row.EXHIBITORID,   //展商id
                                                        status:"1"
                                                    }
                                                    publicInter(interfaceUrl.updateDiscountStatus, data).then(r=>{
                                                      this.query(1);
                                                    });
                                                }
                                            })
                                    }
                                }
                            },'重置'),

                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{
                                         this.detailShow = true; 
                                        let data = {
                                                certificateno:params.row.CERTIFICATENO, //证明函编号
                                                exhibitorid:params.row.EXHIBITORID    //展商id
                                            }
                                            publicInter(interfaceUrl.qryExhibitsList, data).then(r=>{
                                                //this.detailDataa = r.list
                                               console.log(r.list)
                                               this.detailDataa = r.list;
                                            });
                                    }
                                }
                            },'查看'),
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{
                                        this.printShow=true
                                        this.zsName = params.row.EXHIBITOR
                                        this.zmhName = params.row.SERIALNO
                                        let data = {
                                                certificateno:params.row.CERTIFICATENO, //证明函编号
                                                exhibitorid:params.row.EXHIBITORID    //展商id
                                            }
                                            publicInter(interfaceUrl.qryExhibitsList, data).then(r=>{
                                                this.printData = r.list
                                               //console.log(r)
                                            });
                                    }
                                }
                            },'打印')
                        ])
                    }
                },
            ],
            columns3:[
                
                {
                title:'文件名',
                key:'FILENAME',
                align:'center'
                },
                {
                title:'操作',
                key:'',
                align:'center',
                 render:(h,params)=>{
                        return h('div',
                        {
                            style:{
                                textAlign:'center'
                            }
                        },
                        [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                },
                                style:{
                                    marginRight:'5px'

                                },
                                on:{
                                    click:()=>{
                                      let a = document.createElement('a')
                                      a.href = 'video/'+params.row.FILENAME
                                      a.click()
                                    }
                                }
                            },'下载'),
                        ])
                    }
                },
            ],
            uploadInfo:[]

        }
    },

    mounted(){
        this.query(1)
    },
    methods:{

          printModal(){
              let newHtml = document.getElementById('myRiskPrintt').innerHTML;
                let  oldHtml = document.body.innerHTML;
                document.body.innerHTML = newHtml;
                window.print();
                window.location.reload();
                document.body.innerHTML = oldHtml;
           },

         fn(e){
             this.zmhBH = e ;
         },
          fn2(e){
             this.queryParmas.cysName = e ;
         },
         //展商模糊查询
         queryCysName(e){
             let data = {
                 exhibitor:e
                }
                publicInter(interfaceUrl.qryExhibitorList, data).then(r=>{
                   this.cysNameList = r.list;
                });
         },

        //证明函模糊查询
        queryPosition(e){
            console.log(typeof(e))
             let data = {
                 certificateno:e
                }
                publicInter(interfaceUrl.qryCertnoList, data).then(r=>{
                    //console.log(r.list)
                   this.entryIdList = r.list
                });
         },
        query(page){
            console.log(this.zmhBH)
             let pageNum = page
             let data = {
                     certificateno: this.zmhBH, //证明函编号
                     pageNum,
                     pageSize:20,
                     startDate:this.queryParmas.startTime.length > 0 ? this.queryParmas.startTime.replace(/-/g,"") :'',
                     endDate:this.queryParmas.endTime.length > 0 ? this.queryParmas.endTime.replace(/-/g,"") :'',
                     status:this.queryParmas.state,
                     getall:'Y',
                     exhibitor:this.queryParmas.cysName  //承运商名称

                }
                publicInter(interfaceUrl.qryDiscountList, data).then(r=>{
                     this.tableData = r.list
                     this.showTatol = r.totalRow
                  
                });

        },
        pageChange(page){
            this.query(page)
        },
    }
    
}
</script>
<style lang="scss" scoped>
.print-container{
    position: fixed;
    width: 100vw;
    height:100vh;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.6);
    overflow-y: auto;
    z-index: 1111;
     .print-content{
        position: absolute;
        left: 0;
        height: 100%;
        background: #fff;
        width: 100%;
        padding: 20px;
        font-size: 16px;
        .opration{
            text-align: right;
        }
        h2{
            text-align: center;
            margin-bottom: 16px;

        }
        table{
            border-collapse: collapse;
            width: 100%;
            border-top: 1px solid #999;
            border-left: 1px solid #999;
            th,td{
                text-align: center;
                padding: 6px 4px;
                border-bottom: 1px solid #999;
                border-right: 1px solid #999;
            }
        }
        .des{
            color: #333;
            font-weight: 700;
            >p{
                text-indent: 35px;
            }
        }
        .who{
            display: flex;
            margin: 16px 0;
            p{
                width: 50%;
            }
        }
        table .ivu-table th{
            background: #fff !important;
        }
        p.remark{
            text-align: right;
            margin-top: 16px;
        }
    }
   
}
@media print{
    .print-container{
        width: 100%;
    }
    .opration{
        display: none;
    }
     .print-content{
        position: absolute;
        left: 0;
        background: #fff;
        width: 100vw;
        padding: 20px;
        font-size: 16px;
        h2{
            text-align: center;
            margin-bottom: 16px;

        }
        .des{
            color: #333;
            font-weight: 700;
            >p{
                text-indent: 35px;
            }
        }
        table{
            border-collapse: collapse;
            width: 100%;
            border-top: 1px solid #999;
            border-left: 1px solid #999;
            th,td{
                text-align: center;
                padding: 6px 4px;
                border-bottom: 1px solid #999;
                border-right: 1px solid #999;
                font-size: 10px;
            }
        }
        .des{
            color: #333;
            font-weight: 700;
            >p{
                text-indent: 35px;
            }
        }
        .who{
            display: flex;
            margin: 16px 0;
            p{
                width: 50%;
            }
        }
        table .ivu-table th{
            background: #fff !important;
        }
        p.remark{
            text-align: right;
            margin-top: 16px;
        }
    }
}
.detailTable{
      .des{
            color: #333;
            font-weight: 700;
            font-size: 14px;
            >p{
                text-indent: 35px;
            }
        }
        .who{
            display: flex;
            margin: 16px 0;
            p{
                width: 50%;
            }
        }

}

</style>
