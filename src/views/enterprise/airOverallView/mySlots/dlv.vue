<template>
    <div class='myQuanjinunit'>
        <h4>DLV</h4>
        <div>
            <span class="title">提离时间：</span>
            <span class="content">{{ myData.dlvDateTime }}</span>
        </div>
        <div>
            <span class="title">机场代码：</span>
            <span class="content">{{ myData.airportcode }}</span>
        </div>
        <div>
            <span class="title">类型：</span>
            <span class="content">{{ myData.shipmentcode }}</span>
        </div>
        <div>
            <span class="title">件数：</span>
            <span class="content">{{ myData.numpieces }}</span>
        </div>
        <div>
            <span class="title">重量：</span>
            <span class="content">{{ myData.weight }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:['myData'],
}
</script>