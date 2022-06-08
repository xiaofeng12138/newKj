<template>
    <div>
        <h1>进口食品化妆品货物清单</h1>
        <Row>
            <Col :xs="24" :sm="14" :md="12" :lg="7" class="costom-col">
                <b>过检商品类型:</b>
                <Select
                    style="max-width:55%"
                    placeholder="请选择过检商品类型"
                    v-model="parmas.goodsType"
                    size="large"
                >
                    <Option value="01">动物源性食品</Option>
                    <Option value="02">植物源性食品、加工食品和食品添加剂</Option>
                    <!-- <Option value="2">加工食品</Option> -->
                    <Option value="03">化妆品</Option>
                </Select>
            </Col>
            <Col :xs="24" :sm="14" :md="12" :lg="8" class="costom-col">
                <b>品名:</b>
                <Input
                    style="max-width:55%"
                    placeholder="请输入品名"
                    v-model="parmas.goodsName"
                    size="large"
                 />
            </Col>
            <Col :xs="24" :sm="12" :md="12" :lg="6" class="costom-col">
                <b>报关单号:</b>
                <Input v-model="parmas.entryId" placeholder="请输入报关单号" size="large" type="text" />
            </Col>
            <Col :xs="24" :sm="6" :md="4" :lg="3" class="costom-col">
                <Button type="primary" size="large" long @click="queryList">查询</Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="data" class="self" style="margin-top:1rem;" :row-class-name="rowClassName"></Table>
        <div>
            <Page
                :total="total"
                v-if="total"
                :page-size="20"
                style="float:right;margin-top:16px"
                @on-change="pageNumChange"
            ></Page>
            <Button
                style="float:right;margin:16px 16px 0 0"
                type="primary"
                size="large"
                @click="typeJudge"
            >添加一行</Button>
        </div>
        <Modal v-model="modelShow" width="850" :mask-closable="false">
            <div slot="header">
                <span style="font-size:1.2rem;font-weight:600">编辑内容</span>
            </div>
            <div style="padding:10px 20px 0 0" class="goods-list-enter">
                <Form ref="formCustom" :model="addValue" :rules="ruleCustom" :label-width="180">
                    <Row>
                        <Col style="color:red">货物清单</Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="进口商" prop="CONSIGNEE_CNAME">
                                <Input type="text" v-model="addValue.goods.CONSIGNEE_CNAME" size="large" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="货物序号" prop="GNO">
                                <Input type="number" v-model="addValue.goods.GNO" size="large" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="报检号" prop="ENT_DECL_NO">
                                <Input size="large" type="text" v-model="addValue.goods.ENT_DECL_NO" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="报关单号" prop="ENT_ENTRY_ID">
                                <Input type="text" size="large" v-model="addValue.goods.ENT_ENTRY_ID" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="品牌" prop="TYPE">
                                <Input type="text" size="large" v-model="addValue.goods.TYPE" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="品名" prop="GOODS_NAME">
                                <Input type="text" size="large" v-model="addValue.goods.GOODS_NAME" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="原产地" prop="ORIG_PLACE_CODE">
                                <Input type="text" size="large" v-model="addValue.goods.ORIG_PLACE_CODE" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="最小销售单元数量" prop="WEIGHT">
                                <Input type="number" size="large" v-model="addValue.goods.WEIGHT" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="最小销售单元计量单位" prop="WEIGHTUNIT2">
                                <Input type="text" size="large" v-model="addValue.goods.WEIGHTUNIT2" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="最小销售单元规格" prop="SMALL_GOODS_MODEL">
                                <Input
                                    type="text"
                                    size="large"
                                    v-model="addValue.goods.SMALL_GOODS_MODEL"
                                 />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="生产日期" prop="PRODUCE_DATE">
                                <Input type="date" size="large" v-model="addValue.goods.PRODUCE_DATE" />
                                <!-- <DatePicker type="date" v-model="addValue.goods.PRODUCE_DATE" format="yyyy/MM/dd" @on-change="dateChange"></DatePicker> -->
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="保质期至" prop="PROD_QGP">
                                <Input type="date" size="large" v-model="addValue.goods.PROD_QGP" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="产品批号" prop="PROD_BATCH_NO">
                                <Input type="text" size="large" v-model="addValue.goods.PROD_BATCH_NO" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="生产商" prop="ENG_MAN_ENT_CNM">
                                <Input type="text" size="large" v-model="addValue.goods.ENG_MAN_ENT_CNM" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="注册厂号" prop="MNUFCTR_REG_NO">
                                <Input type="text" size="large" v-model="addValue.goods.MNUFCTR_REG_NO" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="集装箱号" prop="CONTAINER_NO">
                                <Input type="text" size="large" v-model="addValue.goods.CONTAINER_NO" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="是否出证" prop="ISCERTED">
                                <Input type="text" size="large" v-model="addValue.goods.ISCERTED" />
                            </FormItem>
                        </Col>
                        </Row>
                        <Row>
                        <Col style="color:red">货物清单详细</Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="报关单号" prop="ENT_ENTRY_ID">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.ENT_ENTRY_ID" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="货物序号" prop="GOODS_NO">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.GOODS_NO" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="明细序号" prop="DETAIL_SERIAL">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.DETAIL_SERIAL" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="明细品名" prop="DETAIL_GOODS_NAME">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.DETAIL_GOODS_NAME" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="规格" prop="GOODS_MODEL">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.GOODS_MODEL" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="规格计量单位" prop="GOODS_MODEL_UNIT">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.GOODS_MODEL_UNIT" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="数量" prop="GOODS_QTY">
                                <Input type="number" size="large" v-model="addValue.goodsdetail.GOODS_QTY" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="生产日期" prop="PRODUCE_DATE">
                                <Input type="date" size="large" v-model="addValue.goodsdetail.PRODUCE_DATE" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="保质期至" prop="PROD_QGP">
                                <Input type="date" size="large" v-model="addValue.goodsdetail.PROD_QGP" />
                            </FormItem>
                        </Col>
                        <Col :md="24" :lg="12">
                            <FormItem label="产品批号" prop="PROD_BATCH_NO">
                                <Input type="text" size="large" v-model="addValue.goodsdetail.PROD_BATCH_NO" />
                            </FormItem>
                        </Col>
                        </Row>
                    
                </Form>
            </div>
            <div slot="footer">
                <Button size="large" @click="closeMadol">取消</Button>
                <Button type="primary" size="large" @click="saveChange">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { publicInter } from "@/api/http";
import expandRow from './expandRow.vue';
export default {
  data() {
    return {
      parmas: {
        goodsType: "01",
        goodsName: "",
        checkNum: "",
        entryId: ''
      },
      total: 0,
      ruleCustom: {},
      addValue: {
        goods: {
          CONSIGNEE_CNAME: "",
          GNO: 1,
          ENT_DECL_NO: "",
          ENT_ENTRY_ID: "",
          TYPE: "",
          GOODS_NAME: "xxx",
          ORIG_PLACE_CODE: "xxx",
          WEIGHT: 1,
          WEIGHTUNIT2: "xxx",
          SMALL_GOODS_MODEL: "xxx",
          PRODUCE_DATE: "2019/6/25",
          PROD_QGP: "2019/6/25",
          PROD_BATCH_NO: "xxx",
          ENG_MAN_ENT_CNM: "xxx",
          MNUFCTR_REG_NO: "xxx",
          CONTAINER_NO: "xxx",
          ISCERTED: "xxx",
          GOODS_BRAND: "01"
        },
        goodsdetail: {
          ENT_ENTRY_ID: "xxx",
          GOODS_NO: "xxx",
          DETAIL_SERIAL: "xxx",
          DETAIL_GOODS_NAME: "xxx",
          GOODS_MODEL: "xxx",
          GOODS_MODEL_UNIT: "xxx",
          GOODS_QTY: 110,
          PRODUCE_DATE: "2019/6/25",
          PROD_QGP: "2019/6/25",
          PROD_BATCH_NO: "xxx"
        }
      },
      components: {
          expandRow
      },
      modelShow: false,
      columns: [
        // {
        //   title: "操作",
        //   width: 180,
        //   render: (h, parmas) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "large"
        //           },
        //           style: {
        //             marginRight: "10px"
        //           },
        //           on: {
        //             click: () => {
        //               this.revise(parmas.row);
        //             }
        //           }
        //         },
        //         "修改"
        //       ),
        //       h(
        //         "Poptip",
        //         {
        //           props: {
        //             confirm: "",
        //             placement: "top-start",
        //             title: "您确认删除这条内容吗？"
        //           },
        //           style: {
        //             textAlign: "left"
        //           },
        //           on: {
        //             "on-ok": () => {
        //               this.delete(parmas.row.itemuuid);
        //             }
        //           }
        //         },
        //         [
        //           h(
        //             "Button",
        //             {
        //               props: {
        //                 type: "error",
        //                 size: "large"
        //               }
        //             },
        //             "删除"
        //           )
        //         ]
        //       )
        //     ]);
        //   }
        // },
        {
            type: 'expand',
            width:50,
            render: (h,params) => {
                console.log(params)
                return h(expandRow, {
                    props: {
                        tableData: params.row.goodsdetail
                    }
                })
            }
        },
        {
          title: "进口商名称",
          key: "CONSIGNEE_CNAME",
        },
        {
          title: "进口商社会信用代码",
          key: "ENT_DECL_NO",
        },
        {
          title: "报关单号",
          key: "ENT_ENTRY_ID"
        },
        {
          title: "上传次数",
          key: "upLoadCount"
        },
        {
          title: "是否出证",
          key: "ISCERTED"
        },
        
      ],
      data: [],
      condition: void 0,
      validatorFun: void 0
    };
  },
  beforeMount() {
    this.validatorFun = {
      notBlank: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("该字段值不能为空！"));
        } else {
          callback();
        }
      }
    };
    this.condition = new Map([
    [
        "01",
        (function() {
          return [
            "ENT_ENTRY_ID"
          ];
        })()
    ],
    [
        "02",
        (function() {
          return [
            "ENT_ENTRY_ID"
          ];
        })()
    ],
    [
        "03",
        (function() {
          return [
            "ENT_ENTRY_ID"
          ];
        })()
    ],
    //   [
    //     "0",
    //     (function() {
    //       return [
    //         "goodsName",
    //         "origPlaceCode",
    //         "goodsModel",
    //         "goodsQty",
    //         "prodBatchNo",
    //         "engManEntCnm",
    //         "mnufctrRegNo",
    //         "containerNo",
    //         "goodsBrand"
    //       ];
    //     })()
    //   ],
    //   [
    //     "1",
    //     (function() {
    //       return [
    //         "goodsName",
    //         "origPlaceCode",
    //         "goodsModel",
    //         "weight",
    //         "goodsTotal",
    //         "goodsQty",
    //         "produceDate",
    //         "prodQgp",
    //         "prodBatchNo",
    //         "engManEntCnm"
    //       ];
    //     })()
    //   ],
    //   [
    //     "2",
    //     (function() {
    //       return [
    //         "goodsName",
    //         "origPlaceCode",
    //         "goodsModel",
    //         "goodsQty",
    //         "smallGoodsModel",
    //         "smallGoodsQty",
    //         "produceDate"
    //       ];
    //     })()
    //   ],
    //   [
    //     "3",
    //     (function() {
    //       return [
    //         "goodsName",
    //         "smallGoodsName",
    //         "origPlaceCode",
    //         "goodsModel",
    //         "goodsQty",
    //         "smallGoodsModel",
    //         "smallGoodsQty",
    //         "produceDate",
    //         "prodQgp",
    //         "prodBatchNo",
    //         "prodValidDt"
    //       ];
    //     })()
    //   ]
    ]);
  },
  methods: {
    dateChange(old, newValue) {
        console.log(old, newValue)
    },
    pageNumChange(page) {
      this.queryList(page)
    },
    closeMadol() {
      this.modelShow = false;
      this.ruleCustom = {};
      this.$refs["formCustom"].resetFields();
    },
    typeJudge(id) {
      if (!id.target) {
        this.addValue = { ...id };
      } else {
        delete this.addValue.itemuuid;
      }

      if (!this.parmas.goodsType) {
        this.$Message.error("请选择过检商品类型！");
      } else {
        this.modelShow = true;
        var requiredKey = this.condition.get(this.parmas.goodsType);
        requiredKey.forEach(item => {
          this.ruleCustom[item] = [
            {
              validator: this.validatorFun.notBlank,
              trigger: "blur",
              required: true
            }
          ];
        });
      }
    },
    vaildateKey(keyName) {
      if (!this.parmas.goodsType) {
        return;
      }
      return this.condition.get(this.parmas.goodsType).includes(keyName);
    },
    saveChange() {
      var requiredKey = this.condition.get(this.parmas.goodsType),
      isTrue = true;
      requiredKey.every(item => {
        if (this.addValue.goods[item] == "" || this.addValue.goodsdetail[item] == "") {
          this.$Message.error("报关单号不能为空！");
          return (isTrue = false);
        }
      });
      this.addValue.goods.GOODS_BRAND = this.parmas.goodsType;
      if (isTrue) {
        publicInter(this.$InterfaceUrl.goodsSaveNew, {
          ...this.addValue,
        //   type: this.parmas.goodsType
        }).then(r => {
          if (r.code === "200") {
            this.$Message.success("保存成功！");
            this.modelShow = false;
          } else {
            this.$Message.error(r.msg);
          }
        });
      }
    },
    queryList(page) {
      var page = isNaN(page) ? "1" : page + "";
      if (this.parmas.goodsType) {
        publicInter(this.$InterfaceUrl.goodsListNew, {
          pageNum: parseInt(page),
          pageSize: 20,
          GOODS_BRAND: this.parmas.goodsType,
          GOODS_NAME: this.parmas.goodsName,
          ENT_ENTRY_ID: this.parmas.entryId
        }).then(r => {
        //   if (r.code === "200") {
            this.total = parseInt(r.totalRow);
            this.data = r.list;
        //   } else {
        //     this.total = 
        //     this.data = [];
        //   }
        });
      } else {
        this.$Message.error("过检商品类型必选！");
      }
    },
    revise(id) {
      if (this.parmas.goodsType) {
        this.modelShow = true;
        // this.addValue.itemuuid=id
        this.typeJudge(id);
      }

      // publicInter(this.$InterfaceUrl.goodsSave,{})
    },
    delete(id) {
      publicInter(this.$InterfaceUrl.goodsDelete, { itemuuid: id }).then(r => {
        if (r.code === "200") {
          this.$Message.success("删除成功！");
          this.queryList();
        } else {
          this.$Message.error("删除失败!");
        }
      });
    },
    rowClassName(row, index) {
      if(row.isColored == '1') {
        return 'isColored'
      }
    }
  }
};
</script>
<style lang="scss" scoped>
h1 {
  position: relative;
  padding-left: 0.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eeccee;
  &::after {
    content: "";
    width: 0.25rem;
    height: 65%;
    left: 0;
    position: absolute;
    top: 0;

    background: #00508d;
  }
}
.costom-col {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
  &.first-child {
    > div {
      max-width: 50%;
    }
  }
  > b {
    display: inline-block;
    max-width: 8rem;
    font-size: 0.9rem;
    margin-right: 0.8rem;
  }
  > div {
    max-width: 70%;
    // width: calc(100% - 9rem);
  }
}
</style>
