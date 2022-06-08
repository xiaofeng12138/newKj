<template>
    <Tabs class="customTabs center agentCencus" style="min-height::100%">
        <TabPane label="巡馆小助手">
            <search />
        </TabPane>
        <TabPane label="巡馆痕迹">
            <record />
        </TabPane>
        <TabPane label="巡馆异常">
            <unusual />
        </TabPane>
        <TabPane label="图片采集">
            <imageExce />
        </TabPane>
        <TabPane label="视频采集">
            <videoList />
        </TabPane>
    </Tabs> 
</template>
<script>
import search from './components/search'
import record from './components/record'
import unusual from './components/unusual'
import imageExce from './components/imageExce'
import videoList from './components/videoList'
export default {
    components:{
        search,record,unusual,imageExce,videoList
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