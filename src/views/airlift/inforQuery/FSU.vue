<template>
    <queryComponent pageName='状态更新(FSU)' :keyValue="tableList" :httpListUrl='listUrl' :httpDetailUrl='detailUrl' :tableHeader='tableHead' :childTable='tableChild' /> 
</template>
<script>
import queryComponent from '_c/airQueryComponent'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{queryComponent},
    beforeMount(){
        this.listUrl=interfaceUrl.queryFsuListByBillno
        this.detailUrl=interfaceUrl.queryFsuAllByMsgid
    },
    data(){
        return{
            listUrl:'',
            detailUrl:'',
            tableList:[
                {key:'totalnumberpieces',value:'货物总件数'},
                {key:'totalshipmentcode',value:'货物总装载类型代码（T）'},
                {key:'weight',value:'重量'},
                {key:'weightcode',value:'重量代码'},
                {key:'numpieces',value:'件数'},
                {key:'shipmentcode',value:'装载类型代码（T或P）'},
                {key:'airportcitydestination',value:'运单目的地'},
                {key:'airportcityorigin',value:'运单启运地'},
                {key:'awbserialnumber',value:'运单序列号'},
                {key:'airlineprefix',value:'航线前缀'},
                {key:'billno',value:'主运单号'}
            ],
            tableChild:[
                {key:'carriercode',value:'RCF-航空公司代码'},
                {key:'flightnum',value:'RCF-航班号'},
                {key:'day',value:'RCF-预达日期'},
                {key:'month',value:'RCF-预达月份'},
                {key:'actualtime',value:'RCF-实际时间'},
                {key:'daychange',value:'RCF-日期变更'},
                {key:'airportcode',value:'RCF-运抵机场代码'},
                {key:'shipmentcode',value:'RCF-装载类型代码（T或P）'},
                {key:'numpieces',value:'RCF-件数'},
                {key:'weightcode',value:'RCF-重量代码'},
                {key:'weight',value:'RCF-重量'},
                {key:'day',value:'NFD-通知日期'},
                {key:'month',value:'NFD-通知月份'},
                {key:'actualtime',value:'NFD-实际时间'},
                {key:'airportcode',value:'NFD-通知机场代码'},
                {key:'shipmentcode',value:'NFD-装载类型代码（T或P）'},
                {key:'numpieces',value:'NFD-件数'},
                {key:'day',value:'AWD-交付日期'},
                {key:'month',value:'AWD-交付月份'},
                {key:'actualtime',value:'AWD-交付实际时间'},
                {key:'airportcode',value:'AWD-交付机场代码'},
                {key:'shipmentcode',value:'AWD-装载类型代码（T或P）'},
                {key:'numpieces',value:'AWD-件数'},
                {key:'day',value:'DLV-交付日期'},
                {key:'month',value:'DLV-交付月份'},
                {key:'actualtime',value:'DLV-交付实际时间'},
                {key:'airportcode',value:'DLV-交付的机场代码'},
                {key:'shipmentcode',value:'DLV-装载类型代码（T或P）'},
                {key:'numpieces',value:'DLV-件数'},
                {key:'carriercode',value:'MAN-航空公司代码'},
                {key:'flightnum',value:'MAN-航班号'},
                {key:'daydep',value:'MAN-预计离港日期'},
                {key:'monthdep',value:'MAN-预计离港月份'}

            ],
            tableHead:[
                {key:'msgid',value:'消息编号'},
                {key:'msgtype',value:'消息类型'},
                {key:'msgversion',value:'消息版本'},
                {key:'airlineprefix',value:'航线前缀'},
                {key:'awbserialnumber',value:'运单序列号'},
                {key:'airportcityorigin',value:'运单启运地'},
                {key:'airportcitydestination',value:'运单目的地'},
                {key:'shipmentcode',value:'装载类型代码（T或P）'},
                {key:'numpieces',value:'件数'},
                {key:'weightcode',value:'重量代码'},
                {key:'weight',value:'重量'},
                {key:'totalshipmentcode',value:'货物总装载类型代码（T）'},
                {key:'totalnumberpieces',value:'货物总件数'},
            ]

        }
    }
}
</script>
<style lang="scss" scoped>


</style>


