<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>公告管理</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 公告标题：<Input size="large" placeholder="请输入公告标题" style="width:60%" v-model="title"/></div>
            <!-- <div class="uscCode"> 审核状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">待审核</Option> <Option value="1"> 审核通过</Option><Option value="2"> 审核拒绝</Option></Select></div> -->
            <Button type='primary'  @click="queryNoticeList" style="margin-right:30px;width:100px">查  询</Button>
            <Button type="primary" size ='large'  @click="addNotice ">添加公告</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='noticeList' class="self">
            <!-- <template  slot-scope="{row,index}" slot="action"> 
                <Button type="error" size ='large' style="margin-right:10px">删 除</Button>
                <Button type="primary" size ='large'>修 改</Button>
            </template> -->
        </Table>
        </div>


          <Modal
                v-model="uploadModal"
                width="800"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="closeModal" size='30'/>
                </p>
                <div class="addModal">
                      <h3>添加公告</h3>
                      <Form  :model="formModal" :rules="formRules" ref="formValidate" :label-width="80">
                            <FormItem label='标题' prop="addTitle" style="margin-bottom:25px">
                                <Input v-model="formModal.addTitle" placeholder="请输入公告标题"></Input>
                            </FormItem>
                            <FormItem label='内容' prop="addContent" style="min-height:100px">
                                <Input v-model="formModal.addContent" type="textarea" :rows=4 placeholder="请输入公告内容"></Input>
                            </FormItem>
                            <FormItem label='公告状态' prop="status" v-if="formModal.uuid" >
                                <RadioGroup v-model="formModal.status">
                                    <Radio label= '0'>有效</Radio>
                                    <Radio label= '1'>无效</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem >
                                <Button type="primary" @click="handSubmit" size ='large' style="width:100px">提 交</Button>
                            </FormItem>
                      </Form>
                     
                </div>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";


export default {
    data() {
        return {
            title:'',
            uploadModal:false,
            //授权信息搭配如modal
            numPage:1,
           
            formModal:{
                addTitle:'',
                addContent:'',
                uuid:'',
                status:''
            },
            formRules:{
                addTitle:[{required:true, trigger:'blur' , message:'标题不能为空', }],
                addContent:[{required:true, trigger:'blur' , message:'内容不能为空', }],
            },
            noticeList:[],
            columns:[
              {
                title:'序号',
                width:70,
                align:'center',
                render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 10 )+1)
                    }
               },
              {
                title:'标题',
                key:'title',
                align:'center'
              },
              {
                title:'内容',
                key:'content',
                align:'center'
              },
               {
                title:'上传人',
                key:'userid',
                align:'center'
              },
               {
                title:'已读数量',
                key:'readnum',
                align:'center'
              },
               {
                title:'消息状态',
                key:'status',
                align:'center',
                render:(h,params)=>{
                    let tmpStr = "";
                        if(params.row.status == 0){
                        tmpStr="有效";
                        }else if(params.row.status == 1){
                        tmpStr="无效";
                        }
                        return h('span',{
                            style:{
                            color: (params.row.status == 0)? "#63E35A":"#EF5552"
                            }
                        },tmpStr)
                    }
              },
               {
                title:'发布时间',
                key:'recUpdDt',
                align:'center'
              },
              {
                title:'操作',
                align:'center',
                render: (h, params) => {
                                const that=this
                                return h('div', [
                                h('Button',{
                                        props:{
                                            type:'primary',
                                            size:'large',
                                        },
                                        style:{
                                            marginRight:'10px',
                                            
                                        },
                                        on:{
                                            click(){
                                              that.openModal(params.row)
                                            }
                                        }
                                    },'修改'),
                                    
                                    h('Poptip', {
                                        props: {
                                        confirm: '',
                                        placement:'top-end',
                                        title:"您确认删除这条内容吗？"
                                        },
                                        style:{
                                            textAlign:'left'
                                        },
                                        nativeOn:{
                                        click(e){
                                            e.stopPropagation() 
                                            var text=e.target.innerText.replace(/\s+/g,"")
                                            if(text==='确定'||text==='ok'){
                                                that.confirmDelete(params.row)
                                            }
                                        }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'large',
                                        },
                                        style:{
                                            marginLeft:'10px'
                                        }
                                    },'删除')])
                                ])
                            }
                }
            ],
            
            
        }
    },
    methods:{
        closeModal(){
            this.uploadModal = false
             this.$refs.formValidate.resetFields()
             this.formModal.uuid = ''
        },
        handSubmit(){
            this.$refs.formValidate.validate((valid)=>{
                if(valid){
                    //修改提交
                    if(this.formModal.uuid){
                        let requestData={
                            title:this.formModal.addTitle,
                            content:this.formModal.addContent,
                            uuid:this.formModal.uuid,
                            status:this.formModal.status
                        }
                        publicInter(interfaceUrl.updateNotice,requestData).then(res=>{
                            if(res == 1){
                                this.$Message.success('修改成功')
                                this.$refs.formValidate.resetFields()
                                this.uploadModal = false
                                this.formModal.uuid = ''
                                this.formModal.status = ''
                                this.queryNoticeList()
                           }
                        })
                    }else{
                    // 添加提交
                      let requestData = {
                        title:this.formModal.addTitle,
                        content:this.formModal.addContent
                     }
                    publicInter(interfaceUrl.addNotice,requestData).then(res=>{
                        if(res == 1){
                            this.$Message.success('添加成功')
                            this.$refs.formValidate.resetFields()
                            this.uploadModal = false
                            this.queryNoticeList()
                        }
                     })
                    }
                    
                }else{
                    this.$Message.error('必填项不能为空')
                }
            })
            
        },
        //添加公告
        addNotice(){
            this.uploadModal = true
        },
        //查询公告列表queryAllNotice
        queryNoticeList(){
            let requestData ={
                title:this.title
            }
          publicInter(interfaceUrl.queryAllNotice,requestData).then(res=>{
              this.noticeList = res.list
          })
        },
        //公告删除
        confirmDelete(params){
            publicInter(interfaceUrl.delNotice,{uuid:params.uuid}).then(res=>{
              console.log(res)
              this.$Message.success('删除成功')
              this.queryNoticeList()
          })
        },
        //修改弹出框
        openModal(params){
             this.uploadModal = true
             this.formModal.addTitle = params.title
             this.formModal.addContent = params.content
             this.formModal.uuid = params.uuid
             this.formModal.status =params.status
        }
    },
    mounted(){
       this.queryNoticeList()
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
            width: 20%
        }
        .Time{
            width: 30%
        }
        .uscCode{
            width:25%;
        }
    }
    
}  
.addModal{
      width: 90%;
      height: 300px;
      margin: auto;
      h3{
          text-align: center;
          margin-bottom: 10px;
      }
    }

</style>