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
        name: "myTooltip2",
        props:['content','data1','role'],
        data(){
            return{
                columns:[{
                    title:'状态',
                    key:'STATUS',
                    width:160,
                    render:(h, params) =>{
                        return h('span',this.getCusStatus(params.row.STATUS,params.row.NAME_CHINESE));
                    }
                },{
                    title:'时间',
                    key:'REC_UPD_DT',
                    width:160
                }]
            }
        },
        methods:{
            getCusStatus(value,bgName){
                let info = "";
                bgName = (this.role && this.role == 'cb')?"":bgName
                switch (value){
                    case "1":
                        info = '已关联未委托';
                        break;
                    case '2':
                        info = '自行归并';
                        break;
                    case '3':
                        info = '自行未经归并直接生成报关单表体';
                        break;
                    case '4':
                        info = '报关行'+bgName+'未读';
                        break;
                    case '5':
                        info = '报关行'+bgName+'已读处理中';
                        break;
                    case '6':
                        info = '报关行'+bgName+'已归并';
                        break;
                    case '7':
                        info = '报关行'+bgName+'已发送';
                        break;
                    case '8':
                        info = '已撤销对报关行'+bgName+'的委托';
                        break;
                    case '9':
                        info = '自行发送至单一窗口';
                        break;
                }
                return info;
            }
        }
    }
</script>

<style scoped>

</style>