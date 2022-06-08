<template>
    <div>
        <Table :columns="columns" :data="tableData" class="self" style="margin-top:1rem;" :row-class-name="rowClassName"> </Table>
    </div>
</template>
<script>
export default {
    props: {
        tableData: {}
    },
    data() {
        return {
            columns: [
                {
                    title: "进口商名称",
                    key: "CONSIGNEE_CNAME",
                    width: 180
                },
                {
                    title: "货物序号",
                    key: "GNO",
                    width: 180
                },
                {
                    title: "进口商社会信用代码",
                    key: "ENT_DECL_NO",
                    width: 180
                },
                {
                    title: "报关单号",
                    width: 180,
                    key: "ENT_ENTRY_ID"
                },
                {
                    title: "品牌",
                    width: 80,
                    key: "TYPE"
                },
                {
                    title: "品名",
                    key: "GOODS_NAME",
                    width: 180
                },
                {
                    title: "原产地",
                    width: 80,
                    key: "ORIG_PLACE_CODE"
                },
                {
                    title: "最小销售单元数量",
                    key: "WEIGHT",
                    width: 180
                },
                {
                    title: "最小销售单元计量单位",
                    key: "WEIGHTUNIT2",

                    width: 180
                },
                {
                    title: "最小销售单元规格",
                    key: "SMALL_GOODS_MODEL",
                    width: 180
                },
                {
                    title: "生产日期",
                    key: "PRODUCE_DATE",
                    width: 180
                },
                {
                    title: "保质期至",
                    key: "PROD_QGP",
                    width: 180
                },
                {
                    title: "产品批号",
                    key: "PROD_BATCH_NO",
                    width: 180
                },
                {
                    title: "生产商",
                    key: "ENG_MAN_ENT_CNM",
                    width: 180
                },
                {
                    title: "注册厂号",
                    key: "MNUFCTR_REG_NO",
                    width: 180
                },
                {
                    title: "集装箱号",
                    key: "CONTAINER_NO",
                    width: 180
                },
                {
                    title: "是否出证",
                    key: "ISCERTED",
                    width: 180
                },
                {
                    title: "出证重量校验",
                    key: "WEIGHTYIZHI",
                    width: 180
                },
                {
                    title: "出证原产地校验",
                    key: "ORIG_PLACE_CODEYIZHI",
                    width: 180
                },
                {
                    title: "出证生产日期校验",
                    key: "PRODUCE_DATEYIZHI",
                    width: 180
                },
                {
                    title: "出证保质期校验",
                    key: "PROD_QGPYIZHI",
                    width: 180
                },
                // {
                //     title: "总上传次数",
                //     key: "upLoadCount",
                //     width: 180
                // },
                {
                    title: "历史校验结果",
                    width: 130,
                    render: (h,params) => {
                        return h('Button', {
                            props: {
                                type: 'primary',
                                // size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.$Modal.warning({ content: params.row.historyValidResult });
                                }
                            }
                        }, '查看')
                    }
                },
                // {
                //     title: "历史校验结果",
                //     key: "historyValidResult",
                //     width: 180
                // }
            ]
        }
        
    },
    methods: {
        rowClassName(row, index) {
            if(row.isColored == '1') {
                return 'isColored'
            }
        }
    }
}
</script>
