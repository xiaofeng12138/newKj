<template>
    <div>
        <h1>船期查询</h1>
        <Row>
            <Col :span="5">
                  <Input v-model="queryParams.vsl_nme" placeholder="请输入船名" size='large'></Input>
            </Col>
            <Col :span="4" :push='1'> 
                  <Button type="primary" size='large' icon="ios-search" @click="query" >查询</Button>
            </Col>
        </Row> 
         <Table border :columns="columns" :data="data" class="self"></Table>
          <Page :total="total" v-if="total" :page-size='queryParams.pageSize' style="float:right;margin-top:16px" @on-change='pageNumChange'></Page>
    </div>
    
</template>
<script>
import { mapMutations } from "vuex";
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      cityList: [],
      pageSize: 10,
      data: [],
      total: null,
      queryParams: {
        vsl_nme: "",
        pageNum: "0",
        pageSize: 20
      },
      columns: [
        {
          title: "船名",
          key: "VSL_NME"
        },
        {
          title: "劳氏号",
          key: "LLOYDS_NUM"
        },
        {
          title: "港口",
          key: "GSP_PORT_NME"
        },
        {
          title: "挂靠次数",
          key: "CALL_NUM"
        },
        {
          title: "抵港时间",
          key: "BERTH_ARR_DT_GMT"
        },
        {
          title: "抵港航次号",
          key: "ARR_EXT_VOY_REF"
        },
        {
          title: "离港时间",
          key: "BERTH_DEP_DT_GMT"
        },
        {
          title: "离港次号",
          key: "DEP_EXT_VOY_REF"
        }
      ]
    };
  },
  methods: {
    query() {
      publicInter(interfaceUrl.queryShipDate, this.queryParams)
        .then(r => {
          this.data = r.datas;
          this.total = r.total;
        })
        .catch(error => {});
    },
    pageNumChange(page) {
      this.queryParams.pageNum = `${page - 1}`;
      this.query();
    }
  }
};
</script>
<style rel='stylesheet/scss' lang="scss" scoped>
h1 {
  padding-bottom: 16px;
  border-bottom: 1px dashed #ddd;
  margin-bottom: 16px;
}
.ivu-row {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ddd;
}
</style>
