<template>
    <div>
         <!-- 添加授权信息的moadl -->
        <Modal
         v-model='addModal' 
         width='1000' 
         :mask-closable=false 
         :footer-hide = true
         :closable =false
        
         >
         <p slot="header" style="text-align:center;font-size:15px">
              <span>新增授权企业信息</span>
          </p>
            <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
            <Row >
                <Col span="12"><FormItem label='请选择权利人'  prop='lablename'> 
                    <Input v-model="formData.lablename" disabled />
                    </FormItem></Col>
                 <Col span="12"><FormItem label='授权企业名称'  prop='companyname'> <Input v-model="formData.companyname" placeholder="请输入授权企业名称"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='授权企业信用代码'  prop='cncompanycode' > <Input v-model="formData.cncompanycode" placeholder="请输入授权企业信用代码" /></FormItem></Col>
                <Col span="12"><FormItem label='HS编码'  prop='hscode' > <Input v-model="formData.hscode" placeholder="请输入HS编码"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='商品名称'  prop='goodsname' > <Input v-model="formData.goodsname" placeholder="请输入商品名称" /></FormItem></Col>
                <Col span="12"><FormItem label='品牌名称'  prop='brandname' > <Input v-model="formData.brandname" placeholder="请输入品牌名称"/></FormItem></Col>
             </Row>
             <Row >
                <Col span="12">
                <FormItem label='许可起始日期'  prop='permitstartdate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.permitstartdate = $event"  placeholder="请选择许可开始时间" v-model="formData.permitstartdate" ></DatePicker>
                </FormItem></Col>
                <Col span="12">
                <FormItem label='许可截止日期'  prop='permitstartdate' >
                    <DatePicker size="large"  type="date" transfer  @on-change="formData.permitenddate = $event"  placeholder="请选择许可截止日期" v-model="formData.permitenddate" ></DatePicker>
                </FormItem></Col>
             </Row>
             <Row >
                <Col span="12"><FormItem label='目的国/地区'  prop='descountry' > <Input v-model="formData.descountry" placeholder="请输入目的国/地区"/></FormItem></Col>
               
             </Row>
             <Row>
               
                <Col span="24" style="margin:auto;text-align:center">
                <Button type="primary" style="width:120px;margin-right:20px"  @click="closeAddModal('formData')">取   消</Button>
                <Button type="primary" style="width:120px"  @click="submitone('formData')">提   交</Button>
                </Col>
             </Row>
           </Form>
          
        </Modal>
    </div>
</template>

<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter,filedownload } from "@/api/http";

export default {
    props:{
        labelName:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            addModal:false,
            lablename:'',//标签名称
            formData:{
                uuid:'',
                lablename:'',
                companyname:'',
                cncompanycode:'',
                hscode:'',
                goodsname:'',
                brandname:'',
                permitstartdate:'',
                permitenddate:'',
                descountry:'',
            },
            formRules:{
                lablename:[{required:true, trigger:'blur' , message:'权利人名称不能为空', }],
                companyname:[{required:true, trigger:'blur' , message:'公司名称不能为空', }],
                cncompanycode:[{required:true, trigger:'blur' , message:'公司信用代码不能为空', }],
                goodsname:[{required:true, trigger:'blur' , message:'商品名称不能为空', }],
                brandname:[{required:true, trigger:'blur' , message:'品牌名称不能为空', }],
            },
        }
    },

    methods:{
        closeAddModal(name){
           this.$refs[name].resetFields()
           this.addModal = false
        },
        openModal(){
            this.addModal = true
        },
        //新增表单提交
        submitone(name){
            this.$refs[name].validate((valid)=>{
              if(valid){
                let data ={
                    isNew:true,
                    lablename:this.formData.lablename,
                    data:this.formData
                }
                
                publicInter(interfaceUrl.saveOne,data).then(res=>{
                  if(res.code == 200){
                    this.addModal = false
                    this.$refs[name].resetFields()
                    this.$Message.success('操作成功')
                  }else{
                    this.$Message.error(res.message)
                  }
                })
              }else{
                 console.log('失败')
              }
         })
        },
    },
    watch:{
         labelName:{
            handler(newValue,oldValue){
                this.formData.lablename = newValue
            },
            immediate:true
        }
    }
}
</script>

<style lang="scss">
    
</style>