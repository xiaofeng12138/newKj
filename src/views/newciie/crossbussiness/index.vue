<template>
    <div>
         <Table  border :columns = 'columns' :data='showdbTable' class="customTable" style="margin-top:20px" ></Table>
            <Page
                    :total="total"
                    v-show="total"
                    show-total
                    class="customPage"
                    @on-change="changePage"
                >
            </Page>
     
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload ,publicGetInter} from "@/api/http";
export default {
    data() {
        return {
            showdbTable:[],
            flag: false,
            total: 0,
            detailData: {},
            numPage:1,
            columns: [
               {
                title: "序号",
                key: "RN",
                align:'center',
                width:80
                },
                {
                title: "报关单号",
                key: "ENTRY_ID",
                align:'center',
                },
                {
                title: "商品名称",
                key: "G_NAME",
                 align:'center',
                },
                 {
                title: "展商名称",
                key: "EXHIBITOR",
                align:'center',
               
                },
                 {
                title: "金额",
                key: "DECL_TOTAL",
                 align:'center'
                },
               
            ],
            startDate:'',
            endDate:'',
            gId:'',

        }
    },
    methods: {
       queryData(page){
           //保函
        let requsetData ={
            pageSize:10,
            page:page,

        }
        publicInter(interfaceUrl.qryEBusinessStatistic,requsetData).then(r=>{
              this.showdbTable = r.listEBusinessStatistic
              this.total = r.total
            });
       }, 

       changePage(page){
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

</style>
