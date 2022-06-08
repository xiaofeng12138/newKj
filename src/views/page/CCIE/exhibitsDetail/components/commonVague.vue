<template>
    <div>
        <div class="vague" @click="stopEvent">
            <div class="vague-search">
                 <Input v-model="firstVal[vkey]" style="width: 100%" @on-change="remote" @on-blur="blurSelect"/>
            </div>
            <ul  tabindex='-1' :class="{'vague-options':true,'ivu-select-large':true,'large-width':showMyUrlKey}" v-show="isShow">
                <li v-if="showMyUrlKey" class="ivu-select-item" style="cursor:default;">
                    <span class="billno1">展台号</span>
                    <span class="billno2">参展商</span>
                </li>
                <li class="ivu-select-item" v-for="(option,index) in options" v-if="showMyUrlKey" :key="index" @click="checkValue(option)">
                    <span class="billno1">{{ option[urlkey.toLocaleUpperCase()] }}</span>
                    <span class="billno2">{{ option[rkey] }}</span>
                </li>
                <li class="ivu-select-item" v-for="(option,index) in options" v-else :key="index" @click="checkValue(option)">
                    {{  option[rkey] || option[vkey]  }}
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
export default {
    /**发送的key(vkey)和显示的key(rkey)！**/
    /** showMyUrlKey:多显示一个urlkey的值*/
    props:["firstVal",'vkey','url','urlkey','rkey','showMyUrlKey'],
    data(){
        return{
            options:[],
            isShow:false,
            value:'',
            selectCode:""
        }
    },
    mounted(){
        var body=document.getElementsByTagName('body')[0],
            that=this
        body.addEventListener('click',function(e){
            if(e.target.className!='vague'){
                that.isShow=false
            }
        })
    },
    methods:{
        checkValue(option){
            this.$emit('change'+this.vkey,option);
            this.isShow=false;

        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote(e) {
            this.selectCode = "";
            let params = {};
            params[this.urlkey] = this.firstVal[this.vkey];
            this.value=e.target.value
            publicInter(this.url,params).then(r=>{
                if(r){
                    this.options = r.list;
                    this.isShow = true;
                }else{
                    
                }
            })
        },
        blurSelect(){
            if(this.selectCode === ""){
                this.firstVal.countrycode="";
            }
        }
    },
    beforeDestroy(){
        this.value=null
    }
    
}
</script>
<style lang="scss" scoped>
    .vague{
        position: relative;
        width: 100%;
        .vague-search{
            width: 100%;
            i{
                position: absolute;
                font-size: 14px;
                top: 11px;
                right: 15px;
            }
           
        }
        .vague-options{
            position: absolute;
            background: #fff;
            width: 300px;
            overflow-x: auto;
            border: 1px solid #eeccee;
            border-radius: 4px;
            z-index: 500;
            left: 0;
            top:40px;
            overflow-y: scroll;
            padding: 5px 0;
            max-height: 200px;
            will-change: top, left;
            transform-origin: center bottom 0px;
           .ivu-select-item{
               text-align: left;
               span{
                   display: inline-block;
               }
               .billno1{
                   width: 110px;
               }
           }
        }
        .large-width{
            width:400px;
        }

    }
</style>
