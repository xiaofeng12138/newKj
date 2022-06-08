<template>
    <div >
        <h1>404</h1>
        <p>你访问的页面不存在！</p>
        <router-link to='/dashboard'>
            <Button type="primary" size='large'>返回首页</Button>
        </router-link>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    div{
        width: 100%;
        height: 100%;
        text-align: center;
        h1{
            font-size: 50px;
            margin-top: 200px;
            margin-bottom: 30px;
        }
        p{
            font-size: 16px;
            margin-bottom: 20px;
        }
    }

</style>
