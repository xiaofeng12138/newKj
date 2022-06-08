<template>
    <Tabs class="customTabs center agentCencus">
        <TabPane label="展商查询">
            <exhibition />
        </TabPane>
        <TabPane label="展品查询">
            <exhibit />
        </TabPane>
    </Tabs> 
</template>
<script>
import exhibition from './components/exhibition'
import exhibit from './components/exhibit'
export default {
    components:{
        exhibition,exhibit
    }
    
}
</script>
<style lang="scss" scoped>
img{
    width: 100%;
    height: 72vh;
    margin-top: 1vh;
}
</style>