<template>
    <div>
       <div class="query" >
           <Button type='primary' size='large' @click="erpimport">导入</Button>
           <a href="excel/ErpQueryOfImportant.xlsx" download="ErpQueryOfImportant.xlsx">
                <Button type='primary' size='large' style="margin-left:20px;">下载模板</Button>
           </a>
        </div>
         <Table border :columns = 'columns' :data='data' class="self">
         </Table>
         <Modal
         v-model="erpModal"
         width="800"
         :footer-hide = true
         :mask-closable = "false"
         >
          <p slot="close"></p>
          <p slot="footer"></p>
          <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="erpModal=false" size='30'/>
          </p>
           <div class="upload">
        <h3>
            Excel上传
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
         
    </div>
</template>
<script>
import {fileUp} from '@/api/http'
//import upload from './erpupload'
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
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
          //billno:'',
          show:true,
          modal:false,
        //   formateError:'',
        //   fileSize:1024,
          filelist:[],
        //   filePdf:[],
        //   data2:[],
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
            data1: [],
      
          erpModal:false,
            data:[],
             columns:[
            {
              title:'序号',
              key:'NUM',
              width:'100',
              align:'center'
             },
              {
              title:'企业代码',
              key:'CNCOMPANYCODE',
              align:'center'
             },
              {
              title:'企业中文名称',
              key:'NAMECHINESE',
              align:'center',
             },
              {
              title:'框架协议',
              key:'BNUM',
              align:'center',
             },
             {
              title:'合同',
              key:'CNUM',
              align:'center',
             },
              {
              title:'中方采购订单',
              key:'DNUM',
              align:'center',
             },
              {
              title:'外方销售订单',
              key:'ENUM',
              align:'center',
             },
              {
              title:'发票数据',
              key:'FNUM',
              align:'center',
             },
              {
              title:'装货数据',
              key:'GNUM',
              align:'center',
             },
              {
              title:'到货数据',
              key:'HNUM',
              align:'center',
             },
              {
              title:'财务数据',
              key:'INUM',
              align:'center',
             },
              {
              title:'物料关系',
              key:'JNUM',
              align:'center',
             }
          ],
            total:0,
            params:{
                page:1,
                pageSize:20,
            }
        }
    },
  
    methods:{
      //上传
      beforeUpload(file){
        //   console.log(this.fileSize,file.size)
        if(this.fileSize<(file.size/1024)){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
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
            var url = interfaceUrl.uploadExcelTOqueryErp
            // console.log(this.filelist)
            this.filelist.forEach(item=>{
                formdata.append('file',item)
            })
            fileUp(url,formdata).then(r=>{
              console.log(r.list)
                if(r.code==='200'&&!r.error){
                    this.$Message.success('上传成功')
                    this.data = r.list;
                    this.erpModal = false;
                }
                else if(r.error){
                    this.modal=true
                    this.$refs.errorInfor.innerHTML=r.error
                }
                else{
                    if(r.msg){
                        this.$Message.error({
                            content:'上传失败'+ r.msg,
                            duration:3
                        })
                    }else{
                        this.$Message.error('上传出错')
                    }
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }

            })

        },
      //数据导入按钮
      erpimport(){
        this.erpModal = true;
      },
    }
}
</script>
<style lang="scss">
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
  .query{
    position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .Time{
        width: 30%
      }
      .uscCode{
          width:15%;
      }
    }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
    #loading{
       position: fixed;
       width: 100%;
       height:800px;
       margin: auto;
       background-color: #ccc;
       opacity: 0.8;
       text-align: center;
       z-index: 1002;
       i{
          line-height: 150px;
       }
       p{
           font-size: 18px;
       }
   }
</style>
    



