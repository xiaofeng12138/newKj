<template>
    <div class="agent-cencus">
        <Tabs value="2018" @on-click="tabClick" class="agentCencus">
            <TabPane label="2018" name="2018">
              <Table class="customTable" :data='dataList' style="margin-top:1rem;" :columns="columns"></Table>
            </TabPane>
            <TabPane label="2019" name="2019">
              <Table class="customTable" :data='dataList2' style="margin-top:1rem;" :columns="columns"></Table>
            </TabPane>
             <TabPane label="2020" name="2020">
              <Table class="customTable" :data='dataList3' style="margin-top:1rem;" :columns="columns"></Table>
            </TabPane>
        </Tabs>
        <div id="agentCencus-pie"></div>
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
    data() {
        return {
            columns: [
                {
                    title: "序号",
                    align: "center",
                    type: 'index',
                    width: 80
                },
                {
                    title: "公司名称",
                    align: "center",
                    key: "AGENTNAME",
                    width: 300
                },
                {
                    title: "总金额",
                    key: "TOTALPRICE",
                    align: "center",
                    width: 170
                },
                {
                    title: "实际后续流向",
                    align: "center",
                    children: [
                        {
                            title: "复运出境",
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "PBPRICE",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "PBPERCENT",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.PBPERCENT)
                                    }
                                }
                            ]
                        },
                        {
                            title: "留购",
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "PAPRICE",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "PAPERCENT",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.PAPERCENT)
                                    }
                                }
                            ]
                        },
                        {
                            title: "转保税区域",
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "PFPRICE",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "PFPERCENT",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.PFPERCENT)
                                    }
                                }
                            ]
                        },
                        {
                        title: "消耗",
                        align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "PCPRICE",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "PCPERCENT",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.PCPERCENT)
                                    }
                                }
                            ]
                        },
                        {
                            title: '放弃',
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "PHPRICE",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "PHPERCENT",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.PHPERCENT)
                                    }
                                }
                            ]
                        },
                        {
                            title: '灭失',
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "NOTE1",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "NOTE2",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.NOTE2)
                                    }
                                }
                            ]
                        },
                        {
                            title: '其他',
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "NOTE3",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "NOTE4",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.NOTE4)
                                    }
                                }
                            ]
                        },
                        {
                            title: '外借',
                            align: "center",
                            children:[
                                {
                                    title: "金额",
                                    align: "center",
                                    key: "NOTE5",
                                    width: 150
                                },
                                {
                                    title: "金额占比",
                                    align: "center",
                                    key: "NOTE6",
                                    width: 115,
                                    render: (h, params) => {
                                        return this.renderPercent(h, params.row.NOTE6)
                                    }
                                }
                            ]
                        }

                    ]
                }
            ],
            dataList: [],
            dataList2: [],
            dataList3:[], //2020年数据
            charts: null,
            option: {
                color: ['#23b2ff', '#6cfe87', '#eeec32', '#ffa131', '#ff6d6d', '#34fcff', '#8869ff', '#fe56dd'],
                title: [],
                tooltip: {
                    trigger: 'item',
                    formatter: function(params) {
                        let v = `<span style='color:#fbc500'>${params.value}%</span>`
                        return params.marker + params.name + ': ' +  v
                    },
                },
                legend: {
                    icon: 'circle',
                    orient: 'vertical',
                    left: 'left',
                    top: 'middle',
                    textStyle: {
                        fontSize: 14,
                        color: '#fff'
                    },
                    data:['复运出境', '留购', '转保税区域', '消耗', '其他', '放弃', '灭失', '外借']
                },
                series: []
            },
        }
    },
    mounted() {
        this.queryTable();
        this.charts = echarts.init(document.getElementById("agentCencus-pie"));
    },
    methods: {
        initPie(list) {
            // this.charts.clear();
            let arr = [], title = [];
            if(list && list.length > 0){
                 for(let i = 0; i < list.length; i++) {
                        let arr_child = {
                            type: 'pie',    
                            radius: ['40%', '60%'],
                            center: [20 + i * 13 + '%', '50%'],
                            label: {
                                show: false
                            },
                            data: [
                                { name: '复运出境', value: list[i].PBPERCENT },
                                { name: "留购", value: list[i].PAPERCENT },
                                { name: "转保税区域", value: list[i].PFPERCENT },
                                { name: "消耗", value: list[i].PCPERCENT },
                                { name: "放弃", value: list[i].PHPERCENT },
                                { name: "灭失", value: list[i].NOTE2 },
                                { name: "其他", value: list[i].NOTE4 }
                            ]
                        };
                        let totalPercent = 100 - list[i].PBPERCENT - list[i].PAPERCENT - list[i].PFPERCENT - list[i].PCPERCENT -
                                            list[i].PHPERCENT - list[i].NOTE2 - list[i].NOTE4 - list[i].NOTE6;
                        if(totalPercent > 0) {
                            arr_child.data.push({
                                name: '未使用',
                                value: totalPercent,
                                itemStyle: {
                                    color: '#808080'
                                }
                            })
                        };
                        title.push({
                            text: list[i].AGENTNAME.slice(0, 10) + '\n' + list[i].AGENTNAME.slice(10),
                            left: 20 + i * 13 + '%',
                            top: '85%',
                            textAlign: 'center',
                            textStyle: {
                                fontSize: 15,
                                color: '#fff',
                                width: '3%'
                            }
                        })
                        arr.push(arr_child);
                       
               }
            }else{
                 
                        for(let i = 0 ;i< 6;i++){
                                let arr_child = {
                                type: 'pie',    
                                radius: ['40%', '60%'],
                                label: {
                                    show: false
                                },
                                data: [
                                    { name: '复运出境', value:0 },
                                    { name: "留购", value: 0 },
                                    { name: "转保税区域", value: 0 },
                                    { name: "消耗", value: 0 },
                                    { name: "放弃", value: 0 },
                                    { name: "灭失", value: 0 },
                                    { name: "其他", value: 0 }
                                ]
                            };
                            let totalPercent = 100
                            if(totalPercent > 0) {
                                arr_child.data.push({
                                    name: '未使用',
                                    value: totalPercent,
                                    itemStyle: {
                                        color: '#808080'
                                    }
                                })
                            };
                                title.push({
                                    text:'',
                                    top: '85%',
                                    textAlign: 'center',
                                    textStyle: {
                                        fontSize: 15,
                                        color: '#fff',
                                        width: '3%'
                                    }
                                })
                                
                            arr.push(arr_child);
                            }
                       
            }
                this.option.title = title;
                this.option.series = arr;
                this.charts.setOption(this.option)
           

        },
        tabClick(name) {
            if( name == '2018') {
                this.initPie(this.dataList)
            } else if( name == '2019') {
                this.initPie(this.dataList2)
            }else if( name == '2020') {
                this.initPie(this.dataList3)
            }
        },
        queryTable() {
            publicInter(interfaceUrl.statisticExhibitFlowByTransComp, {}).then(r => {
                if (r && r.result.length > 0) {
                    
                    this.dataList = r.result;
                    this.dataList2 = r.result2;
                    
                    this.dataList3 = r.result3;
                    this.initPie(this.dataList)
                } else {
                    this.list = [];
                    this.list2 = [];
                }

            });
        },
        renderPercent(h, value) {
            return h('span', {
                style: {
                    color: '#fbd500'
                }
            }, value + '%')
        }
    }
};
</script>
<style lang="scss" scoped>
.agent-cencus {
    width: 100%;
    height: 100%;
}
#agentCencus-pie {
    width: 100%;
    height: 300px;
}
</style>

