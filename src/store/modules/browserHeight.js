const Bh={
    state:{
        height:0
    },
    mutations:{
        set_height(state,height){
            state.height=height
        }
    },
    actions:{
        ouput:({commit})=>{
            commit(state.height)
        }

    }

}
export default Bh
