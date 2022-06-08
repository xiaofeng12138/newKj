<template>
    <queryComponent pageName='总舱单(FFM)' :keyValue="tableList" :httpListUrl='listUrl' :httpDetailUrl='detailUrl' :tableHeader='tableHead' :childTable='tableChild' /> 
</template>
<script>
import queryComponent from '_c/airQueryComponent'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{queryComponent},
    beforeMount(){
        this.listUrl=interfaceUrl.queryFfmListByBillno
        this.detailUrl=interfaceUrl.queryFfmAllByMsgid
    },
    data(){
        return{
            listUrl:'',
            detailUrl:'',
            //主表字段
            tableList:[
                {key:'carriercode',value:'航空公司代码'},
                {key:'flightnumber',value:'航班编号'},
                {key:'depdayloading',value:'计划离港日'},
                {key:'depmonthloading',value:'计划离港月'},
                {key:'airportcodeloading',value:'装货地代码'},
                {key:'airpotcodeunloading',value:'卸货地代码'},
                {key:'billno',value:'主运单号'}
            ],
            //子表字段
            tableChild:[
                {key:'airlineprefix',value:'航线代码'},
                {key:'awbserialnumber',value:'总运单编号'},
                {key:'oriairportcitycode',value:'启运机场/城市代码'},
                {key:'desairportcitycode',value:'目的机场/城市代码'},
                {key:'quashipmentdescriptioncode',value:'载货类型代码'},
                {key:'quanumberpieces',value:'件数'},
                {key:'quaweightcode',value:'重量单位'},
                {key:'quaweight',value:'重量'},
                {key:'densityindicator',value:'密度指标'},
                {key:'densitygroup',value:'密度组'},
                {key:'shipmentdescriptioncode',value:'载货类型代码（T)'},
                {key:'totnumberpieces',value:'件数'},
                {key:'sciid',value:'排列标识'},
                {key:'customscode',value:'海关正本资料代码'}
            ],
            //详情字段
            tableHead:[
                {key:'msgid',value:'消息编号'},
                {key:'msgtype',value:'消息类型'},
                {key:'msgversion',value:'消息版本'},
                {key:'messagesequencenumber',value:'信息序列号'},
                {key:'carriercode',value:'航空公司代码'},
                {key:'flightnumber',value:'航班编号'},
                {key:'depdayloading',value:'计划离港日'},
                {key:'depmonthloading',value:'计划离港月'},
                {key:'airportcodeloading',value:'装货地代码'},
                {key:'airpotcodeunloading',value:'卸货地代码'},
                {key:'preTransitDate',value:'预报起运时间'}
            ]

        }
    }
}
</script>
<style lang="scss" scoped>


</style>