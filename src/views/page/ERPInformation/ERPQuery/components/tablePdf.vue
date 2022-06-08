<template>
    <div class="a">
         <Poptip placement="bottom-end" width="600">
        <Button  type="info" size='large' @click="queryPdf">PDF</Button>
        <div class="api" slot="content" style="width:100%">
            <ul class="title clear">
                <li>文件名</li>
                <li>上传时间</li>
                <li>操作</li>
                </ul>
                <p style="text-align:center;padding:8px;border:1px solid #ececec;border-top:none" v-if='data.length<=0'>暂无数据</p>
            <ul  class="body clear" v-if='data.length>0' v-for="item in data" :key="item.id">
                    <li>{{item.FILENAME}}</li>
                    <li>{{item.REC_UPD_DT}}</li>
                    <li>
                        <Button type="primary" size='small' @click="pdfView(item.ATTACHMENT_UUID)">查看</Button>
                             <Poptip
                                confirm
                                placement='left'
                                title="确定删除当前PDF文件"
                                @on-ok="ok(item.ATTACHMENT_UUID)"
                                style="text-align:left"
                               >
                                <Button type="error" size='small'>删除</Button>
                            </Poptip>
                    </li>
                </ul>
                <Upload action="aa"
                 :before-upload='beforeUpload'
                 style="margin-top:10px;width:100%">
                    <Button icon="plus-round" long>添加PDF</Button>
                </Upload>
        </div>
    </Poptip>
    

    </div>
    
    
</template>
<script>
import { pdfLook, publicInter, fileUp } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  name: "Tablepdf",
  props: ["UUID", "type"],
  data() {
    return {
      data: [],
      file: ""
    };
  },
  methods: {
    beforeUpload(file) {
      if (file.size / (1024 * 1024) > 10) {
        this.$Message.error(`文件大小超过10M！`);
      } else {
        var form = new FormData();
        form.append("pdf", file);
        form.append("type", this.type);
        form.append("key", this.UUID);
        fileUp(interfaceUrl.uploadPDF, form).then(r => {
          if (r.code === "200") {
            this.$Message.success("上传成功！");
            this.queryPdf();
          } else {
            this.$Message.error("上传失败！请重新上传");
          }
        });
      }
      return false;
    },
    ok(key) {
      publicInter(interfaceUrl.deleteBillFile, { uuid: key }).then(r => {
        if (r.code == "200") {
          this.$Message.success("删除成功！");
          this.queryPdf();
        }
      });
    },
    queryPdf() {
      publicInter(interfaceUrl.queryBillFiles, {
        key: this.UUID,
        type: this.type
      }).then(r => {
        if (r.list) {
          this.data = r.list;
        }
      });
    },
    pdfView(uuid) {
      pdfLook(interfaceUrl.pdfLookUp, { uuid: uuid }).then(r => {
        this.$emit("viewPdf", r);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.a {
  display: inline-block;
}
.title {
  li {
    font-weight: 500;
  }
}
.title,
.body {
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  border-right: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  li {
    float: left;
    width: 33.333%;
    height: 36x;
    line-height: 36px;
    border-left: 1px solid #ececec;
    border-top: 1px solid #ececec;
  }
}
</style>
