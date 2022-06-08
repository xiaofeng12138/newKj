const access = {
    AIR: ['category', 'FFM', 'FHL', 'FSU', 'FWB', 'airOverallView', 'zbhLogin', 'CCIELogin'],
    EP: [ 'category','fruitColdTreatment', 'dockingOfShips', 'ERPInformationInquiry', 'asdf', 'ERP', 'ERPa', 'PanoramicDisplay', 'overallViewDown',
        'costomMsgSearchStatus', 'costomMsgSearchBack', 'search', 'BillExport', 'shipDate', 'trunk', 'booking', 'shipPictrue',
        'ERPInformationUpload', 'bill', 'baoguanSearch', 'baoguanSearchair', 'dismantlingSearch', 'manageCustom', 'baoguanBill', 'overallViewAnimate',
        'dismantlingBillNo', 'order', 'result', 'concat', 'IndexEvaluation', 'portSearch', 'sort', 'dismantling', 'AirBill', 'airmanageCustom', 'airbaoguanBill', 'FWB',
        'FSU','addNotice', 'FHL', 'FFM', 'airOverallView', 'billPDF', 'trunkOrder', 'zbhLogin', 'dataAutoTransfer','dataCollect','ERPsupplyChain','queryERPsupplyChain', 'entrustManagecustom', 'material','ErpCosmetics','queryErpCosmetics','tgDetail','tariff','cusUpload','entervisual'],
    CA: ['search', 'shipDate', 'trunk', 'booking', 'shipPictrue', 'portSearch', 'PanoramicDisplay',
        'overallViewDown', 'overallViewAnimate', 'category', 'zbhLogin'],
    FF: ['PanoramicDisplay', 'overallViewDown', 'overallViewAnimate', 'zbhLogin','needDeal', 'concat', 'sort', 'baoguanSearch', 'needDeal2', 'rescinded', 'rescindedBillNo', 'costomMsgSearchStatus', 'search', 'trunk',
    'shipDate', 'booking', 'shipPictrue','entervisual', 'PanoramicDisplay', 'overallViewAnimate','fruitColdTreatment', 'dockingOfShips', 'overallViewDown', 'wuliao','dataAutoTransfer','entrustQuery'],
    TR: ['unknown', 'zbhLogin'],
    TU: ['newtable01', 'newtable', 'Americas', 'Customs', 'RemainQuota', 'newtable02', 'Africas'],
    EO: ['confirm', 'zbhLogin'],
    DA: ['riskManage', 'riskManage2', 'riskManage7', 'zbhLogin', 'riskManage3'],
    DB: ['riskManage', 'riskManage2', 'zbhLogin', 'riskManage4'],
    DC: ['riskManage', 'riskManage2', 'zbhLogin', 'riskManage5'],
    SJ: ['riskManage', 'exhitionSearch', 'zbhLogin'],
    CB: ['needDeal', 'concat', 'sort', 'baoguanSearch', 'needDeal2', 'rescinded', 'rescindedBillNo', 'costomMsgSearchStatus', 'search', 'trunk',
        'shipDate', 'booking', 'shipPictrue', 'PanoramicDisplay', 'overallViewAnimate', 'overallViewDown', 'wuliao','dataAutoTransfer','FWB',
        'FSU', 'FHL', 'FFM','entrustQuery','entervisual','tariff','fruitColdTreatment', 'dockingOfShips','guarenteeView'],
    EA: ['zbhLink', 'category', 'zhongbohui', 'zhongbohuiDownload', 'ZhongBoHuiExport', 'zbhHSCode', 'exhibition', 'ERPInformationUpload',
        'ERPInformationInquiry', 'exhibQuery', 'zbhDetail', 'introduce', 'PanoramicDisplay', 'queryExpoToPort', 'testExhibition',
        'riskManage', 'riskManage2', 'riskManage3', 'riskManage4', 'riskManage5', 'riskManage7', 'exhitionSearch', 'meatmonitor', 'overallViewAnimate', 'dynamicMonitor2', 'confirm',
        'exhibitionMap', 'testExhibition', 'zbhLogin'],
    EB: ['zbhLink', 'zhongbohui', 'addZBH', 'zbhDetail', 'ZhongBoHuiExport', 'zbhHSCode', 'zhongbohuiDownload', 'exhibition', 'zbhPrint',
        'exhitionSearch2', 'riskManage6', 'zbhLogin', 'saleDeclare','sellQuery','recordManage','record'],
    EC: ['zbhLink', 'zhongbohui', 'zhongbohuiDownload', 'zbhDetail', 'zbhPrint', 'dataCensus', 'zbhLogin',
        'exhitionSearch2', 'riskManage6', 'zbhLogin','sellQuery','sellCheck','adminSellQuery'],
    EI: ['agent', 'confirm', 'zbhLogin'],
    CO: ['dgInfo', 'dgList', 'zbhLogin'],
    ESH: ['CCIE', 'materialLift', 'dealconfirm', 'proofApprove', 'exhibitorAnalyse', 'exhibitionQuery', 'applyQuery', 'foodControl', 'dangerControl','proofDetail',
            'distributeControl','meatControl','rangerRecord','rangerInfor','exhibitionDetail','dynamicMonitor2','exhibitionMapNew','zjindex','agentCensus','zbhDetail', 'exhibiQuery',
        'exhibitionPictrue','chainKeepWatch', 'specialExhibits', 'jy', 'exhibitOverview', 'overview', 'topWordList','tradeway','fruitEntry', 'flowOfCommod', 'callRecord', 
        'consultRecord','taste','manageWaste','globalOverview','xgTotal','searchInPerson','zwlist','readFile','jbhoverView', 'ciieQueryStatistics','dzbd','dzbh',
        'crossbussiness','operationLog','agencyDisposal','ciieEntryQua','userInfo'],
    EQ:['category', 'cargoList', 'cargoUpload',],
    ea: ['category', 'ERP', 'asdf'],
    EN:['category','queryERPsupplyChainAll','ErpStatistics','ErpCosmeticsAll'], //供应链企业管理角色admin
    CU:['zbhLink', 'adminSellQuery'],
     //测试报告
    TESTEP:['category','fruitColdTreatment', 'dockingOfShips', 'ERPInformationInquiry', 'asdf', 'ERP', 'ERPa', 'PanoramicDisplay', 'overallViewDown',
    'costomMsgSearchStatus', 'costomMsgSearchBack', 'search', 'BillExport', 'shipDate', 'trunk', 'booking', 'shipPictrue',
    'ERPInformationUpload', 'bill', 'baoguanSearch', 'baoguanSearchair', 'dismantlingSearch', 'manageCustom', 'baoguanBill', 'overallViewAnimate',
    'dismantlingBillNo', 'order', 'result', 'concat', 'IndexEvaluation', 'portSearch', 'sort', 'dismantling', 'AirBill', 'airmanageCustom', 'airbaoguanBill', 'FWB',
    'FSU', 'FHL', 'FFM', 'airOverallView', 'billPDF', 'trunkOrder', 'zbhLogin', 'dataAutoTransfer','ERPsupplyChain','queryERPsupplyChain', 'entrustManagecustom'],
    //测试报告
    TESTCB:['needDeal', 'concat', 'sort', 'baoguanSearch', 'needDeal2', 'rescinded', 'rescindedBillNo', 'costomMsgSearchStatus', 'search', 'trunk',
        'shipDate', 'booking', 'shipPictrue', 'PanoramicDisplay', 'overallViewAnimate', 'overallViewDown', 'wuliao','dataAutoTransfer'],
    //测试关税业务角色 
    GSCUS:['category','tariff','cusUpload'], //海关角色 
    GSBUS:['category', 'tariff'], //企业角色
    OE:['category','property','tagslist','mandatelist','busmanage','tortmanage','tagsdetails'], //权利人企业端
    OC:['category','admintags','adminmandatelist','queryAdminTort','queryAdminMandateAll','queryAdminTagsMandate','adminTagsDetails'], //权利人海关端
    BK:['category','recordManage','record',],  //银行角色
    ESHA:['zbhLink','addNotice','riskIndex','queryStatistics','allStatistics','follow','allfollow','newXgTotal','searchExhibits','exhibitsDetail','entryQuarantine','hgbd','hgbh'],
    ESEC:['zbhLink','authorizelist','operation','officeAddr','devieInfo','cameraInfo'],
    EPT:['category','ERPInformationUpload'],
};

export default access