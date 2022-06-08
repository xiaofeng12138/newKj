<template>
    <div class="myZBHPrint">
        <div class="myZBHPrint1">
            <prove-letter-temp :basis="basis" :disableStatus="true" :printCSS="true"></prove-letter-temp>
        </div>
        <div class="myZBHPrint2" style="height:500px">
            <detail-table :key="detailUnit.page" v-for="detailUnit in detailData" :disableStatus="true" :detailLength = "detailUnit.page"
                          :basis="basis" :basis2="detailUnit.head" :basisBody="detailUnit.body" :printCSS="true">
            </detail-table>
        </div>
        <Modal v-model="myModalPrint" fullscreen>
            <div class="myModalPrint" style="width:100%;height:100%"></div>
        </Modal>


    </div>
</template>

<script>
    import proveLetterTemp from '@/views/exhibits/proveLetterTemp'
    import detailTable from '@/views/exhibits/detailTable'
    import { publicInter } from '@/api/http'
    import interfaceUrl from  '@/api/interfaceUrl'
    export default {
        components: {detailTable, proveLetterTemp},
        data(){
            return{
                basicinfouuid:"",
                basis:{},
                detailData:[],
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
                    disposals:""
                },
                myModalPrint:false
            }
        },
        created(){
            this.basicinfouuid = this.$route.params.basicinfouuid;
            let params = {basicinfouuid:this.basicinfouuid}
            // return false
            publicInter(this.$route.params.url,params).then(r =>{
                console.log(r)
                // return false
                if(r){
                    this.basis = this.lowerJSONKey(r.cert);
                    this.detailData = [];

                    let firstData = this.lowerJSONKey(r.list);
                    for (let i = 0; i < firstData.length;i++) {
                        for (let j = 0;j < firstData[i].body.length;j++){
                            let bodyList = firstData[i].body[j].list;
                            // 将列表的行数限制在13条
                            for (let k = bodyList.length,length; k < 6;k++){
                                bodyList.push(this.copyObj(this.detailDataUnit))
                            }
                            let body = {
                                head:firstData[i].head,
                                body:bodyList,
                                page:firstData[i].body[j].page
                            }
                            console.log(body)
                            this.detailData.push(body);
                        
                        }
                    }
                        // return false

                    setTimeout(()=>{
                        let inner = document.getElementsByClassName("myZBHPrint")[0].innerHTML;
                        let inner1 = document.getElementsByClassName("myZBHPrint1")[0].innerHTML;
                        let inner2 = document.getElementsByClassName("myZBHPrint2")[0].innerHTML;
                        // console.log(inner)
                        // return false
                       
                       // document.getElementById('app').innerHTML = inner;
                        // this.myModalPrint = true;
                        // document.getElementsByClassName('myModalPrint')[0].innerHTML = inner;
                        setTimeout(()=>{
                             document.body.innerHTML = inner
                             window.print();
                             this.$router.back(-1)
                             window.location.reload();
                        },200)
                    },100)
                }
            })
        },
        methods:{
            // 后台返回大写，将key值转成小写
            lowerJSONKey(jsonObj){
                if(Object.prototype.toString.call(jsonObj) === "[object Array]"){
                    for (let i = 0; i < jsonObj.length;i++){
                        this.lowerJSONKey(jsonObj[i])
                    }
                    return jsonObj;
                }
                else if (Object.prototype.toString.call(jsonObj) === '[object Object]') {
                    for(let key in jsonObj){
                        jsonObj[key.toLocaleLowerCase()] = jsonObj[key];
                        if(typeof jsonObj == 'object'){
                            this.lowerJSONKey(jsonObj[key])
                        }
                        if(key !== key.toLocaleLowerCase()){
                            delete jsonObj[key];
                        }

                    }
                    return jsonObj;
                }
            },
            copyObj(obj){
                if(Object.prototype.toString.call(obj) === '[object Object]'){
                    let newUnit = {};
                    for (let key in obj){
                        newUnit[key] =   obj[key]
                    }
                    return newUnit;
                }
                else if(Object.prototype.toString.call(obj) === '[object Array]'){
                    let newArr = []
                    for (let i = 0; i < obj.length;i++){
                        let newUnit = {};
                        for (let key in obj[i]){
                            newUnit[key] =   obj[i][key]
                        }
                        newArr.push(newUnit)
                    }

                    return newArr
                }
            },
        }
    }
</script>
