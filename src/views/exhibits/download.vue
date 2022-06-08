<template lang="html">
  <div class="">
      <h1 style="padding-bottom: 20px;">数据下载</h1>
    <Row class="searchRow">
        <Col span="5" style="margin-left:10px;">
            <vague v-if='role.indexOf("EC")<0' :url='url' @billNoVal='getBill' />
             <!-- <Input  v-model="BillNo"  placeholder="请输入提单号"></Input> -->
          <DatePicker
          v-if='role.indexOf("EC")>=0'
            type="daterange"
            placeholder="进境日期"
            style="width:100%;"
            @on-change="datePicker">
          </DatePicker>
        </Col>
        <Col span="2" style="margin-left:10px;">
          <Button type="primary" @click="search">搜索</Button>
        </Col>
        <Col span='3' v-if='role.indexOf("EC")<0'>
            <router-link to='/dashboard/zbhHSCode'>
                <Button type="primary">HS编码维护</Button>
            </router-link>
        </Col>
        <Col span="2" >
          <Button type="primary" :disabled="exportDisable" @click="exportData">导出数据</Button>
        </Col>
    </Row>
    <Row>
      <Table border :columns="columns2" :data="data" class='self'></Table>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import config from '@/until/config'
import {getUserRole,getCookie} from '@/until/getToken'
import vague from '@/components/uploadPDF/vague'
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components:{
        vague

    },
  data () {
    return {
      selectDateObj: { startTime: 0, endTime: 0 },
      parma:'',
      actionUrl: `${config.base}public/materialsExamine/exportExcel`,
      BillNo:'',
      role:'',
      url:'',
      data:[],
      columns2: [
        {
            title: '证明函编号',
            key: 'CERTIFICATENO',
            width: 100
        },
        {
            title: '贸易国别',
            key: 'COUNTRYCODE',
            width: 100
        },
        {
            title: '运输工具名称',
            key: 'TRANSPORTNAME',
            width: 100
        },
        {
            title: '进境日期',
            key: 'IMPORTDATE',
            width: 100
        },
        {
            title: '提运单号',
            key: 'BILLNO',
            width: 100
        },
        {
            title: '件数',
            key: 'PACKAGEQUANTITY',
            width: 100
        },
        {
            title: '重量',
            key: 'WEIGHT',
            width: 100
        },
        {
            title: '经营单位',
            key: 'COMPANYNAME',
            width: 100
        },
        {
            title: '经营单位编码',
            key: 'COMPANYCODE',
            width: 100
        },
        {
            title: '代理报关机构',
            key: 'AGENTNAME',
            width: 100
        },
        {
            title: '代理报关机构编码',
            key: 'AGENTCODE',
            width: 100
        },
        {
            title: '联系人',
            key: 'CONTACTNAME',
            width: 100
        },
        {
            title: '联系方式',
            key: 'CONTACTMETHOD',
            width: 100
        },
        {
            title: '监管方式',
            key: 'MONITORMETHOD',
            width: 100
        },
        {
            title: '保函编号',
            key: 'GUARANTEENO',
            width: 100
        },
        {
            title: '货值',
            key: 'PRICE',
            width: 100
        },
        {
            title: '收货单位',
            key: 'CONSIGNEE',
            width: 100
        },
        {
            title: '备注',
            key: 'REMARK',
            width: 100
        },
        {
            title: '担保人联系人',
            key: 'GUARANTEEPERSON',
            width: 100
        },
        {
            title: '担保人联系电话',
            key: 'GUARANTEEPERSONTELE',
            width: 100
        },
        {
            title: '总货值',
            key: 'TOTALPRICE',
            width: 100
        },
        {
            title: '经办人',
            key: 'OPERATOR',
            width: 100
        },
        {
            title: '证明人',
            key: 'CERTIFIER',
            width: 100
        },
        {
            title: '品名',
            key: 'GOODSDESCRIPTION',
            width: 100
        },
        {
            title: '数量',
            key: 'QUANTITY',
            width: 100
        },
        {
            title: '计量单位',
            key: 'QUANTITYUNIT',
            width: 100
        },
        {
            title: '单价（USD）',
            key: 'UNITPRICE',
            width: 100
        },
        {
            title: '货值（USD）',
            key: 'GOODSVALUE',
            width: 100
        },
        {
            title: '运输方式',
            key: 'TRANSPORTMODE',
            width: 100
        },
        {
            title: '展览会英文名',
            key: 'EXHIBITIONNAME',
            width: 100
        },
        {
            title: '展览会中文名',
            key: 'EXHIBITIONNAMECN',
            width: 100
        },
        {
            title: '展会英文地址',
            key: 'EXHIBITIONVENUE',
            width: 100
        },
        {
            title: '展会中文地址',
            key: 'EXHIBITIONVENUECN',
            width: 100
        },
        {
            title: '参展商',
            key: 'EXHIBITOR',
            width: 100
        },
        {
            title: '参展商国别',
            key: 'EXHIBITORCOUNTRY',
            width: 100
        },
        {
            title: '馆号',
            key: 'HALLNO',
            width: 100
        },
        {
            title: '展台号',
            key: 'BOOTHNO',
            width: 100
        },
        {
            title: '总件数',
            key: 'TOTALPACKAGES',
            width: 100
        },
        {
            title: '公司',
            key: 'COMPANY',
            width: 100
        },
          {
            title: '展台2',
            key: 'BOOTHNO2',
            width: 100
        },
          {
            title: '负责人',
            key: 'CONTACT',
            width: 100
        },
          {
            title: '电话',
            key: 'TEL',
            width: 100
        },
          {
            title: '传真',
            key: 'FAX',
            width: 100
        },
          {
            title: '邮件',
            key: 'EMAIL',
            width: 100
        },
          {
            title: '总价',
            key: 'TOTALPRICE',
            width: 100
        },
          {
            title: '货物原产国',
            key: 'COUNTRYOFORIGIN',
            width: 100
        },
          {
            title: '箱号',
            key: 'CaseNo'.toUpperCase,
            width: 100
        },
          {
            title: '体积',
            key: 'Dimension'.toUpperCase,
            width: 100
        },
          {
            title: '长度',
            key: 'Length'.toUpperCase,
            width: 100
        },
          {
            title: '宽度',
            key: 'WIDTH',
            width: 100
        },
          {
            title: '高度',
            key: 'HEIGHT',
            width: 100
        },
          {
            title: '货物毛重',
            key: 'GROWSSWEIGHT',
            width: 100
        },
          {
            title: '货物净重',
            key: 'NETWEIGHT',
            width: 100
        },
        {
            title: 'HSCode',
            key: 'HSCODE',
            width: 100
        },
        {
            title: '处理方式',
            key: 'DISPOSALS',
            width: 100
        }, 
      ]
    }
  },
  mounted(){
      this.url=interfaceUrl.ZqueryBillo
      this.role= getCookie("roler").split(',')
      console.log(this.role)
  },
  computed: {
    ...mapState('zbhDownload', {
      data3: state => state.downloadTable
    }),
    exportDisable () {
      if (this.data.length > 0) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    ...mapActions('zbhDownload', [
      'getDownloadTable',
      'downloadSomeFile'
    ]),
    getBill(val){
        this.BillNo=val
    },
    async search () {
      this.$Spin.show();
      if(this.role.indexOf('EC')>=0){
          this.parma=this.selectDateObj
      }else{
          if(this.BillNo){
              this.parma={BillNo:this.BillNo}
          }else{
              this.$Message.error('请输入提单号！')
               this.$Spin.hide();
              return
          }
      }
      await this.getDownloadTable(this.parma)
      this.$Spin.hide()
      if(this.data3.code==='200'){
          this.data=this.data3.data
      }else{
          this.$Modal.error({
              title:"查询出错",
              content:this.data3.data
          })
      }

       
     
    },
    checkHsCode(){
        var flag=this.isExport()
        if(!flag){
            this.$Message.error('下载失败，HS编码校验未通过，请补充或修改HS编码！')
            return false
        }
        var objData=[]
        this.data.forEach(val=>{
            var obj={}
            obj.uuid=val.UUID
            obj.hscode=val.HSCODE
            objData.push(obj)
        })
        publicInter(interfaceUrl.checkHSCode,objData).then(r=>{
           if(r.isOk){
               this.exportData()
           }else{
              this.$Modal.error({
                 title: '下载出错',
                 content: r.msg
                });
           }
        })
    },
    isExport(){
        var flag=true
        this.data.forEach(val => {
            if(!val.HSCODE){
                flag=false
                return
            }
        })
        return flag

    },
    async exportData () {
        // console.log(this.parma)
             this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-c',
                                size: 18
                            }
                        }),
                        h('div', '下载中...')
                    ])
                }
            });
        let res = await this.downloadSomeFile(this.parma)
        this.$Spin.hide()

        let url = window.URL.createObjectURL(new Blob([res]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '中博会物资证明函下载数据.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
     
    },
    datePicker (dateStrArr, dateObj) {
      // { startDate, endDate }
      // console.log(dateStr);
      let startTime = dateStrArr[0].replace(/\-/g, ''),
          endTime = dateStrArr[1].replace(/\-/g, '')
      // console.log({ startDate, endDate });
      this.selectDateObj = { startTime, endTime }
    },

    instance (type, str) {
        const title = '下载结果';
        const content = str;
        switch (type) {
            case 'info':
                this.$Modal.info({
                    title: title,
                    content: content
                });
                break;
            case 'success':
                this.$Modal.success({
                    title: title,
                    content: content
                });
                break;
            case 'warning':
                this.$Modal.warning({
                    title: title,
                    content: content
                });
                break;
            case 'error':
                this.$Modal.error({
                    title: title,
                    content: content
                });
                break;
        }
    }
  }
}
</script>

<style lang="scss" scoped="">
.ivu-spin-fix{
    z-index: 1100 !important;
}
.searchRow {
  padding-bottom: 10px;
  border-bottom: 1px solid #dddee1;
  margin-bottom: 10px;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
</style>
