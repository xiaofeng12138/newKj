<template>
    <div>
        <h1 style="padding-bottom:16px;border-bottom:1px solid #ececec;">网上提箱</h1>
        <Tabs value="name1">
        <TabPane label="查询" name="name1">
            <Row :gutter="16" style="margin:16px 0 20px 0">
                <Col :span='7'>
                    <Col :span='6' style="height:36px;line-height:36px;font-size:14px"><b>订舱号</b></Col>
                    <Col :span='18'>
                         <Input placeholder="例如：6103622780" size="large" ></Input>
                    </Col>
                </Col>
                <Col :span='8'>
                    <Col :span='9'  style="height:36px;line-height:36px;font-size:14px"><b>提箱校验码</b> </Col>
                    <Col :span='15'>
                        <Input placeholder=""  size="large"></Input>
                    </Col>
                </Col>
                <Col :span='7'>
                    <Col :span='8'  style="height:36px;line-height:36px;font-size:14px"> <b>客户手机号</b></Col>
                    <Col :span='16'>
                        <Input placeholder="" size="large"></Input>
                    </Col>
                </Col>
                <Col :span='2'> 
                    <Button type="primary" long size='large'>查询</Button>
                </Col>
            </Row>
            <Table border ref="selection" :columns="columns1" :data="data1" class="self"></Table>
        </TabPane>
        <TabPane label="已打印查询" name="name2" style="min-height:400px">
             <Row :gutter="16" style="margin:16px 0 20px 0">
                <Col :span='8'>
                    
                    <Input placeholder="例如：6103622780" size="large" ></Input>
                    
                </Col>
                <Col :span='8' push=2>
                   <Select size="large">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </Col>

                <Col :span='4' push=4>
                    <Button type="primary" long size='large'>查询</Button>
                </Col>
            </Row>
            <Table border ref="selection" :columns="columns2" :data="data1" class="self"></Table>
        </TabPane>
        <TabPane label="提箱申请记录" name="name3" style="min-height:400px">

            <Row :gutter="16" style="margin:16px 0 20px 0">
                 <Col :span='7'>
                    <Col :span='6' style="height:36px;line-height:36px;font-size:14px"><b>订舱号</b></Col>
                    <Col :span='18'>
                         <Input placeholder="例如：6103622780" size="large" ></Input>
                    </Col>
                </Col>
                <Col :span='7'>
                    <Col :span='6' style="height:36px;line-height:36px;font-size:14px"><b>状态</b></Col>
                    <Col :span='18'>
                         <Select size="large">
                            <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Col>
                <Col :span='8'>
                    <Col :span='8' style="height:36px;line-height:36px;font-size:14px"><b>申请时间</b></Col>
                    <Col :span='16'>
                           <DatePicker type="daterange" size='large' class="self selfDate" placement="bottom-end" placeholder="选择日期" ></DatePicker>
                    </Col>
                    </Col>
                </Col>
                <Col :span='2'>
                    <Button type="primary" long size='large'>查询</Button>
                </Col>
                 

            </Row>
            <Table border ref="selection" :columns="columns3" :data="data1" class="self"></Table>
        </TabPane>
    </Tabs>
    </div>
</template>
<script>
export default {
    data(){
        return{
            data1:[],
            status:[
                {
                    label:'全部',
                    value:'1'
                },
                 {
                    label:'待确认',
                    value:'2'
                },
                 {
                    label:'EIR已生成',
                    value:'3'
                },
                 {
                    label:'EIR已拒绝',
                    value:'4'
                },
                 {
                    label:'EIR已打印',
                    value:'5'
                },
                 {
                    label:'EIR部分已打印',
                    value:'6'
                },
            ],
            cityList:[
                {
                    label:'宜东分公司张华浜作业区',
                    value:'1'
                },
                 {
                    label:'SCT军工路码头',
                    value:'2'
                },
                 {
                    label:'SCT宝山码头',
                    value:'3'
                },
                 {
                    label:'外高桥二期码头',
                    value:'4'
                },
                 {
                    label:'外高桥四期',
                    value:'5'
                },
                 {
                    label:'外高桥一期码头',
                    value:'6'
                },
                 {
                    label:'外高桥五期码头',
                    value:'7'
                },
            ],
            columns1:[
                 {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                },
                {
                    key:'',
                    title:'订舱号'
                },
                {
                    key:'',
                    title:'箱型尺寸'
                },
                {
                    key:'',
                    title:'套箱'
                },
                {
                    key:'',
                    title:'提箱点'
                },
                {
                    key:'',
                    title:'可提箱量'
                },
                {
                    key:'',
                    title:'接货地/目的地'
                },
                {
                    key:'',
                    title:'航名/航次'
                },
                {
                    key:'',
                    title:'操作'
                },
            ],
            columns2:[
                {
                    title:'订舱号'
                },
                {
                    title:'提箱点'
                },
                {
                    title:'EIR NO'
                },
                {
                    title:'箱型'
                },
                {
                    title:'打印状态'
                },
                {
                    title:'打印次数'
                },
                {
                    title:'申请状态'
                },
                {
                    title:'日期'
                },
                {
                    title:'操作'
                }
            ],
            columns3:[
                {
                    title:'订舱号'
                },
                {
                    title:'EIR NO'
                },
                {
                    title:'箱型'
                },
                {
                    title:'堆场'
                },
                {
                    title:'状态'
                },
                {
                    title:'可打印次数'
                },
                {
                    title:'套箱'
                },
                {
                    title:'原因'
                },
                {
                    title:'附件'
                },
                {
                    title:'申请状态'
                },
                {
                    title:'操作'
                }
            ]

        }
    }
}
</script>

