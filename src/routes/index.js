// import { resolve } from "_uri-js@4.2.2@uri-js";
import GuiBingRoutes from './guibing'

// 一般登录页面
const login = resolve => require(['@/views/login/usuallyLogin.vue'], resolve)
//进博会登录
const zbhLogin = resolve => require(['@/views/login/zbhLogin'], resolve)
//单一窗口登录 
const roleSelect = resolve => require(['@/views/roleSelect/roleSelect'], resolve)

const index = resolve => require(['@/views/public/index.vue'], resolve);
const category = resolve => require(['@/views/enterprise/index.vue'], resolve);
// const addInfor=resolve=>require(['@/views/trade/addInfor/index.vue'],resolve)
// const inforQuery=resolve=>require(['@/views/trade/inforQuery/index'],resolve)
const dismantling = resolve => require(['@/views/enterprise/separateBill/dismantling.vue'], resolve)
const ErpaddInfor = resolve => require(['@/views/enterprise/ERPUpload/index.vue'], resolve)

//tax
const newtable01 = resolve =>　require(['@/views/page/tax/newtable01/newtable01.vue'], resolve)
const customs = resolve => require(['@/views/page/tax/newtable01/customs/customs.vue'],resolve)

const newtable02 = resolve =>　require(['@/views/page/tax/newtable02/newtable02.vue'], resolve)
const AmericaAfrica = resolve =>　require(['@/views/page/tax/newtable02/AmericaAfrica.vue'], resolve)

const newtable = resolve =>　require(['@/views/page/tax/newtable/newtable.vue'], resolve)
const remainQuota = resolve =>　require(['@/views/page/tax/newtable/remainQuota/remainQuota.vue'], resolve)

//企业供应链
const ErpsupplyChain= resolve => require(['@/views/enterprise/ERPsupplyChain/index.vue'], resolve)
const ErpquerySupplyChain= resolve => require(['@/views/enterprise/ERPquerySupplyChina/index.vue'], resolve)
//企业供应链admin查询
const ErpquerySupplyChainAll= resolve => require(['@/views/enterprise/ERPquerySupplyChina/adminindex.vue'], resolve)

//企业ERP信息查询统计模块
const ErpStatistics= resolve => require(['@/views/enterprise/ERPstatistics/index.vue'], resolve)



//企业erp委托上传
const EntrustManagecustom = resolve => require(['@/views/enterprise/entrustManagecustom/index.vue'], resolve)

const ErpCosmetics = resolve => require(['@/views/enterprise/ERPcosmetics/index.vue'], resolve) //企业 化妆品表格下载
const queryErpCosmetics = resolve => require(['@/views/enterprise/ERPcosmetics/queryIndex.vue'], resolve) //企业查询化妆品上传信息
const ErpCosmeticsAll = resolve => require(['@/views/enterprise/ERPcosmetics/adminIndex.vue'], resolve) //企业查询化妆品上传信息



const ErpinforQuery = resolve => require(['@/views/enterprise/ERPSearch/index'], resolve)
const quanjing = resolve => require(['@/views/enterprise/overallView/quanjing.vue'], resolve)
const jbhoverView = resolve => require(['@/views/enterprise/overallView/jbhoverView.vue'], resolve)

const airOverallView = resolve => require(['@/views/enterprise/airOverallView/airOverallView.vue'], resolve)
const overallViewDown = resolve => require(['@/views/enterprise/overallViewDownload/index'], resolve)
const overallViewAnimate = resolve => require(['@/views/enterprise/overallViewDynamics/index'], resolve)
const FWB = resolve => require(['@/views/airlift/inforQuery/FWB.vue'], resolve)
const FSU = resolve => require(['@/views/airlift/inforQuery/FSU.vue'], resolve)
const FHL = resolve => require(['@/views/airlift/inforQuery/FHL.vue'], resolve)
const FFM = resolve => require(['@/views/airlift/inforQuery/FFM.vue'], resolve)
const search = resolve => require(['@/views/enterprise/billSearch/index'], resolve) //海运提单查询
const BillExport = resolve => require(['@/views/enterprise/billExport/export'], resolve)//海运提单导出
const shipDate = resolve => require(['@/views/enterprise/sailingDateSearch/shipDate'], resolve) //船期查询
const trunk = resolve => require(['@/views/enterprise/boxDynamics/trunkInfor'], resolve) //箱状态
const booking = resolve => require(['@/views/enterprise/bookingSpaceSearch/booking'], resolve) //订舱查询
const shipPictrue = resolve => require(['@/views/enterprise/separateBillSearch/shipPictrue'], resolve) //船图查询
const BaoGuanSearch = resolve => require(['@/views/enterprise/customsBillSearch/index.vue'], resolve)
const dismantlingSearch = resolve => require(['@/views/enterprise/customsSearch/index2.vue'], resolve)
const CostomMsgSearchStatus = resolve => require(['@/views/enterprise/customsState/status'], resolve)
const CostomMsgSearchBack = resolve => require(['@/views/enterprise/customsFeedback/back'], resolve)
const baoguanBill = resolve => require(['@/views/enterprise/entrustBroker/bill2.vue'], resolve)
const dismantlingBillNo = resolve => require(['@/views/enterprise/separateBillSearch/dismantlingBillNo.vue'], resolve)
const manageCustom = resolve => require(['@/views/enterprise/entrustCompany/manageCustom'], resolve)
const zhibiao = resolve => require(['@/views/enterprise/indexEvaluation/zhibiao.vue'], resolve) //指标评估
const PortSearch = resolve => require(['@/views/enterprise/portSearch/index'], resolve)
const unknowm = resolve => require(['@/views/truck/onlineSuit/index'], resolve)

const riskManage = resolve => require(['@/views/exhibits/riskManage'], resolve)
const riskManage2 = resolve => require(['@/views/exhibits/riskManage2'], resolve)
const riskManage3 = resolve => require(['@/views/exhibits/adminPage1'], resolve)
const riskManage4 = resolve => require(['@/views/exhibits/adminPage2'], resolve)
const riskManage5 = resolve => require(['@/views/exhibits/adminPage3'], resolve)
const riskManage6 = resolve => require(['@/views/exhibits/application'], resolve)
const riskManage7 = resolve => require(['@/views/exhibits/foodApplication'], resolve)
const exhitionSearch = resolve => require(['@/views/exhibits/exhitionSearch'], resolve)
const meatmonitor = resolve => require(['@/views/exhibits/meatMonitor'], resolve)
const cargoList = resolve => require(['@/views/enterprise/cargoList/index'], resolve)
const cargoUpload = resolve => require(['@/views/enterprise/cargoUpload/index'], resolve)
const fruitColdTreatment = resolve => require(['@/views/enterprise/fruitColdTreatment/index'], resolve)
const dockingOfShips = resolve => require(['@/views/enterprise/dockingOfShips/index'], resolve)
const material = resolve => require(['@/views/enterprise/materialLift'], resolve)
const saleDeclare = resolve => require(['@/views/exhibits/saleDeclare'], resolve)

const needDeal = resolve => require(['@/views/baoguanSearch/needDeal.vue'], resolve)
const needDeal2 = resolve => require(['@/views/baoguanSearch/needDeal2.vue'], resolve)
const entrustQuery = resolve => require(['@/views/baoguanSearch/entrustQuery.vue'], resolve)  //企业委托查询
const rescinded = resolve => require(['@/views/baoguanSearch/rescinded.vue'], resolve)
const rescindedBillNo = resolve => require(['@/views/baoguanSearch/rescindedBillNo.vue'], resolve)
const confirm = resolve => require(['@/views/agentExh/confirm'], resolve)

const zbhLink = resolve => require(['@/views/exhibits/zbhLink'], resolve)
const ZhongBoHui = resolve => require(['@/views/exhibits/search.vue'], resolve)
const ZhongBoHuiDownload = resolve => require(['@/views/exhibits/download.vue'], resolve)
const ZhongBoHuiAdd = resolve => require(['@/views/exhibits/index.vue'], resolve)
const dynamicMonitor2 = resolve => require(['@/views/exhibits/dynamicMonitor.vue'], resolve)
const zbhDetail = resolve => require(['@/views/exhibits/index.vue'], resolve)
const zbhPrint = resolve => require(['@/views/exhibits/print.vue'], resolve)
const searchExhibits = resolve => require(['@/views/exhibits/searchExhitbits/index.vue'], resolve)
const exhibitsDetail = resolve =>require(['@/views/page/CCIE/exhibitsDetail'], resolve)

const ZhongBoHuiExport = resolve => require(['@/views/exhibits/exportExcel.vue'], resolve)
const zbhHSCode = resolve => require(['@/views/exhibits/hscode'], resolve)
const exhibition = resolve => require(['@/views/exhibits/exhibition'], resolve)
const exhibQuery = resolve => require(['@/views/exhibits/query'], resolve)
const queryExpoToPort = resolve => require(['@/views/exhibits/queryExpoToPort'], resolve)
const exhibitionMap = resolve => require(['@/views/exhibits/exhibitionShow/exhibitionOne/index'], resolve)
const exhibitionMapNew = resolve => require(['@/views/exhibits/exhibitionShow/exhibitionOne/indexNew'], resolve)
// const introduce=resolve=>require(['@/views/agentExh/introduction'],resolve)

//展览品大屏部门
const zjindex = resolve => require(['@/views/newciie/newIndex/zjindex'], resolve)


const exhitionSearch2 = resolve => require(['@/views/exhibits/exhitionSearch2'], resolve)
const agent = resolve => require(['@/views/agentExh/uploadFile'], resolve)
const notfound = resolve => require(['@/views/404/index'], resolve)
const trunkpdf = resolve => require(['@/components/uploadPDF/trunkOrder'], resolve)
const billPDF = resolve => require(['@/components/uploadPDF/billPDF'], resolve)
const dgInfo = resolve => require(['@/views/agentExh/dgInfo'], resolve)
const dgList = resolve => require(['@/views/agentExh/dgList'], resolve)
const testExhibition = resolve => require(['@/views/exhibits/exhibitionShow/exhibitionOne/index'], resolve)
/**NECC 数据统计*/
const dataCensus = resolve => require(['@/views/public/dataCensus'], resolve)

const wuliao = resolve => require(['@/views/wuliao'], resolve)

/*新进博会页面*/
const CCIELogin = resolve => require(['@/views/page/CCIE/login/index'], resolve)
const routerLet = resolve => require(['@/views/page/CCIE/index'], resolve)
const firstSrceen = resolve => require(['@/views/page/CCIE/firstSceen'], resolve)
const dealconfirm = resolve => require(['@/views/page/CCIE/manage6+365'], resolve)
const callRecord = resolve => require(['@/views/page/CCIE/callRecord'], resolve)
const consultRecord = resolve => require(['@/views/page/CCIE/consultRecord'], resolve)
const materialLift = resolve => require(['@/views/page/CCIE/materialLift'], resolve)
const proofApprove = resolve => require(['@/views/page/CCIE/proof'], resolve)
const exhibitorAnalyse = resolve => require(['@/views/page/CCIE/exhibitorAnalyse'], resolve)
const exhibitionQuery = resolve => require(['@/views/page/CCIE/exhibitionQuery'], resolve)
const applyQuery = resolve => require(['@/views/page/CCIE/applyQuery'], resolve)
const foodControl = resolve => require(['@/views/page/CCIE/foodControl'], resolve)
const dangerControl = resolve => require(['@/views/page/CCIE/dangerControl'], resolve)
const distributeControl = resolve => require(['@/views/page/CCIE/distributeControl'], resolve)
const meatControl = resolve => require(['@/views/page/CCIE/meatControl'], resolve)
const exhibitionDetail = resolve => require(['@/views/page/CCIE/exhibitionDetail'], resolve)
const rangerRecord = resolve => require(['@/views/page/CCIE/rangerRecord'], resolve)
const rangerInfor = resolve => require(['@/views/page/CCIE/rangerInfor'], resolve)
const agentCensus = resolve => require(['@/views/page/CCIE/agentCencus'], resolve)
const flowOfCommod = resolve => require(['@/views/page/CCIE/flowOfCommod'], resolve)
const proofDetail = resolve => require(['@/views/page/CCIE/proofDetail'], resolve)
const exhibitionPictrue = resolve => require(['@/views/page/CCIE/exhibitionPic'], resolve)
const chainKeepWatch = resolve => require(['@/views/page/CCIE/chainKeepWatch'], resolve)
const overview = resolve => require(['@/views/page/CCIE/overview'], resolve)
const topWordList = resolve => require(['@/views/page/CCIE/topWordList'], resolve)
const globalOverview = resolve => require(['@/views/page/CCIE/globalOverview'], resolve) //全球对比页面
const dataAutoTransfer = resolve => require(['@/views/dataAutoTransfer/index'], resolve)
const dataCollect = resolve => require(['@/views/dataAutoTransfer/dataCollect.vue'], resolve)
const exhibiQuery = resolve => require(['@/views/page/CCIE/exhibiQuery'], resolve)
const xgTotal = resolve => require(['@/views/newciie/xgtotal'], resolve)
const zwlist = resolve => require(['@/views/page/CCIE/rangerInfor/components/zwlist'], resolve)//新增展位列表页面
const newXgTotal = resolve => require(['@/views/newciie/newxgtotal/index'], resolve) //进博会巡馆统计管理
const dzbd = resolve =>  require(['@/views/page/CCIE/J&Y/dzbd.vue'], resolve) //进博会电子保单
const dzbh = resolve =>  require(['@/views/page/CCIE/J&Y/dzbh.vue'], resolve) //进博会电子保函
const crossbussiness = resolve =>  require(['@/views/newciie/crossbussiness/index.vue'], resolve) //进博会电子保函
const entryQuarantine = resolve =>  require(['@/views/newciie/entryquarantine/index.vue'], resolve) //入境人员检疫
const ciieEntryQua = resolve => require(['@/views/ciie-2/ciieEntryQua/index.vue'], resolve) //进博会入境人员检疫
const hgbd = resolve =>require(['@/views/page/CCIE/J&Y/hgbd.vue'], resolve) //后管电子保单
const hgbh = resolve => require(['@/views/page/CCIE/J&Y/hgbh.vue'], resolve) //后管电子保函




const exhibitOverview = resolve => require(['@/views/page/CCIE/exhibitOverview'], resolve)
const specialExhibits = resolve => require(['@/views/page/CCIE/specialExhibits'], resolve)
const jy = resolve => require(['@/views/page/CCIE/J&Y'], resolve)

const tradeway = resolve => require(['@/views/page/CCIE/tradeway'], resolve)  //贸易方式 
const fruitEntry = resolve => require(['@/views/page/CCIE/overflow'],resolve) //溢出效应 各国水果
const taste = resolve => require(['@/views/page/CCIE/taste'],resolve) //试吃试用品尝
const manageWaste = resolve => require(['@/views/page/CCIE/managewaste'],resolve) //试吃试用品尝
const companyRank = resolve => require(['@/views/page/entryCompanyRank/companyRank.vue'],resolve)
const companyRankDetail = resolve => require(['@/views/page/entryCompanyRank/companyRankDetail.vue'],resolve)
const companyRankEchart = resolve => require(['@/views/page/entryCompanyRank/companyRankEchart.vue'],resolve)
const companyRankEchartt =  resolve => require(['@/views/page/entryCompanyRank/companyRankEchartt.vue'],resolve)
const sellQuery = resolve => require(['@/views/exhibits/sellQuery.vue'], resolve)
const sellCheck = resolve => require(['@/views/exhibits/sellCheck.vue'], resolve)
const adminSellQuery = resolve => require(['@/views/exhibits/adminSellQuery.vue'], resolve)
const tariff = resolve => require(['@/views/enterprise/tariff/index.vue'], resolve)
const cusUpload = resolve => require(['@/views/enterprise/tariff/cusUpload.vue'], resolve)
const entervisual = resolve => require(['@/views/enterprise/entervisual/entervisual.vue'], resolve) //通关可视化页面
const property = resolve => require(['@/views/newpages/property/index.vue'], resolve) //知识产权用户列表
const tagslist = resolve => require(['@/views/newpages/property/tagslist.vue'], resolve) //知识产权标签管理
const admintags = resolve => require(['@/views/newpages/adminProperty/admintags.vue'], resolve) //知识产权标海关端标签审核
const mandatelist = resolve => require(['@/views/newpages/property/mandatelist.vue'], resolve) //知识产权授权企业信息列表查询
const busmanage = resolve => require(['@/views/newpages/property/busmanage.vue'], resolve) //注册企业信息管理
const tortmanage = resolve => require(['@/views/newpages/property/tortmanage.vue'], resolve) //侵权信息管理
const tagsdetails = resolve => require(['@/views/newpages/property/tagsdetails.vue'], resolve) //标签tab页详情
// queryAdminMandateAll


const queryAdminTort = resolve => require(['@/views/newpages/adminProperty/queryAdminTort.vue'], resolve) //侵权企业admin端查询
const adminmandatelist = resolve => require(['@/views/newpages/adminProperty/adminmandatelist.vue'], resolve) //侵权信息管理
const queryAdminMandateAll = resolve => require(['@/views/newpages/adminProperty/queryAdminMandateAll.vue'], resolve) //授权信息管理员端查询All
const queryAdminTagsMandate = resolve => require(['@/views/newpages/adminProperty/queryAdminTagsMandate.vue'], resolve) //授权信息管理员公司标签查询
const adminTagsDetails = resolve => require(['@/views/newpages/adminProperty/adminTagsDetails.vue'], resolve) //授权信息管理员公司标签查询

const recordManage = resolve => require(['@/views/newpages/guarantee/recordmanage'], resolve) //担保税款 担保管理
const record = resolve => require(['@/views/newpages/guarantee/record'], resolve) //担保税款 担保管理


const addNotice = resolve => require(['@/views/newciie/notice/addnotice'], resolve) //进博会通知公告发布

const riskIndex = resolve => require(['@/views/newciie/risk/riskindex'], resolve) //进博会高风险展位

const guarenteeView = resolve => require(['@/views/dcc/guarenteeView'], resolve) //数字清关

const queryStatistics = resolve => require(['@/views/newciie/queryStatistics/index'], resolve) //进博会展品查询功能
const allStatistics = resolve => require(['@/views/newciie/queryStatistics/allStatistics'], resolve) //进博会展品统计功能

const follow = resolve => require(['@/views/newciie/follow/index'], resolve) //进博会展品后续流向
const allfollow = resolve => require(['@/views/newciie/allfollow/index'], resolve) //进博会展品后续流向

const authorizelist = resolve => require(['@/views/newciie/authorize/authorizelist'], resolve) //进博会审计备案列表
const operation = resolve =>require(['@/views/newciie/authorize/userOperation'], resolve) //查询所有用户操作日志列表
const officeAddr = resolve=>require(['@/views/newciie/authorize/office'],resolve) //办公点信息管理
const cameraInfo = resolve=>require(['@/views/newciie/authorize/camera'],resolve) //摄像头信息管理
const devieInfo = resolve=>require(['@/views/newciie/authorize/device'],resolve) //设备信息管理

const searchInPerson = resolve => require(['@/views/ciie-2/searchInPerson'], resolve) //参展人员查询
const readFile = resolve =>require(['@/views/newciie/datafile/index.vue'], resolve) //进博会文件列表
const ciieQueryStatistics = resolve=>require(['@/views/ciie-2/ciieQueryStatistics'],resolve) //大屏进博会展品查询、统计

const operationLog = resolve=>require(['@/views/ciie-2/operationLog/index.vue'],resolve)//大屏查看操作日志
const agencyDisposal = resolve=>require(['@/views/page/CCIE/agencyDisposal'],resolve)//大屏-代理企业已处置清单

const userInfo = resolve => require(['@/views/newciie/userInfo/index.vue'], resolve) //进博会大屏用户信息

const routes = [
    { path: '/', redirect: '/login', component: login },
    { path: '/login', component: login, name: 'login' },

    { path: '/zbhLogin', name: 'zbhLogin', component: CCIELogin },
    { path: '/CCIEHome', name: 'routerLet', component: routerLet },
    { path: '/redirect', component: roleSelect, name: 'roleSelect' },
    //此处注释是防止别人收藏为书签的跳转
    // { path: '/companyRank', name: 'companyRank', component: companyRank },
    // { path: '/companyRankDetail', name: 'companyRankDetail', component: companyRankDetail },
    // { path: '/companyRankEchart', name: 'companyRankEchart', component: companyRankEchart },
    {
        path: '/dashboard',
        name: 'index',
        component: index,
        redirect: '/dashboard/category',
        children: [
            GuiBingRoutes,
            
            { path: 'dataAutoTransfer', component: dataAutoTransfer, name: 'dataAutoTransfer' },
            { path: 'dataCollect', component: dataCollect, name: 'dataCollect' },
            { path: 'category', name: 'category', component: category },
            //请勿删除，后期会用 { path: 'tgDetail', name: 'tgDetail', component: companyRankEchartt },
            
            { path: 'ERPsupplyChain', name: 'ERPsupplyChain', component: ErpsupplyChain },  //企业供应链路由
            { path: 'queryERPsupplyChain', name: 'queryERPsupplyChain', component: ErpquerySupplyChain },  //查询企业供应链路由
            { path: 'queryERPsupplyChainAll', name: 'queryERPsupplyChainAll', component: ErpquerySupplyChainAll }, //管理员查询
            { path: 'ErpCosmetics', name: 'ErpCosmetics', component: ErpCosmetics }, //企业化妆品上传
            { path: 'queryErpCosmetics', name: 'queryErpCosmetics', component: queryErpCosmetics }, //企业化妆品信息查询
            { path: 'ErpCosmeticsAll', name: 'ErpCosmeticsAll', component: ErpCosmeticsAll }, //管理员企业化妆品信息查询
            { path: 'tariff', name: 'tariff', component: tariff }, //关税交流平台 企业端
            { path: 'cusUpload', name: 'cusUpload', component: cusUpload }, //关税交流平台 企业端
            { path: 'entervisual', name: 'entervisual', component: entervisual }, //通关可视化
            { path: 'property', name: 'property', component: property }, //产权用户详情
            { path: 'tagslist', name: 'tagslist', component: tagslist }, //产权用户详情
            { path: 'admintags', name: 'admintags', component: admintags }, //产权用户详情
            { path: 'mandatelist', name: 'mandatelist', component: mandatelist }, //授权企业列表
            { path: 'busmanage', name: 'busmanage', component: busmanage }, //注册企业信息管理
            { path: 'tortmanage', name: 'tortmanage', component: tortmanage }, //注册企业信息管理
            { path: 'tagsdetails', name: 'tagsdetails', component: tagsdetails }, //企业标签页详情

            //担保税款
            { path: 'recordManage', name: 'recordManage', component: recordManage }, //担保税款管理
            { path: 'record', name: 'record', component: record }, //担保税款详情
            

            { path: 'adminmandatelist', name: 'adminmandatelist', component: adminmandatelist }, //注册企业信息管理
            { path: 'queryAdminTort', name: 'queryAdminTort', component: queryAdminTort }, //侵权企业admin端查询
            { path: 'queryAdminMandateAll', name: 'queryAdminMandateAll', component: queryAdminMandateAll }, //授权企业admin端查询
            { path: 'queryAdminTagsMandate', name: 'queryAdminTagsMandate', component: queryAdminTagsMandate }, //授权企业admin端公司标签查询
            { path: 'adminTagsDetails', name: 'adminTagsDetails', component: adminTagsDetails }, //admin端公司标签分类查询
            
            { path: 'ErpStatistics', name: 'ErpStatistics', component: ErpStatistics }, //管理员ERP信息查询与统计
            { path: 'entrustManagecustom', name: 'entrustManagecustom', component: EntrustManagecustom }, //企业ERP委托上传
            
            { path: 'ERPInformationUpload', name: 'ERPInformationUpload', component: ErpaddInfor },
            { path: 'ERPInformationInquiry', name: 'ERPInformationInquiry', component: ErpinforQuery },
            { path: 'material', name: 'material', component: material },
            // { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
            { path: 'FWB', component: FWB, name: 'FWB' },
            { path: 'FSU', component: FSU, name: 'FSU' },
            { path: 'FHL', component: FHL, name: 'FHL' },
            { path: 'FFM', component: FFM, name: 'FFM' },
            { path: 'dgInfo', component: dgInfo, name: 'dgInfo' },
            { path: 'dgList', component: dgList, name: 'dgList' },
            { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
           
            { path: 'AirPanoramicDisplay', name: 'airOverallView', component: airOverallView },
            { path: 'IndexEvaluation', name: 'IndexEvaluation', component: zhibiao },
            { path: 'search', component: search, name: 'search' },
            { path: 'BillExport', component: BillExport, name: 'BillExport' },
            { path: 'shipQuery', component: shipDate, name: 'shipDate' },
            { path: 'trunkInfor', component: trunk, name: 'trunk' },
            { path: 'booking', component: booking, name: 'booking' },
            { path: 'shipPictrue', component: shipPictrue, name: 'shipPictrue' },
            { path: 'dismantlingSearch', component: dismantlingSearch, name: 'dismantlingSearch' },
            // { path: 'managecustom', component: manageCustom, name: 'manageCustom' },
            { path: 'managecustom', component: manageCustom, name: 'airmanageCustom' },
            { path: 'baoguanbill', component: baoguanBill, name: 'baoguanBill' },
            { path: 'airbaoguanbill', component: baoguanBill, name: 'airbaoguanBill' },
            { path: 'dismantlingBillNo', component: dismantlingBillNo, name: 'dismantlingBillNo' },
            { path: 'costomMsgSearchStatus', component: CostomMsgSearchStatus, name: 'costomMsgSearchStatus' },
            { path: 'costomMsgSearchBack', component: CostomMsgSearchBack, name: 'costomMsgSearchBack' },
            { path: 'baoguanSearch', component: BaoGuanSearch, name: 'baoguanSearch' },
            { path: 'baoguanSearchair', component: BaoGuanSearch, name: 'baoguanSearchair' },
            { path: 'dismantling', component: dismantling, name: 'dismantling' },
            { path: 'needdeal', component: needDeal, name: 'needDeal' },
            { path: 'needdeal2', component: needDeal2, name: 'needDeal2' },
            { path: 'entrustQuery', component: entrustQuery, name: 'entrustQuery'},
            { path: 'rescinded', component: rescinded, name: 'rescinded' },
            { path: 'rescindedBillNo', component: rescindedBillNo, name: 'rescindedBillNo' },
            { path: 'portSearch', component: PortSearch, name: 'portSearch' },
            { path: 'downExcel', component: overallViewDown, name: 'overallViewDown' },
            { path: 'unknowm', component: unknowm, name: 'unknown' },
            { path: 'exhitionSearch', component: exhitionSearch, name: 'exhitionSearch' },
            // { path:"confirm",component:confirm,name:'confirm'},
            { path: 'zhongbohui', component: ZhongBoHui, name: "zhongbohui" },
            { path: 'downloadZBH', component: ZhongBoHuiDownload, name: 'zhongbohuiDownload' },
            { path: 'addZBH', component: ZhongBoHuiAdd, name: 'addZBH' },
            { path: 'exportZBH', component: ZhongBoHuiExport, name: 'ZhongBoHuiExport' },
            { path: 'zbhHSCode', component: zbhHSCode, name: "zbhHSCode" },
            { path: 'exhibition', component: exhibition, name: 'exhibition' },
            // { path: 'ERPInformationUpload',name: 'ERPInformationUpload',component: ErpaddInfor},
            { path: 'ERPInformationInquiry', name: 'ERPInformationInquiry', component: ErpinforQuery },
            { path: 'exhibQuery', component: exhibQuery, name: 'exhibQuery' },
            { path: 'zbhDetail', component: zbhDetail, name: 'zbhDetail' },
            { path: "confirm", component: confirm, name: 'confirm' },
            // { path:'introduce',component:introduce,name:'introduce'},
            { path: 'PanoramicDisplay', name: 'PanoramicDisplay', component: quanjing },
            { path: 'queryExpoToPort', component: queryExpoToPort, name: 'queryExpoToPort' },
            { path: 'riskManage', component: riskManage, name: 'riskManage' },
            { path: 'riskManage2', component: riskManage2, name: 'riskManage2' },
            { path: 'riskManage3', component: riskManage3, name: 'riskManage3' },
            { path: 'riskManage4', component: riskManage4, name: 'riskManage4' },
            { path: 'riskManage5', component: riskManage5, name: 'riskManage5' },
            { path: 'riskManage6', component: riskManage6, name: 'riskManage6' },
            { path: 'riskManage7', component: riskManage7, name: 'riskManage7' },
            // {path:'exhitionSearch',component:exhitionSearch,name:'exhitionSearch'},
            { path: 'meatmonitor', component: meatmonitor, name: 'meatmonitor' },
            { path: 'zbhPrint', component: zbhPrint, name: 'zbhPrint' },
            { path: 'saleDeclare', component: saleDeclare, name: 'saleDeclare' },
            { path: 'exhibitionSearch2', component: exhitionSearch2, name: 'exhitionSearch2' },
            { path: "agent", component: agent, name: 'agent' },
            { path: 'zbhLink', component: zbhLink, name: 'zbhLink' },
            { path: 'cargoList', component: cargoList, name: 'cargoList' },
            { path: 'cargoUpload', component: cargoUpload, name: 'cargoUpload' },
            { path: 'dataCensus', component: dataCensus, name: 'dataCensus' },
            { path: 'wuliao', component: wuliao, name: 'wuliao' },
            { path: '/billPDF', component: billPDF, name: 'billPDF' },
            { path: '/trunkpdf', component: trunkpdf, name: 'trunkOrder' },
            { path: 'fruitColdTreatment', component: fruitColdTreatment, name: 'fruitColdTreatment' },
            { path: 'dockingOfShips', component: dockingOfShips, name: 'dockingOfShips' },
            { path: 'guarenteeView', component: guarenteeView, name: 'guarenteeView' },
            { path: "searchExhibits", component:searchExhibits, name: 'searchExhibits'},
            { path: 'exhibitsDetail', component:exhibitsDetail, name:'exhibitsDetail'},
            { path: 'notfound', component: notfound },
             //通知发布
            { path: 'addNotice', component: addNotice, name: 'addNotice' },
            { path: 'riskIndex', component: riskIndex, name: 'riskIndex' },
            { path: 'newXgTotal', component: newXgTotal, name: 'newXgTotal' },
            
            { path: 'queryStatistics', component: queryStatistics, name:'queryStatistics' }, //进博会展品查询
            { path: 'allStatistics', component: allStatistics, name:'allStatistics' }, //进博会展品统计
            { path: 'follow', component: follow, name:'follow' }, //进博会展品查询
            { path: 'allfollow', component: allfollow, name:'allfollow' }, //进博会展品统计

            { path: 'authorizelist', component: authorizelist, name:'authorizelist' }, //进博会审计列表
            { path: 'operation', component: operation, name:'operation' }, //用户操作日志查询
            { path: 'officeAddr', component: officeAddr, name:'officeAddr'},
            { path: 'devieInfo', component: devieInfo, name:'devieInfo'},
            { path: 'cameraInfo', component: cameraInfo, name:'cameraInfo'},
            { path: 'entryQuarantine', component: entryQuarantine, name:'entryQuarantine'}, //入境人员检疫2217

            {path: 'hgbd',component: hgbd, name:'hgbd'},
            {path: 'hgbh',component: hgbh, name:'hgbh'},
           
            
            {path:'newtable',
                name:'newtable',
                component:newtable,
                // redirect:'/newtable/remainQuota',
                children:[
                    {path:'remainQuota',name:'RemainQuota',component:remainQuota}
                    
            ]},
            {path:'newtable01',
                name:'newtable01',
                component:newtable01,
                    //redirect:'/newtable/customs',
                    children:[
                        {path:'customs/:id',name:'Customs',component:customs}
                    
                    ]
            },
            {path:'newtable02',
            name:'newtable02',
            component:newtable02,
                redirect:'/dashboard/newtable02/America',
                children:[
                    {path:'America',name:'Americas',component:AmericaAfrica},
                    {path:'Africa',name:'Africas',component:AmericaAfrica}
                
                ]
            },
            {
                path:'sellQuery',
                name:'sellQuery',
                component:sellQuery
            },
            {
                path:'sellCheck',
                name:'sellCheck',
                component:sellCheck
            },
            {
                path:'adminSellQuery',
                name:'adminSellQuery',
                component:adminSellQuery
            },
        ]
    },
    {
        path: '/CCIE', name: 'CCIE', component: routerLet,
        // redirect: '/CCIE/firstSrceen',
        children: [
            { path: 'materialLift', component: materialLift, name: 'materialLift', meta: { descriptionTitle: '进博会物资快放情况查询' } },
            { path: 'dealconfirm', component: dealconfirm, name: 'dealconfirm', meta: { descriptionTitle: '衍生交易合同确认' } },
            { path: 'proofApprove', component: proofApprove, name: 'proofApprove', meta: { descriptionTitle: '物资证明函审批状态查询' } },

            { path: 'exhibitorAnalyse', component: exhibitorAnalyse, name: 'exhibitorAnalyse', meta: { descriptionTitle: '展商分析统计' } },
            { path: 'exhibitionQuery', component: exhibitionQuery, name: 'exhibitionQuery', meta: { descriptionTitle: '展品查询分析' } },
            { path: 'applyQuery', component: applyQuery, name: 'applyQuery', meta: { descriptionTitle: '品尝试用散发申请查询' } },
            { path: 'foodControl', component: foodControl, name: 'foodControl', meta: { descriptionTitle: '食品农产品核辐射监控' } },
            
            { path: 'dangerControl', component: dangerControl, name: 'dangerControl', meta: { descriptionTitle: '危险化学品风险监控' } },
            { path: 'distributeControl', component: distributeControl, name: 'distributeControl', meta: { descriptionTitle: '试用品尝散发风险监控' } },
            { path: 'meatControl', component: meatControl, name: 'meatControl', meta: { descriptionTitle: '肉类风险监控' } },
                
            { path: 'callRecord', component: callRecord, name: 'callRecord', meta: { descriptionTitle: '一键呼叫受理查询' } },
            { path: 'consultRecord', component: consultRecord, name: 'consultRecord', meta: { descriptionTitle: '展商咨询受理查询' } },
            { path: 'taste', component:  taste, name: 'taste', meta: { descriptionTitle: '品尝、试用、散发查询' } },
            { path: 'manageWaste', component:  manageWaste, name: 'manageWaste', meta: { descriptionTitle: '废弃物处置登记查询' } },

            { path: 'rangerRecord', component: rangerRecord, name: 'rangerRecord', meta: { descriptionTitle: '巡馆记录' } },
            { path: 'rangerInfor', component:  rangerInfor, name: 'rangerInfor'},
            { path: 'zwlist', component:  zwlist, name: 'zwlist', meta: { descriptionTitle: '展位列表' }},
            { path: 'exhibitionDetail', component:  exhibitionDetail, name: 'exhibitionDetail', meta: { descriptionTitle: '展品明细及流向监控查询' } },
            { path: 'agentCensus', component:  agentCensus, name: 'agentCensus', meta: { descriptionTitle: '各主场承运商汇总统计数据' } },
            { path: 'flowOfCommod', component:  flowOfCommod, name: 'flowOfCommod', meta: { descriptionTitle: '展后商品流向分析' } },
            { path: 'proofDetail', component:  proofDetail, name: 'proofDetail'},
            { path: 'exhibitOverview', component:  exhibitOverview, name: 'exhibitOverview', meta: { descriptionTitle: '展品分类' } },
            { path: 'exhibitionPictrue', component:  exhibitionPictrue, name: 'exhibitionPictrue', meta: { descriptionTitle: '展馆图' } },
            { path: 'specialExhibits', component:  specialExhibits, name: 'specialExhibits', meta: { descriptionTitle: '特色展品' } },
            { path: 'jy', component:  jy, name: 'jy', meta: { descriptionTitle: '通关监管数据' } },
            { path: 'exhibiQuery', component:  exhibiQuery, name: 'exhibiQuery', meta: { descriptionTitle: '展商展品查询' } },
            { path: 'xgTotal', component:  xgTotal, name: 'xgTotal', meta: { descriptionTitle: '巡馆统计' } },
            { path: 'dzbd', component:  dzbd, name: 'dzbd', },
            { path: 'dzbh', component:  dzbh, name: 'dzbh', },
            { path: 'searchInPerson', component:  searchInPerson, name: 'searchInPerson', meta: { descriptionTitle: '参展人员查询' } },

            { path: 'chainKeepWatch', component:  chainKeepWatch, name: 'chainKeepWatch', meta: { descriptionTitle: '按展位链式监管' } },
            { path: 'overview', component:  overview, name: 'overview', meta: { descriptionTitle: '总体概况' } },
            { path: 'topWordList', component:  topWordList, name: 'topWordList' },
            { path: 'globalOverview', component:  globalOverview, name: 'globalOverview', meta: { descriptionTitle: '参展概况' } },
            { path: 'tradeway', component:  tradeway, name: 'tradeway', meta: { descriptionTitle: '贸易方式' } },
            { path: 'fruitEntry', component:  fruitEntry, name: 'fruitEntry', meta: { descriptionTitle: '进博会效应凸显，各国水果加快入境' } },
            { path: 'readFile', component:  readFile, name: 'readFile', meta: { descriptionTitle: '文件' } },
            { path: 'ciieQueryStatistics', component: ciieQueryStatistics, name:'ciieQueryStatistics', meta:{descriptionTitle:'进博会数据统计'}},
            { path: 'jbhoverView', component: jbhoverView, name:'jbhoverView',meta: { descriptionTitle: '全景展示' } },
            { path: 'operationLog', component: operationLog, name:'operationLog',meta: { descriptionTitle: '操作日志查询' } },
            { path: 'ciieQueryStatistics', component: ciieQueryStatistics, name:'ciieQueryStatistics', meta:{descriptionTitle:'进博会数据统计'}},
            { path: 'crossbussiness', component: crossbussiness, name:'crossbussiness', meta:{descriptionTitle:'转跨境电商'}},
            { path: 'agencyDisposal', component: agencyDisposal, name:'agencyDisposal', meta:{descriptionTitle:'已处置报关单清单'}},
            { path: 'ciieEntryQua', component: ciieEntryQua, name:'ciieEntryQua',meta:{descriptionTitle:'入境人员检疫分析'}},
            { path: 'userInfo', component: userInfo, name:'userInfo',meta:{descriptionTitle:'登陆用户信息'}},
            
           
          
           
        ]
    },
    { path: '/dynamicMonitor2', component: dynamicMonitor2, name: 'dynamicMonitor2' },
    { path: '/exhibitionMap', component: exhibitionMap, name: 'exhibitionMap' },
    { path: '/exhibitionMapNew', component: exhibitionMapNew, name: 'exhibitionMapNew' },
    { path: '/overall', component: overallViewAnimate, name: 'overallViewAnimate' },
    //展览品大屏部分
    { path: '/zjindex', component: zjindex, name: 'zjindex' },


    { path: '/testExhibition', component: testExhibition, name: 'testExhibition' },
    
    { path: '**', redirect: '/dashboard/notfound', component: notfound },
    
]
export default routes
