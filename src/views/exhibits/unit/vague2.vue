<template>
    <div>
        <div class="vague" @click="stopEvent">
            <div class="vague-search">
                 <Input v-model="selectValue" style="width: 100%;vertical-align:middle" @on-change="remote" @on-blur="blurSelect" placeholder="请输入您想要搜索的国家"></Input>
            </div>
            <ul  tabindex='-1' class="vague-options ivu-select-large" v-show="isShow">
                <li class="ivu-select-item " v-for="(option,index) in options" :key="index" @click="checkValue(option)">{{option.CNNAME+" "+option.ENNAME}}</li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:["firstVal"],
    data(){
        return{
            options:[],
            selectValue:'',
            isShow:false,
            selectCode:''
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
        this.selectValue = this.firstVal;
    },
    methods:{
        checkValue(option){
            this.selectValue=option.CNNAME;//+" "+option.ENNAME;
            this.selectCode = option.CNNAME;
            this.isShow=false
            this.$emit('regionVal',this.selectCode,option.COUNTRYCODE)
        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote() {
            this.selectCode = "";
            //this.$emit('regionVal',this.selectCode)
            if (this.selectValue!== '') {
                let re = /[a-zA-z]/g;
                let recn = /[\u4e00-\u9fa5]/g;
                publicInter(interfaceUrl.queryCountryCode,{cnname:this.selectValue.replace(re,""),enname:this.selectValue.replace(recn,"")}).then(r=>{
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
                this.selectValue="";
                this.$emit('regionVal',this.selectCode)
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
            background: #2760C2;
            width: 300px;
            overflow-x: auto;
            border: none;
            border-radius: 0;
            z-index: 500;
            left: 0;
            top:40px;
            overflow-y: scroll;
            padding: 5px 0;
            max-height: 200px;
            will-change: top, left;
            transform-origin: center bottom 0px;
          
        }
        .ivu-select-item{
            color: #fff;
        }
        .ivu-select-item:hover{
            background-color: #1C4691;
        }

    }
</style>
