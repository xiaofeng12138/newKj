<template>
    <div>
        <div class="vague" @click="stopEvent">
            <div class="vague-search">
                 <Input v-model="selectValue" size='large' :placeholder="placeHolder" style="width: 100%"   @on-change="remote"></Input>
            </div>
            <ul  tabindex='-1' class="vague-options ivu-select-large" v-show="isShow">
                <li class="ivu-select-item " v-for="option in options" :key="option.id" @click="checkValue(option)">{{option}}</li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:{
        url:{
            type:String
        },
        parmasKey:{
            default:'billno',
            type:String
        },
        placeHolder:{
            type:String,
            default:'请输入提单号'
        }
    },
    data(){
        return{
            options:[],
            selectValue:'',
            isShow:false
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
            this.selectValue=option
            this.isShow=false
            this.$emit('billNoVal',this.selectValue)
        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote() {
            this.$emit('billNoVal',this.selectValue)
            if (this.selectValue!== '') {
                var obj={}
                obj[this.parmasKey]=this.selectValue
                publicInter(this.url,obj).then(r=>{
                    if(r instanceof Array){
                        if(r.length>0){
                            if(typeof(r[0])==='object'){
                                r.forEach(item => {
                                    this.options.push(item.BILLNO)    
                                })
                            }else{
                                this.options=r
                            }
                        }else{
                            this.options=[]
                            this.isShow=false 
                        }
                    }else{
                        if(r.isok){
                            if(r.msg.length>0){
                                this.isShow=true
                                this.options=r.msg
                            }else{
                                this.options=[]
                                this.isShow=false 
                            }
                        }else{
                            this.options=[]
                            this.isShow=false   
                        }

                    }

                })
            }
        },
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
            width: 100%;
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
