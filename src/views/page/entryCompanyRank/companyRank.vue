<template>
        <div class="hug-body-index">
            <Col span="12">
                <DatePicker :value="ym"  format="yyyy-MM" @on-change="refresh" placeholder="请选择月份" type="month" style="width:200px"></DatePicker>
            </Col>
                <div class="hug-wrap">
                    <!-- Swiper -->
                    <div class="swiper-container">
                         
                        <div class="swiper-wrapper"> 
                            <!--此处迭代-->
                            <div data-tag="div" v-if="index==0||index==3" class="swiper-slide"   v-for="(item,index) in rankArr" :key="index"  :data-area="item.area" :data-ym="item.ym" :data-isquick="item.isQuickFlag">
                                <h4 data-tag="h4" :data-area="item.area" :data-ym="item.ym" :data-isquick="item.isQuickFlag">{{item.name}}</h4>
                                <ul>
                                    <li  v-for="(child_item,child_index) in item.value" :key="child_index">                                   
                                        <!-- <a href="javascript:void(0);" @click="goEchart(child_item.agentName)"> -->
                                                <!-- <Tooltip max-width="200" placement="bottom">     -->
                                                    <p><span>NO.{{child_index+1}}</span>{{child_item.agentName}}</p>
                                                    <!-- <div slot="content">
                                                        <p style="color: white !important;white-space: normal !important;">{{child_item.agentName}}</p>
                                                        <p style="color: white !important;white-space: normal !important;">{{child_item.proportion}}</p>
                                                    </div>
                                                </Tooltip>      -->
                                        <!-- </a> -->
                                    </li>
                                </ul>
                            </div>
                         <!-- 迭代结束-->      
                        </div>
                        
                        <!-- Add Pagination -->
                        <div class="swiper-pagination"></div>
                    </div>
                    <!-- Add Arrows -->
                    <!-- <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div> -->
                </div>
                
                <div class="hug-footer">沪ICP备 05012889 号  沪公网安备 31022102000177号</div>
    </div>
</template>
<script>
    import cfg from '@/until/config' 
    import interfaceUrl from '@/api/interfaceUrl';
    import Swiper from '@/assets/entryCompanyRank/js/swiper.min.js';
    import {getEntryCompanyRank} from '@/api/http'
    import axios from 'axios'
    export default{
        data(){
            return{
            rankArr:[],
                ym:"",
                queryForm:{
                    area:"",
                    isQuickFlag:"",
                    ym:""
                } ,
                echartForm:{
                    ym:"",
                    agentName:''
                }   
            }
        },
        methods:{
            EntryCompanyRank(){        
                axios({
                    method:'get',
                    url:cfg.base+interfaceUrl.getEntryCompanyRank+'?ym='+this.ym,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' }
                }).then(r=>{
                    this.rankArr=r.data.data; 
                }).then(s=>{
                        this.initSwiper();                 
                })
              
               
            },
            refresh(date){
               
                this.ym=date;
                this.EntryCompanyRank();
            },
                   
            initSwiper(){             
                let that=this;
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        slidesPerGroup: 2,
                        loop: false,                                       
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        on:{
                            click:function(event){
                                const dataset=event.target.dataset;
                                if(dataset.tag=="h4"||dataset.tag=="div"){                               
                                    that.seeDetail(dataset.area,dataset.ym,dataset.isquick);
                                }                      
                            }
                        }
                    });         
            }, 
            seeDetail(area,ym,isQuickFlag){   
                 this.queryForm.area=area;
                 this.queryForm.ym=ym;
                 this.queryForm.isQuickFlag=isQuickFlag;
                 
                 this.$router.push({
                     path:'/companyRankDetail',
                     query:this.queryForm
                 })
            },
            goEchart(companyName){
                this.echartForm.agentName=companyName;
                this.echartForm.ym=this.ym;
                this.$router.push({
                     path:'/companyRankEchart',
                     query:this.echartForm
                 })
            },
            initYm(){
                const mon=new Date().getMonth();
                //一月，显示为去年的12月,其他的默认显示上个月
                if(mon==0){
                        this.ym=(new Date().getFullYear()-1)+'-'+12;      
                }else if(mon<=9){
                        this.ym=new Date().getFullYear()+'-0'+new Date().getMonth();  
                }else{
                    this.ym=new Date().getFullYear()+'-'+new Date().getMonth();  
                }
            }
        },
        mounted(){
            this.initYm();
            this.EntryCompanyRank();   
            //初始化日期
         }
        
    }
</script>
<style scoped>
 @import '../../../assets/entryCompanyRank/css/swiper.min.css';
 @import '../../../assets/entryCompanyRank/css/style.css';
 .hug-body-index .swiper-container{
     width: 75% !important;
 }
</style>