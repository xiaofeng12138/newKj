<template>
    <div>
        <Row style="margin-bottom:20px">
            <Col span=6>
             <vague @billNoVal='billValue' :url='url' />
            </Col>
            <Col span=2 push=1>
                 <Button type="primary" size='large' long @click="query">查询</Button>
            </Col>
        </Row>
        <Table border :columns="columns" :data="data" class="self"></Table>
       
       

    </div>    
</template>
<script>
import vague from './vague'
import cfg from '@/until/config'
import {pdfLook,publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'

import axios from 'axios'
export default {
    props:{
        type:{
            type:String,
            required:true
        }
    },
    components:{
        vague,
        
    },
    created(){
        this.url=interfaceUrl.queryBillnumList
    },
    data(){
        return{
            billno:'',
            url:'',
            columns:[
                {
                    title:'文件名',
                    key:'FILENAME'
                },
                {
                    title:'提单号',
                    key:'BILLNO'
                },
                {
                    title:'上传日期',
                    key:'REC_UPD_DT'
                },
                {
                    title:'操作',
                    width:200,
                    render:(h,params)=>{
                        return h('div',[
                             h('Button',{
                                    props: {
                                        type: 'primary',
                                        size: 'large'
                                    },
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.preview(params.row.ATTACHMENT_UUID,params.index)
                                        }
                                    }
                                },'查看'),
                             h('Poptip', {
                                    props: {
                                       confirm: '',
                                       placement:'top-end',
                                       title:"您确认删除这条内容吗？"
                                    },
                                    style:{
                                        textAlign:'left'
                                    },
                                    on:{
                                        'on-ok':()=>{
                                            this.delete(params.row.ATTACHMENT_UUID,params.index)
                                        }

                                    }
                                },[
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'large'
                                    },
                                },'删除')]),
                               
                        ])
                    }
                }
            ],
            data:[]
        }
    },
    methods:{
        query(){
            if(this.billno){
                publicInter(interfaceUrl.queryBillFiles,{key:this.billno,type:this.type}).then(r=>{
                    if(r.list.length>0){
                        this.data=r.list
                    }
                })
            }else{
                this.$Message.error('请输入提单号！')
            }
        },
        billValue(val){
            this.billno=val            
        },
        
        delete(uuid,index){
            publicInter(interfaceUrl.deleteBillFile,{uuid:uuid}).then(r=>{
                if(r.code=='200'){
                    this.data.splice(index,1)
                }

            })
        },
        preview(uuid,index){
           
             pdfLook(interfaceUrl.pdfLookUp,{uuid:uuid}).then(r=>{
                this.$emit('pdfShow',r)              
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
