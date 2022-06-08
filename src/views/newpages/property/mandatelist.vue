<template>
    <div class="taglist">
         <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>授权企业全量查询</h2></Col>
            <Col span="12">
                    <div  style="float:right;"><h2>公司名称:{{showCompanyName}}</h2></div>
            </Col>
        </Row>
          <div class="query" >
            <div  style="width: 18%"> 授权企业名称：<Input size="large" placeholder="请输入授权企业名称" style="width:60%" v-model="queryInfo.companyname"/></div>
            <div style="width: 16%"> 权利人名称：<Input size="large" placeholder="请输入权利人名称" style="width:60%" v-model="queryInfo.lablename"/></div>
            <div class="copName"> 品牌名称：<Input size="large" placeholder="请输入品牌名称" style="width:70%" v-model="queryInfo.goodsname"/></div>
            <div class="copName"> 商品名称：<Input size="large" placeholder="请输入商品名称" style="width:70%" v-model="queryInfo.brandname"/></div>
            <div style="width: 18%"> 企业信用代码：<Input size="large" placeholder="请输入企业信用代码" style="width:60%" v-model="queryInfo.cncompanycode"/></div>
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:10px;width:100px">查  询</Button>
            <Button type='primary'   @click="openAddModal" style="margin-right:10px;width:100px">新  增</Button>
            <!-- <Button type='primary'   @click="exportExcel" style="margin-right:0px;width:100px">导 出</Button> -->
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList' max-height='650' class="self" @on-selection-change= 'selectAll'>
            <template  slot-scope="{row}" slot="action"> 
                <Button type="error" size ='large'  @click="delbtn(row)" >删除</Button>
                <Button type="primary" size ='large'  style="margin-left:10px" @click="modifyTagList(row)">修改</Button>
            </template>
        </Table>
            <div  class ='bottombtn'>
            <Button type='primary'   style="margin-top:10px;width:100px" @click="delCompany" v-if='delCompanyArray.length > 0'>批量删除</Button>
            <Button type='primary'   style="margin-top:10px;width:100px"  disabled v-else>批量删除</Button>
            <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
            </div>
        </div>


         <!-- 添加授权信息的moadl -->
        <Modal
         v-model='addModal' 
         width='1000' 
         :mask-closable=false 
         :footer-hide = true
         :closable =false
        
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span v-if="showFlag ">新增授权企业信息</span>
              <span v-else>修改授权企业信息</span>

          </p>
            <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
            <Row >
                <Col span="12"><FormItem label='请选择权利人'  prop='lablename'> 
                    <Select v-model="formData.lablename"  placeholder="请选择权利人名称">
                        <Option v-for="(item,index) in queryTagsList" :value="item.lablename" :key="index" >{{item.lablename}}</Option>
                    </Select>
                    </FormItem></Col>
                 <Col span="12"><FormItem label='授权企业名称'  prop='companyname'> <Input v-model="formData.companyname" placeholder="请输入授权企业名称"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='授权企业信用代码'  prop='cncompanycode' > <Input v-model="formData.cncompanycode" placeholder="请输入授权企业信用代码" /></FormItem></Col>
                <Col span="12"><FormItem label='HS编码'  prop='hscode' > <Input v-model="formData.hscode" placeholder="请输入HS编码"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='商品名称'  prop='goodsname' > <Input v-model="formData.goodsname" placeholder="请输入商品名称" /></FormItem></Col>
                <Col span="12"><FormItem label='品牌名称'  prop='brandname' > <Input v-model="formData.brandname" placeholder="请输入品牌名称"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12">
                <FormItem label='许可起始日期'  prop='permitstartdate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.permitstartdate = $event"  placeholder="请选择许可开始时间" v-model="formData.permitstartdate" ></DatePicker>
                </FormItem></Col>
                <Col span="12">
                <FormItem label='许可截止日期'  prop='permitstartdate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.permitenddate = $event"  placeholder="请选择许可截止日期" v-model="formData.permitenddate" ></DatePicker>
                </FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='目的国/地区'  prop='descountry' > <Input v-model="formData.descountry" placeholder="请输入目的国/地区"/></FormItem></Col>
               
             </Row>
             <Row>
               
                <Col span="24" style="margin:auto;text-align:center">
                <Button type="primary" style="width:120px;margin-right:20px"  @click="closeAddModal('formData')">取   消</Button>
                <Button type="primary" style="width:120px"  @click="submitone('formData')">提   交</Button>
                </Col>
             </Row>
           </Form>
          
        </Modal>

        <!-- 确认取消弹窗 -->
        <Modal
               v-model="confirmModal"
                width="500"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="header" style="text-align:center;font-size:18px">
                    <span>提示</span>
                </p>
                <div style="text-align:center;height:50px;font-size:16px;font-weight:bold">
                    <p>是否确认删除当前选中内容</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="cancleModal" style="margin-right:20px">取消</Button> 
                   <Button type='primary' size='large' @click="confirmPass">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
        </Modal>
        
        <!-- 新增弹出框 -->
        <Modal
            v-model='mandateModal' 
            width='600' 
            :mask-closable=false 
            :footer-hide = true
            >
            <p slot="header" style="text-align:center;font-size:15px">
                <span>授权企业信息导入</span>
            </p>
            <div style="text-align:center">
                <Button type="primary" size ='large' style="margin-right:20px" @click="showUploadOne">单条导入</Button>
                <Button type="primary" size ='large' style="margin-right:20px" @click="showUploadModal">批量导入</Button>
                <!-- <a href="/excel/mandatetable.xlsx"><Button type="primary" size ='large'  @click="change(row)">模板下载</Button></a> -->
            </div>
        </Modal>
        <!-- 批量导入 -->
        <allUpload ref="allUpload" labelName =''  />
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {getCookie,setCookie} from '@/until/getToken'
import allUpload from './components/allupload'

export default {
    components:{allUpload},
    data() {
        return {
            showFlag:true,
            //新增的弹出框
            mandateModal:false,
            showCompanyName:getCookie('companyName'),
            //新增授权企业modal信息
            addModal:false,
            lablename:'',//标签名称
            queryTagsList:'',
            formData:{
                uuid:'',
                lablename:'',
                companyname:'',
                cncompanycode:'',
                hscode:'',
                goodsname:'',
                brandname:'',
                permitstartdate:'',
                permitenddate:'',
                descountry:'',
            },
            formRules:{
                lablename:[{required:true, trigger:'blur' , message:'权利人名称不能为空', }],
                companyname:[{required:true, trigger:'blur' , message:'公司名称不能为空', }],
                cncompanycode:[{required:true, trigger:'blur' , message:'公司信用代码不能为空', }],
                goodsname:[{required:true, trigger:'blur' , message:'商品名称不能为空', }],
                brandname:[{required:true, trigger:'blur' , message:'品牌名称不能为空', }],
            },
            tagsList:[],
            columns:[
                {
                    type:'selection',
                    width:50,
                    align:'center'
                },
                {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
               {
                title:'权利人名称', 
                key:'lablename',
                width:'150',
                align:'center'
              },
               {
                title:'授权企业名称',
                key:'companyname',
                align:'center',
                width:'200',
              },
              {
                title:'企业统一社会信用代码',
                key:'cncompanycode',
                align:'center',
                width:'250',
              },
              {
                title:'商品HS编码',
                key:'hscode',
                align:'center',
                width:'200',
              },
              {
                title:'商品名',
                key:'goodsname',
                align:'center',
                width:'200',
              },
              {
                title:'品牌名称',
                key:'brandname',
                align:'center',
                width:'200',
              },
              {
                title:'许可起始日',
                key:'permitstartdate',
                align:'center',
                width:'200',
                render:(h,params)=>{
                 let tmpStr ="";
                 if(params.row.permitstartdate){
                    tmpStr = params.row.permitstartdate.replace(new RegExp(/-/g),'/')
                    return h('span',tmpStr)
                 }else{
                   return h('span',tmpStr)
                 }
                }
              },
              {
                title:'许可截止日',
                key:'permitenddate',
                align:'center',
                width:'200',
                render:(h,params)=>{
                 let tmpStr ="";
                 if(params.row.permitenddate){
                    tmpStr = params.row.permitenddate.replace(new RegExp(/-/g),'/')
                    return h('span',tmpStr)
                 }else{
                   return h('span',tmpStr)
                 }
                }
              },
              {
                title:'目的国名称',
                key:'descountry',
                align:'center',
                width:'200',
              },
              {
                title:'处理状态',
                key:'readStatus',
                align:'center',
                width:'200',
                 render:(h,params)=>{
                 let tmpStr = "";
                    if(params.row.readStatus == "0"){
                      tmpStr="未处理";
                    }else if(params.row.readStatus == "1"){
                      tmpStr="已处理";
                    }
                    return h('span',{
                        style:{
                           color: (params.row.readStatus == "0")? "#EF5552":"#63E35A"
                        }
                    },tmpStr)
                }
              },
              {
                title:'许可状态',
                key:'permitStat',
                align:'center',
                width:'200',
              },
              {
                title:'应用情况',
                key:'cusNote',
                align:'center',
                width:'200',
              },
              
              {
                title:'操作',
                slot:'action',
                align:'center',
                fixed:'right',
                width:200
              }   
            ],
           queryInfo:{
               lablename:'',
               goodsname:'',
               brandname:'',
               companyname:'',
               cncompanycode:''
           },
            confirmModal:false,
            total1:0,
            delCompanyArray:[],
            showdisabled:true,
            updateStaus:false, //false 更新  true 新增
            numPage:1
        }
    },
    methods:{
        //导出excel
        exportExcel(){
            let lablename = this.queryInfo.lablename.length > 0 ? this.queryInfo.lablename :''
            let goodsname = this.queryInfo.goodsname.length > 0 ? this.queryInfo.goodsname :''
            let brandname = this.queryInfo.brandname.length > 0  ? this.queryInfo.brandname :''
            let cncompanycode = this.queryInfo.cncompanycode.length > 0  ? this.cncompanycode.brandname :''
            let companyname = this.queryInfo.companyname.length > 0  ? this.companyname.brandname :''


            let url = interfaceUrl.excelExport+'?lablename='+ lablename +'&goodsname='+ goodsname +'&brandname='+brandname+'&companyname='+companyname +'&cncompanycode='+cncompanycode
            let queryUrl = encodeURI(url)
            let newName = (new Date()).getTime()
            this.excelName1 =newName +'.xls'
            filedownload(queryUrl,{}).then(r=>{
                        let url = window.URL.createObjectURL(new Blob([r]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', this.excelName1)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    })
        },
        showUploadModal(){
            this.$refs.allUpload.openModal()
            this.mandateModal = false
        },
        //单条导入
        showUploadOne(){
           this.addModal = true
           this.updateStaus = true
           this.mandateModal = false
        },
        closeAddModal(name){
           this.$refs[name].resetFields()
           this.addModal = false
           this.showFlag = true
        },
        //修改信息
        modifyTagList(row){
            this.showFlag = false
            this.formData.lablename = row.lablename
            this.formData.companyname = row.companyname
            this.formData.cncompanycode = row.cncompanycode
            this.formData.hscode = row.hscode
            this.formData.goodsname = row.goodsname
            this.formData.brandname = row.brandname
            this.formData.permitstartdate = row.permitstartdate
            this.formData.permitenddate = row.permitenddate
            this.formData.descountry = row.descountry
            this.formData.uuid = row.uuid
            this.addModal = true
            this.updateStaus = false
        },
        //新增表单提交
        submitone(name){
            this.$refs[name].validate((valid)=>{
              if(valid){
                let data ={
                    isNew:this.updateStaus,
                    lablename:this.formData.lablename,
                    data:this.formData
                }
                
                publicInter(interfaceUrl.saveOne,data).then(res=>{
                  if(res.code == 200){
                    this.addModal = false
                    this.$refs[name].resetFields()
                    this.$Message.success('操作成功')
                    this.queryTagList(1)
                  }else{
                    this.$Message.error(res.message)
                  }
                })
              }else{
                 console.log('失败')
              }
         })
        },
        //新增窗口打开
        openAddModal(){
            this.mandateModal = true;
        },
        //批量删除接口
        delCompany(){
            this.confirmModal = true
        },
        //弹出框关闭
        cancleModal(){
            this.confirmModal = false
            this.delCompanyArray = []
        },
        //表格多选
        selectAll(selection){
             let newArr = []
            if(selection.length > 0){
                selection.forEach((item)=>{
                   newArr.push(item.uuid)
                }) 
            }
            this.delCompanyArray = newArr
        },
        delbtn(row){
            let arr = []
            arr.push(row.uuid)
            this.delCompanyArray = arr
            this.confirmModal = true
        },
        confirmPass(){
          let data = {
               data:this.delCompanyArray
           }
           publicInter(interfaceUrl.deleteCompany,data).then(res=>{
               if(res.code == 200){
                  this.$Message.success('删除成功')
                  this.confirmModal = false
                  this.delCompanyArray = []
                  this.queryTagList(1)
               }else{
                   this.$Message.error(res.message)
               }
               
           })
        },

        changePage1(page){
            this.numPage = page
           this.queryTagList(page)
        },
        queryTagList(page){
            let data ={
                pageNum:page,
                pageSize:20,
                lablename:this.queryInfo.lablename,
                goodsname:this.queryInfo.goodsname,
                brandname:this.queryInfo.brandname,
                cncompanycode:this.queryInfo.cncompanycode,
                companyname:this.queryInfo.companyname

            }
            publicInter(interfaceUrl.querypageQuery,data).then(res=>{
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },
        //标签列表查询
        queryTags(){
            publicInter(interfaceUrl.queryListForBus,{}).then(res=>{
                let arr = []
                if(res.list.length > 0){
                  arr = res.list.filter((item)=>{ return item.status  != '2'})
                  this.queryTagsList = arr
                }else{this.queryTagsList = []}
            })
        }
    },
    mounted(){
        this.queryTagList(1)
        this.queryTags()
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    h2{
        padding-bottom: 20px;
    }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 15%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
        }
        .bottombtn{
            width: 100%;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .ivu-page{
               margin: 10px 20px 0 0;
            }
        }
    
}
    
</style>