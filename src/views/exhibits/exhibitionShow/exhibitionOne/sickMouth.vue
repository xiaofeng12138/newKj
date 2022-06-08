<template>
    <div class="diagnosis">
        <p class="sickTitle">
            <span>口岸传染病监测</span>
            <span @click="closeSick">关闭</span>
        </p>
        <ol>
            <li mouth='8' @click="mouthClick(8)" alt='8月確診人數'>
                <barChart :data='sickData[0]' />
            </li>
            <li mouth='9' @click="mouthClick(9)" alt='9月確診人數'>
                <barChart :data='sickData[1]' />
            </li>
            <li mouth='10' @click="mouthClick(10)" alt='10月確診人數'>
                <barChart :data='sickData[2]' />
            </li>
            <li>
                <mix-chart/>
            </li>
        </ol>
        <p class="sickFooter">
            <span>8月发现病症人员数</span>
            <span>8月确诊病例数</span>
        </p>
    </div>
    
</template>
<script>
import barChart from './barfigure'
import mixChart from './mixCharts'
import {mapMutations} from 'vuex'
export default {
    components:{
        barChart,
        mixChart
    },
    data(){
        return{
            sickData:[
                [218,58],
                [613,38],
                [509,45]
            ]
        }
    },
    methods:{
         ...mapMutations('exhibitionStore',[
            'viewChange'
        ]),
        closeSick(){
            this.viewChange([true,true])
        },
        mouthClick(num){
            this.$emit('mouthClick',num)
        }
    }
    
}
</script>
<style lang="scss" scoped>
.diagnosis{
    width: 100%;
    height: 100%;
    padding:0 1rem;
    .sickTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        height: 2.5rem;
        border-bottom: 1px solid #0037B2;
        span:last-child{
            font-size: .8rem;
            cursor: pointer;
            color: #ffde1d;
        }
    }
    >ol{
        list-style: none;
        height: calc(100% - 4rem);
        display: flex;
        flex-wrap: wrap;
        li{
            width: 50%;
            &:first-child,&:nth-child(2),&:nth-child(3){
                height: 45%;
                padding: 1.4rem 3rem .8rem 3.8rem;
                background: url('../../../../assets/8mouth.png') 0 0 no-repeat;
                background-size: cover;
                position: relative;
                cursor: pointer;
                &::before{
                    content: attr(mouth);
                    position: absolute;
                    width:1.75rem;
                    text-align: center;
                    left: 1.45rem;
                    top: 1.25rem;
                    font-weight: 600;
                    font-size: 1rem;
                }
            }
            &:last-child{
                height: 55%;
            }
        }
    }
    .sickFooter{
        display: flex;
        height: 1.5rem;
        justify-content: space-around;
        align-items: center;
        span{
            font-size: .8rem;
            position: relative;
            color: #95EF17;
            &:last-child{
                color: #18F8EA;
                &::before{
                    background: #18F8EA;
                }
            }
            &::before{
                content: '';
                position: absolute;
                width: .7rem;
                height: .7rem;
                border-radius: 4px;
                left: -1rem;
                top:50%;
                transform: translate(0,-50%);
                background: #95EF17;
            }
        }
    }
}

</style>
