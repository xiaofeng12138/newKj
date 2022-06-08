<template lang="html">
  <div class="curve-3">
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
      return 'M89,-22L89,'+this.hy+'Q89,'+this.qy+' 138,'+this.qy+'L'+this.qx+','+this.qy
    },
    qx () {
      return Number(this.width) + 138
    },
    qy () {
      return this.hy + 44
    },
    hy () {
      return Number(this.height) - 22
    }
  }
}
</script>

<style lang="scss" scoped>
.curve-3 {
  width: 300px;
  height: 300px;
  position: absolute;
}
</style>
