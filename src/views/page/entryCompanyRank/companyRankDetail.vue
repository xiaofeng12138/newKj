<template>
    <div class="hug-body-content">
        <div class="hug-wrap">
			<!-- Swiper -->
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in rankArr" :key="index">
						<h4 v-html="item.name"></h4>
						<ul>
							<li v-for="(child_item,child_index) in item.value" :key="child_index">
                                    <!-- <a href="javascript:void(0);"> -->
                                            <!-- <Tooltip>     -->
                                                <p><span>NO.{{child_index+1}}</span>{{child_item.agentName}}</p>
                                                <!-- <div slot="content">
                                                        <p style="color: white !important;white-space: normal !important;">{{child_item.agentName}}</p>
                                                        <p style="color: white !important;white-space: normal !important;">{{child_item.proportion}}</p>
                                                    </div>
                                            </Tooltip>     
                                    </a> -->
                            </li>
						</ul>
					</div>
				</div>
			</div>
		</div>	
        <div class="hug-footer">沪ICP备 05012889 号  沪公网安备 31022102000177号</div>
    </div>
</template>
<script>
    import cfg from '@/until/config';
    import Swiper from '@/assets/entryCompanyRank/js/swiper.min.js';
    import interfaceUrl from '@/api/interfaceUrl';
    import {getEntryCompanyRank} from '@/api/http'
    import axios from 'axios'
    export default{
        data(){
            return{
                area:'',
                isQuickFlag:'',
                ym:'',
                rankArr:[],
                echartForm:{
                    ym:"",
                    agentName:''
                }  
            }
        },
        methods:{
                initMethord(){
                    axios({
                    method:'get',
                    url:cfg.base+interfaceUrl.getEntryCompanyRankDetail
                    +'?ym='+this.ym+'&isQuick='+this.isQuickFlag+'&area='+this.area,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' }
                }).then(r=>{
                    this.rankArr=r.data.data; 
                })      
        },
        goEchart(companyName){
                this.echartForm.agentName=companyName;
                this.echartForm.ym=this.ym;
                this.$router.push({
                     path:'/companyRankEchart',
                     query:this.echartForm
                 })
            }
        },
        mounted(){
            this.area=this.$route.query.area?this.$route.query.area:null;
            this.isQuickFlag=this.$route.query.isQuickFlag?this.$route.query.isQuickFlag:null;
            this.ym=this.$route.query.ym?this.$route.query.ym:null;
            
            this.initMethord();
        }

    }
</script>
<style scoped>
        @import '../../../assets/entryCompanyRank/css/swiper.min.css';
        @import '../../../assets/entryCompanyRank/css/style.css';
 </style>