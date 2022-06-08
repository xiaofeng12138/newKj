<template>
    <div>
        <div v-for="(item,index) in order" :key="item.id">
            <concat-child  :lists='item.data' @resetClick='reset' @surplus='addOrder' :len='order.length' :isReset='index===order.length-1'/>
        </div>
    </div>    
</template>
<script>
import concatChild from './child'

export default {
    props:['group'],
    components:{
        concatChild
    },
    created(){
        
        // console.log(this.group)
        if(this.group){
            this.group.listMaAfMerger.forEach((item,i)=>{
                this.order[0]['data'].push({
                    index:i,   //  类似于ID，判断对象值是否相等
                    CURR:item.CURRENCY,   //  币制
                    _checked:true,
                    _disabled:false,
                    ITEM:item.ITEM,
                    GUNIT:item.shenBaoDanWei,  // 单位
                    UNITPRICE:item.UNITPRICEBLLINKPO,   //  单价
                    GNAME:this.group.shenBaoCNName,  //报关用中文名称
                    GQTY:item.ALNULNOTEMATERIALAMOUNT,  // 总数
                    ORIGINALCOUNTRY:this.group.yuanChanGuo, // 原产国
                    // factor:item.dmodel,   // 展示申报要素
                    MATERIALNO:item.MATERIALNO,  // 物料号
                    CODETS:this.group.shuiZeHao,  //  hs号
                    factor:item.dmodel, // 最终提交申报要素
                    PURCHASEORDERNO:item.PURCHASEORDERNO
            })
        })

        }
        
    },
    data(){
        return{ 
            order:[
                {
                    data:[]
                }
            ]
        }
    },
    methods:{
        findParent(arr1, arr2) {
            var select=[]
            for (var i = 0; i < arr1.length; i++) {
                for (var j = 0; j < arr2.length; j++) {
                    if (arr1[i]['index'] === arr2[j]['index']) {
                        select.push(arr1[i]) //利用splice函数删除元素，从第i个位置，截取长度为1的元素
                    }
                    
                }
            }
            return select
        },
        addOrder(arr){
            // console.log(arr)
            if(arr){
                var len=this.order.length-1
                var temp=[]
                var origin=this.findParent(this.order[len]['data'],arr)
                origin.forEach(item=>{
                    this.order[len]['data'].splice(this.order[len]['data'].indexOf(item),1)  // 删除被选中项,this.order[len]['data']留下未被选中项
                }) 
                temp=this.order[len]['data']
                this.$set(this.order,len,{data:arr})
                this.order.push({data:temp})  // 将为被选中项，放入push到数组末尾
                this.order[len]['data'].forEach(item=>{
                    item._checked=item._disabled=true  // 选中项不可修改
                })
            }else{
                this.order[this.order.length-1]['data'].forEach(item=>{
                    this.$set(item,'_checked',true)
                    this.$set(item,'_disabled',true)
                })
            }
            
    
            
        },
        reset(flag){
            if(flag){
                var len=this.order.length
                if(this.order.length>=2){
                    var list1=this.order[len-1]['data']  // 倒数第一项
                    var list2=this.order[len-2]['data'] // 倒数第二项
                    list1.forEach(item=>{
                        list2.push(item)
                    })
                    list2.forEach(item=>{
                        item._checked=true
                        item._disabled=false
                    })
                    // console.log(this.order.length)
                    this.order.splice(this.order.length-1,1)
                    // console.log(this.order.length)
                }else{
                    this.order[this.order.length-1]['data'].forEach(item=>{
                        this.$set(item,'_checked',true)
                        this.$set(item,'_disabled',false)
                    })
                }

            }
            
        }
    }
    
    
}
</script>
<style lang="scss" scoped>

</style>
