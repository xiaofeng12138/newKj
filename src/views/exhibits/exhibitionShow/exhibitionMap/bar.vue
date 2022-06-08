<template>
    <div class="bar">
        <p>
            <span>口岸传染病监测</span>
            <span @click="close">
                关闭
            </span>
        </p>
        <ul class="sick">
            
            
            <li v-for="(item,index) in mouthData" :Key='item.id' v-if="index<=2" >
                <div>
                     <barChart :dataNum='item' /> 
                     <i title="疫情详情" @click="detailC(index+8)">{{item.confirmed}}人</i>
                     <i>{{item.doubt}}人</i>
                </div>
                <span>{{8+index}}</span>
            </li>
            <mix-chart style="width:330px;height:190px"></mix-chart>
         
        </ul>
        <div class="detail">
            <p>
                8{{mouth>10?'-'+10:''}}月发现病症人员数<br>
            </p>
            <p>
                8{{mouth>10?'-'+10:''}}月确诊病例数<br>
                <!-- <img src="../../../../assets/detail.png" alt="" title='详情' @click="detail"> -->
            </p>
        </div>


    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import barChart from './barBlock'
import mixChart from './mixCharts'
export default {
    components:{
        barChart,
        mixChart
    },
    data(){
        return{
            mouthData:[],
            mouth:0,
            doubtOfcountNum:0,
            confirmedOfcountNum:0,
        }
          
    },
    beforeMount(){
        this.init()
        this.mouth=(new Date()).getMonth()+1
    },
    methods:{
        detailC(parmas){
            this.$emit('mouthDetail',parmas)
        },
        close(){
            this.$emit('nameJin',false)
        },
        detail(){
            this.$emit('nameJin',true)
        },
        init(){
            publicInter(interfaceUrl.queryRpidemicCount,{}).then(r=>{
                if(r.code==='200'){
                    this.doubtOfcountNum=r.data.TotalQuanrantine
                    this.confirmedOfcountNum=r.data.TotalComfirmed
                    this.mouthData.push({
                        doubt:r.data.SeptemberQuanrantine||218,
                        confirmed:r.data.SeptemberComfirmed||0
                    })
                    this.mouthData.push({
                        doubt:653||r.data.OctoberQuanrantine,
                        confirmed:38||r.data.OctoberComfirmed
                    })
                    this.mouthData.push({
                        doubt:r.data.NovemberQuanrantine||509,
                        confirmed:r.data.NovemberComfirmed||45
                    })
                    this.mouthData.push({
                        doubt:r.data.DecemeberQuanrantine||0,
                        confirmed:r.data.DecemeberComfirmed||0
                    })
                    console.log(this.mouthData)

                }else{
                    this.$Message.error('查询疫情总数出错！');
                }
            })
            

        }
    },
    beforeDestroy(){
        this.mouthData=[]
    }
    
}
</script>
<style lang="scss" scoped>

.bar{
    width: 100%;
    height: 100%;
    >p{
        display: flex;
        justify-content: space-between;
        padding: 10px;
        font-size: 16px;
        // border-bottom:1px solid #0037B2;
        border-bottom:1px solid #0037B2;
        color: #fff;
        font-weight: 600;
        span:last-child{
            font-size: 14px;
            font-weight: 300;
            cursor: pointer;
            color: #FFDE1D;
        }
    }
    >ul.sick{
        display: flex;
        width: 100%;
        height: calc(100% - 80px);
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            width: 330px;
            height: 100px;
            padding: 5px 30px 50px 80px;
            background: url('../../../../assets/8mouth.png') 10% 0% no-repeat;
            background-size: cover;
            position: relative;
            >div{ 
                    position: absolute;
                    left: 75px;
                    top: 25px;
                    width: 200px;
                    i{
                        position: absolute;
                        color: #fff;
                        right: 10px;
                        top: 5px;
                        font-size: 14px;
                        font-style: normal;
                        cursor: pointer;
                        color: #95EF17;
                        &:nth-child(2):hover{
                            text-decoration: underline;
                        }
                        &:nth-child(3){
                             color: #18F8EA;
                             top: 40px;
                             cursor: default;
                            
                        }
                    }

            }
            >span{
                position: absolute;
                color: #07CEF9;
                left: 28px;
                top:20px;
                width: 35px;
                height: 35px;
                text-align: center;
                line-height: 40px;
                font-size: 1.5rem;
                font-weight: 700;

            }
        }
        div{
            width: 330px;
            height: 100px;
            background-size: cover;
            position: relative;
        }

    }
    .detail{
        width: 100%;
        display: flex;
        margin-top: -20px;

        >p{
            width: 50%;
            color: #fff;
            font-size:16px;
            padding-left: 60px;
            position: relative;
            >img{
                position: absolute;
                left: 200px;
                top:5px;
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
            &::before{
                content: '';
                position: absolute;
                left: 35px;
                top: 4px;
                width: 12px;
                height: 12px;
                border-radius: 4px;
                background: #95EF17;
            }
            &:first-child::before{
               background: #18F8EA;
            }
            &:first-child{
                >span{
                    color: #18F8EA ;
                }
            }
            span{
                color: #95EF17;

            }

        }

    }
}


</style>
