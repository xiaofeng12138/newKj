<template>
<div>
<MenuItem :key="item.id" :name='index'>                        
            <router-link :to='item.path' :key="index+'link'" v-if="item.type =='2'">
                {{item.meta.title}}
            </router-link>
            <a :href="item.path" v-else target="_blank" :key="index+'a'">
                {{item.meta.title}}
            </a>
        </MenuItem>
</div>
        
</template>
<script>
export default {
    props:['index','item']
}
</script>

