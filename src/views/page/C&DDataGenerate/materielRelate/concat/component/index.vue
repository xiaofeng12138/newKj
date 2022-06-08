<template>
    <div>
        <div v-for="(item,index) in groupList" :key="item.id" style="border-bottom:1px solid #ccc;margin:16px 0">
            <h2 style="margin-bottom:16px">组{{index+1}}</h2>
            <concat ref="child"   :group='item'/>
        </div>
        <div style="margin-top:20px;">
             <Button type="primary" size='large' long @click="confirm" :disabled="disableStatus">确认所有归并分组</Button>
        </div>
    </div>

</template>
<script>
import concat from "./index";
// import {queryLists} from './concat'
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import { getUserRole } from "../../until/getToken";
export default {
  components: {
    concat
  },
  props: {
    queryURL: {
      type: String,
      default: interfaceUrl.customsBrokerMergerBLLinkWithOrderAfChaiDan
    }
  },
  computed: {
    ...mapGetters(["mergeResult"])
  },
  data() {
    return {
      groupList: [],
      billNo: "",
      disableStatus: false,
      CNCOMPANYCODE: "",
      role: "",
      msg: "",
      transmode: ""
    };
  },
  created() {
    this.role = this.$route.params.role;
    this.billNo = this.$route.params.billNo;
    this.transmode = this.$route.params.transmode;
    this.setbillNo(this.billNo);
    if (this.billNo) {
      let r = [];
      //当角色是报关行的时候，调用接口不同a
      if (
        this.$route.params.role &&
        this.$route.params.role.indexOf("CB") != -1
      ) {
        this.CNCOMPANYCODE = this.$route.params.CNCOMPANYCODE;
        if (this.$route.params.erpTempnum) {
          r = publicInter(
            interfaceUrl.customsBrokerMergerBLLinkWithOrderAfChaiDan,
            {
              billNo: this.billNo,
              CNCOMPANYCODE: this.CNCOMPANYCODE,
              transmode: this.transmode,
              erpTempnum: this.$route.params.erpTempnum
            }
          );
        } else {
          r = publicInter(interfaceUrl.customsBrokerMergerBLLinkWithOrder, {
            transmode: this.transmode,
            billNo: this.billNo,
            CNCOMPANYCODE: this.CNCOMPANYCODE
          });
        }
      } else {
        //企业拆单状态
        if (this.$route.params.erpTempnum) {
          r = publicInter(
            interfaceUrl.getChaiDanHouOneTicBlNoMateAddMateRelaAfMer,
            {
              billNo: this.billNo,
              erpTempnum: this.$route.params.erpTempnum
            }
          );
        } else {
          //企业常规状态
          if (this.$route.params.air == "yes") {
            r = publicInter(interfaceUrl.POListAfMerger, {
              billNo: this.billNo,
              air: "yes"
            });
          } else {
            r = publicInter(interfaceUrl.POListAfMerger, {
              billNo: this.billNo
            });
          }
        }
      }
      r.then(r => {
        if (r["code"] == "200") {
          this.groupList = r.result;
          this.msg = {
            list: r.result2,
            message: r.windowReminder
          };
          this.preConfirm();
        } else if (r["code"] == "500") {
          this.$Modal.confirm({
            title: "",
            content:
              "<p>" +
              r.errMsg +
              "</p><br/><br/><p>是否立即进行物料主数据上传？</p>",
            onOk: () => {
              this.$router.push({
                name: "ERPInformationUpload",
                params: {
                  name: "name6"
                }
              });
            },
            onCancel: () => {
              var role = getUserRole()[0];
              if (role === "ROLE_CB") {
                this.$router.push({
                  name: "needDeal"
                });
              } else {
                this.$router.push({ path: "/dashboard/guibing/bill" });
              }
              // this.disableStatus = true;
            }
          });
        }
      });
    } else {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    ...mapMutations(["setbillNo", "clearList"]),
    preConfirm() {
      if (this.msg.message) {
        var content = "",
          that = this;
        this.msg.list.forEach(val => {
          content += "<br>" + val;
        });
        this.$Modal.confirm({
          title: "是否上传发票",
          content: `<p>${this.msg.message}${content}</p>`,
          onOk: () => {
            that.$router.push({
              name: "ERPInformationUpload",
              params: { name: "name4" }
            });
          }
        });
      }
    },
    confirm() {
      var params = this.mergeResult;
      console.log(this.mergeResult, "llllll1111555");
      params.list.forEach(item => {
        if (!item.GMODEL) {
          item.GMODEL = item.factor;
        }
      });
      //报关行登录时，需要传一个CNCOMPANYCODE；
      if (this.CNCOMPANYCODE !== "") {
        params.CNCOMPANYCODE = this.CNCOMPANYCODE;
      }
      params.flag = "2";
      params.transmode = this.transmode;
      let url =
        this.role && this.role.indexOf("CB") != -1
          ? interfaceUrl.MaterialListcb
          : interfaceUrl.MaterialList;
      //拆单的参数，和拆单时的url
      if (this.$route.params.erpTempnum) {
        url =
          this.role && this.role.indexOf("CB") != -1
            ? interfaceUrl.addMergeredMaterialListAfChaiDan
            : interfaceUrl.addMergeredMaterialListAfChaiDan2;
        params.id = this.$route.params.erpTempnum;
      }
      publicInter(url, params).then(r => {
        if (r.code == "200") {
          this.clearList([]);
          if (this.CNCOMPANYCODE !== "") {
            if (this.$route.params.erpTempnum) {
              this.$router.push({
                name: "sort",
                params: {
                  billNo: this.billNo,
                  transmode: this.transmode,
                  erpTempnum: this.$route.params.erpTempnum,
                  CNCOMPANYCODE: this.CNCOMPANYCODE,
                  role: "ROLE_CB"
                }
              });
            } else {
              this.$router.push({
                name: "sort",
                params: {
                  billNo: this.billNo,
                  CNCOMPANYCODE: this.CNCOMPANYCODE,
                  role: "ROLE_CB",
                  transmode: this.transmode
                }
              });
            }
          } else {
            if (this.$route.params.erpTempnum) {
              this.$router.push({
                name: "sort",
                params: {
                  billNo: this.billNo,
                  erpTempnum: this.$route.params.erpTempnum,
                  transmode: this.transmode
                }
              });
            } else {
              this.$router.push({
                name: "sort",
                params: { billNo: this.billNo, transmode: this.transmode }
              });
            }
          }
        }
      });
    }
  },
  beforeDestroy() {
    this.clearList([]);
  }
};
</script>
<style lang="scss" scoped>
</style>
