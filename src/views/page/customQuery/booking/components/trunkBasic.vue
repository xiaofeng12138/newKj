<template>
    <div>
        <Table border :columns="columns" :data="list" class="self"></Table>
    </div>
</template>
<script>
export default {
    props:['list'],
    data(){
        return{
            columns:[
                {
                    title:'订舱号',
                    key:'BOOKING_NUM'
                },
                {
                    title:'Hs code',
                    key:'HS_CDE'
                },
                {
                    title:'货物描述',
                    key:'BRIEF_DESC'
                },
            ]
        }
    }
    
}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>

</style>
