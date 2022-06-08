<template>
    <div class='myQuanjinunit'>
        <h4>NFD</h4>
        <div>
            <span class="title">状态代码：</span>
            <span class="content">{{ myData.statuscode }}</span>
        </div>
        <div>
            <span class="title">通知时间：</span>
            <span class="content">{{ myData.nfdDateTime }}</span>
        </div>
        <div>
            <span class="title">通知机场代码：</span>
            <span class="content">{{ myData.airportcode }}</span>
        </div>
        <div>
            <span class="title">装载类型代码 T或P：</span>
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
