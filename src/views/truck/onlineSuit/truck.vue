<template>
    <div>
        <iframe id="showIframe" :style="{height:height,width:width}"  frameborder=0 name="showHere" scrolling=auto
                :src="src">

        </iframe>
    </div>
</template>

<script>
    import config from '@/until/config'
    export default {
        name: "truck",
        data(){
            return {
                iframeState: false,
                width:"",
                height:"",
                src:""
            }
        },
        created(){
            this.src = config.truckUrl;
            this.height=((document.documentElement.clientHeight || document.body.clientHeight)-64)+'px';
            this.width=((document.documentElement.clientWidth || document.body.clientWidth)-200)+'px';
            window.onresize= ()=> {
                this.height=((document.documentElement.clientHeight || document.body.clientHeight)-64)+'px';
                this.width=((document.documentElement.clientWidth || document.body.clientWidth)-200)+'px';
            }
        }
    }
</script>

<style scoped>
    #showIframe{
        margin-left:-48px;
        margin-top:-48px;
    }

</style>