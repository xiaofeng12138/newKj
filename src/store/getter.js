const getters = {
  activeName:state=>state.menuState.activeName,
  token:state=>state.user.token,
  name:state=>state.user.name,
  textIntroduce:state=>state.text.currentText,
  mergeResult:state=>state.mergeLists.result,
  routerFlag:state=>state.status.flag
}
export default getters