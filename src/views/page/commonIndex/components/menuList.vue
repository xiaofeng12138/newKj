<template>
    <div>
        <template v-for="(i,index1) in menuList"> 
            <Submenu v-if="i.children.length > 0" :name='index1' :key='i.id'>
                <template slot="title">
                    <Icon :type="i.meta.icon"></Icon>{{i.meta.title}}
                </template>
                <template v-for="(ii,index2) in i.children">
                    <Submenu v-if="ii.children.length > 0" :name='index1 + "-" + index2' :key='i.id+"-"+ii.id'>
                        <template slot="title">
                            {{ii.meta.title}}
                        </template>
                        <template v-for="(iii,index3) in ii.children">
                            <Submenu v-if="iii.children.length > 0" :name='index1  + "-" + index2 + "-"  + index3' :key='iii.id'>
                                <template slot="title">
                                    {{iii.meta.title}}
                                </template>
                                <template v-for="(iiii,index4) in iii.children">
                                    <Submenu v-if="iiii.children.length > 0" :name='index1  + "-" + index2 + "-"  + index3 + "-"  + index4' :key='iiii.id'>
                                        <template slot="title">
                                            {{iiii.meta.title}}
                                        </template>
                                    </Submenu>
                                    <menu-link v-else :index="index4" :item="iiii" :key="iiii.id" :name='index1  + "-" + index2 + "-"  + index3 + "-"  + index4'></menu-link>
                                </template>
                            </Submenu>
                            <menu-link v-else :index="index3" :item="iii" :key="iii.id" :name='index1  + "-" + index2 + "-"  + index3'></menu-link>
                        </template>
                    </Submenu>
                    <menu-link v-else :index="index1 + '-'+ index2" :item="ii" :key="i.id+'-'+ii.id" ></menu-link>
                </template>
            </Submenu>
            <MenuItem v-else :key="i.id" :name='index1' >                        
                <router-link :to='i.path' :key="index1+'link'" v-if="i.type =='2'">
                    <Icon :type='i.meta.icon'></Icon>{{i.meta.title}}
                </router-link>
                <a :href="i.path" v-else target="_blank" :key="index1+'a'">
                    <Icon :type='i.meta.icon'></Icon>{{i.meta.title}}
                </a>
            </MenuItem>
        </template>
    </div>
</template>
<script>
import menuLink from './menuLink.vue'
export default {
    props:['menuList'],
    components:{menuLink},
}
</script>

