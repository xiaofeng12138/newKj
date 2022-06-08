<template>
    <div >
        <h1>排序</h1>
        <p style="text-align:center;font-size:16px;padding:10px">拖拽表格可调整报关单商品项顺序</p>
        <div class="table-body">
            <table cellspacing=0  border=0 style="width:100%">
                 <thead>
                    <tr>
                        <th>项号</th>
                        <th>物料编号</th>
                        <th>报关用中文名、申报要素</th>
                        <th>数量及单位</th>
                        <th>原产国</th>
                        <th>单价</th>
                        <th>总价</th>
                        <th>币制</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="color-item" 
                        v-for="value in lists" v-dragging="{ item: value, list: lists }"
                        :key="value.gno">
                        <td>{{value.gno}}</td>
                        <td>{{value.MATERIALNO}}</td>
                        <td style="width:550px">
                            {{value.GOODSDESZH}}<br>
                            {{value.dmodel}}
                        </td>
                        <td>
                            {{value.QUANTITY}} <br>
                            {{value.QUANTITYUNIT}}
                        </td>
                        <td>{{value.origincountrycode}}</td>
                        <td>{{value.UNITPRICE}}</td>
                        <td>{{value.totalPrice}}</td>
                        <td>{{value.pOCurreny}}</td>
                    </tr>
                    <tr v-if="lists.length===0" >
                        <td style="padding:20px 0" align='center' colspan="8">暂无数据</td>
                        
                    </tr>
                </tbody>
            </table>

        </div>
        <Row>
            <Col span=5 push=4>

                <Button type="primary" long size='large' @click="goback" style="margin-top:20px" :disabled="reSortDisabled" >重新归并</Button>
            </Col>
            <Col span=5 push=10>
                <Button type="primary" long size='large' @click="save" style="margin-top:20px" :disabled="disableStatus">确认排序并提交</Button>
            </Col>
        </Row>
         
    </div>
</template>

<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import {getUserRole,getCookie} from '../../until/getToken'
export default {
    name:'sort',
    created(){
        this.role=this.$route.params.role;
        this.transmode=this.$route.params.transmode;
        this.reSortDisabled = this.$route.params.reSortDisabled?this.$route.params.reSortDisabled:false;

        if(this.$route.params && this.$route.params.CNCOMPANYCODE){
            this.CNCOMPANYCODE = this.$route.params.CNCOMPANYCODE;
        }
         this.billNo=this.$route.params.billNo
         let params = {billNo:this.billNo};
        if(this.CNCOMPANYCODE !== ""){
            params.CNCOMPANYCODE = this.CNCOMPANYCODE;
        }
        let url = this.role==='ROLE_CB'?interfaceUrl.seeBlAlLinkPOListCB:interfaceUrl.seeBlAlLinkPOListEP;
        if(this.$route.params.erpTempnum){
            url = this.role==='ROLE_CB'?interfaceUrl.seeBlAlLinkPOListAfChaiDan2:interfaceUrl.seeBlAlLinkPOListAfChaiDan;
            params.id = this.$route.params.erpTempnum;
        }
        params.transmode=this.transmode;//统一传transmode
        publicInter(url,params).then(r=>{
             if(r.code=='200'){
                 this.lists=r.result.resultList
             }
         })
        //  console.log(billNo)
    },
    data () {
        return {
            billNo:'',
            lists:[],
            disableStatus:false,
            //报关行数据
            CNCOMPANYCODE:"",
            role:"",
            transmode:'',
            reSortDisabled:false
        }
    },
    methods:{
        goback(){
            this.$router.push({name:'concat',params:{
                billNo:this.billNo,
                CNCOMPANYCODE:this.CNCOMPANYCODE,
                role: this.role,
                erpTempnum:this.$route.params.erpTempnum
            }})
        },
        save(){
            var data=JSON.parse(JSON.stringify(this.lists))
            data.forEach((item,i)=>{
                item.gno=i+1
            })
            let url =this.role&&this.role.indexOf('CB')!=-1?interfaceUrl.changeGnoByUUIDcb:interfaceUrl.changeGnoByUUID;
            publicInter(url,{UUIDs:data}).then(r=>{
                if(r.code=='200'){
                    if(this.CNCOMPANYCODE !== ""){
                        this.$router.push({name:'baoguanSearch',params:{
                                billNo:this.billNo,
                                transmode:this.transmode,
                                CNCOMPANYCODE:this.CNCOMPANYCODE,
                                erpTempnum:this.$route.params.erpTempnum
                            }
                        })
                    }
                    else{
                        if(this.$route.params.erpTempnum){
                            this.$router.push({name:'dismantlingSearch',params:{
                                billNo:this.billNo,
                                 transmode:this.transmode,
                                erpTempnum:this.$route.params.erpTempnum
                            }})
                        }
                        else{
                            this.$router.push({name:'baoguanSearch',params:{
                                billNo:this.billNo,
                                 transmode:this.transmode,
                            }})
                        }
                    }

                }
            })
        }
    },
    mounted(){
        if(this.$route.params && this.$route.params.disableStatus){
            this.disableStatus = this.$route.params.disableStatus
        }
    }
}
</script>
<style lang="scss" scoped>
    .color-item{
        border:1px solid #f1f1f1;
        padding:10px 5px;
        margin:5px 0;
        border-radius: 4px;
    }
    table{
        text-align: left;
        border-left: 1px solid #ececee;
        border-top: 1px solid #ececec;
        thead{
            background: #00508d;
            color: #fff;
        }
        tr{
            
            td,th{
                padding:10px 18px;
                font-size: 14px;
                border-right: 1px solid #ececec;
                border-bottom: 1px solid #ececec;
            }
        }
        tbody{
            tr{
                transition: all 0.3s ease-in-out;
                &:hover{
                    background: #ebf7ff;
                }
            }
            
        }
        
    }

</style>