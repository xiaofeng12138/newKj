<template>
    <div >
        <div class="vague1" @click="stopEvent">
            <div class="vague1-search" id="top1">
                 <Input v-model="firstVal.countryoforigin" style="width: 100%;vertical-align:middle" :placeholder="vagplaceholder || ''"
                  @on-change="remote" @on-blur="blurSelect"></Input>
            </div>
            <ul  tabindex='-1' class="vague1-options ivu-select-large" v-show="isShow" :style="optionstyle">
                <li class="ivu-select-item " v-for="option in options" :key="option.COUNTRYCODE" @click="checkValue(option)">{{option.CNNAME+" "+option.ENNAME}}</li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
    import {mapState,mapActions} from 'vuex'

export default {
    props:["firstVal",'vagplaceholder', 'index'],
    
    data(){
        return{
            options:[],
            isShow:false,
            selectCode:"",
            optionstyle:''
        }
    },
    mounted(){
        var body=document.getElementsByTagName('body')[0],
            that=this
        body.addEventListener('click',function(e){
            if(e.target.className!='vague1'){
                that.isShow=false
            }
        })
    },
    methods:{
        ...mapActions('exhibition',[
                'changeBodyUnit'
            ]),
        checkValue(option){
            this.firstVal.countryoforigin=option.COUNTRYCODE;//option.CNNAME+" "+option.ENNAME;
            this.selectCode = this.firstVal.countryoforigin;
            let key = 'countryoforigin'
            this.changeBodyUnit({key, value: this.selectCode, index: this.index})
            this.isShow=false;

        },
        close(){
            this.isShow=false
        },
        stopEvent(e){
            e.stopPropagation()
        },
        remote() {
            let box = document.getElementById('top1')
            let left = 0
            while (box) {
                left += box.offsetLeft
                box = box.offsetParent
            }
            let boxscroll = document.getElementsByClassName('ivu-table-overflowX')[0].scrollLeft
            let boxWrap = document.getElementsByClassName('ivu-table-overflowX')[0]
            let boxleft = 0 
            while(boxWrap){
                boxleft += boxWrap.offsetLeft
                boxWrap = boxWrap.offsetParent
            }
            let optionleft = left-boxscroll-boxleft
            this.optionstyle = `left:${optionleft}px`
            this.selectCode = "";
            if (this.firstVal.countryoforigin!== '') {
                let re = /[a-zA-z]/g;
                let recn = /[\u4e00-\u9fa5]/g;
                publicInter(interfaceUrl.queryCountryCode,{cnname:this.firstVal.countryoforigin.replace(re,""),enname:this.firstVal.countryoforigin.replace(recn,"")}).then(r=>{
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
                this.firstVal.countryoforigin="";
            }
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .vague1{
        //position: relative;
        width: 100%;
        .vague1-search{
            width: 100%;
            i{
                position: absolute;
                font-size: 14px;
                top: 11px;
                right: 15px;
            }
           
        }
        .vague1-options{
            position: absolute;
            background: #fff;
            width: 200px;
            overflow-x: auto;
            border: 1px solid #eeccee;
            border-radius: 4px;
            z-index: 500;
            // left: 0;
            // top:40px;
            overflow-y: scroll;
            padding: 5px 0;
            max-height: 200px;
            will-change: top, left;
            transform-origin: center bottom 0px;
          
        }

    }
</style>
