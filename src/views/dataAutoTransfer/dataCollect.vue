<template>
    <div>
        <div>
          <h1>互联网+网上稽核查数据采集</h1>
          <Divider />
        </div>
        <div class="desc">
            <p>请按照操作文档中《软件使用操作手册.docx》按步骤操作</p>
        </div>
        <div class="download">
            <h2>文档下载</h2>
            <div class="down-content">
              <Row>
                <Col class="down-col" :span="4"><a href="/excel/操作文档.zip">操作文档</a></Col>
                <Col class="down-col" :span="4"><a href="javascript:void(0);" @click="privateKey">获取RSA公钥</a></Col>
                <!-- <Col class="down-col" :span="4"><a href="/ERPInterface/海关及ISO代码表.xlsx">海关及ISO代码表</a></Col>
                <Col class="down-col" :span="4"><a href="/ERPInterface/数据签名文档.docx">数据签名文档</a></Col>
                <Col class="down-col" :span="4"><a href="/ERPInterface/sign-0.0.1.jar">数据签名jar包</a></Col>
                <Col class="down-col" :span="4"><a href="javascript:void(0);" @click="privateKey">获取签名私钥</a></Col> -->
              </Row> 
            </div>
            
            
        </div>
    </div>
</template>

<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";

export default {
  data() {
    return {};
  },
  methods: {
    privateKey() {
      publicInter(interfaceUrl.getRSASecretKey, {}).then(r => {
        if (r.fileName != undefined && r.publickey != undefined) {
          this.download(r.fileName, r.publickey);
        } else {
          this.$Message.error('下载错误');
        }
      });
    },
    download(fileName, text) {
      var ele = document.createElement("a");
      ele.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      ele.setAttribute("download", fileName);
      ele.style.display = "none";
      document.body.appendChild(ele);
      ele.click();
      document.body.removeChild(ele);
    }
  }
};
</script>

<style lang="scss" scoped>
.desc {
  p {
    margin-top: 20px;
    font-size: 14px;
  }
}
.download {
  margin-top: 20px;
  .down-content {
    // box-shadow: 0px 1px 6px 0 rgba(0,0,0,.45);
    margin-top: 20px;
    .down-col {
      border: 1px solid #dddee1;
      height: 50px;
      a {
        display: block;
        font-size: 16px;
        text-align: center;
        line-height: 50px
      };
      a:hover {
        color: #fff;
        background: #2d8cf0;
      }
    }
    
  }
}
</style>
