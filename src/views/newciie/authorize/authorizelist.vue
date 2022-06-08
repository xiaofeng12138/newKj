<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>用户备案信息列表</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 用户工号:<Input size="large" placeholder="请输入用户工号" style="width:60%" v-model="queryData.userid"/></div>
            <div class="copName"> 用户名称：<Input size="large" placeholder="请输入用户名称" style="width:60%" v-model="queryData.userName"/></div>
            <div class="copName"> MAC地址<Input size="large" placeholder="请输入MAC地址" style="width:60%" v-model="queryData.deviceMac"/></div>
            <div class="copName"> 办公点名称：<Input size="large" placeholder="请输入办公点名称" style="width:60%" v-model="queryData.officeName"/></div>
            <div class="copName"> 办公点地址<Input size="large" placeholder="请输入办公点地址" style="width:60%" v-model="queryData.officeAddr"/></div>
            <Button type='primary'  @click="querydatalist(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type='primary'  @click="addData()" style="margin-right:30px;width:100px">新  增</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='dataList' class="self">
                <!-- <template  slot-scope="{row}" slot="action"> 
                    <Button type="primary"  @click="updateStatus(row)">修改</Button>
                    <Button type="error"  @click="del(row)">删除</Button>
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
                      <h3 v-if="queryFlag=='update'">修改用户信息</h3>
                      <h3 v-if="queryFlag=='add'">新增用户信息</h3>
                      <Form  :model="formModal" ref="formValidate" :label-width="100" style="margin-top:50px">
                            <FormItem label='用户工号：'  style="margin-bottom:25px">
                                <Input  v-model="formModal.userid" />
                            </FormItem>
                            <FormItem label='用户名称：'  style="margin-bottom:25px">
                                <Input  v-model="formModal.userName" />
                            </FormItem>
                            <FormItem label='设备名称：'  style="margin-bottom:25px">
                               <Select v-model="selectedMac" :label-in-value='true' @on-change="v=>{ queryDevice(v)}">
                                   <Option  v-for="item in deviceSelect" :value="item.deviceMac" :key="item.deviceId">{{item.deviceName}}</Option>
                               </Select>
                            </FormItem>
                            <FormItem label='授权开始日期'  style="margin-bottom:25px">
                                <DatePicker  type='date' v-model="formModal.authorizeStartdate" label='授权开始日期：'>
                                </DatePicker>
                            </FormItem>
                            <FormItem label='授权结束日期'  style="margin-bottom:25px">
                                <DatePicker  type='date' v-model="formModal.authorizeEnddate" label='授权结束日期：'>
                                </DatePicker>
                            </FormItem>
                            <FormItem label='用户状态：'  style="margin-bottom:25px">
                                <Select v-model="formModal.status">
                                    <Option value=0>正常</Option>
                                    <Option value=1>失效</Option>
                                </Select>
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



export default {
    data() {
        return {
            queryFlag:'',
            statusModal:false,
            formModal:{},
            deviceSelect:[],
            selected:'',
            selectedMac:'',
            queryId:'',
            authList:[],
                //分页数据
            total:0,
            numPage:1,
            queryData:{
                userid:'', 
                userName:'', 
                deviceMac:'',
                officeName:'',
                officeAddr:'',
                authorizeStartdate:'',
                authorizeEnddate:'',
                status:'',
                pageNum:1,
                pageSize:10,
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
                title:'用户工号',
                key:'userid',
                align:'center'
              },
              {
                title:'用户名称',
                key:'userName',
                align:'center'
              },
              {
                title:'设备名称',
                key:'deviceName',
                align:'center'
              },
               {
                title:'MAC地址',
                key:'deviceMac',
                align:'center'
              },
               {
                title:'网络IP',
                key:'deviceIp',
                align:'center',
               
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
                title:'授权开始日期',
                key:'authorizeStartdate',
                align:'center'
              },
               {
                title:'授权结束日期',
                key:'authorizeEnddate',
                align:'center',
               
              },
               {
                title:'状态',
                key:'status',
                align:'center',
                render:(h,params,index)=>{
                        return h('span',(
                            params.row.status == 0?'正常':'失效'
                        ))
                    }
              },
              {
                title:'操作',
                align:'center',
                width:200,
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
                                                that.del(params.row)
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
        del(params){
            let request={uuid:params.uuid}
            publicInter(interfaceUrl.delAuthorInfo,request).then(res=>{
                if(res){
                    this.$Message.success('删除成功')
                    this.querydatalist(1)
                }

            })
        },
        querySelectlist(){
            let requestData = {
                userName:'',
                deviceMac:"",
                deviceIp:'',
                pageNum:'1',
                pageSize:30,
            }
          publicInter(interfaceUrl.searchDeviceInfo,requestData).then(res=>{
              this.deviceSelect = res.list
            //   this.total = (res.total)*1
          })
        },
        querySelect(){
            let requestData = {
                userName:'',
                deviceMac:this.selected,
                deviceIp:'',
                pageNum:'1',
                pageSize:30,
            }
          publicInter(interfaceUrl.searchDeviceInfo,requestData).then(res=>{
              this.selectedMac=res.list[0].deviceId
            //   this.deviceSelect = res.list
            //   this.total = (res.total)*1
          })
        },
        queryDevice(params){
            let requestData = {
                userName:'',
                deviceMac:params.value,
                deviceIp:'',
                pageNum:'1',
                pageSize:30,
            }
            publicInter(interfaceUrl.searchDeviceInfo,requestData).then(res=>{
              this.queryId=res.list[0].deviceId
              this.formModal.deviceMac=res.list[0].deviceMac
            //   this.deviceSelect = res.list
            //   this.total = (res.total)*1
          })
            // this.querySelect()
        },
        queryAuthor(){
            let requestData ={
                userId:'',
                userName:''
            }
            publicInter(interfaceUrl.searchAuthor,requestData).then(res=>{
                if(res.length>0)
                for(let i =0;i<res.length;i++){
                    res[i].key=i
                    this.authList.push(res[i])
                }
            })
        },
        addData(){
            this.formModal={}
            this.selected=''
            this.statusModal = true
            this.queryFlag='add';
        },
        //分页函数
        pageChange(page){
            this.numPage = page
            this.querydatalist(page)
        },
       
        //查询重点关注列表
        querydatalist(page){
            this.queryData.pageNum = page
            let requestData = this.queryData
          publicInter(interfaceUrl.queryAllAuthorize,requestData).then(res=>{
              this.dataList = res.list
              this.total = (res.total)*1
          })
        },
        updateStatus(params){
            // this.formModal = params
            this.selectedMac=params.deviceMac
            // this.queryShowData()
            this.formModal = JSON.parse(JSON.stringify(params))
            this.formModal.uuid = params.uuid
            this.queryId=params.deviceId
            this.queryFlag='update'
            this.statusModal = true
        },
        closeModal(){
            this.statusModal = false
        },
        handSubmit(){
            if(this.queryFlag=='update'){
                let requestData = this.formModal
                delete  requestData.recUpdDt
                        // let request = {
                        //         userName:'',
                        //         deviceMac:this.formModal.deviceMac,
                        //         deviceIp:'',
                        //         pageNum:'1',
                        //         pageSize:30,
                        //      }
                        // publicInter(interfaceUrl.searchDeviceInfo,request).then(res=>{
                        //     console.log(res)
                        //     requestData.deviceId=res.list[0].deviceId
                        // })
                        requestData.deviceId=this.queryId
                publicInter(interfaceUrl.updateAuthorize,requestData).then(res=>{
                    if(res){
                        this.$Message.success('更新成功')
                        this.statusModal = false
                        this.querydatalist(1)
                        this.formModal={}
                    }
                })
            }else if(this.queryFlag=='add'){
                let requestData=this.formModal
                requestData.deviceId=this.queryId
                publicInter(interfaceUrl.addAuthorInfo,requestData).then(res=>{
                    this.$Message.success('添加成功')
                        this.statusModal = false
                        this.querydatalist(1)
                        this.formModal={}
                })
            }
          
        }
    },
    mounted(){
       this.querydatalist(1)
       this.querySelectlist()
       this.queryAuthor()
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