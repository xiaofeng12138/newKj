<template>
    <div>
       <div id="loading" v-show ='isSpinShow'> 
           <Icon type = "ios-loading" size = '100' class="demo-spin-icon-load"></Icon>
            <p>数据请求中...</p>
         </div>
       <div class="query" >
            <div class="Time">  进出口时间（区间）：<DatePicker size="large"  type="daterange" transfer  @on-change="Time = $event" format='yyyy/MM/dd' placeholder="请选择进出口时间区间" v-model="Time" style="width:60%"></DatePicker></div>
            <div class="uscCode"> 请选择类型：<Select style="width:50%" v-model="type"><Option value="I">进口</Option> <Option value="E"> 出口</Option></Select></div>
            <Button type='primary' size='large' @click="query">查询</Button>
           </div>
         <Table border :columns = 'columns' :data='data' class="self">
         </Table>
         <Page :total="total" :page-size=20 @on-change="changePage" show-total />
           
          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeIESea" :disabled="isdisabled">导出Excel</Button> -->
         </div>
         
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
export default {
    data(){
        return{
            data:[],
            isSpinShow:false,
            columns:[
                 {
                    title:'序号',
                    align:'center',
                    width:'100',
                    key:'NUM'
                },
                {
                    title:'发送方账号',
                    align:'center',
                    key:'MSENDER'
                },
                {
                    title:'公司名称',
                    align:'center',
                    key:'CNNAME'
                },
                {
                    title:'提单条数',
                    align:'center',
                    key:'NU'
                }
            ],
            total:0,
            type:"",
            isdisabled:true,
            Time:'',
            name:'',
            params:{
                page:1,
                pageSize:20,
            }
        }
    },
  
    methods:{
        query(){
           if(this.type == ""){
            this.$Message.error('请选择进出口类型')
           }else{
             let startDate = this.Time[0].replace(/\//g,"");
             let endDate = this.Time[1].replace(/\//g,"");
             let IEFlag = this.type;
             let pageNum = 1;
             this.isSpinShow= true;
             let data = {
               pageNum,
               pageSize:20,
               startDate,
               endDate,
               IEFlag
            }
             publicInter(interfaceUrl.queryIESeaMessage,data).then(r=>{
              if(r.list.length > 0){
                this.data = r.list
                this.isdisabled = false
                this.total = r.totalRow
                this.isSpinShow= false;
              }else{
               this.$Message.error('未查询到数据')
               this.isSpinShow= false
               this.data = r.list
               this.total = r.totalRow
               this.isdisabled = true
              }
            })
           }
        },
    
        changePage(page){
           let startDate = this.Time[0].replace(/\//g,"");
             let endDate = this.Time[1].replace(/\//g,"");
             let IEFlag = this.type;
             let pageNum = page;
             this.isSpinShow= true;
             let data = {
               pageNum,
               pageSize:20,
               startDate,
               endDate,
               IEFlag
            }
             publicInter(interfaceUrl.queryIESeaMessage,data).then(r=>{
              if(r.list.length > 0){
                this.data = r.list
                this.isdisabled = false
                this.total = r.totalRow
                this.isSpinShow= false;
              }else{
               this.$Message.error('未查询到数据')
               this.isSpinShow= false
               this.data = r.list
               this.total = r.totalRow
               this.isdisabled = true
              }
            })
        },

        exporeIESea(){
          let startDate = this.Time[0].replace(/\//g,"").length > 0  ? this.Time[0].replace(/\//g,"") :'';
          let endDate = this.Time[1].replace(/\//g,"").length > 0 ? this.Time[1].replace(/\//g,""):'';
          let IEFlag = this.type;

          let url = interfaceUrl.exporeIESea+'?startDate='+ startDate +'&endDate='+endDate +'&IEFlag='+IEFlag 
          if((startDate & endDate)){
            this.name = startDate +'--'+ endDate +'企业海运进出口查询.xlsx'
          }else{
            this.name = '企业海运进出口查询.xlsx'
          }
        filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', this.name)
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })

        }
    }
}
</script>
<style lang="scss">
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
    



