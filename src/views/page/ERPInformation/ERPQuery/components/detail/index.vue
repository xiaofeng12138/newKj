<template>
   <Modal
        v-model="modal"
        :width='isScale?`${width}px`:"930px"'
        :class="{scale:isScale}"
        @on-cancel='ok'
        class='self'>
         <p slot="header"  @click="scaleModal">
             <b>{{title}}</b>
            <Icon type="arrow-expand" v-if="!isScale"  style="font-size:24px;float:right;margin-right:25px;margin-top:-3px;cursor: pointer;" title='放大'></Icon>
            <Icon type="arrow-shrink" v-if="isScale"  style="font-size:24px;float:right;margin-right:25px;margin-top:-3px;cursor: pointer;" title='还原'></Icon>
        </p>   
        <ul >
            <li v-for="item in showField['head']" :key="item.id">
                <h5>{{item.value}}</h5>
                <p>{{content.Head?content.Head[item.key.toUpperCase()]:'暂无数据'}}</p>
            </li>
        </ul>
         <Table :columns="columns1" :data='data1' v-if="columns1.length>0" class="self" style="margin-bottom:20px"></Table>
        
         <div slot="footer">
            <Button type="primary" size="large"  @click="ok">关闭</Button>
        </div>
    </Modal>
</template>
<script>
import expandRow from "./expand.vue";
export default {
  name: "detail",
  components: {
    expandRow
  },
  data() {
    return {
      modal: false,
      showField: [],
      title: "",
      content: {},
      columns1: [],
      data1: [],
      isScale: false,
      width: 0
    };
  },
  mounted() {
    this.width = window.innerWidth - 40;
  },
  methods: {
    init(obj) {
      const that = this;
      this.showField = obj.key; // 初始展示字段
      this.title = obj.title; //  模态框辩题
      this.content = obj.data; //  渲染表头
      this.data1 = this.content["BodyDetail"] ? this.content["BodyDetail"] : []; // 渲染表体
      var body1 = this.showField["bodyHead"]["body1"] || "";
      var body2 = this.showField["bodyHead"]["body2"] || "";
      if (body1) {
        that.columns1.push({
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row,
                bodyField: this.showField.body
              }
            });
          }
        });
        body1.forEach((obj, index) => {
          that.columns1.push({
            title: obj.value,
            key: obj.key.toUpperCase()
          });
        });
      }
    },

    ok() {
      this.modal = false;
      this.isScale = false;
      this.columns1 = [];
    },
    scaleModal() {
      this.isScale = !this.isScale;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.self {
  &.scale {
    .ivu-modal {
      top: 50%;
      transform: translate(0, -50%);
    }
    .ivu-modal-body {
      // height: 400px;
      min-height: 550px;
    }
  }
  .ivu-modal-body {
    min-height: 400px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #6e6e6e;
      outline: #333 solid 1px;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

<style  rel="stylesheet/scss" lang='scss' scoped>
.ivu-table-wrapper {
  margin-bootom: 20px !important;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 20px;
  padding: 0;
  li {
    margin-right: 30px;
    margin-bottom: 20px;
    min-width: 240px;
    h5 {
      font-size: 16px;
      margin-bottom: 10px;
      color: #96b7d0;
    }
    p {
      font-size: 14px;
      color: #495060;
    }
  }
}
</style>

