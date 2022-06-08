const interfaceUrl={
    /****login-----start**** */
   
    login : 'seaadmin/auth',       //登录
    loginOut:'seaadmin/loginOut?loginOut=loginOut', //退出登录
    imageCode : 'seaadmin/kaptcha/new?&timestamp',  // 获取图形验证码
    changePW : 'seaadmin/mgr/changePwd', // 修改密码，
    changePWd : '/seaadmin/mgr/changePwd', // 修改密码，
    roleOfChoice:"seaadmin/roleOfChoice",//单一窗口登录后提交自己角色
    // imageCode : 'public/captcha/new?&timestamp',  // 获取图形验证码
    /****login-----end**** */  
    
    AnimalCustomsEciqImportGoodsCosmeticsListExcel: '/ep/upload/uploadAnimalCustomsEciqImportGoodsCosmeticsListExcel', //上传动物源性食品excel清单
    PlantCustomsEciqImportGoodsCosmeticsListExcel: '/ep/upload/uploadPlantCustomsEciqImportGoodsCosmeticsListExcel', //上传植物源性食品、加工食品和食品添加剂excel清单
    CosmeticsCustomsEciqImportGoodsCosmeticsListExcel: '/ep/upload/uploadCosmeticsCustomsEciqImportGoodsCosmeticsListExcel', //上传化妆品excel清单

    /****企业ERP数据-数据上传-----start**** */
    AgreementExcel : '/ep/upload/uploadAgreementExcel',  // 协议协议上传
    ContractExcel : '/ep/upload/uploadContractExcel',  //  单次合同上传
    PurchaseOrderExcel : '/ep/upload/uploadPurchaseOrderExcel', // 采购订单上传
    SellerOrderExcel : '/ep/upload/uploadCnSellerOrderExcel', // 销售订单上传
    SalesInvoiceExcel : '/ep/upload/uploadSalesInvoiceExcel', // 发票上传
    SellerPkgExcel : '/ep/upload/uploadSellerPkgExcel', // 装货上传
    MaterialRelationExcel : '/ep/upload/uploadMaterialRelationExcel', // 物料关系上传
    InboundExcel : '/ep/upload/uploadInboundExcel',  //  到货上传    
    FinanceExcel : '/ep/upload/uploadCompanuFinanceExcel',  // 财务上传
    TransferWarehouseExcel : '/ep/upload/uploadTransferWarehouseExcel', // 移库上传
    OutWarehouseExcel : '/ep/upload/uploadOutWarehouseExcel', // 出库上传
    BondedOutExcel : '/ep/upload/uploadBondedOutExcel', // 出门上传
    MergerRelationExcel : '/ep/upload/uploadMargeRelationExcel', // 归并关系上传
    uploadPDF : '/ep/uploadFile/uploadBillFile',  // 上传PDF文件

    uploadCommonGoods:'/ep/uploadForExcel/uploadCommonGoods', //企业供应链普通贸易进口上传
    uploadGenneralTrade:'/ep/uploadForExcel/uploadGenneralTrade', //企业供应链一线进口上传
    uploadSecondLineExcel:'/ep/uploadForExcel/uploadSecondLineExcel', //企业供应链二线进口上传

    queryCommonGoodsMessage:'/ep/overSeaCompany/queryCommonGoodsMessage',  //一般贸易查询
    queryGeneralMessage:'/ep/overSeaCompany/queryGeneralMessage', //一线入境查询
    queryFinalSecondMessage:'/ep/overSeaCompany/queryFinalSecondMessage', //二线入境查询

    delCommomMessage:'/ep/overSeaCompany/delCommomMessage', //一般贸易删除
    delGeneralMessage:'/ep/overSeaCompany/delGeneralMessage',//一线进口删除
    delFinalSecondMessage:'/ep/overSeaCompany/delFinalSecondMessage',//二线进口删除
    
    updateCommonMessage:'/ep/overSeaCompany/updateCommonMessage', //一般贸易编辑
    updateGeneralMessage:'/ep/overSeaCompany/updateGeneralMessage', //一线进口编辑
    updateFinalSecondMessage:'/ep/overSeaCompany/updateFinalSecondMessage', //二线进口编辑

    queryCommonForMgmt:'/ep/overSeaCompany/queryCommonForMgmt', //admin 普通贸易查询
    queryGeneralForMgmt:'/ep/overSeaCompany/queryGeneralForMgmt', //admin 一线进口查询
    queryFinalSecondForMgmt:'/ep/overSeaCompany/queryFinalSecondForMgmt', //admin 二线进口查询

    exporeCommon:"/ep/overSeaCompany/exporeCommon",  //普通贸易企业导出Excel
    exporeGeneral:"/ep/overSeaCompany/exporeGeneral",   //一线进口企业导出Excel
    exporeFinalSecond:"/ep/overSeaCompany/exporeFinalSecond",   //二线进口企业导出Excel

    exporeCommonForMgmt:"/ep/overSeaCompany/exporeCommonForMgmt",  //普通贸易进口管理员导出Excel
    exporeGeneralForMgmt:"/ep/overSeaCompany/exporeGeneralForMgmt",   //一线进口管理员导出Excel
    exporeFinalSecondForMgmt:"/ep/overSeaCompany/exporeFinalSecondForMgmt",   //一线进口管理员导出Excel



    queryRegisterMessage:'/ep/queryStatistics/queryRegisterMessage', //企业注册情况查询
    queryErpMessage:'/ep/queryStatistics/queryErpMessage', //企业ERP查询

    exporeRegister:'/ep/queryStatistics/exporeRegister',//企业注册情况导出
    exporeErp:'/ep/queryStatistics/exporeErp',//企业ERP导出

    queryIESeaMessage :'/ep/queryStatistics/queryIESeaMessage',  //企业进出口海运查询
    exporeIESea:'/ep/queryStatistics/exporeIESea',   //企业进出口海运excel导出
    
    queryAirMessage:'/ep/queryStatistics/queryAirMessage', //企业空运查询
    exporeAir:'/ep/queryStatistics/exporeAir',  //企业空运excel导出


    uploadIEcargodeclar:'/ep/uploadForExcel/uploadIEcargodeclar', //企业化妆品上传
    queryMaquillage:'/ep/overSeaCompany/queryMaquillage', //企业化妆品查询

    delMaquillage:'/ep/overSeaCompany/delMaquillage', //企业化妆品删除
    exporeMaquillage:'/ep/overSeaCompany/exporeMaquillage',//企业化妆品导出
    queryMaquillageForMgmt:'/ep/overSeaCompany/queryMaquillageForMgmt', //管理员化妆品查询
    exporeMaquillageForMgmt:'/ep/overSeaCompany/exporeMaquillageForMgmt', //管理员化妆品导出

    qryMaterialLiftlist: '/materialLift/qryMaterialLiftList',
    dealMaterialLift: '/materialLift/dealMaterialLift',


    // uploadBankExcel : '/upload/uploadBankExcel',   // 银行数据上传
    /****企业ERP数据-数据上传-----end**** */

    /* 水果冷处理 */
    queryFruitColdList: '/ep/temperature/queryFileList', //查询TXT文件上传列表
    queryFruitColdDetailList: '/ep/temperature/queryDetailList', //查询TXT文件内容详情列表
    updateTemperatureStatus: '/ep/temperature/updateTemperatureStatus', //确认TXT文本数据
    uploadTxtFile: '/ep/uploadFile/uploadTxtFile', //水果冷处理txt文档上传
    uploadExcelFile: '/ep/temperature/uploadExcelFile', //水果冷处理txt文档上传

    /* 船公司对接 */
    addBillMsg: '/ep/temperature/addBillMsg', //提单信息录入订阅
    queryBillMsgList: '/ep/temperature/queryBillMsgList', //查询订阅提单列表
    queryBillDetailList: '/ep/temperature/queryBillDetailList', //查询提单下冷箱数据详情

    /****企业ERP数据-数据查询-----start**** */
    FinanceList : '/ep/companuFinance/queryFinanceList',  // 财务列表
    FinanceDetail : '/ep/companuFinance/queryFinanceDetail',   // 财务详情
    delFinance : '/ep/companuFinance/delFinance',   //  财务删除
    AgreementList : '/ep/scAgreement/queryAgreementList',  // 查询协议列表
    AgreementDetail : '/ep/scAgreement/queryAgreementDetail',  // 协议详情
    delAgreement : '/ep/scAgreement/delAgreement',    // 删除协议
    ContractList : '/ep/contract/queryContractList',  // 查询合同列表
    ContractDetail : '/ep/contract/queryContractDetail',  // 查询合同详情
    delContract : '/ep/contract/delContract',   // 删除合同
    queryOrderList : '/ep/purchaseOrder/queryOrderList',  // 订单列表
    queryOrderDetail : '/ep/purchaseOrder/queryOrderDetail',  // 订单详情
    delOrder : '/ep/purchaseOrder/delOrder',  // 删除订单
    InvoiceList : '/ep/salesInvoice/queryInvoiceList', // 查询发票列表
    InvoiceDetail : '/ep/salesInvoice/queryInvoiceDetail', // 发票详情
    SellerPkgDetail : '/ep/sellerPkg/querySellerPkgDetail',  // 装货数据详情
    InboundDetail : '/ep/inbound/queryInboundDetail',   // 到货数据详情
    delInvoice : '/ep/salesInvoice/delInvoice',   // 删除发票
    delSellerPkg : '/ep/sellerPkg/delSellerPkg',   // 删除装货，
    delInbound : '/ep/inbound/delInbound',  // 删除到货 
    SellerPkgList : '/ep/sellerPkg/querySellerPkgList',  // 装货列表
    InboundList : '/ep/inbound/queryInboundList',  // 到货列表
    queryBillFiles : '/ep/uploadFile/queryBillFiles',  // 查询已上传的pdf
    deleteBillFile : '/ep/uploadFile/deleteBillFile' , // 删除上传的pdf
    pdfLookUp : '/ep/uploadFile/queryBillFileByPath' ,  // PDF预览
    queryMaterialDetailed : '/public/materialRelationshipInfo/queryMaterialDetailed', // 查询关系详情

    querySaleOrderList: '/ep/cnSellerOrder/queryList', //销售订单列表查询
    querySaleOrderDetails: '/ep/cnSellerOrder/queryDetail', //销售订单详情查询
    deleteSaleOrder: '/ep/cnSellerOrder/delData', //删除销售订单
    transferWarehouseList: '/ep/transferWarehouse/queryList', //移库数据列表查询
    transferWarehouseDetail: '/ep/transferWarehouse/queryDetail', //移库数据详情查询
    delTransferWarehouse: '/ep/transferWarehouse/delData', //删除移库数据
    outWarehouseList: '/ep/outWarehouse/queryList', //出库数据列表查询
    outWarehouseDetail: '/ep/outWarehouse/queryDetail', //出库数据详情查询
    delOutWarehouse: '/ep/outWarehouse/delData', //删除出库数据
    bondedOutList: '/ep/bondedOut/queryList', //出门数据列表查询
    bondedOutDetail: '/ep/bondedOut/queryDetail', //出门数据详情查询
    delBondedOut: '/ep/bondedOut/delData', //删除出门数据

    queryMergerRelation: '/ep/margeRelation/queryList',//归并关系查询列表
    queryMergerRelationDetail: '/ep/margeRelation/queryDetail',//归并关系查询详情列表
    delMergerRelation: '/ep/margeRelation/delData',//归并关系查询详情列表
    /****企业ERP数据-数据查询-----end**** */


    /*****通关状态----------------------start */
    queryWharfInfo:'/public/wharf/queryWharfInfo', //// 港口信息查询
    qryCustomsClearStatus:'/public/customs/qryCustomsClearStatus',//// 海关信息查询 通关状态
    qryCustomsBatchInfo:'/ep/customs/qryCustomsBatchInfo',//// 海关信息查询 税单（信息反馈)
    downloadBatchInfo:'/ep/customs/downloadBatchInfo',//海关信息查询 税单导出
    /*****通关状态----------------------end */

    /*****海运信息查询----------------------start */
    queryLadingbill:'/public/ladingbill/queryLadingbill', //提单查询
    queryBillnumList : '/public/common/queryBillnumList' ,  // 提单号模糊查询  
    donlowDataList : '/public/ladingbill/donlowDataList', //basf账号提单查询里面的导出
    queryBoxDynamics : '/public/shipcompanyinfo/queryBoxDynamics',  // 查询箱动态
    queryShipDate : '/public/shipcompanyinfo/queryShipDate',  // 查询船期
    queryBooking : '/public/shipcompanyinfo/queryBooking',  // 查询订舱
    queryShipChartCntr : '/public/shipcompanyinfo/queryShipChartCntr',  //  查询船图列表
    queryShipChart : '/public/shipcompanyinfo/queryShipChart' , // 查询船图
    queryShipChartDetail : '/public/shipcompanyinfo/queryShipChartDetail', // 查询船图详情
    /*****海运信息查询----------------------start */

    /*****报关数据生成----------------------start */
    getChaiDanHouBlNos : '/ep/bLLinkWithOrder/getChaiDanHouBlNos',//获取拆单后的提单列表
    queryBLList : '/ep/bLLinkWithOrder/queryBLList', //查询提单列表
    queryAirTranBLList : '/ep/bLLinkWithOrder/queryAirTranBLList', //查询提单列表
    queryUnNulNotePOList : '/ep/bLLinkWithOrder/queryUnNulNotePOList', //获取提单下的订单 list，未关联,包含订单对应的物料 list
    queryAirTranBLList : '/ep/bLLinkWithOrder/queryAirTranBLList', //空运提单列表
    addBlAlLinkPOList : '/ep/bLLinkWithOrder/addBlAlLinkPOList', //提单与物料建立绑定关系
    seeBlAlLinkPOListEP:'/ep/bLLinkWithOrder/seeBlAlLinkPOList',//归并结果排序（企业）
    seeBlAlLinkPOListCB:'/cb/bLAuthoCusBrok/seeBlAlLinkPOList',//归并结果排序（报关行）
    seeBlAlLinkPOListAfChaiDan2 : '/cb/bLAuthoCusBrok/seeBlAlLinkPOListAfChaiDan',//报关行查看(报关行)
    downloadXmlFileByBLNo:'/ep/bLLinkWithOrder/downloadXmlFileByBLNo',//报关单预览 上传
    queryAlNulNotePOListAddMatRela : '/ep/bLLinkWithOrder/queryAlNulNotePOListAddMatRela', //建立绑定关系后，得到的预归并列表
    POListAfMerger : '/ep/bLLinkWithOrder/queryAlNulNotePOListAfMerger',   //  自行归并，获取待归并分组列表
    addUnMergeredMaterialList :  '/ep/bLLinkWithOrder/addUnMergeredMaterialList', //提单订单物料关联界面：直接生成按钮
    customsBrokerMergerBLLinkWithOrderAfChaiDan : '/cb/bLAuthoCusBrok/customsBrokerMergerBLLinkWithOrderAfChaiDan',//报关行归并
    customsBrokerMergerBLLinkWithOrder : '/cb/bLAuthoCusBrok/customsBrokerMergerBLLinkWithOrder',//自行归并，报关行用户
    getChaiDanHouOneTicBlNoMateAddMateRelaAfMer : '/ep/bLLinkWithOrder/getChaiDanHouOneTicBlNoMateAddMateRelaAfMer',//自行归并按钮
    addMergeredMaterialListAfChaiDan : '/cb/bLAuthoCusBrok/addMergeredMaterialListAfChaiDan',//报关行点击确定所有归并分组
    addMergeredMaterialListAfChaiDan2 : '/ep/bLLinkWithOrder/addMergeredMaterialListAfChaiDan',//拆单后的提单的归并后的结果提交入库（企业）
    getMergeredBLList : '/ep/bLLinkWithOrder/getMergeredBLList', //提单预览list（报关单预览）
    getMergeredBLListAfChaiDan : '/ep/bLLinkWithOrder/getMergeredBLListAfChaiDan',//查看拆单后的归并完的提单的报关基本数据生成列表（企业）
    getMergeredBLListAirTrans:'/ep/bLLinkWithOrder/getMergeredBLListAirTrans',
    changeGnoByUUID : '/ep/bLLinkWithOrder/changeGnoByUUID',   // 排序后保存(企业)
    changeGnoByUUIDcb : '/cb/bLAuthoCusBrok/changeGnoByUUID',   // 排序后保存(报关行)
    getCusBroList : '/ep/bLLinkWithOrder/getCusBroList',//企业获取所有报关行列表
    addOrRemoveCusBroList : '/ep/bLLinkWithOrder/addOrRemoveCusBroList', //管理报关行界面：报关行授权接口,cusBroGetBLList
    authoBLToCustomsBroker : '/ep/bLLinkWithOrder/authoBLToCustomsBroker',//委托报关行：委托给报关行
    changeBLToCustomsBrokerStatus : '/ep/bLLinkWithOrder/changeBLToCustomsBrokerStatus',//委托报关行：撤回委托给报关行
    changeBLToCustomsBrokerStatuscb : '/cb/bLAuthoCusBrok/changeBLToCustomsBrokerStatus',//委托报关行：撤回委托给报关行
    /*****报关数据生成----------------------end */
   
    /*****空运全景------------------------------start */
    PanoramicDisplay:'/dashboard/PanoramicDisplay',//空运全景图
    /*****空运全景------------------------------end */


    /*****溢出365------------start */
    adminContractList : '/ea/expoadmin/queryContractList', // expoadmin查询合同，
    adminContractDetail : '/ea/expoadmin/queryContractDetail', // expoadmin查询合同详情
    EIqueryContractList : '/ei/expoErp/queryContractList',//境内企业查询合同列表
    EIqueryContractDetail : '/ei/expoErp/queryContractDetail',//境内企业查询合同详情
    EIdelContract : '/ei/expoErp/delContract',//境内企业删除合同
    EOContractList : '/eo/expoOverseas/queryContractList',//境外企业查询合同列表
    EOContractDetail : '/eo/expoOverseas/queryContractDetail',//境外企业查询合同详情
    verifyExpoContract : '/eo/expoOverseas/verifyExpoContract',//境外企业确认中博会合同

    adminOrderList : '/ea/expoadmin/queryOrderList',// expoadmin查询订单列表
    adminOrderDetail : '/ea/expoadmin/queryOrderDetail',//expoadmin查询订单详情
    EIqueryOrderList : '/ei/expoErp/queryOrderList',//境内企业查询订单列表
    EIqueryOrderDetail : '/ei/expoErp/queryOrderDetail',//境内企业查询订单详情
    EIdelOrder : '/ei/expoErp/delOrder',//境内企业删除订单
    EOqueryOrderList : '/eo/expoOverseas/queryOrderList',//境外企业查询订单列表
    EOqueryOrderDetail : '/eo/expoOverseas/queryOrderDetail',//境外企业查询订单详情
    verifyExpoOrder : '/eo/expoOverseas/verifyExpoOrder',//境外企业确认中博会订单
    /*****溢出365------------end */

    /*****快速提离******************** */
    queryExpoToPort : '/ea/expoadmin/queryExpoToPort',//进博会物资快放情况查询(ea角色)
    queryExpoToPortcb : '/cb/expoQuery/queryExpoToPort',//进博会物资快放情况查询(报关行角色cb)
    /*****快速提离******************** */
    
    /******* 
        @ public 无角色权限接口，使用 public方法调用@
    ********/
    qureyShipMsg : '/public/outline/qureyShipMsg',  // 查询全景展示航线
    queryFwbListByBillno:'/fwbbean/queryFwbListByBillno', //FWB列表查询
    queryAllByMsgid:'/fwbbean/queryAllByMsgid', // FWB详情查询
    queryFsuListByBillno:'/fsubean/queryFsuListByBillno', // fsu列表
    queryFsuAllByMsgid:'/fsubean/queryAllByMsgid', // fsu详情
    queryFhlListByBillno:'/fhlmessage/queryFhlListByBillno', // fhl列表查询
    queryFhlAllByMsgid:'/fhlmessage/queryAllByMsgid', // fhl详情查询
    queryFfmListByBillno:'/ffmbean/queryFfmListByBillno',//ffm列表查询
    queryFfmAllByMsgid:'/ffmbean/queryAllByMsgid', //ffm详情查询
     
    queryDataList : '/public/outline/queryDataList', // 查询中博会数据
    ZqueryBillo : '/public/materialsExamine/queryBillo', // 中博会数据导出提单号模糊查询
    checkHSCode : '/public/materialsExamine/checkHSCODE', // 中博会数据导出hscode校验
    queryBillNo : '/public/CustomsImportExpo/queryBillNo',//中博会模糊搜索提单号
    queryPositionTransport : '/public/materialsExamine/queryPositionTransport', ////中博会获取展馆位置和运输方式
    queryInfoByBillNo : '/public/CustomsImportExpo/queryInfoByBillNo ',//中博会Hs补录界面查询
    checkHSCODE : '/public/CustomsImportExpo/checkHSCODE ', //中博会Hs补录界面HS补录
    queryCountryCode : '/public/countryCode/queryCountryCode',  //获取国家/地区代码
    
    
    exportExhibitsForExcel : '/public/materialsExamine/exportExhibitsForExcel', // 中博会审批状态导出excel
    
   
    queryEpidemicInfor : '/public/materialsExamine/queryEpidemicInfo', // 中博会疫情病毒信息
    queryRpidemicCount : '/public/materialsExamine/queryEpidemicCount', //中博会疫情总览
    queryEpidemicCountry : '/public/materialsExamine/queryEpidemicCountry', // 获取当前病毒详情
    queryGoodsCount : '/public/materialsExamine/queryGoodsCount', // 获取优服务总数
    queryGoodsType : '/public/materialsExamine/queryGoodsType', // 获取商品类型
    queryGoodsCountryCount : '/public/materialsExamine/queryGoodsCountryCount', // 商品数对应的国家
    exportExhibitsForXML : '/public/materialsExamine/exportExhibitsForXML', // 发送报文
    queryEpidemic: '/public/materialsExamine/queryEpidemic',
    //动态监测2
    queryExhiFlowTo : '/public/materialsExamine/queryExhiFlowTo', //展品流向预测
    getDayBlNosAndTotalPrice : '/public/counContInfo/getDayBlNosAndTotalPrice',//每日进口动态
    queryTypeOfTransportation : '/public/exhibitors/queryTypeOfTransportation',//水运空运其他
    qryTopExhibitor : '/public/expoStatistic/qryTopExhibitor', //根据展馆号查询top10展商信息
    qryShippingByBillno : '/public/expoStatistic/qryShippingByBillno',//根据展商查询提单列表及其对应航运信息
    qryExhibitorByCountry : '/public/expoStatistic/qryExhibitorByCountry',//根据国家查询展商
    qryExhibitorFlow : '/public/expoStatistic/qryExhibitFlow',//查询展品流向，后续流向监管,
    qryExhibitorByItemType : '/public/expoStatistic/qryExhibitorByItemType', //根据展品大类查询展商信息   
    queryGoodsByExhType : '/public/exhibitors/queryGoodsByExhType',
    getQueAndBenifitMerchants : '/public/counContInfo/getQueAndBenifitMerchants',//问题展商
    qryExhibitorByName : '/public/expoStatistic/qryExhibitorByName',//根据展商名称查询展商信息
    qryExhibitorByBoothNo : '/public/expoStatistic/qryExhibitorByBoothNo',//根据展位号查询展商信息
    qryExhibitorForExpo : '/public/expoStatistic/qryExhibitorForExpo',//查询展商
    queryDeliverOut : '/public/materialsExamine/queryDeliverOut',//查询保税单号
    qryExhibitorCountForHallno : '/public/expoStatistic/qryExhibitorCountForHallno',//所有展位的展商查询
    /***
     * @ 使用unifyInterface 调用，自动给每一个角色加上对应自己身份的前缀@
     ***/
    
    queryBankList : '/bank/queryBankList',     // 查询银行数据列表
    queryBankDetail : '/bank/queryBankDetail',  // 银行数据详情
    delBank : '/bank/delBank',   // 删除银行数据

    //数据自动传输对接
    SecretKey: '/public/signMgmt/getSecretKey',//获取秘钥

    /**
     * @全景展示 @
     */
    queryData:'/public/outline/queryData',//全景展示全局查询
    MaterialList : '/ep/bLLinkWithOrder/addMergeredMaterialList',   //  自行归并完成，上传归并的结果企业
    MaterialListcb : '/cb/bLAuthoCusBrok/addMergeredMaterialList', //自行归并完成，上传归并的结果报关行
    
    cusBroGetRescindedBLList : '/cb/bLAuthoCusBrok/cusBroGetRescindedBLList',//获取已撤回提单（报关行）
    queryAlNulNotePOListChaiDan : '/ep/bLLinkWithOrder/queryAlNulNotePOListChaiDan',//已关联未委托的提单列表的拆单按钮展示的物料列表(企业)
    addChaiDanMaterialList : '/ep/bLLinkWithOrder/addChaiDanMaterialList', //勾选一部分列表点击确认拆单按钮
    
    
    getChaiDanHouOneTicBlNoMateInfo : '/ep/bLLinkWithOrder/getChaiDanHouOneTicBlNoMateInfo',//拆单列表的查看按钮（企业）
    authoBLToCustomsBrokerAfChaiDan : '/ep/bLLinkWithOrder/authoBLToCustomsBrokerAfChaiDan',//委托按钮（企业）
    changeBLToCustomsBrokerStatusAfChaiDan2 : '/bLLinkWithOrder/changeBLToCustomsBrokerStatusAfChaiDan',//撤回按钮（企业）
    
    
    cusBroGetBLListAfChaiDan : '/cb/bLAuthoCusBrok/cusBroGetBLListAfChaiDan',//报关行获取被委托的提单列表页面
    changeBLToCustomsBrokerStatusAfChaiDan : '/cb/bLAuthoCusBrok/changeBLToCustomsBrokerStatusAfChaiDan',//报关行读取
    
    downloadXmlFileByBLNoAfChaiDan2 : '/bLAuthoCusBrok/downloadXmlFileByBLNoAfChaiDan',//报关行下载
    
    addUnMergeredMaterialListAfChaiDan : '/bLLinkWithOrder/addUnMergeredMaterialListAfChaiDan',//直接生成(企业))
  
    queryExpoList : '/eb/arrivalConfirm/queryExpoList', // 中博会展馆到货查询
    updateExpo : '/eb/arrivalConfirm/updateExpo', // 中博会展馆到货确认
    queryStatistic : '/ep/statistic/queryStatistic', // 指标评估
    
    
    
    changeBlAlLinkPOList : '/bLLinkWithOrder/changeBlAlLinkPOList', // 提交归并列表
    queryAlNulNotePOList : '/bLLinkWithOrder/queryAlNulNotePOList', //提单下的订单list，已关联
    removeAlNulNotePOList : '/ep/bLLinkWithOrder/removeAlNulNotePOList', // 删除已关联的提单的 关联关系
    
    customsBrokerGetMergeredBLList : '/bLLinkWithOrder/customsBrokerGetMergeredBLList',// 报关行提单预览list（报关单预览）
    seeBlAlLinkPOListAfChaiDan : '/ep/bLLinkWithOrder/seeBlAlLinkPOListAfChaiDan',//拆单后的提单的报关基本数据查看
    downloadXmlFileByBLNoAfChaiDan : '/ep/bLLinkWithOrder/downloadXmlFileByBLNoAfChaiDan',//拆单后的xml下载
    
    cusBroGetRescindedBLListAfChaiDan : '/cb/bLAuthoCusBrok/cusBroGetRescindedBLListAfChaiDan',//报关行查询撤回委托的拆单提
    getCntrInfoByBlNoAfChaiDan : '/bLLinkWithOrder/getCntrInfoByBlNoAfChaiDan', //拆单后的提单完善集装箱功能(企业)
    getCntrInfoByBlNoAfChaiDancb : '/bLAuthoCusBrok/getCntrInfoByBlNoAfChaiDan',//拆单后的提单完善集装箱功能(报关行)

    uploadContractExcel : '/expoErp/uploadContractExcel', // 境内企业合同上传
    uploadPurchaseOrderExcel : '/expoErp/uploadPurchaseOrderExcel',//境内企业订单上传
    
    
    cusBroGetBLList : '/cb/bLAuthoCusBrok/cusBroGetBLList',//待处理提单页面查询
    expoCompany : '/public/exhibitors/expoCompany', // 展商查询获取公司名称
    hqCountry : '/public/exhibitors/hqCountry', // 展商查询获取公司列表
    itemType : '/public/exhibitors/itemType', // 展商查询获取展商商品
    placePosition : '/public/exhibitors/placePosition', // 展商查询获取展位号列表
    allExhibitorsData : '/public/exhibitors/allExhibitorsData', // 展商数据列表查询 
    qryLimitAndForbidList: '/ranger/expoIpad/qryLimitAndForbidList', //禁限清单

    
    addExpo : '/eb/importExpo/addExpo',//中博会录入,
    reloadExamine: '/public/materialsExamine/reloadExamine',//重置
    queryExpoDetail : '/eb/importExpo/queryExpoDetail', //中博会查看详情
    queryExpoDetail2 : '/public/materialsExamine/queryExpoDetail', //中博会审批人员查看详情
    queryExpoDetailEA : '/public/materialsExamine/queryExpoDetail', //中博会审批人员查看详情
    addMaterial : "/eb/importExpo/addMaterial",//中博会保存清单
    queryExpoHeadDetail : '/eb/importExpo/queryExpoHeadDetail', //查询物资详情
    removeExpoHeadDetail : '/eb/importExpo/removeExpoHeadDetail', //删除物资详情
    queryExpoHeadDetail2 : '/public/materialsExamine/queryExpoHeadDetail', //查询物资详情（中博会审批人员）
    queryExpoHeadDetailEA : '/public/materialsExamine/queryExpoHeadDetail', //查询物资详情（中博会EA人员）
    queryAllExpo : '/eb/importExpo/queryAllExpo', //查询打印
    queryAllExpo2 : '/public/materialsExamine/queryAllExpo',//查询打印（中博会审批人员）
    queryExpoByName : '/eb/importExpo/queryExpoByName',//模糊搜索展商
    queryExpoByBoothno : '/eb/importExpo/queryExpoByBoothno',//模糊搜索展位号
    queryCompanyNameByCode : '/eb/importExpo/queryCompanyNameByCode',//根据境内收发货人的十位编码填写境内收发货人
    toExamine : '/public/materialsExamine/toExamine',//审批同意拒绝作废(审批人员)

    //集装箱
    getCntrInfoByBlNo : '/bLLinkWithOrder/getCntrInfoByBlNo', //集装箱手动完善（basf）
    getCntrInfoByBlNoCB : '/bLAuthoCusBrok/getCntrInfoByBlNo', //集装箱手动完善（报关行cb）
    addCntrInfoByManualOpera : '/bLLinkWithOrder/addCntrInfoByManualOpera',//集装箱手动关联（企业ep）
    addCntrInfoByManualOperaCB : '/bLAuthoCusBrok/addCntrInfoByManualOpera',//集装箱手动关联（报关行cb）
    getCntrInfoByPackingInfo : '/bLLinkWithOrder/getCntrInfoByPackingInfo',//根据装货数据完善报关单表体中的集装箱箱信息,参数(企业)
    getCntrInfoByPackingInfoCB : '/bLAuthoCusBrok/getCntrInfoByPackingInfo',//根据装货数据完善报关单表体中的集装箱箱信息,参数(报关行cb)

    // 进口博览会大数据 地图
    queryRegionalGrouping : '/public/exhibitors/queryRegionalGrouping', // 展位,展商,进口批次，展品价值总额
    qryTotalCount : '/public/expoStatistic/qryTotalCount', // 数据总览
    queryExhPrice : '/public/materialsExamine/queryExhPrice', // 展馆概况仪表盘
    queryAnimalEpidemic : '/public/materialsExamine/queryAnimalEpidemic', //动植物疫情
    getCounInfoByParam : '/public/counContInfo/getCounInfoByParam', // 大洲及一带一路参展国
    queryEpidemicDetails : '/public/materialsExamine/queryEpidemicDetails',

    queryStatisticUsedQuota : '/public/statisticUsedQuota/queryStatisticUsedQuota',
    queryUsedQuotaList : '/public/statisticUsedQuota/queryUsedQuotaList',
    queryStatisticDeclare : '/public/tqbg/queryStatisticDeclare',
    qryZzbAllByCountry: '/zuizibang/qryZzbAllByCountry',

    queryAreaListByHall : '/booth/queryAreaListByHall', //根据展馆号查询展位区域列表及对应巡馆状态
    queryBoothListByArea : '/booth/queryBoothListByArea', //根据展位区域查询展位列表及对应巡馆状态
    qryExhibitorsByBooth : '/booth/qryExhibitorsByBooth', //根据展位查询展商信息列表

    qryHxFlowStatistics: '/public/expoStatistic/qryHxFlowStatistics',//按年查询后续流向金额统计信息
    qryHxFlowGoods: '/public/expoStatistic/qryHxFlowGoods',//查询后续流向具体展品详情信息
    qryHxFlowStatisticsByHs: '/public/expoStatistic/qryHxFlowStatisticsByHs',//根据HS编码类型查询后续流向统计信息

    queryMaterialsExamineList : '/public/materialsExamine/queryMaterialsExamineList',//暂时进境物资风险管理
    queryMaterialsComplex : '/public/materialsExamine/queryMaterialsComplex',//展品风险管理
    queryMaterialsEntry : '/public/materialsExamine/queryMaterialsEntry',//报关单查询
    getListByEntryId : '/public/declare/getListByEntryId',//报关单展品清单查询
    qrySignsByBooth : '/booth/qrySignsByBooth',//根据展位查询巡馆信息列表
    
    queryMaterialsExamineDanger : '/public/materialsExamine/queryMaterialsExamineDanger', //危险品
    queryMaterialsExamineRadiation : '/public/materialsExamine/queryMaterialsExamineRadiation', //辐射
    queryMaterialsExamineFood : '/public/materialsExamine/queryMaterialsExamineFood',// 食品
    queryMaterialsExamineFoodNoPage : '/public/materialsExamine/queryMaterialsExamineFoodNoPage', //  
    queryMaterialsExamineDangerNoPage : '/public/materialsExamine/queryMaterialsExamineDangerNoPage',//
    queryMaterialsExamineRadiationNoPage : '/public/materialsExamine/queryMaterialsExamineRadiationNoPage',//  
    updateExpoList : '/public/materialsExamine/updateExpoList', // 更新处理结果 
    getExhibitsByUserId : '/eb/manageExhiGodds/getExhibitsByUserId', // 货代人员展品数据校对查列表
    removeExhibitsById : '/eb/manageExhiGodds/removeExhibitsById', //货代人员展品数据校对作废
    modifyOneExhibits : '/eb/manageExhiGodds/modifyOneExhibits', // 货代人员展品数据校对编辑
    addOneExhibits : '/eb/manageExhiGodds/addOneExhibits', //货代人员展品数据校对新增
    proof : '/public/letter/proof',//
    queryOptimalService : '/public/exhibitors/queryOptimalService',//

    queryMaterialsExamineForEdit : "/public/materialsExamineApply/queryMaterialsExamineForEdit",//试吃试用申请查询
    queryAllExaminesForEdit : '/public/materialsExamineApply/queryAllExaminesForEdit',//试吃试用申请查询(food)
    editExpoList : '/public/materialsExamineApply/editExpoList',//试吃试用申请修改
    queryMaterialsExaminePrint : '/public/materialsExamineApply/queryMaterialsExaminePrint',//试吃试用申请打印
    queryMaterialsExaminePrintByCertificateno : '/public/materialsExamineApply/queryMaterialsExaminePrintByCertificateno',//试吃试用打印
    LPreferential : '/public/exhibis/LPreferential', //免税
    national : '/public/exhibis/national',//查询涉及展商数
    queryPatrolRecordStatic : '/public/expoIpad/queryPatrolRecordStatic',//
    chkStatistics : '/public/entryHead/chkStatistics',//
    queryMaterialsComplexMeat : '/public/materialsExamine/queryMaterialsComplexMeat',//肉类展品监控

    getExpoUnnormalStateByUser: '/ranger/expoIpad/getExpoUnnormalStateByUser',
    getExpoSignInByUser: '/ranger/expoIpad/getExpoSignInByUser',
    queryImageFiles: '/ep/uploadFile/queryImageFiles',

    /**
     * 货物清单
     * 
     */
    goodsList:'/goodsCosmeticsList/list',//货物清单列表查询
    goodsDelete:'/goodsCosmeticsList/delete',//货物清单删除
    goodsSave:'/goodsCosmeticsList/save',//货物清单保存

    goodsListNew:'/goodsCosmeticsList/getGoodsCosmeticsList',//货物清单列表查询(新)
    goodsSaveNew:'/goodsCosmeticsList/addGoodsCosmeticsList',//货物清单保存(新)


    queryDgList:'/public/shipcompanyinfo/queryDGInfo',//危险品防控清单
    addDgInfo:'/public/shipcompanyinfo/insertDGInfo',//新增危险品信息
    updateDgInfo:'/public/shipcompanyinfo/updateDGInfo',//修改危险品信息   
    deleteDgInfo:'/public/shipcompanyinfo/deleteDGInfo',//删除危险品信息
    queryDGInfo:'/public/shipcompanyinfo/queryForDGInfo',
    queryDGInfoByBlno:'/public/shipcompanyinfo/queryDGInfoByBlno',//根据提单号查询危险品信息
    queryDGInfoByDt:'/public/shipcompanyinfo/queryDGInfoByDt',//根据详细信息查询危险品信息
    getDGInfoRowNumByDt:'/public/shipcompanyinfo/getDGInfoRowNumByDt',//根据提单号查询危险品总数
    getDGInfoRowNumByBlno:'/public/shipcompanyinfo/getDGInfoRowNumByBlno',//根据详细信息查询危险品总数
    /*
    * NECC 数据统计
    */
    qryByTransportmode:'/public/importExpoStatistics/qryByTransportmode', //按运输方式
    qryByHallno:'/public/importExpoStatistics/qryByHallno', //按馆号
    qryByExhibitorcountry:'/public/importExpoStatistics/qryByExhibitorcountry', //按参展商国别
    qryByExhibitorContinent:'/public/importExpoStatistics/qryByExhibitorContinent',//按大洲统计
    statisticExhibitFlowByTransComp:'/public/expoStatistic/statisticExhibitFlowByTransComp',

    //禁止限制类查询
    queryLimitOrForbiddenMessage:'/public/limitList/queryLimitOrForbiddenMessage',
    queryLimitMessage:'/public/limitList/queryLimitMessage',

    //强化监管食品监管查询
    queryFoodQuaran:'/public/limitList/queryFoodQuaran',
    queryStrengthen:'/public/limitList/queryStrengthen',  //强化监管除了食品监管的其他页面展示
    queryEntryVeify:'/public/limitList/queryEntryVeify', //HScode 对比

    //展品流向统计
    qryTotalFlow:'/public/expoStatistic/qryTotalFlow',

    //巡馆记录条数
    queryPatrolRecord:'/public/limitList/queryPatrolRecord',

    //视频大屏查询
    queryVideoByZwh:'/ep/uploadFile/queryVideoByZwh',

    //巡馆异常展示
    queryErrorPatrolRecord:'/public/expoIpad/queryErrorPatrolRecord',

    //入境验证批次
    queryEntryVeify:'/public/limitList/queryEntryVeify',

    //巡展记录查询
    queryPatrolRecord:'/public/limitList/queryPatrolRecord',

    //巡展异常查询
    queryPatrolRecordAmount:'/public/expoIpad/queryPatrolRecordAmount',
    //根据展馆查询展位
    qryBoothnoByHall:'/Api/exhibotor/qryBoothnoByHall',
    //查询试吃试用
    queryTryOutRecord:'/public/expoIpad/queryTryOutRecord',

    //一键呼叫结果查询
    queryScreenApplication: '/Api/exhibotor/queryScreenApplication',

    //展位号动态查询接口
    qryAllBoothno: '/common/qryAllBoothno',

    //展商咨询查询
    queryScreenMsg: '/consult/queryScreenMsg',

    //根据展商名称查询所有图片相对路径地址
    queryImagePathByExhibitor: '/public/expoIpad/queryImagePathByExhibitor',

    //获取卫生检疫病种
    queryEpidemicType: '/public/materialsExamine/queryEpidemicType',
    queryEpidemicType: '/public/materialsExamine/queryEpidemicType',

    queryScreenWasteApplication:'/Api/exhibotor/queryScreenWasteApplication', //废弃物处置

    queryForbidToLimit:'/public/limitList/queryForbidToLimit',// 禁止类变限制类
    queryATAPostpone:'/public/limitList/queryATAPostpone ',  //ATA延期
   
   //通过大类查询该大类所有国家列表
    qryCountryCodeByType: '/exhibitsType/qryCountryCodeByType',

    qryZzbByCountry: '/zuizibang/qryZzbByCountry',
   
    queryFreezing:'/public/limitList/queryFreezing',   //'冷冻榴莲'
    qryBatchAndAmount:'/special/qryBatchAndAmount', //保税展示 


    //根据当前登录承运商查询所有审批通过的证明函编号
    qryAcceptCertNoByUser: '/eb/importExpo/qryAcceptCertNoByUser',
    //根据证明函编号获取物资表体信息
    uqryExpoListByCertNorl: '/eb/importExpo/qryExpoListByCertNo',
    //将证明函信息插入享惠展品确认清单表头和表体
    addConfirmInfo: '/eb/importExpo/addConfirmInfo',
    //查询优惠清单列表
    qryDiscountList:'/discount/qryDiscountList',
    //查询优惠清单展品详情	
    qryExhibitsList:'/discount/qryExhibitsList',
    //更新状态
    updateDiscountStatus:'/discount/updateDiscountStatus',	
    uploadFile:'/discount/uploadFile', //清单附件上传接口
    qryCertnoList:'/discount/qryCertnoList',  //证明函模糊查询
    qryExhibitorList:'/discount/qryExhibitorList', //展商名称模糊查询	
    qryFileList:'/discount/qryFileList', //上传查询

    getEntryCompanyRank:'cusBase/api/company/entryNum/rank',//报关单企业排名
    getEntryCompanyRankDetail:'cusBase/api/company/entryNum/rank-detail',//报关单企业排名详细
  
    uploadExportIEcargodeclar:'/ep/uploadForExcel/uploadExportIEcargodeclar', //企业化妆品出口上传
    uploadIEcargodeclarDeclared:'/ep/uploadForExcel/uploadIEcargodeclarDeclared', //企业化妆品出口报关后上传



    queryExportMaquillageDeclared:'/ep/overSeaCompany/queryExportMaquillageDeclared', //出口报关后查询
    queryExportMaquillageHead:'/ep/overSeaCompany/queryExportMaquillageHead', //出口数据查询
    queryExportMaquillageList:'/ep/overSeaCompany/queryExportMaquillageList', // 出口数据表体查询
    delExportMaquillage:'/ep/overSeaCompany/delExportMaquillage', //出口数据删除
    delMaquillageDeclared:'/ep/overSeaCompany/delMaquillageDeclared', //出口报关后删除
    queryExpoYears:'/public/exhibitors/queryExpoYears' ,  //往届对比获取年份
    queryRegionalGroupingBy2CheckedYears:'/public/exhibitors/queryRegionalGroupingBy2CheckedYears',   //对比洲
    queryExhPriceBy2CheckedYears:'/public/materialsExamine/queryExhPriceBy2CheckedYears',    //对比展品大类
    cusBroGetAuthoList:'/cb/bLAuthoCusBrok/cusBroGetAuthoList',  //报关后企业委托查询

    tgDetail:'/ep/companuFinance/entryNum/echart8',
    changeUserMobile:'seaadmin/mgr/changeUserMobile', //用户绑定手机号

    //关税业务数据接口
    queryPageByParam:'/gsProject/queryPageByParam' , //清单列表查询接口
    updateGsStatuReaded:'/gsProject/updateGsStatuReaded', //企业反馈已读接口
    queryGsDetail:'/gsProject/queryGsDetail', //企业查询接口
    uploadFeedbackMsg:'/customsGsProjectinfo/uploadFeedbackMsg', //企业提交资料接口
    uploadBusFile:'/customsGsProjectinfo/uploadBusFile', //企业文件上传接口
    uploadCusFile:'/customsGsProjectinfo/uploadCusFile', //海关文件上传接口
    downLoadGsFile:'cusBase/customsGsProjectinfo/downLoadGsFile', //企业下载海关文件
    queryGsFilePageByParam:'/gsProject/queryGsFilePageByParam', //海关文件查询
    deleteGsFile:'/customsGsProjectinfo/deleteGsFile',//海关关税文件删除接口
  

    //通关可视化接口
    queryDec:'/cusvisual/queryDec', //通关环节查询

    sendCaptcha:'seaadmin/sms/sendCaptcha',//获取短信验证码
    validate:'seaadmin/sms/validate', //短信验证码校验

    queryCountryCode:'/public/countryCode/queryCountryCode',  //水果冷处理查询国家代码
    queryFruitHScodeList:'/ep/temperature/queryFruitHScodeList',  //水果冷处理查询水果HS代码
    queryFruitTypeList:'/ep/temperature/queryFruitTypeList',  //水果冷处理查询水果类别
    getRSASecretKey:'/public/signMgmt/getRSASecretKey', //获取互联网企业传输秘钥

    //知识产权保护接口部分
    queryEnterUser:'/ip/user/getById', //查询用户信息
    saveUser:'/ip/user/save', //用户注册接口
    addLable:'/ip/label/addLable',  //新增标签
    queryListForBus:'/ip/label/queryListForBus', //标签列表查询接口
    deleteLable:'/ip/label/deleteLable', //标签删除接口
    queryListForCus:'/ip/label/queryListForCus', //海关端查询标签接口
    updateLableForStatus:'/ip/label/updateLableForStatus', //海关端更新状态接口
    excelImport:'/ip/authcompany/excelImport', //授权信息excel导入
    pageQuery:'/ip/user/pageQuery', //授权企业列表查询
    deleteCompany:'/ip/authcompany/delete', //授权企业删除接口
    saveOne:'/ip/authcompany/saveOne', //单个标签新增更新
    fileUpload:'/common/fileUpload', //文件上传接口（知识产权通用接口）
    queryTortRiskinfoList:'/ip/tort/queryTortRiskinfoList', //侵权信息列表查询
    addTortRiskinfo:'/ip/tort/addTortRiskinfo', //新增侵权接口
    getFileInfo:'/common/getFileInfo', //企业注册上传文件查询接口
    querypageQuery:'/ip/authcompany/pageQuery', //上传信息列表查询
    queryTortListForCus:'/ip/tort/queryTortListForCus', //海关端查询侵权信息
    queryTortReadStatusNum:'/ip/tort/queryTortReadStatusNum', //海关端侵权数量查询
    updateReadStatus:'/ip/tort/updateReadStatus', //更新侵权状态
    queryUnReadNum:'/ip/authcompany/queryUnReadNum', //查询授权未读数量
    updateMandateReadStatus:'/ip/authcompany/updateReadStatus',//授权企业已读状态更新
    excelExport:'/ip/authcompany/excelExport', //导出Excel
    addLableFile:'/ip/label/addLableFile', //新增标签附件
    delLableFile:'/ip/label/delLableFile', //删除标签附件
    saveCusNote:'/ip/authcompany/saveCusNote', //海关添加备注

    recordLoginCount:'/customsVisualSearchStatistics/recordLoginCount', //通关可视化统计接口

    queryListForGuarantees:'/bankElecGuarantee/queryListForGuarantees',  //电子保函列表查询
    addGuarantee:'/bankElecGuarantee/addGuarantee', //电子保函新增
    delGuarantee:'/bankElecGuarantee/delGuarantee',  //删除接口
    queryFiles:'/common/queryFiles', //电子保函文件查询

   
    qryPactrolStatistics:'/public/expoIpad/qryPactrolStatistics', //进博会巡馆统计
    exportPactrolStatistics:'/public/expoIpad/exportPactrolStatistics', //巡馆统计导出功能
    qryEBusinessStatistic:'/public/qryEBusinessStatistic',//跨境电商统计

    //进博会通知公告接口
    queryAllNotice:'/expoNotice/queryAllNotice',
    addNotice:'/expoNotice/addNotice',//新增公告
    delNotice:'/expoNotice/delNotice', //删除公告
    updateNotice:'/expoNotice/updateNotice', //修改公告
    addRiskBooth:'/expoRiskBooth/addRiskBooth', //新增高风险展位
    queryAllRiskBooth:'/expoRiskBooth/queryAllRiskBooth', //高风险展位列表查询
    delRiskBooth:'/expoRiskBooth/delRiskBooth', //删除高风险展位
    updateRiskBooth:'/expoRiskBooth/updateRiskBooth', //高风险展位修改
    uploadRiskBoothExcel:'/expoRiskBooth/uploadRiskBoothExcel', //excel导入

    qryRGForCertificate:'/zhgk/qryRGForCertificate', //展境商品查询

    uploadExpoListExcel:'/public/materialsExamine/uploadExpoListExcel', //证明函物资清单导入接口

    queryDccDetail:'/dcc/queryDetail', //数字清关
    qryFXZJNum:'/zggk/qryRiskNumAndEntryNum', //高风险展境展位数量
    qryAllHallCounts:'/zggk/qryAllHallCounts',//  查询暂进展位数量
    
    queryBasicInfoList:'/eb/customsImportExpoBasicInfo/queryBasicInfoList', //进博会展品信息查询
    exportBasicInfoExcel:'/eb/customsImportExpoBasicInfo/exportBasicInfoExcel', //进博会展品信息导出
    queryBasicInfoCount:'/eb/customsImportExpoBasicInfo/queryBasicInfoCount', //进博会展品统计
    
    groupBasicInfo:'/eb/customsImportExpoBasicInfo/groupBasicInfo', //进博会日申报详情
    exportGroupBasicInfoExcel:'/eb/customsImportExpoBasicInfo/exportGroupBasicInfoExcel', //进博会日申报详情导出Excel
    groupBasicInfoTotal:'/eb/customsImportExpoBasicInfo/groupBasicInfoTotal', //进博会总申报统计

    groupExhibitBasicInfo:'/eb/customsImportExpoBasicInfo/groupExhibitBasicInfo', //展馆日申报详情
    groupExhibitBasicInfoTotal:'/eb/customsImportExpoBasicInfo/groupExhibitBasicInfoTotal', //展馆日申报统计

    expoGroupExhibitBasicInfoExcel:'/eb/customsImportExpoBasicInfo/exportGroupExhibitBasicInfoExcel', //会展中心导出
    qryAfterExhibitsManage:'/exhibitsType/qryAfterExhibitsManage', //20年战后流向查询
    qryAfterExhibitsStatistics:'/exhibitsType/qryAfterExhibitsStatistics',  //20年战后流向统计
    downloadAfterExhibitsManageByFlow:'/exhibitsType/downloadAfterExhibitsManageByFlow', //展品查询导出
    downloadAfterExhibitsStatisticsUnHandle:'/exhibitsType/downloadAfterExhibitsStatisticsUnHandle',// 导出未处置展品

    qryPartakeCountryByYear:'/overallSurvey/qryPartakeCountryByYear',// 三年比对
    queryMaterialsAta:'/public/materialsExamine/queryMaterialsAta', //查询ATA

    queryAllAuthorize:'/authorize/queryAllAuthorize', //备案审计列表查询
    updateAuthorize:'/authorize/updateAuthorize', //更新备案数据状态
    queryAllOperationFunction:'/userOperation/queryAllOperationFunction',//查询所有用户操作日志列表
    queryFilesByKey:'/customsErpAttachment/queryFilesByKey', //日志附件
    addOperationFunction:'/userOperation/addOperationFunction',//新增用户操作日志
    queryBasicInfo:'/eb/customsImportExpoBasicInfo/queryBasicInfo', //展品信息查询功能
    queryBasicInfoTotal:'/eb/customsImportExpoBasicInfo/queryBasicInfoTotal', //暂进查询
    groupExhibitCount:'/eb/customsImportExpoBasicInfo/groupExhibitCount',//暂进展品统计1
    groupExhibitTotal:'/eb/customsImportExpoBasicInfo/groupExhibitTotal',//暂进展品统计2
    groupExhibitDetail:'/eb/customsImportExpoBasicInfo/groupExhibitBasicInfoDetail',//暂进展品统计3
    queryGuranteeList:'/public/statisticUsedQuota/queryGuranteeList',//担保额度监控
    queryGuranteeEntryList:'/public/statisticUsedQuota/queryGuranteeEntryList',//担保额度监控2
    entryaddInfo:'/quarantine/addInfo', //入境人员添加
    queryEntryInfo:'/quarantine/queryInfoList',//入境人员查询
    updateEntryInfo:'/quarantine/updateInfo',//修改入境人员
    delEntryInfo:'/quarantine/delInfo', //删除入境人员

    queryOfficeInfo:'/authorizeOffice/queryInfoList',//查询办公点信息列表
    addOfficeInfo:'/authorizeOffice/addInfo',//新增办公点信息
    updateOfficeInfo:'/authorizeOffice/updateInfo',//修改办公点信息
    delOfficeInfo:'/authorizeOffice/delInfo',//删除办公点信息
    searchDeviceInfo:'/authorizeDevice/queryInfoList',//查询设备信息列表
    addDeviceInfo:'/authorizeDevice/addInfo',//新增设备信息
    updateDeviceInfo:'/authorizeDevice/updateInfo',//修改设备信息
    delDeviceInfo:'/authorizeDevice/delInfo',//删除设备信息
    searchCameraInfo:'/authorizeCamera/queryInfoList',//查询摄像头信息
    addCameraInfo:'/authorizeCamera/addInfo',//新增摄像头信息
    delCameraInfo:'/authorizeCamera/delInfo',//删除摄像头信息
    updateCameraInfo:'/authorizeCamera/updateInfo',//更新摄像头信息
    addAuthorInfo:'/authorize/addInfo', //新增用户备案信息
    delAuthorInfo:'/authorize/delInfo',
    searchAuthor:'/authorize/queryUserList',//查询用户信息
    queryAnalysis:'/quarantine/queryAnalysis',//大屏进境人员分析
}
export default interfaceUrl
