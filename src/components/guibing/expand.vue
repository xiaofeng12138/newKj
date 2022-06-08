<template>
    <div style="background:#fff;margin:-20px -50px;padding:20px 30px;">
        <!-- <h3>{{row['facotrLists'][a].label}}</h3> -->
        <Row class="expand-row" :gutter='16'>
            <Col span=2 style="padding-top:10px">
                <b class="expand-key">申报要素: </b>
            </Col>
            <Col span=22 class="factor" style="">
                <RadioGroup vertical v-model="b" class="self" @on-change='change'>
                    <Radio v-for="item in row['facotrLists']" :key="item.id" :label="item.value">
                        <span>{{item.label}}</span>
                    </Radio>
                </RadioGroup>
            </Col>
            <Col span=2 style="margin-top:16px">
                <b class="expand-key">要素预览: </b>
            </Col>
            <Col span=22 style="margin-top:16px;padding-left:0">
                 <Input type='textarea' v-model="a" style="width: 100%"  @on-change='newfactor'></Input>
            </Col>
        </Row>
    </div>
    
</template>
<script>
export default {
    props: {
            row: Object
    },
    data(){
        return{
            b:0,
            a:0,

        }
    },
    mounted(){
        this.a=this.row['facotrLists'][this.b]['label']

    },
    methods:{
        change(val){
            // console.log(val)
            this.a=this.row['facotrLists'][val]['label']
            this.$emit('factorChange',this.a)
        },
        newfactor(e){
            // console.log(this.a)

            this.$emit('factorChange',this.a)
        }
    }
    
}
</script>
<style lang="scss" scoped>
    .factor{
        overflow-y:scroll;
        max-height:150px;
        border:1px solid #ececec;
        padding:10px;
        &::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #6e6e6e;
            outline: #333 solid 1px;
            border-radius: 20px;
        }
        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        }
    }
</style>

