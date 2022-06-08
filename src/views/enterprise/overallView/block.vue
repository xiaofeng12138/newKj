<template lang="html">
    <div class="chart-block" :class="typecls">
      <span>
        {{this.blocktext}}
        <span class="" v-if="(icon === 'true')">&nbsp;<Icon type="android-arrow-dropdown"></Icon></span>
      </span>
      <span v-if="this.supply">{{this.supply}}</span>
      <span style="text-align:center;">{{this.timestr}}</span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      watchedTimestr: ''
    }
  },
  props: ['blocktext', 'timestr', 'status', 'supply', 'icon'],
  computed: {
    typecls () {
      if (this.status === '0') {
        return {
          class0: true,// 未完成
            class1: false,// 待定
              class2: false,// 已完成
        }
      } else if (this.status === '1') {
        return {
          class0: false,
            class1: true,
              class2: false,
        }
      } else if (this.status === '2') {
        return {
          class0: false,
            class1: false,
              class2: true,
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-block {
  width: 98px;
  height: 88px;
  border-radius: 4px;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  font-size: 12px;
  // word-break:break-all;
}

.class0 {
  background-color: #00BFFF;
  color: #fff;
}

.class1 {
  background-color: #FFDEAD;
   color: #000;
}

.class2 {
  background-color: #18A263;
   color: #fff;
}
</style>
