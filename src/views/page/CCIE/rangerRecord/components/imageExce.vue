<template>
  <div class="imageExce">
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
      :page-size=10
      @on-change="changePage"
      show-total
    ></Page>
    <div v-if="showImg" class="showImg">
        <img class="bigImg" :src="imgSrc" @click="rotate" id="bigImg" >
    </div>
    <Icon v-if="showImg"  type="md-close" @click="hideImg" class="icon-close"></Icon>
  </div>

</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter, fileUp } from "@/api/http";
export default {
  data() {
    return {
      imgModal:false,
      imgSrc: '',
      showImg: false,
      angle: 0,
      scale: 1,
      data: [{}],
      columns: [
        {
          title: "展位号",
          key: 'ZWH',
           align:'center'
        },
        {
          title: "巡检员",
          key: 'USERID',
           align:'center'
        },
        {
          title: "巡检时间",
          key: 'REC_UPD_DT',
           align:'center'
        },
        {
          title: "描述",
          key: 'DESCRIP',
           align:'center'
        },
        {
          title: "图片",
          align:'center',
          key: 'FILEBASE64',
          render: (h, params) => {
            let img = new Image()
            img.src = 'data:image/' + params.row.FILETYPE + ';base64,' + params.row.FILEBASE64;
            let aa = img.width/img.height
            return h('img', {
                attrs: {
                  src: img.src
                },
                style: {
                  width: '30px * aa',
                  height: '30px',
                  cursor: 'pointer',
                },
                on: {
                  click: () => {
                    this.showImg = true;
                    this.$nextTick(() => {
                      this.imgSrc = img.src;
                      let i = document.getElementById('bigImg');
                      this.angle = 0;
                      i.style.height = '50vh';
                      i.style.width = '75vh * aa';
                    })
                  }
                }
              })
          }
        },
      ],
      total: 0,
      params: {
        page: 1,
        pageSize: 10
      }
    };
  },
  beforeMount() {
    this.query()

  },
  methods: {
    hideImg(){
      this.showImg = false
    },
    query() {
      publicInter(interfaceUrl.queryImageFiles, this.params).then(r => {
        if (r.total > 0) {
          this.data = r.list;
          this.total = r.total;
        } else {
          this.data = []
          this.total = 0;
        }

      })

    },

    changePage(page) {
      this.params.page = page
      this.query()
    },
    rotate() {
      let img = document.getElementById('bigImg');
      this.angle += 90;
      img.style.transform = `rotate(${this.angle}deg)`

    }

  }
};
</script>

<style lang="scss" scoped>
.imageExce {
  height: 100%;
  position: relative;
  .showImg {
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999
  }
  .icon-close {
    position: absolute;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    top: -8%;
    right: 0%;
  }
}
</style>
