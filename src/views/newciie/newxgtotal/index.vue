<template>
    <div class="taglist">
          <Row style="border-bottom:2px solid #ccc">
            <Col span="24"><h2>巡馆统计查询</h2></Col>
        </Row>
          <div class="query" >
            <div class="copName"> 日期区间：  <DatePicker   type='daterange' placeholder='请选择日期区间' @on-change = startTimne style="width:200px"></DatePicker></div>
            <!-- <div class="uscCode"> 审核状态：<Select style="width:60%" v-model="status"><Option value="">全部状态</Option><Option value="0">待审核</Option> <Option value="1"> 审核通过</Option><Option value="2"> 审核拒绝</Option></Select></div> -->
            <Button type="primary" size='large' @click="queryData(1)" style="margin-left: 20px;">查 询</Button>
            <Button type="primary" size='large' @click="exportExcel" style="margin-left: 20px;">导 出</Button>
      </div>
       <div style='margin-top:20px'>
             <Table border :columns="columns" class="self" :data="callData"></Table>
                <Page 
                    :total="total" 
                    :page-size='10'
                    @on-change='pageChange'
                    show-total
                />
         </div>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";


export default {
     data() {
        return {
            callData:[],
            total: 0,
            detailData: {},
            numPage:1,
            columns: [
                {
                    title:'序号',
                    align:'center',
                    width: 80,
                    render:(h,params,index)=>{
                          return h('span',(params.index + (this.numPage - 1) * 10 )+1)
                    }
                },
                {
                    title:'关员号',
                    key:'USERID',
                    align:'center',
                    width: 160
                },
                {
                    title:'日期',
                    key:'DT',
                    align:'center'
                },
                {
                    title:'扫码次数',
                    key:'ANUM',
                    align:'center',
                },
                {
                    title:'正常展台数',
                    key:'BNUM',
                    align:'center',
                },
                {
                    title:'异常展台数',
                    key:'CNUM',
                    align:'center',
                },
                {
                    title:'呼叫响应数',
                    align:'center',
                    key:'ENUM',
                },
            ],
            startDate:'',
            endDate:''
        }
    },
     methods: {
        startTimne(e){
            this.startDate = e[0]
            this.endDate = e [1]
        },
        //导出excel
       exportExcel(){
            let startDate = this.startDate.length > 0 ? this.startDate :''
            let endDate = this.endDate.length > 0 ? this.endDate :''
            let url = interfaceUrl.exportPactrolStatistics+'?startDate='+ startDate +'&endDate='+ endDate 

            let queryUrl = encodeURI(url)
            let newName = (new Date()).getTime()
            let excelName1 = newName +'.xls'
            filedownload(queryUrl,{}).then(r=>{
                        let url = window.URL.createObjectURL(new Blob([r]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download',excelName1 )
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    })
       },
       queryData(page){
        let requsetData ={
            startDate:this.startDate,
            endDate:this.endDate,
            pageSize:10,
            pageNum:page
        }
        publicInter(interfaceUrl.qryPactrolStatistics,requsetData).then(res=>{
            this.callData = res.list
            this.total = res.totalRow
        })
       },

       pageChange(page){
           this.numPage = page
           this.queryData(page)
       }
        
    },
    mounted() {
        this.queryData(1)
    },
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
   .ivu-page{
    text-align: center;
    margin-top: 20px;
}
    
}  

</style>