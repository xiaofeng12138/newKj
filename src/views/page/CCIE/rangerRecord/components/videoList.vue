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
      <Modal  
       v-model="showVideo"
                width = "400px"
                :footer-hide = true
                :mask-closable = "false"
            >
            <p slot="close"></p>
            <p slot="footer"></p>
            <p style="float:right;cursor: pointer;">
             <Icon type="md-close" @click="showVideo=false" size='30' />
            </p>
            
          <video
            class="showVideo"
            :src= 'videoSrc'
            controls 
            width="300"
            height="500"
            id="showVideo"
          >
          </video>
        </Modal>
 
  </div>

</template>
<script>
import interfaceUrl from "@/api/interfaceUrl";
import { publicInter, fileUp } from "@/api/http";
export default {
  data() {
    return {
      videoSrc: '',
      showVideo: false,
      scale: 1,
      data: [],
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
          title: "上传时间",
          key: 'UPTIME',
           align:'center'
        },
        {
          title: "描述",
          key: 'DESCRIP',
           align:'center'
        },
        {
          title: "视频",
          align:'center',
          render: (h, params) => {
            return h('div',[
              h('Button',{
                props:{
                  type:'primary',
                  size:'large'
                },
                style:{

                },
                on:{
                  click:()=>{
                    this.showVideo = true
                    //let src = params.row.FILEPATH.replace('/data/file/','').trim()
                    this.videoSrc = params.row.FILEPATH.replace('/data/file/','').trim()
                  }
                }
              },'查看视频')
            ])
          }
        },
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
    hideVideo(){
      //this.showVideo = false
    },
    query() {
      publicInter(interfaceUrl.queryVideoByZwh, {}).then(r => {
       // console.log(r)
        if (r.totalRow > 0) {
          this.data = r.list;
          this.total = r.totalRow;
        } else {
          this.data = []
          this.total = 0;
        }
      })
    },

    timer(){
       return setTimeout(() => {
        //  this.query()
       }, 2000);
    },

    changePage(page) {
      this.params.page = page
      this.query()
    }
  },
   watch: {
      data(){
        this.timer()
      }
    },

    destroyed() {
      clearTimeout(this.timer)
    },
};
</script>

<style lang="scss" scoped>
.imageExce {
  height: 100%;
  position: relative;
  .showVideo {
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
}
</style>
