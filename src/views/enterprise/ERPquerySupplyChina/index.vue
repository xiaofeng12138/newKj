<template>
<div class="queryERPsupplyChain">
         <h1>企业供应链查询</h1>
    <Tabs class="agentCencus">
         <TabPane label="普通贸易进口" >
         <Table border :columns = 'columns1' :data='data1' class="self">
            <template  slot-scope="{row,index}" slot="action"> 
              <Button type="primary" size ='large' style="margin-right:5px" @click="showone(index)">修改</Button>
              <Modal v-model='modal1' width='600' :mask='false'  :scrollable='true'>
              <Form  ref='formData' :model="formData" :rules='formRules' :label-width ='180' style="margin-top:20px">
                <FormItem label='申请企业名称：' > 
                  <Input v-model="formData.PETITIONERNAME"  disabled style="width:80%;"/>
                </FormItem>
                 <FormItem label='申请企业统一信用代码：'> 
                  <Input v-model="formData.PETSOCIALCREDITCODE" disabled style="width:80%;"/>
                </FormItem>
                 <FormItem label='境外发货企业名称：' prop='OVERSEASSHIPPERNAME'> 
                  <Input v-model="formData.OVERSEASSHIPPERNAME" style="width:80%;" :maxlength='120'/>
                </FormItem>
                 <FormItem label='境外发货企业VAT号：' prop='OVERSEASSHIPPERVAT'> 
                  <Input v-model="formData.OVERSEASSHIPPERVAT" style="width:80%;" />
                </FormItem>
                 <FormItem label='境外发货人国别：' prop='OVERSEACOUNTRYNAME'> 
                  <Input v-model="formData.OVERSEACOUNTRYNAME" style="width:80%;" :maxlength='120'/>
                </FormItem>
                 <FormItem label='境外发货人国别海关代码：' prop='OVERSEACOUNTRYCODE'> 
                  <Input v-model="formData.OVERSEACOUNTRYCODE" style="width:80%;" />
                </FormItem>
                <FormItem label='跨境物流承运企业名称：' prop='CBLOGISTICSPER'> 
                  <Input v-model="formData.CBLOGISTICSPER" style="width:80%;"/>
                </FormItem>
                <FormItem label='跨境物流承运企业信用代码：'> 
                  <Input v-model="formData.CBLOGISTICSPERSOCIALCREDIT" style="width:80%;"/>
                </FormItem>
                <FormItem label='报关单位名称：' prop='CUSTOMSDECNAME'> 
                  <Input v-model="formData.CUSTOMSDECNAME" style="width:80%;"/>
                </FormItem>
                <FormItem label='报关单位统一信用代码：' prop='CUSTOMSDECSOCIALCREDIT'> 
                  <Input v-model="formData.CUSTOMSDECSOCIALCREDIT" style="width:80%;"/>
                </FormItem>
                <FormItem label='经营单位名称：' prop='ENTRYBUSINESSNAME'> 
                  <Input v-model="formData.ENTRYBUSINESSNAME" style="width:80%;"/>
                </FormItem>
                <FormItem label='经营单位统一信用代码：' prop='ENTRYBUSINESSSOCIALCREDIT'> 
                  <Input v-model="formData.ENTRYBUSINESSSOCIALCREDIT" style="width:80%;"/>
                </FormItem>
                <FormItem label='收货单位名称：' prop='PURCHASERNAME'> 
                  <Input v-model="formData.PURCHASERNAME" style="width:80%;"/>
                </FormItem>
                 <FormItem label='收货单位统一信用代码：' prop='PURCHASERSOCIALCREDIT'> 
                  <Input v-model="formData.PURCHASERSOCIALCREDIT" style="width:80%;"/>
                </FormItem>
                 <FormItem label='货运代理公司名称：' prop='FREFORWARDERNAME'> 
                  <Input v-model="formData.FREFORWARDERNAME" style="width:80%;"/>
                </FormItem>
                 <FormItem label='货运代理公司统一信用代码：'> 
                  <Input v-model="formData.FREFORWARDERSOCIALCREDIT" style="width:80%;"/>
                </FormItem>

                 <FormItem :label-width ='0'> 
                  <Button type="primary" size ='large' long @click="submitone('formData')" >提交</Button>
                </FormItem>
              </Form>
               <div slot="footer" style="display:none">
                </div>
              </Modal>
              <Button type="error" size ='large'  @click="delone(index)">删除</Button>
            </template>
         </Table>
          <Page :total="total1" :page-size=20  @on-change="changePage1" show-total />

          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeTrade" :disabled="isdisabled1">导出Excel</Button> -->
         </div>
      </TabPane>

      <TabPane label="一线进口">
         <firstEnterance />
       </TabPane>

       <TabPane label="二线进口" >
         <Table border :columns = 'columns2' :data='data2' class="self" >
            <template  slot-scope="{row,index}" slot="action"> 
              <Button type="primary" size ='large' style="margin-right:5px" @click="showtwo(index)">修改</Button>
              <Button type="error" size ='large'  @click="deltwo(index)">删除</Button>
                <Modal v-model='modal2' width='600' :mask='false'  :scrollable='true' :styles="{top:'0px'}">
                <Form  ref='formData1' :model="formData1" :rules='formRules1' :label-width ='180' style="margin-top:20px">
                <FormItem label='申请企业名称：' > 
                  <Input v-model="formData1.PETITIONERNAME1"  disabled style="width:80%;"/>
                </FormItem>
                 <FormItem label='申请企业统一信用代码：'> 
                  <Input v-model="formData1.PETSOCIALCREDITCODE1" disabled style="width:80%;"/>
                </FormItem>
                 <FormItem label='发货企业名称：' prop='SHIPPERNAME'> 
                  <Input v-model="formData1.SHIPPERNAME" style="width:80%;" :maxlength='120'/>
                </FormItem>
                 <FormItem label='发货企业统一信用代码：' prop='SHIPPERCODE'> 
                  <Input v-model="formData1.SHIPPERCODE" style="width:80%;" />
                </FormItem>
                 <FormItem label='境外发货人国别：' prop='OVERSEACOUNTRYNAME'> 
                  <Input v-model="formData1.OVERSEACOUNTRYNAME" style="width:80%;" :maxlength='120'/>
                </FormItem>
                 <FormItem label='境外发货人国别海关代码：' prop='OVERSEACOUNTRYCODE'> 
                  <Input v-model="formData1.OVERSEACOUNTRYCODE" style="width:80%;" />
                </FormItem>
                <FormItem label='报关单位名称：' prop='CUSTOMSDECNAME1'> 
                  <Input v-model="formData1.CUSTOMSDECNAME1" style="width:80%;"/>
                </FormItem>
                <FormItem label='报关单位统一信用代码：' prop='CUSTOMSDECSOCIALCREDIT1'> 
                  <Input v-model="formData1.CUSTOMSDECSOCIALCREDIT1" style="width:80%;"/>
                </FormItem>
                <FormItem label='经营单位名称：' prop='ENTRYBUSINESSNAME1'> 
                  <Input v-model="formData1.ENTRYBUSINESSNAME1" style="width:80%;"/>
                </FormItem>
                <FormItem label='经营单位统一信用代码：' prop='ENTRYBUSINESSSOCIALCREDIT1'> 
                  <Input v-model="formData1.ENTRYBUSINESSSOCIALCREDIT1" style="width:80%;"/>
                </FormItem>
                <FormItem label='保税仓储企业名称：' prop='BONDEDWAREHOUSE'> 
                  <Input v-model="formData1.BONDEDWAREHOUSE" style="width:80%;"/>
                </FormItem>
                <FormItem label='保税仓储企业统一信用代码：' prop='BWAREHOUSESOCIALCREDITCODE'> 
                  <Input v-model="formData1.BWAREHOUSESOCIALCREDITCODE" style="width:80%;"/>
                </FormItem>
                <FormItem label='收货单位名称：' prop='PURCHASERNAME1'> 
                  <Input v-model="formData1.PURCHASERNAME1" style="width:80%;"/>
                </FormItem>
                 <FormItem label='收货单位统一信用代码：' prop='PURCHASERSOCIALCREDIT1'> 
                  <Input v-model="formData1.PURCHASERSOCIALCREDIT1" style="width:80%;"/>
                </FormItem>
                 <FormItem label='货运代理公司名称：' prop='FREFORWARDERNAME1'> 
                  <Input v-model="formData1.FREFORWARDERNAME1" style="width:80%;"/>
                </FormItem>
                 <FormItem label='货运代理公司统一信用代码：'> 
                  <Input v-model="formData1.FREFORWARDERSOCIALCREDIT1" style="width:80%;"/>
                </FormItem>
                 <FormItem label='境内运输公司名称：' prop='DOMESTICTRANSPORT1'> 
                  <Input v-model="formData1.DOMESTICTRANSPORT1" style="width:80%;"/>
                </FormItem>
                 <FormItem label='境内运输公司统一信用代码：'> 
                  <Input v-model="formData1.DOMESTICTRANSOCIALCREDIT1" style="width:80%;"/>
                </FormItem>

                 <FormItem :label-width ='0'> 
                  <Button type="primary" size ='large' long @click="submittwo('formData1')" >提交</Button>
                </FormItem>
              </Form>
               <div slot="footer" style="display:none">
                </div>
              </Modal>
            </template>
         </Table>
          <Page :total="total2" :page-size=20  @on-change="changePage2" show-total />
          <div style="text-align:center;margin-top:16px">
                <!-- <Button type="primary" size='large' @click="exporeSecond" :disabled="isdisabled2">导出Excel</Button> -->
         </div>
      </TabPane>
     
     </Tabs>
      </div>
      
</template>
<script>
 import interfaceUrl from '@/api/interfaceUrl'
 import {publicInter,filedownload} from '@/api/http'
 import firstEnterance from './firstEntrance'
export default {
    components:{
      firstEnterance
    },
  data(){
    const codeReg = (rule,value,callback)=>{
            if(!value){
              return callback(new Error('请输入社会统一信用代码'))
             }
             else if(/^[\dA-Z]{18}$/.test(value) || /^[\dA-Z]{15}$/.test(value)){
                callback()
             }
            else{
            return callback(new Error('请输入正确格式的社会统一信用代码'))
           }
    };
      return{
      
        //一线数据
         formData:{
              PETITIONERNAME:'', //申请企业名称
              PETSOCIALCREDITCODE:'', //申请企业代码
              OVERSEASSHIPPERNAME:'',//发货企业名称
              OVERSEASSHIPPERVAT:'',//发货企业VAT
              OVERSEACOUNTRYNAME:'', //境外发货人国别
              OVERSEACOUNTRYCODE:'', //境外发货人国别海关代码
              CBLOGISTICSPER:'',//跨境物流承运企业
              CBLOGISTICSPERSOCIALCREDIT:'',//承运企业代码
              CUSTOMSDECNAME:'',//报关单位名称
              CUSTOMSDECSOCIALCREDIT:'',//报关单位代码
              ENTRYBUSINESSNAME:'',//经营单位名称
              ENTRYBUSINESSSOCIALCREDIT:'',//经营单位代码
              PURCHASERNAME:'', //收货单位名称
              PURCHASERSOCIALCREDIT:'', //收货单位代码
              FREFORWARDERNAME:'',//货运代理名称
              FREFORWARDERSOCIALCREDIT:'',//货运代理代码
         },

         //一般贸易表单校验
         formRules:{
            OVERSEASSHIPPERNAME:[
              {required:true, trigger:'blur' , message:'请输入境外发货企业名称', }
            ],
            OVERSEASSHIPPERVAT:[
              {required:true, trigger:'blur',message:'请输入境外发货企业VTA号'}
            ],
            CBLOGISTICSPER:[
               {required:true, trigger:'blur' , message:'请输入跨境物流承运企业名称', }
            ],
             OVERSEACOUNTRYNAME:[
              {required:true, trigger:'blur',message:'请输入境外发货人国别',}
            ],
            OVERSEACOUNTRYCODE:[
               {required:true, trigger:'blur' , message:'请输入境外发货人国别海关代码', }
            ],
            CUSTOMSDECNAME:[
              {required:true, trigger:'blur' , message:'请输入报关单位名称', }
            ],
            CUSTOMSDECSOCIALCREDIT:[
               {required:true, trigger:'blur' , message:'请输入报关单位统一信用代码', },
               {validator:codeReg,trigger:'blur'}
            ],
            ENTRYBUSINESSNAME:[
              {required:true, trigger:'blur' , message:'请输入经营单位名称', }
            ],
            ENTRYBUSINESSSOCIALCREDIT:[
                {required:true, trigger:'blur' , message:'请输入经营单位统一信用代码', },
                {validator:codeReg,trigger:'blur'}
            ],
            PURCHASERNAME:[
               {required:true, trigger:'blur' , message:'请输入收货单位名称', }
            ],
            PURCHASERSOCIALCREDIT:[
              {required:true, trigger:'blur' , message:'请输入收货单位统一信用代码', },
              {validator:codeReg,trigger:'blur'}
            ],
            FREFORWARDERNAME:[
              {required:true, trigger:'blur' , message:'请输入货运代理公司名称', }
            ]
         },


         //二线数据
        formData1:{
          PETITIONERNAME1:'', //申请企业名称
          PETSOCIALCREDITCODE1:'', //申请企业代码
          SHIPPERNAME:'', //发货企业名称
          SHIPPERCODE:'',//发货企业代码、
          OVERSEACOUNTRYNAME:'', //境外发货人国别
          OVERSEACOUNTRYCODE:'', //境外发货人国别海关代码
          CUSTOMSDECNAME1:'',//报关单位名称
          CUSTOMSDECSOCIALCREDIT1:'', //报关单位代码
          ENTRYBUSINESSNAME1:'', //经营单位名称
          ENTRYBUSINESSSOCIALCREDIT1:'',//经营单位代码
          BONDEDWAREHOUSE:'',//保税仓储名称
          BWAREHOUSESOCIALCREDITCODE:'',//保税仓储代码
          PURCHASERNAME1:'',//收货单位名称
          PURCHASERSOCIALCREDIT1:'',//收货单位代码
          FREFORWARDERNAME1:'',//货运代理公司名称
          FREFORWARDERSOCIALCREDIT1:'',//货运代理公司代码
          DOMESTICTRANSPORT1:'',//境内货运公司
          DOMESTICTRANSOCIALCREDIT1:'',//境内货运公司代码
        },

         //二线数据表单校验

         formRules1:{
            SHIPPERNAME:[
              {required:true, trigger:'blur' , message:'请输入发货企业名称', }
            ],
            SHIPPERCODE:[
              {required:true, trigger:'blur',message:'请输入发货企业统一信用代码'},
              {validator:codeReg,trigger:'blur'}
            ],
             OVERSEACOUNTRYNAME:[
              {required:true, trigger:'blur',message:'请输入境外发货人国别',}
            ],
            OVERSEACOUNTRYCODE:[
               {required:true, trigger:'blur' , message:'请输入境外发货人国别海关代码', }
            ],
            CUSTOMSDECNAME1:[
              {required:true, trigger:'blur' , message:'请输入报关单位名称', }
            ],
            CUSTOMSDECSOCIALCREDIT1:[
               {required:true, trigger:'blur' , message:'请输入报关单位统一信用代码', },
               {validator:codeReg,trigger:'blur'}
            ],
            ENTRYBUSINESSNAME1:[
              {required:true, trigger:'blur' , message:'请输入经营单位名称', }
            ],
            ENTRYBUSINESSSOCIALCREDIT1:[
                {required:true, trigger:'blur' , message:'请输入经营单位统一信用代码', },
                {validator:codeReg,trigger:'blur'}
            ],
            BONDEDWAREHOUSE:[
               {required:true, trigger:'blur' , message:'请输入保税仓储企业名称', }
            ],
            BWAREHOUSESOCIALCREDITCODE:[
              {required:true, trigger:'blur' , message:'请输入保税仓储企业统一信用代码', },
              {validator:codeReg,trigger:'blur'}
            ],
            PURCHASERNAME1:[
              {required:true, trigger:'blur' , message:'请输入收货单位名称', }
            ],
            PURCHASERSOCIALCREDIT1:[
              {required:true, trigger:'blur' , message:'请输入收货单位统一信用代码', },
              {validator:codeReg,trigger:'blur'}
            ],
            FREFORWARDERNAME1:[
              {required:true, trigger:'blur' , message:'请输入货运代理公司名称', }
            ],
            DOMESTICTRANSPORT1:[
              {required:true, trigger:'blur' , message:'请输入境内运输公司名称', }
            ],
         },
          columns1:[
              {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'境外发货企业名称',
              key:'OVERSEASSHIPPERNAME',
              width:200,
              align:'center'
             },
              {
              title:'境外发货企业VAT号',
              key:'OVERSEASSHIPPERVAT',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别',
              key:'OVERSEACOUNTRYNAME',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别海关代码',
              key:'OVERSEACOUNTRYCODE',
              width:200,
              align:'center',
             },
             {
              title:'跨境物流承运企业名称',
              key:'CBLOGISTICSPER',
              width:200,
              align:'center',
             },
             {
              title:'跨境物流承运企业统一信用代码',
              key:'CBLOGISTICSPERSOCIALCREDIT',
              width:210,
              align:'center',
             },
             {
              title:'报关单位名称',
              key:'CUSTOMSDECNAME',
              width:200,
              align:'center',
             },
             {
              title:'报关单位统一信用代码',
              key:'CUSTOMSDECSOCIALCREDIT',
              width:200,
              align:'center',
             },
             {
              title:'经营单位名称',
              key:'ENTRYBUSINESSNAME',
              width:200,
              align:'center',
             },
             {
              title:'经营单位统一信用代码',
              key:'ENTRYBUSINESSSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'收货单位名称',
              key:'PURCHASERNAME',
              width:200,
              align:'center',
             },
             {
              title:'收货单位统一信用代码',
              key:'PURCHASERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'货运代理公司名称',
              key:'FREFORWARDERNAME',
              width:200,
              align:'center',
             },
             {
              title:'货运代理公司统一信用代码',
              key:'FREFORWARDERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'申请企业名称',
              key:'PETITIONERNAME',
              width:200,
              align:'center'
             },
              {
              title:'申请企业统一信用代码',
              key:'PETSOCIALCREDITCODE',
              width:200,
              align:'center',
             },
              {
              title:'上传时间',
              key:'CREATEDATE',
              width:200,
              align:'center',
             },
             {
              title:'最后修改时间',
              key:'UPDATEDATE',
              width:200,
              align:'center',
             },
              {
              title:'操作',
              slot:'action',
              width:200,
              align:'center',
              fixed:'right'
            }
          ],
           columns2:[
             {
              title:'序号',
              key:'NUM',
              width:'80',
              align:'center'
             },
              {
              title:'发货企业名称',
              key:'SHIPPERNAME',
              width:200,
              align:'center'
             },
              {
              title:'发货企业统一信用代码',
              key:'SHIPPERCODE',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别',
              key:'OVERSEACOUNTRYNAME',
              width:200,
              align:'center',
             },
             {
              title:'境外发货人国别海关代码',
              key:'OVERSEACOUNTRYCODE',
              width:200,
              align:'center',
             },
             {
              title:'报关单位名称',
              key:'CUSTOMSDECNAME',
              width:200,
              align:'center',
             },
             {
              title:'报关单位统一信用代码',
              key:'CUSTOMSDECSOCIALCREDIT',
              width:200,
              align:'center',
             },
             {
              title:'经营单位名称',
              key:'ENTRYBUSINESSNAME',
              width:200,
              align:'center',
             },
             {
              title:'经营单位统一信用代码',
              key:'ENTRYBUSINESSSOCIALCREDIT',
              width:200,
              align:'center',
             },
             {
              title:'保税仓储企业名称',
              key:'BONDEDWAREHOUSE',
              width:200,
              align:'center',
             },
             {
              title:'保税仓储企业统一信用代码',
              key:'BWAREHOUSESOCIALCREDITCODE',
              width:200,
              align:'center',
             },
              {
              title:'收货单位名称',
              key:'PURCHASERNAME',
              width:200,
              align:'center',
             },
             {
              title:'收货单位统一信用代码',
              key:'PURCHASERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'货运代理公司名称',
              key:'FREFORWARDERNAME',
              width:200,
              align:'center',
             },
             {
              title:'货运代理公司统一信用代码',
              key:'FREFORWARDERSOCIALCREDIT',
              width:200,
              align:'center',
             },
              {
              title:'境内运输公司名称',
              key:'DOMESTICTRANSPORT',
              width:200,
              align:'center',
             },
             {
              title:'境内运输公司统一信用代码',
              key:'DOMESTICTRANSOCIALCREDIT',
              width:200,
              align:'center',
             },
             {
              title:'申请企业名称',
              key:'PETITIONERNAME',
              width:200,
              align:'center'
             },
              {
              title:'申请企业统一信用代码',
              key:'PETSOCIALCREDITCODE',
              width:200,
              align:'center',
             },
              {
              title:'上传时间',
              key:'CREATEDATE',
              width:200,
              align:'center',
             },
             {
              title:'最后修改时间',
              key:'UPDATEDATE',
              width:200,
              align:'center',
             },
              {
              title:'操作',
              slot:'action',
              width:200,
              align:'center',
              fixed:'right'
            }
          ],
          data1:[],
          total1:0,
          params1:{
             page:1,
             pageSize:20,
          },
          modal1:false,
          PETITIONERNAME:'', //申请企业名称
          PETSOCIALCREDITCODE:'', //申请企业代码
          OVERSEASSHIPPERNAME:'',//发货企业名称
          OVERSEASSHIPPERVAT:'',//发货企业VAT
          OVERSEACOUNTRYNAME:'', //境外发货人国别
          OVERSEACOUNTRYCODE:'', //境外发货人国别海关代码
          CBLOGISTICSPER:'',//跨境物流承运企业
          CBLOGISTICSPERSOCIALCREDIT:'',//承运企业代码
          CUSTOMSDECNAME:'',//报关单位名称
          CUSTOMSDECSOCIALCREDIT:'',//报关单位代码
          ENTRYBUSINESSNAME:'',//经营单位名称
          ENTRYBUSINESSSOCIALCREDIT:'',//经营单位代码
          PURCHASERNAME:'', //收货单位名称
          PURCHASERSOCIALCREDIT:'', //收货单位代码
          FREFORWARDERNAME:'',//货运代理名称
          FREFORWARDERSOCIALCREDIT:'',//货运代理代码
          isdisabled1:true,

          data2:[],
          total2:0,
           params2:{
             page:1,
             pageSize:20,
          },
          num1:'',
          num2:'',
          modal2:false,
          isdisabled2:true,
          PETITIONERNAME1:'', //申请企业名称
          PETSOCIALCREDITCODE1:'', //申请企业代码
          OVERSEACOUNTRYNAME1:'', //境外发货人国别
          OVERSEACOUNTRYCODE1:'', //境外发货人国别海关代码
          SHIPPERNAME:'', //发货企业名称
          SHIPPERCODE:'',//发货企业代码、
          CUSTOMSDECNAME1:'',//报关单位名称
          CUSTOMSDECSOCIALCREDIT1:'', //报关单位代码
          ENTRYBUSINESSNAME1:'', //经营单位名称
          ENTRYBUSINESSSOCIALCREDIT1:'',//经营单位代码
          BONDEDWAREHOUSE:'',//保税仓储名称
          BWAREHOUSESOCIALCREDITCODE:'',//保税仓储代码
          PURCHASERNAME1:'',//收货单位名称
          PURCHASERSOCIALCREDIT1:'',//收货单位代码
          FREFORWARDERNAME1:'',//货运代理公司名称
          FREFORWARDERSOCIALCREDIT1:'',//货运代理公司代码
          DOMESTICTRANSPORT1:'',//境内货运公司
          DOMESTICTRANSOCIALCREDIT1:'',//境内货运公司代码

      }
  },
  mounted(){
      this.queryInfoFirst();
      this.queryInfoSecond();
  },
  methods:{
    //正则校验
    
    // //一线导出
    exporeTrade(){
      let url = interfaceUrl.exporeCommon;
      filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', '供应链普通贸易进口.xlsx')
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
    },

    //二线导出
    exporeSecond(){
      let url = interfaceUrl.exporeFinalSecond;
      filedownload(url,{}).then(r=>{
                    let url = window.URL.createObjectURL(new Blob([r]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    link.setAttribute('download', '供应链二线进口.xlsx')
                    document.body.appendChild(link)
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                })
    },

    submitone(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          this.modal1 = false;
         let data = {
          PETITIONERNAME :this.formData.PETITIONERNAME,
          PETSOCIALCREDITCODE : this.formData.PETSOCIALCREDITCODE,
          OVERSEASSHIPPERNAME : this.formData.OVERSEASSHIPPERNAME,
          OVERSEASSHIPPERVAT : this.formData.OVERSEASSHIPPERVAT,
          OVERSEACOUNTRYNAME : this.formData.OVERSEACOUNTRYNAME,
          OVERSEACOUNTRYCODE : this.formData.OVERSEACOUNTRYCODE,
          CBLOGISTICSPER : this .formData.CBLOGISTICSPER,
          CBLOGISTICSPERSOCIALCREDIT : this.formData.CBLOGISTICSPERSOCIALCREDIT,
          CUSTOMSDECNAME : this.formData.CUSTOMSDECNAME,
          CUSTOMSDECSOCIALCREDIT : this.formData.CUSTOMSDECSOCIALCREDIT,
          ENTRYBUSINESSNAME :this.formData.ENTRYBUSINESSNAME,
          ENTRYBUSINESSSOCIALCREDIT : this.formData.ENTRYBUSINESSSOCIALCREDIT,
          PURCHASERNAME : this.formData.PURCHASERNAME,
          PURCHASERSOCIALCREDIT : this.formData.PURCHASERSOCIALCREDIT,
          FREFORWARDERNAME : this.formData.FREFORWARDERNAME,
          FREFORWARDERSOCIALCREDIT : this.formData.FREFORWARDERSOCIALCREDIT,
          UUID:this.num1
       }
       publicInter(interfaceUrl.updateCommonMessage,data).then(r=>{
         console.log(r)
          if(r.msg.length > 7){
            this.$Message.error(r.msg)
            this.queryInfoFirst()
          }else{
            this.$Message.success(r.msg)
            this.queryInfoFirst()
          }
        })
        }else{
          this.$Message.error('必填项不能为空');
        }
      })
    },

    submittwo(name){
        this.$refs[name].validate((valid)=>{
        if(valid){
          this.modal2 = false;
          let data = {
          PETITIONERNAME:this.formData1.PETITIONERNAME1,
          PETSOCIALCREDITCODE:this.formData1.PETSOCIALCREDITCODE1,
          OVERSEACOUNTRYNAME:this.formData1.OVERSEACOUNTRYNAME,
          OVERSEACOUNTRYCODE:this.formData1.OVERSEACOUNTRYCODE,
          SHIPPERNAME:this.formData1.SHIPPERNAME,
          SHIPPERCODE:this.formData1.SHIPPERCODE,
          CUSTOMSDECNAME:this.formData1.CUSTOMSDECNAME1,
          CUSTOMSDECSOCIALCREDIT:this.formData1.CUSTOMSDECSOCIALCREDIT1,
          ENTRYBUSINESSNAME:this.formData1.ENTRYBUSINESSNAME1,
          ENTRYBUSINESSSOCIALCREDIT:this.formData1.ENTRYBUSINESSSOCIALCREDIT1,
          BONDEDWAREHOUSE:this.formData1.BONDEDWAREHOUSE,
          BWAREHOUSESOCIALCREDITCODE:this.formData1.BWAREHOUSESOCIALCREDITCODE,
          PURCHASERNAME:this.formData1.PURCHASERNAME1,
          PURCHASERSOCIALCREDIT:this.formData1.PURCHASERSOCIALCREDIT1,
          FREFORWARDERNAME:this.formData1.FREFORWARDERNAME1,
          FREFORWARDERSOCIALCREDIT:this.formData1.FREFORWARDERSOCIALCREDIT1,
          DOMESTICTRANSPORT:this.formData1.DOMESTICTRANSPORT1,
          DOMESTICTRANSOCIALCREDIT:this.formData1.DOMESTICTRANSOCIALCREDIT1,
          UUID:this.num2
      }
       publicInter(interfaceUrl.updateFinalSecondMessage,data).then(r=>{
            if(r.msg.length > 7){
            this.$Message.error(r.msg)
            this.queryInfoSecond()
          }else{
            this.$Message.success(r.msg)
            this.queryInfoSecond()
            }
           })
           }else{
          this.$Message.error('必填项不能为空');
        }
      })
    },

      showone(index){
        this.modal1 = true
        this.num1 = this.data1[index].UUID
        this.formData.PETITIONERNAME = this.data1[index].PETITIONERNAME
        this.formData.PETSOCIALCREDITCODE = this.data1[index].PETSOCIALCREDITCODE
        this.formData.OVERSEASSHIPPERNAME = this.data1[index].OVERSEASSHIPPERNAME
        this.formData.OVERSEASSHIPPERVAT =this.data1[index].OVERSEASSHIPPERVAT
        this.formData.OVERSEACOUNTRYCODE = this.data1[index].OVERSEACOUNTRYCODE
        this.formData.OVERSEACOUNTRYNAME = this.data1[index].OVERSEACOUNTRYNAME
        this.formData.CBLOGISTICSPER =this.data1[index].CBLOGISTICSPER
        this.formData.CBLOGISTICSPERSOCIALCREDIT =this.data1[index].CBLOGISTICSPERSOCIALCREDIT
        this.formData.CUSTOMSDECNAME =this.data1[index].CUSTOMSDECNAME
        this.formData.CUSTOMSDECSOCIALCREDIT =this.data1[index].CUSTOMSDECSOCIALCREDIT
        this.formData.ENTRYBUSINESSNAME =this.data1[index].ENTRYBUSINESSNAME
        this.formData.ENTRYBUSINESSSOCIALCREDIT =this.data1[index].ENTRYBUSINESSSOCIALCREDIT
        this.formData.PURCHASERNAME =this.data1[index].PURCHASERNAME
        this.formData.PURCHASERSOCIALCREDIT =this.data1[index].PURCHASERSOCIALCREDIT
        this.formData.FREFORWARDERNAME =this.data1[index].FREFORWARDERNAME
        this.formData.FREFORWARDERSOCIALCREDIT =this.data1[index].FREFORWARDERSOCIALCREDIT
      },
       showtwo(index){
         this.modal2 = true
         this.num2 = this.data2[index].UUID
         this.formData1.PETITIONERNAME1 = this.data2[index].PETITIONERNAME
         this.formData1.PETSOCIALCREDITCODE1 = this.data2[index].PETSOCIALCREDITCODE
         this.formData1.SHIPPERNAME = this.data2[index].SHIPPERNAME
         this.formData1.SHIPPERCODE = this.data2[index].SHIPPERCODE
         this.formData1.OVERSEACOUNTRYCODE = this.data2[index].OVERSEACOUNTRYCODE 
         this.formData1.OVERSEACOUNTRYNAME = this.data2[index].OVERSEACOUNTRYNAME
         this.formData1.CUSTOMSDECNAME1 = this.data2[index].CUSTOMSDECNAME
         this.formData1.CUSTOMSDECSOCIALCREDIT1 = this.data2[index].CUSTOMSDECSOCIALCREDIT
         this.formData1.ENTRYBUSINESSNAME1 = this.data2[index].ENTRYBUSINESSNAME
         this.formData1.ENTRYBUSINESSSOCIALCREDIT1 = this.data2[index].ENTRYBUSINESSSOCIALCREDIT
         this.formData1.BONDEDWAREHOUSE = this.data2[index].BONDEDWAREHOUSE
         this.formData1.BWAREHOUSESOCIALCREDITCODE = this.data2[index].BWAREHOUSESOCIALCREDITCODE
         this.formData1.PURCHASERNAME1 = this.data2[index].PURCHASERNAME
         this.formData1.PURCHASERSOCIALCREDIT1 = this.data2[index].PURCHASERSOCIALCREDIT
         this.formData1.FREFORWARDERNAME1 = this.data2[index].FREFORWARDERNAME
         this.formData1.FREFORWARDERSOCIALCREDIT1 = this.data2[index].FREFORWARDERSOCIALCREDIT
         this.formData1.DOMESTICTRANSPORT1 = this.data2[index].DOMESTICTRANSPORT
         this.formData1.DOMESTICTRANSOCIALCREDIT1 = this.data2[index].DOMESTICTRANSOCIALCREDIT
      },

      delone(index){
        console.log(index)
       this.$Modal.confirm({
         title:"提示",
         content:'您确认删除这条内容吗？',
        onOk:()=>{
        let data = {
            UUID:this.data1[index].UUID
        };
        publicInter(interfaceUrl.delCommomMessage,data).then(r=>{
               this.$Message.success('删除成功')
               this.data1.splice(index,1)
               this.queryInfoFirst()
            })
         }
       })
      },
       deltwo(index){
         this.$Modal.confirm({
         title:"提示",
         content:'您确认删除这条内容吗？',
        onOk:()=>{
        let data = {
            UUID:this.data2[index].UUID
        };
        publicInter(interfaceUrl.delFinalSecondMessage,data).then(r=>{
               this.$Message.success('删除成功')
               this.data2.splice(index,1)
               this.queryInfoSecond()
            })
         }
       })
      },
      queryInfoFirst(){
          let data = {
              pageSize:20,
              pageNum:this.params1.page
              };
         publicInter(interfaceUrl.queryCommonGoodsMessage,data).then(r=>{
           console.log(r)
            if(r.totalRow > 0){
              this.data1 = r.list
              this.total1 = r.totalRow
              this.isdisabled1 = false
            }else{
              this.isdisabled1 = true
             }
           })
      },
       queryInfoSecond(){
         let data = {
              pageSize:20,
              pageNum:this.params2.page
              };
         publicInter(interfaceUrl.queryFinalSecondMessage,data).then(r=>{
          console.log(r)
               if(r.totalRow > 0){
                 this.data2 = r.list
                this.total2 = r.totalRow
                this.isdisabled2 = false
               }else{
                 this.isdisabled2 = true
               }
            })
      },
         changePage1(page){
            this.params1.page = page
            this.queryInfoFirst()
        },
      changePage2(page){
         this.params2.page = page
         this.queryInfoSecond()
      }
  }
}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
 .queryERPsupplyChain{
    h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
    .list{
        margin-top: 20px;
        height: 170px;
        width: 100%;
        box-shadow:  0 0 10px 0 rgba(45, 140, 240, 0.5);
        border:1px solid #ccc;
        h2{
            margin: 10px 0 10px 20px;
        }
        .ivu-table-wrapper{
            margin: 10px 20px;
        }
      
    }
    .ivu-modal-body{
      .alert{
        li{
          display: flex;
        }
      }
    }
    .ivu-modal-mask{
         background-color: rgba(0, 0, 0, 0.3)
    }
    
     .ivu-page{
      margin-top: 10px;
      text-align: center;
    }
    .ivu-form-item {
    margin-bottom: 0;
    vertical-align: top;
    zoom: 1;
}
 }
</style>
