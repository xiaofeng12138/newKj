<template lang="html">
  <div class="lineLength">
      <svg class="" style="width:100%;">
        <path :d="d" stroke="#bababa" style="stroke-width:12px;"></path>
      </svg>
  </div>
</template>

<script>
export default {
  props: ['length'],
  computed: {
    d () {
      return 'M0,44L'+this.length+',44'
    }
  }
}
</script>

<style lang="scss" scoped>
.lineLength {
  width: 300px;
  height: 60px;
  position: absolute;
}
</style>
