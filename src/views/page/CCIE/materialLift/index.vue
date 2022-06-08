<template>
    <div>
        <!-- <h1 style="margin-bottom:20px">进博会物资快放情况查询</h1> -->
        <Row style="margin-bottom:10px; text-align:left;">       
            <span class="labelText" style="">提运单号:</span>
            <Input v-model="queryParam.billNo" class="customInput"  size='large' style="width:150px;margin-right:20px;" />
            <span class="labelText" >证明函编号:</span>
            <Input v-model="queryParam.certificateno"  class="customInput" size='large' style="width:150px;margin-right:20px;" />
            <span  class="labelText" >发送标记:</span>
            <Select v-model="sendFlag"  class="customSelect" size='large'  style="width:150px;margin-right:20px;">
                <Option v-for="item in stateList" :key="item.value" :value="item.value">
                    {{ item.label }}
                </Option>
            </Select>
            <span class="labelText" >发送时间:</span>
            <DatePicker size='large' type='date' v-model="sendTime" class="customDatePicker"  style="width:150px;margin-right:20px;"></DatePicker>
            <Button type="primary" size='large' @click="query('')">查询</Button>
        </Row>
        <Table border :columns="columns" class="customTable" :data="data"></Table>
        <Page :total="total" v-if="total>0"
                :page-size=10
                @on-change='pageChange'
                show-total
                class="customPage"
            />
    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import { getCookie } from '@/until/getToken';
export default {
    data(){
        return {
            stateList:[
                {
                    value:"0",
                    label:'全部状态'
                },{
                    value:"1",
                    label:'发送成功'
                },{
                    value:"2",
                    label:'发送失败'
                }
            ],
            columns:[
                {
                    title:'证明函编号',
                    key:'CERTIFICATENO',
                    align:'center',
                    width:'200'
                },
                {
                    title:'运输工具',
                    key:'TRANSPORTNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'进境日期',
                    key:'IMPORTDATE',
                    align:'center',
                    width:'200',
                    render:(h,params)=>{
                        var date = params.row.IMPORTDATE;
                        try{
                            if(params.row.IMPORTDATE.indexOf(" ") != -1){
                                date = date.split(" ")[0];
                            }
                        }catch(e){
                            console.log(e);
                        }
                        
                        return h('span',date);
                    }
                },
                {
                    title:'提运单号',
                    key:'BILLNO',
                    align:'center',
                    width:'200'
                },
                {
                    title:'毛重',
                    key:'WEIGHT',
                    align:'center',
                    width:'200'
                },
                {
                    title:'数量',
                    key:'PACKAGEQUANTITY',
                    align:'center',
                    width:'200'
                },
                {
                    title:'申报单位',
                    key:'AGENTNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'申报单位代码',
                    key:'AGENTCODE',
                    align:'center',
                    width:'200'
                },
                {
                    title:'备注',
                    key:'REMARK',
                    align:'center',
                    width:'200',
                    render:(h,params)=>{
                        return h('span',{
                            style:{
                                'display':'inline-block',
                                'vertical-align':'middle',
                                'white-space':'nowrap',
                            },
                            attrs:{
                                'title':params.row.REMARK
                            }
                        },params.row.REMARK)
                    }
                },
                {
                    title:'发送标记',
                    key:'SENDFLAG',
                    align:'center',
                    width:'200',
                    render:(h,params)=>{
                        let flag = ""
                        switch(params.row.SENDFLAG){
                            case "1":
                                flag = "发送成功"
                                break;
                            case "2":
                                flag = "发送失败"
                                break;
                        }
                        return h('span',flag)
                    }
                },
                {
                    title:'发送时间',
                    key:'SENDTIME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'申报人',
                    key:'CONTACTNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'申报人联系方式',
                    key:'CONTACTMETHOD',
                    align:'center',
                    width:'200'
                },
            ],
            data:[],
            total:0,
            queryParam:{
                certificateno:"",
                billNo:"",
                sendFlag:"",
                sendTime:"",
                pageNum:"",
                pageSize:10
            },
            sendTime:"",
            sendFlag:"0",
        }
    },
    methods:{
        pageChange(page){
            this.query(page);
        },
        query(pageNum){
            this.queryParam.sendTime = this.formatDate(this.sendTime);
            this.queryParam.sendFlag = (this.sendFlag == "0"?"":this.sendFlag);
            this.queryParam.pageNum = pageNum?pageNum:1;
            let url = (getCookie('roler').includes('CB'))?interfaceUrl.queryExpoToPortcb:interfaceUrl.queryExpoToPort
            publicInter(url,this.queryParam).then(r=>{
                if(r){
                    if(r.isOk){
                        this.data = r.list;
                        this.total = r.totalRow;
                    }
                }
            });
        },
        formatDate(form){
            if(form){
                var year = form.getFullYear();
                var mouth=form.getMonth()+1
                var date=form.getDate();
                return year+(mouth<10?("0"+mouth):(""+mouth))+(date<10? ("0"+date):(""+date));
            }
            return "";
        },
    },
    mounted(){
        this.query(1)
    }
}
</script>
<style lang="scss" scoped>
.labelText{
    display:inline-block;
    vertical-align:middle;
    color:#fff;
    font-size:14px;

}
</style>
