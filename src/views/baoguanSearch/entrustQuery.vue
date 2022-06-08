<template>
    <div>
        <h1 style="padding-bottom: 20px;">企业委托我司查询</h1>
        <Row style="margin: 10px 0;">
            <Col span="1">
                <span class="centerSpan">公司名称</span>
            </Col>
            <Col span="5">
                <Input v-model="input1" placeholder="请输入公司名称" style="width: 250px"></Input>
            </Col>
            <Col span="2">
                <Button type="primary" long @click="queryInfo">查询</Button>
            </Col>
        </Row>
        <Table border  :columns="columns1" :data="data1" style="margin-top:30px"></Table>
    </div>
</template>

<script>
    import { publicInter} from '@/api/http'
    import interfaceUrl from '@/api/interfaceUrl'
    export default {
            data() {
                return {
                    input1:'',
                    columns1:[
                        {
                            title:'序号',
                            key: 'NUM',
                            align:'center',
                            width:'100'
                        },
                         {
                            title:'企业名称',
                            key: 'NAME_CHINESE',
                            align:'center'
                        },
                        {
                            title: '企业信用代码',
                            key: 'CNCOMPANYCODE',
                            align:'center'
                        },
                        {
                            title: '海关信用代码',
                            key: 'CNCOMPANYOLDCODE',
                            align:'center'
                        }
                    ],
                    data1:[]
                }
        },

        mounted(){
            this.queryInfo()
        },
        methods:{
            queryInfo(){
                this.data1 = [];
                let data = {
                    companyName:this.input1
                }
                publicInter(interfaceUrl.cusBroGetAuthoList,data).then(r=>{
                   let arr = [];
                   arr = r.result
                   arr.forEach((ele,i)=>{
                        this.data1.push({
                            NUM:i+1,
                            NAME_CHINESE:ele.NAME_CHINESE,
                            CNCOMPANYCODE:ele.CNCOMPANYCODE,
                            CNCOMPANYOLDCODE:ele.CNCOMPANYOLDCODE
                        })  
                     })
                });
            }
        }
    }
</script>

<style scoped  rel="stylesheet/scss" lang="scss">
.centerSpan{
    line-height: 32px;
}
</style>