<template>
    <div class="zhbLoginIndex">
        <div  class="classfiy clear" v-show="!show">
            <li>
                <div>
                    <img src="../../assets/jjwzzmbl.png" />
                </div>
                <p>证明函办理</p>
            </li>
            <li>
                <div>
                    <img src="../../assets/qcwlztcx.png" />
                </div>
                <p>展馆动态</p>
            </li>
            <li>
                <div>
                    <img src="../../assets/deliverry.png" />
                </div>
                <p>优享订舱平台</p>
            </li>
            <li :style="{cursor:'pointer'}" @click="loginWin">
                <div>
                    <img src="../../assets/wsqy.png" />
                </div>
                <p>登录</p>
            </li>
            <li>
                <div>
                    <img src="../../assets/tjfx.png" />
                </div>
                <p>统计分析</p>
            </li>
            <li>
                <div>
                    <img src="../../assets/kstl.png" />
                </div>
                <p>快速提离</p>
            </li>
        </div>
        <!-- <div v-if="show" :class="{hideTab:show}">
            
             <loginModule :isExhibtion='showIntro' loginTitle='进博会专窗'></loginModule>
        </div> -->
    </div>
</template>

<script>
    import {getUserRole} from '../../until/getToken'
    import loginModule from "../module/login/loginModule";
    
    export default {
        name: "zbhLogin",
        components: {loginModule},
        data(){
            return{
                show:false,
                showIntro:false
            }
        },
        created(){
        },
        methods: {
            loginWin() {
                this.show = true;
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.zhbLoginIndex{
    overflow: hidden;
    list-style: none;
    padding-top: 30px;
    background: url('../../assets/zbhbg.png') no-repeat 50% 50%;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    .hideTab{
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        top: 50%;
        .login{
            display: block;
        }
    }
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
        /**li:nth-child(1){
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
        }**/
    }
    .zhbLoginWin{
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        top: 50%;
        background: linear-gradient(-180deg, #4764B6 0%, #22347F 100%);
        padding: 20px;
        text-align: center;
        border-radius: 50%;
        width: 400px;
        height: 400px;
        h1{
            color: #fff;
            text-align: center;
            font-size: 36px;
            padding: 20px 0 0 0;
        }

    }

}

/*@keyframes jump{*/
    /*from{*/
        /*transform: translate(0,0)*/
    /*}*/
    /*50%{*/
        /*transform: translate(0,10px)*/
    /*}*/
    /*to{*/
        /*transform: translate(0,0)*/
    /*}*/
/*}*/

</style>