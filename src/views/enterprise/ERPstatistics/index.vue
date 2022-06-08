<template>
<div class="queryERPsupplyChainall">
    <h1>企业信息查询与统计</h1>
    <Tabs  class="agentCencus">
         <TabPane label="企业注册情况查询" >
           <div class="query" >
            <div class="copName"> 海关十位代码：<Input size="large" placeholder="请输入海关十位代码" style="width:60%" v-model="hgCode"/></div>
            <div class="copName"> 企业中文名称：<Input size="large" placeholder="请输入企业名称" style="width:60%" v-model="copName1"/></div>
            <div class="Time">  企业注册平台时间（区间）：<DatePicker size="large"  type="daterange" transfer  @on-change="Time1 = $event" format='yyyy/MM/dd' placeholder="请选择日期区间" v-model="Time1" style="width:60%"></DatePicker></div>
            <div class="uscCode"> 企业统一信用代码：<Input size="large" placeholder="请输入企业统一信用代码" style="width:60%" v-model="uscCode1"/></div>
            <Button type='primary' size='large' @click="queryRegisterMessage">查询</Button>
           </div>
         <Table border :columns = 'columns1' :data='data1' class="self">
         </Table>
         <Page :total="total1" :page-size=20 @on-change="changePage1" show-total  />
           
          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeRegister" :disabled="isdisabled1">导出Excel</Button> -->
         </div>
      </TabPane>

       <TabPane label="企业ERP数据传输统计">
           <div class="query" >
            <div class="copName"> 企业中文名称：<Input size="large" placeholder="请输入企业名称" style="width:60%" v-model="copName2"/></div>
            <div class="Time">  数据传输时间（区间）：<DatePicker size="large"  type="daterange" transfer  @on-change="Time2 = $event" format='yyyy/MM/dd' placeholder="请输入数据传输日期区间" v-model="Time2" style="width:60%"></DatePicker></div>
            <div class="uscCode"> 企业统一信用代码：<Input size="large" placeholder="请输入企业统一信用代码" style="width:60%" v-model="uscCode2"/></div>
            <Button type='primary' size='large' @click="queryErpMessage">查询</Button>
           </div>
         <Table border :columns = 'columns2' :data='data2' class="self" >
         </Table>
             <Page :total="total2"  :page-size=20 @on-change="changePage2" show-total />
         <div style="text-align:center;margin-top:16px">
          <!-- <Button type="primary" size='large' @click="exporeRegister2" :disabled="isdisabled2">导出Excel</Button> -->
        </div>
      </TabPane>

       <TabPane label="重点企业传输导入">
          <importance />
       </TabPane>

      <TabPane label="企业海运进出口查询">
        <sea />
     </TabPane>

     <TabPane label="企业空运查询">
        <air />
     </TabPane>

     </Tabs>
    </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import sea from './seaTransportation'
 import air from './airTransportation'
 
 import importance from './importance'


 
export default {
    components:{
      sea,air,importance
    },
  data(){
      return{
        isSpinShow:true,
          columns1:[
              {
              title:'序号',
              key:'NUM',
                width:'100',
              align:'center'
             },
              {
              title:'海关十位代码',
              key:'CNCOMPANYOLDCODE',
              align:'center',
             },
              {
              title:'社会统一信用代码',
              key:'CNCOMPANYCODE',
              align:'center',
             },
              {
              title:'企业中文名称',
              key:'NAMECHINESE',
              align:'center',
            },{
              title:'注册时间',
              key:'RECUPDDT',
              align:'center',
            },{
              title:'企业类型',
              key:'ROLECODE',
              align:'center',
            }
          ],
           columns2:[
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
          data1:[],
          data2:[],
          hgCode:"",
          copName1:'',
          Time1:'',
          uscCode1:'',
          total1:0,
          name1:'',

          parmas1:{
             page:1,
             pageSize:20,
          },
           parmas2:{
             page:1,
             pageSize:20,
          },

          copName2:'',
          Time2:'',
          uscCode2:'',
          isdisabled1:true,
          isdisabled2:true,
          total2:0,
           name2:'',
      }
  },
  methods:{
    
      //企业情况查询
      queryRegisterMessage(){
          let pageNum = 1;
          let nameChinese = this.copName1;
          let startDate = this.Time1[0].replace(/\//g,"");
          let endDate = this.Time1[1].replace(/\//g,"");
          let cncompanycode = this.uscCode1;
          let cncompanyoldcode = this.hgCode
          let data ={
              pageNum:pageNum,
              nameChinese:nameChinese,
              startDate:startDate,
              endDate:endDate,
              cncompanycode:cncompanycode,
              cncompanyoldcode:cncompanyoldcode
          }
           publicInter(interfaceUrl.queryRegisterMessage,data).then(r=>{
              if(r.list.length > 0){
                this.data1 = r.list
                this.isdisabled1 = false
                this.total1 = r.totalRow
              }else{
               this.$Message.error('未查询到数据')
               this.data1 = r.list
               this.total1 = r.totalRow
               this.isdisabled1 = true
              }
            })
      },

     //分页功能
      changePage1(page){
       let pageNum = page;
          let nameChinese = this.copName1;
          let startDate = this.Time1[0].replace(/\//g,"");
          let endDate = this.Time1[1].replace(/\//g,"");
          let cncompanycode = this.uscCode1;
          let data ={
              pageNum:pageNum,
              nameChinese:nameChinese,
              startDate:startDate,
              endDate:endDate,
              cncompanycode:cncompanycode
          }
           publicInter(interfaceUrl.queryRegisterMessage,data).then(r=>{
              if(r.list.length > 0){
                this.data1 = r.list
                this.isdisabled1 = false
                this.total1 = r.totalRow
              }else{
               this.$Message.error('未查询到数据')
               this.data1 = r.list
               this.total1 = r.totalRow
               this.isdisabled1 = true
              }
            })
      },

      //企业情况导出
      exporeRegister(){
          let nameChinese = this.copName1.length > 0 ? this.copName1 :'';
          let startDate = this.Time1[0].replace(/\//g,"").length > 0  ? this.Time1[0].replace(/\//g,"") :'';
          let endDate = this.Time1[1].replace(/\//g,"").length > 0 ? this.Time1[1].replace(/\//g,""):'';
          let cncompanycode = this.uscCode1.length > 0  ? this.uscCode1 :'';
         
          let url = interfaceUrl.exporeRegister+'?nameChinese='+ nameChinese +'&startDate='+ startDate +'&endDate='+endDate +'&cncompanycode='+cncompanycode 
          if((startDate & endDate)){
            this.name1 = startDate +'--'+ endDate +'企业注册情况查询.xlsx'
          }else{
            this.name1 = '企业注册情况查询.xlsx'
          }
        filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.name1)
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
      },

       // 企业ERP查询
       queryErpMessage(){
          let pageNum = 1
          let nameChinese = this.copName2;
          let startDate = this.Time2[0].replace(/\//g,"");
          let endDate = this.Time2[1].replace(/\//g,"");
          let cncompanycode = this.uscCode2;
          
        let data ={
              pageNum:pageNum,
              nameChinese:nameChinese,
              startDate:startDate,
              endDate:endDate,
              cncompanycode:cncompanycode
          }
         publicInter(interfaceUrl.queryErpMessage,data).then(r=>{
                if(r.list.length > 0){
                this.data2 = r.list
                this.isdisabled2 = false
                this.total2 = r.totalRow
              }else{
               this.$Message.error('未查询到数据')
                this.data2 = r.list
                this.total2 = r.totalRow
                 this.isdisabled2 = true
              }
            })
      },

       changePage2(page){
         let pageNum = page
          let nameChinese = this.copName2;
          let startDate = this.Time2[0].replace(/\//g,"");
          let endDate = this.Time2[1].replace(/\//g,"");
          let cncompanycode = this.uscCode2;
          
        let data ={
              pageNum:pageNum,
              nameChinese:nameChinese,
              startDate:startDate,
              endDate:endDate,
              cncompanycode:cncompanycode
          }
         publicInter(interfaceUrl.queryErpMessage,data).then(r=>{
                if(r.list.length > 0){
                this.data2 = r.list
                this.isdisabled2 = false
                this.total2 = r.totalRow
              }else{
               this.$Message.error('未查询到数据')
                this.data2 = r.list
                this.total2 = r.totalRow
                 this.isdisabled2 = true
              }
            })
      },
       //企业ERP查询导出
      exporeRegister2(){
          let nameChinese = this.copName2.length > 0 ? this.copName2 :'';
          let startDate = this.Time2[0].replace(/\//g,"").length > 0  ? this.Time2[0].replace(/\//g,"") :'';
          let endDate = this.Time2[1].replace(/\//g,"").length > 0 ? this.Time2[1].replace(/\//g,""):'';
          let cncompanycode = this.uscCode2.length > 0  ? this.uscCode2 :'';
          // console.log(startDate,endDate)
          let url = interfaceUrl.exporeErp +'?nameChinese='+ nameChinese +'&startDate='+ startDate +'&endDate='+endDate +'&cncompanycode='+cncompanycode 
         if((startDate & endDate)){
            this.name2 = startDate +'--'+ endDate +'企业ERP查询.xlsx'
          }else{
            this.name2 = '企业ERP查询.xlsx'
          }
        filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.name2)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
      }
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChainall{
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
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
    .query{
      width: 100%;
      display: flex;
      margin-bottom: 20px;
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
    }
    
  
 }
</style>
