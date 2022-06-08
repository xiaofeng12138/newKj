<template>
    <div>
        <h1 style='padding-bottom:15px;border-bottom:1px solid #ececec'>数据统计</h1>
        <Tabs @on-click="tabsClick">
            <TabPane label='按运输方式' name='transport'>
                <Table style="margin-top:15px" border :columns='transport'  :data='transportList'  ></Table>
            </TabPane>
            <TabPane label='按馆号' name='venue'>
                <Table style="margin-top:15px" border :columns='venue'  :data='venueList' ></Table>
            </TabPane>
            <TabPane label='按参展商国别' name='country'>
                <Table style="margin-top:15px" border :columns='country'  :data='countryList'></Table>
            </TabPane>
            <TabPane label='按大洲统计' name='continent'>
                <Table style="margin-top:15px" border :columns='continent'  :data='continentList'></Table>
            </TabPane>
        </Tabs>    
    </div>
    
</template>
<script>
import { publicInter } from "@/api/http";
import interfaceUrl from "@/api/interfaceUrl";
export default {
  data() {
    return {
      /** 运输方式表头及数据列表*/
      transport: [
        {
          title: "运输方式代码",
          key: "TRANSPORTMODE"
        },
        {
          title: "运输方式名称",
          key: "TRANSPORTMODECN"
        },
        {
          title: "总数量",
          key: "TOTAL_QTY"
        },
        {
          title: "总金额",
          key: "TOTAL_PRICE"
        },
        {
          title: "总重量",
          key: "TOTAL_WEIGHT"
        },
        {
          title: "证明函数量",
          key: "CERTNO"
        }
      ],
      transportList: [],
      /** 按馆号表头及数据列表*/
      venue: [
        {
          title: "馆号",
          key: "HALLNO"
        },
        {
          title: "总数量",
          key: "TOTAL_QTY"
        },
        {
          title: "总金额",
          key: "TOTAL_PRICE"
        },
        {
          title: "总重量",
          key: "TOTAL_WEIGHT"
        },
        {
          title: "证明函数量",
          key: "CERTNO"
        }
      ],
      venueList: [],
      /** 按参展商国别表头及数据列表*/
      country: [
        {
          title: "参展国家代码",
          key: "EXHIBITORCOUNTRY"
        },
        {
          title: "参展国家名称",
          key: "COUNTRYNAME"
        },
        {
          title: "总数量",
          key: "TOTAL_QTY"
        },
        {
          title: "总金额",
          key: "TOTAL_PRICE"
        },
        {
          title: "总重量",
          key: "TOTAL_WEIGHT"
        },
        {
          title: "证明函数量",
          key: "CERTNO"
        }
      ],
      countryList: [],
      /** 按大洲统计表头及数据列表*/
      continent: [
        {
          title: "大洲名称",
          key: "CONTINENT"
        },
        {
          title: "总数量",
          key: "TOTAL_QTY"
        },
        {
          title: "总金额",
          key: "TOTAL_PRICE"
        },
        {
          title: "总重量",
          key: "TOTAL_WEIGHT"
        },
        {
          title: "证明函数量",
          key: "CERTNO"
        }
      ],
      continentList: [],
      /*请求URL*/
      url: {}
    };
  },
  beforeMount() {
    this.url = {
      transport: interfaceUrl.qryByTransportmode,
      venue: interfaceUrl.qryByHallno,
      country: interfaceUrl.qryByExhibitorcountry,
      continent: interfaceUrl.qryByExhibitorContinent
    };
  },
  mounted() {
      this.queryData(this.url.transport,'transportList');
  },
  methods: {
    tabsClick(name) {
      switch (name){
          case 'transport':this.queryData(this.url[name],'transportList');break;
          case 'venue':this.queryData(this.url[name],'venueList');break;
          case 'country':this.queryData(this.url[name],'countryList');break;
          case 'continent':this.queryData(this.url[name],'continentList');break;
          default:break;
      }
    },
    queryData(url, receiceKey) {
      publicInter(url, {}).then(r => {
        if(r&&r.result.length>0){
            this[receiceKey]=r.result
        }else{
            this[receiceKey]=[]
        }
      });
    }
  }
};
</script>

