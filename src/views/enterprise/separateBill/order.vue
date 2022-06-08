<template lang="html">
  <div class="">
    <Row style="margin-bottom:10px;">当前提单号：{{billNo}}</Row>

    <Row class="">
        <Col span="5" style="padding-right:10px;">

        <div class="fapiaoBtn" style="margin-bottom:10px;">
          <div class="buttonGroup" v-if="this.status==='已关联'">
            <!-- <Button type="info" style="flex:1;margin-right:2px;" @click="goBack">上一步</Button> -->
            <Button long type="success" style="flex:1" @click="nextStep">下一步</Button>
          </div>
          <div class="" v-else>
            <Button long type="success" @click="confirm" :disabled="disableStatus">确认提交</Button>
          </div>
        </div>
          <!-- 订单 -->
          <Table
            height="480"
            :columns="columnsOrder"
            :data="(this.status === '未关联' ? pureOrderList : pureOrderListYGL)"
            highlight-row
            @on-selection-change='orderAll'
            @on-row-click="orderClick">
          </Table>
        </Col>
        <Col span="19">
          <!-- 物料 -->
          <Table
            height="522"
            ref="selection"
            :columns="columnsMaterial"
            :data="(this.status === '未关联' ? dataMaterial : dataMaterial)"
            size="small"
            @on-selection-change="wuliaoSelection">
          </Table>
        </Col>
    </Row>

    <Modal
        v-model="modalCount"
        @on-ok="materialClick('count')"
        @on-cancel="">
        <Input :value="cachedModifyValue" @on-blur="modalInput($event,'count')" :autofocus="true" placeholder="请输入数量...." />
    </Modal>

    <Modal
        v-model="modalUnit"
        @on-ok="materialClick('unit')"
        @on-cancel="">
        <Input :value="cachedModifyValue" @on-blur="modalInput($event,'unit')" :autofocus="true" placeholder="请输入单价...." />
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      columnsOrder: [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '订单号',
            key: 'PURCHASEORDERNO'
        }
      ],
      columnsMaterial: [
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
              title: '物料编号',
              key: 'MATERIALNO',
              width: 100
          },
          {
              title: '名称',
              key: 'GOODSDESZH'
          },
          {
              title: '数量',
              key: 'TOTALQUANTITY'
          },
          {
              title: '单位',
              key: 'TOTALQUANTITYUNIT',
              width: 70
          },
          {
            title:'项号',
            key:'ITEM'
          },
          {
            title: '单价',
            key: 'UNITPRICE',
            width: 70
          },
          {
              title: '总金额',
              key: 'TOTALPRICE'
          },
          {
              title: '币制',
              key: 'CURRENCY',
              width: 70
          },
          {
                title: '修改',
                key: 'action',
                width: 130,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                disabled: ((this.status==='已关联'|| this.dingdan === 'no')?true:false)
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                  // console.log(params.index);
                                  this.materialIndex = params.index
                                  this.modalCount = true
                                }
                            }
                        }, '数量'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small',
                                disabled: ((this.status==='已关联' || this.dingdan === 'no')?true:false)
                            },
                            on: {
                                click: () => {
                                    // this.remove(params.index)
                                    this.materialIndex = params.index
                                    this.modalUnit = true
                                }
                            }
                        }, '单价')
                    ]);
                }
            }
      ],

      billNo: '',
      orderIndex: '',
      cachedModifyValue: '',
      modalCount: false,
      modalUnit: false,
      status: '',
        dingdan:"",
        disableStatus:false
    }
  },
  methods: {
    ...mapActions('bill', [
      'getOrderList',
      'getMaterialList',
      'modifyMaterialListData',
      'materialCheckBox',
      'submitMergeRelationShip',
      'getOrderListYGL',
      'isOrderType',
      'selectOrderAll'
    ]),
    orderAll(selection){
      // console.log(this.dingdan,selection)
      if(this.dingdan==='yes'){
         this.selectOrderAll(selection)
      }
    },
    orderClick (row, idx) {
      this.orderIndex = idx
      this.getMaterialList({idx: idx, status: this.status,dingDan:this.dingdan})
    },
    confirm(){
      if(this.dingdan){
        var msg=''
        this.confirmMsg.msg.forEach(val => {
          msg+='<br>'+val
        });
        this.$Modal.confirm({
            title: '信息确认',
            content: `<p>${this.confirmMsg.count||'是否确认提交'}${msg}</p>`,
            onOk:()=>{
              this.guibing()
            }
        })
      }else{
        this.guibing()
      }
    },
    materialClick (type) {
      //console.log(this.orderIndex)
      if (!this.orderIndex >= 0&&this.cachedModifyValue>0&&!isNaN(this.cachedModifyValue)) {
        if(type==='count'){
          this.cachedModifyValue=parseInt(this.cachedModifyValue)
        }
        this.modifyMaterialListData({
          orderIndex: this.orderIndex,
          materialIndex: this.materialIndex,
          type,
          value: this.cachedModifyValue
        })
        this.cachedModifyValue = ''
      }
    },
    modalInput (e,type) {
      // console.log(e.target.value,type)
      if(!isNaN(e.target.value)&&e.target.value>0){
        this.cachedModifyValue = e.target.value
      }else{
        this.$Message.error('请输入大于零的数字！')
      }   
    },
    wuliaoSelection (selection) {
      // console.log(selection,this.orderIndex);

      let arr = selection.reduce((acc, curr) => {
        acc.push({ materialIndex: curr['_index'], count: curr['QUANTITY']})
        return acc
      }, [])
      // console.log(arr)
      if (this.orderIndex >= 0) {
        this.materialCheckBox({ orderIndex: this.orderIndex, materialArr: arr })
      } else {
        console.log('no current order index....');
      }
    },
    async guibing () {
      if(this.$route.params.air=='yes'){
          var res = await this.submitMergeRelationShip({billNo:this.billNo,air:'yes'})
      }else{
        var res = await this.submitMergeRelationShip({billNo:this.billNo})
      }
     
      // console.log(res);
      if (res.code === '200') {
        this.instance('success', res.msg)
      } else {
        this.instance('error', res.msg)
      }
    },
    nextStep () {
      this.$router.push({ name: 'result', params: {billNo: this.billNo} })
    },

    instance (type, msg) {
        const title = '提交结果';
        const content = msg;
        switch (type) {
            case 'info':
                this.$Message.info(content);
                break;
            case 'success':
                let _this = this
                this.$Message.success(content)
                if(this.$route.params.air=='yes'){
                      _this.$router.push({ name: 'result', params: {billNo: _this.billNo,air:'yes'} })
                }else{
                       _this.$router.push({ name: 'result', params: {billNo: _this.billNo} })
                }
               
                break;
            case 'warning':
                this.$Message.warning(content);
                break;
            case 'error':
                this.$Message.error(content);
                break;
        }
    },

    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState('bill', {
      dataMaterial: state => state.materialList,
      dataMaterialYGL: state => state.materialListYGL
    }),
    ...mapGetters('bill', [
      'pureOrderList',
      'pureOrderListYGL',
      'confirmMsg'
    ])
  },
  mounted () {
     console.log(this.$route.params,'ggggg');
    this.billNo = this.$route.params.code
    this.status = this.$route.params.status
      this.dingdan = this.$route.params.dingdan
      // console.log(this.dingdan)
      this.isOrderType(this.dingdan)
    if (this.status === '未关联') { // 未关联
        if(this.$route.params.air=='yes'){
            var  req = this.getOrderList({billNo: this.billNo,dingDan:this.dingdan,air:'yes'});
        }else{
          var req = this.getOrderList({billNo: this.billNo,dingDan:this.dingdan});
        }
        req.then(r=>{
            if(r && r['code']=='500' && this.dingdan === "no"){
                let msg = "";
                //r.msg==1是订单，2是发票
                if(r.msg == "1"){
                    msg = '<p>'+r.errMsg+'</p><p>请去上传订单</p>'
                }
                else if(r.msg == "2"){
                    msg = '<p>'+r.errMsg+'</p><p>请去上传发票或者手工选择订单</p>'
                }
                this.$Modal.confirm({
                    title: '',
                    content: msg,
                    onOk: () => {
                        this.$router.push({
                            name: 'ERPInformationUpload',
                            params:{
                                name: r.msg =="1"?'name3':'name4'
                            }

                        })
                    },
                    onCancel: () => {
                        this.disableStatus = true;
                    }
                });
            }
        })


    } else if (this.status === '已关联') {
      this.getOrderListYGL({ billNo: this.billNo })
    }
  }
}
</script>

<style lang="scss" scoped="">
.searchWrapper {
  bottom: 10px;
}
.fapiao {
  padding-left: 4px;
}
.buttonGroup {
  display: flex;
}
</style>
