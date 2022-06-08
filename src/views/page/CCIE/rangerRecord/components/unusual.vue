<template>
    <div class="imageExce">
        <div>
             <Input style="width:500px;margin:0 auto" @on-search='search' v-model="params.zwh" type="text" class="customInput" size="large"  placeholder="请输入展位号" search enter-button></Input>
        </div>
        <Table :columns="columns" :data="data" class="customTable" style="margin-top:20px;"></Table>  
        <Page :total="total" v-show="total" class="customPage"  :page-size=10 @on-change="changePage" show-total></Page>
        <div v-if="showImg" class="showImg">
            <img class="bigImg" :src="imgSrc" @click="rotate" id="bigImg" >
        </div>
        <Icon v-if="showImg"  type="md-close" @click="hideImg" class="icon-close"></Icon>
    </div>
</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
export default {
    data(){
        return{
            data:[{}],
            imgModal:false,
            imgSrc: '',
            showImg: false,
            angle: 0,
            scale: 1,
            columns:[
                {
                    title:'展位号',
                    key:'ZWH',
                    align:'center',
                    width:'160'
                },
                {
                    title:"巡馆人",
                    key:'RECODE_USER',
                    align:'center',
                    width:'200'
                },
                {
                    title:"巡馆时间",
                    key:'RECODE_TIME',
                    align:'center',
                    width:'240'
                },
                {
                    title:"核查项目",
                    key:'RECCN',
                    width:'500',
                    align:'center',
                },
                {
                    title:'异常描述',
                    key:'PROBLEM_RECODE',
                    align:'center',
                },
                {
                    title: "异常图片",
                    align:'center',
                    render: (h, params) => {
                        // console.log(params.row)
                        if(params.row.filelist){
                            let that = this
                            let img = new Image()
                            let aa = img.width/img.height
                            return h('img', {
                                domProps:{
                                    'src' : 'data:image/patrol;base64,'+ params.row.filelist[0].FILEBASE64
                                },
                                style: {
                                width: '30px * aa',
                                height: '30px',
                                cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                            that.showImg = true;
                                            that.$nextTick(() => {
                                            that.imgSrc = 'data:image/patrol;base64,'+ params.row.filelist[0].FILEBASE64;
                                            let i = document.getElementById('bigImg');
                                            that.angle = 0;
                                            i.style.height = '50vh';
                                            i.style.width = '75vh * aa';
                                        })
                                    }
                                }
                            })
                             
                        }else{
                            console.log(4)
                        }
                            
                    }
                        
                },
            ],
            total:0,
            params:{
                pageNum:1,
                pageSize:10,
                zwh:''
            },
            imgList:[]
        }
    },
    beforeMount(){
        this.query()

    },
    methods:{
        query(){
            publicInter(interfaceUrl.queryErrorPatrolRecord,this.params).then(r=>{
                console.log(r) 
                if(r.totalRow >0){
                    this.data = r.list;
                    this.total=r.totalRow
                }else{
                    this.data = [];
                    this.total = 0
                }
            })

        },
        search(){
            this.params.pageNum=1
            this.query()

        },
        changePage(page){
            this.params.pageNum = page
            this.query()
        },
        hideImg(){
         this.showImg = false
        },
         rotate() {
            let img = document.getElementById('bigImg');
            this.angle += 90;
            img.style.transform = `rotate(${this.angle}deg)`
            }
    }
}
</script>

<style lang="scss" scoped>
.imageExce {
  height: 100%;
  position: relative;
  .showImg {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999
  }
  .icon-close {
    position: absolute;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    top: -8%;
    right: 0%;
  }
}
</style>