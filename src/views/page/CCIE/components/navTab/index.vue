<template>
    <div class="navtab">
        <h2>{{menuList.text}}</h2>
        <div class="route" >
            <template v-for="(item, index) in menuList.child">
                <Dropdown class="customDropMenu" :key="item.id" v-if="item.child" @on-click="childActiveSwitch">
                    <Button type="primary" size='large' class="customBtn" :class="{active: index == indexValue}">
                        <span>{{item.text}}</span><Icon type='ios-arrow-down'/>
                    </Button>
                    <DropdownMenu slot="list" >
                        <DropdownItem  :key="ele.id" v-for="(ele, index) in item.child" :class="{active: index == childIndexValue}" :name="ele.text">
                            <!-- <span >{{ele.text}}</span> -->
                            <router-link :key="ele.id"  :to='ele.src'>{{ele.text}}</router-link>
                        </DropdownItem>
                        <!-- <DropdownItem >
                            <span >危险化学品风险监控</span>
                        </DropdownItem>
                        <DropdownItem >
                            <span >试用品尝散发风险监控</span>
                        </DropdownItem>
                        <DropdownItem >
                            <span >肉类展品监控</span>
                        </DropdownItem> -->
                    </DropdownMenu>
                </Dropdown>  
                <span v-else :key="item.id" class="a">
                    <router-link :key="item.id" v-if="!item.isA" @click.native="activeSwitch(menuList.child.indexOf(item))" :to='item.src' :class="{active: index == indexValue}">{{item.text}}</router-link>
                    <a :href="item.src" v-else target="_blank" :key="item.id"  >{{item.text}}</a>
                </span>    
                
            </template>
             
        </div>

    </div>
</template>
<script>
export default {
    props:{
        routePath:{
            type:Object
        },
        indexActive: {},
        childIndexActive: {}
    },
    data(){
        return{
            link:'',
            menuList: this.routePath,
            indexValue: this.indexActive,
            childIndexValue: this.childIndexActive
        }
    },
    methods: {
       activeSwitch(index) {
           this.indexValue = index;
           this.childIndexValue = -1;
       },
       childActiveSwitch(name) {
           for(let i = 0; i < this.menuList.child.length; i++) {
                if(this.menuList.child[i].child != undefined) {
                    for(let j = 0; j < this.menuList.child[i].child.length; j++) {
                        if(this.menuList.child[i].child[j].text.match(name)) {
                            this.indexValue = i;
                            this.childIndexValue = j;
                            if(this.menuList.child[i].child[j].src != this.$route.path) {
                                this.$router.push({path: this.menuList.child[i].child[j].src})
                            }
                            break;
                        }
                    }   
                }
           }
       }
    },
    watch: {
        indexActive: {
            handler(newVal, oldVal) {
                this.indexValue = this.indexActive;
            },
            deep: true
        },
        childIndexActive: {
            handler(newVal, oldVal) {
                this.childIndexValue = this.childIndexActive;
            },
            deep: true
        },
        routePath: {
            handler(newVal, oldVal) {
                this.menuList = this.routePath;
            },
            deep: true
        },
    }
    
}
</script>
<style lang="scss" scoped>
.navtab{
    width: 100%;
    overflow: auto;
    height: 100%;
    display: flex;
    align-items: center;
    .route{
        display: flex;
        align-items: center;
    }
    h2{
        color: #fff;
        font-size: 1.8rem;
        margin-right: 2rem;
    }
    .customBtn{
        // width: 160px;
        height: 40px;
        margin:0 0.4rem;
        background: transparent;
        border: 1px solid #fff;
        &:hover{
            background: #155ff2;
            border-color:#155ff2;
        }
        &.active {
            background:#155ff2;
            border-color:#155ff2;
        }
    }
    .a{
        a{
            height: 40px;
            line-height: 40px;
            font-size: 0.875rem;
           // width: 120px;
            color: #fff;
            display: inline-block;
            padding: 0 20px;
            border: 1px solid #fff;
            border-radius: 4px;
            margin:0 0.4rem;
            &.active {
                background:#155ff2;
                border-color:#155ff2;
            }
            &:hover{
                background:#155ff2;
                border-color:#155ff2;
            }

        }

    }
    
}
.customDropMenu {
    // background:#155ff2;
    border:none
}
</style>
