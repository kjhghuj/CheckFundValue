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
          />
    </van-popup>
    <div v-show="showCompaseBox">
      <div v-for="(item,index) in TimePartArr" :key="index" v-show="item.gains != '0.00'" class="UnitBox">
          <span>{{item.text}}年该时间段涨幅：{{item.gains}}%</span>
          <span>{{item.text}}上涨次数：{{item.up}}次</span>
          <span>{{item.text}}下跌次数：{{item.down}}次</span>
      </div>
      <div class="AllBox">
        <div>总共上涨：{{AllUp}}次</div>
        <div>总共下跌：{{AllDown}}次</div>
        <div>去除特殊年份2020年，历史该时间段上涨概率：
          <span :style="{color: AllPensent > 90 ? 'red' : ''}">{{AllPensent}}%</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'ZouShi',
  props: {
    data:{
      type:Array,
      default: () => []
    }
  },
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
        TimePartArr: [],
        AllUp:0,
        AllDown:0,
        showCompaseBox: false
      }
  },
  computed : {
    AllPensent () {
      // let str = (this.AllUp/(this.AllUp + this.AllDown)).toFixed(2)
      let up = 0
      let down = 0
      this.TimePartArr.forEach(item => {
        if (item.text === 2020) return
        if (item.gains === '0.00') return
        if (+item.gains > 0) {
          up++
        }else {
          down++
        }
      })
      let str = (up/(up + down)*100).toFixed(0)
      return str
    }
  },
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
        this.start = this.currentDate.format("MM-dd")
      } else {
        this.endText = this.currentDate.format("MM月dd日")
        this.end = this.currentDate.format("MM-dd")
      }
    },
    cancel() {
      this.show = false;
    },
    compose() {
      let startYear = this.data[0].date.substring(0, 4)
      let endYear = new Date().getFullYear()
      // 计算需要对比的时间段为几段
      let TimePart = endYear - startYear
      let TimePartArr = []
      for(let i = 0;i< TimePart + 1;i++) {
        TimePartArr.push({
          text: (+startYear)+i,
          start: new Date(((+startYear)+i) + '-' + this.start).getTime(),
          end: new Date(((+startYear)+i) + '-' + this.end).getTime(),
          data: [],
          up: 0,
          down: 0,
          gains:0
        })
      }
      
      if (!this.start) {
          Toast.fail('未选择开始日期');
          return
      }
      if (!this.end) {
          Toast.fail('未选择结束日期');
          return
      }
      if (new Date(TimePartArr[0].start).getTime() > new Date(TimePartArr[0].end).getTime()) {
          Toast.fail('结束日期不得在开始日期之前');
          return
      }
      // 提取时间段数据
      this.data.forEach(item => {
        TimePartArr.forEach(it => {
          if(item.x >= it.start && item.x <= it.end) {
            it.data.push(item)
            item.equityReturn > 0 && it.up++
            item.equityReturn < 0 && it.down++
          }
        })
      })
      // 计算时间段内涨幅
      TimePartArr.forEach(item => {
        let l = item.data.length
        let parsent = 0
        l && (parsent = (item.data[l - 1].value - item.data[0].value)*100)
        item.gains = (+parsent).toFixed(2)
        // this.AllUp += item.up
        // this.AllDown += item.down
        item.gains > 0 && this.AllUp++
        item.gains < 0 &&  this.AllDown++
      })
      this.TimePartArr = TimePartArr
      console.log(TimePartArr)
      this.showCompaseBox = true
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
    .UnitBox {
      width: 100%;
      background: #176ef1;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0 0.5rem 0;
      font-size: 1rem;
      color: #fff;
      margin-bottom: 0.4rem;
    }
    .AllBox {

    }
}
</style>