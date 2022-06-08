<style lang="scss" scoped>

</style>

<template>
    <div>
        <h1 style="margin-bottom: 20px">空运委托报关行提单</h1>
        <bill2 :paramsAir="parmas" :queryUrl='interfaceUrl.queryAirTranBLList'  />
    </div> 
</template>
<script>
import bill2 from './components/index'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{bill2},
    data(){
        return{
            parmas:{
                air:'yes'
            }

        }
    }
    
}
</script>