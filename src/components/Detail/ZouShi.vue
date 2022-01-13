<template>
  <div class="ZouShi">
    <div class="dateBox">
      <span>开始时间：{{ startText }}</span>
      <van-button type="info" size="mini" @click="showPopup('start')">点击选择开始时间</van-button>
    </div>
    <div class="dateBox">
      <span>结束时间：{{ endText }}</span>
      <van-button type="info" size="mini" @click="showPopup('end')">点击选择开始时间</van-button>
    </div>
    <div class="dateBox">
      <van-button type="info" size="mini" @click="compose()">点击开始计算</van-button>
    </div>
    <van-popup v-model="show">      
      <van-datetime-picker
            v-model="currentDate"
            type="month-day"
            title="选择月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm=confirm()
            @cancel=cancel()
            @change=change()
          />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ZouShi',
  props: {},
  watch: {
    // currentDate(val) {
    //   console.log(val)
    // }
  },
  data() {
      return {
        startText: '请选择',
        endText: '请选择',
        start: '',
        end: '',
        show: false,
        timeType: 'start',
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(2021, 0, 17),
      }
  },
  computed : {},
  created () {},
  mounted () {},
  methods :{
    showPopup(type) {
      this.show = true;
      this.timeType = type
    },
    confirm() {
      this.cancel()
      if (this.timeType === 'start') {
        this.startText = this.currentDate.format("MM月dd日")
      } else {
        this.endText = this.currentDate.format("MM月dd日")
      }
    },
    cancel() {
      this.show = false;
    },
    compose() {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.ZouShi {
    font-size: 0.12rem;
    color:#a0c0f1;
    padding: 0.35rem;
    .dateBox {
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
}
</style>