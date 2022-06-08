<template>
     <div class="wrap" >
           <div class="box">
               <li>用户姓名：{{loginName}}</li>
               <li>工号：{{loginUser}}</li>
               <li>网络地址：{{logigIp}}</li>
               <li>当前设备MAC地址：{{loginMac}}</li>
               <li>办公点名称：{{loginAddr}}</li>
               <li>办公点地址：{{loginofficeName}}</li>
           </div>
    </div>
</template>

<script>
import {getCookie,} from "@/until/getToken";
export default {
    data() {
        return {
            loginUser:getCookie('user'),
            loginName:getCookie('newUserName'),
            logigIp:getCookie('newdeviceIp'),
            loginMac:getCookie('newdeviceMac'),
            loginAddr:getCookie('newofficeAddr'),
            loginofficeName:getCookie('newofficeName'),
        }
    },
}
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 500px;
        .box{
            width: 50%;
            margin: auto;
            li{
                list-style: none;
                height: 80px;
                line-height: 80px;
                width: 60%;
                color: #fff;
                font-size: 18px;
                text-align: left;
            }
        }
    }
</style>