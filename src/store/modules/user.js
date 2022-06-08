import {getCookie} from '@/until/getToken'
const user={
    state:{
        token:'',
        name:'',
        router:[]
    },
    mutations:{
        set_token(state,token){
            state.token=token
        },
        setUserName(state,name){
            state.name=name
        },
        setRouter(state){

        }
    },
    actions:{
        ouput:({commit})=>{
            commit(state.token)
        }

    }

}
export default user
