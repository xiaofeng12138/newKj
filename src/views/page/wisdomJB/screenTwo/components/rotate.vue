<template>
    <div id="rotate">
        <span v-for="(title,index) in titles.GOODs" :key="index" :title="title.value"
            :style="{color:(title.color || '#ffffff')}"  @click="showEdit(title)">
            {{ title.value }}
        </span>
    </div>
</template>

<script>
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter } from '@/api/http'
export default {
    name: "rotate",
    props:[ 'intellNum' ],
    data(){
        return{
            radius : 90,
            dtr: Math.PI/180,
            d: 220,
            tspeed:0.4,
            mouseX:0,
            mouseY:0,
            lasta:1,
            lastb:1,
            mcList:[],
            aSpan:[],
            oDiv:null,
            timer:null,
            titles:{GOODs:[],key:""}
        }
    },
    mounted(){
        this.radius = document.getElementById('rotate').offsetWidth/3;
        clearInterval(this.timer)
        this.init();
    },
    watch:{
        'titles.key':function (val) {
            clearInterval(this.timer)
            setTimeout(()=>{this.init()},30);
        }
    },
    methods:{
        showEdit(params){
            if(params.color == "#FFE91A"){
                this.$emit('showEdit',params);
            }
        },
        tabIntell(value,index){
            this.title = {key:value,value:this.titles[value]}
            let params = {
                exhType:value,
                // highNum:10,
                highNum:6,
                lowNum:10,
            }
            publicInter(interfaceUrl.queryGoodsByExhType,params).then(r=>{
                if(r){
                    if(r.isOk || r.isOk == 'true'){
                        // "#FFE91A"黄色
                        var colors = ["#43C5FF","#8FA1FF","#FFFFFF","#FF9A55","#FF7676","#FF9A55","#FFFFFF","#5FB3FF","#8493EC"];
                        this.titles.GOODs = [];
                        for(let i = 0; i < r.highGoods.length;i++){
                            let unit = {};
                            unit.color = colors[i%9];
                            // unit.value = r.highGoods[i].GOODSDESCRIPTIONCN+' '+parseInt(r.highGoods[i].TOTALPRICE/10000)+"万美元";
                            unit.value = r.highGoods[i].GOODSDESCRIPTIONCN;
                            unit.EXHTYPE = r.highGoods[i].EXHTYPE;
                            unit.UUID = r.highGoods[i].UUID;
                            this.titles.GOODs.push(unit);
                        }
                        for(let i = 0; i < r.lowGoods.length;i++){
                            let unit = {};
                            if(r.lowGoods[i].TOTALPRICE == -1){
                                unit.color = "#FFE91A";
                                unit.value = r.lowGoods[i].GOODSDESCRIPTIONCN;
                                unit.EXHTYPE = r.lowGoods[i].EXHTYPE;
                                unit.UUID = r.lowGoods[i].UUID;
                                this.titles.GOODs.push(unit);
                            }
                            
                        }
                        this.titles.key = value;
                    }
                    else{
                        this.$Message.error(r.msg);
                    }
                }
            })
        },
        init(){
            this.oDiv = document.getElementById('rotate');
            this.aSpan = this.oDiv.getElementsByTagName('span');
            this.mcList = [];
            for (let i = 0; i < this.aSpan.length;i++){
                let oTag = {};
                oTag.offsetWidth = this.aSpan[i].offsetWidth;
                oTag.offsetHeight = this.aSpan[i].offsetHeight;
                this.mcList.push(oTag);
            }
            this.positionAll();
            this.timer = setInterval(()=>{this.update()},41);
        },
        update(){
            let a,b;
            a = -this.lasta * 1.2 * this.tspeed;
            b = -this.lastb * 1.2 * this.tspeed;

            // this.lasta = a;
            // this.lastb = b;


            if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
            {
                return;
            }

            let sa = Math.sin(a * this.dtr),
                ca = Math.cos(a * this.dtr),
                sb = Math.sin(b * this.dtr),
                cb = Math.cos(b * this.dtr),
                sc = Math.sin(0 * this.dtr),
                cc = Math.cos(0 * this.dtr);

            for (let j = 0; j < this.mcList.length; j++){
                let rx1 = this.mcList[j].cx;
                let ry1 = this.mcList[j].cy * ca + this.mcList[j].cz*(-sa);
                let rz1 = this.mcList[j].cy*sa + this.mcList[j].cz*ca;

                let rx2=rx1*cb+rz1*sb;
                let ry2=ry1;
                let rz2=rx1*(-sb)+rz1*cb;

                let rx3=rx2*cc+ry2*(-sc);
                let ry3=rx2*sc+ry2*cc;
                let rz3=rz2;

                this.mcList[j].cx=rx3;
                this.mcList[j].cy=ry3;
                this.mcList[j].cz=rz3;

                let per=this.d/(this.d+rz3);

                this.mcList[j].x=(this.howElliptical*rx3*per)-(this.howElliptical*2);
                this.mcList[j].y=ry3*per;
                this.mcList[j].scale=per/1.5;
                this.mcList[j].alpha=per;

                this.mcList[j].alpha=(this.mcList[j].alpha-0.6)*(10/6);
            }

            this.doPosition();
            this.depthSort();
        },
        depthSort(){
            let aTmp=[];

            for(let i=0;i<this.aSpan.length;i++)
            {
                aTmp.push(this.aSpan[i]);
            }

            aTmp.sort
            (
                function (vItem1, vItem2)
                {
                    if(vItem1.cz>vItem2.cz)
                    {
                        return -1;
                    }
                    else if(vItem1.cz<vItem2.cz)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            );

            for(let i=0;i<aTmp.length;i++)
            {
                aTmp[i].style.zIndex=i;
            }
        },
        doPosition()
        {
            let l=this.oDiv.offsetWidth/2;
            let t=this.oDiv.offsetHeight/2;
            for(var i=0;i<this.mcList.length;i++)
            {
                this.aSpan[i].style.left=this.mcList[i].cx+l-this.mcList[i].offsetWidth/2+'px';
                this.aSpan[i].style.top=this.mcList[i].cy+t-this.mcList[i].offsetHeight/2+'px';

                // this.aSpan[i].style.fontSize=Math.ceil(12*this.mcList[i].scale/2)+8+'px';

                this.aSpan[i].style.filter="alpha(opacity="+100*this.mcList[i].alpha+")";
                this.aSpan[i].style.opacity=this.mcList[i].alpha;
            }
        },
        positionAll(){
            let phi = 0,
                theta = 0,
                max = this.mcList.length,
                i = 0,
                aTmp = [],
                oFragment=document.createDocumentFragment();

            for (let i = 0; i < this.aSpan.length;i++){
                aTmp.push(this.aSpan[i]);
            }

            aTmp.sort(function () {
                return Math.random() < 0.5? 1: -1;
            })

            for (let i = 0; i < aTmp.length;i++){
                oFragment.appendChild(aTmp[i]);
            }

            this.oDiv.appendChild(oFragment);
            
            for (let i = 1; i < max+1; i++){
                phi = Math.acos(-1+(2*i-1)/max);
                theta = Math.sqrt(max*Math.PI)*phi;

                this.mcList[i - 1].cx = this.radius *Math.cos(theta)*Math.sin(phi);
                this.mcList[i-1].cy = this.radius * Math.sin(theta)*Math.sin(phi);
                this.mcList[i-1].cz = this.radius * Math.cos(phi);
                    this.aSpan[i-1].style.left=this.mcList[i-1].cx+this.oDiv.offsetWidth/2-this.mcList[i-1].offsetWidth/2+'px';
                    this.aSpan[i-1].style.top=this.mcList[i-1].cy+this.oDiv.offsetHeight/2-this.mcList[i-1].offsetHeight/2+'px';
            } 
        },
        // mouseoverFun(){
        //     clearInterval(this.timer);
        //     this.timer = null;
        // },
        // mouseoutFun(){
        //     this.timer = setInterval(()=>{this.update()},30);
        // }
    },
    beforeDestroy: function () {
        clearInterval(this.timer);
        this.timer = null;
    },
}
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
#rotate{
    position: relative;
    margin: 0 auto;
    span{
        position: absolute;
        top: 0;
        left: 0;
        font-family: "Microsoft YaHei";
        padding: 3px 6px;
        max-width: 180px;
        white-space: nowrap;
        // white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        font-size: 1rem;
    }
}
</style>