const exhibition = {
    namespaced:true,
    state: {
        basisBody:[],
        detailDataUnit:{
            caseno:"",
            dimension:"",
            length:"",
            width:"",
            height:"",
            growssweight:"",
            netweight:"",
            goodsdescription:"",
            goodsdescriptioncn:"",
            countryoforigin:"",
            quantity:"",
            quantityunit:"",
            unitprice:"",
            totalprice:"",
            hscode:"",
            disposals:"",
            tryoutFlag:"0",
            tryout:"",
            tasteFlag:"0",
            taste:"",
            distributeFlag:"0",
            distribute:"",
            companyid:""
        },
    },
    mutations:{
        changeBodyValue(state,value){
            state.basisBody = value ;
        },

        changeBodyUnit(state,{key,value,index}){
            state.basisBody[index][key] = value;
        },
        //刷新
        resetBasisBody(state,value){
            state.basisBody = []
            if(value){
                if(Object.prototype.toString.call(value) === '[object Object]'){
                    let newUnit = {};
                    for (let key in value){
                        newUnit[key] =   value[key]
                    }
                    state.basisBody.push(newUnit);
                }
                else if(Object.prototype.toString.call(value) === '[object Array]'){
                   for (let i = 0; i < value.length;i++){
                       let newUnit = {};
                       for (let key in value[i]){
                           newUnit[key] =   value[i][key]
                       }
                       state.basisBody.push(newUnit);
                   }
                }
                else{
                    state.basisBody = value;
                }


            }
        },
        changeBodyLength(state,length){
            for (let i = state.basisBody.length; i < length;i++){
                let newUnit = {};
                for (let key in state.detailDataUnit){
                    newUnit[key] =   state.detailDataUnit[key]
                }
                state.basisBody.push(newUnit);
            }
        },
        addBodyLength(state){
            let newUnit = {};
            for (let key in state.detailDataUnit){
                newUnit[key] =   state.detailDataUnit[key]
            }
            state.basisBody.push(newUnit);
        }
    },
    actions:{
        changeBodyUnit({ commit },{key,value,index}){
            commit('changeBodyUnit', {key,value,index})
        },
        resetBasisBody({ commit },value){
            commit('resetBasisBody', value)
        },
        changeBodyLength({ commit },length){
            commit('changeBodyLength', length)
        },
        addBodyLength({ commit }){
            commit('addBodyLength')
        },
        getBasisBody(){

        }

    }
}

export default exhibition