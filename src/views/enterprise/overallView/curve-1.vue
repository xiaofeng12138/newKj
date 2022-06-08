<template lang="html">
<div class="curve-1">
  <svg class="" style="width:100%;height:100%;">
    <path :d="d" stroke="#bababa" style="stroke-width:12px;fill:none;"></path>
  </svg>
</div>
</template>

<script>
export default {
  props: ['width', 'height'],
  computed: {
    d () {
      return 'M0,44L'+this.width+',44Q'+this.qx+',44 '+this.qx+',98L'+this.qx+','+this.qy
    },
    qx () {
      return Number(this.width) + 49
    },
    qy () {
      return Number(this.height) + 88
    }
  }
}
</script>

<style lang="scss" scoped>
.curve-1 {
  // width: 300px;
  height: 300px;
  position: absolute;
}
</style>
