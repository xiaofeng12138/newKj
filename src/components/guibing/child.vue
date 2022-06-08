<template>
    <div>
        <Table  border ref="selection" 
            :columns="columns"
            :data="lists"
            @on-select-all='selectAll'
            @on-select-cancel='cancelAll' 
            @on-selection-change='selectChange' class="limit self" ></Table>        
           <Row :gutter="16" style="margin-top:20px">
            <Col span=2 style="padding-bottom:20px">归并结果:</Col>
            <Col span=24 class="grid" style="padding-left:0">
                <Table
                border 
                :columns="columns1"
                :data='mergeData'
                > </Table>
                
            </Col>
        <Col span=24 style="text-align:right;margin-top:16px;">
            <Poptip
                confirm
                v-if="isReset" 
                title="是否全部恢复到上一组?"
                placement='top-end'
                @on-ok="regain" style="text-align:left">
                <Button  type="warning"  size='large'>恢复</Button>
            </Poptip>
            <!-- <Button type="warning"  size='large' v-if="isReset" @click="regain">恢复</Button> -->
            <Button type="primary"  size='large' @click="merge" v-if="isReset" :disabled='select.length<=0'>确认归并本组</Button>
        </Col>  
        </Row>
    </div> 
</template>
<script>
 import expandRow from './expand.vue';
 import expandRow2 from './expand2.vue';
 import { mapMutations } from 'vuex'
export default {
    props:['lists','isReset','len'],
    data(){
        return{  
            data:[],
            mergeData:[],
            columns1:[
                {
                        type: 'expand',
                        width: 100,
                        title:'申报要素',
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                },
                                on:{
                                    'factorChange':(val)=>{
                                        this.mergeData[0]['GMODEL']=val
                                    
                                    }
                                }
                            })
                    
                        }
                    },
                {title:'物料编号',key:'MATERIALNO'},
                {title:'HS号',key:'CODETS'},
                {title:'报关用中文名',key:'GNAME'},
                {title:'原产国',key:'ORIGINALCOUNTRY'},
                
                {title:'物料数量',key:'GQTY'},    
                {title:'单位',key:'GUNIT'},
                {title:'平均单价',key:'UNITPRICE'},
                {title:'币制',key:'CURR'},
            ],
            columns:[
                {type: 'selection',width: 60,align: 'center'},
                 {
                        type: 'expand',
                        width: 100,
                        title:'申报要素',
                        render: (h, params) => {
                            return h(expandRow2, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                {title:'物料编号',key:'MATERIALNO'},
                {
                    title:'项号',
                    key:'ITEM'
                },
                {title:'HS号',key:'CODETS'},
                {title:'报关用中文名',key:'GNAME'},
                {title:'原产国',key:'ORIGINALCOUNTRY'},
               
                {title:'物料数量',key:'GQTY'},
                {title:'单位',key:'GUNIT'},
                {title:'单价',key:'UNITPRICE'},
                {title:'币制',key:'CURR'},
            ],
            
            select:[],
        }
    },
    watch:{
        select(curVal,oldVal){
            var obj=this.mergeData[0]
            obj.GQTY=obj.UNITPRICE=0
            obj.ITEMNOS=[]
            obj.PURCHASEORDERNOS=[]
            curVal.forEach(item=>{
                obj.GQTY+=item.GQTY
                obj.UNITPRICE+=item.UNITPRICE*item.GQTY
                obj.ITEMNOS.push(item.ITEM)
                obj.PURCHASEORDERNOS.push(item.PURCHASEORDERNO)
            })
            obj.ITEMNOS=obj.ITEMNOS.join(',')
            obj.PURCHASEORDERNOS=obj.PURCHASEORDERNOS.join(',')
            obj.UNITPRICE=Math.floor(obj.UNITPRICE*1000/obj.GQTY)/1000
        }
    },
    mounted(){
        if(this.lists.length>0){
            this.lists.forEach(item=>{
                item._checked=true
                item._disabled=false
            })
                // console.log(this.lists)
            this.select=JSON.parse(JSON.stringify(this.lists))  
            this.mergeData.push(JSON.parse(JSON.stringify(this.select))[0])
            this.mergeData[0]['UNITPRICE']=this.mergeData[0]['GQTY']=0
            this.mergeData[0]['facotrLists']=[]
            this.select.forEach((item,i)=>{
                this.mergeData[0]['facotrLists'].push({label:item.factor,value:i})
            })
            this.setLists(this.mergeData[0])
        }
        
    },
    methods:{
        ...mapMutations(['setLists','delete']),
        change(e){
            var val=e.target.value
            if(val){
                this.factor.push({label:val,value:val})
            }

        },
        selectAll(selection){

        },
        cancelAll(selection,row){
        },
        regain(){
            if(this.len>1){
                this.delete(this.mergeData[0])
            }
            this.$emit('resetClick',true)
        },
        selectChange(selection){
            this.select=selection
        },
        merge(){
            this.setLists(this.mergeData[0])
            // console.log(this.mergeData[0])
            if(this.select.length===this.lists.length){
                this.$emit('surplus',false)
            }else{
                this.$emit('surplus',this.select)
            }

             
        }
    }
}
</script>
<style lang="scss" scoped>
.ivu-row{
    margin: 16px 0;
    font-size: 14px;
    span{
        margin: 0 10px;
    }
    button{
        margin-left: 16px;
    }
    // b{
    //     font-size: 16px;
    //     margin: 0 5px;
    //     color: red;
    // }
}
.ivu-icon,.ivu-icon-help-circled{
    left: 16px;
}
.ivu-poptip-confirm .ivu-poptip-body .ivu-icon{
    left: 16px;
}
.grid{
    border-left:1px solid #ececec;
    border-bottom: 1px solid #ececec; 
    >.ivu-col{
        border-right:1px solid #ececec;
        border-top: 1px solid #ececec; 
        height: 50px;
        line-height: 50px;

    }
}

</style>
