<template lang="html">
  <div class="curve-2">
    <svg class="" style="width:100%;height:100%;overflow:visible;">
      <path :d="d" stroke="#bababa" style="stroke-width:12px;fill:none;"></path>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['width', 'height'],
  computed: {
    d () {
      return 'M89,0L89,'+(Number(this.height)*-1)+'Q89,'+this.qy+' 137,'+this.qy+'L'+this.qx+','+this.qy
    },
    qx () {
      return Number(this.width) + 89 + 49
    },
    qy () {
      return - Number(this.height) - 44
    }
  }
}
</script>

<style lang="scss" scoped>
.curve-2 {
  width: 300px;
  height: 300px;
  position: absolute;
}
</style>
