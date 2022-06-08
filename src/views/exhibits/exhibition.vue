<template>
    <div style="min-height:300px">
        <Row style="margin-bottom:20px">
            <Col span=6>
                <Col span=5 style="font-size:14px;margin-top:8px">
                    <span>展馆</span>
                </Col>
                <Col span=18>
                    <Select v-model="checked" size='large' filterable clearable>
                        <Option v-for="item in position" :value="item.NAME" :key="item.ID">{{ item.NAME }}</Option>
                    </Select>
                </Col>
            </Col>
            <Col span=4 push=1 style="height:36px;line-height:36px">
                 <RadioGroup v-model="searchItem">
                    <Radio label="未进馆"></Radio>
                    <Radio label="已进馆" ></Radio>
                </RadioGroup>
            </Col>
            <Col span=3 push=2>
                <Button type="primary" size='large' long @click="query('')">查询</Button>
            </Col>
        </Row>
         <Table border :columns="columns" :data="data" class="self"></Table>
         <div style="margin-top:20px;padding-left:20px;float:left"  v-if='totalCount' >
                <Checkbox v-model="single" @on-change='singleAll' :disabled="singleable" >全选</Checkbox>
         </div>
         <!-- <Button type="primary" style="margin-top:20px" size='large'>确认所有勾选</Button> -->
          <Page v-if='totalCount' 
                :total="totalCount"
                :page-size=20
                @on-change='pageChange' 
                style="float:right;margin:20px 0" show-total></Page>
        <div style="margin-top:20px" v-if='totalCount'>
            <Button type="primary" :disabled='checkedUUID.length<=0' size='large' long @click="confirm">确认</Button>
        </div>
    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            checked:'',
            single:false,
            totalCount:'',
            position:[],
            searchItem:'未进馆',
            checkedUUID:[],
            singleable:'',
            len:0,
            columns:[
                 {
                    title:'是否进馆',
                    width:100,
                    render:(h,params)=>{
                        return h('Checkbox',{
                            props:{
                                value:params.row.checked,
                                disabled:params.row.disabled
                            },
                            on:{
                                'on-change':(val)=>{
                                    this.data[params.index]['checked']=val
                                    if(val){
                                        this.len++
                                        this.checkedUUID.push(params.row.BASICINFOUUID)
                                        if(this.len===this.data.length){
                                            this.single=true
                                        }
                                    }else{
                                        this.len--
                                        this.checkedUUID.splice(this.checkedUUID.indexOf(params.row.BASICINFOUUID),1)
                                        if(this.len<this.data.length){
                                            this.single=false
                                        }
                                    }
                                }
                            }
                        })
                    }
                },
               
                {
                    title:'提单号',
                    key:'BILLNO',
                    align:'center'
                },
                // {
                //     title:'馆号',
                //     key:'HALLNO',
                //     align:'center'
                // },
                //  {
                //     title:'展馆',
                //     key:'NAME',
                //      align:'center'
                // },
                //  {
                //     title:'展位',
                //     key:'BOOTHNO',
                //      align:'center'
                // },
                 {
                    title:'展商',
                    key:'EXHIBITOR',
                     align:'center'
                },
                
            ],
            data:[]
        }
    },
    mounted(){
        this.getPosition()
    },
    methods:{
        getPosition(){
            publicInter(interfaceUrl.queryPositionTransport,{key:''}).then(r=>{
                if(r.position.length>0){
                    this.position=r.position
                }
                
            })
        },
        singleAll(val){
            this.len=val?this.data.length:0
            this.data.forEach(item=>{
                item.checked=val
                if(val){
                    this.checkedUUID.push(item.BASICINFOUUID)
                }else{
                    this.checkedUUID=[]
                }
            })

        },
        query(pageNum){
            this.checkedUUID=[]
            publicInter(interfaceUrl.queryExpoList,
                {hallNo:this.checked,pageSize:20,pageNum:pageNum||1,status:this.searchItem==='未进馆'?0:1}).then(r=>{
                    if(r.totalRow>0){
                        this.totalCount=r.totalRow
                        if(this.searchItem==='未进馆'){
                            
                            this.singleable=this.single=false
                            r.list.forEach(val=>{
                                val.checked=false
                                val.disabled=false
                            })
                        }else{
                            this.singleable=this.single=true
                            r.list.forEach(val=>{
                                val.checked=true
                                val.disabled=true
                            })
                        }  
                        this.data=r.list
                    }else{
                        this.data=[]
                        this.totalCount=0
                    }
                    

            })
        },
        pageChange(page){
            this.query(page)
        },
        confirm(){
            this.$Modal.confirm({
                    title: '信息确认',
                    content: '<p>是否确认进馆信息</p>',
                    onOk: () => {
                        publicInter(interfaceUrl.updateExpo,{list:this.checkedUUID}).then(r=>{
                            if(r.code==='200'){
                                this.$Message.success(r.msg)
                                this.query()
                                this.checkedUUID=[]
                            }else{
                                this.$Message.error(r.msg)

                            }
                        })
                    }
                });
            
        }
    }
}
</script>
