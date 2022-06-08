import requset from '../until/requset'

export default {
  // 中博会 物资函 数据下载 搜索
  getDownloadTable (param) {
    return requset({
      method: 'post',
      url: 'expo/public/materialsExamine/queryMaterialsExamine',
      data: JSON.stringify(param)
    })
  },

  // 中博会 物资函 数据下载 导出
  downloadSomeFile (param) {
    return requset({
      method: 'post',
      url: 'expo/public/materialsExamine/exportExcel',
      data: JSON.stringify(param),
      responseType: 'blob',
      responseEncoding: 'ISO8859-1'
    })
  }
}
