<template>
    <div>
        <div class="vague" @click="stopEvent">
            <div class="vague-search">
                 <Input v-model="selectValue" style="width: 100%"  @on-change="remote" @on-blur="blurSelect"></Input>
            </div>
            <ul v-if="!param" tabindex='-1' class="vague-options ivu-select-large" v-show="isShow">
                <li class="ivu-select-item" v-for="value in options" :key="value.id" @click="checkValue(value)">{{ value}}</li>
            </ul>
            <ul v-if="param" tabindex='-1' class="vague-options ivu-select-large" v-show="isShow">
                <li class="ivu-select-item" v-for="value in options" :key="value.id" @click="checkValue(value.EXPOCOMPANY)">{{ value.EXPOCOMPANY }}</li>
            </ul>
            <ul  tabindex='-1' class="vague-options ivu-select-large" v-show="isShow2">
                <li class="ivu-select-item " v-for="option in options" :key="option.COUNTRYCODE" @click="checkValue(option)">{{option.CNNAME+" "+option.ENNAME}}</li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:["firstVal",'url','param'],
    data(){
        return{
            options:[],
            selectValue:'',
            isShow:false,
            isShow2:false,
            selectCode:''
        }
    },
    mounted(){
        var body=document.getElementsByTagName('body')[0],
            that=this
        body.addEventListener('click',function(e){
            if(e.target.className!='vague'){
                that.isShow=false
                that.isShow2=false
            }
        })
        this.selectValue = this.firstVal;
    },
    methods:{
        checkValue(option){
            if(typeof option === 'string'){
                this.selectValue = this.selectCode = option;
                this.isShow=false
                this.$emit('regionVal',this.selectCode)
            }
            else{
                this.selectValue=option.CNNAME+" "+option.ENNAME;
                this.selectCode = option.COUNTRYCODE;
                this.isShow2=false
                this.$emit('regionVal',this.selectCode)
            }

        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote() {
            // this.selectCode = "";
            this.$emit('regionVal',this.selectCode)
            if (this.selectValue!== '') {
                if(this.url){
                    publicInter(this.url,this.param?{expocompany:this.selectValue}:{param:this.selectValue}).then(r=>{
                        if(r&&!r.code){
                            this.options=r.msg;
                            this.isShow=true
                        }else if(r.code=='200'&&r.list.length>0){
                            this.isShow=true
                            this.options=r.list;
                        }
                        else{
                            this.options=[]
                            this.isShow=false
                        }
                    })
                }
                else{
                    let re = /[a-zA-z]/g;
                    let recn = /[\u4e00-\u9fa5]/g;
                    publicInter(interfaceUrl.queryCountryCode,{cnname:this.selectValue.replace(re,""),enname:this.selectValue.replace(recn,"")}).then(r=>{
                        if(r && r.list.length > 0){
                            this.options=r.list
                            this.isShow2=true
                        }else{
                            this.options=[]
                            this.isShow2=false
                        }
                    })
                }

            }
        },
        blurSelect(e){
            if(this.selectCode === ""){
                this.selectValue="";
                this.$emit('regionVal',this.selectCode)
            }else{

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
