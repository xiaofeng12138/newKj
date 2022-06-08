<template lang="html">
  <div class="lineLength">
      <svg class="svgStyle">
        <path :d="d" stroke="#bababa" style="stroke-width:12px;"></path>
      </svg>
  </div>
</template>

<script>
export default {
  props: ['length'],
  computed: {
    d () {
      return 'M49,88L49,'+this.length
    }
  }
}
</script>

<style lang="scss" scoped>
.lineLength {
  position: absolute;
}

.svgStyle {
  width: 98px;
  height: 300px;
}
</style>
