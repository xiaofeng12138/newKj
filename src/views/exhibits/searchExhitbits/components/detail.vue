<template>
    <div>
        <h2>{{ title }}<Button v-if="view === 'detail'" type="primary" style="float: right" @click="back()">返回</Button></h2>
        <div class="myIndex">
            <prove-letter-temp :basis="basis" :basis2="basis2" :disableStatus="disableStatus"></prove-letter-temp>
            <Row style="text-align: center;margin-bottom: 20px;" class="no-print">
                <Button type="primary" v-if="(basis.status === '0' || basis.status === '8') && this.role==='ROLE_EB' " @click="addExp('0')">暂存</Button>
                <Button type="primary" v-if="(basis.status === '0' || basis.status === '8') && this.role==='ROLE_EB'"  style="margin-left: 20px;" @click="addExp('1')" :disabled="uuid === '' || dataList.length === 0 ">提交</Button>
                <Button type="success" v-if="basis.status === '1' && this.role==='ROLE_EC'" style="margin-left: 20px;" @click="agreeFun('7')">同意</Button>
                <Button type="error" v-if="basis.status ==='1' && this.role==='ROLE_EC'" style="margin-left: 20px;" @click="agreeFun('8')">拒绝</Button>
                <Button type="primary" v-if="(basis.status ==='0'|| basis.status === '8') && this.role==='ROLE_EB'  " @click ="addMaterialFirst" style="margin-left: 20px;">增加清单</Button>
                <!--<Button type="primary" @click ="print" style="margin-left: 20px;">打印</Button>-->
            </Row>
            <!--详情的table显示-->
            <h3 style="text-align: left;margin-top: 30px;border-top: 2px solid #999;height: 40px;line-height: 40px" v-if="dataList.length != 0 ">证明函物资清单详情</h3>
            <Table style="margin-bottom: 30px" :columns="columnsList" :data="dataList" v-if="dataList.length != 0 "></Table>
            <!--详情-->
            <Modal v-model="detailDataModel" width="1200" :mask-closable="false">
                <p slot="header" style="text-align:center">
                    <span>List of Overseas Exhibits {{this.titleDate}}中国国际进口博览会进境物资清单</span>
                </p>
                <div style="text-align:center">
                    <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody' :positionList = "positionList" @changeData='myChangeData'
                    :disableStatus="disableStatus" :iHaveId = 'iHaveId'></detail-table>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" v-if="(basis.status === '0'|| basis.status === '8') && this.role==='ROLE_EB'" @click = 'addMaterialDetail'>增加</Button>
                    <Button type="primary" v-if="(basis.status === '0'|| basis.status === '8') && this.role==='ROLE_EB'" @click = "addMaterial">保存</Button>
                    <!-- <Button @click="closeMadol">关闭</Button> -->
                </div>
            </Modal>
            <!--添加提单初始化的时候选择运输方式-->
            <Modal v-model="myModel1" width="280" :mask-closable="false" :closable="false">
                <p slot="header" style="text-align:center">
                    <span>请选择运输方式</span>
                </p>
                <div style="text-align:center">
                    <Select v-model="basis.transportmode" style="width:240px">
                        <Option v-for="item in transportList" :value="item.ID" :key="item.ID">{{ item.ID+"&nbsp;&nbsp;&nbsp;&nbsp;"+item.NAME}}</Option>
                    </Select>
                </div>
                <div slot="footer" style="text-align:center">
                    <Button type="primary" style="width: 240px" size="large" long @click="submitTransport">确定</Button>
                </div>
            </Modal>
            <!--点击拒绝后填写拒绝原因-->
            <Modal v-model="defineModel"
                   title='拒绝理由'
                   width="360">
                <Row>
                    <Col span="4"><span class="centerSpan">拒绝理由</span></Col>
                    <Col span="20">
                        <Input v-model="examineOpinion" type="textarea" :autosize="{minRows: 4,maxRows: 6}"></Input>
                    </Col>
                </Row>
                <div slot="footer" style="text-align: center">
                    <Button type="error" @click="definedSubmitFun">确认</Button>
                    <Button @click="defineModel = false">关闭</Button>
                </div>
            </Modal>
            <!--第一步：增加提单时选择参展商-->
            <Modal v-model="billNoModel" width="280" :mask-closable="true" :closable="true">
                <p slot="header" style="text-align:center">
                    <span>请填写展台号</span>
                </p>
                <div style="text-align:center">
                    <cvague :firstVal = 'basis2' :urlkey = "urlkey1" :showMyUrlKey="showMyUrlKey" :vkey="vagueKey1" :rkey='rkey' :url='vagueUrl1' ref="cvage1" 
                     @changeboothno='changeexhibitor1' style="width:100%;display:inline-block"></cvague>
                </div>
                <div slot="footer" style="text-align:center">
                     <Button style="width: 240px" type="primary"  size="large" long @click="confirmExtor1">确定</Button>
                </div>
            </Modal>

            <!--第二步：增加提单时选择参展商-->
            <Modal v-model="exhibitorModel" width="280" :mask-closable="true" :closable="true">
                <p slot="header" style="text-align:center">
                    <span>请填写参展商</span>
                </p>
                <div style="text-align:center">
                    <cvague :firstVal = 'basis2' :urlkey = "urlkey" :vkey="vagueKey" :rkey='rkey' :url='vagueUrl' ref="cvage" 
                     @changeexhibitor='changeexhibitor' style="width:100%;display:inline-block"></cvague>
                </div>
                <div slot="footer" style="text-align:center">
                     <Button style="width: 240px" type="primary"  size="large" long @click="confirmExtor">确定</Button>
                </div>
            </Modal>


            <!-- 消息提示框的Modal -->
           <Modal
                v-model="resMsg"
                width = "800px"
                class-name='vertical-center-modal '
                :footer-hide = true
                :mask-closable = "false"
                :styles = "{top:'130px'}"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="closeMsg" size='30' />
            </p>
            <div>
                <h2 style="text-align:center;margin-top:10px;margin-bottom:10px">提示消息</h2>
              <div v-for = "(item,index) in rmsg" :key="index" style="margin-bottom:15px;font-size:14px">
                  <p style="margin-bottom:15px;font-size:14px">{{item}}</p>
              </div>
            </div>
          
        </Modal>
        </div>
    </div>

</template>

<script>
    import proveLetterTemp from '@/views/exhibits/proveLetterTemp'
    import detailTable from '@/views/exhibits/detailTable'
    import interfaceUrl from '@/api/interfaceUrl'
    import { publicInter } from '@/api/http'
    import {getCookie} from '../../../../until/getToken';
    import {mapState,mapActions} from 'vuex'
    import cvague from '@/views/exhibits/unit/commonVague'
    export default {
        components: {proveLetterTemp,detailTable,cvague},
        data(){
            return{
                //保存返回值
                rmsg:[],
                resMsg:false, //返回值对话框
                certificateno: '',
                cookieDate: '',
                titleDate: "",
                uuid:'',
                basis:{
                    certificateno:"",
                    countrycode:"",
                    transportname:"",
                    importdate:"",
                    billno:"",
                    packagequantity:"",
                    weight:"",
                    companyname:"国家会展中心(上海)有限责任公司",
                    companycode:"3120915015",
                    agentname:"",
                    agentcode:"",
                    contactname:"",
                    contactmethod:"",
                    monitormethod:"",
                    // guaranteeno:"",
                    // price:"",
                    // consignee:"",
                    remark:"",
                    guaranteeperson:"冯剑辉",
                    guaranteepersontele:"021-67008655",
                    // operator:"",
                    // certifier:"",
                    // totalprice:"",
                    status:'0',
                    //运输方式
                    transportmode:"",
                    exhibitionname:"CHINA INTERNATIONAL IMPORT EXPO 2018,5-10 November 2018",
                    exhibitionnamecn:"「 CIIE 2018中国国际进口博览会 」2018年11月5日-10日",
                    exhibitionvenue:'NECC(Shanghai)-hongqiao,Shanghai,PR China',
                    exhibitionvenuecn:'中国 上海 虹桥 国家会展中心',
                },
                basis2:{
                    totalpackages:'',
                    exhibitor:"",
                    exhibitorcountry:"",
                    hallno:"",
                    hallnoArr:'',
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
                disableStatus:false,
                columnsList: [
                    {
                    title: '参展商',
                    key: 'exhibitor',
                    align:'center'
                    },
                    {
                        title: '参展商国别',
                        key: 'exhibitorcountry',
                        align:'center'
                    },
                    {
                        title: '馆号',
                        key: 'hallno',
                        align:'center'
                    },
                    {
                    title: '展台号',
                    key: 'boothno',
                    align:'center'
                    },
                    {
                    title: '操作',
                    align:'center',
                    render:(h,params) =>{
                        let that = this;
                        return h('div',[
                            h('Button',{
                                props:{
                                    type:'primary',
                                },
                                style: {
                                    // marginRight:'5px'
                                },
                                on:{
                                    click:()=>{
                                        that.queryExpoHeadDetail(params.row.listheaduuid);
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
                                    textAlign:'left',
                                    
                                },
                                nativeOn:{
                                    click(e){
                                        e.stopPropagation() 
                                        var text=e.target.innerText.replace(/\s+/g,"")
                                        if(text==='确定'||text==='ok'){
                                            that.removeExpoHeadDetail(params.row.listheaduuid);
                                        }
                                    }
                                }
                            },[
                            h('Button',{
                                props:{
                                    type:'error',
                                    size:'large'
                                },
                                attrs:{
                                    disabled: !(that.role === 'ROLE_EB' && (that.basis.status === '0' || that.basis.status === '8'))
                                },
                                style:{
                                    marginLeft:'10px',
                                    display: false
                                }
                            },'删除')]),
                        ])
                    }
                }],
                dataList:[],
                detailDataModel:false,
                myModel1:true,
                transportList:[],
                positionList:[],
                title:'物资证明函申请',
                defineModel:false,
                role:'',
                // 物资证明函清单里面的table里面的初始状态
                examineOpinion:'',
                basisBody:[],
                detailDataUnit:{
                    caseno:"",
                    dimension:"",
                    length:"",
                    width:"",
                    height:"",
                    growssweight:"",
                    netweight:"",
                    goodsdescription:"",
                    goodsdescriptioncn:"",
                    countryoforigin:"",
                    quantity:"",
                    quantityunit:"",
                    unitprice:"",
                    totalprice:"",
                    hscode:"",
                    disposals:"",
                    tryoutFlag:"0",
                    tryout:"",
                    tasteFlag:"0",
                    taste:"",
                    distributeFlag:"0",
                    distribute:"",
                },
                //目前查看状态
                view:"Look",
                exhibitorModel:false,
                vagueUrl:"",
                vagueUrl1:"",
                urlkey:'expocompany',
                urlkey1:"placeposition",
                vagueKey:'exhibitor',
                vagueKey1:'boothno',
                rkey:'EXPOCOMPANY',
                showMyUrlKey:true,
                iHaveId:false,
                billNoModel:false
            }
        },
        computed:{
            ...mapState('exhibition',{
                basisBodyMap:state => state.basisBody
            })
        },
        methods:{
            closeMsg(){
                this.resMsg = false;
                this.$Modal.success({content:'保存成功'})
                this.queryExpoDetail();
                this.detailDataModel = false;
                this.resetBasisBody(this.basisBody);
            },
            ...mapActions('exhibition',[
                'resetBasisBody',
                'changeBodyLength',
                'addBodyLength',
            ]),
            closeMadol(){
                this.detailDataModel = false
                this.$refs.cvage.value=null
                this.$refs.cvage1.value=null
            },
            //暂存提交按钮的点击事件；0是暂存，1是提交
            addExp(saveStr){
                if(this.validator()){
                    this.basis.importdate = this.formatDate(this.basis.importdate);
                    this.basis.status = saveStr;
                    var params = {
                        importExpo: this.basis
                    }
                    publicInter(interfaceUrl.addExpo,params).then(r=>{
                        if(r){
                            if(r.code === '200'){
                                if(saveStr == '1'){
                                    this.$Modal.success({content:'提交成功'})
                                }
                                else{
                                    this.$Modal.success({content:'暂存成功'})
                                }
                                this.uuid = r.BASICINFOUUID;
                            }
                            else{
                                if(saveStr == '1'){
                                     this.basis.status = "0";
                                }
                                // this.$Message.error(r.error);
                                this.$Modal.error({content:r.error})
                            };
                        }
                    });
                }else{
                    console.log('失败');
                };
            },
            addMaterialFirst(){
                if(this.uuid == ""){
                    this.$Modal.warning({content:"请先保存证明函"});
                    return false;
                }
                this.basis2.exhibitor = "";
                this.basis2.boothno = "";
                // this.exhibitorModel=true;
                this.billNoModel = true;
            },
            //增加清单按钮的点击事件
            addDetail(){
                if(this.uuid == ""){
                    // this.$Message.warning('请先保存证明函');
                    this.$Modal.warning({content:"请先保存证明函"});
                    return;
                }
                //初始化
                this.detailDataModel = true;
            },
            //选择展商时候的确认键
            confirmExtor(){
                if(!this.$refs.cvage.value){
                    return
                }
                this.basis2 = {
                    totalpackages:'',
                    exhibitor:this.$refs.cvage.value,
                    exhibitorcountry:"",
                    hallno:"",
                    hallnoArr:'',
                    boothno:'',
                    company:"",
                    boothno2:"",
                    contact:'',
                    tel:'',
                    fax:"",
                    email:'',
                    countrycode:"",
                    exhtype:'',
                    exhibitorid:''
                };
                const that =this
                 this.$Modal.confirm({
                    title: '操作确认',
                    content: '展商库中未搜索到该企业，是否继续！',
                    onOk:()=>{
                         that.basisBody = [];
                        // 初始化basisBody
                        for (let i = this.basisBody.length; i < 5;i++){
                            that.basisBody.push(that.copyObj(that.detailDataUnit));
                        }
                        that.resetBasisBody(that.basisBody);
                        // this.changeBodyLength(5)
                        that.exhibitorModel = false;
                        that.detailDataModel = true;
                        that.disableStatus=false;
                        that.iHaveId = false;
                    }

                })
            },
            //选择展位号的时候的确认键
            confirmExtor1(){
                if(!this.$refs.cvage1.value){
                    return
                }
                this.$refs.cvage1.value="";
                this.exhibitorModel=true;
                this.billNoModel = false;
            },
            changeexhibitor(item){
                this.basis2 = {
                    totalpackages:'',
                    exhibitor:item.EXPOCOMPANY,
                    exhibitorcountry:"",
                    hallno:"",
                    hallnoArr:'',
                    boothno:item.PLACEPOSITION,
                    company:"",
                    boothno2:"",
                    contact:item.COMPANYCONTACTS,
                    tel:item.COMPANYCONTACTSMOBILE,
                    fax:"",
                    email:item.COMPANYCONTACTSEMAIL,
                    countrycode:"",
                    exhtype:'',
                    exhibitorid:item.COMPANYID
                };
                this.basisBody = [];
                // 初始化basisBody
                for (let i = this.basisBody.length; i < 5;i++){
                    this.basisBody.push(this.copyObj(this.detailDataUnit));
                }
                this.resetBasisBody(this.basisBody);
                // this.changeBodyLength(5)
                this.exhibitorModel = false;
                this.detailDataModel = true;
                this.disableStatus=false;
                this.iHaveId = true;
            },
            changeexhibitor1(item){
               this.basis2 = {
                    totalpackages:'',
                    exhibitor:item.EXPOCOMPANY,
                    exhibitorcountry:"",
                    hallno:"",
                    hallnoArr:'',
                    boothno:item.PLACEPOSITION,
                    company:"",
                    boothno2:"",
                    contact:item.COMPANYCONTACTS,
                    tel:item.COMPANYCONTACTSMOBILE,
                    fax:"",
                    email:item.COMPANYCONTACTSEMAIL,
                    countrycode:"",
                    exhtype:'',
                    exhibitorid:item.COMPANYID
                };
                this.basisBody = [];
                // 初始化basisBody
                // for (let i = this.basisBody.length; i < 1;i++){
                //     this.basisBody.push(this.copyObj(this.detailDataUnit));
                    
                // }
                this.resetBasisBody(this.basisBody);
                // this.changeBodyLength(5)
                this.billNoModel = false;
                this.detailDataModel = true;
                this.disableStatus=false;
                this.iHaveId = true; 
            },
            print(){
                document.body.innerHTML = document.getElementsByClassName("myIndex")[0].innerHTML;
                window.print();
                location.reload();
            },
            // 验证
            validator(){
                if(this.basis.transportmode == "2"){
                    if(this.basis.transportname === ""){
                        // this.$Message.warning('海运运输方式下，运输工具为必填');
                        this.$Modal.warning({content:"海运运输方式下，运输工具为必填"});
                        return false;
                    }
                }
                let needValidator = [{
                    key:'countrycode',
                    value:"贸易国别"
                },{
                    key:'importdate',
                    value:"进境日期"
                },{
                    key:'BillNo',
                    value:"提运单号"
                },{
                    key:'Weight',
                    value:"毛重(Kg)"
                },{
                    key:'MonitorMethod',
                    value:"监管方式"
                },{
                    key:'companyname',
                    value:"境内收发货人"
                },{
                    key:'companycode',
                    value:"境内收发货人十位编码"
                },{
                    key:'PackageQuantity',
                    value:"数量(件数)"
                },{
                    key:'AgentName',
                    value:"申报单位"
                },{
                    key:'AgentCode',
                    value:"申报单位十位编码"
                },{
                    key:'ContactName',
                    value:"申报方式联系人"
                },{
                    key:'ContactMethod',
                    value:"申报单位联系方式"
                }]

                for(let i = 0; i < needValidator.length;i++){
                    if(this.basis[needValidator[i].key] === ""){
                        // this.$Message.warning("请输入"+needValidator[i].value);
                        this.$Modal.warning({content:"请输入"+needValidator[i].value});
                        return false;
                    }
                }
                return true;
            },
            //确定运输方式
            submitTransport(){
                if(this.basis.transportmode !== ""){
                    this.myModel1 = false;
                }
                else{
                    // this.$Message.warning('请选择运输方式');
                     this.$Modal.warning({content:"请选择运输方式"});
                }
            },
            //对日期进行处理
            formatDate(form){
                if(form){
                    //判断传入的是不是日期
                    if(Object.prototype.toString.call(form) === '[object Date]'){
                        var year = form.getFullYear();
                        var mouth=form.getMonth()+1
                        var date=form.getDate();
                        return year+"-"+(mouth<10?("0"+mouth):mouth)+'-'+(date<10? ("0"+date):date);
                    }
                    else{
                        return form
                    }
                }
                return "";
            },
            definedSubmitFun(){
                var status = this.definedStaus == "拒绝"? "8":"9";
                var params = {
                    //国别
                    countryCode:this.basis.countrycode,
                    //件数
                    packageQuantity:this.basis.packagequantity,
                    //拒绝理由
                    examineOpinion:this.examineOpinion,
                    //主键
                    uuid:this.uuid,
                    //申请状态
                    status:status
                    //7.同意，8.拒绝，9.取消同意
                };
                publicInter(interfaceUrl.toExamine,params).then(r=>{
                    if(r){
                        if(r.code == "200"){
                            this.defineModel = false;
                            this.examineOpinion = "";
                            //this.$Modal.success({content:"拒绝成功",title:"拒绝成功"})
                            this.$router.push({
                                name:'zhongbohui',
                                params:{
                                    valueSelect:8
                                }
                            })
                        }
                        else{
                            this.$Modal.error({content:this.definedStaus+"失败:"+r.error,title:this.definedStaus+"失败"})
                        }
                    }
                });
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
            //保存物资证明函清单
            addMaterial(flag){
                this.$refs.cvage.value=null
                this.$refs.cvage1.value=null
                this.basis2.basicinfouuid = this.uuid;
                if(this.basis2.exhtype === "" || !this.basis2.exhtype){
                    // this.$Message.warning("请选择展品类别");
                    this.$Modal.warning({content:"请选择展品类别"});
                    return;
                }
                if(this.basis2.exhibitorid === "" || !this.basis2.exhibitorid){
                    // this.$Message.warning("请选择展品类别");
                    this.$Modal.warning({content:"请填写展商编号"});
                    return;
                }
                //可以发送的清单列表。清掉没有填的数据
                let senArr = this.filterNull(this.basisBodyMap);
                console.log(senArr)
                // return false
                //判断试用品尝散发是否符合标准
                if(this.validatorFlag(senArr)){
                    return;
                }
                //提单号，需要传给后台的时候需要
                this.basis2.billno = this.basis.billno;
                this.basis2.exhibitorcountry = this.basis2.countrycode;
                this.basis2.hallno = this.basis2.hallnoArr;
                console.log(this.basis2)
                // return false
                let params = {
                    head:this.copyObj(this.basis2),
                    body:this.copyObj(senArr)
                };

                if(flag){
                    params.head.flag = "1";
                }
                else{
                    params.head.flag = '0';
                }
                delete params.head.hallnoArr;
                delete params.head.countrycode;
                this.deleteSomeKey(params.body);
                publicInter(interfaceUrl.addMaterial,params).then(r=>{
                    if (r){
                        if(r.error){
                            this.$Modal.error({content:r.error})
                        }
                        else if(r.code == '211'){
                            this.$Modal.confirm({
                                okText:'是',
                                cancelText:'否',
                                title: '',
                                content: '该证明函下的此展商已存在，展商是否覆盖',
                                onOk: () => {
                                    this.addMaterial("flag");
                                },
                                onCancel: () => {
                                }
                            });
                        }
                        else if (r.code == '500'){
                         this.$Message.error({
                             content:r.msg,
                             duration:8
                         })    
                         return   
                        }
                        else{
                            this.rmsg = r.resultList 
                                if(r.resultList.length >0){
                                    this.resMsg = true
                                    return 
                                }else{
                                // this.$Message.success("保存成功");
                                this.$Modal.success({content:'保存成功'})
                                this.queryExpoDetail();
                                this.detailDataModel = false;
                                this.resetBasisBody(this.basisBody);
                                }
                            
                        }
                    }

                })
            },
            //删除一些数据，比如tryoutFlag
            deleteSomeKey(arr){
                for(let i = 0;i < arr.length; i++){
                    arr[i].tryout = arr[i].tryoutFlag === '1'?arr[i].tryout:0;
                    arr[i].taste = arr[i].tasteFlag === "1"? arr[i].taste:0;
                    arr[i].distribute = arr[i].distributeFlag === '1'?arr[i].distribute:0;
                    delete arr[i].tryoutFlag;
                    delete arr[i].tasteFlag;
                    delete arr[i].distributeFlag;
                }
                return arr;
            },
            //判断试用品尝散发是否符合标准
            validatorFlag(senArr){
                console.log('-----')
                console.log(senArr)
                return false;
                let warningArr = "";
                for(let i = 0;i < senArr.length;i++){
                    //常用表单校验
                    if(senArr[i].caseno === "1" && (senArr[i].caseno === "")){
                        warningArr += "第"+(i+1)+"行的箱号不能为空;";
                    }
                    if(senArr[i].tryoutFlag === "1" && (senArr[i].netweight === "")){
                        warningArr += "第"+(i+1)+"行的净重不能为空;";
                    }
                    if(senArr[i].tryoutFlag === "1" && (senArr[i].tryout === "" || parseInt(senArr[i].tryout) === 0)){
                        warningArr += "第"+(i+1)+"行的试用数量不能为空;";
                    }
                    if(senArr[i].tasteFlag === "1" && (senArr[i].taste === "" || parseInt(senArr[i].taste) === 0)){
                        warningArr += "第"+(i+1)+"行的品尝数量不能为空;";
                    }
                    if(senArr[i].distributeFlag === "1" && (senArr[i].distribute === "" || parseInt(senArr[i].distribute) === 0)){
                        warningArr += "第"+(i+1)+"行的散发数量不能为空;";
                    }
                    if(senArr[i].goodsdescription === "") {
                        warningArr += "第"+(i+1)+"行的英文名称不能为空;";
                    }
                    if(senArr[i].goodsdescriptioncn === "") {
                        warningArr += "第"+(i+1)+"行的中文名称不能为空;";
                    }
                    if(senArr[i].countryoforigin === "") {
                        warningArr += "第"+(i+1)+"行的原产地不能为空;";
                    }
                    if(senArr[i].quantity === "") {
                        warningArr += "第"+(i+1)+"行的数量不能为空;";
                    }
                    if(senArr[i].quantityunit === "") {
                        warningArr += "第"+(i+1)+"行的单位不能为空;";
                    }
                    if(senArr[i].unitprice === "") {
                        warningArr += "第"+(i+1)+"行的单价不能为空;";
                    }
                    if(senArr[i].totalprice === "") {
                        warningArr += "第"+(i+1)+"行的总价不能为空;";
                    }
                    if(senArr[i].hscode === "") {
                        warningArr += "第"+(i+1)+"行的商品代号不能为空;";
                    }
                }
                if(warningArr !== ""){
                    this.$Modal.warning({ content:warningArr });
                    return true;
                }
                return false;
            },
            //物资证明函清单界面
            addMaterialDetail(){
                console.log(1111)
                console.log(this.basisBody)
                console.log(this.copyObj(this.detailDataUnit))

                this.$refs.cvage.value=null
                this.$refs.cvage1.value=null
                this.basisBody = this.basisBodyMap;
                this.basisBody.push(this.copyObj(this.detailDataUnit));
                this.resetBasisBody(this.basisBody)
            },

            filterNull(arr){
                let r = arr.filter(function (x) {
                    return (x.caseno !== "" || x.dimension !=="" || x.length !== "" || x.width !== "" || x.height !== "" || x.growssweight !== "" || x.netweight !=="" || x.goodsdescription !== "" || x.goodsdescriptioncn !== "" || x.countryoforigin !== "" || x.quantity !== "" || x.quantityunit !== "" || x.totalprice !== "" || x.hscode !== "")
                })
                return r;
            },
            //删除物资详情
            removeExpoHeadDetail(listheaduuid) {
                let params = {
                    listheaduuid:listheaduuid
                }
                publicInter(interfaceUrl.removeExpoHeadDetail,params).then(r=>{
                    this.$Modal.success({content: '删除成功'})
                    this.queryExpoDetail()
                })
            },
            //查询物资详情
            queryExpoHeadDetail(listheaduuid){
                let params = {
                    listheaduuid:listheaduuid
                }
                let url = "";
                if (this.role === 'ROLE_EC') {
                    url = interfaceUrl.queryExpoHeadDetail2
                }
                else{
                    url = interfaceUrl.queryExpoHeadDetail;
                }
                publicInter(url,params).then(r=>{
                    if(r){
                        if(r.head){
                            this.basis2 = this.lowerJSONKey(r.head);
                            this.basisBody = this.lowerJSONKey(r.body);
                            
                            this.basis2.countrycode = this.basis2.exhibitorcountry;
                            this.basis2.hallnoArr = this.basis2.hallno;
                            //对试用品尝散发进行处理
                            if(!this.disableStatus){
                                for(let i =0; i < this.basisBody.length;i++){
                                    if(parseInt(this.basisBody[i].tryout)==0){ // 0表示否
                                        this.basisBody[i].tryout = "";
                                        this.basisBody[i].tryoutFlag = "0";
                                    }
                                    else{
                                        this.basisBody[i].tryoutFlag = "1";
                                    }

                                    if(parseInt(this.basisBody[i].taste)==0){
                                        this.basisBody[i].taste = ""
                                        this.basisBody[i].tasteFlag = "0";
                                    }
                                    else{
                                        this.basisBody[i].tasteFlag = "1";
                                    }

                                    if(parseInt(this.basisBody[i].distribute)==0){
                                        this.basisBody[i].distribute = ""
                                        this.basisBody[i].distributeFlag = "0";
                                    }
                                    else{
                                        this.basisBody[i].distributeFlag = "1";
                                    }
                                }
                            }
                            
                            this.resetBasisBody(this.basisBody);
                            this.detailDataModel = true;
                            this.iHaveId = false;
                        }
                        else if(r.error){
                            // this.$Message.error(r.error);
                            this.$Modal.error({content:r.error})
                        }
                    }
                })
            },
            //复制对象
            copyObj(obj){
                if(Object.prototype.toString.call(obj) === '[object Object]'){
                    let newUnit = {};
                    for (let key in obj){
                        newUnit[key] =   obj[key]
                    }
                    return newUnit;
                }
                else if(Object.prototype.toString.call(obj) === '[object Array]'){
                    let newArr = []
                    for (let i = 0; i < obj.length;i++){
                        let newUnit = {};
                        for (let key in obj[i]){
                            newUnit[key] =   obj[i][key]
                        }
                        newArr.push(newUnit)
                    }

                    return newArr
                }
            },
            //同意
            agreeFun(status){
                switch (status) {
                    case "7":
                        this.agreeSubmitFun();
                        break;
                    case "8":
                        this.defineModel = true;
                        this.definedStaus = "拒绝";
                        this.examineOpinion = "";
                        break;
                }

            },
            agreeSubmitFun(){
                var params = {
                    //国别
                    countryCode:this.basis.countrycode,
                    //件数
                    packageQuantity:this.basis.packagequantity,
                    //馆号
                    // position:this.position,
                    //主键
                    uuid:this.uuid,
                    //申请状态
                    status:"7",
                    certificateno: this.certificateno
                    //7.同意，8.拒绝，9.取消同意
                };
                this.$Spin.show()
                publicInter(interfaceUrl.toExamine,params).then(r=>{
                    if(r){
                        this.$Spin.hide()
                        if(r.code == "200"){
                            this.$Modal.success({content:"审批成功："+r.msg,title:"审批成功"})
                            this.$router.push({
                                name:'zhongbohui',
                                params:{
                                    valueSelect:7
                                }
                            })
                        }
                        else{
                            this.$Modal.error({content:"审批失败:"+(r.error || r.msg),title:"审批失败"})
                        }
                    }
                }).catch(error => {
                    this.$Spin.hide();
                    if( error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
                        this.$Message.error('连接超时')
                        this.$router.push({
                                name:'zhongbohui',
                                params:{
                                    valueSelect:7
                                }
                            })
                    };
                    
                });
            },
            //获取详情初始
            queryExpoDetail(){
                let url = "";
                if(this.role === 'ROLE_EC'){
                    url = interfaceUrl.queryExpoDetail2
                }
                else{
                    url = interfaceUrl.queryExpoDetail;
                }
                publicInter(url,{basicinfouuid:this.uuid}).then(r=>{
                    if(r){
                        this.basis = this.lowerJSONKey(r.cert);
                        this.dataList = this.lowerJSONKey(r.list);
                    }
                })
            },
            back(){
                this.$router.push({
                    name:'zhongbohui',
                    params:{
                        startDate:this.$route.params.startDate,
                        endDate:this.$route.params.endDate,
                        valueSelect:this.$route.params.valueSelect,
                        //再传一个初始查询的
                        search:true
                    }
                })
            },
            myChangeData(){

                this.basisBody = this.basisBodyMap;
                this.resetBasisBody(this.basisBody)
            }
        },
        beforeMount(){

            //常用年区分
            let timeArr = ['一','二','三','四','五','六','七','八','九','十']
            let nowYear = getCookie('date')*1;
            let period = nowYear - 2018
            this.titleDate = `${nowYear}年第${timeArr[period]}届`;
            
            this.basis.exhibitionname = `CHINA INTERNATIONAL IMPORT EXPO ${nowYear},5-10 November`;
            this.basis.exhibitionnamecn = `「 CIIE ${nowYear} 年第${timeArr[period]}届中国国际进口博览会 」${nowYear}年11月5日-10日`;

            // this.basis2.exhibitionname = `CHINA INTERNATIONAL IMPORT EXPO ${nowYear},5-10 November`;
            // this.basis2.exhibitionnamecn = `「 CIIE ${nowYear} 年第${timeArr[period]}届中国国际进口博览会 」${nowYear}年11月5日-10日`;

            
            this.role=getCookie('roler').includes("EC")?"ROLE_EC":'ROLE_EB';
            if(this.$route.name === "zbhDetail"){
                this.myModel1 = false;
                this.view = 'detail'
                this.title = '物资证明函审批'
                if(this.$route.params.basicinfouuid){
                    this.uuid = this.$route.params.basicinfouuid;
                    this.basis.status = this.$route.params.status;
                    this.certificateno = this.$route.params.certificateno;
                    if(this.$route.params.status == "0" || this.$route.params.status == "8"){
                        this.disableStatus = false;
                    }
                    else{
                        this.disableStatus =  true;
                    }
                    this.queryExpoDetail()
                }
                else{
                    this.$router.push({
                        name:'zhongbohui'
                    })
                }
            }
            //获取馆号和运输方式
            publicInter(interfaceUrl.queryPositionTransport,{name:""}).then(r=>{
                if(r){
                    this.transportList = r.transport;
                    this.positionList = r.position;
                }
            })
            this.vagueUrl = interfaceUrl.queryExpoByName;
            this.vagueUrl1 = interfaceUrl.queryExpoByBoothno;
        }
    }
</script>

<style scoped>
@media print {
    .no-print{
        opacity: 0;
    }
}
</style>