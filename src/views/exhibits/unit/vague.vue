<template>
    <div>
        <div class="vague" @click="stopEvent">
            <div class="vague-search">
                 <Input v-model="firstVal.countrycode" style="width: 100%;vertical-align:middle" :placeholder="vagplaceholder || ''"
                  @on-change="remote" @on-blur="blurSelect"></Input>
            </div>
            <ul  tabindex='-1' class="vague-options ivu-select-large" v-show="isShow">
                <li class="ivu-select-item " v-for="option in options" :key="option.COUNTRYCODE" @click="checkValue(option)">{{option.CNNAME+" "+option.ENNAME}}</li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:["firstVal",'vagplaceholder'],
    data(){
        return{
            options:[],
            isShow:false,
            selectCode:"",
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
            this.firstVal.countrycode=option.COUNTRYCODE;//option.CNNAME+" "+option.ENNAME;
            this.selectCode = this.firstVal.countrycode;
            this.isShow=false;

        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote() {
            this.selectCode = "";
            if (this.firstVal.countrycode!== '') {
                let re = /[a-zA-z]/g;
                let recn = /[\u4e00-\u9fa5]/g;
                publicInter(interfaceUrl.queryCountryCode,{cnname:this.firstVal.countrycode.replace(re,""),enname:this.firstVal.countrycode.replace(recn,"")}).then(r=>{
                    if(r && r.list.length > 0){
                        this.options=r.list
                        this.isShow=true
                    }else{
                        this.options=[]
                        this.isShow=false
                    }
                })
            }
        },
        blurSelect(){
            if(this.selectCode === ""){
                this.firstVal.countrycode="";
            }
        }
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
            width: 200px;
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
          
        }

    }
</style>
