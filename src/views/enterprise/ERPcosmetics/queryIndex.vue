<template>
<div class="queryERPsupplyChain">
    <h1>企业ERP食品化妆品上传信息查询</h1>

      <Tabs v-model='selectName'  class="agentCencus">
              <TabPane label="进口信息查询" name='name1'>
                  <Table border :columns = 'columns1' :data='data1' class="self">
                        <template  slot-scope="{row,index}" slot="action"> 
                        <Button type="error" size ='large'  @click="delone(index)">删除</Button>
                      </template>
                 </Table>
                <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />
                <!-- <div style="text-align:center;margin-top:16px">
                        <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button>
                </div>  -->
              </TabPane>

            <TabPane label="出口信息查询" name='name2'>
              <queryExport />
            </TabPane>

            <TabPane label="出口报关后信息查询" name = "name3">
                <queryExportBg />
            </TabPane>

    </Tabs>


           

   </div>
 </template>  
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import queryExportBg  from './queryExportBg'
 import queryExport  from './queryExport'
export default {
  components:{
     queryExportBg,queryExport
  },
  data(){
      return{
        selectName:'name1',
          columns1:[
              {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'企业名称',
              key:'COMPANYNAME',
              width:'200',
              align:'center'
             },
              {
              title:'企业地址',
              key:'ADDRESS',
              width:200,
              align:'center'
             },
              {
              title:'收货仓库地址',
              key:'REWADDRESS',
              width:200,
              align:'center',
             },
             {
              title:'报关单编号',
              key:'BILLNO',
              width:200,
              align:'center',
             },
              {
              title:'报关单项号',
              key:'CUSTOMSDECNO',
              width:200,
              align:'center',
             },
             {
              title:'报关状态',
              key:'STATUS',
              width:200,
              align:'center',
             },
             {
              title:'进口日期',
              key:'IMDATE',
              width:200,
              align:'center',
             },
             {
              title:'申报地海关',
              key:'DECLARECUSTOM',
              width:210,
              align:'center',
             },
             {
              title:'合同协议',
              key:'AGREEMENT',
              width:200,
              align:'center',
             },
             {
              title:'进境关别',
              key:'EMERGENCYSHUTOFF',
              width:200,
              align:'center',
             },
             {
              title:'境内收发货人社会信用代码',
              key:'CNCOMPANYCODE',
              width:200,
              align:'center',
             },
             {
              title:'境内收发货人',
              key:'TERRITORYNAME',
              width:200,
              align:'center',
             },
              {
              title:'境外收发货人',
              key:'ABROADNAME',
              width:200,
              align:'center',
             },
             {
              title:'申报单位名称',
              key:'NAMEOFAPPLICANT',
              width:200,
              align:'center',
             },
              {
              title:'启运港',
              key:'PORTOFDEPARTURE',
              width:200,
              align:'center',
             },
             {
              title:'入境口岸',
              key:'PORTOFENTRY',
              width:200,
              align:'center',
             },
              {
              title:'货物存放地点',
              key:'STORAGEOFGOODS',
              width:200,
              align:'center'
             },
              {
              title:'运输方式',
              key:'TRANSPORT',
              width:200,
              align:'center',
             },
             {
              title:'征免性质',
              key:'NATUREOFEXEMPTION',
              width:200,
              align:'center',
             },
              {
              title:'包装种类',
              key:'PACKAGETYPE',
              width:200,
              align:'center',
             },
             {
              title:'贸易国别',
              key:'TRADECOUNTRY',
              width:200,
              align:'center',
             },
             {
              title:'监管方式',
              key:'SUPERVISIONMODE',
              width:200,
              align:'center'
             },
              {
              title:'经停港',
              key:'STOPOVER',
              width:200,
              align:'center',
             },
             {
              title:'商品名称',
              key:'GOODSNAME',
              width:200,
              align:'center',
             },
             {
              title:'进口数量',
              key:'IMPORTNUM',
              width:200,
              align:'center',
             },
              {
              title:'单位',
              key:'UNIT',
              width:200,
              align:'center',
             },
              {
              title:'操作',
              slot:'action',
              width:200,
              align:'center',
              fixed:'right'
            }
          ],
          data1:[],
          total1:0,
          isdisabled1:true,
      }
  },
  mounted(){
      this.queryInfoFirst(1);
     
  },
  methods:{
    //化妆品erp导出
    // exporeTrade(){
    //   let url = interfaceUrl.exporeMaquillage;
    //   filedownload(url,{}).then(r=>{
    //                 let url = window.URL.createObjectURL(new Blob([r]))
    //                 let link = document.createElement('a')
    //                 link.style.display = 'none'
    //                 link.href = url
    //                 link.setAttribute('download', '企业化妆品ERP.xlsx')
    //                 document.body.appendChild(link)
    //                 document.body.appendChild(link)
    //                 link.click()
    //                 document.body.removeChild(link)
    //             })
    // },
      delone(index){
        console.log(index)
       this.$Modal.confirm({
         title:"提示",
         content:'您确认删除这条内容吗？',
        onOk:()=>{
        let data = {
            UUID:this.data1[index].UUID
        };
        publicInter(interfaceUrl.delMaquillage,data).then(r=>{
               this.$Message.success('删除成功')
               this.data1.splice(index,1)
               this.queryInfoFirst()
            })
         }
       })
      },
      queryInfoFirst(page){
        let pageNum = page
          let data = {
              pageSize:20,
              pageNum
              };
         publicInter(interfaceUrl.queryMaquillage,data).then(r=>{
           console.log(r)
            if(r.totalRow > 0){
              this.data1 = r.list
              this.total1 = r.totalRow
              this.isdisabled1 = false
            }else{
              this.isdisabled1 = true
             }
           })
      },
         changePage1(page){
            this.queryInfoFirst(page)
        },
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChain{
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .list{
        margin-top: 20px;
        height: 170px;
        width: 100%;
        box-shadow:  0 0 10px 0 rgba(45, 140, 240, 0.5);
        border:1px solid #ccc;
        h2{
            margin: 10px 0 10px 20px;
        }
        .ivu-table-wrapper{
            margin: 10px 20px;
        }
      
    }
    .ivu-modal-body{
      .alert{
        li{
          display: flex;
        }
      }
    }
    .ivu-modal-mask{
         background-color: rgba(0, 0, 0, 0.3)
    }
    
     .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
    .ivu-form-item {
    margin-bottom: 0;
    vertical-align: top;
    zoom: 1;
}
 }
</style>
