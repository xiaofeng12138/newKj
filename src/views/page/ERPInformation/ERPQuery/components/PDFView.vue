<template>
      <div class="PDF" v-if="isShow"  @click="closePDF">
          <div class="pdfBox"  @click="stopProp">
              <pdf 
                :src="data"
                :page="page"
                style="display: inline-block; width: 100%"></pdf>
                <div>
                      <Button type="info" :disabled='page===1' @click="lastPage">上一页</Button>
                      {{page}}/{{numPages}}
                        <Button type="info" :disabled='page===numPages' @click="nextPage">下一页</Button>
                </div>
          </div>
          
    </div> 
</template>
<script>

import pdf from 'vue-pdf'
export default {
    components:{
         pdf: pdf
    },
    data(){
        return{
            data:'',
            page:1,
            numPages:'',
            isShow:false
        }
    },
    methods:{
        lastPage(){
            if(this.page>1){
                this.page--
            }
        },
        nextPage(){
            if(this.page<this.numPages){
                this.page++
            }
        },
        stopProp(e){
            e.stopPropagation()
        },
        closePDF(){
            this.isShow=false
            this.data=''
            this.page=1
        },
       showPDF(data){
           this.isShow=true
            this.data=pdf.createLoadingTask({data:data})
            this.data.then(pdf=>{
                this.numPages=pdf.numPages
            })
       }
    }
    
}
</script>
<style lang="scss" >
    .PDF{
        position: fixed;
        background: rgba(0,0,0,.55);
        left: 0;
        top: 0;
        z-index: 1100;
        width: 100%;
        height: 100%;
        text-align: center;
        overflow-y: scroll;
        .pdfBox{
            width: 70%;
    
            margin: 0 auto;
            margin-top: 20px;
            background: #fff;
            padding-bottom: 20px;
        }
    }
</style>



