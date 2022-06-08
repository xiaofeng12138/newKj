<template>
     <div class="newtable02">
          <router-link to="America" >
             美国
          </router-link>
          <router-link to="Africa">
              非美
          </router-link>
           <div>
                <router-view></router-view>
            </div>
    </div>   
</template>
<script>
    export default{

    }
</script>
<style scoped>
   .newtable02{
        width: 90%;
        margin: 0 auto;
        margin-top: 20px
   }
   .newtable02>a{
       width: 50px;
       height: 20px;
       display: inline-block;
       border: 1px solid black;
       text-align: center
   }
   .router-link-active{
       color:red
   }
</style>
