<template>
    <div class="exhibitorSearch">
        <h1>物资证明函审批状态查询</h1>
        <DatePicker type="date" placeholder="起始日期" size='large' style="width: 200px;background:transparent;" v-model="startDate"></DatePicker>
        <DatePicker type="date" placeholder="结束日期" size='large' style="width: 200px" v-model="endDate"></DatePicker>
        <Select v-model="valueSelect" style="width:150px" size='large' placeholder="请选择审批状态">
            <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="certificateno" size='large' style="width:150px" placeholder="请输入证明函编号" />
        <Input v-model="billno" size='large' style="width:150px" placeholder="请输入提单号" />
        <div style="width: 100px;display: inline-block;margin-left: 20px">
            <Button type="primary" size='large' long @click="query">查询</Button>
        </div>
        <!-- <div style="width: 160px;display: inline-block;margin-left: 40px" v-if="role==='ROLE_EB'">
            <Button type="primary" size='large' long @click="exportFun">导出所有勾选为Excel</Button>
        </div> -->
        <!-- <div style="width: 150px;display: inline-block;margin-left: 40px">
            <Button type="primary" size='large' long @click="sendMessage">发送所有勾选报文</Button>
        </div> -->
        <div style="padding-top: 20px;">
            <Table :data="tableData1" :columns="tableColumns1" @on-selection-change='changeHandler' stripe class="self"></Table>
            <div style="margin: 10px;overflow: hidden" v-if="parseInt(totalPage) > 1">
                <div style="float: right;">
                    <Page :total="totalNumber" :current="form.pageNum" @on-change="changePage" show-total></Page>
                </div>
            </div>
        </div>
        
        <div id="myRiskPrint" v-show="false">
            <print-risk v-for="item in printList" :key="item.ITEMUUID" :head='item.head' :tableLits='item.body'/>
        </div>
    </div>
</template>

<script>
    import addZBH from '../unit/tableTemp';
    import {getCookie} from '../../../until/getToken';
    import { publicInter,filedownload  } from '@/api/http';
    import interfaceUrl from '@/api/interfaceUrl'
    import printRisk from '@/views/exhibits/unit/printRisk'
    export default {
        name: "searchvue",
        data(){
            return {
                certificateno:'',
                billno: '',
                stateList:[{
                        value:0,
                        label:"暂存可修改"
                    },{
                        value:1,
                        label:"提交待审批"
                    },{
                        value:7,
                        label:"审批已同意"
                    },{
                        value:8,
                        label:"退单可重报"
                    },{
                        value:9,
                        label:"作废"
                    },{
                        value:"all",
                        label:"全部状态"
                }],
                startDate:"",
                endDate: "",
                valueSelect:"",
                BillNoArr:[],
                form:{
                    status:"",
                    startDate:"",
                    endDate:"",
                    certificateno: "",
                    billno: '',
                    pageNum:1,
                    pageSize:10
                },
                tableData1 : [],
                tableColumns1 :[
                    {
                        type: 'selection',
                        width:50,
                        align:'center'
                    },
                    {
                        title:"证明函编号",
                        key:'CERTIFICATENO'
                    },
                        {
                        title: '提(运)单号',
                        key: 'BILLNO'
                    },
                        {
                        title:"经营单位",
                        key:'COMPANYNAME'
                    },
                        {
                        title:"代理报关机构",
                        key:'AGENTNAME'
                    },
                    {
                        title:'申请时间',
                        key:'REC_UPD_DT'
                    },
                    {
                    title:'状态',
                    key:'STATUS',
                    render:(h, params) =>{
                            switch(params.row.STATUS){
                                case "0":
                                    return h('span',"暂存可修改");
                                    break;
                                case "1":
                                    return h('span',"提交待审批");
                                    break;
                                case "7":
                                    return h('span',"审批已同意");
                                    break;
                                case "8":
                                    return h('span',{
                                        attrs:{
                                            title:params.row.REJECTREASON?"拒绝理由："+params.row.REJECTREASON:"拒绝理由:无"
                                        }
                                    },"退单可重报");
                                    break;
                                case "9":
                                    return h('span',"作废");
                                    break;
                            }
                        }
                    },
                    {
                        title:'审批时间',
                        key:'ACCEPTTIME'
                    },
                    {
                        title:'单一窗口校验结果',
                        key:'SINGLEWINDOWVERIFYRESULT'
                    },
                    {
                    title:'操作',
                    width:310,
                    align:"center",
                    render:(h, params) =>{
                        //状态=7的时候，可以打印(2018年10月13日，改为所有情况下都可以打印)
                        return h('div', [
                            h('Button',{
                                props:{
                                    type:'primary',
                                    size : 'large'
                                },
                                style:{
                                    marginRight:'5px',
                                    'padding-left':'4px',
                                    'padding-right':'4px',
                                    'width':'100px',
                                },
                                on:{
                                    click : ()=>{
                                        this.$router.push({
                                            name:'exhibitsDetail',
                                            params:{
                                                basicinfouuid:params.row.BASICINFOUUID,
                                                certificateno: params.row.CERTIFICATENO,
                                                status:params.row.STATUS,
                                                startDate:this.startDate,
                                                endDate:this.endDate,
                                                valueSelect:this.valueSelect
                                            }
                                        })
                                    }
                                }
                            },'查看'),
                            // h('Button',{
                            //     props:{
                            //         type:'primary',
                            //         size : 'large'
                            //     },
                            //     style:{
                            //         marginRight:'5px',
                            //         'padding-left':'4px',
                            //         'padding-right':'4px'
                            //     },
                            //     // attrs:{
                            //     //     disabled: params.row.STATUS !== "7"
                            //     // },
                            //     on:{
                            //         click : ()=>{
                            //             let url = "";
                            //             if(this.role == "ROLE_EC"){
                            //                 url = interfaceUrl.queryAllExpo2;
                            //             }
                            //             else{
                            //                 url = interfaceUrl.queryAllExpo;
                            //             }
                            //             this.$router.push({
                            //                 name:'zbhPrint',
                            //                 params:{
                            //                     basicinfouuid:params.row.BASICINFOUUID,
                            //                     url:url
                            //                 }
                            //             })
                            //         }
                            //     }
                            // },'打印证明函'),
                            // h('Button',{
                            //     props:{
                            //         type:'primary',
                            //         size : 'large',
                            //         title:'打印试用品尝散发申请表'
                            //     },
                            //     style:{
                            //         marginRight:'5px',
                            //         'padding-left':'4px',
                            //         'padding-right':'4px',
                            //     },
                            //     on:{
                            //         click : ()=>{
                            //             this.printTaste(params.row)                                      
                            //         }
                            //     }
                            // },'打印申请表'),
                            // h('Poptip', {
                            //     props: {
                            //         confirm: '',
                            //         placement:'top-end',
                            //         title:"您确认重置吗？"
                            //     },
                            //     style:{
                            //         textAlign:'left'
                            //     },
                            //     nativeOn:{
                            //         click: (e) => {
                            //             e.stopPropagation() 
                            //             var text=e.target.innerText.replace(/\s+/g,"")
                            //             if(text==='确定'||text==='ok'){
                            //                 this.resetExpo(params.row) 
                            //             }
                            //         }
                            //     }
                            // },[
                            // h('Button',{
                            //     props:{
                            //         type:'primary',
                            //         size:'large'
                            //     },
                            //     attrs:{
                            //         disabled: params.row.STATUS !== "7"
                            //     },
                            //     style:{
                            //         display:(this.role == "ROLE_EC")?"inline-block":"none",
                            //         'padding-left':'4px',
                            //         'padding-right':'4px'
                            //     }
                            // },'重置')]),
                            h('Button',{
                                attrs:{
                                    disabled: params.row.STATUS !== "7",
                                },
                                props:{
                                    type:'primary',
                                    size : 'large',
                                },
                                style:{
                                    display:(this.role == "ROLE_EC")?"inline-block":"none",
                                    'padding-left':'4px',
                                    'padding-right':'4px'
                                },
                                on:{
                                    click : ()=>{
                                        this.$Modal.confirm({
                                            content:'作废后的数据不可恢复！<br/>请确认是否将提单号为['+params.row.BILLNO+']的证明函作废',
                                            onOk:()=>{
                                                this.discardExpo(params.row.BASICINFOUUID);
                                            }
                                        });
                                    }
                                }
                            },'作废'),
                        ])
                    }
                }],
                totalPage : "0",
                totalNumber:0,
                position:"",
                transport:"",
                basisA:{},
                basisB:[],
                clickStaus:"",
                examineOpinion:"",
                role:"",
                disableS :"",
                detailData:[],
                printList:[],
            }
        },
        components:{
            addZBH,printRisk
        },
        created(){
            // this.role=getCookie('roler').includes("EC")?"ROLE_EC":'ROLE_EB';
            this.role='ROLE_EB'
            if(this.$route.params.valueSelect) {
                this.valueSelect = this.$route.params.valueSelect;

            }
            else if(this.role == "ROLE_EC"){
                this.valueSelect = 1;
            }
            if(this.$route.params.search){
                this.startDate = this.$route.params.startDate;
                this.endDate = this.$route.params.endDate;
            }

            if(this.valueSelect || this.$route.params.search){
                this.query();
            }
        },
        methods:{
            resetExpo(params) {
                let p = {
                    uuid: params.BASICINFOUUID
                }
                publicInter(interfaceUrl.reloadExamine, p).then(r=>{
                    if(r.code == "200"){
                        this.$Modal.success({content:r.msg})
                        this.query()
                    } else {
                        this.$Modal.error({content:r.msg})
                    }
                });
            },
            query(){
                this.form.pageNum = 1;
                this.form.status = this.valueSelect == "all"?"":this.valueSelect;
                this.form.startDate = this.formatDate(this.startDate);
                this.form.endDate = this.formatDate(this.endDate);
                this.form.certificateno = this.certificateno;
                this.form.billno = this.billno;
                this.queryList();
            },
            queryList(){
                var url = "";
                switch (this.role){
                    case 'ROLE_EB':
                        url = '/eb/importExpo/queryExpoList';
                        break;
                    case 'ROLE_EC':
                        url = '/public/materialsExamine/queryExpoList';
                        break;
                }

                publicInter(url,this.form).then(r=>{
                    if(r){
                        this.tableData1 =  r.list;
                        this.totalNumber = parseInt(r.totalRow);
                        this.totalPage = r.totalPage;
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
            changePage(pageNum){
                this.form.pageNum = pageNum;
                this.queryList();
            },
            mockTableData1(){
                let data = [];
                return data;
            },
            filterNull(arr){
                let r = arr.filter(function (x) {
                    return x.caseno !== ""
                })
                return r;
            },
            //查询详情
            searchDetail(params){
                var url = "";
                switch (this.role){
                    case 'ROLE_EB':
                        url = '/eb/importExpo/queryExpoList';
                        break;
                    case 'ROLE_EC':
                        url = '/ec/materialsExamine/queryExpoDetail';
                        break;
                }
                publicInter(url,params).then(r =>{
                    if(r){
                        r = JSON.parse(JSON.stringify(r).toLocaleLowerCase());
                        this.basisA = r.head;
                        this.detailData = [];
                        //this.detailData.push(r.bodydetail);
                        for (let i = 0; 13*i < r.bodydetail.length ;i++){
                            this.detailData.push(r.bodydetail.slice(13*i,13*(i+1)))
                        }
                    }
                });
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            // 后台返回大写，将key值转成小写
            lowerJSONKey(jsonObj){
                if(Object.prototype.toString.call(jsonObj) === "[object Array]"){
                    for (let i = 0; i < jsonObj.length;i++){
                        lowerJSONKey(jsonObj[i])
                    }
                }
                else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
                    for(let key in jsonObj){
                        jsonObj[key.toLocaleLowerCase] = jsonObj[key];
                        delete jsonObj[key];
                    }
                    return jsonObj;
                }
                return "";
            },
            changeHandler(selection){
                this.BillNoArr=[]
                if(selection.length>0){
                    selection.forEach(val=>{
                        this.BillNoArr.push(val.BILLNO)
                    })
                }
            },
            exportFun(){
                // var 
                publicInter(interfaceUrl.exportExhibitsForExcel,this.BillNoArr).then(r=>{
                    if(r.code==='500'||r.code==='400'){
                        this.$Message.error(r.msg)
                    }else{
                        filedownload(interfaceUrl.exportExhibitsForExcel,this.BillNoArr).then(r=>{
                            let url = window.URL.createObjectURL(new Blob([r]))
                            let link = document.createElement('a')
                            // evt = document.createEvent("HTMLEvents");
                            link.style.display = 'none'
                            link.href = url
                            link.setAttribute('download','展览品.zip')
                            // link.dispatchEvent(evt);

                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        })
                    }
                })

            },
            discardExpo(uuid){
                let param = {
                        //主键
                        uuid:uuid,
                        //申请状态
                        status:"9"
                        //7.同意，8.拒绝，9.作废
                    };
                    publicInter(interfaceUrl.toExamine,param).then(r=>{
                        if(r){
                            if(r.code === '200'){
                                this.query();
                                this.$Message.success("作废成功");
                            }
                            else{
                                this.$Modal.error({content:r.error});
                            }
                        }
                    })
            },
            printTaste(obj){
                let param = {
                    basicinfouuid:obj.BASICINFOUUID
                }
                publicInter(interfaceUrl.queryMaterialsExaminePrintByCertificateno,param).then(r=>{
                    if(r){
                        if(r.code === '200'){
                            this.printList = r.data;
                            setTimeout(function(){
                                let newHtml = document.getElementById('myRiskPrint').innerHTML,
                                oldHtml = document.body.innerHTML;
                                document.body.innerHTML = newHtml;
                                window.print();
                                window.location.reload();
                                document.body.innerHTML = oldHtml;
                            },50);   
                        }
                        else{
                            this.$Modal.error({content:r.data});
                        }
                    }
                })
            }
        },
        mounted(){
            this.query()
        }
    }
</script>
<style scoped>
    @media print {
        .not-print {
            opacity: 0
        }
    }
    h1{
        margin-bottom:10px;
    }
</style>
