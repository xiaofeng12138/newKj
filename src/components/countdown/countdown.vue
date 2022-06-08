<template>
    <div>
           <div class="countdown" v-if="showFlag">
                距第四届中国国际进口博览会还有
                    <div class="numWrap" >
                        <img v-for="(item,index) in showCountTime" :key="index" :src="item" alt="">
                    </div>
                    天
            </div>

            <div class="opening" v-else>
                    开幕第
                    <div class="numWrap" >
                        <img v-for="(item,index) in showCountTime" :key="index" :src="item" alt="">
                    </div>
                    天
            </div>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
             allshowImg:[
                {
                id:require('@/assets/index/0.png')
                },
                {
                id:require('@/assets/index/1.png')
                },
                {
                id:require('@/assets/index/2.png')
                },
                {
                id:require('@/assets/index/3.png')
                },
                {
                id:require('@/assets/index/4.png')
                },
                {
                id:require('@/assets/index/5.png')
                },
                {
                id:require('@/assets/index/6.png')
                },
                {
                id:require('@/assets/index/7.png')
                },
                {
                id:require('@/assets/index/8.png')
                },
                {
                id:require('@/assets/index/9.png')
                },
             ],
             showFlag:true,
             showCountTime:[],
        }
    },
    methods:{
         countTime(){
            let nowdate = new Date()
            let until = new Date('2021-11-05 00:00:00')
            let day = Math.floor((until-nowdate)/1000/3600/24)
            console.log(day)
            if(day > 0){
               let dayString = day.toString()
               for(let i = 0;i<dayString.length;i++){
                    let num = dayString[i] * 1
                    let nowDay = this.allshowImg[num].id
                    this.showCountTime.push(nowDay)
               }
            }else{
                this.showFlag = false
                let dayString = (Math.abs(day)+1).toString()
                 for(let i = 0;i<dayString.length;i++){
                    let num = dayString[i] * 1
                    let nowDay = this.allshowImg[num].id
                    this.showCountTime.push(nowDay)
               }
            }
        },
    },
    mounted(){
        this.countTime()
    }
}
</script>

<style lang="scss" scoped>
.countdown{
        position: absolute;
        display: flex;
        top: 30px;
        left: 31%;
        width: 100%;
        text-align: center;
        height: 50px;
        font-size: 1.5rem;
        line-height: 80px;
        font-weight: bold;
        color: #FFE75A;
        .numWrap{
            margin: 0 10px;
            img{
              width: 70px;
              margin: 0 5px;
            }
        }
    }
    .opening{
        position: absolute;
        display: flex;
        top: 30px;
        left: 43%;
        width: 100%;
        text-align: center;
        height: 50px;
        font-size: 1.5rem;
        line-height: 80px;
        font-weight: bold;
        color: #FFE75A;
        .numWrap{
            margin: 0 10px;
            img{
              width: 70px;
              margin: 0 5px;
            }
        } 
    }
</style>