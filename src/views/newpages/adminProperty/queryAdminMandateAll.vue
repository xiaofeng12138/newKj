<template>
    <div class="taglist">
        <div class="header" ref='header' v-if=" unReadNum > 0">
            <img src="./img/qy_common_common_icon_msg.png" alt="" class="msgimg">
            <span style="display:flex">您有<h2 style="margin:0 10px">{{unReadNum}}</h2>条未处理的授权信息，请尽快处理。
                 <!-- <Button type="primary" size ='default' style="margin-right:5px" @click="lookOver">立即查看</Button> -->
            </span>
            <img src="./img/hg_common_common_btn_close.png" alt="" class="closeimg" @click="close">
        </div>
         <h2>授权企业信息全量查询</h2>
          <div class="query" >
            
            <div class="copName">授权企业名称：<Input size="large" placeholder="请输入授权企业名称" style="width:70%" v-model="queryInfo.companyname"/></div>
            <div class="copName"> 权利人名称：<Input size="large" placeholder="请输入标签名称" style="width:70%" v-model="queryInfo.lablename"/></div>
            <div class="copName"> 品牌名称：<Input size="large" placeholder="请输入品牌名称" style="width:70%" v-model="queryInfo.brandname"/></div>
            <div class="copName"> 商品名称：<Input size="large" placeholder="请输入商品名称" style="width:70%" v-model="queryInfo.goodsname"/></div>
           </div>
           <div class="query">
                <div class="copName"> 企业信用代码：<Input size="large" placeholder="请输入企业信用代码" style="width:70%" v-model="queryInfo.cncompanycode"/></div>
                <div class="copName"> HSCODE：<Input size="large" placeholder="请输入HSCODE" style="width:70%" v-model="queryInfo.hscode"/></div>
                <div class="copName"> 处理状态：<Select style="width:50%" v-model="queryInfo.readstatus"><Option value="">全部状态</Option><Option value="1">已处理</Option> <Option value="0"> 未处理</Option></Select></div>
                <Button type='primary'  @click="queryTagList(1)" style="margin-right:30px;width:100px">查  询</Button>
                <!-- <Button type='primary'   style="margin-right:30px;width:100px" @click="exportExcel">导  出</Button> -->
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList' max-height='580' class="self" @on-selection-change= 'selectAll'>
            <template  slot-scope="{row}" slot="action"> 
                <Button type="primary" size ='large' style="margin-right:10px" @click="openModal(row)" >添加说明</Button>
                <Button type="primary" size ='large'  @click="updateStatus(row)" v-if="row.readStatus == '0' " >处 理</Button>
                <Button type="primary" size ='large' disabled v-else>处 理</Button>
                <!-- <Button type="primary" size ='large'  style="margin-left:10px" @click="modifyTagList(row)">修改</Button> -->
            </template>
        </Table>
        <div  class ='bottombtn'>
          <Button type='primary'   style="margin-top:10px;width:100px" @click="updateManyStatus" v-if='updateManyArr.length > 0'>批量处理</Button>
          <Button type='primary'   style="margin-top:10px;width:100px"  disabled v-else>批量处理</Button>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        </div>
        </div>
       
       <!-- 添加备注的moadl -->
        <Modal
         v-model='noteModal' 
         width='600' 
         :mask-closable=false 
         :footer-hide = true
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span>提示</span>
          </p>
             <Row >
                <Col span="24"> <Input type="textarea" :rows= '4' v-model="cusNote" placeholder="请输入应用情况"/></Col>
             </Row>
             <Row>
                <Col span="24" style="margin:auto;text-align:center"><Button type="primary" style="width:100px;margin-top:10px;"  @click="submitQuery">提交</Button></Col>
             </Row>
          
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";


export default {
    data() {
        return {
            cusNote:'',
            cusNoteUUid:'',
            noteModal:false,
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
                width:'200',
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
                width:220
              } 
            ],
           queryInfo:{
               lablename:'',
               goodsname:'',
               brandname:'',
               companyname:'',
               hscode:'',
               readstatus:'',
               cncompanycode:''
           },
            total1:0,
            updateManyArr:[],
            showdisabled:true,
            updateStaus:false, //false 更新  true 新增
            numPage:1,
            unReadNum:1
        }
    },
    methods:{
        openModal(row){
            this.cusNoteUUid = row.uuid;
            this.noteModal = true
        },
        submitQuery(){
            let data = {
                uuid:this.cusNoteUUid,
                cusNote:this.cusNote
            }
            publicInter(interfaceUrl.saveCusNote,data).then(res=>{
                if(res.code == 200){
                  this.cusNote = ''
                  this.noteModal = false
                  this.$Message.success(res.message)
                  this.queryTagList(1)
                }
            })
        },
         close(){
            this.$refs.header.style.display = 'none';
         },
         exportExcel(){
            let lablename = this.queryInfo.lablename
            let goodsname = this.queryInfo.goodsname
            let brandname = this.queryInfo.brandname

            let companyname = this.queryInfo.companyname
            let hscode = this.queryInfo.hscode
            let readstatus = this.queryInfo.readstatus
            let cncompanycode = this.queryInfo.cncompanycode
            
            let url = interfaceUrl.excelExport+'?lablename='+ lablename +'&goodsname='+ goodsname +'&brandname='+brandname+'&agentCompanenyName='+''+'&companyname='+companyname+'&hscode='+hscode+'&readstatus='+readstatus+'&cncompanycode='+cncompanycode
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
         updateStatus(row){
              let arr = []
              arr.push(row.uuid)
              let requestData ={
                  data:arr
              }
              publicInter(interfaceUrl.updateMandateReadStatus,requestData).then(res=>{
                if(res.code == 200){
                    this.$Message.success('状态更新成功')
                    this.queryTagList(1)
                    this.queryUnReadNum()
                }
            })
         },
         //批量更新状态
         updateManyStatus(){
             let requestData ={
                 data:this.updateManyArr
             }
           publicInter(interfaceUrl.updateMandateReadStatus,requestData).then(res=>{
                if(res.code == 200){
                    this.$Message.success('状态更新成功')
                    this.updateManyArr = []
                    this.queryTagList(1)
                    this.queryUnReadNum()
                }
            })
         },
         
         queryUnReadNum(){
             publicInter(interfaceUrl.queryUnReadNum,'').then(res=>{
                this.unReadNum =res.nums
            })
         },
         
        //表格多选
        selectAll(selection){
            let newArr = []
            if(selection.length > 0){
                selection.forEach((item)=>{
                   newArr.push(item.uuid)
                }) 
            }
            this.updateManyArr = newArr
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
                hscode:this.queryInfo.hscode,
                readStatus:this.queryInfo.readstatus,
                cncompanycode:this.queryInfo.cncompanycode,
                companyname:this.queryInfo.companyname
            }
            publicInter(interfaceUrl.querypageQuery,data).then(res=>{
                console.log(res.list)
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },
    },
    mounted(){
        this.queryTagList(1)
        this.queryUnReadNum()
    }
}
</script>

<style lang="scss" scoped>
.taglist{
    .header{
        display: flex;
        height: 35px;
        width: 100%;
        margin-bottom: 10px;
        background-color: #FFFBEF;
        img{
            display: block;
            width: 35px;
            height: 35px;
        }
        .msgimg{
            margin-left: 20px;
        }
        .closeimg{
            float: right;
            display: block;
            width: 25px;
            height: 25px;
            margin-top: 5px;
            cursor: pointer;
        }
        span{
            margin-left: 20px;
            width: 93%;
            display: inline-block;
            line-height: 35px;
            button{
                margin-left: 40px;
            }
        }
    }
    h2{
        padding-bottom: 20px;
        border-bottom: 2px solid #dddee1;
    }
    .query{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
        .copName{
            width: 25%;
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