<template>
   <div>
        <Row class="expand-row">
            <Col span="12" v-for="field in bodyField" :key="field.id">
                <p class="expand-key">{{field.value}} </p>
                <p class="expand-value">{{ row[field.key.toUpperCase()] }}</p>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  name:'expandRow',
   props: ['bodyField','row'],
   created(){
      
   }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.ivu-col-span-12{
    margin-bottom: 10px;
    font-size: 14px;
}
</style>

