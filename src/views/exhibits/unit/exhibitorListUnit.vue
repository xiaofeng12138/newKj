<template>
    <div>
        <prove-letter :basis="basis" :basis2="basis2" :disableStatus="disableStatus"></prove-letter>
        <h2 style="margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #ccc">物资清单详情</h2>
        <detail-table :basis="basis" :basis2="basis2" :basisBody = 'basisBody' :disableStatus="disableStatus"></detail-table>
    </div>
</template>
<script>
import proveLetter from "@/views/exhibits/proveLetterTemp";
import detailTable from "@/views/exhibits/detailTable";
import { publicInter } from '@/api/http'
import interfaceUrl from '@/api/interfaceUrl'
export default {
    components: {proveLetter,detailTable},
    data(){
        return {
            basis:{},
            basis2:{},
            disableStatus:true,
            basisBody:[],
        }
    },
    methods:{
        //获取详情初始
        query(uuid,listUUID){
            publicInter(interfaceUrl.queryExpoDetailEA,{
                basicinfouuid:uuid
            }).then(r=>{
                if(r){
                    this.basis = this.lowerJSONKey(r.cert);
                }
            })
            let params = {
                listheaduuid:listUUID
            }

            publicInter(interfaceUrl.queryExpoHeadDetailEA,params).then(r=>{
                if(r){
                    if(r.head){
                        this.basis2 = this.lowerJSONKey(r.head);
                        this.basisBody = this.lowerJSONKey(r.body);
                        
                        this.basis2.countrycode = this.basis2.exhibitorcountry;

                        this.basis2.hallnoArr = this.basis2.hallno.split(",")
                    }
                    else if(r.error){
                        this.$Modal.error({content:r.error})
                    }
                }
            })
        },
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
                    if(key !== key.toLocaleLowerCase()){
                        delete jsonObj[key];
                    }

                }
                return jsonObj;
            }
        },
    }
}
</script>

