<template>
    <div>
        <Modal :fullscreen='fullscreen' v-model="modalShow" width='850'>
            <p slot='header'>
                {{pageName}}详情
                <Icon :type='fullscreen?"ios-contract":"md-contract"' class="modalIcon" style="" @click="fullS"></Icon>

            </p>
            <div class="modalBody">
                <ul >
                    <li class="modalCol" v-for="item in tableHeader" :key="item.id" >
                         <span>{{item.value}}:</span> <span>{{head[item.key]||'暂无'}}</span>
                    </li>
                </ul>
                <Table v-for="(dataItem,index) in Mdata" :key="dataItem.id" :columns="Mcolumns[index]" :data="dataItem"  style='margin-top:1.5rem'></Table>

            </div>
            <div slot="footer">
                <Button type='primary' size='large' @click="modalClose">关闭</Button>

            </div>
        </Modal>
        <h1 class="pageTitle">{{pageName}}信息查询</h1>
        <Row class="query">
            <Col :xs='24' :sm='12' :md='12' :lg='6'>
                <span>提运单号:</span>
                <Input placeholder="请输入提运单号" size="large" v-model="parmas.billNo"></Input>
            </Col>
            <Col :xs='24' :sm='4' :md='3' :lg='3'>
                <Button type="primary" size="large" long @click="queryInfor">查询</Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="data" class="self" ></Table>
         <Page :total="totalCount" v-if="totalCount" 
          :page-size='20'
           @on-change='queryInfor'
            show-total style="float:right;margin-top:20px"></Page>

    </div>
</template>
<script>
import {publicInter} from '@/api/http'
import expand from './expand'
export default {
    name:'queryComponent',
    components:{expand},
    props:{
        pageName:{
            type:String,
            required:true
        },
        keyValue:{
            type:Array,
            required:true
        },
        tableHeader:{
            type:Array,
            required:false
        },
        childTable:{
            type:Array,
            required:false,
        },
        httpListUrl:{
            type:String,
            required:false
        },
        httpDetailUrl:{
            type:String,
            required:false
        }
    },
    watch:{
        fullscreen:'screenChange'


    },
    data(){
        return{
            fullscreen:false,
            modalShow:false,
            head:{},
            Mcolumns:[],
            Mdata:[],
            parmas:{
                billNo:'',
                pageSize:'20',
                pageNum:'1'
            },
            totalCount:0,
            columns:[
                {
                    title:'操作',
                    width:200,
                    align:'center',
                    render:(h,parma)=>{
                        return h('div',{
                            style:{
                                textAlign:'center'
                            }
                        },[
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size:'large'
                                },
                                on:{
                                    click:()=>{
                                        
                                        this.Mdata=[]
                                        this.Mcolumns=[]
                                        publicInter(this.httpDetailUrl,{msgid:parma.row.msgid}).then(r=>{
                                            if(r){
                                                var data=r
                                                for(var key in data){
                                                    // console.log(typeof(data[key]))
                                                    if(typeof(data[key])==='object'&&data[key]['length']>0){
                                                        this.Mdata.push([...data[key]]) 
                                                        this.Mcolumns.push(this.randerTable(data[key][0]))
                                                        
                                                    }else{
                                                        this.head[key]=data[key]
                                                       
                                                    }
                                                }
                                                this.modalShow=true
                                                 console.log(this.head)
                                            }
                                        })
                                    }
                                }
                            },'查看详情')
                        ])
                    }
                }
            ],
            data:[]
        }
    },
    beforeMount(){
        this.keyValue.forEach(element => {
            this.columns.unshift({
                key:element.key,
                title:element.value,
                align: 'center'
            })
            
        });
    },
    methods:{
        modalClose(){
            this.fullscreen=this.modalShow=false
        },
        screenChange(curVal,oldVal){
            var len=curVal?8:4
            this.Mcolumns=[]
            this.Mdata.forEach(item=>{
                this.Mcolumns.push(this.randerTable(item[0],len)) 
            })   
        },
        fullS(){
            this.fullscreen=!this.fullscreen
        },
        queryInfor(page){
            typeof(page)==='object'?this.parmas.pageNum='1':this.parmas.pageNum=page+''
            publicInter(this.httpListUrl,this.parmas).then(r=>{
                if(r&&r.totalRow>0){
                    this.totalCount=parseInt(r.totalRow) 
                    this.data=r.list
                }else{
                    this.totalCount=0
                    this.data=[]
                }
            })
        },
        randerTable(obj,showLen=4){
            var columnsArr=[],hidden=[]
            // console.log(obj)
            // var len=Object.getOwnPropertyNames(obj).length
            var count1=0,count2=0
            for(var key in obj){
                this.childTable.forEach(element=>{
                    if(element.key===key){
                        if(count1<showLen&&obj[key]){
                             columnsArr.push({
                                title:element.value,
                                key:element.key
                            }) 
                            count1++
                        }else{
                            hidden.push({
                                key:element.key,
                                value:element.value
                            })
                           
                        }
                       count2++ 
                    }
                })
            }
            if(count2>count1){
                columnsArr.unshift({
                    type:'expand',
                    width:50,
                    render:(h,parmas)=>{
                        return h(expand,{
                            props:{
                                RowValue:parmas.row,
                                hiddenKey:hidden
                            }
                        })
                    }
                })
            }
            // console.log(columnsArr)
            return columnsArr
        }
    }

    
}
</script>
<style lang="scss" scoped>
    
    .ivu-modal{
        .modalIcon{
            cursor:pointer;
            float:right;
            margin: 3px 30px 0 0;
        }
        &.ivu-modal-fullscreen{
            .ivu-modal-header{
                .modalIcon{
                    margin: 0 30px 0 0;
                }
                p{
                    font-size: 1.2rem;

                }
                
            }
            .modalBody{
                max-height:100%;
               
             >ul{
                
                >li{
                   
                    span{
                        font-size: 1.2rem;
                    }

                }
            }   
       
        }


        }
        .modalBody{
            margin: -16px -16px 0 0;
             max-height: 500px;
             overflow: auto;
            >ul{
                margin: 0;
                padding: 0;
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                >li{
                    margin-top: 1rem;
                    margin-right: 3rem;
                    span{
                        font-size: 1rem;
                    }

                }
            }   
       
        }

    }
    
    

    
    .pageTitle{
        position: relative;
        padding-left:1.5rem; 
        font-size: 1.6rem;
        padding-bottom: 1rem;
        margin: 0;
        border-bottom: 1px dashed #ccc;
        &::before{
            content: '';
            position: absolute;
            width: .35rem;
            height: 80%;
            top: 0;
            left: 0;
            background: #0068be;

        }

    }
    .query{
        >.ivu-col{
            margin: 1rem 0;
        }
        >.ivu-col:first-child{
            display: flex;
            align-items: center;
            margin-right: 1rem;
            >span{
                display: inline-block;
                width: 5rem;
                font-weight: 300;
                font-size: 1rem;

            }
            >div{
                width: calc(100% - 5rem);
                max-width: 25rem;
            }

        }
    }

</style>

