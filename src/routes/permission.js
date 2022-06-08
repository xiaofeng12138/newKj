// const quanjing=resolve=>require(['@/views/quanjing/quanjing.vue'],resolve)
// const zhibiao=resolve=>require(['@/views/zhibiao/zhibiao.vue'],resolve)
const search=resolve=>require(['@/views/enterprise/billSearch/index'],resolve) //海运提单查询
const BillExport=resolve=>require(['@/views/enterprise/billExport/export'],resolve)//海运提单导出
const shipDate=resolve=>require(['@/views/enterprise/sailingDateSearch/shipDate'],resolve) //船期查询
const trunk=resolve=>require(['@/views/enterprise/boxDynamics/trunkInfor'],resolve) //箱状态
const booking=resolve=>require(['@/views/enterprise/bookingSpaceSearch/booking'],resolve) //订舱查询
const shipPictrue=resolve=>require(['@/views/enterprise/separateBillSearch/shipPictrue'],resolve) //船图查询
// // import {getUserRole} from '../until/getToken'
 const BaoGuanSearch=resolve=>require(['@/views/enterprise/customsBillSearch/index.vue'],resolve)
 const dismantlingSearch=resolve=>require(['@/views/enterprise/customsSearch/index2.vue'],resolve)
// const queryfinance=resolve=>require(['@/views/ERP/query/finance'],resolve)
// const addfinance=resolve=>require(['@/views/ERP/add/finance'],resolve)
// const unknowm=resolve=>require(['@/views/unknown/index'],resolve)


// const demo=resolve=>require(['@/views/downExcel/index'],resolve)
// const wuliao=resolve=>require(['@/views/wuliao/materiel'],resolve)
// const newView=resolve=>require(['@/views/overallView/index'],resolve)
// const bank=resolve=>require(['@/views/bank/index'],resolve)
// const PortSearch=resolve=>require(['@/views/portSearch/index'],resolve)
const CostomMsgSearchStatus=resolve=>require(['@/views/enterprise/customsState/status'],resolve)
const CostomMsgSearchBack=resolve=>require(['@/views/enterprise/customsFeedback/back'],resolve)

// const BaoGuanDan=resolve=>require(['@/views/baoguandan/index.vue'],resolve)
// const BillAndOrder=resolve=>require(['@/views/billAndOrder/index.vue'],resolve)
// const ZhongBoHui=resolve=>require(['@/views/exhibits/search.vue'],resolve)
// const ZhongBoHuiAdd=resolve=>require(['@/views/exhibits/index.vue'],resolve)
// const dynamicMonitor2=resolve=>require(['@/views/exhibits/dynamicMonitor.vue'],resolve)
// const zbhDetail=resolve=>require(['@/views/exhibits/index.vue'],resolve)
// const zbhPrint=resolve=>require(['@/views/exhibits/print.vue'],resolve)

// const ZhongBoHuiExport=resolve=>require(['@/views/zhongbohui/exportExcel.vue'],resolve)
// const ZhongBoHuiDownload=resolve=>require(['@/views/zhongbohui/download.vue'],resolve)
// const zbhLink=resolve=>require(['@/views/zhongbohui/zbhLink'],resolve)
// const zbhHSCode=resolve=>require(['@/views/zhongbohui/hscode'],resolve)
 const baoguanBill=resolve=>require(['@/views/enterprise/entrustBroker/bill2.vue'],resolve)
// const dismantling=resolve=>require(['@/views/guibing/dismantling.vue'],resolve)
 const dismantlingBillNo=resolve=>require(['@/views/enterprise/separateBillSearch/dismantlingBillNo.vue'],resolve)
 const needDeal=resolve=>require(['@/views/baoguanSearch/needDeal.vue'],resolve)
// //报关行拆单提单委托
// const needDeal2=resolve=>require(['@/views/baoguanSearch/needDeal2.vue'],resolve)
// const rescinded=resolve=>require(['@/views/baoguanSearch/rescinded.vue'],resolve)
 const manageCustom=resolve=>require(['@/views/enterprise/entrustCompany/manageCustom'],resolve)
// const rescindedBillNo=resolve=>require(['@/views/baoguanSearch/rescindedBillNo.vue'],resolve)
// const pdfUpload=resolve=>require(['@/views/uploadPDF'],resolve)

// const trunkOrder=resolve=>require(['@/views/uploadPDF/trunkOrder'],resolve)

// const billPDF=resolve=>require(['@/views/uploadPDF/billPDF'],resolve)
// // const category=resolve=>require(['@/views/category/category.vue'],resolve)

// const exhibition=resolve=>require(['@/views/zhongbohui/exhibition'],resolve)
// const exhibQuery=resolve=>require(['@/views/exhibits/query'],resolve)
// const queryExpoToPort=resolve=>require(['@/views/exhibits/queryExpoToPort'],resolve)
// const exhibitionMap=resolve=>require(['@/views/exhibits/exhibitionShow/exhibitionMap/index'],resolve)
// const agent=resolve=>require(['@/views/agentExh/uploadFile'],resolve)
// const confirm=resolve=>require(['@/views/agentExh/confirm'],resolve)
// const introduce=resolve=>require(['@/views/agentExh/introduction'],resolve)
// const riskManage=resolve=>require(['@/views/exhibits/riskManage'],resolve)
// const exhitionSearch=resolve=>require(['@/views/exhibits/exhitionSearch'],resolve)
// const exhitionSearch2=resolve=>require(['@/views/exhibits/exhitionSearch2'],resolve)
// const meatmonitor=resolve=>require(['@/views/exhibits/meatMonitor'],resolve)


// const newtable=resolve=>require(['@/views/newtable/newtable.vue'],resolve)
// const remainQuota=resolve=>require(['@/views/newtable/remainQuota/remainQuota.vue'],resolve)

// const newtable01=resolve=>require(['@/views/newtable01/newtable01.vue'],resolve)
// const customs=resolve=>require(['@/views/newtable01/customs/customs.vue'],resolve)

// const newtable02=resolve=>require(['@/views/newtable02/newtable02.vue'],resolve)
// const AmericaAfrica=resolve=>require(['@/views/newtable02/AmericaAfrica.vue'],resolve)

// const riskManage2=resolve=>require(['@/views/exhibits/riskManage2'],resolve)
// const riskManage3=resolve=>require(['@/views/exhibits/adminPage1'],resolve)
// const riskManage4=resolve=>require(['@/views/exhibits/adminPage2'],resolve)
// const riskManage5=resolve=>require(['@/views/exhibits/adminPage3'],resolve)
// const riskManage6=resolve=>require(['@/views/exhibits/application'],resolve)
// const riskManage7=resolve=>require(['@/views/exhibits/foodApplication'],resolve)
const permission={
    EP:[
        {
            path:'/dashboard',
            name: 'index',
            component: index,
            redirect:'/dashboard/category',
            children:[
                  GuiBingRoutes,
                { path: 'category', name: 'category', component: category },
                { path: 'ERPInformationUpload',name: 'ERPInformationUpload',component: ErpaddInfor},
                { path: 'ERPInformationInquiry',name: 'ERPInformationInquiry',component: ErpinforQuery},
                {path:'baoguanSearch',name:'baoguanSearch',component:BaoGuanSearch},
                // { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
                // { path: 'IndexEvaluation', name: 'IndexEvaluation', component: zhibiao },
                { path: 'search', component: search,name:'search' },
                { path: 'BillExport', component: BillExport, name:'BillExport'},
                { path:'shipQuery',component:shipDate, name:'shipDate'},
                { path:'trunkInfor',component:trunk,name:'trunk'},
                { path:'booking',component:booking, name:'booking'},
                { path:'shipPictrue',component:shipPictrue, name: 'shipPictrue'},
                // { path:'unknowm',component:unknowm},
                // { path: 'baoguanSearch', component: BaoGuanSearch, name: 'baoguanSearch' },
                 { path: 'dismantlingSearch', component: dismantlingSearch, name: 'dismantlingSearch' },
                { path: 'managecustom', component: manageCustom, name: 'manageCustom' },
                 { path: 'baoguanbill', component: baoguanBill, name: 'baoguanBill' },
                // { path: 'dismantling', component: dismantling, name: 'dismantling' },
                 { path: 'dismantlingBillNo', component: dismantlingBillNo, name: 'dismantlingBillNo' },
                { path: 'costomMsgSearchStatus', component: CostomMsgSearchStatus, name: 'costomMsgSearchStatus'},
                { path: 'costomMsgSearchBack', component: CostomMsgSearchBack, name: 'costomMsgSearchBack'},
                // { path: 'portSearch', component: PortSearch, name: 'portSearch' },
                // {path:'downExcel',component:demo},
                {path:'notfound',component:notfound}
            ]
        },
       
        // { path: '/overall', component: newView },
        {path:'**',redirect:'/dashboard/notfound',component:notfound}
    ],
    // TU:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/newtable',
    //         children:[
    //             { path: 'category', name: 'category', component: category },
    //             { path: 'ERPInformationUpload',name: 'ERPInformationUpload',component: ErpaddInfor},
    //             { path: 'ERPInformationInquiry',name: 'ERPInformationInquiry',component: ErpinforQuery},
    //             { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
    //             { path: 'IndexEvaluation', name: 'IndexEvaluation', component: zhibiao },
    //             { path: 'search', component: search },
    //             { path: 'BillExport', component: BillExport},
    //             { path:'shipQuery',component:shipDate},
    //             { path:'trunkInfor',component:trunk},
    //             { path:'booking',component:booking},
    //             { path:'shipPictrue',component:shipPictrue},
    //             { path:'unknowm',component:unknowm},
    //             { path: 'baoguanSearch', component: BaoGuanSearch, name: 'baoguanSearch' },
    //             { path: 'dismantlingSearch', component: dismantlingSearch, name: 'dismantlingSearch' },
    //             { path: 'managecustom', component: manageCustom, name: 'manageCustom' },
    //             { path: 'baoguanbill', component: baoguanBill, name: 'baoguanBill' },
    //             { path: 'dismantling', component: dismantling, name: 'dismantling' },
    //             { path: 'dismantlingBillNo', component: dismantlingBillNo, name: 'dismantlingBillNo' },
    //             { path: 'costomMsgSearchStatus', component: CostomMsgSearchStatus, name: 'costomMsgSearchStatus'},
    //             { path: 'costomMsgSearchBack', component: CostomMsgSearchBack, name: 'costomMsgSearchBack'},
    //             { path: 'portSearch', component: PortSearch, name: 'portSearch' },
    //             {path:'downExcel',component:demo},
    //             {path:'newtable',
    //                     name:'newtable',
    //                     component:newtable,
    //                     // redirect:'/newtable/remainQuota',
    //                     children:[
    //                         {path:'remainQuota',name:'RemainQuota',component:remainQuota}
                            
    //                     ]},
    //             {path:'newtable01',
    //                     name:'newtable01',
    //                     component:newtable01,
    //                      //redirect:'/newtable/customs',
    //                       children:[
    //                           {path:'customs/:id',name:'Customs',component:customs}
                            
    //                       ]
    //                 },
    //                 {path:'newtable02',
    //                 name:'newtable02',
    //                 component:newtable02,
    //                     redirect:'/dashboard/newtable02/America',
    //                     children:[
    //                       {path:'America',name:'Americas',component:AmericaAfrica},
    //                       {path:'Africa',name:'Africas',component:AmericaAfrica}
                        
    //                     ]
    //             },
    //             {path:'notfound',component:notfound}
    //         ]
    //     },
       
    //     { path: '/overall', component: newView },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    // TC:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/newtable01',
    //         children:[
    //             {path:'newtable01',
    //                     name:'newtable01',
    //                     component:newtable01,
    //                      //redirect:'/newtable/customs',
    //                       children:[
    //                           {path:'customs/:id',name:'Customs',component:customs}
                            
    //                       ]
    //                 },
    //                 {path:'newtable02',
    //                 name:'newtable02',
    //                 component:newtable02,
    //                     redirect:'/dashboard/newtable02/America',
    //                     children:[
    //                       {path:'America',name:'Americas',component:AmericaAfrica},
    //                       {path:'Africa',name:'Africas',component:AmericaAfrica}
                        
    //                     ]
    //             },
    //             {path:'notfound',component:notfound}
    //         ]
    //     },
       
    //     { path: '/overall', component: newView },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    // CA:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/search',
    //         children:[
    //             { path: 'search', component: search },
    //             {path:'shipQuery',component:shipDate},
    //             {path:'trunkInfor',component:trunk},
    //             {path:'booking',component:booking},
    //             {path:'shipPictrue',component:shipPictrue},
    //             { path: 'portSearch', component: PortSearch, name: 'portSearch' },
    //             { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
    //             {path:'downExcel',component:demo},
    //             {path:'notfound',component:notfound}
    //         ]
    //     },
    //     { path: '/overall', component: newView },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    // FF:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/PanoramicDisplay',
    //         children:[
    //             { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
    //             {path:'downExcel',component:demo},
    //             {path:'notfound',component:notfound}

    //         ]
    //     },
    //     { path: '/overall', component: newView },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
       
    // ],
    // //中博会审批人员
    // EC:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/zbhLink',
    //         children:[
    //             {path:'zbhLink',component:zbhLink},
    //             {path:'zhongbohui',component:ZhongBoHui,name:"zhongbohui"},
    //             { path: 'downloadZBH', component: ZhongBoHuiDownload, name: 'zhongbohuiDownload' },
    //             {path:'zbhDetail',component:zbhDetail,name:'zbhDetail'},
    //             {path:'zbhPrint',component:zbhPrint,name:'zbhPrint'},
    //             // {path:'hallDynamics',component:hallDynamics,name:'hallDynamics'},
    //             // {path:'statisticalAnalysis',component:statisticalAnalysis,name:'statisticalAnalysis'},
    //             // {path:'exhibQuery',component:exhibQuery},
    //             {path:'notfound',component:notfound}
    //         ]

    //     },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    // //中博会录入人员
    // EB:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/zbhLink',
    //         children:[
    //             {path:'zhongbohui',component:ZhongBoHui,name:"zhongbohui"},
    //             {path:'addZBH',component:ZhongBoHuiAdd,name:'addZBH'},
    //             {path:'zbhDetail',component:zbhDetail,name:'zbhDetail'},
    //             {path:'exportZBH',component:ZhongBoHuiExport},
    //             {path:'zbhHSCode',component:zbhHSCode,name:"zbhHSCode"},
    //             { path:'downloadZBH', component: ZhongBoHuiDownload, name: 'zhongbohuiDownload' },
    //             {path:'exhibition',component:exhibition},
    //             {path:'zbhLink',component:zbhLink},
    //             {path:'zbhPrint',component:zbhPrint,name:'zbhPrint'},
    //             {path:'notfound',component:notfound},
    //             {path:'exhibitionSearch2',component:exhitionSearch2},
    //             {path:'riskManage6',component:riskManage6},
    //         ]
    //     },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}

    // ],
    // TR:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/unknowm',
    //         children:[
    //             {path:'unknowm',component:unknowm},
    //             {path:'notfound',component:notfound}
    //         ]
    //     },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    // PT:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/IndexEvaluation',
    //         children:[
    //             { path: 'IndexEvaluation', name: 'IndexEvaluation', component: zhibiao },
    //             {path:'notfound',component:notfound}
    //         ]

    //     },
    //     {path:'**',redirect:'/dashboard/notfound',component:notfound}
    // ],
    CB:[
        {
            path:'/dashboard',
            name: 'index',
            component: index,
            redirect:'/dashboard/needDeal',
            children:[
               // {path:'wuliao',component:wuliao},
                { path: 'needdeal', component: needDeal, name: 'needDeal' }
                // { path: 'needdeal2', component: needDeal2, name: 'needDeal2' },
                // { path: 'rescinded', component: rescinded, name: 'rescinded' },
                // { path: 'rescindedBillNo', component: rescindedBillNo, name: 'rescindedBillNo' },            
                // { path: 'search', component: search },
                // {path:'shipQuery',component:shipDate},
                // {path:'trunkInfor',component:trunk},
                // {path:'booking',component:booking},
                // {path:'shipPictrue',component:shipPictrue},
                // { path: 'portSearch', component: PortSearch, name: 'portSearch' },
                // { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
                // {path:'downExcel',component:demo},
                // { path: 'baoguanSearch', component: BaoGuanSearch, name: 'baoguanSearch' },
                // {path:'queryExpoToPort',component:queryExpoToPort},
                // { path: 'costomMsgSearchStatus', component: CostomMsgSearchStatus, name: 'costomMsgSearchStatus'},
                // {path:'notfound',component:notfound}
            ]
        },
        // { path: '/overall', component: newView },
        // {path:'**',redirect:'/dashboard/notfound',component:notfound}
    ],
    // EA:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/zbhLink',
    //         children:[
    //             {path:'zbhLink',component:zbhLink},
    //             {path:'zhongbohui',component:ZhongBoHui,name:"zhongbohui"},
    //             {path:'addZBH',component:ZhongBoHuiAdd,name:'addZBH'},
    //             {path:'exportZBH',component:ZhongBoHuiExport},
    //             {path:'zbhHSCode',component:zbhHSCode,name:"zbhHSCode"},
    //             { path: 'downloadZBH', component: ZhongBoHuiDownload, name: 'zhongbohuiDownload' },
    //             {path:'exhibition',component:exhibition},
    //             { path: 'ERPInformationUpload',name: 'ERPInformationUpload',component: ErpaddInfor},
    //             { path: 'ERPInformationInquiry',name: 'ERPInformationInquiry',component: ErpinforQuery},
    //             {path:'exhibQuery',component:exhibQuery},
    //             {path:'exhibition',component:exhibition},
    //             {path:'zbhDetail',component:zbhDetail,name:'zbhDetail'},
    //             // {path:"agent",component:agent},
    //             {path:"confirm",component:confirm},
    //             {path:'introduce',component:introduce},
    //             { path: '/PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },   
    //             {path:'queryExpoToPort',component:queryExpoToPort},
    //             {path:'riskManage',component:riskManage},
    //             {path:'riskManage3',component:riskManage3},
    //             {path:'riskManage4',component:riskManage4},
    //             {path:'riskManage5',component:riskManage5},
    //             {path:'riskManage7',component:riskManage7},
    //             {path:'exhitionSearch',component:exhitionSearch},
    //             {path:'meatmonitor',component:meatmonitor},
    //         ]
    //     },

    //     { path: '/overall', component: newView,name:'newView' },
    //     {path:'/dynamicMonitor2',component:dynamicMonitor2,name:'dynamicMonitor2'},
    //     {path:'/exhibitionMap',component:exhibitionMap,name:'exhibitionMap'},
    // ],
    // EI:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/agent',
    //         children:[
    //             {path:"agent",component:agent},
    //             {path:"confirm",component:confirm},
    //         ]

    //     }
    // ],
    // DA:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/riskManage',
    //         children:[
    //             {path:'riskManage',component:riskManage},
    //             {path:'riskManage2',component:riskManage2},
    //             {path:'riskManage7',component:riskManage7},
    //         ]

    //     }

    // ],
    // DB:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/riskManage',
    //         children:[
    //             {path:'riskManage',component:riskManage},
    //             {path:'riskManage2',component:riskManage2},
    //         ]

    //     }

    // ],
    // DC:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/riskManage',
    //         children:[
    //             {path:'riskManage',component:riskManage},
    //             {path:'riskManage2',component:riskManage2},
    //         ]

    //     }

    // ],
    // SJ:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/riskManage',
    //         children:[
    //             {path:'riskManage',component:riskManage},
    //             {path:'exhitionSearch',component:exhitionSearch},
    //         ]

    //     }
        
    // ],

    // EO:[
    //     {
    //         path:'/dashboard',
    //         name: 'index',
    //         component: index,
    //         redirect:'/dashboard/confirm',
    //         children:[
    //             {path:"confirm",component:confirm},
    //         ]
    //     }

    // ]

}
export default permission