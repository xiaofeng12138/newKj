<template>
    <div class="tip">
        <Tooltip >
            <span>{{ content }}</span>
            <div slot="content"  >
                <Table :columns="columns" :data="data1"></Table>
            </div>
        </Tooltip>
    </div>
</template>

<script>
    export default {
        name:'myTooltip',
        props:['content','data1'],
        data(){
            return{
                columns:[{
                    title:'回执状态',
                    key:'STATUS',
                    width:160,
                    render:(h, params) =>{
                        return h('span',this.getCusStatus(params.row.STATUS));
                    }
                },{
                    title:'回执时间',
                    key:'STATUSTIME',
                    width:160
                }]
            }
        },
        created(){
        },
        methods:{
            getCusStatus(value) {
                var info = '';
                if(value == '1'){
                    info = '协同入库成功';
                }
                else if(value == '2'){
                    info = "协同入库失败";
                }
                else if(value == '3'){
                    info = "回填数据失败";
                }
                else if(value == '4'){
                    info = "逻辑校验失败";
                }
                else if(value == '5'){
                    info = "回写数据失败";
                }
                else if(value == '6'){
                    info = "协同处理成功";
                }
                else if (value == 'C') {
                    info = '(C)已放行-无纸验放查验通知书（放行）';
                } else if (value == 'F') {
                    info = '(F)已放行-放行交单';
                } else if (value == 'G') {
                    info = '(G)已放行-接单交单';
                } else if (value == 'I') {
                    info = '(I)已放行-无纸放行通知（放行）';
                } else if (value == 'R') {
                    info = '(R)已放行-结关，可办理进口付汇、出口结汇、出口退税联的签发手续';
                } else if (value == 'W') {
                    info = '(W)已放行-无纸验放通知（审结）';
                } else if (value == 'J') {
                    info = '(J)已放行-通关无纸化审结';
                } else if (value == 'P') {
                    info = '(P)已放行-放行回执';
                } else if (value == '#') {
                    info = '(#)已放行-通关无纸化准予进卡通知书';
                } else if (value == 'A') {
                    info = '(A)入库未审批-放行前删除';
                } else if (value == 'B') {
                    info = '(B)入库未审批-担保验放';
                } else if (value == 'D') {
                    info = '(D)入库未审批-放行后删除';
                } else if (value == 'H') {
                    info = '(H)入库未审批-挂起，与审单中心联系';
                } else if (value == 'L') {
                    info = '(L)入库未审批-入预录入库成功';
                } else if (value == 'X') {
                    info = '(X)入库未审批-准予进港';
                } else if (value == 'T') {
                    info = '(T)入库未审批-需交税费';
                } else if (value == 'M') {
                    info = '(M)入库未审批-报关单重审';
                } else if (value == 'E') {
                    info = '(E)不放行-入库失败或退单';
                } else if (value == 'Z') {
                    info = '(Z)不放行-退回修改';
                } else if (value == 'S') {
                    info = '(S)不放行-QP处理失败';
                } else if (value == 'Y') {
                    info = '(Y)不放行-申报失败';
                } else if (value == 'U') {
                    info = '(U)不放行-重新申报';
                } else if (value == '9') {
                    info = '(9)不放行-上载申报失败（与数据中心联系）';
                }
                return info;
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
</style>