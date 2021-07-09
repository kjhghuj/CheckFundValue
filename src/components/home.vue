<template>
  <div class="home">
    <van-notice-bar
        left-icon="volume-o"
        background="rgb(16, 16, 22)"
        color="#00aeff"
        text="建议不要超过十只鸡，怕你的垃圾手机卡死，你要是不信可以试试"
        />
      <div class="searchBox" v-if="showBox">
          <div class="content">
              <div>
                  <input type="text" class="searchInput" v-model="searchValue">
                  <div class="searchButton" @click="query">
                      <svg t="1623333677157" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2018" width="20" height="20"><path d="M222.6944 222.7968A323.1488 323.1488 0 0 0 133.6832 512c19.2512-87.3728 64.512-172.7488 135.0144-243.3024C339.2512 198.1184 424.6272 152.8832 512 133.632c-101.632-19.1488-210.688 10.5216-289.3056 89.1648z" fill="#a7a7a7" p-id="2019"></path><path d="M989.44 822.1184l-121.7024-121.7024a118.016 118.016 0 0 0-92.8-34.1248c114.4576-165.5552 97.92-394.3936-49.4848-541.824-165.9392-165.9904-435.0464-165.9904-601.0368 0-165.9392 165.9904-165.9392 435.1232 0 601.1136 147.4048 147.4304 376.064 163.84 541.7216 49.3824-2.56 33.28 8.8576 67.5328 34.1248 92.8l121.7024 121.728c46.08 45.9776 121.3696 45.9776 167.3472 0 46.208-45.9776 46.208-121.2928 0.128-167.3728zM676.096 676.096c-138.6752 138.6752-363.392 138.6752-502.016 0-138.6752-138.6752-138.6752-363.4432 0-502.1184 138.624-138.6752 363.3408-138.6752 502.016 0 138.6496 138.5728 138.6496 363.4432 0 502.1184z" fill="#FFFFFF" p-id="2020"></path></svg>
                  </div>
              </div>
              <div class="list">
                  <div v-show="searchData.length > 0" class="listItem" v-for="(item, index) in searchData" :key="index" @click="addFundToList(item)">
                      <div>{{item[2]}}</div>
                      <div>{{item[0]}}</div>
                      <!-- <div>类型:{{item[3]}}</div> -->
                  </div>
                  <div class="Tip" v-show="searchData.length < 1 && NoSearch">搜点东西吧。。狗逼<br>目前只支持使用基金名称进行搜索</div>
                  <div class="Tip" v-show="searchData.length < 1 && !NoSearch">没有，搜不到，问就是打错字了，要不就接口炸了</div>
              </div>
              <van-loading type="spinner" class="loading" v-if="loading"/>
              <!-- <div class="footer">
                  <button @click="showBox = false">取消</button>
                  <button>保存</button>
              </div> -->
          </div>
      </div>
 
      <div class="sum" :class="[sum > 0 ? 'up': 'down']">
          {{sum}}
      </div>
      <div class="sum" :class="[sum > 0 ? 'up': 'down']" style="font-size: 14px;height: 2rem;">
          持仓总金额：{{assetsSum}}
      </div>
      <div class="header">
          <button @click="showBox = true">添加基金</button>
          <button @click="saveMoney(true)" v-if="showEditMoney === false">设置金额</button>
          <button @click="saveMoney(false)" v-else>保存金额</button>
      </div>
      <div class="content">
          <div class="fundItemHeader">
              <div>基金名称</div>
              <div>持仓金额</div>
              <div>估值&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>
          <div class="fundItem" 
          v-for="(item, index) in fundList" 
          :key="index">
              <div :class="[item.value >= 0 ? 'up': 'down']">{{item.name}}</div>
              <div :class="[item.value >= 0 ? 'up': 'down']" v-if="showEditMoney === false">{{ +item.money}}</div>
              <div :class="[item.value >= 0 ? 'up': 'down']" v-else>
                  <input type="text" v-model="item.money" class="moneyInput">
              </div>
              <div :class="[item.value >= 0 ? 'up': 'down']">
                  {{item.value}}&nbsp;&nbsp;
                  <span @click='delFund(item.name)'>
                    <svg t="1623331573314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1171" width="12" height="12"><path d="M512 0C229.236364 0 0 229.236364 0 512s229.236364 512 512 512 512-229.236364 512-512v-0.698182C1023.627636 228.817455 794.530909 0 512 0z m219.229091 664.622545a47.872 47.872 0 1 1-65.908364 69.352728L512 577.931636l-153.320727 152.622546a49.058909 49.058909 0 0 1-69.352728-69.376l152.622546-153.320727-152.645818-152.622546a49.058909 49.058909 0 1 1 69.376-69.376L512 445.393455l153.320727-153.320728a47.872 47.872 0 0 1 65.908364 69.352728l-152.622546 152.66909 152.622546 150.528z" fill="red" p-id="1172"></path></svg>
                  </span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
// import eruda from 'eruda'
import { Dialog } from 'vant';

export default {
  name: 'HelloWorld',
  data() {
    return {
        loading:false,
        NoSearch: true,
        AllFunkData: [],
        showEditMoney: false,
        searchValue: '',
        searchData: [],
        showBox: false,
        fundList: [],
        fundNameList: []
    }
  },
  computed : {
      sum() {
          let sum = 0
          this.fundList.forEach(item => {
              sum += item.money * (+item.value) * 0.01
          })
          return sum.toFixed(2)
      },
      assetsSum () {
          let sum = 0
          this.fundList.forEach(item => {
              sum += (+item.money)
          })
          return sum.toFixed(2)
      }
  },
  created () {
    this.getAllFundList()
    this.fundList = JSON.parse(localStorage.getItem("funklist")) || []
    this.fundList.forEach(item => {
        this.fundNameList.push(item.code)
    })
  },

  mounted () {
    // let el = document.createElement('div');
    // document.body.appendChild(el);

    // eruda.init({
    //     container: el,
    //     tool: ['console', 'elements']
    // });
    // eruda.init()
    //   30秒更新一次
      this.timer = setInterval(()=> {
          if (this.fundList.length > 0) {
              this.fundList.forEach((item, index) => {
                  this.getFundDetail(item, index)
              })
          }
      }, 30000)
      this.assetMoneyUpdate()
      
  },
  methods:{
    //   搜索
    query () {
        if(!this.searchValue) this.searchData = []
        if(!this.searchValue) return
        this.loading = true
        this.NoSearch = false
        setTimeout(()=>{
            let arr = []
            this.AllFunkData.forEach(item => {
                if (item[2].indexOf(this.searchValue) != -1) {
                    arr.push(item)
                }
            })
            this.searchData = arr
            this.loading = false
        })
    },
    // 保存资金
    saveMoney (type) {
        this.showEditMoney = type
        localStorage.setItem("funklist", JSON.stringify(this.fundList));
    },
    // 添加基金至列表
    addFundToList (item) {
        if (!this.fundNameList.includes(item[0])){
            let obj = {
                name: item[2],
                code: item[0],
                money: 0,
                value: 0
            }
            this.fundList.push(obj)
            // 添加后立刻更新
            this.getFundDetail(obj, this.fundList.length - 1)
            // 重置状态
            this.searchValue = ''
            this.searchData = []
            this.showBox = false
            this.NoSearch = true
            // 缓存到本地
            setTimeout(() => {
                localStorage.setItem("funklist", JSON.stringify(this.fundList));
            },1000)
        } else {
            Dialog.alert({
                title: '重复',
                message: '这个鸡已经有了',
            }).then(() => {
                
            });
        }

    },
    // 获取单只基金详情
    getFundDetail (item, index) {
        let time = new Date().getTime()
        // http://8.129.120.231/apis/js/fundcode_search.js
    axios({
            baseURL: '/fund',
            // baseURL: '/fund',
            method:'get',
            url:'/js/'+ item.code +'.js?rt=' + time,
            // timeout: 1000,
            headers: {
                "Server": 'NWS_TCloud_static_msoc2',
                "Content-Type": 'application/x-javascript'
            }
    })
    .then(res => {
        let str = res.data.substring(8,res.data.length - 2)
        let data = JSON.parse(str)
        this.$set(this.fundList[index], 'value', data.gszzl)
    })
    },
    //   获取基金列表
    getAllFundList () {
    // axios.get('/api/js/fundcode_search.js')
    axios({
        baseURL: '/apis',
        // baseURL: 'http://fund.eastmoney.com',
        method:'get',
        url:'/js/fundcode_search.js',
        // timeout: 1000,
        headers: {
            "Server": 'NWS_TCloud_static_msoc2',
            "Content-Type": 'application/x-javascript'
        }
    })
    .then( (response) => {
        this.AllFunkData = eval(response.data.substring(8))
    })
    .catch( (error) => {
        console.log(error);
    });
    },
    //   删除基金
    delFund(name) {
    let arr = []
    this.fundList.forEach((item) => {
        if (item.name != name) {
            arr.push(item)
        }
    })
    Dialog.alert({
        title: '删除',
        message: '是否确定删除该基金',
    }).then(() => {
        this.fundList = arr
        localStorage.setItem("funklist", JSON.stringify(this.fundList));
    });
        
    },
    // 获取前一天的值，更新持仓额度
    assetMoneyUpdate() {
        // let day = new Date().getDate()
        // let day2 = localStorage.getItem('day')
        // let week = new Date().getDay()
        // // 如果是一天之内算过了则不算
        // if (new Date().getDate() == day2) return
        // // 周末不算
        // // if (week == 6 || week == 0) return
        // // 如果是节假日也不算（待实装）
        // let time = new Date().getHours()
        // if (time > 15 || time < 9) {
        //     this.fundList.forEach(item => {
        //         item.money = (+item.money) + ((+item.money) * (+item.value /100))
        //     })
        //     localStorage.setItem('day', day.toString())
        // }
    },
    // timestampToTime(timestamp) {
    //     var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //     var Y = date.getFullYear() + '-';
    //     var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //     var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    //     var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    //     var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    //     var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        
    //     strDate = Y+M+D+h+m+s;
    //     return strDate;
        
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.loading {
    z-index: 2;
    width: 100% !important;
    position: absolute;
    align-items: center !important;
    height: 100% !important;
    display: flex !important;
    justify-content: center !important;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
}
.up {
    color: rgb(240, 82, 82);
}
.down {
    color: rgb(97, 235, 120);
}
.d-f-c {
    display: flex;
    justify-content: center;
    align-items: center;
}
.d-f-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.searchBox {
    position: fixed;
    top:0;left:0;right:0;bottom:0;
    background:rgba(0, 0, 0, .3);
    // background:rgba(255, 255, 255, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
        width: 80%;
        height: 90%;
        padding: 0.5rem;
        background: rgb(20, 25, 97);
        border-radius: 0.5rem;
        div:first-child{
            .d-f-b();
            height: 1.8rem;
        }
        .searchInput {
            display: block;
            width:80%;
            border: 1px solid rgb(177, 177, 177);
            border-radius: 0.3rem;
            height: 1.5rem;
        }
        .searchButton {
            .d-f-c();
            width: 19%;
            border: none;
            border-radius: 0.3rem;
            height: 1.8rem;
            margin-left: 1%;
            background:rgb(0, 195, 255);
        }
        .list {
            height: calc(100% - 2rem);
            padding: 0 0.5rem;
            overflow: auto;
            .Tip {
                color: #fff;
                text-align: center;
                width: 100%;
                height: 30%;
                font-size: 23px;
            }
            .listItem {
                .d-f-b();
                color: #fff;
                background:#173671;
                margin: 0.5rem 0;
                padding: 0 0.5rem;
                border-radius: 0.3rem;
                // div:first-child {
                //     width: 30%;
                //     overflow: hidden; /* 溢出时不显示溢出的内容 */
                //     text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
                //     display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
                //     -webkit-box-orient: vertical; /* 垂直排列元素 */
                //     -webkit-line-clamp: 1; /* 显示多少行 */
                // }
            }
        }
        .footer{
            margin-top: 0.4rem;
            .d-f-c();
            button {
                .searchButton();
                margin-left:1rem;
                color:#fff;
            }
        }
    }
}
.sum {
    font-size: 3rem;
    display: flex;
    height: 4.5rem;
    justify-content: center;
    align-items: center;
}
.home {
    background:rgb(16, 16, 22);
    user-select: none;
}
.header {
    button{
        width: 40%;
        height: 2rem;
        line-height: 2rem;
        color:#fff;
        background:rgb(194, 65, 55);
        border-radius: 0.5rem;
        margin-left:1rem;
        border:none;
    }
}
.fundItem {
    background:rgb(24, 20, 77);
    font-size: 14px;
    height: 2rem;
    line-height: 3rem;
    border-radius: 0.5rem;
    padding: 0.3rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
    .moneyInput {
        width: 3.2rem;
        height: 1.5rem;
        border-radius: 0.3rem;
        border:none;
    }
    div:first-child {
        color: rgb(216, 215, 215);
        width: 30%;
         overflow: hidden; /* 溢出时不显示溢出的内容 */
        text-overflow: ellipsis; /* 发生溢出时使用省略号代替 */
        display: -webkit-box; /* chrome浏览器的私有属性。显示为box。 */
        -webkit-box-orient: vertical; /* 垂直排列元素 */
        -webkit-line-clamp: 1; /* 显示多少行 */
    }
}
.fundItemHeader {
    .fundItem();
    background:rgba(24, 20, 77, 0);
    color: white;
}
</style>
