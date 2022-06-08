<template>
    <div class='myQuanjinunit'>
        <h4>RCF</h4>
        <div>
            <span class="title">状态代码:</span>
            <span class="content">{{ myData.statuscode}}</span>
        </div>
        <div>
            <span class="title">预达日期:</span>
            <span class="content">{{ myData.rcfDateTime }}</span>
        </div>
        <div>
            <span class="title">变更日期：</span>
            <span class="content">{{ myData.daychange }}</span>
        </div>
        <div>
            <span class="title">航空公司编号：</span>
            <span class="content">{{ myData.carriercode }}</span>
        </div>
        <div>
            <span class="title">航班号：</span>
            <span class="content">{{ myData.flightnum }}</span>
        </div>
        <div>
            <span class="title">抵运机场代码：</span>
            <span class="content">{{ myData.airportcode }}</span>
        </div>
        <div>
            <span class="title">装载类型 T或P：</span>
            <span class="content">{{ myData.shipmentcode }}</span>
        </div>
        <div>
            <span class="title">件数：</span>
            <span class="content">{{ myData.numpieces }}</span>
        </div>
        <div>
            <span class="title">重量代码：</span>
            <span class="content">{{ myData.weightcode }}</span>
        </div>
        <div>
            <span class="title">重量：</span>
            <span class="content">{{ myData.weight }}</span>
        </div>
        <div>
            <span class="title">飞机起飞时间：</span>
            <span class="content">{{ myData.timedep }}</span>
        </div>
        <div>
            <span class="title">飞机到港时间：</span>
            <span class="content">{{ myData.timearr }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:['myData'],
}
</script>
