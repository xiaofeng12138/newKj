<template>
    <div>
        <h1 class="title">水果冷处理</h1>
        <div class="agreements" >
            <Select v-model="valueSelect" size="large" style="width:10%;margin-right:30px;margin-top:1.5px">
                <Option value="0">未确认</Option>
                <Option value="1">确认</Option>
            </Select>
            <Input v-model="billno" size="large" placeholder="请输入提单号" clearable style="width: 15%;margin-right:30px" />
            <!-- <DatePicker type="daterange" format="yyyy/MM/dd" placeholder="请选择时间" style="width:20%"
              v-model="date"></DatePicker> -->
              <DatePicker size="large" type="date" v-model='date' placeholder="请选择日期" style="width:15%" class="self"></DatePicker>
       <Select v-model="valueSelect2" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="btnBox">
           <Button type="primary" size='large' @click="searchButton">查询</Button>
           <!-- <a href="/ERPInterface/cold_txt_template.zip"><Button type="primary" size='large'>txt模板下载</Button></a>
           <a href="/ERPInterface/cold_excel_template.xlsx"><Button type="primary" size='large'>Excel模板下载</Button></a> -->
           <!-- <Button type="primary" size='large' @click="uploadTxt">txt模板下载</Button> -->
           <!-- <Button type="primary" size='large' @click="uploadTxt">Excel模板下载</Button> -->
           <Button type="primary" size='large' @click="uploadTxt">上传txt</Button>
           <Button type="primary" size='large' @click="uploadExcel">上传Excel</Button>
        </div>
            <Table :columns="columns" :data="dataList">
            </Table>
            <div>
            <Page
                :total="total"
                v-if="total"
                :page-size="this.form.pageSize"
                style="float:right;margin-top:16px"
                @on-change="pageNumChange"
                :current = "this.form.pageNum"
                show-total
            ></Page>
          </div>
        </div>
        <Modal v-model="modalShow" width="1050" title="详细">
          <Table :columns="columnsDetail" :data="detailList">

          </Table>
          <div slot="footer">
            <Button size='large' @click="cancelClick">取消</Button>
            <Poptip confirm title="是否确认?" @on-ok="okClick" ok-text="是" cancel-text="否" >
              
              <Button type="primary" size='large' >确认</Button>
            </Poptip>
          </div>
          <Page
                :total="detailTotal"
                v-if="detailTotal"
                :page-size="10"
                style="float:right;margin-top:16px;margin-bottom: 20px"
                @on-change="detailPageNumChange"
                :current="this.detailPageNum"
                show-total
            ></Page>
        </Modal>
        <Modal v-model="uploadTxtShow" width="1300" :mask-closable=false>
            <upload  :header="'txt'" :fileType="'txt'" />
        </Modal>
        <Modal v-model="uploadExcelShow" width="1300" :mask-closable=false>
            <upload  :header="'Excel'"  :fileType="'excel'"/>
        </Modal>
    </div>
        
</template>

<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import expandRow from '@/components/ERPSearch/detail/expand.vue';
import upload from './upload.vue';
import {fromate,getNextTime} from '../../../until/fromTime'
export default {
  components: {expandRow, upload},
  data() {
    return {
      billnoUpload: '',
      containerUploa: '',
      valueSelect: "0",
      date: new Date(),
      billno: '',
      dataList: [],
      detailList: [],
      modalShow: false,
      uploadTxtShow: false,
      uploadExcelShow: false,
      uuID: '',
      total: 0,
      detailTotal: 0,
      detailPageNum: 1,
      valueSelect2:1,
      form: {
        billno: '',
        status: '0',
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 20
      },
      cityList: [
          {
              value: 1,
              label: '及前一个月内'
          },
          {
              value: 2,
              label: '及前两个月内'
          },
          {
              value: 3,
              label: '及前三个月内'
          }
      ],
      showField: [
        {key: 'UUID', value: '唯一UUID'},
        {key: 'BILLNO', value: '提单号'},
        {key: 'CNTRNO', value: '集装箱号'},
        {key: 'UPLOAD_TIME', value: '记录时间'},
        {key: 'USDA1', value: '温度1'},
        {key: 'USDA2', value: '温度2'},
        {key: 'USDA3', value: '温度3'},
        {key: 'MESSAGE_SENDER', value: '上传用户'},
        {key: 'REC_UPD_DT', value: '上传时间'},
        {key: 'FILEUUID', value: '文件唯一UUID'},
        {key: 'STATUS', value: '确认状态'}
      ],
      columnsDetail: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                  row: params.row,
                  bodyField: this.showField
                  }
              })
          }
        },
        {
          title: '提单号',
          key: 'BILLNO',
          align:'center'
        },
        {
          title: '集装箱号',
          key: 'CNTRNO',
           align:'center'
        },
        {
          title: '记录时间',
          key: 'UPLOAD_TIME', 
          align:'center'
        },
        {
          title: '温度1',
          key: 'USDA1',
           align:'center'
        },
        {
          title: '温度2',
          key: 'USDA2',
           align:'center'
        },
        {
          title: '温度3',
          key: 'USDA3',
           align:'center'
        }
      ],
      columns: [
        {
          title: '提单号',
          key: 'KEY'
        },
        {
          title: '文件名',
          key: 'FILENAME'
        },
        {
          title: '上传时间',
          key: 'REC_UPD_DT'
        },
        {
          title: '确认状态',
          key: "STATUS",
          render: (h, obj) => {
            return h('div', obj.row.STATUS == '0' ? '未确认' : '确认')
          }
        },
        {
          title:'操作',
            render: (h, params) => {
                  const that=this
                  return h('div', [
                      h('Button',{
                          props:{
                              type:'primary',
                              size:'large'
                          },
                          style:{
                              marginRight:'10px'
                          },
                          on:{
                              click(){
                                  that.detailPageNum = 1;
                                  that.getdetail(params.row.ATTACHMENT_UUID)
                              }
                          }
                      },'查看')
                  ])
            }
          
        }
      ]
    };
  },
  methods: {
    pageNumChange(page) {
      this.form.pageNum = page;
      this.searchList()
    },
    detailPageNumChange(page) {
      this.detailPageNum = page;
      this.getdetail(this.uuID)
    },
    cancelClick() {
      this.modalShow = false
    },
    okClick() {
      let params = {
        attachmentuuid: this.uuID
      }
      publicInter(interfaceUrl.updateTemperatureStatus, params).then(r=>{
          if(r.code == '200') {
            this.$Message.success(r.msg)
            this.modalShow = false
            this.searchList()
          } else {
            this.$Message.error(r.msg)
          }
      })
    },
    searchButton() {
      this.form.pageNum = 1;
      var {startDate,endDate}=getNextTime(this.date,this.valueSelect2);
      this.form.status = this.valueSelect;
      this.form.billno = this.billno;
      this.form.startDate = startDate;
      this.form.endDate = endDate;
      this.searchList()
    },
    searchList() {
      publicInter(interfaceUrl.queryFruitColdList, this.form).then(r=>{
        if(r.list == [])
          return;
        this.dataList = r.list
        this.total = r.totalRow
      })
    },
    uploadTxt() {
      this.uploadTxtShow = true
    },
    uploadExcel() {
      this.uploadExcelShow = true
    },
    getdetail(uuid) {
      let params = {
        pageSize: 10,
        pageNum: this.detailPageNum,
        attachmentuuid: uuid
      }
      publicInter(interfaceUrl.queryFruitColdDetailList, params).then(r=>{
        if(r.list == [])
          return;
        this.detailList = r.list;
        this.uuID = uuid;
        this.modalShow = true;
        this.detailTotal = r.totalRow
      })
    },
    formdateChange(v) {
      let m = v.getMonth() + 1
      let mm = m < 10 ? '0' + m : m
      let d = v.getDate()
      let dd = d < 10 ? '0' + d : d
      return `${v.getFullYear()}${mm}${dd}`
    }
  }
};
</script>

<style lang="scss" scoped>
.agreements {
    margin-top: 50px;
  button {
    background-color: rgb(0, 80, 141);
  }
  min-height: 350px;
  padding-left: 1px;
  .btnBox {
    display:inline-block;
    button{
      margin-left: 5px;
    }
  }
  .ivu-table-wrapper {
    margin-top: 30px;
  }
}
</style>
