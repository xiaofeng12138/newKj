<template>
    <div class="a">
         <Poptip placement="bottom-end" width="600">
         <Button  type="info" size='large' @click="queryInfo"> 查看</Button>
        <div class="api" slot="content" style="width:100%">
            <ul class="title clear">
                <li>文件名</li>
                <li>操作</li>
                </ul>
                <p style="text-align:center;padding:8px;border:1px solid #ececec;border-top:none" v-if='!data[0].filename'>暂无数据</p>
               <template v-else>
                  <ul  class="body clear">
                    <li>{{data[0].filename}}</li>
                    <li>
                       
                             <Poptip
                                confirm
                                placement='left'
                                title="确定删除当前文件"
                                @on-ok="ok(data[0].fileid)"
                                style="text-align:left"
                               >
                                <Button type="error" size='small' v-if="data[0].status == 1" disabled>删除</Button>
                                <Button type="error" size='small' v-else>删除</Button>
                            </Poptip>
                            <!-- <Button type="primary" size='small' @click="downloadFile">下载</Button> -->
                    </li>
                </ul>
               </template>
        </div>
    </Poptip>
    

    </div>
    
    
</template>
<script>
import {pdfLook,publicInter,fileUp} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    name:'Tablepdf', 
    props:{
        paramsInfo:{
            type: Object,
            default:{}
        }
    },
    
    data(){
        return{
            data:[],
            file:''
        }
    },
    methods:{
        downloadFile(){
                let a = document.createElement('a')
                let url = this.data[0].filepath
                let fileName = url.lastIndexOf('.')
                let fileLength = url.length;
                let fileType = url.substring(fileName + 1 , fileLength )
                let tp =['zip','ZIP'];
                let rs = tp.indexOf(fileType);
                if(rs >= 0){
                   a.href =this.data[0].filepath.replace('/data/file/','').trim()
                   a.click()
                }else{
                   a.href =this.data[0].filepath.replace('/data/file/','').trim()
                   a.download = this.data[0].filename
                   a.click()
                }
                
        },
        queryInfo(){
            console.log(this.data)
            let data ={
                key:this.data[0].fileid,
            }
            publicInter(interfaceUrl.queryFilesByKey,data).then(r=>{
                console.log(r)
            })
        },
        ok(key){
             let data ={
                 lableid:this.data[0].lableid
             }
            publicInter(interfaceUrl.delLableFile,data).then(r=>{
                console.log(r)
                if(r.code=='200'){
                    this.$Message.success('删除成功！')
                    this.queryInfo()
                }

            })
        },
        
    },
    watch:{
        paramsInfo:{
            handler(newValue,oldValue){
                console.log(newValue)
                let newArray =[]
                newArray.push(newValue)
                this.data = newArray
            },
            immediate:true
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .a{
        display: inline-block;
    }
    .title{
        li{
            font-weight: 500;
        }
    }
    .title,.body{
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        border-right: 1px solid #ececec;
        border-bottom: 1px solid #ececec;
        li{
            float: left;
            width: 50%;
            height: 36x;
            line-height: 36px;
            border-left: 1px solid #ececec;
            border-top: 1px solid #ececec;
        }



    }

</style>
