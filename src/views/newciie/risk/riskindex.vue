<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>重点关注展位管理</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 展馆号：<Input size="large" placeholder="请输入展馆号" style="width:60%" v-model="queryData.hallno"/></div>
            <div class="copName"> 展位号：<Input size="large" placeholder="请输入展位号" style="width:60%" v-model="queryData.boothno"/></div>
            <div class="copName"> 风险原因：<Input size="large" placeholder="请输入风险原因" style="width:60%" v-model="queryData.riskReason"/></div>
            <!-- <div class="uscCode"> 审核状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">待审核</Option> <Option value="1"> 审核通过</Option><Option value="2"> 审核拒绝</Option></Select></div> -->
            <Button type='primary'  @click="queryRiskList(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type='primary'  @click="uploadModal = true" style="margin-right:30px;width:100px">新 增</Button>
            <Button type='primary'  @click="openUploadModal" style="margin-right:30px;width:100px">导 入</Button>
            
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='riskList' class="self">
        </Table>
         <Page :total="total"  :page-size='10' @on-change='pageChange' show-total />
        </div>
        <Upload ref='uploadModal' />

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
                      <h3>新增重点关注展位</h3>
                      <Form  :model="formModal" :rules="formRules" ref="formValidate" :label-width="80">
                            <FormItem label='展馆号' prop="hallno" style="margin-bottom:25px">
                                <Select v-model="formModal.hallno" @on-change="zgChange" placeholder="请选择展馆号"  size='large'  style="width:180px;">
                                      <Option v-for="(item,index) in zgList" :value="item.ID" :key="index">{{ item.NAME }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label='展位号' prop="boothno" style="margin-bottom:25px">
                                <Select  v-model="formModal.boothno" filterable  size='large'  style="width:180px;margin-right:20px;" @on-query-change='queryZwh'>
                                    <Option v-for="item in zwList" :key="item.POSITION" :value="item.POSITION">{{item.POSITION}}</Option>
                                </Select>
                            </FormItem>
                            <!-- <FormItem label='展位号' prop="boothno" style="margin-bottom:25px">
                                <Input v-model="formModal.boothno" placeholder="请输入展位号"></Input>
                            </FormItem> -->
                            <FormItem label='风险原因' prop="riskReason" style="min-height:100px">
                                <Input v-model="formModal.riskReason" type="textarea" :rows=4 placeholder="请输入风险原因"></Input>
                            </FormItem>
                            <FormItem >
                                <Button type="primary" @click="handSubmit" size ='large' style="width:100px">提 交</Button>
                            </FormItem>
                      </Form>
                     
                </div>
        </Modal>

         <Modal
                v-model="updateModal"
                width="800"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="closeUpdateModal" size='30'/>
                </p>
                <div class="addModal">
                      <h3>修改重点关注展位</h3>
                      <Form  :model="updateInfo" :rules="formRules" ref="chageformValidate" :label-width="80">
                            <FormItem label='展馆号' prop="hallno" style="margin-bottom:25px">
                               <Input disabled v-model="updateInfo.hallno" style="width:180px;"></Input>
                            </FormItem>
                            <FormItem label='展位号' prop="boothno" style="margin-bottom:25px">
                                 <Input disabled v-model="updateInfo.boothno" style="width:180px;"></Input>
                            </FormItem>
                            <!-- <FormItem label='展位号' prop="boothno" style="margin-bottom:25px">
                                <Input v-model="updateInfo.boothno" placeholder="请输入展位号"></Input>
                            </FormItem> -->
                            <FormItem label='风险原因' prop="riskReason" style="min-height:100px">
                                <Input v-model="updateInfo.riskReason" type="textarea" :rows=4 placeholder="请输入风险原因"></Input>
                            </FormItem>
                            <FormItem >
                                <Button type="primary" @click="handChageSubmit" size ='large' style="width:100px">提 交</Button>
                            </FormItem>
                      </Form>
                     
                </div>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import Upload from './components/upload'


export default {
    components:{Upload},
    data() {
        return {
            updateModal:false,
            updateInfo:{
                hallno:'', //展馆号
                boothno:'', //展位号
                //riskLevel:'',//风险级别
                riskReason:'', //风险原因
                uuid:''
            },
            //分页数据
            total:0,
            uploadModal:false,
            //授权信息搭配如modal
            numPage:1,
            //展馆列表
            zgList: [], 
            zwList:[],
            formModal:{
                hallno:'', //展馆号
                boothno:'', //展位号
                //riskLevel:'',//风险级别
                riskReason:'', //风险原因
                uuid:''
            },
            queryData:{
                hallno:'',
                boothno:'',
                riskReason:'',
                pageNum:1,
                pageSize:10
            },
            formRules:{
                hallno:[{required:true, trigger:'blur' , message:'展馆号不能为空', }],
                boothno:[{required:true, trigger:'blur' , message:'展位号不能为空', }],
                riskReason:[{required:true, trigger:'blur' , message:'风险原因', }],
            },
            riskList:[],
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
                title:'展馆号',
                key:'hallno',
                align:'center'
              },
              {
                title:'展位号',
                key:'boothno',
                align:'center'
              },
               {
                title:'风险原因',
                key:'riskReason',
                align:'center'
              },
               {
                title:'上传用户',
                key:'userid',
                align:'center',
               
              },
               {
                title:'上传时间',
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
         //查询展位列表
      queryZglist(){
           publicInter(interfaceUrl.queryPositionTransport,{}).then(res=>{
               this.zgList = res.position
            })
      },
        //修改提交
        handChageSubmit(){
            if(!this.updateInfo.riskReason){
                 this.$Message.error('风险原因不能为空')
                return false
            }
             let requestData={
                hallno:this.updateInfo.hallno,
                boothno:this.updateInfo.boothno,
                uuid:this.updateInfo.uuid,
                riskReason:this.updateInfo.riskReason
            }
            publicInter(interfaceUrl.updateRiskBooth,requestData).then(res=>{
                if(res == 1){
                   this.$Message.success('修改成功')
                   this.$refs.chageformValidate.resetFields()
                   this.updateModal = false
                   this.updateInfo.uuid = ''
                   this.queryRiskList(1)
                   }
                })
        },
        closeModal(){
            this.uploadModal = false
            this.$refs.formValidate.resetFields()
            this.formModal.uuid = ''
        },
        closeUpdateModal(){
            this.updateModal = false
            this. formModal = {
                hallno:'', //展馆号
                boothno:'', //展位号
                //riskLevel:'',//风险级别
                riskReason:'', //风险原因
                uuid:''
            },
            this.formModal.uuid = ''
        },
        openUploadModal(){
            this.$refs.uploadModal.openModal()
        },
        //分页函数
        pageChange(page){
            this.numPage = page
            this.queryRiskList(page)
        },
        //展馆改变函数
        zgChange(value){
            if(value){
             publicInter(interfaceUrl.qryBoothnoByHall, {hallno: value}).then( r => {
                this.zwList = r.list
             })
            }  
        },
        //展位模糊查询
        queryZwh(value){
            let data ={
                hallno:this.formModal.hallno,
                boothno: value
            }
            publicInter(interfaceUrl.qryAllBoothno,data).then(res=>{
               
                    this.zwList = res.list
            })
        },
        handSubmit(){
            this.$refs.formValidate.validate((valid)=>{
                if(valid){
                    //修改提交
                    if(this.formModal.uuid){
                        let requestData={
                            hallno:this.formModal.hallno,
                            boothno:this.formModal.boothno,
                            uuid:this.formModal.uuid,
                            riskReason:this.formModal.riskReason
                        }
                        
                        publicInter(interfaceUrl.updateRiskBooth,requestData).then(res=>{
                            if(res == 1){
                                this.$Message.success('修改成功')
                                this.$refs.formValidate.resetFields()
                                this.uploadModal = false
                                this.formModal.uuid = ''
                                this.queryRiskList(1)
                           }
                        })
                    }else{
                    // 添加提交
                      let requestData = {
                        hallno:this.formModal.hallno,
                        boothno:this.formModal.boothno,
                        riskReason:this.formModal.riskReason,
                     }
                    publicInter(interfaceUrl.addRiskBooth,requestData).then(res=>{
                        if(res == 1){
                            this.$Message.success('添加成功')
                            this.$refs.formValidate.resetFields()
                            this.uploadModal = false
                            this.queryRiskList(1)
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
        //查询重点关注列表
        queryRiskList(page){
            this.queryData.pageNum = page
            let requestData = this.queryData
          publicInter(interfaceUrl.queryAllRiskBooth,requestData).then(res=>{
              this.total = (res.total)*1
              this.riskList = res.list
          })
        },
        //重点关注删除
        confirmDelete(params){
            publicInter(interfaceUrl.delRiskBooth,{uuid:params.uuid}).then(res=>{
              this.$Message.success('删除成功')
              this.queryRiskList(1)
          })
        },
        //修改弹出框
        openModal(params){
             this.updateModal = true
             this.updateInfo.hallno = params.hallno
             this.updateInfo.boothno = params.boothno
             this.updateInfo.uuid = params.uuid
             this.updateInfo.riskReason = params.riskReason
        }
    },
    mounted(){
       this.queryRiskList(1)
       this.queryZglist()
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
.ivu-page{
    text-align: center;
    margin-top: 20px;
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