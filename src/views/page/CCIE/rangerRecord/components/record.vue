<template>
  <div>
    <Table
      :columns="columns"
      :data="data"
      class="customTable"
      style="margin-top:20px;"
    ></Table>
    <Page
      :total="total"
      v-show="total"
      class="customPage"
      :page-size=20
      @on-change="changePage"
      show-total
    ></Page>
  </div>

</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter, fileUp } from "@/api/http";
export default {
  data() {
    return {
      data: [{}],
      columns: [
        {
          title: "展位号",
          key: 'SIGNINAREA',
           align:'center'
        },
        {
          title: "时间",
          key: 'REC_UPD_DT',
           align:'center'
        },
        {
          title: "巡检员",
          key: 'USERID',
           align:'center'
        },
        // {
        //   title: "操作",
        //   render: (h, parmas) => {
        //     const that = this
        //     return h(
        //       "div",
        //       {
        //         style: {
        //           textAlign: "center"
        //         }
        //       },
        //       [
        //         h(
        //           "Button",
        //           {
        //             style: {
        //               marginRight: "20px"
        //             },
        //             attrs: {
        //               class: "customBtn ivu-btn ivu-btn-primary ivu-btn-large"
        //             },
        //             on: {
        //               click: () => {
        //                 this.addUnusual(parmas.row.SIGNINAREA)
        //               }

        //             },
        //           },

        //           "添加到异常列表"
        //         ),
        //         h(
        //           "label",
        //           {
        //             attrs: {
        //               class: "customBtn ivu-btn ivu-btn-primary ivu-btn-large"
        //             }
        //           },
        //           [
        //             h("span", "采集上传"),
        //             h("input", {
        //               attrs: {
        //                 type: "file"
        //               },
        //               style: {
        //                 display: "none"
        //               },
        //               on: {
        //                 change: (e) => {
        //                   that.fileUp(e)

        //                 }
        //               },
        //               nativeOn: {
        //                 click(e) {
        //                   console.log(e)

        //                 },
        //                 change(e) {
        //                   console.log(e)

        //                 }
        //               }
        //             })
        //           ]
        //         )
        //       ]
        //     );
        //   }
        // }
      ],
      total: 0,
      params: {
        page: 1,
        pageSize: 20
      }
    };
  },
  beforeMount() {
    this.query()

  },
  methods: {
    query() {
      this.params.page = 1
      publicInter(interfaceUrl.getExpoSignInByUser, this.params).then(r => {
        if (r.code == 200 && r.result && r.result.length > 0) {
          this.data = r.result;
          this.total = r.total
        } else {
          this.data = []
          this.total = 0;
        }
      })
    },
    addUnusual(area) {
      publicInter(interfaceUrl.addExpoUnnormalState, { AREA: area }).then(r => {
        if (r && r.code == 200) {
          this.$Message.success('添加成功！')
        } else {
          this.$Message.error('添加失败！')
        }
      })

    },

    changePage(page) {
      console.log(page)
      this.params.page = page
      let data = {
        page:page,
        pageSize:20
      }
       publicInter(interfaceUrl.getExpoSignInByUser, data).then(r => {
        if (r.code == 200 && r.result && r.result.length > 0) {
          this.data = r.result;
          this.total = r.total
        } else {
          this.data = []
          this.total = 0;
        }
      })
    },
    fileUp(e) {
      var file = e.target.files[0]
      var form = new FormData()
      form.append('file', file)
      fileUp(interfaceUrl.uploadPhotoFile, form).then(r => {
        if (r && r.code == 200) {
          this.$Message.success('上传成功！')
        } else {
          this.$Message.error('上传失败！')
        }


      })

    }
  }
};
</script>

