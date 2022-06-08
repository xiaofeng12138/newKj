import requset from '../until/requset'


export default {
  /*
  获取提单 list
  */
  getBillList (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/queryBLList',
      data: JSON.stringify(param)
    })
  },

  /*
  获取提单下的订单 list，未关联
  包含订单对应的物料 list
  */
  getOrderList (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/queryUnNulNotePOList',
      data: JSON.stringify(param)
    })
  },

  /*
  提单与物料建立绑定关系
  */
  mergeRelation (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/addBlAlLinkPOList',
      data: JSON.stringify(param)
    })
  },

  /*
  建立绑定关系后，得到的预归并列表
  */
  getPreMergeList (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/queryAlNulNotePOListAddMatRela',
      data: JSON.stringify(param)
    })
  },

  /*
  提交归并列表
  */
  sumbitMergeList (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/changeBlAlLinkPOList',
      data: JSON.stringify(param)
    })
  },

  /*
  手动归并，得到归并结果
  */
  getMergeResultList (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/queryAlNulNotePOListAfMerger',
      data: JSON.stringify(param)
    })
  },

  /*
  提单下的订单list，已关联
  */
  getOrderListYGL (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/queryAlNulNotePOList',
      data: JSON.stringify(param)
    })
  },

  /*
  删除已关联的提单的 关联关系
  */
  delOrderYGL (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/removeAlNulNotePOList',
      data: JSON.stringify(param)
    })
  },

  /*
  提单预览list（报关单预览）
  */
  billPreview (param) {
    return requset({
      method: 'post',
      url: 'ep/bLLinkWithOrder/getMergeredBLList',
      data: JSON.stringify(param)
    })
  },

    /*
  报关行提单预览list（报关单预览）
  */
    customsBrokerBillPreview (param) {
        return requset({
            method: 'post',
            url: 'ep/bLLinkWithOrder/customsBrokerGetMergeredBLList',
            data: JSON.stringify(param)
        })
    },

  /*
  报关单预览 详细信息（含物料列表）
  */
  getViewModalData (param,url) {
    return requset({
      method: 'post',
      url: url ||'ep/bLLinkWithOrder/seeBlAlLinkPOList',
      data: JSON.stringify(param)
    })
  },

  /*
  报关单预览 导出文件
  */
  xmlDownload (param,url) {
    return requset({
      method: 'post',
      url: url || 'ep/bLLinkWithOrder/downloadXmlFileByBLNo',
      data: JSON.stringify(param),
      responseType: 'blob',
      responseEncoding: 'IS08859-1'
    })
  },
  ///*
    //   报关单预览 上传
    //   */
    xmlUpload (param,url) {
        return requset({
            method: 'post',
            url: url ||'ep/bLLinkWithOrder/downloadXmlFileByBLNo',
            data: JSON.stringify(param)
        })
    }
}
