<template>
    <div class="exhitionMap" :style="{width:exhitionWidth,height:exhitionHeight}">
        <!--1,2,3等展馆编号-->
        <img v-if="floor === '1'" style="left: 59%;top: 12%;" src="@/assets/zi1.png"/>
        <img v-if="floor === '1'" style="left: 46%;top: 9%;" src="@/assets/zi2.png"/>
        <img v-if="floor === '1'" style="left: 22%;top: 15%;" src="@/assets/zi3.png"/>
        <img v-if="floor === '1'" style="left: 16%;top: 27%;" src="@/assets/zi41.png"/>
        <img v-if="floor === '1'" style="left: 25%;top: 55%;" src="@/assets/zi51.png"/>
        <img v-if="floor === '1'" style="left: 40%;top: 63%;" src="@/assets/zi61.png"/>
        <img v-if="floor === '1'" style="left: 70%;top: 48%;" src="@/assets/zi71.png"/>
        <!--<img v-if="floor === '1'" style="left: 74%;top: 33%;" src="@/assets/zi81.png"/>-->
        <img v-if="floor === '2'" style="left: 25%;top: 55%;" src="@/assets/zi52.png"/>
        <img v-if="floor === '2'" style="left: 70%;top: 48%;" src="@/assets/zi72.png"/>
        <img v-if="floor === '2'" style="left: 74%;top: 33%;" src="@/assets/zi82.png"/>
        <div>
            <!--positionExOut(unitImg,index)-->
            <div v-show="floor === '1'">
                <img  v-for="(unitImg,index) in linkerImgs.floor1" :key="index"
                        :class="{
                            opacity1:(unitImg.opacity == '1' || (positionIndex === unitImg.index && currentPosition === unitImg.pavilion) || (show98 && unitImg.opacity == '0.98')),
                            opacity0:!(unitImg.opacity == '1' || (positionIndex === unitImg.index && currentPosition === unitImg.pavilion) || (show98 && unitImg.opacity == '0.98'))}"
                        :src="unitImg.src" :style="{left:unitImg.left,top:unitImg.top,width:unitImg.width,height:unitImg.height}"
                        @mouseover = 'unitImg.opacity = "1"'  @mouseout = 'unitImg.opacity = "0"' @click="positionEx(unitImg,index)"/>
            </div>
            <div  v-show="floor === '2'">
                <img v-for="(unitImg,index) in linkerImgs.floor2" :key="index"
                        :class="{opacity1:(unitImg.opacity == '1' || (positionIndex === unitImg.index && currentPosition === unitImg.pavilion)),opacity0:!(unitImg.opacity == '1' || ((positionIndex) === unitImg.index && currentPosition === unitImg.pavilion))}"
                        :src="unitImg.src" :style="{left:unitImg.left,top:unitImg.top,width:unitImg.width,height:unitImg.height}"
                        @mouseover = 'unitImg.opacity = "1"'  @mouseout = 'unitImg.opacity = "0"' @click="positionEx(unitImg,index)"/>
            </div>
            <img src="@/assets/position.png" :style="{width: '14px',height: '16px',left:positionLeft,top:positionTop,'margin-top':'-10px','margin-left':'4px'}"
                    v-if="positionShow"/>
        </div>
    </div>
</template>
<script>
export default {
    props:['exhitionWidth','exhitionHeight','floor','positionIndex','positionShow','show98','linkerImgs','currentPosition',
    'positionTop','positionLeft'],
    data(){
        return {
            
        }
    },
    created(){
       
    },
    methods:{
        positionEx(unitImg,index){            
            this.$emit('positionEx',index);
        }
    }
}
</script>
<style lang="scss" scoped>
.exhitionMap{
    background: url("../../../../../assets/exhitorOneFloor.png") 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    img{
        position: absolute;
        width: 40px;
    }
    >div>div{
        img{
            width: 24px;
            height: 28px;
            position: absolute;
        }
        img.opacity1{
            animation: changeOpacity1 1s;
            opacity: 1;
        }
        img.opacity0{
            animation: changeOpacity0 1s;
            opacity: 0.1;
        }
    }
}

@keyframes changeOpacity1 {
    from{opacity: 0.1}
    to{opacity: 1}
}

@keyframes changeOpacity0 {
    from{opacity: 1}
    to{opacity: 0.1}
}
</style>
