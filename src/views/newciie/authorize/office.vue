<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>备案办公点管理</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 办公点地址：<Input size="large" placeholder="请输入办公点地址" style="width:60%" v-model="queryData.officeAddr"/></div>
            <div class="copName"> 办公点名称：<Input size="large" placeholder="请输入办公点名称" style="width:60%" v-model="queryData.officeName"/></div>
            <Button type='primary'  @click="querydatalist(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type='primary'  @click="addData()" style="margin-right:30px;width:100px">新  增</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='dataList' class="self"> 
                <!-- <template  slot-scope="{row,index}" slot="action"> 
                    <Button type="primary"  @click="updateStatus(row)">修改</Button>
                    <Button type="error"  @click="delStatus(row)">删除</Button>
                </template> -->
            </Table>
         <Page :total="total"  :page-size='10' @on-change='pageChange' show-total />
        </div>
        <Modal
                v-model="statusModal"
                width="400"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="closeModal" size='30'/>
                </p>
                <div class="addModal">
                      <h3 v-if="subType=='add'">新增办公点信息</h3>
                      <h3 v-else>修改办公点信息</h3>
                      <Form  :model="formModal" ref="formModal" :rules='rule' :label-width="100" style="margin-top:50px">
                            <FormItem label='办公点地址：' prop='officeAddr' style="margin-bottom:25px">
                               <Input v-model="formModal.officeAddr" />
                            </FormItem>
                            <FormItem label='办公点名称：' prop='officeName' style="margin-bottom:25px">
                               <Input v-model="formModal.officeName" />
                            </FormItem>
                            <FormItem >
                                <Button type="primary" @click="handSubmit" size ='large' style="width:100px;margin-left:20px;margin-top:20px">提 交</Button>
                            </FormItem>
                      </Form>
                     
                </div>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import Tablepdf from './components/filelist'



export default {
    data() {
        return {
            statusModal:false,
            formModal:{
                officeAddr:'',
                officeName:''
            },
            subType:'',
            //分页数据
            total:0,
            numPage:1,
            rule:{
                officeAddr:[
                    {required:true,message:'必填',type:'string',trigger:'blur'},
                ],
                officeName:[{required:true,message:'必填',type:'string',trigger:'blur'}]
            },
            queryData:{
                officeName:'',
                officeAddr:'',
                pageNum:1,
                pageSize:10
            },
            dataList:[],
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
                title:'办公点ID',
                key:'officeId',
                align:'center'
              },
              {
                title:'办公点地址',
                key:'officeAddr',
                align:'center'
              },
               {
                title:'办公点名称',
                key:'officeName',
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
                                              that.updateStatus(params.row)
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
                                                that.delStatus(params.row)
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
        //分页函数
        pageChange(page){
            this.numPage = page
            this.querydatalist(page)
        },
        closeModal(){
            this.statusModal = false
        },
        querydatalist(page){
            this.queryData.pageNum = page
            let requestData = this.queryData
          publicInter(interfaceUrl.queryOfficeInfo,requestData).then(res=>{
              this.dataList = res.list
              this.total = (res.total)*1
          })
        },
        addData(){
            this.statusModal=true
            this.formModal={
                officeAddr:'',
                officeName:''
            }
            this.subType='add'
        },
        handSubmit(){
            console.log(this.$refs.formModal)
            // if(this.$refs[formModal])
            if(!this.$refs['formModal'].$props.model.officeAddr||!this.$refs['formModal'].$props.model.officeName){
                this.$Message.error('输入不能为空')
            }
           
            else{
                let requestData=this.formModal
            if(this.subType=='add')
            {
                console.log('requestData',requestData)
                publicInter(interfaceUrl.addOfficeInfo,requestData).then(res=>{
                if(res){
                    this.$Message.success('添加成功')
                    this.statusModal = false
                    this.querydatalist(1)
                    }
                })
                
            }else if(this.subType=='update'){
                console.log('requestData',requestData)
                delete requestData.recUpdDt
                publicInter(interfaceUrl.updateOfficeInfo,requestData).then(res=>{
                    if(res){
                        this.$Message.success('修改成功')
                        this.statusModal = false
                        this.querydatalist(1)
                    }
                })
            }
            }
            
            
        },
        delStatus(params){
            console.log(params.officeId)
            let request={officeId:params.officeId}
            console.log(request)
            publicInter(interfaceUrl.delOfficeInfo,request).then(res=>{
                    if(res){
                        console.log(res)
                        this.$Message.success('删除成功')
                        this.querydatalist(1)
                    }
                })
        },
        updateStatus(params){
            this.statusModal=true
            this.formModal=JSON.parse(JSON.stringify(params))
            console.log(this.formModal)
            this.subType='update'
        },
    },
    mounted(){
       this.querydatalist(1)
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
      margin: auto;
      h3{
          text-align: center;
          margin-bottom: 10px;
      }
    }

</style>