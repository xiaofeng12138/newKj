<template>
  <div class="counter">
    <div class="increaseBox" ref='boxxxx' v-for="digit in initNum" :key="digit.id">
        <span v-if='digit===","' style="color:#fff;font-size:1.5rem">{{digit}}</span>
        <ul v-else class="increase" :style="'transform:translate(0,-'+digit*5+'%);height:'+numArr.length*100+'%'">
          <li v-for='num in numArr' :key="num.id" >{{num}}</li>
        </ul>
    </div>
  </div>  
</template>
<script>
  export default {
    props: {
      startValue:{
        default:0,
        type:Number,
        required: false,
      },
      endValue:{
        default:203,
        required:false,
        // type:Number
      }      
    },
    watch:{
      endValue:'a'
    },
    mounted(){
      this.a();  
    },
    data () {
      return {
        height:0,
        numArr:[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9],
        initNum:[],
      }
    },
    methods:{
      a(){
        this.init()
        setTimeout(()=>{
          this.startIncrease()
        },100)
      },
      init(){
        var string=this.endValue.toString(),
            len=string.length
        for(let i=0;i<len;i++){
          this.initNum.push(0)
        }
        if(len>3){
          var separatorNum=parseInt(len%3)===0?parseInt(len/3)-1:parseInt(len/3)
          for(let i=1;i<=separatorNum;i++){
            this.initNum.splice(len-3*i,0,',')
          }
        }
      },
      startIncrease(){
        var string=this.endValue.toString()
        this.initNum=string.split('')
        var len=this.initNum.length
        if(len>3){
          var separatorNum=parseInt(len%3)===0?parseInt(len/3)-1:parseInt(len/3)
          for(let i=1;i<=separatorNum;i++){
            this.initNum.splice(len-3*i,0,',')
          }
        }
        this.initNum.forEach((val,index)=>{
          if(!isNaN(val)&&index>1){
            this.initNum[index]=parseInt(val)+10
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.counter{
  height: 100%;
  // text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .increaseBox{
   
    height: 70%;
    max-height: 3rem;
    overflow: hidden;
    display: inline-block;
  }
  .increase{
    list-style: none;
    padding: 0;
    max-height: 60rem;
    margin:0 3px;
    width: 100%;
    background: #174CFF;
    width: 1.5rem;
    transform: translate(0,0);
    transition: all 3s cubic-bezier(0.08,0.82,0.17,1);
    li{
      font-size: 1.5rem;
      width: 1.5rem;
      display: flex;
      align-items: center;
      height: 5%;
      background: #174CFF;
      // line-height: 2rem;
      color: #fff;
      justify-content: center;
      font-family: DIN-Medium;
    }
  }
</style>

