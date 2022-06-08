<template>
    <div class="upload">
        <h3>
            {{header}}上传 <span v-if='pdfEnter'>(或者<router-link :to='pdfEnter'>去上传PDF</router-link>)</span>  
            <Button type="primary" v-if="data1.length>0" @click="upload" icon="ios-cloud-upload-outline" size='large'>全部上传</Button>
                 <Upload  action="a" v-if="data1.length>0"
                multiple
                  :before-upload='beforeUpload'
                    :max-size='fileSize'
                    :on-exceeded-size='outSize'
                    >
                    <Button icon="plus-round" size='large'>添加文件</Button>
                </Upload>
                  <Button type="error" v-if="data1.length>0" @click="reChocie" style="margin-right:-32px" icon="information-circled" size='large'>重新选择</Button>
            </h3>
            <div class="tableBox" v-if="data1.length>0">
                <Table :columns="columns1" :data="data1" class="self" style="width:100%;margin-top:15px"></Table>
            </div>
            <div class="upfile" v-if="data1.length<=0">
                <h3 style="margin-bottom:16px">暂未上传</h3>
                <Upload
               action='a'
                     multiple
                    :before-upload='beforeUpload'
                    :max-size='fileSize'
                    :on-exceeded-size='outSize'
                    >
                    <Button  icon="ios-cloud-upload-outline" size='large'>上传文件</Button>
                </Upload>
            </div>
            <Modal
        title="格式错误"
        v-model="modal"
        :closable="false"
        :scrollable='true'
        class="self"
        :mask-closable="false">
        <p ref='errorInfor'  class="modalcontent"></p>
    </Modal>
    </div>
</template>
<script>
import { fileUp } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  props: {
    //跳转至上传PDF路径
    pdfEnter: {
      type: String
    },
    //标题
    header: {
      type: String,
      required: true
    },
    //上传接口地址
    uploadUrl: {
      type: String
    },
    //上传的文件PDF的类别标识(暂时只有paking装货，invoice发票)
    interType: {
      type: String
    },
    //文件类型
    fileType: {
      type: String,
      default: "Excel"
    },
    //文件最大大小(kb)
    fileSize: {
      type: Number,
      default: 1024
    }
  },
  data() {
    return {
      billno: "",
      show: true,
      modal: false,
      filelist: [],
      columns1: [
        {
          title: "文件名",
          key: "name"
        },
        {
          title: "上传时间",
          key: "date"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          render: (h, params) => {
            const that = this;
            return h(
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
                on: {
                  "on-ok": () => {
                    this.data1.splice(params.index, 1);
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
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    beforeUpload(file) {
      if (this.fileSize < file.size / 1024) {
        this.$Message.error(`文件大小超过${this.fileSize / 1024}M！`);
        return false;
      } else {
        this.filelist.push(file);
        this.data1.push({
          name: file.name,
          date: new Date().toLocaleDateString()
        });
      }
      
    },
    reChocie() {
      this.data1 = [];
      this.filelist = [];
    },
    outSize() {
      this.$Message.error(`文件大小超过${this.fileSize / 1024}M！`);
      this.data1.pop();
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    upload() {
      var formdata = new FormData();
      var url;
      //将获取的文件列表添加到表单中
      this.filelist.forEach(item => {
        formdata.append("file", item);
      });
      if (this.fileType === "pdf") {
        if (this.billno) {
          formdata.append("type", this.interType);
          formdata.append("key", this.billno);
          url = interfaceUrl.uploadPDF;
        } else {
          this.$Message.error("请输入提单号！");
          return false;
        }
      } else {
        url = this.uploadUrl;
      }
      fileUp(url, formdata).then(r => {
        if (r.code === "200" && !r.error) {
          this.$Message.success("上传成功！");
        } else if (r.error) {
          this.modal = true;
          this.$refs.errorInfor.innerHTML = r.error;
        } else {
          this.$Message.error("上传出错！");
        }
        //判断indexArray是否为空、空表示全部上传成功，有值表示上传成功的文件下标，根据返回的下标删去filelist和data1中的元素
        if (r.indexArray && r.indexArray.length > 0) {
          r.indexArray.forEach((value, index) => {
            this.data1.splice(value - index, 1);
            this.filelist.splice(value - index, 1);
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  > h3 {
    padding: 10px 0;
    .ivu-upload,
    button {
      float: right;
      margin-left: 32px;
    }
  }
  &:last-child {
    margin-bottom: 10px;
  }
  h3 {
    margin: 0;
    font-size: 18px;
  }
  .upfile {
    box-shadow: 0px 1px 6px 0 rgba(0, 0, 0, 0.45);
    padding: 30px 0;
    text-align: center;
    button {
      background: rgb(0, 80, 141);
      color: #fff;
    }
  }
}
</style>

