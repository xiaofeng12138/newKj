<template>
    <ol>
        <li v-for="elem in hiddenKey" :key="elem.id">
            <span>{{elem.value}}：</span>
            <span>{{RowValue[elem.key]||'暂无'}}</span>
        </li>
    </ol>
</template>
<script>
export default {
    props:{
        hiddenKey:{
            type:Array,
            required:false
        },
        RowValue:{
            type:Object,
            required:false
        }
    }
    
}
</script>
<style lang="scss" scoped>
    ol{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        li{
            margin: 1rem 2rem 0 0;
            font-size: 1rem;
        }
    }

</style>

