<template>
  <div>
     <div class="top">
               <div class="topLeft">
                   <p class="p1"> 2019年</p>
                   <p> 进口马来西亚冷冻榴莲</p>
               </div>
               <div class="topRight">
                  <ul>
                      <li>
                          <p class="p1">进口批次:</p>
                          <span>1</span>
                          <span>2</span>
                          <span>5</span>
                          <p>批</p>
                      </li>
                       <li>
                          <p class="p1">重量:</p>
                          <span>1</span>
                          <span>1</span>
                          <span>4</span>
                          <span>4</span>
                          <p>吨</p>
                      </li>
                       <li>
                          <p class="p1">金额:</p>
                          <span>1</span>
                          <span>3</span>
                          <span>7</span>
                          <span>3</span>
                          <p>万美元</p>
                      </li>
                  </ul>
               </div>
           </div>

    <Table
      :columns="columns"
      :data="data"
      class="customTable"
      style="margin-top:20px;"
    ></Table>
    <Page
      :total="total"
      v-show="total"
      show-total
      class="customPage"
       @on-change="changePage"
      
      
    ></Page>
  </div>

</template>
<script>
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
  data() {
    return {
      data: [],
      columns: [
              {
                    title:'Hs编码',
                    key:'HSCODE',
                    align:'center',
                    width:'200'
                    
                },
                {
                    title:"货物名称",
                    key:'GOODSNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:"报检单号",
                    key:'INSPECTIONNO',
                    align:'center',
                    width:'210'
                },
                {
                    title:"报检单位",
                    key:'COMPANYNAME',
                    align:'center',
                    width:'200'
                },
                {
                    title:'收货人',
                    key:'CONSIGNEE',
                    align:'center',
                    width:'200'
                
                },
                 {
                    title:'运输方式',
                    key:'TRANSTYPE',
                    align:'center',
                    width:'200'
                },
                {
                    title:"贸易方式",
                    key:'TRADETYPE',
                    align:'center',
                    width:'200'
                },
                {
                    title:"贸易国家地区",
                    key:'TRADECOUNTRY',
                    align:'center',
                    width:'200'
                },
                {
                    title:"货物用途",
                    key:'GOODSTOUSE',
                    align:'center',
                      width:'200'
                },
                {
                    title:'报检日期',
                    key:'INSPECTIONDATE',
                    align:'center',
                      width:'200'
                },
                 {
                    title:'检验检疫机构',
                    key:'CIQ',
                    align:'center',
                      width:'200'
                },
                {
                    title:"HS数重量",
                    key:'HSWEIGHT',
                    align:'center',
                    width:'200'
                },
                {
                    title:"HS计量单位",
                    key:'UNIT',
                    align:'center',
                    width:'200'
                },
                {
                    title:"原产国",
                    key:'ORIGINCOUNTRY',
                    align:'center',
                    width:'200'
                },
                {
                    title:'包装件数',
                    key:'PACKAGENUM',
                    align:'center',
                    width:'200'
                },
                 {
                    title:"货物总值（美元）",
                    key:'TOTALPRICE',
                    align:'center',
                    width:'200'
                },
                {
                    title:'入境口岸',
                    key:'IMPORT',
                    align:'center',
                    width:'200'
                },
                 {
                    title:'目的地',
                    key:'PURPOSEAREA',
                    align:'center',
                    width:'200'
                },
                
      ],
      total: 0,
      params: {
        page: 1,
        pageSize: 20
      }
    };
  },
  mounted(){
      this.queryFreezing(1)
  },

  methods: {
      queryFreezing(page){
          let pageNum = page
          let data={
              pageNum,
              pageSize:10
          }
          publicInter(interfaceUrl.queryFreezing,data).then(r=>{
                this.total = r.totalRow;
                console.log(r)
                this.data = r.list
            });
      },
      changePage(page){
          this.queryFreezing(page)

      }

  }
};
</script>

<style lang="scss">
 .top{
        width: 100%;
        height: 5rem;
        display: flex;
        .topLeft{
            width: 20%;
            height: 5rem;
            background-color: #188EFF;
            p{
                text-align: center;
                font-size: 16px;
                color: #fff;
                font-weight: bold;
                margin-bottom: 0.3rem;
            }
            .p1{
               padding-top: 1rem;
            }
        }
        .topRight{
            width: 80%;
            height: 5rem;
            background-color: #181C39;
            ul{
                display: flex;
                width: 100%;
                height: 5rem;
                li{
                display: flex;
                margin-top: 0.5rem;
                list-style: none;
                width: 33.3%;
                height: 4rem;
                border-right:  2px solid #212C4A;
                line-height: 4rem;
                  p{
                      font-size: 16px;
                       margin-left: 10px;
                       color: #fff;
                  }
                  .p1{
                      margin-left: 90px;
                  }
                  span{
                      display: block;
                      height: 40px;
                      width: 30px;
                      background-color: #185DF7;
                      font-size: 32px;
                      margin-left: 10px;
                      line-height: 40px;
                      color: #fff;
                      margin-top: 25px;
                  }
                }
            }
        }
    }
</style>


