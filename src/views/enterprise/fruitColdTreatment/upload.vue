<template>
    <div>
         <Spin fix v-if="showLoading" style="background-color:rgba(132,134,132,.5)">
            <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
            <div style="font-size:25px;color:#000;font-weight:300">数 据 上 传 中 ...</div>
        </Spin>
        <div class="upload">
            <h3 class="upload-header">
                {{header}}上传 <span v-if='pdfEnter'>(或者<router-link :to='pdfEnter'>去上传PDF</router-link>)</span>  

                <Button type="primary" v-if="data1.length>0"  @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button>
                    <Upload v-if="this.header == 'txt' && data1.length>0"  action="a"
                    multiple
                    :before-upload='beforeUpload'
                        :max-size='fileSize'
                        :on-exceeded-size='outSize'
                        accept="text/plain"
                        >
                        <Button icon="plus-round" size='large'>添加文件</Button>
                    </Upload>
                    <Upload v-if="this.header == 'Excel' && data1.length>0"  action="a"
                    multiple
                    :before-upload='beforeUpload'
                        :max-size='fileSize'
                        :on-exceeded-size='outSize'
                        accept="application/vnd.ms-excel"
                        >
                        <Button icon="plus-round" size='large'>添加文件</Button>
                    </Upload>
                    <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
                </h3>
                <div>
                    <Form ref='formValidate' :model="requestDate" :rules='rulesValidata' :label-width='150' inline>
                        <FormItem label='提单号' prop='billno'>
                            <Input v-model="requestDate.billno"  placeholder="请输入提单号" style="width:140%" />
                        </FormItem>
                    <FormItem label='箱号' prop='container'>
                            <Input v-model="requestDate.container"  placeholder="请输入箱号" style="width:140%" />
                        </FormItem>
                        <FormItem label='英文船名' prop='ship_name_en' style="margin-left:60px">
                            <Input v-model="requestDate.ship_name_en"  placeholder="请输入英文船名" style="width:140%" />
                        </FormItem>
                        <FormItem label='航次' prop='voyage_no'>
                            <Input v-model="requestDate.voyage_no"  placeholder="请输入航次" style="width:140%" />
                        </FormItem>
                            <FormItem label='水果英文名称' prop='g_name_en'>
                            <Input v-model="requestDate.g_name_en"  placeholder="请输入水果英文名称" style="width:140%" />
                        </FormItem>
                        <FormItem label='申报单位统一信用代码' prop='decunit_id' style="margin-left:60px">
                            <Input v-model="requestDate.decunit_id"  placeholder="请输入申报单位统一信用代码" style="width:140%" />
                        </FormItem>
                        <FormItem label='原产国别' prop='origin_country_name' style="margin-left:60px">
                            <Select v-model="requestDate.origin_country_name"  filterable  placeholder="请选择原产国别" style="width:120%" @on-change='queryFrultType(requestDate.origin_country_name)' >
                                <Option v-for="(item,index) in countryList" :value="item.CNNAME" :key="index">{{item.CNNAME}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label='水果类别' prop='frult_type' style="margin-left:60px">
                            <Select v-model="requestDate.frult_type"  filterable  placeholder="请选择水果类别" style="width:120%" v-if="frultTypeList.length == 0" disabled>
                                    <Option v-for="(item,index) in frultTypeList" :value="item.FRUIT_TYPE" :key="index" >{{item.FRUIT_TYPE}}</Option>
                            </Select>
                            <Select v-model="requestDate.frult_type"  filterable  placeholder="请选择水果类别" style="width:120%" v-else>
                                    <Option v-for="(item,index) in frultTypeList" :value="item.FRUIT_TYPE" :key="index" >{{item.FRUIT_TYPE}}</Option>
                            </Select>
                            
                        </FormItem>
                        <FormItem label='水果中文名称' prop='g_name_cn' style="margin-left:20px">
                            <Select v-model="requestDate.g_name_cn"  filterable placeholder="请选择水果中文名称"  style="width:125%" >
                                <Option v-for="(item,index) in frultList" :value="item.HSNAMECN" :key="index">{{item.HSNAMECN}}</Option>
                            </Select>
                        </FormItem>
                    </Form>
                
                </div>
                <div class="tableBox" v-if="data1.length>0">
                    <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
                </div>
                <div class="upfile" v-if="data1.length<=0">
                    <h3 style="margin-bottom:16px">暂未上传</h3>
                    <Upload
                        v-if="this.header =='txt'"
                  action='a'
                        multiple
                        :before-upload='beforeUpload'
                        :max-size='fileSize'
                        :on-exceeded-size='outSize'
                        accept="text/plain"
                        >
                        <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
                        <!-- <Button style="margin-left:16px" type="ghost" icon="ios-cloud-upload-outline" size='large'>上传原始文件(pdf)</Button> -->
                    </Upload>
                    <Upload
                        v-if="this.header =='Excel'"
                  action='a'
                        multiple
                        :before-upload='beforeUpload'
                        :max-size='fileSize'
                        :on-exceeded-size='outSize'
                        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12"
                        >
                        <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
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
            </div>
    </div>
</template>
<script>
import {fileUp,publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    props:{
        pdfEnter:{
            type:String
        },
        header:{
            type:String,
            required:true
        },
        uploadUrl:{
            type:String
        },
        interType:{
            type:String,
        },
        fileType:{
            type:String,
            default:'txt'
        },
        fileSize:{
            type:Number,
            default:1024
        }
    },
    data(){
      return{
          showLoading:false,
          
          //发送请求表单数据
          requestDate:{
              billno:'' ,  //提单号
              container:'', //箱号
              ship_name_en:'', //英文船名
              voyage_no:'', // 航次
              g_name_en:'', //水果英文名称
              decunit_id:'', //申报单位
              origin_country_name:'', //原产国名称
              origin_country_id:'', //原产国别代码
              g_name_cn:'', //水果中文名称
              code_ts:'' , //水果HScode编码
              frult_type:'',//水果类别
          },

          //国家列表
          countryList:[],
          frultList:[],
          frultTypeList:[],

          //表单校验规则
          rulesValidata:{
               billno:[{ required:true,message:'提单号不能为空',trigger:'blur'}],
               container:[{ required:true,message:'箱号不能为空',trigger:'blur'}],
               ship_name_en:[{ required:true,message:'英文船名不能为空',trigger:'blur'}],
               voyage_no:[{ required:true,message:'航次不能为空',trigger:'blur'}],
               g_name_en:[{ required:true,message:'水果英文名称不能为空',trigger:'blur'}],
               decunit_id:[{ required:true,message:'申报单位统一信用代码不能为空',trigger:'blur'}],
               origin_country_name:[{ required:true,message:'原产国名称不能为空',trigger:'blur'}],
               origin_country_id:[{ required:true,message:'原产国别代码不能为空',trigger:'blur'}],
               g_name_cn:[{ required:true,message:'水果中文名称不能为空',trigger:'blur'}],
               code_ts:[{ required:true,message:'水果HScode编码不能为空',trigger:'blur'}],
               frult_type:[{ required:true,message:'水果类别不能为空',trigger:'blur'}],
          },
          show:true,
          modal:false,
          filelist:[],
           columns1: [
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
            data1: []
      }
  },
    methods:{
        //查询水果分类
        queryFrultType(value){
            let coutryName = value;
            let codeId = this.countryList.filter((i)=>{ return i.CNNAME == coutryName })[0].OLDDECLARECODE
            let data = {
               origin_country_id:codeId
            }
            publicInter(interfaceUrl.queryFruitTypeList,data).then(res=>{
                let newArr = []
                let returnArr = res.list
                // this.frultTypeList = [...newArr,...returnArr]
                if(returnArr.length == 0){
                  this.frultTypeList = newArr
                }else{
                   this.frultTypeList = newArr.concat(returnArr) 
                }
                
                // console.log(returnArr)
            })
        },
        //查询水果名称
        queryFrult(){
           let data= {
                cnname:'',
            }
            publicInter(interfaceUrl.queryFruitHScodeList,data).then(r=>{
                this.frultList = r.list
            })
        },
        //查询国家代码
        queryCountry(){
            let data= {
                cnname:'',
                enname:''  
            }
            publicInter(interfaceUrl.queryCountryCode,data).then(r=>{
                this.countryList = r.list
            })
        },
      beforeUpload(file){
        if(this.fileSize<(file.size/1024)){
            this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
        }else{
            this.filelist.push(file)
            this.data1.push({
                name: file.name,
                date: (new Date).toLocaleDateString()
            })
        }
        return false

      },
      reChocie(){
          this.data1=[];
          this.filelist=[];
      },
      outSize(){
        //   console.log('asdasda')
          this.$Message.error(`文件大小超过${this.fileSize/1024}M！`)
          this.data1.pop()
      },
      remove (index) {
        this.data1.splice(index, 1);
      },
      upload(){
          
          this.$refs.formValidate.validate((valid)=>{
              if(valid){
                this.showLoading = true
                this.requestDate.origin_country_id = this.countryList.filter((i)=>{ return i.CNNAME == this.requestDate.origin_country_name })[0].OLDDECLARECODE
                this.requestDate.code_ts = this.frultList.filter((i)=>{ return i.HSNAMECN == this.requestDate.g_name_cn })[0].HSCODE
              
                var formdata = new FormData()
                var url;
                this.filelist.forEach(item=>{
                    formdata.append('file',item)
                })
                formdata.append('billno',this.requestDate.billno)
                formdata.append('container',this.requestDate.container)
                formdata.append('ship_name_en',this.requestDate.ship_name_en)
                formdata.append('voyage_no',this.requestDate.voyage_no)
                formdata.append('decunit_id',this.requestDate.decunit_id)
                formdata.append('origin_country_name',this.requestDate.origin_country_name)
                formdata.append('origin_country_id',this.requestDate.origin_country_id)
                formdata.append('g_name_cn',this.requestDate.g_name_cn)
                formdata.append('code_ts',this.requestDate.code_ts)
                formdata.append('g_name_en',this.requestDate.g_name_en)
                formdata.append('fruit_type',this.requestDate.frult_type)
                
                if(this.fileType==='txt'){
                    url = interfaceUrl.uploadTxtFile
                }else if(this.fileType==='excel'){
                    url = interfaceUrl.uploadExcelFile
                }
                fileUp(url,formdata).then(r=>{
                    if(r.code==='200'&&!r.error){
                        this.$Message.success('上传成功！')
                        this.showLoading = false
                        this.$refs.formValidate.resetFields()  //重置表单
                    }
                    else if(r.error){
                        this.modal=true
                        this.showLoading = false
                        this.$refs.errorInfor.innerHTML=r.error
                    }
                    else{
                        this.$Message.error('上传出错！')
                        this.showLoading = false
                    }
                    if(r.indexArray && r.indexArray.length>0){
                            r.indexArray.forEach((value,index)=>{
                            this.data1.splice(value-index,1)
                            this.filelist.splice(value-index,1)
                        })
                    }

               })
              }else{
                   this.$Message.error('必填项不能为空')
              }
          });
        }
  },
  mounted(){
      this.queryCountry()
      this.queryFrult()
  }
}
</script>

<style lang="scss" scoped>
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
        h3::after {
            clear: both;
            display: block;
            visibility: hidden;
            content: '';
            height: 0;
        }
        .upfile{
          box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
          padding: 30px 0;
          text-align: center;
          margin-top: 30px;
          button{
                   background: rgb(0,80,141);
                   color:#fff;
               }
       }
    }
    .ivu-form-item{
        margin-left: 50px;
        margin-top: 10px;
    }
</style>

