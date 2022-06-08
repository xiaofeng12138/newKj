<template>
  <div class="clear" :style="{height:height,margin:'-48px'}" >
    <div class="a"></div>
  </div>
  
</template>
<script>
  export default{
    created(){
  
      this.height=((document.documentElement.clientHeight || document.body.clientHeight)-60)+'px'
        window.onresize= ()=> {
          this.height=((document.documentElement.clientHeight || document.body.clientHeight)-60)+'px'
        }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .a{
    background: url('../../../assets/backG.jpg') no-repeat 50% 50%;
    background-size: cover;
    height: 100%;
  }
 
</style>
