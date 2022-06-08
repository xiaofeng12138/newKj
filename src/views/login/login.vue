<template>
    <div class="layoutBox">
        <div class="header clear">
            <div class="logo clear">
                <img src="../../assets/welLogo.png" alt="">
            </div>

        </div>
        <div class="content" :style="{height:height}" >
            <div class="bg1" :class="{change:toggle}"></div>
            <div class="bg2" :class="{change:toggle}"></div>
            <img src="../../assets/bj_ship.png" alt="" v-if='!toggle' />
            <h1 class="text" v-if='!toggle'>
                THE <br> 
                CROSS-BORDER <br>
                TRADING <br>
                2018  
                <hr>
            </h1>
            <ol class="newsTab clear" :class="{closeTab:toggle}">
                    <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=2">新闻</a></li>
                    <li><a href="http://www.singlewindow.sh.cn/winxportal/static/news/list.html?cols=1">通知</a></li>
                    <li><a href="javascript:void(0)">业务介绍</a></li>
                </ol> 
            <h1 v-if='toggle'>跨境贸易智慧通</h1>
            <div class="contanier" :class="{hideTab:toggle}" >
                <!-- <a href="javascript:void(0)" @click="swicth">
                    点击进入
                </a>-->
            
                <div class="welcome" v-if='!toggle'>
                    <h1>智慧通 带你走进新世界</h1>
                    <p>
                        <span @click="swicth">跨境贸易智慧通</span>
                        <!-- <span @click="loaction" style="width:280px;">跨境贸易智慧通(空运)</span> -->
                        <!-- <router-link to='/zbhLogin'>进博会专窗</router-link> -->
                        <!-- <a href=""></a> -->
                    </p>
                </div>
                
                <div class="login">
                    <Form :model="formInline" :rules="ruleInline" ref="formInline" v-if="role.roleName === '进口预约换单' || role.roleName === '电子提箱'">
                        <h3>{{role.roleName}}</h3>
                        <FormItem class="formItem"></FormItem>
                        <FormItem class="formItem">
                            <Select v-model="truck" style="width:240px" placeholder="选择承运公司">
                                <Option v-for="item in truckList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>

                        <FormItem class="formItem"></FormItem>
                        <FormItem class="formItem"></FormItem>
                        <p class="clear" style="text-align: center">
                            <Button @click="login2(role.roleName)" type="primary" shape="circle"  style="width: 120px;margin-left: 60px">进入</Button>
                        </p>

                    </Form>
                    <Form :model="formInline" :rules="ruleInline" ref="formInline" v-else>
                        <h3>{{role.roleName}}</h3>
                        <FormItem class="formItem" prop="user">
                            <Input placeholder="用户名" v-model="formInline.user"  @on-keydown='enter' size="large" class="my"></Input>
                        </FormItem>
                        <FormItem class="formItem"  prop="password">
                            <Input placeholder="登录密码" size="large" type="password" @on-keydown='enter' v-model="formInline.password" class="my"></Input>
                        </FormItem>
                        <FormItem class="formItem code" prop="code">
                            <Input placeholder="验证码" size="large" class="my" @on-keydown='enter' v-model="formInline.code"></Input>
                             <img :src="codeImg" alt="" @click="getCode">
                        </FormItem>
                        <p class="clear">
                            <Button @click="login" type="primary" shape="circle" size='large'>登录</Button>
                            <a href="javascript:void(0)">忘记密码?</a>
                        </p>
                    </Form>
                    <ul class="role clear" >
                        <li class="right" style="">
                            <a href="javascript:void(0)" @click="chioceRole($event,'outCom')" >
                            进出口贸易企业<img src="../../assets/outCom.png" alt="">
                            </a>
                        </li>
                        <li class="right" style=""><a href="javascript:void(0)" @click="chioceRole($event,'shipCom')" >
                            航运企业<img src="../../assets/ship.png" alt="">
                            </a></li>
                        <li class="right" style=""><a href="javascript:void(0)" @click="chioceRole($event,'baoguan')" >报关行<img src="../../assets/baoguan.png" alt=""></a></li>
                        <li class="right" style=""><a href="javascript:void(0)" @click="chioceRole($event,'lihuo')"  >港口 | 理货<img src="../../assets/port.png" alt=""></a></li>

                        <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'daili')"  >货代<img src="../../assets/daili.png" alt=""></a></li>
                        <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'jinrong')"  >金融支付机构<img src="../../assets/jinrong.png" alt=""></a></li>
                        <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'huandan')"  >进口预约换单<img src="../../assets/baoguan.png" alt=""></a></li>
                        <li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'car')"  >电子提箱<img src="../../assets/car.png" alt=""></a></li>

                        <!--<li class="left" style=""><a href="javascript:void(0)" @click="chioceRole($event,'other')"  >其他<img src="../../assets/outCom.png" alt=""></a></li>-->
                    </ul>
                </div>

            </div>

        </div>
        <div class="footer">
            <div class="box clear">
                <span>沪ICP备 05012889 号</span>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31022102000177" style="color:#fff;margin-left:10px;">
                <img src="../../assets/icp.png" alt="" style="vertical-align:middle;margin-top:-3px;">
                沪公网安备 31022102000177号</a>
                <p class="code">
                    <span>关注我们的微信公众号</span>
                    <!-- <img src="http://placehold.it/80" alt=""> -->
                </p>
            </div>
        </div>
        <!-- <iframe id="showIframe" style="display:none"  frameborder=0 name="showHere" scrolling=auto
                src="http://www.singlewindow.sh.cn/winxportal/">

        </iframe> -->
    </div>
</template>
<script>
import MD5 from 'js-md5';
import axios from 'axios';
import {setCookie,getUserRole,removeCookie,getCookie,getRouterName} from '../../until/getToken';
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import interfaceUrl from '@/api/interfaceUrl'
import config from '@/until/config'
// import permission from '@/routes/permission'

export default {
    created(){ 
        removeCookie('ACCESS_TOKEN')
        removeCookie('user')
    },
    beforeRouteEnter(to,from,next){
        var str=window.location.href
        var token=str.split('=')[1]
        next(vm=>{
            if(token)
                vm.$router.push({name:'roleSelect',params: {singleToken:token} })           
            }
        )    
    },
    mounted(){
        // let reftk = this.$router.query
        // console.log(reftk)
        // if(reftk['refresh_token']){
        //     this.$router.push({
        //         name:'roleSelect',
        //         params: {singleToken:reftk['refresh_token']} 

        //     })
        // }
        this.height=((document.documentElement.clientHeight || document.body.clientHeight)-112)+'px'
        window.onresize= ()=> {
          this.height=((document.documentElement.clientHeight || document.body.clientHeight)-112)+'px'
        }
       
    },
    computed:{
        ...mapGetters(['textIntroduce','routerFlag'])
    },
    data(){
        return{
            codeImg:'',
            ellipsis:true,
            height:0,
            sign:'',
            toggle:false,
            showIntro:false,
            role:{
                roleName:'进出口贸易企业',
                roleType:''
            },
            formInline: {
                user: '',
                password: '',
                code:''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入账号!', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码!', trigger: 'blur' },
            // { type: 'string', min: 6, message: '密码至少六位！', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入验证码!', trigger: 'blur' }

                ]
            },
            truckList:[{
                value:"COSCO",
                label:"中远海运集装箱运输有限公司"
            }],
            truck:""
        }
    },
    methods:{
        ...mapMutations(['set_Text','setFlag','setMyMenu']),
        swicth(){
            this.getCode()
            this.toggle=!this.toggle
        },
        enter(e){
            if(e.key==='Enter'){
                this.login()
            }
        },
        chioceRole(e,type){
            // console.log(e,type)
            this.set_Text(type)
            this.role.roleName=e.target.innerText
        },
        login(){
             this.$refs['formInline'].validate((valid)=>{
                 if(valid){
                     var data=this.urlSearchParams({
                        username: this.formInline.user,
                        // password: MD5(this.formInline.password),
                        password: this.formInline.password,
                        client_id: 'm1',
                        client_secret: 's1',
                        grant_type: 'password',
                        scope: 'read',
                        f1:true, //  标记本次请求是否对密码进行MD5加密
                        sign: this.sign, // 验证码生成唯一标识
                        captcha: this.formInline.code // 验证码
                    })
                     axios({
                         method: 'post',
                        url: config.sso + interfaceUrl.login,

                        data: data,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' }
                     }).then(r=>{
                         console.log(r)
                        if(r['data']['token']){
                            setCookie('ACCESS_TOKEN','bearer '+r['data']['token'],0)
                            setCookie('user',this.formInline.user,0)
                            sessionStorage.setItem('menus',JSON.stringify(r.data.menus))
                            setCookie('roler',r.data.role)
                            this.setMyMenu(r.data.menus)
                            this.$router.push({name:getRouterName()[0]})
                        }else{
                            this.getCode()
                            this.$Message.error(r['data']['msg']);
                        }
                    })
                 }
             })

        },
        login2(roleName){
            if(!this.truck){
                this.$Message.warning("请选择承运公司");
                return;
            }
            if(roleName === "进口预约换单"){
                this.$router.push({
                    path:'/index2/exchange'
                })
            }
            else{
                this.$router.push({
                    path:'/index2/truck'
                })
            }

        },
        loaction(){
            window.location.href='/air/'
        },
        getCode(){
              axios({
                    type:'get',
                    url:`${config.sso}${interfaceUrl.imageCode}=${new Date()}`
                }).then(r=>{
                    var data=r.data;
                    this.codeImg=data.imageCode
                    this.sign=data.sign
                    
        })

        },
        urlSearchParams(dataObj) {
            let qs = '',
                split = '&',
                keys = Object.keys(dataObj);
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    split = '';
            }
            qs += keys[i] + '=' + dataObj[keys[i]] + split;
            }
            console.log(qs);
            return qs;
      },
    }

}
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
$color:#1b3787;
$redColor:#b71414;
*{
    box-sizing: border-box;
}

.layoutBox{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .header{
        padding:10px 40px;
        background: $color;
        height: 60px;
        .logo{
            float: right;
            img{
                width: 250px;
                height: 40px;
            }
        }
    }
    .footer{
        width: 100%;
        background: $color;
        height: 50px;
        color: #fff;
        font-size: 14px;
        line-height: 50px;
        .box{
            width: 90%;
            height: 100%;
            margin: 0 auto;
            position: relative;
            .code{
                float: right;
                &:hover{
                    img{
                        opacity: 1;
                        z-index: 10;
                    }
                }
                img{
                    vertical-align: middle;
                    margin-left: 8px;
                    position: absolute;
                    opacity: 0;
                    right: 0;
                    top: -70px;
                    transition: all 0.3s ease-in-out;
                }
            }


        }
    }
    .content{
        position: relative;
        overflow: hidden;
        >h1.text{
            font-weight: 500;
            position: absolute;
            right: 4.6%;
            top: 20px;
            width: 20%;
            line-height: 40px;
            padding: 0 1em !important;
            font-size: 2em!important;
            // border: 1px solid #000;
            text-align: left !important; 
            >hr{
                width: 50%;
                margin-top: 20px;
                background: #FFFFFF;
                border-color: #fff;
                height: 3px;
            }
        }
        >img{
            position: absolute;
            width: 100%;
            // height: calc(100% + 110px) ;
            right: 0;
            // bottom: 0;
            bottom:0;
        }
        .newsTab{
            &.closeTab{
                    transform: translate(0,120%)
            }
            position: absolute;
            width: 100%;
            list-style: none;
            padding: 18px 0;
            margin: 0;
            left: 0;
            bottom: 0px;
            border-bottom:6px solid $redColor; 
            transition: all 0.7s cubic-bezier(0.6,-0.3,0.74,0.05);
            >li{
                float: left;
                width: 33.33333%;
                text-align: center;
                &:last-child{
                    a{
                        border-right: 0;
                    }
                }

                a{
                    color: $color;
                    display: block;
                    width: 100%;
                    height: 30px;
                    font-weight: 600;
                    line-height: 30px;
                    font-size: 16px;
                    border-right:1.5px solid $color;
                }
            }
        }
        .bg1,.bg2{
            background-position:50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            width: 100%;
            height: 100%;

        }
        .bg1{
            &.change{
                animation: fade 1s ease-in-out forwards;
            }
            z-index: -1;
            background-image: url('../../assets/newBg.png');
        }
        .bg2{
            &.change{
                animation: fade 1s ease-in-out 0.5s forwards reverse;
            }
            z-index: -2;
            background-image: url('../../assets/company.jpg')
        }
        h1{
            color: #fff;
            text-align: center;
            font-size: 36px;
            padding: 30px 0 0 0;
        }
        .contanier{
            width: 90%;
            margin: 0 auto;
            background: transparent;
            >a{
                border-radius: 50%;
                position: absolute;
                width: 160px;
                height: 160px;
                line-height: 160px;
                text-align: center;
                left: 50%;
                color: #fff;
                font-size: 30px;
                overflow: hidden;
                top: 45%;
                transform-origin: 50% 0;
                // transition: all 0.4s ease-in-out;
                background: linear-gradient(-33deg, #3023AE 1%, #53A0FD 100%);
                margin-left: -100px;
                margin-top: -80px;
                box-shadow:0px 0px 12px #fff;
                animation: jump 3s ease infinite;

            }
            .login{
                width: 380px;
                height: 380px;
                position: relative;
                margin: 0 auto;
                margin-top: 40px;
                transform: scale(0);
                .introduce{
                    &.show{
                        opacity: 1;
                    }
                    position: absolute;
                    width: 200%;
                    opacity: 0;
                    cursor: pointer;

                    left: 50%;
                    &.ellipsis{
                      overflow: hidden;
                      white-space: nowrap;
                      height: 50px;
                      text-overflow: ellipsis;
                    }
                    height: auto;
                    transition: opacity 0.3s ease-in-out;
                    margin-left: -100%;
                    background: rgba(255,255,255,.6);
                    bottom: -100px;
                    border-radius: 20px;
                    font-size: 16px;
                    padding: 10px 20px;
                    line-height: 24px;
                    color: #22347F;
                    // text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1),0 1px 3px rgba(0,0,0,0.3),0 3px 5px rgba(0,0,0,0.2),0 5px 10px rgba(0,0,0,0.25);
                }
                form{
                    width: 380px;
                    height: 380px;
                    background:  linear-gradient(-180deg, #4764B6 0%, #22347F 100%);
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 10;
                    padding:50px 70px;
                    border-radius: 50%;
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);
                    h3{
                        color: #fff;
                        font-size: 24px;
                        text-align: center;
                        font-weight: normal;
                        padding-bottom: 20px;
                    }
                    .formItem{
                        margin-bottom: 24px;
                        position: relative;
                        &.code{
                            img{
                                position: absolute;
                                right: 8px;
                                top: 3px;
                                cursor: pointer;
                                width: 80px;
                                height: 30px;
                                border-radius: 20px;
                            }
                            .input{
                                border-radius: 20px !important;
                            }
                        }

                    }
                    p{
                        button{
                            float: left;
                            width: 120px;
                            background: #3dbec9;
                            cursor: pointer;
                            border-color: #3dbec9;
                        }
                        a{
                            float:right;
                            margin-top: 10px;
                            color: #ddd;
                        }

                    }

                }
                .role{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    transform: scale(0);
                    opacity: 0;
                    transition: all 1.5s ease-in-out .7s;
                    position: relative;
                    >li{
                        top:0;
                        &.right{
                            left: 0;
                            >a{
                                text-align: right;
                                background: url('../../assets/leftdefault.png') no-repeat 50% 50%;
                                background-size: cover;
                                img{
                                    left: 15px;

                                }
                                &:hover{
                                    background: url('../../assets/leftHover.png') no-repeat 50% 50%;

                                }
                            }
                        }

                        &.left{
                             right: 0;
                            >a{
                                text-align: left;
                                background: url('../../assets/rightdefault.png') no-repeat 50% 50%;
                                background-size: cover;
                                img{
                                    right: 15px;
                                }
                                &:hover{
                                    background: url('../../assets/rightHover.png') no-repeat 50% 50%;
                                }

                            }
                        }
                       

                        position: absolute;
                        >a{
                            display: block;
                            width: 220px;
                            text-align: center;
                            border-radius:30px;
                            height: 50px;
                            line-height: 50px;
                            position: relative;
                            padding: 0 20px;
                            font-size: 20px;
                            background: #fff;
                            color: #2B2E94;
                            transition: transform 0.3s ease-in-out;
                            >img{
                                position: absolute;
                                top: 12.5px;
                                width: 28px;
                                height: 25px;
                            }
                            &:hover{
                                transform: scale(1.2);
                                color: #fff;
                            }
                        }

                    }
                }

            }

            &.hideTab{
                >a{
                    animation: change 0.7s ease-in-out 0.2s forwards;
                }
               
                .login{
                    
                    animation: change 0.7s ease-in-out 0.5s reverse forwards;
                }
                .role{
                    opacity: 1;
                    transform: scale(1);
                    li{
                         &:first-child{
                            transform: translate(-200px,0)
                        }
                        &:nth-child(2){
                            transform: translate(-240px,110px)
                        }
                        &:nth-child(3){
                            transform: translate(-260px,220px)
                        }
                        &:nth-child(4){
                            transform: translate(-200px,330px)
                        }
                        &:nth-child(5){
                            transform: translate(200px,0)
                        }
                        &:nth-child(6){
                            transform: translate(240px,110px)
                        }
                        &:nth-child(7){
                            transform: translate(260px,220px)
                        }
                        &:nth-child(8){
                            transform: translate(200px,330px)
                        }
                    }
                }

            }
            .welcome{
                width: 70%;
                margin-left: 10%;
                padding-top: 30px;
                h1{
                    text-align: left;
                    font-size: 48px;
                    font-weight: 500;
                    margin-bottom: 100px;

                }
                >p{
                    span{
                        margin-right: 80px;
                        cursor: pointer;
                        
                    }
                    span,a{
                        font-size: 24px;
                        position: relative;
                        color: #fff;
                        display: inline-block;
                        width: 230px;
                        line-height: 60px;
                        height: 60px;
                        border-bottom-left-radius: 30px;
                        border-top-right-radius: 30px;
                        text-align: center;
                        background-image: linear-gradient(-179deg, #105ffe 2%, #1346ec 98%);
                    }
                }
                
            }
        }
        
    }

}
@keyframes jump{
    from{
        transform: translate(0,0)
    }
    50%{
        transform: translate(0,30px)
    }
    to{
        transform: translate(0,0)
    }
}
@keyframes Gotop {
    from{
        transform:translate(0,0)
    }
    to{
        transform:translate(150%,0)

    }
}
@keyframes Gobottom {
    from{
        transform:translate(0,0)
    }
    to{
        transform:translate(-150%,0)

    }
}
@keyframes change {
    from{
        transform: scale(1)
    }
    to{
        transform: scale(0)

    }

}
@keyframes change2 {
    from{
        opacity: 1;
        transform: rotateZ(0) scale(1)
    }
    to{
        opacity: 0;
        transform: rotateZ(360deg) scale(0)

    }

}
@keyframes fade {
    from{
        opacity:1;
        z-index: -1;
    }
    50%{
        opacity: 0.7;
        z-index: -1;
    }
    to{
        z-index: -3;
        opacity: 0.5;
    }

}



</style>
