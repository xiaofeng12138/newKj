<template>
    <div class='myQuanjinunit'>
        <h4>企业REP</h4>
        <div>
            <span class="title">订单时间：</span>
            <span class="content">{{ myData.orderdate }}</span>
        </div>
        <div>
            <span class="title">卖方企业：</span>
            <span class="content">{{ myData.companyfullnamezh }}</span>
        </div>
        <div>
            <span class="title">买方企业：</span>
            <span class="content">{{ myData.cncompanycode }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:['myData'],
}
</script>
