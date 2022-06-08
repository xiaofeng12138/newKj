<template>
    <div class="flow-commod">
        <Tabs value="2018" @on-click="tabClick" class="agentCencus">
            <TabPane label="2018" name="2018">
                <Table class="customTable" :data='dataList' style="margin-top:1rem;" :columns="columns"></Table>
           </TabPane>
            <TabPane label="2019" name="2019">
               <Table class="customTable" :data='dataList' style="margin-top:1rem;" :columns="columns"></Table>
            </TabPane>
             <TabPane label="2020" name="2020">
               <Table class="customTable" :data='dataList' style="margin-top:1rem;" :columns="columns"></Table>
            </TabPane>
        </Tabs>
        <Modal v-model="modalCountryShow" width="1600" class="flow-commod-modal" :footer-hide="hideFooter">
            <p slot="header" class="modal-header">国家展后流向明细</p>
            <Table class="customTable" :data='countrylList' style="margin-top:1rem;" :columns="countryColumns"></Table>
            <div style="float:flex">
                 <div style="font-size:20px;color:#fff;margin-top:20px;float:left">总批次：{{totalBatch}}</div>
            <Page
                :total="countryTotal"
                :page-size="10"
                style="float:right;margin-top:16px;margin-bottom: 20px"
                @on-change="countryPageChange"
                show-total
            ></Page>
            </div>
        </Modal>
        <Modal v-model="modalShow" width="1600" class="flow-commod-modal" :footer-hide="hideFooter">
            <p slot="header" class="modal-header">展品明细</p>
            <Table class="customTable" :data='detailList' style="margin-top:1rem;" :columns="detailColumns"></Table>
           
            <Page
                :total="detailTotal"
                :page-size="10"
                style="float:right;margin-top:16px;margin-bottom: 20px"
                @on-change="detailPageNumChange"
                show-total
            ></Page>
        </Modal>
        <div class="charts">
            <div id="leftLegend"></div>
            <div class="middle">
                <div id="pie"></div>
            </div>
            <div id="rightLegend"></div>
        </div>
        
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
    data() {
        return {
            totalBatch:0,
            countryTotal:0,
            modalCountryShow:false,
            countrylList:[],
            countryColumns:[
                {
                    title: '序号',
                    key: 'RN',
                    align: "center",
                    width: 80
                },
                {
                    title: '国家/地区',
                    key: 'ORIGIN_COUNTRY',
                    align: "center",
                    render: (h, params) =>{
                         return h('span',{
                                style: {
                                    color: '#fbd500',
                                    cursor: 'pointer'
                                },
                            on: {
                                "click": () => {
                                    this.modalShow = true
                                    this.countryName = params.row.ORIGIN_COUNTRY
                                    this.qryDetailTable(params.row.ORIGIN_COUNTRY,1)
                                }
                            }
                }, params.row.ORIGIN_COUNTRY)
                       
                    }
                },
                {
                    title: '金额',
                    key: 'DECL_TOTAL',
                    align: "center",
                },
                {
                    title: '批次',
                    key: 'BATCHNUM',
                    align: "center",
                },
            ],
            detailTotal: 0,
            detailPageNum: 1,
            modalShow: false,
            year: '2018',
            pieColor: ['#ff6d6d', '#6cfe87', '#eeec32', '#21b94b', '#8869ff', '#31baec', '#ff8fc2', '#5c40ff',
                        '#9e7450', '#d4b497', '#7be5f9', '#ff8231', '#7eb9ff','#f8e787', '#edb94c', '#2a7fff', 
                        '#fe56dd', '#ffa131', '#23b2ff', '#12dd3e', '#e332aa', '#233aa1'
            ],
            pieLabel: ['复运出境', '留购', '转保税区域', '消耗', '其他', '灭失', '放弃', '外借'],
            hideFooter: true,
            leftCharts: null,
            charts: null,
            rightCharts: null,
            detailList: [],
            detailColumns: [
                {
                    title: '序号',
                    key: 'NUM',
                    align: "center",
                    width: 80
                },
                {
                    title: '单证编号',
                    key: 'ENTRY_ID',
                    align: "center",
                    // width: 120
                },
                {
                    title: '商品编码',
                    key: 'CODE_TS',
                    align: "center",
                    width: 180
                },
                {
                    title: '商品名称',
                    key: 'G_NAME',
                    align: "center",
                    // width: 200
                },
                {
                    title: '国家/地区',
                    key: 'ORIGIN_COUNTRY',
                    align: "center",
                    width: 140
                },
                {
                    title: '展商名称',
                    key: 'MERCHANT_NAME',
                    align: "center",
                    // width: 200
                },
                {
                    title: '展品金额',
                    key: 'DECL_TOTAL',
                    align: "center",
                    width: 120
                },
            ],
            columns: [
                {
                    title: '总金额',
                    key: 'MEALL',
                    align: "center",
                    width: 170
                },
                {
                    title: '复运出境',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'FYCJ',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['FYCJ'], '1')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'FYCJBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.FYCJBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '留购',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'LG',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['LG'], '2')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'LGBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.LGBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '转保税区域',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'ZBSQ',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['ZBSQ'], '3')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'ZBSQBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.ZBSQBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '消耗',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'XH',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['XH'], '4')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'XHBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.XHBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '其他',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'QT',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['QT'], '5')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'QTBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.QTBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '灭失',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'MS',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['MS'], '6')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'MSBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.MSBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '放弃',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'FQ',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['FQ'], '7')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'FQBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.FQBL + '%')
                            }
                        }
                    ]
                },
                {
                    title: '外借',
                    align: "center",
                    children: [
                        {
                            title: '金额',
                            key: 'WJ',
                            align: "center",
                            width: 180,
                            render: (h, params) =>{
                                return this.renderTable(h, params.row['WJ'], '8')
                            }
                        },
                        {
                            title: '金额占比',
                            key: 'WJBL',
                            align: "center",
                            width: 115,
                            render: (h, params) => {
                                return h('span', params.row.WJBL + '%')
                            }
                        }
                    ]
                }
            ],
            dataList: [],
            leftOption: {
                legend: {
                    icon: 'circle',
                    orient: 'vertical',
                    left: 'left',
                    textStyle: {
                        fontSize: 14,
                        color: '#fff'
                    },
                    data:['活动物;动物产品', '植物产品', '动、植物油、脂及其分解产品;精制的食用油脂;\n动、植物蜡',
                                '食品;饮料、酒及醋;烟草、烟草及烟草代用品的制品', '矿产品', '化学工业及其相关工业的产品',
                                '塑料及其制品;橡胶及其制品', '生皮、皮革、毛皮及其制品;鞍具及挽具;\n旅行用品、手提包及类似容器;动物肠线',
                                '木及木制品;木炭;软木及软木制品;稻草、秸秆、\n针茅或其他编结材料制品;篮筐及柳条编结品', '木浆及其他纤维状纤维素浆;回收纺织原料及纺织制品',
                                '纺织原料及纺织制品',
                                '鞋、帽、伞、杖、鞭及其零件;已加工的羽毛及其制品;\n人造花;人发制品', '石料、石膏、水泥、石棉、云母及类似材料的制品;\n陶瓷产品;玻璃及其制品'
                        ]
                },
                color: ['#ff6d6d', '#6cfe87', '#eeec32', '#21b94b', '#8869ff', '#31baec', '#ff8fc2', '#5c40ff',
                        '#9e7450', '#d4b497', '#7be5f9', '#ff8231', '#7eb9ff'
                ],
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [
                    { name: '活动物;动物产品', type: 'bar',data: [] },
                    { name: '植物产品', type: 'bar',data: [] },
                    { name: '动、植物油、脂及其分解产品;精制的食用油脂;\n动、植物蜡', type: 'bar',data: [] },
                    { name: '食品;饮料、酒及醋;烟草、烟草及烟草代用品的制品', type: 'bar',data: [] },
                    { name: '矿产品', type: 'bar',data: [] },
                    { name: '化学工业及其相关工业的产品', type: 'bar',data: [] },
                    { name: '塑料及其制品;橡胶及其制品', type: 'bar',data: [] },
                    { name: '生皮、皮革、毛皮及其制品;鞍具及挽具;\n旅行用品、手提包及类似容器;动物肠线', type: 'bar',data: [] },
                    { name: '木及木制品;木炭;软木及软木制品;稻草、秸秆、\n针茅或其他编结材料制品;篮筐及柳条编结品', type: 'bar',data: [] },
                    { name: '木浆及其他纤维状纤维素浆;回收纺织原料及纺织制品', type: 'bar',data: [] },
                    { name: '纺织原料及纺织制品', type: 'bar',data: [] },
                    { name: '鞋、帽、伞、杖、鞭及其零件;已加工的羽毛及其制品;\n人造花;人发制品', type: 'bar',data: [] },
                    { name: '石料、石膏、水泥、石棉、云母及类似材料的制品;\n陶瓷产品;玻璃及其制品', type: 'bar',data: [] }
                ]
            },
            rightOption: {
                legend: {
                    icon: 'circle',
                    orient: 'vertical',
                    left: '20%',
                    textStyle: {
                        fontSize: 14,
                        color: '#fff'
                    },
                    data:['天然或养殖珍珠、宝石或半宝石、贵金属、\n包贵金属及其制品;仿首饰;硬币', '贱金属及其制品',
                                '机器、机械器具、电气设备及其零件;录影机及放声机、\n电视图像、声音的录制和重放设备及其零件',
                                '车辆、航空器、船舶及有关运输设备', '光学、照相、电影、计量、检验、医疗或外科用仪器及\n设备、精密仪器及设备;钟表;乐器;上述物品',
                                '武器、弹药及其零件、附件', '杂项制品', '艺术品、收藏品及谷物', '特殊交易品及未分类商品', '其他'
                        ]
                },
                color: ['#f8e787', '#edb94c', '#2A7FFF', '#fe56dd', '#ffa131', '#23b2ff', '#12dd3e', '#e332aa', '#233aa1'],
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                series: [
                    { name: '天然或养殖珍珠、宝石或半宝石、贵金属、\n包贵金属及其制品;仿首饰;硬币',type: 'bar',data: [] },
                    { name: '贱金属及其制品',type: 'bar',data: [] },
                    { name: '机器、机械器具、电气设备及其零件;录影机及放声机、\n电视图像、声音的录制和重放设备及其零件',type: 'bar',data: [] },
                    { name: '车辆、航空器、船舶及有关运输设备',type: 'bar',data: [] },
                    { name: '光学、照相、电影、计量、检验、医疗或外科用仪器及\n设备、精密仪器及设备;钟表;乐器;上述物品',type: 'bar',data: [] },
                    { name: '武器、弹药及其零件、附件',type: 'bar',data: [] },
                    { name: '杂项制品',type: 'bar',data: [] },
                    { name: '艺术品、收藏品及谷物',type: 'bar',data: [] },
                    { name: '特殊交易品及未分类商品',type: 'bar',data: [] },
                ]
            },
            option: {
                legend: {
                    data: [],
                    show: false
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        let v = `<span style='color:#fbc500'>${params.value}%</span>`
                        return params.marker + params.name + ': ' +  v
                    },
                    textStyle: {
                        fontSize: 16
                    },
                    confine: true,
                    extraCssText: 'white-space: pre-wrap'
                },
                color: [],
                title: [],
                series: []
            },
            countryName:''
        }
    },
    mounted() {
        this.qryTable()
        this.leftCharts = echarts.init(document.getElementById("leftLegend"));
        this.charts = echarts.init(document.getElementById("pie"));
        this.rightCharts = echarts.init(document.getElementById("rightLegend"));
        echarts.connect([this.leftCharts, this.charts, this.rightCharts])
        this.leftCharts.setOption(this.leftOption)
        this.rightCharts.setOption(this.rightOption)
        this.initPie()
    },
    methods: {
        initPie() {
            publicInter(interfaceUrl.qryHxFlowStatisticsByHs, {year: this.year}).then(r => {
                if(r) {
                    let nameArr = this.leftOption.legend.data.concat(this.rightOption.legend.data);
                    for(let i = 0; i < this.pieLabel.length; i++) {
                        let index = 'list' + (i + 1);
                        let obj = r[index];
                        let arr = [];
                        for(let j = 0; j < obj.length; j++) {
                            
                            if(obj[j].JEBL > 0) {
                                let name;
                                if(obj[j].HSTYPE == '99') {
                                    name = '其他'
                                    this.option.color.push('#808080')
                                } else {
                                    name = nameArr[obj[j].HSTYPE - 1]
                                    this.option.color.push(this.pieColor[obj[j].HSTYPE - 1])
                                }
                                arr.push({
                                    name: name,
                                    value: obj[j].JEBL
                                })
                            } 

                            
                        };
                        let pieCenter = [];
                        if( i % 2 == 1) {
                            pieCenter = ['70%', parseInt(i/2) * 25 + 12 + '%'];
                        } else {
                            pieCenter = ['30%', parseInt(i/2) * 25 + 12 + '%'];
                        };
                        this.option.title.push({
                            text: this.pieLabel[i],
                            left: pieCenter[0],
                            top: pieCenter[1],
                            textAlign: 'center',
                            textStyle: {
                                fontSize: 20,
                                color: '#fff'
                            }
                        })
                        if(arr.length < 1) {
                            this.option.color.push('#fff')
                            this.option.series.push({
                                type: 'pie',    
                                radius: ['25%', '35%'],
                                center: pieCenter,
                                hoverAnimation: false,
                                tooltip: {
                                    formatter: (params) => {
                                        return ''
                                    }
                                },
                                label: {
                                    show: false
                                },
                                data: [
                                    {
                                        name: 'null',
                                        value: '1',
                                        itemStyle: {
                                            color: '#181f3f'
                                        }
                                    }
                                ]
                            })
                        } else {
                            this.option.series.push({
                                type: 'pie',    
                                radius: ['25%', '35%'],
                                center: pieCenter,
                                label: {
                                    show: false
                                },
                                data: arr
                            })
                        }
                        
                    }
                    this.charts.setOption(this.option)
                }
            })
            
        },
        qryTable() {
            publicInter(interfaceUrl.qryHxFlowStatistics, {year: this.year}).then(r => {
                this.dataList = r.list;
            })
        },
        qryDetailTable(paramsdata,page) {
            let params = {
                year: this.year,
                type: this.type,
                pageSize: 10,
                pageNum: page,
                country:paramsdata
            }
            publicInter(interfaceUrl.qryHxFlowGoods, params).then(r => {
                if(r) {
                    this.modalCountryShow = true
                    this.detailList = r.list
                    this.detailTotal = r.totalRow
                }
            })
        },
        countryPageChange(page){
            this.detailPageNum = page;
            this.queryCountry(page)
        },
        detailPageNumChange(page) {
            this.qryDetailTable(this.countryName,page)
        },
        tabClick(name) {
            if(this.year != name ) {
                this.year = name;
                this.qryTable();
                this.initPie()
            }    
        },
        renderTable(h,params,type){
                return h('span',{
                    style: {
                        color: '#fbd500',
                        cursor: 'pointer'
                    },
                    on: {
                        "click": () => {
                            this.type = type;
                            this.queryCountry(1)
                        }
                    }
                }, params)
        },
        queryCountry(page){
             let params = {
                year: this.year,
                type: this.type,
                pageSize: 10,
                pageNum: page
            }
            publicInter(interfaceUrl.qryHxFlowGoods, params).then(r => {
                if(r) {
                    this.modalCountryShow = true
                    this.countrylList = r.listGroupByCountry
                    this.countryTotal = r.totalGroupByCountry
                    this.totalBatch = r.totalbatchnum
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.flow-commod {
    width: 100%;
    height: 100%;
}
.modal-header {
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-size: 1.25rem;
    color: #fff
}
.charts {
    width: 100%;;
    height: 500px;
    margin: 10px 0;
    display: flex;
    #leftLegend {
        width: 30%;
        height: 100%;
    }
    .middle {
        width: 40%;
        height: 100%;
        border: 1px solid #1f5ff2;
        overflow-y: scroll;
        #pie {
            width: 99%;
            height: 200%;
        }
    }
    
    #rightLegend {
        width: 30%;
        height: 100%;
    }
}

</style>

