<template>
    <div>
        <h1 class="title">船公司订阅</h1>
        <div class="agreements" >
            
            <Input v-model="billno" size="large" placeholder="请输入提单号" clearable style="width: 15%;margin-right:30px"></Input>
            <Input v-model="cntrno" size="large" placeholder="请输入集装箱号" clearable style="width: 15%;margin-right:30px"></Input>
            <Select v-model="valueSelect" size="large" style="width:15%;margin-right:30px;margin-top:1.5px">
                <Option value="0">订阅成功</Option>
                <Option value="1">订阅失败</Option>
                <Option value="2">数据返回</Option>
            </Select>
            <DatePicker size="large" type="date" v-model='date' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
            <Select v-model="valueSelect2" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="btnBox">
                <Button type="primary" size='large' @click="searchButton">查询</Button>
                <Button type="primary" size='large' @click="addButton">新增</Button>
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
        <Modal v-model="modalShow" width="800" title="详细">
          <Table :columns="columnsDetail" :data="detailList">
          </Table>
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
        <Modal v-model="addModalShow" width="800" title="新增">
            <div slot="footer" style="text-align: center">
                <Button @click="cancelAdd">取消</Button>
                <Button @click="addRow">新增</Button>
                <Button @click="commitAddList">确定</Button>
            </div>
          <Table style="margin: 5px" :columns="columnsAdd" :data="addList" class="dockingOfShips-add-table">
          </Table>
        </Modal>

    </div>
        
</template>

<script>
import {publicInter} from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
import expandRow from '@/components/ERPSearch/detail/expand.vue';
import {fromate,getNextTime} from '../../../until/fromTime'
export default {
  components: {expandRow},
  data() {
    return {
      valueSelect: "0",
      date: new Date(),
      form: {
        billno: '',
        cntrno: '',
        startDate: '',
        endDate: '',
        status: '0',
        pageNum: 1,
        pageSize: 20
      },
      billno: '',
      cntrno: '',
      dataList: [],
      detailList: [],
      addList: [],
      modalShow: false,
      addModalShow: false,
      total: 0,
      detailTotal: 0,
      detailPageNum: 1,
      valueSelect2:1,
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
      columnsAdd: [
          {
            title: '提单号',
            key: 'billNo',
            render: (h, params) => {
              return h('Input', {
                style: {
                  width: '100%',
                  height: '100%',
                  border: 'none',
                },
                attrs: {
                  placeholder: '请输入提单号'
                },
                on:{
                    "on-blur":(event)=>{
                        this.addList[params.index].billNo = event.target.value;
                    }
                }
              })
            }
          },
          {
            title: '集装箱号',
            key: 'cntrNo',
            render: (h, params) => {
              return h('Input', {
                style: {
                  width: '100%',
                  height: '100%',
                  border: 'none',
                },
                attrs: {
                  placeholder: '请输入集装箱号'
                },
                on:{
                    "on-blur":(event)=>{
                        this.addList[params.index].cntrNo = event.target.value;
                    }
                }
              })
            }
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
        {key: 'REC_UPD_DT', value: '入库时间'},
        {key: 'FILEUUID', value: '文件唯一UUID'},
        {key: 'STATUS', value: '返回状态'},
        {key: 'UP_DATE', value: '记录日期'},
        {key: 'UP_TIME', value: '记录时分秒'}
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
          key: 'BILLNO'
        },
        {
          title: '集装箱号',
          key: 'CNTRNO'
        },
        {
          title: '记录时间',
          key: 'UPLOAD_TIME'
        },
        {
          title: '温度1',
          key: 'USDA1'
        },
        {
          title: '温度2',
          key: 'USDA2'
        },
        {
          title: '温度3',
          key: 'USDA3'
        }
      ],
      columns: [
        {
          title: '提单号',
          key: 'BILLNO'
        },
        {
          title: '集装箱号',
          key: 'CNTRNO'
        },
        {
          title: '上传日期',
          key: 'UPLOADDATE'
        },
        {
          title: '订阅状态',
          key: "STATUS",
          render: (h, obj) => {
            if(obj.row.STATUS == '0'){
              return h('div', '订阅成功')
            } else if(obj.row.STATUS == '1'){
              return h('div', '订阅失败')
            } else if(obj.row.STATUS == '2'){
              return h('div', '数据返回')
            }
            
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
                                  that.getdetail(params.row.BILLNO, params.row.CNTRNO)
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
      this.getdetail(this.detailBillno, this.detailCntrno)
    },
    cancelClick() {
      this.modalShow = false
    },
    searchButton() {
      var {startDate,endDate}=getNextTime(this.date,this.valueSelect2);
      this.form.pageNum = 1;
      this.form.status = this.valueSelect;
      this.form.billno = this.billno;
      this.form.cntrno = this.cntrno;
      this.form.startDate = startDate;
      this.form.endDate = endDate;
      this.searchList()
    },
    cancelAdd() {
      this.addModalShow = false;
    },
    commitAddList() {
      for(let i = 0; i < this.addList.length; i++) {
        if(this.addList[i].billNo == '' || this.addList[i].cntrNo == ''){
          this.$Message.error('提单号或集装箱号不能为空');
          return ;
        }
      }

      let params = {
        list: this.addList
      }
      publicInter(interfaceUrl.addBillMsg, params).then(r=>{
          if(r.code = '200') {
            this.$Message.success(r.msg);
            this.addModalShow = false;
            this.searchButton()
          }
      })
    },
    addRow() {
      this.addList.push({
        billNo: '',
        cntrNo: ''
      })
    },
    addButton() {
        this.addList = [];
        this.addRow();
        this.addModalShow = true;
    },
    searchList() {
      publicInter(interfaceUrl.queryBillMsgList, this.form).then(r=>{
        if(r.list == [])
          return;
        this.dataList = r.list
        this.total = r.totalRow
      })
    },
    getdetail(billno, cntrno) {
      let params = {
        pageSize: 10,
        pageNum: this.detailPageNum,
        billno: billno,
        cntrno: cntrno
      }
      publicInter(interfaceUrl.queryBillDetailList, params).then(r=>{
        if(r.list == [])
          return;
        this.detailList = r.list;
        this.detailBillno = billno;
        this.detailCntrno = cntrno;
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
      margin-left: 10px;
    }
  }
  .ivu-table-wrapper {
    margin-top: 30px;
  }
}
</style>
