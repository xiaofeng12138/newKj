<template>
  <div class="agreements" >
       
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:30px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.invoiceNo" size="large" placeholder="请输入发票编号" clearable style="width: 25%;margin-right:30px"></Input>
        <div class="btnBox">
            <Button type="primary" size='large' long @click="query">查询</Button>
        </div>
        <Table  :columns="columns1" :data="data1" class="self"></Table>
         <Page :total="totalCount" v-if="totalCount" 
          :page-size='20'
           @on-change='pageChange'
            show-total style="float:right;margin-top:20px"></Page>
  </div>
</template>
<script>
import Tablepdf from "@/components/tablePdf";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { fromate, getNextTime } from "@/until/fromTime";
export default {
  name: "bill",
  components: {
    Tablepdf
  },
  data() {
    return {
      filed: {
        head: [
          { key: "InvoiceNo", value: "发票号" },
          { key: "ReferenceNo", value: "企业参考号" },
          {
            key: "SellerCompanyCodeVAT",
            value: "第一境外公司代码(境外企业纳税识别号VAT number)"
          },
          { key: "SellerCountryISOCode", value: "外方国家代码(ISO)" },
          { key: "SellerCountryZHCode", value: "外方国家中国海关代码" },
          { key: "CNCompanyCode", value: "中方公司代码(企业信用代码)" },
          { key: "ContractNO", value: "合同编号" },
          { key: "InvoicePrice", value: "发票总金额" },
          { key: "DetailAmount", value: "明细金额" },
          { key: "TransportCost", value: "运输费用金额" },
          { key: "InsuranceCost", value: "保险费用金额" },
          { key: "Currency", value: "货币种类" },
          { key: "CurrencyZH", value: "货币种类中国海关标准" },
          { key: "InvoiceDate", value: "发票日期" },
          {
            key: "InvoiceType",
            value:
              "发票种类代码（1商业发票，2详细发票，3证实发票，4收妥发票，5厂商发票，6形式发票或称预开发票，7样品发票，8领事发票，9寄售发票，10海关发票，11其他发票）"
          },
          { key: "InvoiceTypeDetail", value: "发票种类详细" },
          { key: "IBAN", value: "银行账号" },
          { key: "BICSwift", value: "银行识别码" },
          { key: "Bank", value: "银行名称" },
          { key: "TransportMode", value: "运输方式" },
          { key: "OceanVessel", value: "运输工具名称" },
          { key: "VoyageNo", value: "航班航次编号" },
          { key: "BillNo", value: "提运单号" }
        ],
        bodyHead: {
          body1: [
            { key: "INVOICENO", value: "发票号" },
            {
              key: "SELLERCOMPANYCODEVAT",
              value: "第一境外公司代码(境外企业纳税识别号VAT number)"
            },
            { key: "ITEM", value: "项号" },
            { key: "MATERIALNO", value: "物料编号" },
            { key: "OTHRECOSTS", value: "发票附加费用" }
          ]
        },
        body: [
          { key: "SellerOrderASN", value: "销售订单编号（或者ASN号）" },
          { key: "SOorASN", value: "销售订单号种类，（1=销售订单号 2=ASN号）" },
          { key: "PurchaseOrderNO", value: "采购订单编号" },
          { key: "TotalPrice", value: "总价" },
          { key: "ExchangeRate", value: "汇率（外币对人民币）（单位1)" },
          { key: "GoodsDesZH", value: "商品中文描述" },
          { key: "GoodsDesEN", value: "商品英文描述" },
          { key: "OriginCountryCode", value: "原产国海关代码" },
          { key: "OriginCountryISOCode", value: "原产国ISO(国际标准)代码" },
          { key: "OriginCountryNameEn", value: "原产国英文名称" },
          { key: "GroupQuantity", value: "单位组数量" },
          { key: "GroupQuantityUnit", value: "单位组数量单位" },
          { key: "Quantity", value: "每单位数量" },
          { key: "QuantityUnit", value: "每单位数量的单位" },
          { key: "GroupWeight", value: "单位组重量" },
          { key: "GroupWeightUnit", value: "单位组重量单位" },
          { key: "Weight", value: "每单位重量" },
          { key: "WeightUnit", value: "每单位重量的单位" },
          { key: "GroupNetWeight", value: "单位组净重" },
          { key: "GroupNetWeightUnit", value: "单位组净重重量单位" },
          { key: "NetWeight", value: "净重" },
          { key: "NetWeightUnit", value: "净重重量单位" },
          { key: "GroupUnitPrice", value: "单位组单价" },
          { key: "UnitPrice", value: "单价" },
          { key: "Currency", value: "货币种类" },
          { key: "CurrencyZH", value: "货币种类中国海关标准" },
          { key: "TotalQuantity", value: "总数量" },
          { key: "TotalQuantityUnit", value: "总数量的单位" },
          { key: "HsCode", value: "商品海关编码" }
        ]
      },
      valueSelect: 1,
      time: new Date(),
      form: {
        invoiceNo: "",
        startDate: "",
        endDate: "",
        pageNum: 1,
        pageSize: 20
      },
      totalCount: null,
      columns1: [
        {
          title: "发票号",
          key: "INVOICENO"
        },
        {
          title: "发票日期",
          key: "INVOICEDATE"
        },
        {
          title: "上传时间",
          key: "CREATEDATE"
        },
        {
          title: "发票种类详细",
          key: "INVOICETYPEDETAIL"
        },
        {
          title: "中方公司代码",
          key: "content",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    margin: "5px 0"
                  }
                },
                params.row.CNCOMPANYCODE
              )
            ]);
          }
        },
        {
          title: "外方公司代码",
          key: "content2",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    margin: "5px 0"
                  }
                },
                params.row.SELLERCOMPANYCODEVAT
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 240,
          align: "center",
          render: (h, params) => {
            const that = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "large"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click() {
                      that.getdetail(
                        params.row.INVOICENO,
                        params.row.SELLERCOMPANYCODEVAT
                      );
                    }
                  }
                },
                "查看"
              ),
              h(Tablepdf, {
                props: {
                  UUID: params.row.UUID,
                  type: "invoice"
                },
                on: {
                  viewPdf: data => {
                    this.$emit("lookPDF", data);
                  }
                }
              }),
              h(
                "Poptip",
                {
                  props: {
                    confirm: "",
                    placement: "top-end",
                    title: "您确认删除这条内容吗？"
                  },
                  style: {
                    textAlign: "left"
                  },
                  nativeOn: {
                    click(e) {
                      e.stopPropagation();
                      var text = e.target.innerText.replace(/\s+/g, "");
                      if (text === "确定" || text === "ok") {
                        that.cancel(
                          params.row.INVOICENO,
                          params.index,
                          params.row.SELLERCOMPANYCODEVAT
                        );
                      }
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "large"
                      },
                      style: {
                        marginLeft: "10px"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      data1: [],
      cityList: [
        {
          value: 1,
          label: "及前一个月内"
        },
        {
          value: 2,
          label: "及前两个月内"
        },
        {
          value: 3,
          label: "及前三个月内"
        }
      ]
    };
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      var { startDate, endDate } = getNextTime(this.time, this.valueSelect);
      this.form.startDate = startDate;
      this.form.endDate = endDate;

      this.form.pageNum = 1;
      this.getLists();
    },
    pageChange(page) {
      this.form.pageNum = page;
      this.getLists();
    },
    getLists() {
      publicInter(interfaceUrl.InvoiceList, this.form).then(r => {
        r.list.forEach(item => {
          item.CREATEDATE = fromate(`${item.CREATEDATE}`);
        });
        this.data1 = r.list;
        this.totalCount = r.totalRow;
      });
    },
    getdetail(id, vat) {
      publicInter(interfaceUrl.InvoiceDetail, {
        invoiceNo: id,
        sellerCompanyCodeVAT: vat
      }).then(r => {
        this.$emit("showDetail", {
          title: "发票详情",
          data: r,
          key: this.filed
        });
      });
    },
    cancel(id, index, vat) {
      publicInter(interfaceUrl.delInvoice, {
        invoiceNo: id,
        sellerCompanyCodeVAT: vat
      }).then(r => {
        if (r && r.code === "200") {
          this.data1.splice(index, 1);
          this.$Message.success("删除成功！");
          this.totalCount--;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.agreements {
  button {
    background-color: rgb(0, 80, 141);
  }
  min-height: 350px;
  padding-left: 1px;
  .btnBox {
    display: inline-block;
    width: 150px;
  }
  .ivu-table-wrapper {
    margin-top: 30px;
  }
}
</style>


