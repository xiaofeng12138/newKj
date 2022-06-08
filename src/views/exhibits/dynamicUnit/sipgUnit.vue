<template>
    <div class="myunit">
        <p>上港集团“中博会绿色通道”集装箱在港情况汇总表</p>
        <div>
            <span>码头</span>
            <span style="color: #1BD1EE;">外高桥港区</span>
            <span style="color: #1BD1EE;">洋山港区</span>
        </div>
        <div>
            <span>累计到港箱量</span>
            <span>74</span>
            <span>50</span>
        </div>
        <div>
            <span>已提离港区箱量</span>
            <span>74</span>
            <span>48</span>
        </div>
        <div>
            <span>当前在场箱量</span>
            <span>0</span>
            <span>2</span>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.myunit{
    >p{
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
    }
    >div{
        width: 100%;
        height: 36px;
        margin-bottom: 1px;
        white-space: nowrap;
        >span{
            display: inline-block;
            width: 33.33%;
            background: #0F2E7C;
            margin:0 1px 0px -4px;
            text-align: center;
            height: 100%;
            line-height: 36px;
            color: #fff;
        }
        >span:first-child{
            background: #1C4691;
            color: #1BD1EE;
        }
    }
}
</style>
<style scoped rel="stylesheet/css">
    @media screen and (min-width: 1800px) {
        /**上港集团“中博会绿色通道”集装箱在港情况汇总表**/
        .myunit >p{
            font-size: 18px;
            margin-bottom: 20px;
        }
        /* .sipgshow >span{
            font-size: 14px;
        } */
        .myunit >div{
            height: 46px;
        }
        .myunit >div >span{
            line-height: 46px;
        }
    }
</style>

