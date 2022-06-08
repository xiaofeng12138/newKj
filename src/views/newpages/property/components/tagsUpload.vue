<template>
    <div>
         <Modal
                v-model="uploadModal"
                width="900"
                :footer-hide = true
                :mask-closable = "false"
                >
                <p slot="close"></p>
                <p slot="footer"></p>
                <p style="float:right;cursor: pointer;">
                    <Icon type="md-close" @click="uploadModal=false" size='30'/>
                </p>
                <div class="upload">
                <h3>
                     提示:上传一个ZIP的压缩文件或者一个PDF文件
                    <!-- <Button type="primary" v-if="data1.length>0" @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button> -->
                        <Upload  action="a" v-if="data1.length>0"
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button icon="plus-round" size='large'>添加文件</Button>
                        </Upload>
                        <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
                    </h3>
                    <div class="selectWrapp" > 
                         <span>权利人名称</span><Input size="large" placeholder="请输入权利人名称" style="width:60%" v-model="lablename"/>
                     </div>
                    <div class="tableBox" v-if="data1.length>0">
                        <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
                    </div>
                    <div class="upfile" v-if="data1.length<=0">
                        <h3 style="margin-bottom:16px">暂未上传</h3>
                        <Upload
                            action='a'
                            multiple
                            :before-upload='beforeUpload'
                            :max-size='fileSize'
                            :on-exceeded-size='outSize'
                            >
                            <Button  icon="ios-cloud-upload-outline" size='large'>上传证明文件</Button>
                            <!-- <Button style="margin-left:16px" type="ghost" icon="ios-cloud-upload-outline" size='large'>上传原始文件(pdf)</Button> -->
                        </Upload>
                    </div>
                    <Modal
                        title="格式错误"
                        v-model="modal"
                        :closable="false"
                        :scrollable='true'
                        class="self"
                        :mask-closable="false">
                        <p ref='errorInfor'  class="modalcontent"></p>
                    </Modal>
                     <Row>
                       <Col span="24" style="margin:auto;text-align:center"><Button type="primary" style="width:100px;margin-top:30px;"  @click="upload">提 交</Button></Col>
                    </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";
import {fileUp} from '@/api/http'
let _this = this;
export default {
    data() {
        return {
            lablename:'',
            uploadModal:false,
            modal:false,
            filelist:[],
            uploadFile:{
                fileUrl:'',
                fileName:''
            },
            columns1:[
                        {
                            title: '文件名',
                            key: 'name'
                        },
                        {
                            title: '上传时间',
                            key: 'date'
                        },
                        {
                            title: '操作',
                            key: 'action',
                            width:100,
                            render:(h,params)=>{
                                const that=this
                                return  h('Poptip', {
                                        props: {
                                        confirm: '',
                                        placement:'top-end',
                                        title:"您确认删除这条内容吗？"
                                        },
                                        style:{
                                            textAlign:'left'
                                        },
                                        on:{
                                            'on-ok':()=>{
                                                this.data1.splice(params.index,1)
                                                this.filelist.splice(params.index,1)
                                                this.uploadFile.fileName ='';
                                            }
                                        }
                                    },[
                                    h('Button',{
                                        props:{
                                            type:'error',
                                            size:'large'
                                        }
                                    },'删除')])

                            }
                         },
                        ],
            data1: [],
            fileSize:1024,
            chooseLable:''
        }
    },
    methods:{
        

        //添加函数
        addTagsFn(){},
        queryTags(){
            publicInter(interfaceUrl.queryListForBus,{}).then(res=>{
                let arr = []
                if(res.list.length > 0){
                  arr = res.list.filter((item)=>{ return item.status  != '2'})
                  this.queryTagsList = arr
                }else{this.queryTagsList = []}
            })
        },
        openModal(){
            this.uploadModal = true
        },
         beforeUpload(file){
           let fileName = file.name.lastIndexOf('.')
           let fileLength = file.name.length;
           let fileType = file.name.substring(fileName + 1 , fileLength )
           let tp =['pdf','zip','PDF','ZIP'];  //限制压缩包类型
           let rs= tp.indexOf(fileType);
            if(rs < 0){
                      this.$Message.error({
                        content:"请上传后缀名为.zip或.pdf文件",
                        duration:3
                    })
            }else{
                if(this.fileSize<(file.size/1024)){
                    this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
                }else{
                    this.uploadFile.fileName = file.name
                    this.filelist.push(file)
                    this.data1.push({
                        name: file.name,
                        date: (new Date).toLocaleDateString()
                    })
                }
            }
            return false
        },
        reChocie(){
            this.data1=[];
            this.filelist=[];
            this.uploadFile.fileName ='';
        },
        outSize(){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
            this.data1.pop()
        },
        remove (index) {
            this.data1.splice(index, 1);
            this.uploadFile.fileName ='';
        },
        upload(){
            let lablename = this.lablename
            if(this.filelist.length > 1){
                 this.$Message.error({
                        content:"最多只能上传一个文件！！",
                        duration:3
                    })
            }else{
            var formdata= new FormData()
            var url = interfaceUrl.addLable //文件上传地址
            console.log(lablename)
            if(this.filelist.length > 0){
               this.filelist.forEach(item=>{
                formdata.append('file',item)
                formdata.append('lablename',lablename)
             })
            }else{
                formdata.append('file','')
                formdata.append('lablename',lablename)
            }

            fileUp(url,formdata).then(r=>{
                if(r.code == 200){
                    this.$Message.success('添加成功')
                    this.uploadModal = false
                    this.filelist=[];
                    this.data1 = [];
                    this.lablename = ''
                    this.$emit('fatherMethod')
                }
                else{
                    this.modal=true
                    this.$Message.error('上传出错')
                    this.$refs.errorInfor.innerHTML=r.error
                }
                if(r.indexArray && r.indexArray.length>0){
                        r.indexArray.forEach((value,index)=>{
                        this.data1.splice(value-index,1)
                        this.filelist.splice(value-index,1)
                    })
                }
            })
            }
        },
    },
}
</script>

<style lang="scss">
    .selectWrapp{
        font-size: 14px;
        display: flex;
        width: 40%;
        margin: 20px 0;
        span{
            display: inline-block;
            width: 80px;
            line-height: 30px;
        }
    }
    .upload{
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
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }
</style>