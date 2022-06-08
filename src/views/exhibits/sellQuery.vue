<template>
    <div>
        <h1 style="margin-bottom:20px;">进博会展期内销售查询</h1>
        <Row  :gutter="16">
            <Col span=8 >
                <Row :gutter="8">
                    <Col span=12>
                        <DatePicker style='width:100%' v-model="queryParmas.startTime" type='date' class="self" size='large' placeholder="请选择起始时间"></DatePicker>
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
             <Select  v-model="queryParmas.entryId" size='large' filterable style="width:250px;"  placeholder="请输入证明函编号"  :remote-method ='queryPosition' >
                 <Option v-for="(item,index) in entryIdList" :key="index" :value="item.CERTIFICATENO">{{item.CERTIFICATENO}}
                </Option>
            </Select>
            </Col> 

            <!-- <Col span=4>
                <Input type="text" size='large' v-model="queryParmas.entryId" placeholder="请输入证明函编号"></Input>
            </Col> -->
            <Col span=2>
                <Button type="primary" size='large' long @click="query(1)">查询</Button>
            </Col>
            <Col span=2>
                <Button type="primary" size='large' long @click="enter">录入</Button>
            </Col>
        </Row>
        <Table border :columns='columns' :data='tableData' class="self" style="margin-top:20px"></Table>
        <div style="margin-top:20px;display:flex;justify-content: center">
            <Page :total='showTatol' show-total  v-show="tableData.length>0" @on-change='pageChange' :page-size=20></Page>
        </div>
        <!-- <div class="print-container" v-show="printShow" id="myRiskPrintt">
            <div class="print-content">
                <div class="opration">
                    <Button type='primary' size='large' style="margin-right:20px" @click="printModal">打印</Button>
                    <Button type='default' size='large' @click="printShow=false">取消</Button>
                </div>
                <h2>中国国际进口博览会享受税收优惠政策展品确认清单</h2>
                <div class="des">
                    上海海关: <br>
                    <p>经我单位确认，一下商品为进博会享受税收优惠政策展品</p>
                    <p>特此确认。</p>
                </div>
                <div class="who">
                    <p>参展商: {{zsName}}</p>
                    <p>编号: {{zmhBH}}</p>
                </div>
                <Table border :columns = 'columns3' :data='printData' ></Table>
               
                <p class="remark">确认单位：国家会展中心(上海)有限责任公司</p>

            </div>
        </div> -->

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
                    <p>编号: {{ zmhBH }}</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>商品编码</th>
                            <th>商品名称</th>
                            <th>规则型号</th>
                            <th>数量</th>
                            <th>计量单位</th>
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
                            <td>{{item.QUANTITYUNIT == '011' ? '件' : ''}}</td>
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
                        <Table border :columns = 'columns2' :data='detailData' class="self"></Table>
                 </div>
               
        </Modal>

        <!-- 文件上传的modal -->
    <Modal
         v-model="zmhModal"
         width="800"
         :footer-hide = true
         :mask-closable = "false"
         >
          <p slot="close"></p>
          <p slot="footer"></p>
          <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="zmhModal=false" size='30'/>
          </p>
           <div class="upload">
        <h3>
            PDF上传
            <Button type="primary" v-if="data1.length>0" @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button>
                 <Upload  action="a" v-if="data1.length>0"
                multiple
                  :before-upload='beforeUpload'
                    :max-size='fileSize'
                    :on-exceeded-size='outSize'
                    >
                    <Button icon="plus-round" size='large'>添加文件</Button>
                </Upload>
                  <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
            </h3>
            <div class="tableBox" v-if="data1.length>0">
                <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
            </div>
            <div class="upfile" v-if="data1.length<=0">
                <h3 style="margin-bottom:16px">暂未上传</h3>
                <Upload
               action='a'
                     multiple
                    :before-upload='beforeUpload'
                    :max-size='fileSize'
                    :on-exceeded-size='outSize'
                    >
                    <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
                    <!-- <Button style="margin-left:16px" type="ghost" icon="ios-cloud-upload-outline" size='large'>上传原始文件(pdf)</Button> -->
                </Upload>
            </div>
            <Modal
                title="格式错误"
                v-model="modal"
                :closable="false"
                :scrollable='true'
                class="self"
                :mask-closable="false">
                <p ref='errorInfor'  class="modalcontent"></p>
            </Modal>
       </div>
   </Modal>

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
                    <Table border :columns='columns4' :data='uploadInfo' class="self"></Table>
                </div>
            
    </Modal>
        
    </div>
</template>
<script>
import { publicInter,filedownload } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import {fileUp} from '@/api/http'
export default {
     props:{
        pdfEnter:{
            type:String
        },
        uploadUrl:{
            type:String
        },
        interType:{
            type:String,
        },
        fileType:{
            type:String,
            default:'Excel'
        },
        fileSize:{
            type:Number,
            default:1024
        }
    },
    data(){
        return{
            uploadModal: false,
            uploadInfo:[],
            entryIdList:[],
          UUID:'',  //文件上传的唯一标识
          zsName:'',
          zmhBH:'',
          columns4:[
                
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
                     console.log(params.row)
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
          //打印的table
           columns3:[
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
                align: 'center',
                width:200,
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
          printData:[],




            showTatol:0,
           //证明函modal
           zmhModal:false,
             modal:false,
            filelist:[],
             columns1: [
                    {
                        title: '文件名',
                        key: 'name'
                    },
                    {
                        title: '上传时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width:100,
                        render:(h,params)=>{
                            const that=this
                            return  h('Poptip', {
                                    props: {
                                       confirm: '',
                                       placement:'top-end',
                                       title:"您确认删除这条内容吗？"
                                    },
                                    style:{
                                        textAlign:'left'
                                    },
                                    on:{
                                        'on-ok':()=>{
                                            this.data1.splice(params.index,1)
                                        }
                                    }
                                },[
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'large'
                                    }
                                },'删除')])

                        }
                    },

            ],
            data1:[],


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
                width:200,
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
            detailData:[], //证明函详情data
            detailShow:false,
            printShow:false,
            selectLists:[
                {label:'全部',value:''},
                {label:'暂存',value:0},
                {label:'已申报',value:1},
                {label:'已审批',value:7},
                {label:'已拒绝',value:8},
                {label:'已退回',value:9}
            ],
            queryParmas:{
                startTime:'',
                endTime:'',
                state:'',
                entryId:'',
                pageSize:20,
                pageNum:1
            },
            tableData:[],
            columns:[
                {
                    title:'序号',
                    align:'center',
                    width:80,
                    key:'NUM'
                },
                {
                    title:'清单编号',
                    align:'center',
                    key:'SERIALNO'
                },
                {
                    title:'物资证明函编号',
                    align:'center',
                    key:'CERTIFICATENO'
                },
                {
                    title:'参展商名称',
                    align:'center',
                    key:'EXHIBITOR'
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
                    title:'操作',
                    align:'center',
                    width:400,
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
                                     disabled:(params.row.STATUS === "8" )
                                },
                                style:{
                                    marginRight:'10px'

                                },
                                on:{
                                    click:()=>{
                                        this.zmhModal = true;
                                        this.UUID = params.row.ITEMUUID2
                                    }
                                }
                            },'上传'),

                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                style:{
                                    marginRight:'10px'

                                },
                                on:{
                                    click:()=>{
                                       this.detailShow = true; 
                                        let data = {
                                                certificateno:params.row.CERTIFICATENO, //证明函编号
                                                exhibitorid:params.row.EXHIBITORID    //展商id
                                            }
                                            publicInter(interfaceUrl.qryExhibitsList, data).then(r=>{
                                                this.detailData = r.list
                                            });
                                    }
                                }
                            },'查看'),

                            

                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                    disabled:(params.row.STATUS === "1"  || params.row.STATUS === "8" || params.row.STATUS === "7")
                                },
                                style:{
                                    marginRight:'10px'
                                },
                                on:{
                                    click:()=>{
                                         
                                        this.$Modal.confirm({
                                                title:"提示",
                                                content:'您确认提交申报这条内容吗？',
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
                            },'申报'),

                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                },
                                style:{
                                    marginRight:'10px',

                                },
                                on:{
                                    click:()=>{
                                        this.printShow=true
                                        this.zsName = params.row.EXHIBITOR
                                        this.zmhBH = params.row.SERIALNO
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
                            },'打印'),

                             h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large',
                                    disabled:(params.row.STATUS === "1"  || params.row.STATUS === "7" || params.row.STATUS === "8")
                                    
                                },
                                style:{
                                    marginRight:'10px'
                                },
                                on:{
                                    click:()=>{
                                       this.$router.push({name: 'saleDeclare', params: {CERTIFICATENO: params.row.CERTIFICATENO}})
                                    }
                                }
                            },'修改'),
                        ])
                    }
                },
            ]

        }
    },
    mounted(){
        this.query(1)
    },
    methods:{
        enter(){
            this.$router.push({
                path:'saleDeclare'
            })
        },
        queryPosition(e){
             let data = {
                 certificateno:e
                }
                publicInter(interfaceUrl.qryCertnoList, data).then(r=>{
                    //console.log(r.list)
                   this.entryIdList = r.list
                });
         },

        printModal(){
              let newHtml = document.getElementById('myRiskPrintt').innerHTML;
                let  oldHtml = document.body.innerHTML;
                document.body.innerHTML = newHtml;
                window.print();
                window.location.reload();
                document.body.innerHTML = oldHtml;
        },
        query(page){
            let pageNum = page
             let data = {
                     certificateno: this.queryParmas.entryId, //证明函编号
                     pageNum,
                     pageSize:20,
                     startDate:this.queryParmas.startTime.length > 0 ? this.queryParmas.startTime.replace(/-/g,"") :'',
                     endDate:this.queryParmas.endTime.length > 0 ? this.queryParmas.endTime.replace(/-/g,"") :'',
                     status:this.queryParmas.state

                }
                //console.log(data)
                publicInter(interfaceUrl.qryDiscountList, data).then(r=>{
                    this.tableData = r.list
                    this.showTatol = r.totalRow
                });

        },
        pageChange(page){
            this.query(page)
        },

        //文件上传部分
         beforeUpload(file){
           //console.log(file.name)
           let fileName = file.name.lastIndexOf('.')
           let fileLength = file.name.length;
           let fileType = file.name.substring(fileName + 1 , fileLength )
          // console.log(fileType)
           if(fileType != 'pdf'){
             this.$Message.error({
                  content:"请上传pdf文件",
                  duration:3
             })
           }else{
               this.filelist.push(file)
               this.data1.push({
                name: file.name,
                date: (new Date).toLocaleDateString()
              })
           }
            
        return false
      },
      reChocie(){
          this.data1=[];
          this.filelist=[];
      },
      outSize(){
        //   console.log('asdasda')
          this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
          this.data1.pop()
      },
      remove (index) {
        this.data1.splice(index, 1);
      },
      upload(){
            var formdata=new FormData()
            var url = interfaceUrl.uploadFile
            // console.log(this.filelist)
            this.filelist.forEach(item=>{
                console.log(item)
                formdata.append('file',item)
                formdata.append('itemuuid',this.UUID)
            })
            fileUp(url,formdata).then(r=>{
              console.log(r)
                if(r.code==='200'&&!r.error){
                    this.$Message.success('上传成功')
                    this.data = r.list;
                    this.zmhModal = false
                }
                else if(r.error){
                    this.modal=true
                    this.$refs.errorInfor.innerHTML=r.error
                }
                else{
                    // if(r.msg){
                    //     this.$Message.error({
                    //         content:'上传失败'+ r.msg,
                    //         duration:3
                    //     })
                    // }else{
                    //     this.$Message.error('上传出错')
                    // }
                     this.$Message.error('上传出错')
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }

            })

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
.upload{
         >h3{
            padding: 10px 0;
            .ivu-upload,button{
                float: right;
                margin-left: 32px;

            }
        }
        &:last-child{
            margin-bottom: 10px;
        }
        h3{
          margin:0;
          font-size: 18px;
        }
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }

</style>
