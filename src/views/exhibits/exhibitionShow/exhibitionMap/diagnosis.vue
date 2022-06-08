<template>
    <div class="box">
        <ul class="title">
            <li>主要疫情</li>
            <li>
                <span @click="goback">返回</span>
                <span @click="close">关闭</span>
            </li>
        </ul>
        <div class="swpper">
            <div class="illness" v-for="(item,index) in illness" :key="item.id" v-if="illness">
                <ol :class="{gray:!item.isGray}" @click="illnessInfor(item.name,index)">
                    <li>{{item.name}}</li>
                    <li>检出病状:{{item.checkinNum}}人</li>
                    <li>
                        确诊病症:{{item.confirmNum}}人
                        <img src="../../../../assets/ditu.png">     
                    </li>
                </ol>
            </div>
        </div>
        
    </div>    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    data(){
        return{
            illness:[
                {name:'埃博拉出血热',checkinNum:188,confirmNum:145,isGray:true},
                {name:'登革热',checkinNum:188,confirmNum:145,isGray:false},
                {name:'鼠疫',checkinNum:188,confirmNum:145,isGray:false},
                {name:'尼怕病毒',checkinNum:188,confirmNum:145,isGray:false},
            ]
        }
    },
    mounted(){
        this.getInitData()
    },
    methods:{
        goback(){
            this.$emit('nameMei',false)
        },
        close(){
            this.$emit('nameMei',true)
        },
        illnessInfor(name,i){
            this.illness.forEach((item,index)=>{
                if(index!==i){
                    item.isGray=false
                }
            })
            this.$emit('illnessName',name)
        },
        getInitData(){
            this.illness=[]
            publicInter(interfaceUrl.queryEpidemicInfor,{EpidemicName:'',month:''}).then(r=>{
                if(r.code==='200'){
                    r.data.EpidemicInfo.forEach(element => {
                        this.illness.push({
                            name:element.EPIDEMIC_NAME,
                            checkinNum:element.QUANRANTINE,
                            confirmNum:element.COMFIRMED,
                            isGray:true
                        })
                    });
                }else{
                    this.$Message.error('查询疫病详情出错！')
                }
                
            })
        }
    }

    
}
</script>
<style lang="scss" scoped>
    
    .box{
        width: 95%;
        margin: 0 auto;
    }
    .title{
        list-style: none;
        padding: .8rem 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #0037B2;
       
        li:first-child{
            font-size: 1rem;
             color: #fff;

        }
        li{
            font-size: .8rem;
            color: #FFDE1D;
            span{
                margin: 0 .2rem;
                cursor: pointer;
            }
        }
    }
    .illness{
        ol{
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            margin-top: 1rem;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            &.gray{
                opacity: 0.4;
                cursor: default;
            }
            li{
                color: #FFA71A;
                border: 1px solid #FFA71A;
                font-size: 1rem; 
                padding: .2rem .8rem;
                border-radius: 15px;
                 position: relative;
               
                &:first-child{
                    width: 25%;
                    z-index: 11;
                    
                }
                &:nth-child(2){
                    width: 28%;
                   
                    &::after,&::before{
                        content: '';
                        height: 1px;
                        background: #FFA71A;
                        position: absolute;
                        width: 23.2%;
                        top:50%;
                        z-index: 0;
                        transform: translateY(-50%)

                    }
                    &:after{
                        right: -23.2%;
                    }
                    &:before{
                        left: -23.2%;
                    }
                }
                &:nth-child(3){
                    width: 34%;
                    z-index: 11;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img{
                        width: 1.1rem;
                        height: 1.1rem;
                    }
                }
            
            }
        }
    }

</style>
