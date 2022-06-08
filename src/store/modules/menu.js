const menuState={
    state:{
        activeName:'1',
        menuList:[]
    },
    mutations:{
        setMenu(state,index){
            state.activeName=index
        },
        setMyMenu(state, menus){
            state.menuList = menus;
        }
    },
    actions:{
        ouput:({commit})=>{
            commit(state.activeName)
        }

    }

}
export default menuState
