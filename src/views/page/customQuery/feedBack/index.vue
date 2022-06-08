<template lang="html">
  <div class="">
      <h1 style="padding-bottom: 20px;">信息反馈</h1>
    <Row type="flex">
        <Col span="6">

          <DatePicker type="daterange" placeholder="Select date" style="width:100%;" @on-change="picker"></DatePicker>
        </Col>
        <Col span="3" offset="1">

          <Button type="primary" @click="search" :disabled="true">搜索</Button>
        </Col>
        <Col span="3" offset="11">
          <Button type="primary" :disabled="exportDisable" @click="exportData">导出数据</Button>
        </Col>
    </Row>

    <Row style="margin-top:20px;">
      <Table :columns="columns1" :data="list"></Table>
    </Row>
  </div>
</template>

<script>
import { mapActions, mapState }  from 'vuex'
export default {
  data () {
    return {
      selectDateObj: '',

      columns1: [
        {
          title: '运输工具',
          key: 'VOYAGE_NO',
          width: 120
        },
        {
          title: '收入机关',
          key: 'INCOME_NAME',
          width: 120
        },
        {
          title: '数量',
          key: 'QTY_1',
          width: 120
        },
        {
          title: '号码',
          key: 'NUM',
          width: 120
        },
        {
          title: '增值税款金额',
          key: 'REAL_TAX',
          width: 120
        },
        {
          title: '提单号',
          key: 'BILL_NO',
          width: 120
        },
        {
          title: '关税税率',
          key: 'DUTY_RATE',
          width: 120
        },
        {
          title: '增值税税率',
          key: 'TAX_RATE',
          width: 120
        },
        {
          title: '税号',
          key: 'CODE_TS',
          width: 120
        },
        {
          title: '货物名称',
          key: 'G_NAME',
          width: 120
        },
        {
          title: '关税完税价格',
          key: 'DUTY_VALUE',
          width: 120
        },
        {
          title: '增值税完税价格',
          key: 'TAX_VALUE',
          width: 120
        },
        {
          title: '合同号',
          key: 'CONTR_NO',
          width: 120
        },
        {
          title: '关税税款金额',
          key: 'REAL_DUTY',
          width: 120
        },
        {
          title: '预算级次',
          key: 'SUBJECT_LEVEL',
          width: 120
        },
        {
          title: '科目',
          key: 'SUBJECT_NAME',
          width: 120
        },
        {
          title: '收款国库',
          key: 'BANK_NAME',
          width: 120
        },
        {
          title: '申请单位编号',
          key: 'AGENT_CODE',
          width: 120
        },
        {
          title: '收入系统',
          key: 'INCOME_SYS',
          width: 120
        },
        {
          title: '报关单',
          key: 'ENTRY_ID',
          width: 120
        },
        {
          title: '收款单位',
          key: 'BANK_ACCOUNT',
          width: 120
        },
        {
          title: '填报日期',
          key: 'P_DATE',
          width: 120
        },
        {
          title: '名称',
          key: 'PAYER_BANK_NAME',
          width: 120
        },
        {
          title: '账号',
          key: 'PAYER_ACCOUNT_NO',
          width: 120
        },
        {
          title: '交款期限',
          key: 'P_LIMIT',
          width: 120
        },
        {
          title: '单位',
          key: 'UNIT_1',
          width: 120
        }
      ]
    }
  },

  methods: {
    ...mapActions('portSearch', [
      'costomSearchBack',
      'costomDownload'
    ]),
    async search () {
        this.$Spin.show();
      // console.log(this.selectDateObj);
      await this.costomSearchBack(this.selectDateObj)
        this.$Spin.hide();
    },
    async exportData () {
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
      let res = await this.costomDownload(this.selectDateObj)
      this.$Spin.hide()

      let url = window.URL.createObjectURL(new Blob([res]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '海关税单下载数据.xls')

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    picker (dateStrArr, dateObj) {
      // { startDate, endDate }
      // console.log(dateStr);
      let startDate = dateStrArr[0].replace(/\-/g, ''),
          endDate = dateStrArr[1].replace(/\-/g, '')
      // console.log({ startDate, endDate });
      this.selectDateObj = { startDate, endDate }
    },
  },

  computed: {
    ...mapState('portSearch', {
      list: state => state.costomBackList
    }),
    exportDisable () {
      if (this.list.length > 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped="">
</style>
