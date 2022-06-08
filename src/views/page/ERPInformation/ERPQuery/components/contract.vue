<template>
   <div class="agreements" >
        <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:20%" class="self"></DatePicker>
       <Select v-model="valueSelect" style="width:15%;margin-right:20px;margin-top:1.5px" size="large">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
         <Input v-model="form.agreementId" size="large" placeholder="请输入协议编号" clearable style="width: 20%;margin-right:20px"></Input>
          <Input v-model="form.contractNo" size="large" placeholder="请输入合同编号" clearable style="width: 20%;margin-right:20px"></Input>
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
import { fromate, getNextTime } from "@/until/fromTime";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  name: "contract",
  components: {
    Tablepdf
  },
  data() {
    return {
      filed: {
        head: [
          { key: "ContractNO", value: "合同编号" },
          { key: "CNCompanyCode", value: "中方公司代码(企业信用代码)" },
          { key: "AgreementID", value: "框架协议编号" },
          { key: "InCoTerm", value: "成交方式（FOB，C&I，CIF等）" },
          { key: "SignDate", value: "签约日期" },
          { key: "ValidDate", value: "到期日期" },
          { key: "CNTradeCo", value: "中方公司海关注册编号" },
          { key: "CNCompanyName", value: "中方公司名称" },
          { key: "CNCompanyNameEN", value: "中方公司英文名称" },
          { key: "CNCompanyAddress", value: "中方公司地址" },
          { key: "CNCompanyTelephone", value: "中方公司电话" },
          { key: "CNCompanyFax", value: "中方公司传真" },
          { key: "EmailAdress", value: "中方企业电子邮箱" },
          {
            key: "SellerCompanyVAT",
            value: "第一境外公司代码(境外企业纳税识别号VAT number)"
          },
          {
            key: "SellerCompanyCode",
            value: "第一境外公司代码(在中方企业系统中的编号)"
          },
          { key: "CompanyFullNameEn", value: "第一境外公司英文名称" },
          { key: "CompanyNameZH", value: "第一境外公司中文简称" },
          { key: "CompanyFullNameZH", value: "第一境外公司中文全称" },
          { key: "CountryCodeISO", value: "第一境外公司国家代码ISO(国际标准)" },
          {
            key: "CountryCodeZH",
            value: "第一境外公司国家代码（中国海关标准）"
          },
          { key: "CountryFullNameEn", value: "第一境外公司国家英文名称" },
          { key: "CountryNameZH", value: "第一境外公司国家中文简称" },
          { key: "CountryFullNameZH", value: "第一境外公司国家中文全称" },
          { key: "CompanyAddress", value: "第一境外公司地址" },
          { key: "CompanyTelephone", value: "第一境外公司电话" },
          { key: "CompanyFax", value: "第一境外公司传真" },
          { key: "CompanyEmailAdress", value: "第一境外公司电子邮箱" }
        ],
        bodyHead: {
          body1: [
            { key: "ITEM", value: "项号" },
            { key: "MATERIALNO", value: "物料编号" },
            { key: "TOTALPRICE", value: "总价" },
            { key: "GROUPWEIGHT", value: "单位组重量" },
            { key: "QUANTITY", value: "每单位数量" },
            { key: "GROUPQUANTITY", value: "单位组数量" }
          ]
        },
        body: [
          { key: "ContractNO", value: "合同编号" },
          { key: "CNCompanyCode", value: "中方公司代码(企业信用代码)" },
          { key: "GoodsDesZH", value: "商品中文描述" },
          { key: "GoodsDesEN", value: "商品英文描述" },
          { key: "GoodsModleDesc", value: "规格型号描述" },
          { key: "TotalQuantity", value: "总数量" },
          { key: "TotalQuantityUnit", value: "总数量的单位" },
          { key: "GroupQuantityUnit", value: "单位组数量单位" },
          { key: "QuantityUnit", value: "每单位数量的单位" },
          { key: "GroupWeightUnit", value: "单位组重量单位" },
          { key: "Weight", value: "每单位重量" },
          { key: "WeightUnit", value: "每单位重量的单位" },
          { key: "GroupUnitPrice", value: "单位组单价" },
          { key: "UnitPrice", value: "单价" },
          { key: "Currency", value: "货币种类" },
          { key: "CurrencyZH", value: "货币种类中国海关标准" },
          { key: "ExchangeRate", value: "汇率（外币对人民币）（单位1)" }
        ]
      },

      columns1: [
        {
          title: "协议号",
          key: "AGREEMENTID"
        },
        {
          title: "合同号",
          key: "CONTRACTNO"
        },
        {
          title: "中方公司代码和名称",
          key: "china",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    margin: "5px 0"
                  }
                },
                params.row.CNCOMPANYNAME
              ),
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
          title: "外方公司代码和名称",
          key: "outer",
          render: (h, params) => {
            return h("div", [
              h(
                "p",
                {
                  style: {
                    margin: "5px 0"
                  }
                },
                params.row.COMPANYFULLNAMEEN
              ),
              h(
                "p",
                {
                  style: {
                    margin: "5px 0"
                  }
                },
                params.row.SELLERCOMPANYVAT
              )
            ]);
          }
        },

        {
          title: "签订日期",
          key: "SIGNDATE"
        },
        {
          title: "上传时间",
          key: "CREATEDATE"
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
                      that.getdetail(params.row.CONTRACTNO);
                    }
                  }
                },
                "查看"
              ),
              h(Tablepdf, {
                props: {
                  UUID: params.row.UUID,
                  type: "contract"
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
                        that.cancel(params.row.CONTRACTNO, params.index);
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
      valueSelect: 1,
      time: new Date(),
      form: {
        agreementId: "",
        startDate: "",
        endDate: "",
        contractNo: "",
        pageNum: 1,
        pageSize: 20
      },
      totalCount: null,
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
      publicInter(interfaceUrl.ContractList, this.form).then(r => {
        r.list.forEach(item => {
          item.CREATEDATE = fromate(`${item.CREATEDATE}`);
        });
        this.data1 = r.list;
        this.totalCount = r.totalRow;
      });
    },
    getdetail(id) {
      publicInter(interfaceUrl.ContractDetail, { contractNo: id }).then(r => {
        if (r) {
          this.$emit("showDetail", {
            title: "单次合同详情",
            data: r,
            key: this.filed
          });
        }
      });
    },
    cancel(id, index) {
      publicInter(interfaceUrl.delContract, { contractNo: id }).then(r => {
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
<style rel="stylesheet/scss"  lang="scss" scoped>
.agreements {
  button {
    background-color: rgb(0, 80, 141);
  }
  min-height: 350px;
  // padding-left: 1px;
  .btnBox {
    display: inline-block;
    width: 150px;
  }
  .ivu-table-wrapper {
    margin-top: 30px;
  }
}
</style>


