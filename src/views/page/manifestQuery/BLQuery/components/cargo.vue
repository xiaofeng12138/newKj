<template >
<div class="cargo">
  <Table width="" border :columns="columns" :data="cargoData"></Table>
  <Modal
      v-model="showModel"
      title="更多信息"
      width="1000"
      cancel-text=""
      :closable="false">
      <Row class="maitouRow">
          <Col class="col-left" span="4">唛头</Col>
          <Col class="col-right" span="20">{{maitouData }}</Col>
      </Row>
       <Row class="maitouRow" style="border">
          <Col class="col-left" span="4" style="height:61px;line-height:60px;">货物英文描述</Col>
          <Col class="col-right" span="20" style="height:auto;text-align:justify;padding:5px 10px;line-height:25px;border-left:1px solid #f8f8f9;">{{ detail }}</Col>
      </Row>
      <Row class="maitouRow" style="border">
          <Col class="col-left" span="4" style="height:61px;line-height:60px;">货物简要中文描述</Col>
          <Col class="col-right" span="20" style="height:auto;text-align:justify;padding:5px 10px;line-height:25px;border-left:1px solid #f8f8f9;">{{ DESC_CN }}</Col>
      </Row>
       <Row class="maitouRow" style="border">
          <Col class="col-left" span="4" style="height:61px;line-height:60px;">货物具体中文描述</Col>
          <Col class="col-right" span="20" style="height:auto;text-align:justify;padding:5px 10px;line-height:25px;border-left:1px solid #f8f8f9;">{{ FULL_DESC_CN }}</Col>
      </Row>
      <Table v-if="isDanger" width="" border :columns="columnsDanger" :data="dangerTable"></Table>
      <div class="" v-if="isRF">
        <div class="spanTitle">冷藏品</div>
        <Table width="" border :columns="columnsRF" :data="rfTable"></Table>
      </div>
      <div class="" v-if="isAW">
        <div class="spanTitle">大件货物</div>
        <Table width="" border :columns="columnsAW" :data="awTable"></Table>
      </div>
  </Modal>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

      showModel: false,
      showModelIndex: '',

      columns: [
        {
          title: '序号',
          key: 'num',
          // width: 100,
          // fixed: 'left'
        },
        {
          title: '货物序号',
          key: 'SEQ_NUM',
          // width: 100,
          // fixed: 'left'
        },
        {
          title: '货物描述',
          key: 'DESC',
          // width: 100
        },
        {
          title: '总重量',
          key: 'GROSS_WT',
          // width: 100
        },
        {
          title: '总重量单位',
          key: 'GROSS_WT_UNIT',
          // width: 100
        },
        {
          title: '件数',
          key: 'QTY',
          // width: 100
        },
        {
          title: '件数单位',
          key: 'CGO_PACKAGING_CDE',
          // width: 100
        },
        {
          title: '体积',
          key: 'VOL',
          // width: 100
        },
        {
          title: '体积单位',
          key: 'VOL_UNIT',
          // width: 100
        },
        {
          title: '更多信息',
          key: 'MORE_INFO',
          align: 'center',
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      style: {
                          marginRight: '5px'
                      },
                      on: {
                          click: () => {
                              // this.show(params.index)
                              // if (this.cargoData[params.index]['CUSTOMS_BL_CARGO_MARKS_AND_NUM']) {
                              //   this.showModel = true
                              //   this.showModelIndex = params.index
                              // }
                              this.showModel = true
                              this.showModelIndex = params.index
                          }
                      }
                  }, '查看')
              ]);
          }
          // width: 100
        }
      ],

      columnsDanger: [
        {
          title: '危险品UN_NO',
          key: 'UN_NO'
        },
        {
          title: '危险品分类代码',
          key: 'IMDG_CLASSIFICATION'
        },
        {
          title: '危险品名称',
          key: 'PROPER_SHP_NME'
        },
        {
          title: 'Technicle name',
          key: 'TECH_NME'
        },
        {
          title: '联系人',
          key: 'CONTACTOR'
        }
      ],

      columnsRF: [
        {
          title: '温度',
          key: 'TEMPR'
        },
        {
          title: '温度单位',
          key: 'TEMPR_UNIT'
        }
      ],

      columnsAW: [
        {
          title: '宽度',
          key: 'WIDTH'
        },
        {
          title: '宽度单位',
          key: 'WIDTH_UNIT'
        },
        {
          title: '高度',
          key: 'HEIGHT'
        },
        {
          title: '高度单位',
          key: 'HEIGHT_UNIT'
        },
        {
          title: '长度',
          key: 'LENGTH'
        },
        {
          title: '长度单位',
          key: 'LENGTH_UNIT'
        }
      ]
    }
  },

  computed: {
    ...mapState('search', {
      cargoData: state => {
        return state.cargoData.map((item,i) => {
          item.num=i+1
          // console.log(item);
          return item
        })
      }
    }),

    // 唛头数据
    maitouData () {
      if (!this.cargoData[this.showModelIndex]) { return }
      let arr = this.cargoData[this.showModelIndex]['CUSTOMS_BL_CARGO_MARKS_AND_NUM'], str = ''

      if (arr && arr.length > 0) {
        arr.forEach((item, idx) => {
          str = str + item['MARKS_AND_NUM']
        })
      }

      return str
    },
    //货物英文描述
    detail(){
      if (!this.cargoData[this.showModelIndex]) { return }
      return this.cargoData[this.showModelIndex]['FULL_DESC']
    },
    // 货物简要中文描述
    DESC_CN(){
      if (!this.cargoData[this.showModelIndex]) { return }
      return this.cargoData[this.showModelIndex]['DESC_CN']
    },
    // 货物具体中文描述
    FULL_DESC_CN(){
      if (!this.cargoData[this.showModelIndex]) { return }
      return this.cargoData[this.showModelIndex]['FULL_DESC_CN']
    },

    // 危险品数据表格
    dangerTable () {
      if (!this.cargoData[this.showModelIndex]['CUSTOMS_BL_DG']) { return [] }

      return this.cargoData[this.showModelIndex]['CUSTOMS_BL_DG'].map(item => {
        // console.log(item);
        return item;
      })
    },

    // 是否是危险品
    isDanger () {
      if (!this.cargoData[this.showModelIndex]) return

      if (this.cargoData[this.showModelIndex]['IS_DG'] === 0) {
        return false
      } else {
        return true
      }
    },

    // 冷藏品表格数据
    rfTable () {
      if (!this.cargoData[this.showModelIndex]) return
      let obj = this.cargoData[this.showModelIndex]
      return [obj]
    },

    // 是否显示冷藏品表格
    isRF () {
      if (!this.cargoData[this.showModelIndex]) return
      if (this.cargoData[this.showModelIndex]['IS_RF'] === 0) {
        return false
      } else {
        return true
      }
    },

    // 是否显示大件
    isAW () {
      if (!this.cargoData[this.showModelIndex]) return
      if (this.cargoData[this.showModelIndex]['IS_AW'] === 0) {
        return false
      } else {
        return true
      }
    },

    // 大件货物数据表格
    awTable () {
      if (!this.cargoData[this.showModelIndex]) return
      let obj = this.cargoData[this.showModelIndex]
      console.log(obj)
      return [obj]
    }
  },

  methods: {
    // show (index) {
    //   this.showModel = true
    // }
  }
}
</script>

<style lang="scss" scoped>
.maitouRow {
  margin-bottom: 20px;
}

.spanTitle {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}

.col-left {
  border: 1px solid #dddee1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  background-color: #f8f8f9;
}

.col-right {
  border: 1px solid #dddee1;
  border-left: none;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
</style>
