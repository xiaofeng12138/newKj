<template>
    <div>
        
        <div v-if="desc" class="templateItem">
            <h3>{{desc}}</h3>
        </div>
        <div class="templateItem">
            <h3>{{title}}模板</h3>
            <!-- <p v-if="desc">{{desc}}</p> -->
            <div class="clear">
                <p>为了帮助您加快文件录入效率，我们提供已经编写好的表格模板，供您在电脑上进行快速编辑，编辑完成之后直接根据下方提示上传文件即可(红色为必填项)
                
                </p>
                <!-- <div>
                    <a :href="downxlsx">
                     <Button type="primary" size='large' long>点击下载</Button>
                    </a>
                </div> -->
            </div>
        </div>
         <div class="templateItem">
            <upload :header="title+'Excel'" :uploadUrl='loadUrl' :pdfEnter='routerLink' />
        </div>
        <!-- <div class="templateItem">
            <upload :header="title+'pdf'"  fileType="pdf" :interType='type'/>
        </div> -->
    </div>
</template>
<script>
import upload from './upload'
export default {
  name:'uploadTemplate',
  props:['title','loadUrl','isPDF','routerLink','downxlsx','desc','type'],
  components:{
      upload
  },
}
</script>
<style>
    .ivu-upload-list{
        display: none !important;
    }
</style>
<style rel="stylesheet/scss"  lang="scss" scoped>
    .modalcontent{
       line-height: 25px;
    }
    .templateItem{
        width: 99%;
        margin: 0 auto;
        &:first-child{
            margin-top: 0;
        }
        >P{
            margin:0 0 10px 0;
            font-size: 14px;
            color: chocolate;
        }
        >h3{
            padding: 10px 0;
            .ivu-upload,button{
                float: right;
                margin-left: 32px;

            }
        }
        &:last-child{
            margin-bottom: 10px;
        }
        h3{
          margin:0;
          font-size: 18px;
        }
       margin-top: 20px;
       .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
       .clear{
            box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
           p{
               float: left;
               padding: 30px 20px;
               font-size: 18px;
               width: 70%;
               line-height: 30px;
               border-right: 1px dashed #ececec;
           }
           >div{
               float: right;
               text-align: center;
               width: 30%;
               line-height: 118px;
               padding: 0 40px;
               button{
                   background: rgb(0,80,141)
               }
           }

       }
    }
    p.btnGroup{
        display: flex;
        width: 99%;
        margin: 0 auto;
        padding-top: 30px;
        justify-content: space-around;
        button:not(:last-child){
                   background: rgb(0,80,141);
                   color:#fff;
               }
    }
</style>
