<template>
    <div class="classfiyParent" :style="{height:height,width:width}">
        <!--<div  class="classfiy clear">-->
            <!--<li>-->
                <!--<router-link to='/zhongbohui'>-->
                    <!--<div>-->
                        <!--<img src="../../assets/jjwzzmbl.png" />-->
                    <!--</div>-->
                    <!--<p>证明函办理</p>-->
                <!--</router-link>-->

            <!--</li>-->
            <!--<li>-->
                <!--<router-link to='/hallDynamics'>-->
                    <!--<div>-->
                        <!--<img src="../../assets/qcwlztcx.png" />-->
                    <!--</div>-->
                    <!--<p>展馆动态</p>-->
                <!--</router-link>-->
            <!--</li>-->
            <!--<li>-->
                <!--<a href="javascript:void(0);" @click="alertUrl('https://ebpp.coscon.com/expo/')">-->
                    <!--<div>-->
                        <!--<img src="../../assets/deliverry.png" />-->
                    <!--</div>-->
                    <!--<p>优享订舱平台</p>-->
                <!--</a>-->
            <!--</li>-->
            <!--<li @click="alert">-->
                <!--<div>-->
                    <!--<img src="../../assets/wsqy.png" />-->
                <!--</div>-->
                <!--<p></p>-->
            <!--</li>-->
            <!--<li @click="alert">-->
                <!--<div>-->
                    <!--<img src="../../assets/tjfx.png" />-->
                <!--</div>-->
                <!--<p>统计分析</p>-->
            <!--</li>-->
            <!--<li>-->
                <!--<a href="javascript:void(0);" @click="alertUrl('http://www.sipg.com.cn/')">-->
                    <!--<div>-->
                        <!--<img src="../../assets/kstl.png" />-->
                    <!--</div>-->
                    <!--<p>快速提离</p>-->
                <!--</a>-->
            <!--</li>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "zbhLink",
        data(){
            return{
                height:"",
                width:"",
            }
        },
        created(){
            this.height=((document.documentElement.clientHeight || document.body.clientHeight)-64)+'px';
            this.width=((document.documentElement.clientWidth || document.body.clientWidth)-200)+'px';
            window.onresize= ()=> {
                this.height=((document.documentElement.clientHeight || document.body.clientHeight)-64)+'px';
                this.width=((document.documentElement.clientWidth || document.body.clientWidth)-200)+'px';
            }
        },
        methods: {
            alert() {
                this.$Modal.info({
                    title: '',
                    width: 300,
                    content: '<p style="font-size:16px"> 功能暂未开放，敬请期待</p>'
                });
            },
            alertUrl(url) {
                
            }

        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.classfiyParent{
    margin:-50px 0 -23px -48px;       
    overflow: hidden;
    list-style: none;
    padding-top: 30px;
    background: url('../../assets/WechatIMG70.png') no-repeat 50% 50%;
    background-size: cover;
    .classfiy{    
        position:relative; 
        width:100%;
        height:100%;
        margin-left:-78px;
        margin-top:-30px;  
        li{
            float: left;
            text-align: center;
            background: url("../../assets/libg.png") no-repeat;
            width: 180px;
            height: 180px;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-background-size: 100%;
            background-size: 100% ;
            div{
                position: relative;
                margin-top: 45px;
                width: 80px;
                height: 64px;
                display: inline-block;
            }
            p{
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 0.22px;
                padding-top: 2px;
                width:140px;
                display:inline-block;
            }
        }
        li:hover{
            animation: jump 1s ease infinite;
        }
        li:nth-child(1){
            margin-top: -250px;
            margin-left: -168px;
        }
        li:nth-child(2){
            margin-top: -250px;
            margin-left: 140px;
        }
        li:nth-child(3){
            margin-top: -40px;
            margin-left: -178px;
        }
        li:nth-child(4){
            margin-top: -140px;
            margin-left: -12px;

        }
        li:nth-child(5){
            margin-top: -40px;
            margin-left: 156px;
        }
        li:nth-child(6){
            margin-top: 76px;
            margin-left: -12px;
        }
    }
}


@keyframes jump{
    from{
        transform: translate(0,0)
    }
    50%{
        transform: translate(0,10px)
    }
    to{
        transform: translate(0,0)
    }
}

</style>