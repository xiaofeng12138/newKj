<template>
    <div class="filwarap">
        <div class="yq">
            <span class="title">通关保障</span>
            <div class="filelist" v-for="(item,index) in fileArr" :key="index">
                <span class="filetype">总署：</span>
                <li class="parentlist" @click="showPDF(item.mainFileName)" style="margin-bottom:20px">{{item.mainFilePath}}</li>
                 <span class="childrenlist" v-for="(tt,newindex) in  item.childrenFile" :key="newindex"  @click="showPDF(tt.childrenPath)"> {{tt.childrenName}}</span>
                
            </div>

             <div class="filelist">
                <span class="filetype">综合：</span>
                <li class="parentlist"  v-for="(item,index) in zongheArr" :key="index"  @click="showPDF(item.mainFileName)">{{item.mainFilePath}}</li>
            </div>
            <div class="filelist" >
                <span class="filetype">现场：</span>
                <li class="parentlist" v-for="(item,index) in xianchangArr" :key="index" @click="showPDF(item.mainFileName)">{{item.mainFilePath}}</li>
            </div>
            <div class="filelist" >
                <span class="filetype">其他：</span>
                <li class="parentlist" v-for="(item,index) in qitaArr" :key="index"  @click="showPDF(item.mainFileName)">{{item.mainFilePath}}</li>
            </div>
            
        </div>
        <div class="tg">
              <span class="title">疫情防控</span>
               <div class="filelist" v-for="(item,index) in yiqingArr" :key="index">
                <li class="parentlist" @click="showPDF(item.mainFileName)" style="margin-bottom:20px">{{item.mainFilePath}}</li>
                 <span class="childrenlist" v-for="(tt,newindex) in  item.childrenFile" :key="newindex"  @click="showPDF(tt.childrenPath)"> {{tt.childrenName}}</span>
                 <!-- <span class="childrenlistt"  @click="showPDF('19 个规范、预案清单.pdf')" >19 个规范、预案清单 </span> -->
            </div>
        </div>


         <div class="PDF" v-if="isShow"  @click="closePDF">
          <div class="pdfBox"  @click="stopProp">
              <pdf 
                :src="padUrl"
                 :page="page"
                style="display: inline-block; width: 100%"></pdf>
                <div>
                      <Button type="info" :disabled='page===1' @click="lastPage">上一页</Button>
                      {{page}}/{{numPages}}
                      <Button type="info" :disabled='page===numPages' @click="nextPage">下一页</Button>
                </div>
          </div>
          
    </div> 
    </div>
</template>

<script>
import pdf from 'vue-pdf'
import cfg from '@/until/config'
import {pdfLook,publicInter,fileUp} from '@/api/http'
export default {
      components:{
         pdf: pdf,
    },
    data() {
        return {
            yiqingArr:[
                {
                   mainFilePath:'上海海关关于印发第三届进博会口岸新冠肺炎疫情防控专项方案的通知',
                   mainFileName:'上海海关关于印发第三届进博会口岸新冠肺炎疫情防控专项方案的通知.pdf',
                   childrenFile:[
                      {
                          childrenName:'第三届中国国际进口博览会上海海关卫生检疫保障子方案',
                          childrenPath:'第三届中国国际进口博览会上海海关卫生检疫保障子方案.pdf',
                      },
                       {
                          childrenName:'第三届中国国际进口博览会上海海关进口冷链商品监管保障子方案',
                          childrenPath:'第三届中国国际进口博览会上海海关进口冷链商品监管保障子方案.pdf',
                      },
                      {
                          childrenName:'19 个规范、预案清单',
                          childrenPath:'19 个规范、预案清单.pdf',
                      },
                   ]
                   
                },
                
            ],
            fileArr:[
                {
                   mainFilePath:'关于发布《2020年第三届进口博览会海关通关须知》和《海关支持2020年第三届进口博览会便利措施》的公告',
                   mainFileName:'关于发布《2020年第三届中国国际进口博览会海关通关须知》和《海关支持2020年第三届中国国际进口博览会便利措施》的公告.pdf',
                   childrenFile:[
                      {
                          childrenName:'2020年第三届中国国际进口博览会海关通关须知',
                          childrenPath:'2020年第三届中国国际进口博览会海关通关须知.pdf',
                      },
                       {
                          childrenName:'海关支持2020年第三届中国国际进口博览会便利措施',
                          childrenPath:'海关支持2020年第三届中国国际进口博览会便利措施.pdf',
                      },
                   ]
                   
                },
                
            ],
            zongheArr:[
                {
                   mainFilePath:'口岸监管处关于印发《上海海关第三届中国国际进口博览会工作指引》及若干配套文件通知',
                   mainFileName:'口岸监管处关于印发《上海海关第三届中国国际进口博览会工作指引》及若干配套文件的通知.pdf',
                },
                 {
                   mainFilePath:'上海海关关于印发《第三届中国国际进口博览会上海海关工作方案》的通知',
                   mainFileName:'上海海关关于印发《第三届中国国际进口博览会上海海关工作方案》的通知.pdf',
                },
            ],
            xianchangArr:[
                {
                   mainFilePath:'第三届中国国际进口博览会海关驻场监管工作方案',
                   mainFileName:'第三届中国国际进口博览会海关驻场监管工作方案.pdf',
                }
            ],
            qitaArr:[
                 {
                   mainFilePath:'关税处关于明确第三届中国国际进口博览会税款总担保办理事宜的通知',
                   mainFileName:'关税处关于明确第三届中国国际进口博览会税款总担保办理事宜的通知.pdf',
                },
                
                {
                   mainFilePath:'商检处关于明确第三届进博会进口危险化学品现场巡馆工作要求的通知',
                   mainFileName:'商检处关于明确第三届进博会进口危险化学品现场巡馆工作要求的通知.pdf',
                },
                
                {
                   mainFilePath:'上海海关第三届进博会强制性认证产品入境验证实施细则',
                   mainFileName:'上海海关第三届进博会强制性认证产品入境验证实施细则.pdf',
                },
               
                {
                   mainFilePath:'卫生检疫保障方案',
                   mainFileName:'卫生检疫保障方案.pdf',
                },
            ],
             isShow:false,
             padUrl:'',
             page:1,
             numPages:'',
        }
    },
    methods:{
        closePDF(){
            this.isShow=false
        },
       showPDF(params){
            this.isShow=true
            this.page = 1 
             this.padUrl = pdf.createLoadingTask('/jbhExcel/'+ params)
            
           this.padUrl.then(pdf=>{
                this.numPages=pdf.numPages
            })
       },
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
    }
}
</script>
<style lang="scss">
    .filwarap{
        display: flex;
        width: 100%;
        // height: 600px;
        .yq{
            flex: 1;
            text-align: left;
            border-right: 1px solid #fff;
            .title{
                display: inline-block;
                width: 100%;
                font-size: 20px;
                color: #fff;
                text-align: center;
            }
            .filelist{
                margin-bottom: 20px;
                .filetype{
                    font-size: 20px;
                    color:#fff;
                }
                li{
                    list-style: none;
                    margin-left: 20px;
                    height: 40px;
                    // line-height: 60px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 20px;
                }
                li:hover{
                    color: #185DF7;
                }
                .fjlist{
                    margin-left: 50px; 
                    color: #fff;
                }
                .childrenlist{
                    display: inline-block;
                    height: 25px;
                    font-size: 16px;
                    margin-left: 20px;
                    color: #fff;
                    cursor: pointer;
                }
                .childrenlist:hover{
                    color: #185DF7;
                }
                
            }
        }
        .tg{
            flex: 1;
            text-align: left;
            border-right: 1px solid #fff;
            .title{
                display: inline-block;
                width: 100%;
                font-size: 20px;
                color: #fff;
                text-align: center;
            }
            .filelist{
                margin-bottom: 20px;
                margin-top: 25px;
                li{
                    list-style: none;
                    margin-left: 20px;
                    height: 30px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 20px;
                }
                li:hover{
                    color: #185DF7;
                }
                .fjlist{
                    margin-left: 50px; 
                    color: #fff;
                }
                .childrenlist{
                    display: block;
                    height: 30px;
                    font-size: 16px;
                    margin-left: 40px;
                    color: #fff;
                    cursor: pointer;
                }
                .childrenlist:hover{
                    color: #185DF7;
                }
                .childrenlistt{
                    display: block;
                    height: 25px;
                    font-size: 16px;
                    margin-left: 70px;
                    color: #fff;
                    cursor: pointer;
                    margin-top: 20px;
                }
                .childrenlistt:hover{
                    color: #185DF7;
                }
            }
        }
        .PDF{
            position: fixed;
            background: rgba(0,0,0,.55);
            left: 0;
            top:0;
            z-index: 1100;
            width: 100%;
            height: 100%;
            text-align: center;
             overflow-y: scroll;
            .pdfBox{
                width: 50%;
                margin: 0 auto;
                margin-top: 20px;
                background: #fff;
                padding-bottom: 20px;
            }
        }
    }
</style>