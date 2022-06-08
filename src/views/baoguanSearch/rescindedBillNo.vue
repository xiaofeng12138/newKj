<template>
    <div>
        <h1>已撤回拆单提单</h1>
        <Row style="margin: 10px 0;">
            <!-- 提单号：<Input v-model="billno" placeholder="输入提单号" style="width: 200px;margin-right:20px" />
            撤回时间：<DatePicker v-model="dateModel" type="daterange" placeholder="请选择撤回时间" style="width: 200px;margin-right:20px"></DatePicker> -->
            <Button type="primary"  @click="query()">查询</Button>
        </Row>
        <Table border ref="selection" :columns="rescindcolumns" :data="rescindData" no-data-text="-"></Table>
        <Modal
                v-model="historyModal"
                :title="title">
            <Table border ref="selection" :columns="historycolumns" :data="historyData" no-data-text="-"></Table>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
    import interfaceUrl from '@/api/interfaceUrl'
    import { publicInter } from '@/api/http'
    export default {
        data(){
            return{
                billno:"",
                dateModel:"",
                title:'历史状态',
                rescindcolumns:[
                    {
                    title:'提单号',
                    key:'BILLNO'
                },{
                    title:'拆单标志',
                    key:'ID'
                },{
                    title:'撤回委托企业',
                    key:'NAME_CHINESE'
                },{
                    title: '撤回时间',
                    key: 'REC_UPD_DT'
                },{
                    title:'历史记录',
                    render:(h, params) =>{
                        return h('Button',{
                            props:{
                                type:'primary'
                            },
                            on:{
                                click:()=>{
                                    this.title = '提单号['+params.row.BILLNO+']的历史状态'
                                    this.historyData = params.row.list;
                                    this.historyModal = true;
                                }
                            }
                        },'查看')
                    }
                }],
                rescindData:[],
                historyModal:false,
                historycolumns:[
                    {
                        title:"状态",
                        render:(h, params) =>{
                            let info = "";
                            switch (params.row.STATUS){
                                case "1":
                                    info = '已关联未委托';
                                    break;
                                case '2':
                                    info = '自行归并';
                                    break;
                                case '3':
                                    info = '自行未经归并直接生成报关单表体';
                                    break;
                                case '4':
                                    info = '报关行未读';
                                    break;
                                case '5':
                                    info = '报关行已读处理中';
                                    break;
                                case '6':
                                    info = '报关行已归并';
                                    break;
                                case '7':
                                    info = '报关行已发送';
                                    break;
                                case '8':
                                    info = '已撤销对报关行的委托';
                                    break;
                                case '9':
                                    info = '自行发送至单一窗口'
                                    break;
                            }
                            return h('span',info)
                        }
                    },
                    {
                        title:'时间',
                        key:'REC_UPD_DT'
                    }
                ],
                historyData:[]
            }
        },
        methods:{
            query(){
                let params = {
                    // billno:this.billno,
                    // startDate:this.formatDate(this.dateModel[0]),
                    // endDate:this.formatDate(this.dateModel[1])
                }
                publicInter(interfaceUrl.cusBroGetRescindedBLListAfChaiDan,params).then(r=>{
                    if(r){
                        if(r.code == '200'){
                            this.rescindData = r.result;
                        }
                    }
                })
            },
            formatDate(form){
                if(form){
                    var year = form.getFullYear();
                    var mouth=form.getMonth()+1
                    var date=form.getDate();
                    return year+(mouth<10?("0"+mouth):mouth)+(date<10? ("0"+date):date);
                }
                return "";
            },
        }
    }
</script>

<style scoped>

</style>