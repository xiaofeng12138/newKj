<template>
    <div class="overflow">
     <Tabs class="customTabs center agentCencus">
        <TabPane label="进口巴拿马菠萝">
          <pineapple/>
        </TabPane>
        <TabPane label="进口马来西亚冷冻榴莲">
           <durian/>
        </TabPane>
       
    </Tabs> 
    </div>
</template>
<script>
import pineapple  from './components/pineapple'
import durian from './components/durian'
export default {
    components:{
        pineapple,durian
    },
     data(){
         return{

         }
     }
    
}
</script>
<style lang="scss">
</style>

