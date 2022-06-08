import { toUnicode } from "punycode";

const roleRouter={
    /*
    ** 企业公司
    */
    EP:[
        {
            rank:1,
            title:'首页',
            icon:'home',
            isA:false,
            router:'/dashboard'
        },
        {
            rank:2,
            title:'企业ERP数据',
            icon:'arrow-graph-up-right',
            subMenu:[
                {
                    rank:1,
                    title:'数据上传',
                    isA:false,
                    router:'/dashboard/ERPInformationUpload'
                },
                {
                    rank:1,
                    title:'数据查询',
                    isA:false,
                    router:'/dashboard/ERPInformationInquiry'
                },
                {
                    rank:1,
                    isA:true,
                    title:'通关参数',
                    router:'http://www.customs.gov.cn/customs/302427/302442/tgcs/index.html'
                }
            ]
        },
        {
            rank:2,
            title:'报关数据生成',
            icon:'clipboard',
            subMenu:[
                {
                    title:'提单订单物料关联',
                    rank:1,
                    isA:false,
                    router:"/dashboard/guibing/bill"
                },
                {
                    title:'报关数据信息查询',
                    rank:1,
                    isA:false,
                    router:"/dashboard/baoguanSearch"
                },
                {
                    title:'拆单报关信息查询',
                    rank:1,
                    isA:false,
                    router:"/dashboard/dismantlingSearch"
                },
                {
                    title:'委托报关公司维护',
                    rank:1,
                    isA:false,
                    router:"/dashboard/managecustom"
                },
                {
                    title:'委托报关行',
                    rank:1,
                    isA:false,
                    router:"/dashboard/baoguanbill"
                },
                {
                    title:'拆分提单',
                    rank:1,
                    isA:false,
                    router:"/dashboard/dismantlingBillNo"
                }, 
            ]
        },
        {
            rank:2,
            title:'海关信息查询',
            icon:'clipboard',
            subMenu:[
                {
                    rank:1,
                    title:"通关状态",
                    isA:false,
                    router:'/dashboard/costomMsgSearchStatus'
                },
                {
                    rank:1,
                    title:"信息反馈",
                    isA:false,
                    router:'/dashboard/costomMsgSearchBack'
                },
            ]

        },
        {
            rank:1,
            title:'港口信息查询',
            icon:'ios-search-strong',
            isA:false,
            router:'/dashboard/portSearch'
        },
        {
            rank:2,
            title:"海运信息查询",
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"提单查询",
                    isA:false,
                    router:'/dashboard/search'
                },
                {
                    rank:1,
                    title:"提单导出",
                    isA:false,
                    router:'/dashboard/BillExport'
                },
                {
                    rank:1,
                    title:"箱动态",
                    isA:false,
                    router:'/dashboard/trunkInfor'
                },
                {
                    rank:1,
                    title:"船期查询",
                    isA:false,
                    router:'/dashboard/shipQuery'
                },
                {
                    rank:1,
                    title:"订舱查询",
                    isA:false,
                    router:'/dashboard/booking'
                },
                {
                    rank:1,
                    title:"船图查询",
                    isA:false,
                    router:'/dashboard/shipPictrue'
                },
            ]
        },
        {
            rank:2,
            title:'全景展示',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"全景展示静态版",
                    isA:false,
                    router:'/dashboard/PanoramicDisplay'
                },
                {
                    rank:1,
                    title:"全景展示动画版",
                    isA:false,
                    router:'/overall'
                },
                {
                    rank:1,
                    title:"全景展示数据下载",
                    isA:false,
                    router:'/dashboard/downExcel'
                },
            ]

        },
        {
            rank:1,
            title:'指标评估',
            isA:false,
            router:'/dashboard/IndexEvaluation',
            icon:'stats-bars'
        },
        
        {
            rank:2,
            title:'三方服务',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"信用保险",
                    isA:true,
                    router:'http://www.sinosure.com.cn/osproj/S-page/Scompanyintroduced.jsp'
                },
                {
                    rank:1,
                    title:"海关税费查询与支付",
                    isA:true,
                    router:'http://www.easipay.net/custom.htm'
                },
                {
                    rank:1,
                    title:"出口退税",
                    isA:true,
                    router:'http://e.tax.sh.gov.cn:8900/ddit/ycsb.do'
                },
                {
                    rank:1,
                    title:"外汇管理",
                    isA:true,
                    router:'http://asone.safesvc.gov.cn/asone/'
                },
                {
                    rank:1,
                    title:"港航纵横",
                    isA:true,
                    router:'http://www.hb56.com/'
                },
                {
                    rank:1,
                    title:"通关宝",
                    isA:true,
                    router:'http://www.tongguanbao.net/'
                },
                {
                    rank:1,
                    title:"与海关和商检相关的功能",
                    isA:true,
                    router:'http://shanghai.customs.gov.cn'
                },
                {
                    rank:1,
                    title:"上海海事",
                    isA:true,
                    router:'http://www.shmsa.gov.cn/tzgg/index.jhtml'
                },
                {
                    rank:1,
                    title:"上海边检",
                    isA:true,
                    router:'http://www.sh-immigration.gov.cn/pagelist.aspx?id=1'
                }
            ]
        }
        
    ],
    TU:[
        {
            rank:1,
            title:'  担保额度监控',
            router:'/dashboard/newtable',
            icon:'clipboard'
        },
        {
            rank:1,
            title:'  展中销售申请',
            isA:false,
            router:'/dashboard/newtable01',
            icon:'ios-search-strong'
        },
        {
            rank:1,
            title:'  展中销售汇总',
            isA:false,
            router:'/dashboard/newtable02',
            icon:'stats-bars'
        },
        
        
    ],
    TC:[
        {
            rank:1,
            title:'  展中销售申请',
            isA:false,
            router:'/dashboard/newtable01',
            icon:'ios-search-strong'
        },
        {
            rank:1,
            title:'  展中销售汇总',
            isA:false,
            router:'/dashboard/newtable02',
            icon:'stats-bars'
        },
        
        
    ],
    /**
     * 船公司
     */
    CA:[
        {
            rank:2,
            title:"海运信息查询",
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"提单查询",
                    isA:false,
                    router:'/dashboard/search'
                },
                {
                    rank:1,
                    title:"箱动态",
                    isA:false,
                    router:'/dashboard/trunkInfor'
                },
                {
                    rank:1,
                    title:"船期查询",
                    isA:false,
                    router:'/dashboard/shipQuery'
                },
                {
                    rank:1,
                    title:"订舱查询",
                    isA:false,
                    router:'/dashboard/booking'
                },
                {
                    rank:1,
                    title:"船图查询",
                    isA:false,
                    router:'/dashboard/shipPictrue'
                },
            ]
        },  
        {
            rank:1,
            title:'港口信息查询',
            icon:'ios-search-strong',
            isA:false,
            router:'/dashboard/portSearch'
        },
        {
            rank:2,
            title:'全景展示',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"全景展示静态版",
                    isA:false,
                    router:'/dashboard/PanoramicDisplay'
                },
                {
                    rank:1,
                    title:"全景展示动画版",
                    isA:false,
                    router:'/overall'
                },
                {
                    rank:1,
                    title:"全景展示数据下载",
                    isA:false,
                    router:'/dashboard/downExcel'
                },
            ]

        },
    ],
    /**
     * 
     */
    FF:[
        {
            rank:2,
            title:'全景展示',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"全景展示静态版",
                    isA:false,
                    router:'/dashboard/PanoramicDisplay'
                },
                {
                    rank:1,
                    title:"全景展示动画版",
                    isA:false,
                    router:'/overall'
                },
                {
                    rank:1,
                    title:"全景展示数据下载",
                    isA:false,
                    router:'/dashboard/downExcel'
                },
            ]

        },
    ],
    /**
     *审批人员 
     */
    EC:[
        {
            rank:3,
            title:'进博会',
            icon:'clipboard',
            subMenu:[
                {
                    rank:2,
                    title:'物资证明函',
                    subMenu:[
                        {
                            rank:1,
                            title:'证明函审批',
                            isA:false,
                            router:'/dashboard/zhongbohui'
                        },
                        {
                            rank:1,
                            title:'数据下载',
                            isA:false,
                            router:'/dashboard/downloadZBH'
                        },
                    ]
                },
            ]
        },
       
    ],
    /**
     * 中博会货代录入人员
     */
    EB:[
        {
            rank:3,
            title:'进博会',
            icon:'clipboard',
            subMenu:[
                {
                    rank:2,
                    title:'进境物资证明函',
                    subMenu:[
                        {
                            rank:1,
                            isA:false,
                            title:'审批状态查询',
                            router:'/dashboard/zhongbohui',
                        },
                        {
                            rank:2,
                            title:' 证明函申请',
                            subMenu:[
                                {
                                    rank:1,
                                    isA:false,
                                    title:'手工录入',
                                    router:'/dashboard/addZBH'
                                },
                                {
                                    rank:1,
                                    isA:false,
                                    title:'HS编码维护',
                                    router:'/dashboard/zbhHSCode'
                                },

                            ]
                        },
                        {
                            rank:1,
                            isA:false,
                            title:'数据下载',
                            router:'/dashboard/downloadZBH',
                        }
                    ]
                },
                {
                    rank:2,
                    title:'展会备案清单申报等',
                    subMenu:[
                        {
                            rank:1,
                            title:'上海版',
                            isA:true,
                            router:'https://www.singlewindow.sh.cn/winxportal/myapp.html'
                        },
                        {
                            rank:1,
                            title:'国家版',
                            isA:true,
                            router:'https://www.singlewindow.cn'
                        }
                    ]

                },
                {
                    rank:1,
                    title:'快速订舱',
                    // router:'https://ebpp.coscon.com/expo/',
                    router:'https://expo.lines.coscoshipping.com',
                    isA:true
                },
                {
                    rank:1,
                    title:'快速提离',
                    router:'http://www.sipg.com.cn/',
                    isA:true
                },
                {
                    rank:1,
                    title:'展会到货',
                    router:'/dashboard/exhibition',
                    isA:false
                },
                {
                    rank:1,
                    title:'展品数据校对',
                    isA:false,
                    router:'/dashboard/exhibitionSearch2',

                },
                {
                    title:'试吃试用补申请',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage6'
                },
                
            ]
        },
       
    ],
    /**
     * 卡车公司
     */
    TR:[
        {
            title:'网上提箱',
            rank:1,
            router:'/dashboard/unknowm',
            isA:false,
            icon:'ios-briefcase-outline'
        }
    ],
    /**
     * 
     * 港口
     */
    PT:[
        {
            title:'指标评估',
            rank:1,
            router:'/dashboard/IndexEvaluation',
            isA:false,
            icon:'stats-bars'
        }
    ],
    /**
     * 报关行
     */
    CB:[
        {
            rank:2,
            title:'报关数据生成',
            icon:'clipboard',
            subMenu:[
                {
                    rank:1,
                    isA:false,
                    title:'物料主数据',
                    router:"/dashboard/wuliao"
                },
                {
                    rank:1,
                    isA:false,
                    title:'处理委托',
                    router:"/dashboard/needdeal"
                },
                {
                    rank:1,
                    isA:false,
                    title:'处理拆单提单委托',
                    router:"/dashboard/needdeal2"
                },
                {
                    rank:1,
                    isA:false,
                    title:'已撤回提单',
                    router:"/dashboard/rescinded"
                },
                {
                    rank:1,
                    isA:false,
                    title:'已撤回拆单提单',
                    router:"/dashboard/rescindedBillNo"
                },
            ]
        },
        {
            rank:2,
            title:'海运信息查询',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:'提单查询',
                    isA:false,
                    router:'/dashboard/search'
                },
                {
                    rank:1,
                    title:'箱动态',
                    isA:false,
                    router:'/dashboard/trunkInfor'
                },
                {
                    rank:1,
                    title:'船期查询',
                    isA:false,
                    router:'/dashboard/shipQuery'
                },
                {
                    rank:1,
                    title:'订舱查询',
                    isA:false,
                    router:'/dashboard/booking'
                },
                {
                    rank:1,
                    title:'船图查询',
                    isA:false,
                    router:'/dashboard/shipPictrue'
                },
            ]
        },
        {
            rank:1,
            title:'港口信息查询',
            isA:false,
            icon:'ios-search-strong',
            router:'/dashboard/portSearch'
        },
        {
            rank:2,
            title:'全景展示',
            icon:'ios-search-strong',
            subMenu:[
                {
                    rank:1,
                    title:"全景展示静态版",
                    isA:false,
                    router:'/dashboard/PanoramicDisplay'
                },
                {
                    rank:1,
                    title:"全景展示动画版",
                    isA:false,
                    router:'/overall'
                },
                {
                    rank:1,
                    title:"全景展示数据下载",
                    isA:false,
                    router:'/dashboard/downExcel'
                },
            ]

        },
        {
            rank:2,
            title:'海关信息查询',
            icon:'clipboard',
            subMenu:[
                {
                    rank:1,
                    title:'通关状态',
                    isA:false,
                    router:'/dashboard/costomMsgSearchStatus'
                }
            ]
        },
        {
            title:'进博物资快速提离',
            rank:1,
            isA:false,
            router:'/dashboard/queryExpoToPort'
        },

    ],
    DA:[
        {
            title:'暂时进境物资查询分析',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage'
        },
        {
            title:'试用品尝散发风险监控',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage2'
        },
        {
            title:'品尝试用散发申请批量查询打印',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage7'
        },
    ],
    DB:[
        {
            title:'暂时进境物资查询分析',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage'
        },
        {
            title:'危险化学品风险监控',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage2'
        },

    ],
    DC:[
        {
            title:'暂时进境物资查询分析',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage'
        },
        {
            title:'食品农产品核辐射监控',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage2'
        },

    ],
    SJ:[
        {
            title:'暂时进境物资查询分析',
            rank:1,
            isA:false,
            router:'/dashboard/riskManage'
        },
        {
            title:'展品查询分析',
            rank:1,
            isA:false,
            router:'/dashboard/exhitionSearch'
        },
    ],
    /*
        中博会管理员的角色
    */
   EA:[
    //    {
    //        title:'国家会展中心使用',
    //        rank:3,
    //        icon:"stats-bars",
    //        subMenu:[
    //            {
    //                title:'进境物资证明函',
    //                rank:1,
    //                isA:false,
    //                subMenu:[
    //                    {
    //                     title:'证明函审批',
    //                     rank:1,
    //                     isA:false,
    //                     router:'/dashboard/zhongbohui'
    //                    },
    //                    {
    //                     title:'数据下载',
    //                     rank:1,
    //                     isA:false,
    //                     router:'/dashboard/downloadZBH'
    //                    }
    //                ]
    //            },
    //        ]
    //    },
    //    {
    //     title:'指定货代使用',
    //     rank:3,
    //     icon:"stats-bars",
    //     subMenu:[
    //         // {
    //         //     title:'进境物资证明函',
    //         //     rank:1,
    //         //     isA:false,
    //         //     subMenu:[
    //         //         {
    //         //             title:'审批状态查询',
    //         //             isA:false,
    //         //             router:'/dashboard/zhongbohui',
    //         //             rank:1
    //         //         },
    //         //         {
    //         //             title:'证明函申请',
    //         //             isA:false,
    //         //             subMenu:[
    //         //                 {
    //         //                     title:'手工录入',
    //         //                     isA:false,
    //         //                     rank:1,
    //         //                     router:'/dashboard/addZBH'
    //         //                 },
    //         //                 {
    //         //                     title:'文件上传',
    //         //                     isA:false,
    //         //                     rank:1,
    //         //                     router:'/dashboard/exportZBH'
    //         //                 },
    //         //                 {
    //         //                     title:'HS编码维护',
    //         //                     isA:false,
    //         //                     rank:1,
    //         //                     router:'/dashboard/zbhHSCode'
    //         //                 },
    //         //             ]
    //         //         },
    //         //         {
    //         //             title:'数据下载',
    //         //             isA:false,
    //         //             router:'/dashboard/downloadZBH',
    //         //             rank:1
    //         //         },
                    

    //         //     ]
    //         // },
    //         // {
    //         //     title:'展会到货',
    //         //     isA:false,
    //         //     router:'/dashboard/exhibition',
    //         //     rank:1
    //         // },
    //         {
    //             title:'展会备案清单申报等',
    //             isA:false,
    //             rank:2,
    //             subMenu:[
    //                 {
    //                     title:"上海版",
    //                     isA:true,
    //                     rank:1,
    //                     router:'https://www.singlewindow.sh.cn/winxportal/myapp.htm'
    //                 },
    //                 {
    //                     title:"国家版",
    //                     isA:true,
    //                     rank:1,
    //                     router:'https://www.singlewindow.cn'
    //                 },
    //             ]
    //         },
    //         {
    //             title:'快速订舱',
    //             isA:true,
    //             rank:1,
    //             router:'https://ebpp.coscon.com/expo/'
    //         },
    //         {
    //             title:'快速提离',
    //             isA:true,
    //             rank:1,
    //             router:'http://www.sipg.com.cn/'
    //         }
    //     ]

    //    },
       {
           title:'智慧进博',
           rank:3,
           isA:false,
           icon:'stats-bars',
           subMenu:[
               {
                   title:'进博会动态检测分析1',
                   isA:false,
                   rank:1,
                   router:'/exhibitionMap'
               },
               {
                    title:'进博会动态检测分析2',
                    isA:false,
                    rank:1,
                    router:'/dynamicMonitor2'
                },
                {
                    title:'溢出效应管理6+365',
                    isA:false,
                    rank:2,
                    subMenu:[
                        {
                            title:'衍生成交信息查询',
                            isA:false,
                            rank:1,
                            router:'/dashboard/confirm'
                        },
                        // {
                        //     title:'简介',
                        //     isA:false,
                        //     router:'/dashboard/introduce',
                        //     rank:1
                        // }
                    ]
                },
                
                {
                    title:'展商管理',
                    rank:1,
                    isA:true,
                    router:'http://tradeportal.lines.coscoshipping.com/download/ExhibitorList.pdf'
                },
                {
                    title:'展商分析统计',
                    rank:1,
                    isA:false,
                    router:'/dashboard/exhibQuery'
                },
                // {
                //     title:'临时进境物资风险管理',
                //     rank:1,
                //     isA:false,
                //     router:'/dashboard/riskManage'
                // },
                // {
                //     title:'展品风险管理',
                //     rank:1,
                //     isA:false,
                //     router:'/dashboard/exhitionSearch'
                // },
               
                {
                    title:'进博物资快速提离',
                    rank:1,
                    isA:false,
                    router:'/dashboard/queryExpoToPort'
                },
                // {
                //     title:'展品查询分析',
                //     rank:1,
                //     isA:false,
                //     router:'/dashboard/exhibQuery'
                // },
                {
                    title:'展品查询分析',
                    rank:1,
                    isA:false,
                    router:'/dashboard/exhitionSearch'
                },
                {
                    title:'暂时进境物资查询分析',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage'
                },
                
                {
                    title:'食品农产品核辐射监控',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage5'
                },
                {
                    title:'危险化学品风险监控',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage4'
                },
                {
                    title:'试用品尝散发风险监控',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage3'
                },
                {
                    title:'品尝试用散发申请批量查询打印',
                    rank:1,
                    isA:false,
                    router:'/dashboard/riskManage7'
                },
           ]    
       }
   ],
   /*
    境外企业
   */
   EO:[
       {
        rank:3,
        title:'溢出效应管理6+365',
        isA:false,
        icon:'stats-bars',
        subMenu:[
            
            {
                rank:1,
                title:"衍生成交合同确认",
                isA:false,
                router:'/dashboard/confirm'
            }
        ]
       }
       
   ],
   /*
    境内企业
   */
  EI:[
      {
          rank:3,
          title:'溢出效应管理6+365',
          isA:false,
          icon:'stats-bars',
          subMenu:[
            {
                rank:1,
                title:"衍生成交合同报备",
                isA:false,
                router:'/dashboard/agent'
            },
            {
                title:'衍生成交信息查询',
                isA:false,
                rank:1,
                router:'/dashboard/confirm'
            }
          ]
      }
  ]
}
export default roleRouter;