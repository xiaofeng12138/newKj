const mergeLists={
    state:{
        result:{
            billNo:'',
            list:[]
        }
    },
    mutations:{
        setLists(state,arr){
            var index=state.result.list.indexOf(arr)
            // console.log(arr)
            if(index>=0){
                state.result.list[index]=arr
            }else{
                state.result.list.push(arr)
            }
            // console.log(state.result.list)
        },
        setbillNo(state,num){
            state.result.billNo=num
        },
        delete(state,arr){
            state.result.list.splice(state.result.list.indexOf(arr),1)
        },
        clearList(state,arr){
            state.result.list=arr
        }
    }

}
export default mergeLists