<template lang="html">
  <div class="">
      <h1 style="padding-bottom: 20px;">海运提单订单物料关联1</h1>
      <Row class="row-select" type="flex" align="middle">
        <Col span="8">
          <Input v-model="inputValue">
            <Select v-model="selectType" slot="prepend" style="width:100px;">
                <Option value="billNo">提单号</Option>
                <Option value="referenceNo">企业关联号</Option>
            </Select>
          </Input>
        </Col>
        <Col span="5" style="margin-left:10px;">
          <DatePicker
            type="daterange"
            placement="bottom-end"
            placeholder="请选择预计到港时间"
            style="width:100%;"
            @on-change="datePicker">
          </DatePicker>
        </Col>

        <Col span="4" style="margin-left:10px;">
          <RadioGroup v-model="status">
              <Radio label="已关联"></Radio>
              <Radio label="未关联"></Radio>
          </RadioGroup>
        </Col>
        <Col span="2">
          <Button type="primary" @click="searchTidan">搜索提单</Button>
        </Col>

      </Row>

      <Table
        style="margin-top:20px;"
        :columns="columnsTidan"
        :data="dataTidan"
        @on-row-click="tidanClick">
      </Table>
      <!--<Modal v-model="myModel1" width="300px" :closable="false">-->
          <!--<h3 style="margin-bottom: 20px;width: 100%;text-align: center">请选择关联方式</h3>-->
          <!--<div style="width: 100%;text-align: center">-->

              <!--<Button type="primary" style="margin-right: 10px;width: 120px;" @click="dingdan('no')">-->
                  <!--发票自动关联-->
              <!--</Button>-->
              <!--<Button type="primary" style="margin-right: 10px;width: 120px;" @click="dingdan('yes')">-->
                  <!--订单手动关联-->
              <!--</Button>-->
          <!--</div>-->
          <!--<div slot="footer">-->

          <!--</div>-->
      <!--</Modal>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      status: '未关联',
      selectDateObj: {},
      selectType: 'billNo',
      inputValue: '',
      myModel1:false,
      BILL_NO:"",
      _status:"",
      columnsTidan: [
          {
              title: '提单号',
              key: 'BILL_NO',
          },
          {
              title: '船名',
              key: 'VSL_REF'
          },
          {
              title: '航次',
              key: 'DECLARED_VOY_REF'
          },
          {
            title: '预计到港时间',
            key: 'BERTH_ARR_DT_GMT'
          },
          {
              title: '当前状态',
              key: 'statusFront'
          },
          {
              title: '当前状态时间',
              key: 'REC_UPD_DT'
          },
          {
              title: '操作',
              key: 'action',
              width: 200,
              align: 'center',
              render: (h, params) => {
                  let _this = this
                  if (params.row._status === '2') { // 未关联
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                            },
                            style:{
                                'margin-bottom':'2px',
                                'margin-top':'2px'
                            },
                            on: {
                                click: () => {
                                  // console.log(params);
                                   // this.myModel1 = true;
                                    this.BILL_NO = params['row']['BILL_NO'];
                                    this._status = params['row']['_status'];
                                    this.dingdan('no');
                                    // this.$router.push({
                                    //     name: 'order',
                                    //     params: {
                                    //         code: params['row']['BILL_NO'],
                                    //         status: params['row']['_status']==='1'?'已关联':'未关联'
                                    //     }
                                    // })

                                }
                            }
                        }, '发票自动关联'),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style:{
                                'margin-bottom':'2px'
                            },
                            on: {
                                click: () => {
                                    // console.log(params);
                                    // this.myModel1 = true;
                                    this.BILL_NO = params['row']['BILL_NO'];
                                    this._status = params['row']['_status'];
                                    this.dingdan('yes');
                                    // this.$router.push({
                                    //     name: 'order',
                                    //     params: {
                                    //         code: params['row']['BILL_NO'],
                                    //         status: params['row']['_status']==='1'?'已关联':'未关联'
                                    //     }
                                    // })

                                }
                            }
                        }, '订单手动关联')
                    ]);
                  } 
                  else {
                    return h('div', {style:{'text-align':'left'}},[
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style:{
                                'margin-right':'2px',
                                display:(params.row.ACTION === "I3" || params.row.ACTION === "I4")?"none":'inline-block'
                            },
                            on: {
                                click: () => {
                                    switch (params.row.ACTION) {
                                        case "I":
                                            this.$router.push({
                                                name: 'result',
                                                params: {
                                                    code: params['row']['BILL_NO'],
                                                    billNo:params['row']['BILL_NO'],
                                                    status: params['row']['_status']==='1'?'已关联':'未关联'
                                                }
                                            })
                                            break;
                                        case "I2":
                                            //已委托状态：报关单预览
                                            if(params.row.ISENTRUST == "1"){
                                                this.$router.push({
                                                    name: 'baoguanSearch',
                                                    params: {
                                                        billNo: params['row']['BILLNO'],
                                                        name:'bill'
                                                    }
                                                })
                                            }
                                            else{
                                                this.$router.push({
                                                    name: 'sort',
                                                    params: {
                                                        billNo: params['row']['BILL_NO']
                                                    }
                                                })
                                            }
                                            break;
                                        case "I1":
                                            this.$router.push({
                                                name: 'sort',
                                                params: {
                                                    billNo: params['row']['BILL_NO'],
                                                    reSortDisabled:true
                                                }
                                            })
                                            break;
                                    }

                                }
                            }
                        }, '查看'),
                        h('Button',{
                            props:{
                                type:'primary',
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.setDismantBillNo(params.row.BILL_NO);
                                    this.$router.push({
                                        name: 'dismantling'
                                    })
                                }
                            },
                            style:{
                                'margin-right':'2px',
                                display:((params.row.ACTION === 'I' || params.row.ACTION === 'I3') && !params.row.ISENTRUST)?"inline-block":'none'
                            }
                        },'拆单'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style:{
                                
                            },
                            on: {
                                async click () {
                                  let r = await _this.delOrderYGL({ BILLNO: params['row']['BILL_NO'] })
                                  await _this.searchTidan()
                                    if(r.msg){
                                        _this.$Message.warning({content:r.msg,duration:5})
                                    }
                                }
                            }
                        }, '删除')
                    ]);
                  }
              }
          }
      ]
    }
  },
  computed: {
    ...mapState('bill', {
      dataTidan: state => state.billList
    })
  },
  methods: {
    ...mapActions('bill', [
      'getBillList',
      'resetBillList',
      'delOrderYGL',
      'getOrderList',
      'setDismantBillNo'
    ]),
    datePicker (dateStrArr, dateObj) {
      // { startDate, endDate }
      // console.log(dateStr);
      let startDate = dateStrArr[0].replace(/\-/g, ''),
          endDate = dateStrArr[1].replace(/\-/g, '')
      // console.log({ startDate, endDate });
      this.selectDateObj = { startDate, endDate }
    },
    async searchTidan () {
      let status = (this.status === '已关联') ? '1' : '2',
          param = {
            type: this.selectType,
            value: this.inputValue,
            startDate: this.selectDateObj['startDate'],
            endDate: this.selectDateObj['endDate'],
            status,
            showChaiDanBl:status==="1"?"true":""
          };

      //根据status的不同对数组进行显示隐藏"状态"列
      let json1 =  {title: '状态',key: 'statusFront'};
      let json2 = {title: '当前状态时间',key: 'REC_UPD_DT'};
      if(status == "1"){
          if(JSON.stringify(this.columnsTidan).indexOf(json1.key) == -1){
              this.columnsTidan.splice(4,0,json2)
              this.columnsTidan.splice(4,0,json1)
          }
      }
      else{
          if(JSON.stringify(this.columnsTidan).indexOf(json1.key) != -1){
              this.delStatusFromColumns(this.columnsTidan,json1);
              this.delStatusFromColumns(this.columnsTidan,json2);
          }
      }

      this.$Spin.show();
      await this.getBillList(param)
      this.$Spin.hide();
    },
      dingdan(dingdanStatus){
          let req = this.getOrderList({billNo: this.BILL_NO,dingDan:dingdanStatus});
          req.then(r=>{
              if(r && r['code']=='500' ){
                  if(dingdanStatus === "no"){
                      let msg = "";
                      //r.msg==1是订单，2是发票
                      if(r.msg == "1"){
                          msg = '<p>'+r.errMsg+'</p><p>请上传订单</p>'
                      }
                      else if(r.msg == "2"){
                          msg = '<p>'+r.errMsg+'</p><p>请上传发票或者手动选择订单</p>'
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
                          }
                      });
                  }

              }
              else if(r && r['code']=='200' && r.result.length == 0){
                  this.$Message.warning({
                      content:'未上传订单,请去上传订单',
                      duration:3
                  });
              }
              else{
                  this.$router.push({
                      name: 'order',
                      params: {
                          code: this.BILL_NO,
                          status: this._status==='1'?'已关联':'未关联',
                          dingdan:dingdanStatus
                      }
                  })
              }
          })

      },
    tidanClick (data, idx) {
      // console.log(data);
    },
    delStatusFromColumns(columnsTidan,json1){
        for(let i = 0 ; i < columnsTidan.length; i++){
            if(columnsTidan[i].key == json1.key){
                columnsTidan.splice(i,1);
            }
        }
    }
  },
  mounted () {
      if(this.$route.params.status){
          this.status = this.$route.params.status;
      }
      else{
          this.resetBillList()
      }

  }
}
</script>

<style lang="scss">
</style>
