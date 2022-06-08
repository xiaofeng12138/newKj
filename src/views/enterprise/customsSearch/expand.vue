<template>
    <div>
        <Row class="expand-row">
            <Col span="24">
                <span>规格型号：</span>
                <span>{{ row.dmodel }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "expand",
        props:{
            row:Object
        }
    }
</script>

<style scoped>

</style>