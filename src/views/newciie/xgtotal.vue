<template>
    <div class="call-record">

        <Row style="margin-bottom:10px; text-align:left;margin-bottom:20px">       
            <span class="labelText">日期区间:</span>
            <DatePicker  class="customDatePicker" type='daterange' placeholder='请选择日期区间' @on-change = startTimne style="width:200px"></DatePicker>
           
           
            <Button type="primary" size='large' @click="queryData(1)" style="margin-left: 20px;">查 询</Button>
            <Button type="primary" size='large' @click="exportExcel" style="margin-left: 20px;">导 出</Button>
        </Row>
        <Table border :columns="columns" class="customTable" :data="callData"></Table>
        <Page 
            :total="total" 
            :page-size='10'
            @on-change='pageChange'
            show-total
            class="customPage"
        />

     
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
.labelText{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    font-size:1rem;
}
.call-record {
    width: 100%; 
    height: 100%;
}
.modal-header {
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    font-size: 1.25rem;
    color: #fff;
    img {
        vertical-align: middle;

    }
    
}
.modal-content {
    width: 90%;
    margin: 0 5%;
    .modal-row {
        border: 1px solid rgba(255,255,255,0.15);
        font-size: 1rem;
        color: #fff;
        line-height: 3rem;
        height: 3rem;
        .col-name {
            background: #1741A6
        }
        .ivu-col {
            text-align: center
        }
    }
}
.answer-msg {
    margin-top: 1rem;
    height: 40px;
    display: flex;
    img {
        height: 40px;
        width: 40px;
    }
    span {
        display: block;
    }
    .answer-user {
        font-size: 18px;
        color: #fff
    }
    .answer-time {
        font-size: 12px;
        color: #fff;
        opacity: 0.6;
    }
}
.answer-desc {
    margin-top: 1rem;
    color: #fff;
    font-size: 14px;
}
.no-answer {
    margin-top: 1rem;
    font-size: 18px;
    color: #fff;
    opacity: 0.6;
    text-align: center
}
</style>
