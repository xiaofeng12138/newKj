<template>
    <Row :gutter="16" style='margin-bottom:20px'> 
        <Col :span=6>
            <DatePicker size="large" type="date" v-model='time' placeholder="请选择日期" style="width:100%" class="self"></DatePicker>
        </Col>
        <Col :span=4>
            <Select v-model="rangeTime" style="width:100%;margin-top:1.5px" size="large">
                <Option v-for="item in rangeTimeOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>
        <Col :span=3>
            <Select v-model="expoStatus" style="width:100%;margin-top:1.5px" size="large" placeholder='选择身份'>
                <Option v-for="item in roleOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Col>
        <Col :span=5>
             <Input v-model="form.variable" size="large" :placeholder="placeholder" clearable style="width: 100%"></Input>
        </Col>    
        <Col :span=4>
            <Input v-model="form.contractNo" size="large" placeholder="请输入合同编号" clearable style="width: 100%"></Input>
        </Col>
        <Col :span=2>
            <Button type="primary" size='large' long @click="query">查询</Button>
        </Col>
    </Row>    
</template>
<script>
export default {
    props:{
        placeholder:{
            type:String,
            default:'请输入协议编号'
        }
    },
    data(){
        return{
            time:new Date(),
            form:{
                variable:'',
                contractNo:''
            },
            expoStatus:1,
            rangeTime:1,
            rangeTimeOptions:[
                {label:'及前一个月内',value:1},
                {label:'及前两个月内',value:2},
                {label:'及前三个月内',value:3},
            ],
            roleOptions:[
                {label:'未确认',value:1},
                {label:'已确认',value:2},
                
            ]


        }

    },
    methods:{
        query(){
            var queryParmas={}
            if(this.time){
                var year=this.time.getFullYear()
                var mouth=this.time.getMonth()+1
                var date=this.time.getDate()
                var startMouth=this.time.getMonth()+1-this.rangeTime
                var startYear=year
                if(mouth<10){
                    mouth='0'+mouth
                }
                if(date<10){
                    date='0'+date
                }
                if(this.rangeTime){
                    if(startMouth>0&&startMouth<10){
                        startMouth='0'+startMouth
                    }else if(startMouth<=0&&startMouth>-3){
                        startYear=startYear-1
                        startMouth=12+startMouth
                    }else if(startMouth<=-3){
                        startYear--
                        startMouth='0'+(12+startMouth)
                    }
                    queryParmas.startDate=''+startYear+startMouth+date
                }
                queryParmas.endDate =''+year+mouth+date
             }else{
                 queryParmas.startDate=queryParmas.endDate=''
             }
             queryParmas.variable=this.form.variable
             queryParmas.contractNo=this.form.contractNo
             queryParmas.expoStatus=this.expoStatus
             this.$emit('queryEvents',queryParmas)
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
