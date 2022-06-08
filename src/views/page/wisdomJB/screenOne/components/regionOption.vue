<template>
    <div class="regionOption">
        <ul class="area">
            <li v-for="ele in area" :key='ele.id' :class="{'active':ele.isActive}" @click="clickArea(ele.key)">{{ele.name}}</li>
        </ul>
        <div class="top">
            <p class="top-country">
                参展商最多: <span>日本</span>  
            </p>
            <p class="top-country">
                价值总额最大: <span>泰国</span>
            </p>
            <div class="slider">
                <ul class="slider_target">
                    <li>最贵的展品——莱奥纳多直升机AW189</li>
                    <li>最大的展品——金牛座龙门铣</li>
                    <li>最有科幻色彩——"会飞的汽车"</li>
                    <li>最有互动性——FORPHEUS乒乓球机器人</li>
                    <li>服务最小消费者——NEONA婴儿核磁共振仪</li>
                    <li>最奢华——粉钻高跟鞋</li>
                    <li>最萌——乐高版"进宝"</li>
                    <li>最大展位——台湾友嘉"2500"平米</li>
                </ul>
            </div>  
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import Slider from './self_slider.js'
export default {
    data(){
        return{
            area:[
                {
                    isActive:false,
                    name:'亚洲',
                    key:'AS'
                },
                {
                    isActive:false,
                    name:'欧洲',
                    key:'EU'
                },
                {
                    isActive:false,
                    name:'南美洲',
                    key:'SA'
                },
                {
                    isActive:false,
                    name:'北美洲',
                    key:'NA'
                },
                {
                    isActive:false,
                    name:'大洋洲',
                    key:'OC'
                },
                {
                    isActive:false,
                    name:'非洲',
                    key:'AF'
                },
                {
                    isActive:false,
                    name:'国家馆',
                    key:'C$E'
                },
                {
                    isActive:false,
                    name:'一带一路国家/地区',
                    key:'B$R'
                },
                

            ],
        }
    },
    mounted(){
        this.sliderInit()
    },
    methods:{
         ...mapMutations('exhibitionStore',[
            'changeSelected'
        ]),
        sliderInit(){
            var target=document.getElementsByClassName('slider_target')[0];
            var slider=new Slider({target:target});
        },
        clickArea(key){
            this.changeSelected(key)

            this.area.forEach(item=>{
                if(item.key===key){
                    item.isActive=true
                }else{
                    item.isActive=false
                }
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.regionOption{
    ul.area{
            position: 0;
            margin: 0;
            list-style: none;
            display: flex;
            justify-content: space-between;
            li{
                cursor: pointer;
                font-size: 1rem;
                color: #fff;
                padding: .3rem .8rem;
                background: url('../../../../../assets/sandbarD.png') 100% 100% no-repeat;
                background-size: cover;
                 &.active,&:hover{
                    color: #000;
                    background: url('../../../../../assets/sandbarH.png') 100% 100% no-repeat;  
                }
            }
        }
        .top{
            display: flex;
            width: 100%;
            margin-top: 1rem;
            justify-content: flex-start;
            align-items: center;
            padding: .5rem 0;
            border-top: 1px solid #0037B2;
            >p.top-country{
                &:first-child{
                    margin-right: 1rem;
                }
                width: 10rem;
                font-size: .9rem;
                color: #fff;
                border-right: 1px solid #0037B2;
                span{
                    color: #FFDE1D;
                    cursor: pointer;
                }

            }
             >div.slider{
                width: calc(100% - 21rem);
                overflow: hidden;
                ul{
                    display: flex;
                    flex-wrap: nowrap;
                    // width: 176rem;
                    list-style: none;
                    align-items: center;
                    margin: 0;
                    padding: 0;
                    transition: all 0.1s ease-out;
                    li{
                        font-size: .9rem;
                        color: #fff;
                        padding:0 1rem;
                        white-space: nowrap;
                        // width: 22rem;
                        border-right: 1px solid #0037B2;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;

                    }
                }

            }
        }
}

</style>

