<template>
  <div class="warp">
    <div id="chartBox"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detail',
  props: {},
  watch: {},
  data() {
      return {}
  },
  computed : {},
  created () {
      this.getData()
  },
  mounted() {

  },
  methods: {
      getData() {
          let time = new Date().getTime()
          const { code } = this.$route.query
            axios({
                baseURL: '/apis',
                method:'get',
                url:'/pingzhongdata/'+ code +'.js?v=' + time,
                headers: {
                    "Server": 'NWS_TCloud_static_msoc2',
                    "Content-Type": 'application/x-javascript'
                }
            }).then(res => {
                let start = res.data.indexOf('var Data_netWorthTrend =') + 25
                let end = res.data.indexOf(';/*累计净值走势*/')
                let str = res.data.substring(start, end)
                str = JSON.parse(str)
                console.log(str)
                this.setChart(str)
            })
      },
      setChart(chartData) {
        let  option = {
            xAxis: {
                splitLine:{
                    show: false
                },
                type: 'category',
                data: chartData.map(function (item) {
                    let year = new Date(item['x']).getFullYear()
                    let Mon = new Date(item['x']).getMonth() + 1
                    let day = new Date(item['x']).getDate()
                    let str = year + '-' + Mon + '-' + day
                    return str;
                }),
            },
            tooltip: {
                trigger: 'axis'
            },
            yAxis: {
                name: '净值',
                type: 'value',
                splitLine:{
                    show: false
                }
            },
            series: [{
                data: chartData.map(function (item) {
                    return item['y'];
                }),
                type: 'line',
                symbol : 'none',
                lineStyle : {
                    color: '#0066ff',
                    width: 1,
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#0066ff' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'transparent' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            }]
        };
        var myChart = echarts.init(document.getElementById('chartBox'));// eslint-disable-line no-undef
        myChart.setOption(option);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.warp {
    width: 100%;
    height: 100%;
    #chartBox {
        width: 100%;
        height: 20rem;
    }
}
</style>
