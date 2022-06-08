<template>
    <div  id="lesCharts" :style="{width:width,height:height}"></div>
</template>
<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    props:['width','height','num'],
    data(){
        return {
            lesCharts:null,
        }
    },
    updated(){
        this.lesCharts.resize();
    },
    mounted(){
        this.initLes();
    },
    methods:{
        initLes(){
            let _this = this;
            this.lesCharts = this.$echarts.init(document.getElementById('lesCharts'));
            let graph = {links:[],nodes:[]};   
            let categories = [];
            for (let i = 0; i < 9; i++) {
                categories[i] = {
                    name: '类目' + i
                };
            }
            let options = {
                // tooltip: {formatter:'{b}:{c}'},//类目+金额
                tooltip: {
                    formatter:'{b}',
                    textStyle:{
                        fontSize:22
                    }
                },//类目
                series:[
                    {
                        width:'60%',
                        height:'60%',
                        type:'graph',
                        layout: 'circular',
                        circular: {
                            rotateLabel: true
                        },
                        data: graph.nodes,
                        links: graph.links,
                        categories: categories,
                        label: {
                            normal: {
                                position: 'right',
                                formatter: '{b}',
                                fontSize:16
                            }
                        },
                        lineStyle: {
                            normal: {
                                color: 'source',
                                curveness: 0.3
                            }
                        },
                    }
                ]
            }
            this.lesCharts.setOption(options);
            this.lesCharts.on('click',function(params){
                //圆圈的点击事件
                if(params.seriesType === 'graph' && params.dataType === 'node'){
                    if(params.value.includes(101.1)){
                        _this.$emit('showEdit',params.data);
                    }
                    
                }
            });
            this.tabnew(5,1);
        },
        tabnew(key,index){
            let options = this.lesCharts.getOption();
            let params = {
                exhType:key,
                highNum:15,
                lowNum:10,
            }
            publicInter(interfaceUrl.queryGoodsByExhType,params).then(r=>{
                if(r){
                    if(r.isOk || r.isOk == 'true'){
                        let graph = this.initGraph(r);
                        options.series[0].data = graph.nodes;
                        options.series[0].links = graph.links;
                        this.lesCharts.setOption(options);
                    }
                    else{
                        this.$Message.error(r.msg);
                    }
                }
            })
            
        },
        initGraph(valueArr){  
            //设置一个price，当价格大于这个的时候，可以连线和显示   
            let showPrice = 2; 
            let graph = {
                    links:[],
                    nodes:[]
                },
                rangeArr = [50000,1000,100,10,0];
            valueArr.highGoods.sort(function(){return 0.5 - Math.random()})
            let nodes = valueArr.lowGoods.sort(function(){return 0.5 - Math.random()});//[];//valueArr.highGoods.concat(valueArr.lowGoods);
            let allLength = valueArr.highGoods.length+valueArr.lowGoods.length;
            if(valueArr.lowGoods.length > valueArr.highGoods.length){
                for(let i = 0; i < allLength;i = i+3){
                    var newi = (i+parseInt(Math.random()*2)) > allLength ? allLength:(i+parseInt(Math.random()*2));
                    nodes.splice(newi,0,valueArr.highGoods[parseInt(i/3)]);
                }
            }
            else{
                nodes = valueArr.highGoods.concat(valueArr.lowGoods).sort(function(){return 0.5 - Math.random()});
            }
            
            let links = [];
            // '#FFE91A'
            let color = ['#3CCE5A','#F9CEBB',,'#23B5EA','#4374FF','#23B5EA','#F9CEBB','#3CCE5A'];
            for (let i = 0; i <nodes.length;i++){
                nodes[i].id = i+"";
                nodes[i].name = nodes[i].GOODSDESCRIPTIONCN;
                // nodes[i].value = parseInt(nodes[i].TOTALPRICE/10000);
                nodes[i].value = (nodes[i].TOTALPRICE == -1?101.1:parseInt(nodes[i].TOTALPRICE/10000));
                // nodes[i].value = Math.random(0,1)*10+2;
                // nodes[i].symbolSize = nodes[i].value;
                if(nodes[i].value > rangeArr[0]){
                    nodes[i].symbolSize = 25;
                }
                else if(nodes[i].value > rangeArr[1]){
                    nodes[i].symbolSize = 20;
                }
                else if(nodes[i].value > rangeArr[2]){
                    nodes[i].symbolSize = 15;
                }
                else if(nodes[i].value > rangeArr[3]){
                    nodes[i].symbolSize = 10;
                }
                else if(nodes[i].value > rangeArr[4]){
                    nodes[i].symbolSize = nodes[i].value;
                }
                // 为0的时候，给他一个数，以便显示好看
                else{
                    nodes[i].symbolSize = (showPrice - 0.1);
                }
                nodes[i].label = {
                    normal:{
                        show:nodes[i].value >= showPrice
                    }
                }
                nodes[i].value +='万美元'
                nodes[i].attributes = {};
                nodes[i].attributes.modularity_class = Math.floor(Math.random()*7);
                nodes[i].itemStyle = {
                    normal:{
                        color:(nodes[i].value.includes(101.1)?'#FFE91A':color[nodes[i].attributes.modularity_class])
                    }
                };
                nodes[i].category = nodes[i].attributes.modularity_class;
            }
            for (let i = 0; i < 40;i++){
                let unit = {};
                unit.id = i+"";
                unit.source = Math.floor(Math.random()*nodes.length);
                for(let j = unit.source; j < nodes.length;j++){
                    if(nodes[j].symbolSize >= showPrice){
                        unit.source = j;
                        break;
                    }
                }
                //再次判断是不是source是否小于showPrice
                if(nodes[unit.source].symbolSize < showPrice){
                    for(let j = 0; j < nodes.length;j++){
                        if(nodes[j].symbolSize >= showPrice){
                            unit.source = j;
                            break;
                        }
                    }
                }
                unit.target = Math.floor(Math.random()*nodes.length);
                for(let j = unit.target; j < nodes.length;j++){
                    if(nodes[j].symbolSize >= showPrice && j !==unit.source){
                        unit.target = j;
                        break;
                    }
                }
                //再次判断是不是source是否小于10
                if(nodes[unit.target].symbolSize < showPrice){
                    for(let j = 0; j < nodes.length;j++){
                        if(nodes[j].symbolSize >= showPrice && j !==unit.source){
                            unit.target = j;
                            break;
                        }
                    }
                }
                links.push(unit);
            }
            graph.links = links;
            graph.nodes = nodes;
            return graph;
        },
    }
}
</script>
