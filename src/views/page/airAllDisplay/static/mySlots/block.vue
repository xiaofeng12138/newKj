<template>
    <div :class="{myBlock:true,myBlockstatus:status}">
        <p>{{ blocktext }}</p>
        <p>{{ timestr }}</p>
    </div>
</template>
<script>

export default {
    //status传入的状态，当有数据时显示浅绿色，没有数据时显示蓝色
    props: ['blocktext', 'timestr', 'status'],
}
</script>
<style lang="scss" scoped>
.myBlock{
    border-radius: 20px;
    background: #5687d6;
    width: 200px;
    height: 120px;
    text-align: center;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
}
.myBlockstatus{
    background: #83bc5a;
}
</style>
