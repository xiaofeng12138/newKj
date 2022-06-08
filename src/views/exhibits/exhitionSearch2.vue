<template>
    <div>
        <h2 >展品数据校对</h2>
        <h4 style="margin:20px 0;font-size:14px;">列表初始提供的数据为原展商预报的展览品物资，
其中：一、浅绿色背景为证明函方式确认进境的展品（包括保税特殊区域转展馆方式、ATA单证册货物、暂时进境展览品方式），仅可修改货物当前状态（到港、到仓库、到馆）、进仓库日期（默认当天）、进展馆日期（默认当天）;
二、蓝色背景为将办理ATA、展览品、保税特区结转手续或者以一般贸易完税等其他方式进境的展览品预报数据，需由您录入数量、单价、商品编码、 货物当前状态（到港、到仓库、到馆）、进仓库日期（默认当天）、进展馆日期（默认当天）、展品随附进境单证类型（ATA、展览品、保税货物、其他）、展品随附进境单证号（18位报关单）
</h4>
        <Row style="margin-bottom:20px;" class="searchRow">
            <span>展商名称:</span>
            <Input v-model="params.name" style="width:150px;margin-right:12px;" />
            <span>展台号:</span>
            <Input v-model="params.position" style="width:150px;margin-right:12px;"  @on-blur='blurBoothno' />
            <span>展品名称:</span>
            <Input v-model="params.item" style="width:150px;margin-right:12px;" />
            <span>原产地:</span>
            <Input v-model="params.original" style="width:150px;margin-right:12px;" />     
            <span>是否校对：</span> 
            <RadioGroup v-model="RadioType" style='display:inline-block;margin-right:12px;'>
                <Radio label='全部'></Radio>
                <Radio label='未校对'></Radio>
                <Radio label='已校对'></Radio>
                
            </RadioGroup>
            <Button @click="query('')" type="primary">查询</Button>
        </Row>  
        <Table :columns="columnsList" :data="dataList" class="self" :row-class-name='rowClass'></Table> 
        
        <Page show-total :total="totalNumber" :page-size=20 v-if="totalNumber>0" :current="params.currPage" @on-change="changePage"  style="float:right;margin-top:20px;margin-bottom:20px;"></Page>   
        <div class="add" v-if="totalNumber>0"  style="width:80px;float:right;margin:20px 20px 0 0">
            <Button type='primary' long size='large' @click="addRow">新增一行</Button>
        </div>

        <Modal v-model='modelShow' width='950' :on-text='"提交"' >
            <h2 style="text-align:center;margin:20px 0">编辑列表</h2>

            <Form ref='formEditor' :model='modelKey' :rules="rulesCustom" :label-width='150'>
                <Row>
                     <Col span=12>
                        <FormItem label='参展商' prop='NAME'>
                            <div class="itemClass" @click="envetPop">
                                <div>
                                     <Input type="text" style="width:90%" @on-focus='inputFocus' @on-change="remote" @on-blur='inputBlur'  v-model='modelKey.NAME' :disabled='modelKey.isDisabled'  />
                                </div>
                                <ul tabindex='-2'  class="ulclass" v-if="isShow">
                                    <li v-for="(list,index) in lists" :key="index" @click="selectList(list)">{{list.EXPOCOMPANY}}</li>           
                                </ul>

                            </div>
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='展台号' prop='POSITION'>
                            <div class="itemClass" @click="envetPop">
                                <div>
                                     <Input type="text" style="width:90%" @on-focus='inputFocus2' @on-change="remote2" @on-blur='inputBlur2'  v-model='modelKey.POSITION' :disabled='modelKey.isDisabled'  />
                                </div>
                                <ul tabindex='-2'  class="ulclass" v-if="isShow2">
                                    <li v-for="(list,index) in lists2" :key="index" @click="selectList2(list)">{{list.PLACEPOSITION}}</li>           
                                </ul>
                            </div>
                                
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='展品名称' prop='ITEM'>
                        <Input type="text" style="width:90%" v-model='modelKey.ITEM' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='原产地' prop='ORIGINAL'>
                        <Input type="text" style="width:90%" v-model='modelKey.ORIGINAL' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='展区' prop='AREA'>
                        <Input type="text" style="width:90%" v-model='modelKey.AREA' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                    
                    <Col span=12>
                        <FormItem label='毛重' prop='ITEM_GROSS_WEIGHT'>
                        <Input type="text" style="width:90%" v-model='modelKey.ITEM_GROSS_WEIGHT' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                    
                     <Col span=12>
                        <FormItem label='数量' prop='ITEM_QTY'>
                        <Input type="text" style="width:90%" v-model='modelKey.ITEM_QTY' />
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='单价' prop='ITEM_VALUES'>
                        <Input type="text" style="width:90%" v-model='modelKey.ITEM_VALUES'  />
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='商品编码' prop='PROD_HS_CODE'>
                        <Input type="text" style="width:90%" v-model='modelKey.PROD_HS_CODE'  />
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='物资清单号' >
                        <Input type="text" style="width:90%" v-model='modelKey.LISTHEADNO' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='提单号' >
                        <Input type="text" style="width:90%" v-model='modelKey.BILL_NO' :disabled='modelKey.isDisabled' />
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='货物当前状态' prop='ITEM_STATUS'>
                            <Select style="width:90%" v-model='modelKey.ITEM_STATUS' >
                            <Option value="1">到港</Option>
                            <Option value="2">到仓库</Option>
                            <Option value="3">到馆</Option>  
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='进仓库日期' prop='BW_DATE'>
                            <DatePicker v-model='modelKey.BW_DATE' type='date' style="width:90%" :format='"yyyy-MM-dd"' /> 
                        </Select>
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='进展馆日期' prop='HALL_DATE'>
                            <DatePicker v-model='modelKey.HALL_DATE' type='date' style="width:90%" :format='"yyyy-MM-dd"'/> 
                        </Select>
                        </FormItem>
                    </Col>
                     <Col span=12>
                        <FormItem label='展品随附进境单证类型' prop='FORM_TYPE'>
                            <Select style="width:90%" v-model='modelKey.FORM_TYPE' >
                            <Option value="1">ATA</Option>
                            <Option value="2">展览品</Option>
                            <Option value="3">保税货物</Option> 
                            <Option value="4">其他</Option> 
                        </Select>
                        </FormItem>
                    </Col>
                    <Col span=12>
                        <FormItem label='展品随附进境单证号' prop='FORM_ID'>
                            <Input v-model='modelKey.FORM_ID' type='text' style="width:90%" :disabled="modelKey.FORM_TYPE!='4'" /> 
                        </Select>
                        </FormItem>
                    </Col>
                </Row>
                
            </Form>
            <div slot='footer'>
                    <Button type="default" size="large" @click="modelShow=false">取消</Button>
                    <Button type="primary" size="large" @click='Ok'>提交</Button>
            </div>
            <!-- <Row class="editer">
            
                 <Col span=12>
                    <Col span=8>
                        <span>展品随附进境单证号</span>
                    </Col>
                    <Col span=16>
                        <Input type="text" style="width:90%"  v-model='modelKey.FORM_ID' :disabled='modelKey.FORM_TYPE!="4"'/>
                    </Col>
                </Col>
            </Row> -->


        </Modal>

        <!--详情-->
        <Modal v-model="detailDataModel" width="1200" :mask-closable="false" footer-hide>
            <p slot="header" style="text-align:center">
                <span>List of Overseas Exhibits 2018年首届中国国际进口博览会进境物资清单</span>
            </p>
            <div style="text-align:center">
                <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody'
                :disableStatus="disableStatus"></detail-table>
            </div>
        </Modal>
    </div>
</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import detailTable from '@/views/exhibits/detailTable'
import vague from './orignUnit/vague'
export default {
    components: {detailTable,vague},
    data(){
        const validName=(rule,value,callback)=>{
            if(this.modelKey.isDisabled||!this.modelKey.isOpration){ callback(); return}
            var index=-1;
            this.lists.forEach((item,i)=>{
                if(item.EXPOCOMPANY===value){
                    index=i
                }

            })
            if(index<0){
                this.NameTrue=false
                callback(new Error('参展商不存在！'))

            }else{
                if(this.modelKey.NAME.length>100){
                    this.NameTrue=false
                    callback(new Error('参展商长度超长！'))
                }else{
                    this.NameTrue=true
                    callback();

                }   
            }

        }
        const validORIGINAL=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('原产国不能为空！'))
            }else{
                if(value.length>64){
                    callback(new Error('原产国商长度超长！'))
                }else{
                    callback();
                } 
            }
        }
        const validweight=(rule,value,callback)=>{
            if(value==''||isNaN(value)){
                callback(new Error('毛重必须为数值！'))
            }else{
                callback();

            }
        }
        const validITEM=(rule,value,callback)=>{
            if(value===''){
                callback(new Error('展商名称不能为空！'))
            }else{
                callback();
                
            }
        }
        const count=(rule,value,callback)=>{
            if(value==''||isNaN(value)){
                callback(new Error('数量必须为数值！'))
            }else{
                // this.$refs.formEditor.validateField('ITEM_QTY')
                callback();

            }
        }
        const price=(rule,value,callback)=>{
            if(value==''||isNaN(value)){
                callback(new Error('单价必须为数值！'))
            }else{
                callback();
            }
        }
    
        const cerNo=(rule,value,callback)=>{
            if(value){
                var rule1=value.slice(4,7)
                var rule2=value.slice(8,9)
                if(value.length===18&&rule1=='201'&&rule2=='1'){
                    callback()
                }else{
                    callback(new Error('展品随附进境单证号不合法！'))
                }
               }

        }
        const code=(rule,value,callback)=>{
            if(value&&value.length!=10){
                callback('商品编码只能是十位！')
            }else{
                callback()
            }
        }
        const position=(rule,value,callback)=>{
            
            if(this.modelKey.isDisabled||!this.modelKey.isOpration2){ callback(); return}
            var index=-1;
            if(this.params.hallno==''||this.params.hallnoTwo==''||value[0]===this.params.hallno||value[0]===this.params.hallnoTwo){
                this.lists2.forEach((item,i)=>{
                    if(item.PLACEPOSITION===value){
                        index=i
                    }
                })
                if(index<0){
                    this.NameTrue2=false
                    callback(new Error('展台号不存在！'))
                }else{
                    this.NameTrue2=true
                    callback();
                }
                    
            }else{
                this.NameTrue2=false
                callback(new Error('您不能新增该展台数据！'))
                    
            } 
            
        
        }
        return{
            RadioType:'全部',
            modelShow:false,
            isAdd:false,
            isShow:false,
            isShow2:false,
            NameTrue:true,
            NameTrue2:true,
            lists:[],
            lists2:[],
            url:'',
            rulesCustom:{
                NAME:[
                    {required:true,validator:validName,trigger:'change'}
                ],
                ORIGINAL:[
                    {required:true,validator:validORIGINAL,trigger:'blur'}
                ],
                ITEM_GROSS_WEIGHT:[
                    {required:true,validator:validweight,trigger:'blur'}
                ],
                ITEM:[
                    {required:true,validator:validITEM,trigger:'blur'}
                ],
                ITEM_QTY:[
                    {required:true,validator:count,trigger:'blur'}
                ],
                ITEM_VALUES:[
                    {required:true,validator:price,trigger:'blur'}
                ], 
                FORM_ID:[
                    {validator:cerNo,trigger:'blur'}
                ],
                PROD_HS_CODE:[
                    {validator:code,trigger:'blur'}

                ],
                POSITION:[
                    {required:true,validator:position,trigger:'change'}
                ]


            },

            // lock:false,
            columnsList:[
                {
                    title:'操作',
                    width:180,
                    align:'center',
                    render:(h,params)=>{
                        return h('div',{
                            style:{
                                textAlign:'center'
                            }
                        },[
                            h('Button',{
                                props:{
                                    type:'primary',
                                    disabled:params.row.DATA_STATUS==='3'
                                },
                                on:{
                                    click:()=>{
                                        this.modelKey=params.row
                                        this.modelKey.isDisabled=true
                                        this.modelKey.FORM_TYPE=this.modelKey.ITEM_STATUS='1'
                                        this.isAdd=false
                                        this.modelShow=true
                                    }
                                }

                            },'编辑'),
                            h('Poptip',{
                                props:{
                                    confirm:true,
                                    title:'确认作废此条数据！',
                                    placement:'top-end'
                                },
                                style:{
                                        textAlign:'left'
                                },
                                on:{
                                    'on-ok':()=>{
                                        publicInter(interfaceUrl. removeExhibitsById,{id:params.row.ID}).then(r=>{
                                            if(r.code==='200'){
                                                this.$Message.success('作废成功！')
                                                this.query()     
                                            }else{

                                                this.$Message.error('作废失败！')

                                            }
                                            
                                    })
                                        
                                    }
                                },
                                style:{
                                        margin:'0 5px',
                                    }
                                },
                                
                                
                                [
                                    h('Button',{
                                        props:{
                                        type:'error',
                                        disabled:params.row.DATA_STATUS==='3'
                                        }
                                    },
                                    '作废')
                                ],
                            ),
                        ])
                    }
                },
                {
                    title: '参展商',
                    key: 'NAME',
                    align:'center',
                     width:200,
                },
                 {
                    title: '物资清单号',
                    key: 'LISTHEADNO',
                    align:'center',
                    width:200,
                    render:(h,params)=>{
                         return h('a',{
                            on:{
                                click : ()=>{
                                    // this.queryExpoHeadDetail('cf01fe31f8de4cb6b5dbf498713f7243');
                                    this.queryExpoHeadDetail(params.row.LISTHEADUUID);
                                }
                            }
                        },params.row.LISTHEADNO)
                        // params.row.LISTHEADNO)
                    }
                },
                {
                    title: '展台号',
                    key: 'POSITION',
                    align:'center',
                    width:120,
                },
                {
                    title: '展品名称',
                    key: 'ITEM',
                    align:'center',
                    width:180,
                },
                {
                    title:'总价',
                    key:'ITEM_TOTAL',
                    width:100
                },
                {
                    title: '数量',
                    key: 'ITEM_QTY',
                    align:'center',
                    width:90,
                },
                {
                    title: '单价',
                    align:'center',
                    key:'ITEM_VALUES',
                    width:120,
                },
                 {
                    title: '提单号',
                    key: 'BILL_NO',
                    align:'center',
                     width:200,

                },
                {
                    title: '展区',
                    key: 'AREA',
                    align:'center',
                    width:120,
                },
                {
                    title: '毛重',
                    key: 'ITEM_GROSS_WEIGHT',
                    align:'center',
                    width:90,
                    
                },
                
                {
                    title: '商品编码',
                    key: 'PROD_HS_CODE',
                    align:'center',
                    width:110,
                },
                {
                    title: '原产地',
                    key: 'ORIGINAL',
                    align:'center',
                    width:90,
                },       
                {
                    title:'货物当前状态',
                    key:'ITEM_STATUS',
                    width:200,
                    render:(h,params)=>{
                        return h('div',params.ITEM_STATUS=='1'?'到港':params.ITEM_STATUS=='2'?'到仓库':params.ITEM_STATUS=='3'?'到馆':'')
                    }
                },
                {
                    title:'进仓库日期',
                    key:'BW_DATE',
                     width:200,
                },
                {
                    title:'进展馆日期',
                    key:'HALL_DATE',
                     width:200,
                },
                {
                    title:'展品随附进境单证类型',
                    key:'FORM_TYPE',
                     width:200,
                     render:(h,params)=>{
                        return h('div',params.FORM_TYPE=='1'?'ATA':params.FORM_TYPE=='2'?'展览品':params.FORM_TYPE=='3'?'保税货物':params.FORM_TYPE=='4'?'其他':'')
                    }
                },
                {
                    title:'展品随附进境单证号',
                    key:'FORM_ID',
                     width:200,
                     
                },
                {
                    title:'最近操作人',
                    key:'LATESTOPERATEUSERID',
                    width:150
                },
                
            ],
            dataList:[],
            params:{
                item:"",
                original:"",
                position:"",
                name:"",
                status:'2',
                hallno:'',
                hallnoTwo:'',
                pageNum:1,
                pageSize:20,
            },
            totalNumber:0,
            detailDataModel:false,
            basis2:{
                totalpackages:'',
                exhibitor:"",
                exhibitorcountry:"",
                hallno:"",
                hallnoArr:[],
                boothno:"",
                company:"",
                boothno2:"",
                contact:"",
                tel:"",
                fax:"",
                email:"",
                //复制参展商国别
                countrycode:"",
                exhtype:'',
                exhibitorid:""
            },
            modelKey:{
                isDisabled:true,
                isOpration:false,
                 NAME:'',// 	参展商
	             ORIGINAL:'',//	原产地
	             AREA:'',//	展区
	             POSITION:'',//	展台号
	             ITEM_GROSS_WEIGHT:'',//毛重
	             ITEM:'',//展品名称
	             ITEM_QTY:'',// 数量
	             ITEM_VALUES:'',// 单价
	             PROD_HS_CODE:'',//商品编码
	             LISTHEADNO:'',// 物资清单号
	             BILL_NO:'',//提单号
	             ITEM_STATUS:'',// 货物当前状态
	             BW_DATE:'',//进仓库日期
	             HALL_DATE:'',//进展馆日期
	             FORM_TYPE:'1',//展品随附进境单证类型
	             FORM_ID:''//展品随附进境单证号

            },
            basisBody:[],
            disableStatus:true,
            basis:{   
                exhibitionname:"CHINA INTERNATIONAL IMPORT EXPO 2018,5-10 November 2018",
                exhibitionnamecn:"「 CIIE 2018中国国际进口博览会 」2018年11月5日-10日",
                exhibitionvenue:'NECC(Shanghai)-hongqiao,Shanghai,PR China',
                exhibitionvenuecn:'中国 上海 虹桥 国家会展中心',
            },
        }
    },
    mounted(){
        this.url='eb'+interfaceUrl.queryExpoByName
        const that=this
        document.addEventListener('click',function(e){
            if(e.target.className!='itemClass'){
                that.isShow=false
                that.isShow2=false
                
            }
        })
    },
    methods:{
        inputBlur(e){
            // delete this.modelKey.isOpration
            if(!this.NameTrue){
                this.modelKey.NAME=''
            }

           
        },
        inputFocus(){
            this.modelKey.isOpration=true
        },
        inputBlur2(e){
            // delete this.modelKey.isOpration
            if(!this.NameTrue2){
                this.modelKey.POSITION=''
            }

           
        },
        inputFocus2(){
            this.modelKey.isOpration2=true
        },
        changePage(pageNum){
            this.query(pageNum);
        },
        envetPop(e){
            e.stopPropagation()
            e.cancelBubble=true   
        },
      
        selectList(value){
            this.modelKey.NAME=value.EXPOCOMPANY
            this.modelKey.ORIGINAL=value.HQCOUNTRY
            if(this.params.hallno==''||this.params.hallnoTwo==''){
                 this.modelKey.POSITION=value.PLACEPOSITION
                 this.modelKey.isOpration2=false
            }else if(this.params.hallno==value.PLACEPOSITION[0]||this.params.hallnoTwo==value.PLACEPOSITION[0]){
                this.modelKey.POSITION=value.PLACEPOSITION
                this.modelKey.isOpration2=false
            }else{
                this.modelKey.POSITION=value.PLACEPOSITION
                this.modelKey.isOpration2=true
            }
           

            
            // this.modelKey.isOpration=false
            this.isShow=false
        },
         selectList2(value){
            this.modelKey.NAME=value.EXPOCOMPANY
            this.modelKey.ORIGINAL=value.HQCOUNTRY
            this.modelKey.POSITION=value.PLACEPOSITION
            // this.modelKey.isOpration2=false
            this.modelKey.isOpration=false
            this.isShow2=false
        },
        remote2(e){
             publicInter('eb'+interfaceUrl.queryExpoByBoothno,{placeposition:e.target.value}).then(r=>{
                if(r.code=='200'&&r.list.length>0){
                    this.lists2=r.list
                    this.isShow2=true
                }else{
                    this.isShow2=false
                    this.lists2=[]
                    }
                })
        },
        
        remote(e){
             publicInter('eb'+interfaceUrl.queryExpoByName,{expocompany:e.target.value}).then(r=>{
                if(r.code=='200'&&r.list.length>0){
                    this.lists=r.list
                    this.isShow=true
                }else{
                    this.isShow=false
                    this.lists=[]
                    }
                })
           
        },
        query(pageNum){
            this.params.pageNum = pageNum || 1;
            switch(this.RadioType){
                case '全部':this.params.status='2';break;
                case '未校对':this.params.status='0';break;
                case '已校对':this.params.status='1';break;
                default:break;
            }

            publicInter(interfaceUrl.getExhibitsByUserId,this.params).then(r=>{
                if(r){
                    if(r.code === '200'){
                        var data=r.resultList.list
                        data.forEach(element => {
                            element.isRevise=false
                        });
                        this.dataList = data;
                        this.params.hallnoTwo=this.modelKey.hallnoTwo=r.hallnoTwo
                        this.params.hallno=this.modelKey.hallno=r.hallno
                        this.totalNumber = r.resultList.totalRow;
                    }
                    else{
                        this.$Modal.error({content:r.data});
                    }
                }
            });
        },
        queryExpoHeadDetail(listheaduuid){
            let params = {
                listheaduuid:listheaduuid
            }
            let url = interfaceUrl.queryExpoHeadDetailEA;
            publicInter(url,params).then(r=>{
                if(r){
                    if(r.head){
                        this.basis2 = this.lowerJSONKey(r.head);
                        this.basisBody = this.lowerJSONKey(r.body);
                        
                        this.basis2.countrycode = this.basis2.exhibitorcountry;

                        this.basis2.hallnoArr = this.basis2.hallno.split(",")

                        this.detailDataModel = true;
                    }
                    else if(r.error){
                        // this.$Message.error(r.error);
                        this.$Modal.error({content:r.error})
                    }
                }
            })
        },
        rowClass(row,index){
            if(row.LISTHEADNO){
                return 'green'
            }else{
                return 'blue'
            }


        },
        Ok(){
              if(!this.isAdd){
                  var valied=['ITEM_QTY','ITEM_VALUES','ITEM_STATUS','FORM_TYPE']
                var isOk=true
                valied.forEach(item=>{
                    if(!this.modelKey[item]){
                       isOk=false
                    }
                 })
                if(!isOk){
                    this.$Message.error('提交失败，必填字段为空！');
                    // this.modelShow=false
                    return false
                }
                 publicInter(interfaceUrl.modifyOneExhibits,{
                        ITEM_QTY:this.modelKey.ITEM_QTY,
                        ITEM_VALUES:this.modelKey.ITEM_VALUES,
                        PROD_HS_CODE:this.modelKey.PROD_HS_CODE,
                        ITEM_STATUS:this.modelKey.ITEM_STATUS,
                        BW_DATE: this.formateTime(this.modelKey.BW_DATE),
                        HALL_DATE:this.formateTime(this.modelKey.HALL_DATE),
                        FORM_TYPE:this.modelKey.FORM_TYPE,
                        FORM_ID:this.modelKey.FORM_ID,
                        id:this.modelKey.ID
                    }).then(r=>{
                        if(r.code==='200'){
                            this.$Message.success('修改成功！')
                            this.modelShow=false
                             this.query()
                        }else{
                            this.$Message.error('修改失败！')
                        }
                        
                       
                    })

              }else{
                  var valid=['NAME','ORIGINAL','ITEM_GROSS_WEIGHT','ITEM','ITEM_QTY','ITEM_VALUES','FORM_TYPE','POSITION'],isOk=true
                  valid.forEach(item=>{
                     if(!this.modelKey[item]){
                            isOk=false
                        }
                    })
                    if(!isOk){
                        this.$Message.error('提交失败，必填字段为空！');
                        // this.modelShow=false
                        return false
                    }
                    this.modelKey.HALL_DATE=this.formateTime(this.modelKey.HALL_DATE),
                    this.modelKey.BW_DATE=this.formateTime(this.modelKey.BW_DATE),
                    delete this.modelKey.isOpration
                    delete this.modelKey.isOpration2
                    publicInter(interfaceUrl.addOneExhibits,this.modelKey).then(r=>{
                        if(r.code==='200'){
                            this.$Message.success('新增成功！')
                            this.modelShow=false
                            this.query()
                        }else{
                            this.$Message.error('新增失败！')
                        }
                        
                    })
              }
              
            
            


        },
        formateTime(t){
            if(t){
                var time=new Date(t)
            var y,m,d;
            y=time.getFullYear()
            m=time.getMonth()+1;
            d=time.getDate()
            m=m<10?'0'+m:m;
            d=d<10?'0'+d:d;
            return y+'-'+m+'-'+d;
            }else{
                return ''
            }
            



        },
        addRow(){
            this.modelKey={
                    addRow:true,
                    NAME:'',// 	参展商
	                ORIGINAL:'',//	原产地
	                AREA:'',//	展区
	                POSITION:'',//	展台号
	                ITEM_GROSS_WEIGHT:'',//毛重
	                ITEM:'',//展品名称
	                ITEM_QTY:'',// 数量
	                ITEM_VALUES:'',// 单价
	                PROD_HS_CODE:'',//商品编码
	                LISTHEADNO:'',// 物资清单号
                    BILL_NO:'',//提单号
                    hallno:this.modelKey.hallno,
                    hallnoTwo:this.modelKey.hallnoTwo,
	                ITEM_STATUS:'1',// 货物当前状态
	                BW_DATE:'',//进仓库日期
	                HALL_DATE:'',//进展馆日期
	                FORM_TYPE:'1',//展品随附进境单证类型
	                FORM_ID:''//展品随附进境单证号
            }
            this.modelShow=true
            this.isDisabled=false
            this.isAdd=true
           

        },
        // 后台返回大写，将key值转成小写
        lowerJSONKey(jsonObj){
            if(Object.prototype.toString.call(jsonObj) === "[object Array]"){
                for (let i = 0; i < jsonObj.length;i++){
                    this.lowerJSONKey(jsonObj[i])
                }
                return jsonObj;
            }
            else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
                for(let key in jsonObj){
                    jsonObj[key.toLocaleLowerCase()] = jsonObj[key];
                    if(key !== key.toLocaleLowerCase()){
                        delete jsonObj[key];
                    }

                }
                return jsonObj;
            }
        },
        blurBoothno(){
            this.params.position = this.params.position.toLocaleUpperCase();
        },
        backfill(val){
            var str='';
            switch(val){
                case '1':str='ATA';break;
                case '2':str='展览品';break;
                case '3':str='保税货物';break;
                case '4':str='其他';break;
                default:break;
            }
            return str;
        }
    }
}
</script>
<style scoped  rel="stylesheet/scss" lang="scss">
// .ivu-row{
//     padding: 16px;
//     .ivu-col-span-12{

//         display: flex;
//         margin-top: 16px;
//         align-items: center;
//         .ivu-col-span-8{
//             // text-align: left;
//             font-size: 14px;
//         }
//     }
// }

.searchRow{
    >span{
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
        height: 32px;
        line-height: 32px;
    }
}
.itemClass{
    position: relative;
    .ulclass{
        list-style: none;
        padding:5px 0;
        margin: 0;
        width: 90%;
        top: 40px;
        position: absolute;
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 4px;
        z-index: 2;
        overflow:auto;
        max-height: 200px;
        will-change: top, left;
        transform-origin: center bottom 0px;
        li{
            white-space: nowrap;
            font-size: 14px;
            padding: 5px 10px;
            cursor: pointer;
            &:hover{
                background: #ececec;
            }
        }
         &::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #6e6e6e;
            outline: #333 solid 1px;
            border-radius: 20px;
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }
        
    }
}
</style>
