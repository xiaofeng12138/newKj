<template>
    <div class="table-expand">
        <Table :columns="columns1" :data="row.listMaAfMerger"></Table>
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data() {
    return {
      columns1: [
        {
          title: "物料",
          key: "GOODSDESZH"
        },
        {
          title: "单价",
          key: "UNITPRICE"
        },
        {
          title: "总价",
          key: "totalPrice"
        },
        {
          title: "数量",
          key: "QUANTITY"
        }
      ]
    };
  }
};
</script>
<style scoped>
.expand-row {
  /* margin-bottom: 16px; */
}
</style>
