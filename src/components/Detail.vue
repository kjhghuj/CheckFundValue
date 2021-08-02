<template>
  <div class="warp" >
    <div class="load" v-if="load">
        <van-loading type="spinner" color="#1989fa" />
    </div>
    <div class="fundName">
        <div>{{$route.query.name}}</div>
        <div class="info">
            <div>单位净值：{{$route.query.dwjz}}</div>
            <div>持仓金额：{{$route.query.money}}</div>
        </div>
    </div>
    <div id="chartBox"></div>
    <div class="btnBox">
        <div class="TimeButton" v-for="item in  ButtonData" :key="item.value">
            <div @click="resetTime(item.value)">{{item.text}}</div>
        </div>
    </div>
    <div class="OtherFeature" v-for="(item, index) in featurList" :key='index'>
        <div class="title">{{item.title}}</div>
        <div class="FeatureContent">
            制作中
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detail',
  props: {},
  watch: {},
  data() {
      return {
          FundName: '',
          load: true,
          featurList:[
              {title:'历史业绩/净值'},
              {title:'基金持仓分布'},
              {title:'基金走势分析'},
              {title:'基金经理介绍'},
              {title:'AI涨跌判断'},
              {title:'投资建议'}
          ],
          ButtonData: [
              { text:'近三月', value: '3'},
              { text:'近六月', value: '6'},
              { text:'近一年', value: '12'},
              { text:'全部', value: 'all'},
          ],
          chartData: null
      }
  },
  computed : {},
  created () {
      this.FundName = this.$route.query.name
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
                // console.log(str)
                this.load = false
                this.chartData = str.map((item)=> {
                    let year = new Date(item['x']).getFullYear()
                    let Mon = new Date(item['x']).getMonth() + 1
                    let day = new Date(item['x']).getDate()
                    item.date = year + '-' + Mon + '-' + day
                    item.value = item.y
                    return item
                })
                this.setChart(this.chartData)
            })
      },
      resetTime (time) {
        if (time === 'all') {this.setChart(this.chartData); return}
        //   获取最新时间
        let end = this.chartData.length - 1
        let currentTime = this.chartData[end]
        let year = new Date(currentTime['x']).getFullYear()
        let Mon = new Date(currentTime['x']).getMonth() + 1
        // let day = new Date(currentTime['x']).getDate()
        // 计算月份和年份
        let v = Mon - time
        let t = v <= 0 ? 12 + v : v
        year = v <= 0 ? year - 1 : year
        console.log(year,t)
        for(let i = 0;i < this.chartData.length;i++) {
            if (this.chartData[i].date.indexOf(`${year}-${t}`) > -1){
                this.setChart(this.chartData.slice(i, end))
                break
            }
        }
      },
      setChart(chartData) {
        let  option = {
            grid: {
                top: 35,
                bottom: 30
            },
            xAxis: {
                splitLine:{
                    show: false
                },
                type: 'category',
                data: chartData.map(function (item) {
                    return item.date;
                }),
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    snap: true,
                    lineStyle: {
                        color: '#0066ff',
                        width: 1
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                // formatter : function(params) {
                //     console.log(params)
                //     return 'test'
                // }
            },
            yAxis: {
                name: '净值',
                type: 'value',
                splitLine:{
                    show: false
                }
            },
            series: [{
                data: chartData,
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
        height: 12rem;
        border: 1px solid #a0c0f1;
        border-radius: 5px;
    }
    .load {
        width: 100%;
        height: 100%;
        z-index: 2;
        background:rgba(0, 0, 0, .3);
        display:flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
    }
    .fundName {
        font-size: 1.4rem;
        height: 2rem;
        color: #a0c0f1;
        font-weight: 900;
        /* text-align: left; */
        margin-bottom: 1.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .info {
            font-size: 0.12rem;
            font-weight: 100;
        }
    }
    .btnBox {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.5rem;
        margin-top: 0.5rem;
        .TimeButton {
            flex: 1;
            width: 20%;
            padding:0.3rem 0;
            margin: 0 0.5rem;
            border: 1px solid #a0c0f1;
            color: #a0c0f1;
            border-radius: 5px;
        }
    }
    .OtherFeature {
        margin: 1rem 0;
        .title {
            font-size: 1rem;
            height: 1.2rem;
            color: #a0c0f1;
            font-weight: 600;
            text-align: left;
        }
    }
}
</style>
