<template>
    <div class="myBlock1">
        <!-- :transfer='true' -->
        <Poptip trigger="hover" :placement="position"  popper-class="myPopTip">
            <block :blocktext='blockStr' :timestr='timestr' :status='myData.length>0'></block>
            <div slot="content" v-if="myData.length>0">
                <Icon type='ios-arrow-back' @click="changeIndex(-1)"
                    v-if="myData.length > 1 && index >=1">
                </Icon>
                <erp :myData='myData[index]' v-if="myType==='ERP'"></erp>
                <ffm :myData='myData[index]' v-if="myType==='FFM'"></ffm>
                <rcf :myData='myData[index]' v-if="myType==='RCF'"></rcf>
                <nfd :myData='myData[index]' v-if="myType==='NFD'"></nfd>
                <awd :myData='myData[index]' v-if="myType==='AWD'"></awd>
                <dlv :myData='myData[index]' v-if="myType==='DLV'"></dlv>
                <Icon type='ios-arrow-forward'  @click="changeIndex(1)"
                    v-if="myData.length > 1 && index < myData.length-1">
                </Icon>
            </div>
        </Poptip>
    </div>
</template>
<script>
import block from './block.vue';
import rcf from './rcf.vue';
import ffm from './ffm.vue';
import erp from './erp.vue';
import nfd from './nfd.vue';
import awd from './awd.vue';
import dlv from './dlv.vue';
export default {
    components:{ block,rcf,ffm,erp,nfd,awd,dlv},
    props:['blockStr','timestr','status','myData','myType','position'],
    data(){
        return{
            index:0,
            mydata2:{
                dlvDateTime:'2018/1/1'
            }
        }
    },
    methods:{
        changeIndex(index){
            this.index += index;
        }
    }
}
</script>
<style lang="scss" scoped>
.myBlock1{
    display: inline-block;
    vertical-align: middle;
}
</style>

