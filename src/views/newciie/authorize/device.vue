<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="12"><h2>设备备案信息列表</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 用户名称：<Input size="large" placeholder="请输入用户名称" style="width:60%" v-model="queryData.userName"/></div>
            <div class="copName"> MAC地址：<Input size="large" placeholder="请输入MAC地址" style="width:60%" v-model="queryData.deviceMac"/></div>
            <div class="copName"> 设备名称：<Input size="large" placeholder="请输入设备名称" style="width:60%" v-model="queryData.deviceName"/></div>
            <div class="copName"> 设备IP：<Input size="large" placeholder="请输入设备IP" style="width:60%" v-model="queryData.deviceIp"/></div>
            <Button type='primary'  @click="querydatalist(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type='primary'  @click="addData()" style="margin-right:30px;width:100px">新  增</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='dataList' class="self">
                
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
                      <h3 v-if="queryFlag=='add'">新增设备信息</h3>
                      <h3 v-else>修改设备信息</h3>
                      <Form  :model="formModal" ref="formValidate" :label-width="100" style="margin-top:50px">
                          <!-- <FormItem label='设备ID：'  style="margin-bottom:25px">
                                <Input  v-model="formModal.diviceId" />
                            </FormItem> -->
                            <!-- <FormItem label='用户工号：'  style="margin-bottom:25px">
                                <Input  v-model="formModal.userid" />
                            </FormItem>
                            <FormItem label='用户名称：'  style="margin-bottom:25px">
                                <Input  v-model="formModal.userName" />
                            </FormItem> -->
                            <FormItem label='MAC地址：'  style="margin-bottom:25px">
                               <Input  v-model="formModal.deviceMac" />
                            </FormItem>
                            <FormItem label='设备名称'  style="margin-bottom:25px">
                               <Input  v-model="formModal.deviceName" />
                            </FormItem>
                            <FormItem label='网络IP：'  style="margin-bottom:25px">
                               <Input  v-model="formModal.deviceIp" />
                            </FormItem>
                            <!-- <FormItem  label='办公点地址：'  style="margin-bottom:25px">
                               <Select v-model="selectedAddr" :label-in-value='true' @on-change="v=>{ addrSelected(v)}">
                                <Option v-for="item in officeAdd" :value="item.officeAddr" :key="item.officeId">{{item.officeAddr}}</Option>
                               </Select>
                            </FormItem> -->
                            <FormItem label='办公点名称：'  style="margin-bottom:25px">
                               <Select  v-model="selectOfficeId" :label-in-value='true' @on-change="v=>{ queryOfficeId(v)}" >
                                <Option v-for="item in officeNameSelect" :value="item.officeName" :key="item.officeId">{{item.officeName}}</Option>
                               </Select>
                            </FormItem>
                            <!-- <FormItem label='授权开始日期'  style="margin-bottom:25px">
                                <DatePicker  type='date' @on-change='resetDate' v-model="formModal.authorizeStartdate" label='授权开始日期：'>
                                </DatePicker>
                            </FormItem>
                            <FormItem label='授权结束日期'  style="margin-bottom:25px">
                                <DatePicker  type='date' @on-change='resetDate2' v-model="formModal.authorizeEnddate" label='授权结束日期：'>
                                </DatePicker>
                            </FormItem>
                            <FormItem label='用户状态：'  style="margin-bottom:25px">
                                <Select v-model="formModal.status">
                                    <Option value=0>正常</Option>
                                    <Option value=1>失效</Option>
                                </Select>
                            </FormItem> -->
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
            officeId:'',
            showFlag:true,
            fakeAddr:[{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:5,label:5},{value:4,label:4},],
            officeAdd:[],
            selectOfficeId:'',
            selectedAddr:'',
            officeNameSelect:[],
            queryFlag:'',
            statusModal:false,
            formModal:{
                userid:'',
                userName:'',
                deviceMac:'',
                deviceIp:'',
                deviceName:'',
                officeAddr:'',
                officeName:'',
                authorizeStartdate:'',
                authorizeEnddate:'',
                status:''
            },
            //分页数据
            total:0,
            numPage:1,
            queryData:{
                userName:'', 
                deviceMac:'',
                deviceName:'',
                deviceIp:'',
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
               
            //   {
            //     title:'用户工号',
            //     key:'userid',
            //     align:'center'
            //   },
            //   {
            //     title:'用户名称',
            //     key:'userName',
            //     align:'center'
            //   },
               {
                title:'MAC地址',
                key:'deviceMac',
                align:'center'
              },
              {
                title:'设备名称',
                key:'deviceName',
                align:'center'
              },
               {
                title:'网络IP',
                key:'deviceIp',
                align:'center',
                width:180
               
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
            //    {
            //     title:'授权开始日期',
            //     key:'authorizeStartdate',
            //     align:'center',
            //     width:150
            //   },
            //    {
            //     title:'授权结束日期',
            //     key:'authorizeEnddate',
            //     align:'center',
            //     width:150
               
            //   },
            //    {
            //     title:'状态',
            //     key:'status',
            //     align:'center',
            //     render:(h,params,index)=>{
            //             return h('span',(
            //                 params.row.status == 0?'正常':'失效'
            //             ))
            //         }
            //   },
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
                                              that.showFlag = false
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
        queryOfficeId(params){
            if(params){
                let requestData={
                officeName:params.label,
                // officeAddr:this.selectedAddr,
                pageNum:1,
                pageSize:30
            }
            publicInter(interfaceUrl.queryOfficeInfo,requestData).then(res=>{
                // console.log(res)
                this.officeId=res.list[0].officeId
                // this.total = (res.total)*1
            })
            }
            // console.log(this.officeId)

        },
        addrSelected(v){
                let requestData={
                officeName:'',
                officeAddr:'',
                pageNum:1,
                pageSize:30
                }
                publicInter(interfaceUrl.queryOfficeInfo,requestData).then(res=>{
                    this.officeNameSelect = res.list
                    // console.log(this.officeNameSelect)
                    // this.total = (res.total)*1
                })
            
        },
        resetDate(e){
            this.formModal.authorizeStartdate=e
        },
        resetDate2(e){
            this.formModal.authorizeEnddate=e
        },
        addData(){
            this.addrSelected()
            this.formModal={}
            this.statusModal = true
            this.queryFlag='add';
        },
        //分页函数
        pageChange(page){
            this.numPage = page
            this.querydatalist(page)
        },
       
        querydatalist(page){
            this.queryData.pageNum = page
            let requestData = this.queryData
          publicInter(interfaceUrl.searchDeviceInfo,requestData).then(res=>{
              this.dataList = res.list
              this.total = (res.total)*1
          })
        },
        updateStatus(params){
            this.addrSelected()
            this.statusModal = true
            this.selectOfficeId=params.officeName
            this.formModal = JSON.parse(JSON.stringify(params))
            this.queryFlag='update'
            
        },
        closeModal(){
            this.statusModal = false
            this.showFlag = true
        },
        handSubmit(){
            if(this.queryFlag=='update'){
                let requestData = this.formModal
                delete requestData.recUpdDt
                

                    let request={
                    officeName:requestData.officeName,
                    // officeAddr:this.selectedAddr,
                    pageNum:1,
                    pageSize:30
                }
                publicInter(interfaceUrl.queryOfficeInfo,request).then(res=>{
                    console.log(res)
                    requestData.officeId=res.list[0].officeId
                    // this.total = (res.total)*1
                })
                
                // requestData.officeId=this.officeId
                console.log('req',requestData)
                // return 0
                publicInter(interfaceUrl.updateDeviceInfo,requestData).then(res=>{
                    if(res){
                        this.$Message.success('更新成功')
                        this.statusModal = false
                        this.querydatalist(1)
                        this.selectedAddr=''
                        this.selectOfficeId=''
                    }
                })
            }else if(this.queryFlag=='add'){
                let requestData = this.formModal
                requestData.officeId=this.officeId
                // console.log('requestData',requestData)
                publicInter(interfaceUrl.addDeviceInfo,requestData).then(res=>{
                    if(res){
                        this.$Message.success('添加成功')
                        this.statusModal = false
                        this.querydatalist(1)
                        this.formModal={}
                        this.selectedAddr=''
                        this.selectOfficeId=''
                    }
                })
            }
          
        },
        //请求办公室
        queryOfficeList(){
            let requestData={
                officeName:'',
                officeAddr:'',
                pageNum:1,
                pageSize:30
            }
            publicInter(interfaceUrl.queryOfficeInfo,requestData).then(res=>{
                this.officeAdd = res.list
            })
        },
        delStatus(params){
            let request={deviceId:params.deviceId}
            publicInter(interfaceUrl.delDeviceInfo,request).then(res=>{
                this.$Message.success('删除成功')
                this.querydatalist(1)
                // this.total = (res.total)*1
            })
        },
    },
    created(){
         this.queryOfficeList()
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