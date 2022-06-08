<template>
    <div class='myQuanjinunit'>
        <h4>FFM</h4>
        <div>
            <span class="title">预报起运时间：</span>
            <span class="content">{{ myData.preTransitDate }}</span>
        </div>
        <div>
            <span class="title">装载地代码：</span>
            <span class="content">{{ myData.airportcodeloading }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:['myData'],
}
</script>
