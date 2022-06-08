<template>
  <div >
    <div class="search_box">
      <!-- <Select v-model="searck_keyword" placeholder="请选择展位号" filterable class="customSelect" size='large'  style="width:250px;" @on-query-change='queryZwh' @on-change='queryTT'>
             <Option v-for="item in zwList" :key="item.POSITION" :value="item.POSITION">{{item.POSITION}}</Option>
      </Select> -->
    </div>
      <div class="title">
        <span>巡馆记录图-{{numSite}}馆-{{numHallType}}</span>
      </div>
      <div class="cela">
        <img class="cela-img" src="@/assets/svg/cela.svg"  />
        <div class="pictrue">
           <exhibition @numSite="getNumSite" />
        </div>
      </div>
      
    <div class="rangerInfor">
        <div class="aaa" ref="box">
            <detailZW :numSite="numSite"></detailZW>
        </div>
    </div>
         <Modal
                v-model="ttt"
                width = "1200px"
                class-name='vertical-center-modal forbidBody'
                :footer-hide = true
                :mask-closable = "false"
                
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="ttt=false" size='30' />
            </p>
            <div class="modalBody">
                <h1>展位详情</h1>
                <newmodal  :showNumber="zwNumber" ref='vueChild'></newmodal>
            </div>
        </Modal>
  </div>
    
</template>
<script>
import exhibition from "./components/bigPictrue";
import detailZW from "./components/detailZW"
import { draw } from "./components/draw";
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter } from "@/api/http";
import newmodal from './components/newmodal.vue'
import { getCookie, removeCookie,setCookie } from "@/until/getToken";

export default {
  components: {
    exhibition,
    detailZW,
    newmodal
  },
  data(){
    return{
      searck_keyword:'',
      show:false,
      numSite: '',
      zwList:[],
      ttt:false,
      zwNumber:'',
      numHallType:''
    }
    

  },
  created() {
    this.numSite = this.$route.params.numSite?(this.$route.params.numSite)*1:getCookie('hallNo')*1;
    // this.numHallType = this.$route.params.hallType?this.$route.params.hallType:getCookie('hallType')
     
  },
  mounted() {
    this.queryZwh()
     this.numHallType = getCookie('hallType')
  
  },
  methods: {
    queryTT(value){
      if(value){
        this.zwNumber = value
        this.ttt = true
        this.$refs.vueChild.pisitionClick(value)
      }
    },
    queryZwh(value){
            let data ={
                hallno:this.numSite,
                boothno: value
            }
            publicInter(interfaceUrl.qryAllBoothno,data).then(res=>{
                   this.zwList = res.list
            })
        },
    back() {
      this.$router.back(-1);
    },
    clickCallBack(e){
      this.show=true

    },
    getNumSite(numSite) {
      this.numSite = numSite.num;
      setCookie('hallNo',numSite.num)
      setCookie('hallType',numSite.hallTypeName)
      this.numHallType = numSite.hallTypeName
      this.queryZwh()
    },
    remove() {
      var target = document.getElementsByClassName("toolTop")[0];
      var body = document.getElementsByTagName("body")[0];
      if (target) {
        body.removeChild(target);
      }
    }
  },
  beforeDestroy() {
    this.remove();
      
  }
};
</script>

<style lang="scss" scoped>
 .modalBody{
        width: 850px;
        height: 300px;
        margin: auto;
        h1{
            text-align: center;
            margin-top: 10px;
            font-size: 20px;
            color: #fff;
            margin-bottom:20px;
        }
     }
.rangerInfor {
  width: 100%;
  height: 100%;
}
.search_box{
  position: absolute;
  top: 30px;
  left: 4%;
}
.title {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
  span {
      height: 1.5rem;
      color: #fff;
      width: auto;
      left: -1.5rem;
      // margin: 0 auto;
      text-align: center;
      // display: block;
      position: relative;
      font-size: 1.5rem;
      
      &::before,&::after{
        content: '';
        position: absolute;
        width: 4rem;
        height: 100%;
        top: 0;
        background-size: contain;

      }
      &:after{
        right:-5rem ;
        background: url('../../../../assets/ccie-title-right.png') 50% 50% no-repeat;
      }
      &:before{
        left: -5rem;
        background: url('../../../../assets/ccie-title-right.png') 50% 50% no-repeat;
        transform: rotate(180deg)
      }
    
  }
}
.cela {
  position: absolute;
  width: 15rem;
  right: -15rem;
  top: 0.5rem;
  display: flex;
  transition: margin-right 2s;
  &:hover {
    margin-right: 15rem;
  }
  .pictrue {
    width: 15rem;
    border: 1px solid #1f5ff1;
    background: #0c1435;
    color: #fff;
  }
  .cela-img {
    
    margin-left: -4rem;
    width: 4rem;
    height: 2.25rem;
    
    
  }
}
.icon {
  font-size: 36px;
  background: #155ff1;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 40px;
  left: 1.5rem;
  top: 1.5rem;
}

.table{
  padding: 2rem 1rem 2rem 2rem;
  h2{
    text-align: center;
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .box{
    width: 100%;
    overflow: auto;
    max-height: 500px;
    padding-right: 1rem;
    &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #6e6e6e;
        outline: #333 solid 1px;
        border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    }
  }
  .probermList{
  width: 100%;
  border-collapse: collapse;
  // table-layout: fixed;
  background: #0C1435;
  border: 1px solid #1F5FF2;
  color: #fff;
  font-size: 1rem;
  thead.important{
    tr{
      background: rgba(245,66,79,.1);
      th{
      }
    }
  }
  td:first-child{
    width: 10%;
    text-align: center;
  }
  td:nth-child(2){
    width: 50%;
  }
  td:nth-child(3){
    width: 15%;
  }
  tr:last-child{
    td{
      border-bottom:0; 
      
    }
  }
  tbody{
    tr:nth-child(odd){
    background: rgb(24, 24, 34);;
  }

  }
  
  td,th{
    padding: 5px 10px;
    border-right:1px solid rgba(255, 255, 255,0.4);
    border-bottom: 1px solid rgba(255, 255, 255,0.4); 
    
    &:last-child{
      border-right:0;
      // border-bottom:0;

    }
  }
  thead{
    tr{
      padding: 10px 0;
      text-align: left;
      height: 40px;
      border-top: 1px solid rgba(255, 255, 255,0.2);
      
      span{
        padding:10px 0 10px 30px;

      } 
    }
  }
  thead.head{
    background: #1F5FF2;
    
    tr{
      border-top: 0;
      th{
         text-align: center;

      }
     
    }
  }
}
}

.aaa {
  width: calc(100% - 13rem);
  height: 99%;
  canvas {
    width: 100%;
    height: 100%;
  }
}
img {
  width: 100%;
  height: 72vh;
  margin-top: 1vh;
}
#img,#img1,#img2{
  display: none;
}
</style>

