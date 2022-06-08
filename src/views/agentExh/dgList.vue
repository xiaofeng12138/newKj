<template>
    <div>
        <h1>危险品防控清单维护</h1>
        <Row>
            <Col :span='9'>
                <Col :span='3'>
                        <span class="itemTitle">HSCode</span>
                    </Col>
                <Col :span="12">
                      <Input v-model="addParams.HSCODE" placeholder="请输入HSCode" size='large'></Input>
                </Col>
            </Col>
            <Col :span='9'>
                <Col :span='3'>
                        <span class="itemTitle">品名</span>
                    </Col>
                <Col :span="12">
                      <Input v-model="addParams.CARGONAME" placeholder="请输入品名" size='large'></Input>
                </Col>
            </Col>
            <Col :span="4" :push='1'> 
                  <Button type="primary" size='large'  @click="add" >增加</Button>
            </Col>
        </Row> 
         <Table border :columns="columns" :data="data" class="self"></Table>
          <Page :total="total" v-if="total" :page-size='queryParams.pageSize' style="float:right;margin-top:16px" @on-change='pageNumChange'></Page>
    </div>
    
</template>
<script>
import { mapMutations } from 'vuex'
//  import {queryInfor} from '../../api/queryShip'
 import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    created(){
        this.setMenu('6-3');
        this.queryDGList();
    },
    data(){
        return{
             cityList: [],
             pageSize:10,
             data:[],
             total:null,
             addParams:{
                 HSCODE:'',
                 CARGONAME:''
             },
             columns:[
                 {
                     title:'HSCode',
                     key:'HSCODE',
                     render:(h,params)=>{
                        return h('input',{
                                style:{
                                    width:'522px',
                                    height:'60px',
                                    marginLeft:'-18px',
                                    border:'0px'
                                },
                                domProps:{
                                    value:params.row.HSCODE
                                },
                                on:{
                                    input:function(event){
                                        params.row.HSCODE=event.target.value
                                    }
                                }
                        });
                    }
                 },
                 {
                     title:'品名',
                     key:'CARGONAME',
                      render:(h,params)=>{
                        return h('input',{
                                style:{
                                    width:'522px',
                                    height:'60px',
                                    marginLeft:'-18px',
                                    border:'0px'
                                },
                                domProps:{
                                    value:params.row.CARGONAME
                                },
                                on:{
                                    input:function(event){
                                        params.row.CARGONAME=event.target.value
                                    }
                                }
                        });
                    }
                 },
                 {
                     title:'操作',
                     key:'DELETE',
                     render:(h,params)=>{
                        return h('div',{
                            style:{
                                textAlign:'center'
                            }
                        },[
                            h('Button',{
                                style:{
                                    marginRight:'20px'
                                },
                                props:{
                                    type:'error',
                                    size:'large'
                                },
                                on:{
                                    click:()=>{
                                        this.delete(params.row)

                                    }
                                }
                            },'删除'),
                            h('Button',{
                                style:{
                                    marginLeft:'20px'
                                },
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                on:{
                                    click:()=>{
                                        this.update(params.row)

                                    }
                                }
                            },'保存')
                        ])
                    }  
                 }
            ]
        }
    },
    methods:{
         ...mapMutations(['setMenu']),
         queryDGList() {
            publicInter(interfaceUrl.queryDgList, {}).then(r=>{
                console.log(r);
                this.data=r.datas;
                console.log(this.data);
            }).catch(error=>{
                console.log('错误：'+error)
            })
         },
         add(){
             console.log(this.addParams)
             if(this.addParams.HSCODE==''&&this.addParams.CARGONAME==''){
                 this.$Message.warning('请至少输入一项');
                 return;
             }
             publicInter(interfaceUrl.addDgInfo,this.addParams).then(r=>{
                console.log(r);
                if(r.datas!='1'){
                    this.$Message.error('添加失败');
                    this.queryDGList();
                    return;
                }
                this.$Message.success('添加成功');
                this.queryDGList();
            }).catch(error=>{
                console.log('错误：'+error)
            })
         },
         delete(params){
             console.log(params)
             publicInter(interfaceUrl.deleteDgInfo,params).then(r=>{
                console.log(r);
                if(r.datas!='1'){
                    this.$Message.error('删除失败');
                    this.queryDGList();
                    return;
                }
                this.$Message.success('删除成功');
                 this.queryDGList();
            }).catch(error=>{
                console.log('错误：'+error)
            })
         },
         update(params){
             console.log(params)
             if(params.HSCODE==''&&params.CARGONAME==''){
                 this.$Message.warning('请至少输入一项');
                 return;
             }
             publicInter(interfaceUrl.updateDgInfo,params).then(r=>{
                console.log(r);
                if(r.datas!='1'){
                    this.$Message.error('修改失败');
                    this.queryDGList();
                    return;
                }
                this.$Message.success('修改成功');
                 this.queryDGList();
            }).catch(error=>{
                console.log('错误：'+error)
            })
         }
    }
    
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
    h1{
        padding-bottom: 16px;
        border-bottom: 1px dashed #ddd;
        margin-bottom: 16px;
    }
    .ivu-row{
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #ddd;
    }
</style>
