<template>
  <div>
      <h1>信息查询</h1>
      <Tabs value="name2">
        <TabPane label="框架协议要素" name='name2'>
             <agreements /> 
        </TabPane>
        <TabPane label="单次合同要素" >
            <contract/>
        </TabPane>  
        <TabPane label="采购订单要素">
            <order/>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
    import agreements from './agreements'
    import order from './order'
    import contract from './contract'
    import { mapMutations } from 'vuex'
    export default {
        name:'inforQuery',
        components:{
             agreements,
             order,
             contract
        },
         created(){
            this.setMenu('2-1')
        },
        methods:{
            ...mapMutations(['setMenu']),

        }
    }
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .ivu-tabs-ink-bar{
        top: 1px;
    }
</style>
