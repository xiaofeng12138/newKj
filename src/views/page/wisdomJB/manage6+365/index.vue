<template>
    <div>
        <h1 style="padding-bottom:20px;border-bottom:1px solid #ececec">信息查询</h1>
        <Tabs  value="name1">
            <TabPane label="单次合同要素" name = "name1">
                <contract  @showDetail="information" />
            </TabPane>
            <TabPane label="采购订单要素" name = "name2">
                <order  @showDetail="information" />
            </TabPane>
        </Tabs>
        <detail ref="selfModal"></detail>
    </div>
</template>
<script> 
import contract from './queryContract'
import order from './queryOrder'
import detail from './components/index'
export default {
    components:{
        contract,order,detail
    },
    methods:{
        information(obj){
            this.$refs.selfModal.init(obj)
            this.$refs.selfModal.modal=true
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .ivu-tabs{
        min-height: 400px;
    }

</style>
