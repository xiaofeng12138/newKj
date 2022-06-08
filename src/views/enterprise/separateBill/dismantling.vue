<template>
    <div>
        <Table ref="selection" :columns='exColumns' :data='exData'></Table>
        <Row style="margin-top:20px">
            <Button type="primary" :style="{'display':submitDisplay}" @click="addChaiDanMaterialList">提交</Button>
            <Button type="primary" :style="{'display':unsubmitDisplay}" @click="back">返回</Button>
        </Row>
        
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default{
    data(){
        return {
            exColumns:[
                {
                    type:'selection',
                    width:60
                },
                {
                    title: '订单编号',
                    key: 'PURCHASEORDERNO',
                },
                {
                    title: '物料编号',
                    key: 'MATERIALNO',
                },
                {
                    title: '名称',
                    key: 'GOODSDESZH',
                },
                {
                    title: '数量',
                    key: 'TOTALQUANTITY',
                    render:(h,params) =>{
                        if(this.submitDisplay === 'inline-block'){
                            return h("Input",{
                                attrs:{
                                    value:params.row.editTOTALQUANTITY || params.row.TOTALQUANTITY,
                                    placeholder:params.row.TOTALQUANTITY
                                },
                                on:{
                                    "on-blur":(event)=>{
                                        if(event.target.value <= params.row.TOTALQUANTITY){
                                            this.exData[params.index].editTOTALQUANTITY = event.target.value;
                                            params.row.TOTALPRICE = parseFloat(event.target.value)*parseFloat(params.row.UNITPRICE)
                                        }
                                        else{
                                            this.$Message.warning("修改的数量不能高于原数量，请重新修改");
                                        }
                                    },
                                    "on-keyup":(event) =>{
                                        event.target.value = event.target.value.replace(/[^0-9.]/g,"")
                                        if(event.keyCode === 13){
                                            if(event.target.value <= params.row.TOTALQUANTITY){
                                                this.exData[params.index].editTOTALQUANTITY = event.target.value;
                                                params.row.TOTALPRICE = parseFloat(event.target.value)*parseFloat(params.row.UNITPRICE)
                                            }
                                            else{
                                                this.$Message.warning("修改的数量不能高于原数量，请重新修改");
                                            }
                                        }
                                    }
                                }
                            })
                        }
                        else{
                            return h('span',params.row.TOTALQUANTITY)
                        }
                    }
                },
                {
                    title: '单位',
                    key: 'TOTALQUANTITYUNIT',
                },
                {
                    title: '项号',
                    key: 'ITEM',
                },
                {
                    title: '单价',
                    key: 'UNITPRICE',
                },
                {
                    title: '总价',
                    key: 'TOTALPRICE',
                },
                {
                    title: '币制',
                    key: 'CURRENCY',
                },
            ],
            exData:[],
            submitDisplay:'inline-block',
            unsubmitDisplay:'none'
        }
    },
    computed:{
        ...mapState('bill',{
            billNo:state=>state.dismantlingBillNo
        })
    },
    mounted(){
        //从拆分提单列表那边跳转过来，不能进行提交操作
         if(this.$route.params.erpTempnum){
             this.initChaidanSearch({
                 billNo:this.$route.params.billNo,
                 erpTempnum:this.$route.params.erpTempnum
             });
             this.submitDisplay = 'none';
             this.unsubmitDisplay = "inline-block"
         }
         //已关联未委托过来，并且可以进行提交操作
         else{
             this.initSearch();
         }
    },
    methods:{
        initSearch(){
            if(this.billNo === ""){
                this.$router.push({
                    name: 'bill',
                })
                return;
            }
            let param = {billNo:this.billNo}
            publicInter(interfaceUrl.queryAlNulNotePOListChaiDan,param).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.exData = r.result;
                    }
                }
            });
        },
        //提交拆单
        addChaiDanMaterialList(){
            let selection = this.$refs.selection.getSelection();
            if(selection.length === 0 ){
                this.$Message.info({
                    content: '请先勾选需要操作的数据',
                    duration: 3,
                    closable: true
                });
                return;
            }
            let sectionSelect = [];
            for(let i = 0; i < selection.length;i++){
                let s = {
                    PURCHASEORDERNO:selection[i].PURCHASEORDERNO,
                    ITEM:selection[i].ITEM,
                    MATERIALNO:selection[i].MATERIALNO,
                    ALNULNOTEMATERIALAMOUNT:selection[i].editTOTALQUANTITY || selection[i].TOTALQUANTITY,
                    TOTALQUANTITYUNIT:selection[i].TOTALQUANTITYUNIT,
                    CURRENCY:selection[i].CURRENCY,
                    UNITPRICEBLLINKPO:selection[i].UNITPRICE,	
                    GOODSDESZH:selection[i].GOODSDESZH,
                    TOTALPRICE:parseFloat(selection[i].editTOTALQUANTITY || selection[i].TOTALQUANTITY)*parseFloat(selection[i].UNITPRICE)

                }
                sectionSelect.push(s);
            }
            let params = {
                billNo:this.billNo,
                list:sectionSelect
            }
            publicInter(interfaceUrl.addChaiDanMaterialList,params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.$Message.success("成功拆出"+r.count+"物料");
                        this.initSearch();
                    }
                }
            });
        },
        initChaidanSearch(params){
            publicInter(interfaceUrl.getChaiDanHouOneTicBlNoMateInfo,params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        this.exData = r.result;
                    }
                }
            })
        },
        back(){
            this.$router.push({
                name: 'dismantlingBillNo',
            })
        }
    }
}
</script>
