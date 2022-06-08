<template>
    <div class="taglist">
         <h2>电子保函列表</h2>
          <div class="query" >
            <div class="copName"> 担保号：<Input size="large" placeholder="请输入担保号" style="width:70%" v-model="guaranteeId"/></div>
            <!-- <div class="copName"> 标签名称：<Input size="large" placeholder="请输入标签名称" style="width:70%" v-model="lablename"/></div> -->
            <div class="copName"> 审核状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">暂存</Option> <Option value="1"> 提交</Option><Option value="2"> 审核通过</Option><Option value="3"> 审核拒绝</Option></Select></div>
            <Button type='primary'  @click="queryList(1)" style="margin-right:30px;width:100px">查  询</Button>
            <Button type='primary'  @click="inputFn" style="margin-right:30px;width:100px">录  入</Button>
           </div>
          <div style='margin-top:20px'>
            <Table border :columns = 'columns' :data='tableData' class="self">
            <template  slot-scope="{row}" slot="action"> 
                <template>
                    <!-- <Button type="primary" size ='large' style="margin-right:10px" @click="read(row)">下载</Button> -->
                    <Button type="primary" size ='large' style="margin-right:10px" @click="read(row)">查看</Button>
                    <Button v-if="row.status == 2 || row.status == 1 || row.status == 3" disabled type="error" size='large' @click="delFn(row)">删除</Button>
                    <Button v-else type="error" size='large' @click="delFn(row)">删除</Button>
                </template>
            </template>
        </Table>
          <Page :total="total" :page-size=10  @on-change="changePage1" show-total />
        </div>

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
                    <p>是否确认删除当前选中信息</p>
                </div>
                <div style="text-align:center">
                   <Button type='primary' size='large' @click="confirmModal = false" style="margin-right:20px">取消</Button> 
                   <Button type='primary' size='large' @click="confirmDelete">确定</Button>
                </div>
                <p slot="close"></p>
                <p slot="footer">
                </p>
                <!-- <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="InfoModal=false" size='30'/>
                </p> -->
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    data() {
        return {
            delguaranteeId:'',
            guaranteeId:'',
            status:'',
            tableData:[],
            total:0,
            numPage:1,
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
                title:'担保号',
                key:'guaranteeId',
                align:'center',
                width:150
                },
                {
                title:'担保企业名称',
                key:'guaranteeEpName',
                align:'center',
                width:200
                },
                {
                title:'担保机构名称',
                key:'guaranteeMechanismName',
                align:'center',
                width:200
                },
                {
                title:'单号企业海关注册登记号',
                key:'guaranteeEpCustomsId',
                align:'center',
                width:200
                },
                {
                title:'所属关区',
                key:'customsAreaCode',
                align:'center',
                width:200
                },
                {
                title:'担保方式',
                key:'guaranteeMode',
                align:'center',
                width:200
                },
                {
                title:'担保起始日期',
                key:'guaranteeStartDate',
                align:'center',
                width:200
                },
                {
                title:'担保结束日期',
                key:'guaranteeEndDate',
                align:'center',
                width:200
                },
                {
                title:'担保金额',
                key:'guaranteeAmount',
                align:'center',
                width:200
                },
                {
                title:'审批状态',
                key:'status',
                align:'center',
                width:200,
                render:(h,params)=>{
                    let tmpStr = "";
                            if(params.row.status == 0){
                                tmpStr="暂存";
                            }else if(params.row.status== 1){
                                tmpStr="提交";
                            }else if(params.row.status== 2){
                                tmpStr="同意";
                            }else if(params.row.status== 3){
                                tmpStr="拒绝";
                            }
                            return h('span',tmpStr)
                    }
                },
                {
                title:'拒绝原因',
                key:'refuseRes',
                align:'center',
                width:200
                },
                {
                title:'操作',
                slot:'action',
                align:'center',
                width:200,
                fixed:'right',
                }
            ],
            confirmModal:false
           
        }
    },
    methods:{
        //确认删除函数
        confirmDelete(){
         let data ={
              guaranteeId:this.delguaranteeId
         }
         publicInter(interfaceUrl.delGuarantee,data).then(res=>{
             this.$Message.success('删除成功')
             this.confirmModal = false
             this.queryList(1)
         })
        },
        delFn(row){
            console.log(row)
            this.delguaranteeId = row.guaranteeId
            this.confirmModal = true
        },
        read(row){
            console.log(row)
            let paramsData ={
                guaranteeId:row.guaranteeId, 
                guaranteeEpName:row.guaranteeEpName, 
                guaranteeEpCustomsId:row.guaranteeEpCustomsId, 
                customsAreaCode:row.customsAreaCode, 
                guaranteeMode:row.guaranteeMode, 
                guaranteeAmount:(row.guaranteeAmount).toString(), 
                guaranteeStartDate:row.guaranteeStartDate,
                guaranteeEndDate:row.guaranteeEndDate,
                file:'',
                status:row.status,
                filename:row.filename,
                fileid:row.fileid,
                filepath:row.filepath,
                guaranteeMechanismName:row.guaranteeMechanismName
            }
            this.$router.push({
                name:'record',
                params:{
                    id:paramsData
                }
            })
        },
        //录入函数
        inputFn(){
             let paramsData ={
                guaranteeId:'', 
                guaranteeEpName:'', 
                guaranteeEpCustomsId:'', 
                customsAreaCode:'', 
                guaranteeMode:'', 
                guaranteeAmount:'', 
                guaranteeStartDate:'',
                guaranteeEndDate:'',
                file:'',
                fileid:'',
                status:'',
                filename:''
            }
            this.$router.push({
                name:'record',
                params:{
                    id:paramsData
                }
            })
        },
        changePage1(page){
           this.numPage = page
           this.queryList(page)
        },
        queryList(page){
            let data ={
                  guaranteeId:this.guaranteeId,
                  status:this.status,
                  pageNum:page,
                  pageSize:10
            }
            publicInter(interfaceUrl.queryListForGuarantees,data).then(res=>{
                console.log(res)
                this.tableData = res.list
                this.total = (res.total)*1
            })
        },
    },
    mounted(){
         this.queryList(1)
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
        }
    .ivu-page{
      margin-top: 10px;
      text-align: center;
      margin-bottom: 20px;
    }
}
    
</style>