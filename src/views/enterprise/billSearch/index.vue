<template>
   <div>
      <h1>提单号查询</h1>
      <Row class="queryItem" >
          <Col span='8'>
            <Input v-model="value" placeholder="请输入提单号" size='large' clearable ></Input>
          </Col>
          <Col span='4' push='1'>
            <Button size='large' type="primary" long @click="search">查询</Button>
          </Col>
          <Col span='4' style="margin-left: 80px;">
              <Button size='large' type="primary" long @click="exportFun" style="display: none">导出</Button>
          </Col>
      </Row>
      <Tabs value="name2">
        <TabPane label="基本信息" name='name2'>
             <basicInfor :basic="this.basic" :referenceNu="this.referenceNu"/>
        </TabPane>
        <TabPane label="箱信息" >
          <package-info />
        </TabPane>
        <TabPane label="货信息">
          <cargo />
        </TabPane>
        <TabPane label="路径">
          <table-path></table-path>
        </TabPane>
    </Tabs>
  </div>
</template>
<script>
import basicInfor from "./basicInfor";
import packageInfo from './package'
import cargo from './cargo.vue'
import { mapActions } from 'vuex'
 import { mapMutations } from 'vuex'
import TablePath from './path.vue'
import interfaceUrl from '@/api/interfaceUrl'
import { publicInter,filedownload } from '@/api/http'

export default {
    components:{
         basicInfor,
         packageInfo,
         cargo,
         'table-path': TablePath
    },
    data(){
        return {
            value:'',
            basic: {},
            referenceNu: []
        }
    },
    methods: {
      ...mapActions('search', [
        'tidanSearch'
      ],),
      async search () {
        if (!this.value) {
          this.$Modal.warning({
              // title: 'title',
              content: '请输入提单号'
          });
          return;
        }
        let res = await this.tidanSearch(this.value) // 4512388500
        this.basic = res['CUSTOMS_BL_BASIC']
        this.referenceNu = res['CUSTOMS_BL_EXT_REF']
      },
        exportFun(){
            if (!this.value) {
                this.$Modal.warning({
                    content: '请输入提单号'
                });
                return;
            }

            publicInter(interfaceUrl.donlowDataList,{billCode:this.value}).then(res=>{
                if(res){
                    if(res.code==='500'||res.code==='400'){
                        this.$Message.error(res.msg)
                    }else{
                        filedownload(interfaceUrl.donlowDataList,{billCode:this.value}).then(r=>{
                            let url = window.URL.createObjectURL(new Blob([r]))
                            let link = document.createElement('a')
                            link.style.display = 'none'
                            link.href = url
                            link.setAttribute('download', "提单.xls")

                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        })
                    }
                }
            })
        }
    }

}
</script>
<style rel="stylesheet/scss"  lang="scss" scoped>
    .queryItem{
        margin: 20px 0 0 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;

    }
     h1{
        padding-bottom: 20px;
        border-bottom: 1px solid #dddee1;
    }
</style>
