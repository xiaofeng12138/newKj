<template lang="html">
    <div class="">
        <h1 style="padding-bottom: 20px;">拆单报关信息查询</h1>
        <Row class="searchRow">
            <Col span="6">
                <Input v-model="inputValue">
                <span slot="prepend">提单号</span>
                </Input>
            </Col>
            <Col span="5" style="margin-left:10px;">
                <DatePicker
                        type="daterange"
                        placement="bottom-end"
                        placeholder="请选择归并时间"
                        style="width:100%;"
                        @on-change="datePicker">
                </DatePicker>
            </Col>
            <Col span="2" style="margin-left:10px;">
                <Button type="primary" @click="search">搜索</Button>
            </Col>
        </Row>
        <Row>
            <Table :columns="codeColumns" :data="codeData"></Table>
        </Row>

        <Modal
                v-model="viewModal"
                @on-ok="ok"
                ok-text="导出 XML"
                width="980" :closable="false" :mask-closable="false">
            <div class="previewHeader" slot="header">
                中华人民共和国海关进口货物报关单
                <span class="someid">暂存号：{{viewModalData.resultHead.zanChunHao}}</span>
            </div>
            <preview :data="viewModalData" v-on:handPerfect="handPerfect" v-on:autoPerfect="autoPerfect"></preview>
            <div slot="footer">
                <Button type="error" size="large"  @click="cancelBtn">取消</Button>
                <Button type="primary" size="large" @click = "ok('false')">导出网页版XML</Button>
                <Button type="primary" size="large" @click = "ok('true')" :disabled="isShangChuanDisable || shangchuanStatus">上传</Button>
                <Button type="primary" size="large" @click = "ok('false','true')">导出客户端版XML</Button>
            </div>
        </Modal>

        <Modal v-model="viewModal2"
               width="420" :closable="false" :mask-closable="false">
            
            <ul>
                <span style="width: 120px;display: inline-block;text-align: center;">集装箱编号</span>
                <span style="display: inline-block;width: calc(100% - 140px);text-align: center">商品序号</span>
                <li v-for="cntr in cntrs" style="list-style: none">
                    <span style="width: 120px;display: inline-block;text-align: center;">{{ cntr.CNTR_NUM }}</span>
                    <Select v-model="cntr.GNOArr" multiple style="width:260px">
                        <Option v-for="item in resultList" :value="item.GNO" :key="item.GNO">{{ item.GNO }}</Option>
                    </Select>
                </li>
            </ul>
            <div slot="footer" style="text-align: center">
                <Button type="primary" size="large"  @click="saveCntr">保存</Button>
                <Button type="error" size="large"  @click="viewModal2 = false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import Preview from './preview'
    import {getUserRole} from '../../until/getToken'
    import myTooltip from "@/views/baoguanSearch/myTooltip"
    import interfaceUrl from '@/api/interfaceUrl'
    import { publicInter } from '@/api/http'
    export default {
        components: {
            Preview,
            myTooltip
        },
        created(){
            this.role=getUserRole();
            this.billNo=this.$route.params.billNo;
            this.id = this.$route.params.erpTempnum;
            this.query();
        },
        data () {
            return {
                viewModal: false,
                inputValue: '',
                selectDateObj: '',
                billNo: '',
                clickTmp:"",
                fileName:"",
                CNCOMPANYCODE:"",
                role:"",
                shangchuanStatus:false,
                viewModal2:false,
                cntrs:[],
                //商品箱号list
                resultList:[],
                codeColumns: [
                    {
                        title: '提单号',
                        key: 'BILLNOP'
                    },
                    {
                        title: '拆单标识',
                        key: 'ID'
                    },
                    {
                        title: '暂存号',
                        key: 'UUID'
                    },
                    {
                        title: '归并时间',
                        key: 'REC_UPD_DTGUI'
                    },
                    {
                        title: '报关单号',
                        key: 'DECLARENO'
                    },
                    {
                        title: '回执状态',
                        render:(h, params) =>{
                            return h(myTooltip,{
                                props:{
                                    content:this.getCusStatus(params.row.STATUS),
                                    data1:params.row.list
                                }
                            });
                        }
                    },
                    {
                        title: '回执时间',
                        key: 'RECEIPTDATE'
                    },
                    {
                        title: '操作',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.billNo = params.row.BILLNOP;
                                            this.id = params.row.ID
                                            let param = {
                                                billNo:params.row.BILLNOP,
                                                id:params.row.ID
                                            }
                                            publicInter(interfaceUrl.seeBlAlLinkPOListAfChaiDan,param).then(r=>{
                                                if(r && r.code === '200'){
                                                    this.viewModalData = r.result;
                                                    this.isShangChuanDisable = (r.isShangChuanDisable === 'true'?true : false);
                                                    this.viewModal = true;
                                                }
                                            })
                                        }
                                    }
                                }, '查看'),
                            ])
                        }
                    }
                ],
                codeData:[],
                viewModalData:{
                    resultHead: {},
                    resultList: []
                },
                isShangChuanDisable:false,
                id:""
            }
        },
        methods: {
            ...mapActions('bill', [
                'resetBillPreviewList',
                'xmlDownload'
            ]),
            query(){
                let url = interfaceUrl.seeBlAlLinkPOListAfChaiDan;
                if(this.billNo){
                    let param = {
                        billNo:this.billNo,
                        id:this.id
                    }
                    publicInter(interfaceUrl.seeBlAlLinkPOListAfChaiDan,param).then(r=>{
                        if(r && r.code === '200'){
                            this.viewModalData = r.result;
                            this.isShangChuanDisable = (r.isShangChuanDisable === 'true'?true:false);
                            this.isCntrCompleted = (r.isCntrCompleted === 'true'?true:false);
                            this.viewModal = true;
                        }
                    })
                } 
            },
            datePicker (dateStrArr, dateObj) {
                let startDate = dateStrArr[0].replace(/\-/g, ''),
                    endDate = dateStrArr[1].replace(/\-/g, '');
                this.selectDateObj = { startDate, endDate }
            },

            search () {
                publicInter(interfaceUrl.getMergeredBLListAfChaiDan,{}).then(r=>{
                    if(r && r.code === '200'){
                        this.codeData = r.result;
                    }
                })
            },

            async ok (clickType,edi='false') {
                // this.viewModal = true
                let tipTxt = (clickType === 'true')?"上传中...":"下载中...";

                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-c',
                                    size: 18
                                }
                            }),
                            h('div', tipTxt)
                        ])
                    }
                });
                let url = interfaceUrl.downloadXmlFileByBLNoAfChaiDan;
                let res = await this.xmlDownload({billNo: this.billNo,clickType,CNCOMPANYCODE:this.CNCOMPANYCODE,url:url,edi,id:this.id })
                // console.log(res);
                this.$Spin.hide()

                if(clickType === 'true'){
                    if(res && res.isOk){
                        this.viewModal = false;
                        if(this.CNCOMPANYCODE !==""){
                            this.$router.push({name:'needDeal'})
                        }
                        this.$Message.success("上传成功");
                    }
                    else{
                        this.$Spin.hide();
                        this.$Message.error("上传失败")
                    }

                }
                else{
                    let url = window.URL.createObjectURL(new Blob([res]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    if(edi === 'false'){
                        link.setAttribute('download', this.viewModalData.resultHead.fileName+".xml")
                    }
                    else{
                        link.setAttribute('download', this.viewModalData.resultHead.ediFileName)
                    }
                    

                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }
            },
            cancelBtn(){
                this.viewModal = false;
            },
            getCusStatus(value) {
                var info = '';
                if(value == '1'){
                    info = '协同入库成功';
                }
                else if(value == '2'){
                    info = "协同入库失败";
                }
                else if(value == '3'){
                    info = "回填数据失败";
                }
                else if(value == '4'){
                    info = "逻辑校验失败";
                }
                else if(value == '5'){
                    info = "回写数据失败";
                }
                else if(value == '6'){
                    info = "协同处理成功";
                }
                else if (value == 'C') {
                    info = '(C)已放行-无纸验放查验通知书（放行）';
                } else if (value == 'F') {
                    info = '(F)已放行-放行交单';
                } else if (value == 'G') {
                    info = '(G)已放行-接单交单';
                } else if (value == 'I') {
                    info = '(I)已放行-无纸放行通知（放行）';
                } else if (value == 'R') {
                    info = '(R)已放行-结关，可办理进口付汇、出口结汇、出口退税联的签发手续';
                } else if (value == 'W') {
                    info = '(W)已放行-无纸验放通知（审结）';
                } else if (value == 'J') {
                    info = '(J)已放行-通关无纸化审结';
                } else if (value == 'P') {
                    info = '(P)已放行-放行回执';
                } else if (value == '#') {
                    info = '(#)已放行-通关无纸化准予进卡通知书';
                } else if (value == 'A') {
                    info = '(A)入库未审批-放行前删除';
                } else if (value == 'B') {
                    info = '(B)入库未审批-担保验放';
                } else if (value == 'D') {
                    info = '(D)入库未审批-放行后删除';
                } else if (value == 'H') {
                    info = '(H)入库未审批-挂起，与审单中心联系';
                } else if (value == 'L') {
                    info = '(L)入库未审批-入预录入库成功';
                } else if (value == 'X') {
                    info = '(X)入库未审批-准予进港';
                } else if (value == 'T') {
                    info = '(T)入库未审批-需交税费';
                } else if (value == 'M') {
                    info = '(M)入库未审批-报关单重审';
                } else if (value == 'E') {
                    info = '(E)不放行-入库失败或退单';
                } else if (value == 'Z') {
                    info = '(Z)不放行-退回修改';
                } else if (value == 'S') {
                    info = '(S)不放行-QP处理失败';
                } else if (value == 'Y') {
                    info = '(Y)不放行-申报失败';
                } else if (value == 'U') {
                    info = '(U)不放行-重新申报';
                } else if (value == '9') {
                    info = '(9)不放行-上载申报失败（与数据中心联系）';
                }
                return info;
            },
            //集装箱手动完善的点击查询事件
            handPerfect(){
                let url = interfaceUrl.getCntrInfoByBlNoAfChaiDan;
                let params = {billNo:this.billNo,id:this.id}
                if(this.CNCOMPANYCODE !== ""){
                    params.CNCOMPANYCODE = this.CNCOMPANYCODE;
                    url = interfaceUrl.getCntrInfoByBlNoCB;
                }
                publicInter(url,params).then(r=>{
                    if(r){
                        if(r.code == '200'){
                            this.viewModal2 = true;
                            this.cntrs = r.resultList2;
                            for (var i = 0; i < this.cntrs.length;i++){
                                if(this.cntrs[i].gnos){
                                    this.cntrs[i].GNOArr = this.cntrs[i].gnos.split(",")
                                }
                                else{
                                    this.cntrs[i].GNOArr = [];
                                }
                            }
                            this.resultList = r.resultList;
                        }
                        else{
                            this.$Message.error(r.error);
                        }

                    }
                })
            },
            autoPerfect(){
                let url=interfaceUrl.getCntrInfoByPackingInfo;
                let params = {billNo:this.billNo,id:this.id};
                //判断是否是报关行
                if(this.CNCOMPANYCODE !== ""){
                    params.CNCOMPANYCODE = this.CNCOMPANYCODE;
                    url = interfaceUrl.getCntrInfoByPackingInfoCB;
                }
                publicInter(url,params).then(r=>{
                    if(r){
                        if(r.code === '200'){
                            this.$Message.success('完善成功');
                            this.query();
                        }
                        else if (r.code === '500') {
                            this.$Message.error(r.error);
                        }
                    }
                })
            },
            saveCntr(){
                let lists = this.cntrs;
                for (let i = 0; i < lists.length;i++){
                    if (lists[i].GNOArr.length > 0 ){
                        lists[i].gnos = lists[i].GNOArr.join(",");
                    }
                    else{
                        lists[i].gnos = "";
                    }
                    delete lists[i].GNOArr;
                }
                let url = interfaceUrl.addCntrInfoByManualOpera;
                let params = {
                    billNo: this.billNo,
                    lists:lists
                }
                if(this.CNCOMPANYCODE !== ""){
                    params.CNCOMPANYCODE = this.CNCOMPANYCODE;
                    url = interfaceUrl.addCntrInfoByManualOperaCB;
                }
                publicInter(url,params).then(r=>{
                    if(r){
                        if(r.code == '200'){
                            this.$Message.success(r.msg);
                            this.viewModal2 = false;
                            this.query();
                        }
                        else if (r.code === '500') {
                            this.$Message.error(r.error);
                        }
                    }
                })
            }
        },
        mounted () {
            this.resetBillPreviewList()
        }
    }
</script>

<style lang="scss" scoped="">
    .searchRow {
        padding-bottom: 10px;
        border-bottom: 1px solid #dddee1;
        margin-bottom: 10px;
    }
    .previewHeader {
        text-align: center;
        font-size:20px;
        height: 30px;
        line-height: 32px;
        position: relative;
    }
    .someid {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 12px;
    }
</style>
