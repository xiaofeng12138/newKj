<template>
    <div class="a">
        <Poptip placement="bottom-start" width="500" >
        <Button  type="primary" size='large'>附件上传</Button>
        <div class="api" slot="content" style="width:100%">
            <ul class="title clear">
                <li>文件名</li>
                <li>操作</li>
                </ul>
                <p style="text-align:center;padding:8px;border:1px solid #ececec;border-top:none" v-if='!data[0]'>暂无数据</p>
               <template v-else>
                        <ul class="body clear"  v-for ="(item,index) in data" :key='index'>
                            <li>{{item.filename}}</li>
                            <li style='width:20%'>
                            <Button type="primary" size='small' @click="downloadFile">下载</Button>
                            </li>
                        </ul>
                  <!-- <ul class="body clear">
                    <li>{{data[0].filename}}</li>
                    <li style='width:20%'>
                      <Button type="primary" size='small' @click="downloadFile">下载</Button>
                    </li>
                </ul> -->
               </template>
                <Upload action="aa"
                 :before-upload='beforeUpload'
                 style="margin-top:10px;width:100%;text-align:center">
                    <Button icon="plus-round" long >上传文件</Button>
                </Upload>
        </div>
    </Poptip>
    </div>
    
    
</template>
<script>
import {pdfLook,publicInter,fileUp} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:{
        paramsInfo:{
            type: Object,
            default:{}
        }
    },
    
    data(){
        return{
            data:[],
            file:'',
            paramsData:{}
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
        queryInfo(params){
            let data ={
                key:params,
            }
            publicInter(interfaceUrl.queryFiles,data).then(r=>{
                console.log(r)
                this.data = r
            })
        },
        
        beforeUpload(file){
            if((file.size/(1024*1024))>1){
                this.$Message.error(`文件大小超过1M`)
            } else{
                let fileName = file.name.lastIndexOf('.')
                let fileLength = file.name.length;
                let fileType = file.name.substring(fileName + 1 , fileLength )
                let tp =['zip','ZIP'];  //限制压缩包类型
                let rs= tp.indexOf(fileType);
                    if(rs < 0){
                            this.$Message.error({
                                content:"请上传后缀名为.zip的压缩包文件",
                                duration:3
                            })
                    }else{
                            var form = new FormData()
                            form.append('file',file)
                            form.append('guaranteeId',this.paramsData.guaranteeId)
                            form.append('guaranteeEpName',this.paramsData.guaranteeEpName)
                            form.append('guaranteeEpCustomsId',this.paramsData.guaranteeEpCustomsId)
                            form.append('customsAreaCode',this.paramsData.customsAreaCode)
                            form.append('guaranteeMode',this.paramsData.guaranteeMode)
                            form.append('guaranteeAmount',this.paramsData.guaranteeAmount)
                            form.append('guaranteeStartDate',this.paramsData.guaranteeStartDate)
                            form.append('guaranteeEndDate',this.paramsData.guaranteeEndDate)
                            form.append('fileid',this.paramsData.fileid)
                            form.append('status',this.paramsData.status)
                        fileUp(interfaceUrl.addGuarantee,form).then(r=>{
                            console.log(r)
                            if(r.code ==200){
                                this.$Message.success('上传成功！')
                                this.queryInfo(this.paramsData.fileid)
                            }else{
                                this.$Message.error('上传失败！请重新上传')
                            }
                        })
                    }
            }
            return false
        },
        
    },
    watch:{
        paramsInfo:{
            handler(newValue,oldValue){
               this.paramsData = newValue
               let StartDate = new Date(this.paramsData.guaranteeStartDate)
               let endDate = new Date(this.paramsData.guaranteeEndDate)
              
               let y = StartDate.getFullYear()
               let m = (StartDate.getMonth()+1)<10? '0'+ (StartDate.getMonth()+1):StartDate.getMonth()+1;
               let d = (StartDate.getDate())<10? '0'+ (StartDate.getDate()):StartDate.getDate();

               let y1 = endDate.getFullYear()
               let m1 = (endDate.getMonth()+1)<10? '0'+ (endDate.getMonth()+1):endDate.getMonth()+1;
               let d1 = (endDate.getDate())<10? '0'+ (endDate.getDate()):endDate.getDate();

               let newStartDate = y +'-' + m +'-'+ d
               let newEndDate =  y1 +'-' + m1 +'-'+ d1
               this.paramsData.guaranteeStartDate = newStartDate
               this.paramsData.guaranteeEndDate = newEndDate
               this.queryInfo(this.paramsData.fileid)
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
