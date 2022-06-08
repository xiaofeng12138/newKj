<template>
    <div class="exhibitiontable">
        <table>
            <thead>
                <tr>
                    <th :style="{width:column.width}" v-for="column in columns">{{ column.title }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(unit,index) in data">
                    <!--<td>{{ unit[columns[0].key] }}</td>-->
                    <!--<td>{{ unit[columns[1].key] }}</td>-->
                    <td v-for="n in length">
                        <a v-if="columns[n-1].click" @click="clickToPosition(index)">{{ unit[columns[n-1].key]}}</a>
                        <span v-else :title="unit[columns[n-1].key]">{{ unit[columns[n-1].key]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "exhibitiontable",
        props:['columns','data'],
        data(){
            return{
                length:1
            }
        },
        created(){
            this.length = this.columns.length;
        },
        methods:{
            clickToPosition(index){
                this.$emit('clickToPosition',index);
            }
        }
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.exhibitiontable{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #FFFFFF;
    line-height: 12px;
    table{
        margin: auto;
        border-collapse: collapse;
        tr{
            height: 28px;
        }
        thead{
            tr{
                color: #1DEAFF;
                th{
                    background: #0F2E7C;
                    text-align: center;
                }
            }

        }
        tbody{
            tr{
                height: 32px;
                td{
                    padding: 0 8px;
                    max-width: 80px;
                    text-align: center;
                    border-bottom: 0.5px solid #182766;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    a{
                        color: #FFE91A;
                    }
                }
            }
        }
    }
}
</style>