<template>
    <div class="taglist">
         <h2>知识产权权利人审核</h2>
          <div class="query" >
            <div class="copName"> 公司名称：<Input size="large" placeholder="请输入公司名称" style="width:70%" v-model="companyname"/></div>
            <div class="copName"> 权利人名称：<Input size="large" placeholder="请输入权利人名称" style="width:70%" v-model="lablename"/></div>
            <div class="uscCode"> 状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">待审核</Option> <Option value="1"> 审核通过</Option><Option value="2"> 审核拒绝</Option></Select></div>
            <Button type='primary'  @click="queryTagList(1)" style="margin-right:30px;width:100px">查  询</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tagsList' class="self">
            <template  slot-scope="{row}" slot="action"> 
                 
                <template>
                    <!-- <Button type="primary" size ='large' style="margin-right:10px" @click="downloadFile(row)">下载</Button> -->
                    <Button type="primary" size ='large'   v-if="row.status != 0" disabled>通过</Button>
                    <Button type="primary" size ='large'  @click="passbtn(row)" v-else>通过</Button>
                </template>
                <template>
                     <Button type="primary" size ='large'  style="margin-left:10px" v-if="row.status != 0" disabled>拒绝</Button>
                    <Button type="primary" size ='large'  @click="refuse(row)" style="margin-left:10px" v-else >拒绝</Button>
                   
                </template>
                
            </template>
        </Table>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
        </div>


         <!-- 添加标签的moadl -->
        <Modal
         v-model='refuseModal' 
         width='600' 
         :mask-closable=false 
         :footer-hide = true
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span>提示</span>
          </p>
             <Row >
                <Col span="24"> <Input type="textarea" :rows= '4' v-model="refuseReason" placeholder="请输入拒绝原因"/></Col>
             </Row>
             <Row>
                <Col span="24" style="margin:auto;text-align:center"><Button type="primary" style="width:100px;margin-top:10px;"  @click="refuseFn">提交</Button></Col>
             </Row>
          
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
                    <p>您确认当前权利人名称通过审核吗</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="confirmModal = false" style="margin-right:20px">取消</Button> 
                   <Button type='primary' size='large' @click="confirmPass">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    data() {
        return {
            refuseModal:false,
            formRules:{
                tagsName:[{required:true, trigger:'blur' , message:'拒绝不能为空', }],
            },
            tagsList:[],
            columns:[
            {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 20 )+1)
                    }
               },
            {
              title:'公司名称',
              key:'companyname',
              align:'center'
             },
              {
              title:'权利人名称',
              key:'lablename',
              align:'center'
             },
              {
              title:'添加日期',
              key:'recUpdDt',
              align:'center'
             },
              {
              title:'状态',
              key:'status',
              align:'center',
              render:(h,params)=>{
                 let tmpStr = "";
                          if(params.row.status == 0){
                            tmpStr="待审核";
                          }else if(params.row.status== 1){
                            tmpStr="审核通过";
                          }else if(params.row.status== 2){
                            tmpStr="审核拒绝";
                          }
                           return h('span',{
                              style:{
                                 color: (params.row.status == 0)? "#BDBABD":(params.row.status == 1)?"#63E35A":"#EF5552"
                              }
                          },tmpStr)
                }
             },
              {
              title:'拒绝原因',
              key:'refuseDes',
              align:'center',
              render:(h,params)=>{
                 let tmpStr = "";
                          if(params.row.refuseDes == ''){
                            tmpStr="无";
                          }else {
                            tmpStr= params.row.refuseDes;
                          }
                          return h('span',tmpStr)
                }
             },
             {
              title:'附件名称',
              key:'filename',
              align:'center'
             },
              {
              title:'操作',
              slot:'action',
              align:'center',
              width:'250'
             }
            ],
            lablename:'', //标签名称
            status:'',  //审核状态
            companyname:"", //公司名称
            confirmModal:false,
            lableid:'',
            total1:0,
            updateLableid:'',
            refuseReason:'', //拒绝理由
            numPage:1,
        }
    },
    methods:{
        //文件下载
        downloadFile(row){
            if( !row.filename){
                this.$Message.error('暂无相关附件')
                return false
            }

            let a = document.createElement('a')
            let url = row.filepath
                let fileName = url.lastIndexOf('.')
                let fileLength = url.length;
                let fileType = url.substring(fileName + 1 , fileLength )
                let tp =['zip','ZIP'];
                let rs = tp.indexOf(fileType);
                if(rs >= 0){
                   a.href =url.replace('/data/file/','').trim()
                   a.click()
                }else{
                   a.href =url.replace('/data/file/','').trim()
                   a.download =row.filename
                   a.click()
                }
        },
        passbtn(row){
            this.confirmModal = true
            this.updateLableid =  row.lableid
        },
        confirmPass(){
           let data ={
                 lableid:this.updateLableid,
                 status:'1',
                 refuseDes:''
             }
             publicInter(interfaceUrl.updateLableForStatus,data).then(r=>{
                 console.log(r)
                 if(r.code == '200'){
                     this.confirmModal = false;
                     this.$Message.success('状态更新成功')
                     this.queryTagList(1)
                 }
                     
             })
        },
        refuse(row){
            this.refuseModal = true
            this.updateLableid =  row.lableid
        },
        //拒绝函数
        refuseFn(){
            let data ={
                 lableid:this.updateLableid,
                 status:'2',
                 refuseDes:this.refuseReason
             }
             publicInter(interfaceUrl.updateLableForStatus,data).then(r=>{
                 if(r.code == '200'){
                     this.refuseModal = false;
                     this.refuseReason =''
                     this.$Message.success('状态更新成功')
                     this.queryTagList(1)
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
                lablename:this.lablename,
                status:this.status,
                companyname:this.companyname
            }
            publicInter(interfaceUrl.queryListForCus,data).then(res=>{
                this.tagsList = res.list
                this.total1 = (res.total)*1
            })
        },
    },
    mounted(){
        this.queryTagList(1)
    }
}
</script>

<style lang="scss" scoped>
.taglist{
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
            width: 20%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
        }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
      margin-bottom: 20px;
    }
}
    
</style>