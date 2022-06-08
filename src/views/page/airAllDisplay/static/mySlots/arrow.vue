<template>
    <div class="myArrow">
        <svg :width='width' :height='height'>
            <defs>
                <marker id="arrow" markerWidth='10' markerHeight='6' refX='0' refY = '3' orient='auto' markerUnits='strokeWidth'
                viewBox='0,0,20,10'>
                    <path d='M0,0 L0,6 L9,3 Z' fill="#000"></path>
                </marker>
            </defs>
            <path  :d='d' stroke-width='5' stroke='#000' marker-end='url(#arrow)'></path>
            <!-- <line x1='50' y1='50' x2='250' y2='50' stroke='#000' stroke-width='5' marker-end='url(#arrow)' /> -->
        </svg>
    </div>
</template>
<script>
export default {
    props:['width','height','orient'],
    computed: {
        d () {
            switch(this.orient){
                case 'right':
                    return 'M20,'+this.height/2+' L'+(this.width-50)+','+this.height/2;
                    break;
                case 'down':
                    return 'M'+(this.width/2)+',20'+' L'+(this.width/2)+','+(this.height- 50);
                    break;
                case 'left':
                    return 'M'+(this.width-20)+','+this.height/2+' L50,'+this.height/2;
                break;
            }
            
        },
    }
}
</script>
<style lang="scss" scoped>
.myArrow{
    display: inline-block;
    vertical-align: middle
}
</style>

