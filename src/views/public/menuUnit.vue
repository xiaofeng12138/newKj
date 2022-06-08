<template>
    <div>
        <template slot="title" >
            <Icon :type="item.meta.icon"></Icon>{{item.meta.title}}
        </template>
        <MenuItem v-for="(val,idx) in item.children" :key="val.id" :name='index+"-"+idx'>
            <router-link :to='val.path' :key="val.id+idx" v-if="val.type =='1'">
                {{val.meta.title}}
            </router-link>
            <a :href="val.path"  v-else target="_blank" :key="val.id+'a'+idx">{{val.meta.title}}</a>
        </MenuItem>
    </div>
</template>
<script>
export default {
    props:['item','index']
}
</script>

