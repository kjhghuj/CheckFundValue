<template>
  <div class="home">
      <div style="width: 100px" @click="toPic">toPIc</div>
    <van-notice-bar
        left-icon="volume-o"
        background="rgb(16, 16, 22)"
        color="#00aeff"
        text="建议不要超过二十只基金，防止手机卡死的情况发生"
        />
      <div class="searchBox" v-if="showBox">
          <div class="content">
              <div>
                  <input type="text" class="searchInput" v-model="searchValue">
                  <div class="searchButton" @click="query">
                      <svg t="1623333677157" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2018" width="20" height="20"><path d="M222.6944 222.7968A323.1488 323.1488 0 0 0 133.6832 512c19.2512-87.3728 64.512-172.7488 135.0144-243.3024C339.2512 198.1184 424.6272 152.8832 512 133.632c-101.632-19.1488-210.688 10.5216-289.3056 89.1648z" fill="#a7a7a7" p-id="2019"></path><path d="M989.44 822.1184l-121.7024-121.7024a118.016 118.016 0 0 0-92.8-34.1248c114.4576-165.5552 97.92-394.3936-49.4848-541.824-165.9392-165.9904-435.0464-165.9904-601.0368 0-165.9392 165.9904-165.9392 435.1232 0 601.1136 147.4048 147.4304 376.064 163.84 541.7216 49.3824-2.56 33.28 8.8576 67.5328 34.1248 92.8l121.7024 121.728c46.08 45.9776 121.3696 45.9776 167.3472 0 46.208-45.9776 46.208-121.2928 0.128-167.3728zM676.096 676.096c-138.6752 138.6752-363.392 138.6752-502.016 0-138.6752-138.6752-138.6752-363.4432 0-502.1184 138.624-138.6752 363.3408-138.6752 502.016 0 138.6496 138.5728 138.6496 363.4432 0 502.1184z" fill="#FFFFFF" p-id="2020"></path></svg>
                  </div>
                  <div class="searchButton" @click="showBox = false;NoSearch = true;searchValue = ''">
                     <svg t="1625810865399" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4328" width="20" height="20"><path d="M682.496043 619.749063v296.373906L0 458.168125 682.496043 0.127968v296.373907c600.596518 0 682.496043 458.040157 682.496042 727.370157h-54.599683S1142.327751 619.749063 682.496043 619.749063z" fill="#ffffff" p-id="4329"></path></svg>
                  </div>
              </div>
              <div class="list">
                  <div v-show="searchData.length > 0" class="listItem" v-for="(item, index) in searchData" :key="index" @click="addFundToList(item)">
                      <div>{{item[2]}}</div>
                      <div>{{item[0]}}</div>
                  </div>
                  <div class="Tip" v-show="searchData.length < 1 && NoSearch"><van-empty description="请输入基金名称进行搜索" /></div>
                  <div class="Tip" v-show="searchData.length < 1 && !NoSearch"><van-empty description="没有这只基金哦" /></div>
              </div>
              <van-loading type="spinner" class="loading" v-if="loading"/>
          </div>
      </div>
 
      <div class="sum" :class="[sum > 0 ? 'up': 'down']">
          {{sum}}
      </div>
      <div class="sum" :class="[sum > 0 ? 'up': 'down']" style="font-size: 14px;height: 2rem;">
          持仓总金额：{{isHidden? '****' : assetsSum}}
          <span @click="isHidden = !isHidden" style="margin-left:0.5rem;">
              <svg v-show="isHidden" t="1625813133004" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6137" width="20" height="20"><path d="M512 576c-85.495467 0-173.329067-33.083733-261.051733-98.321067-72.618667-53.998933-117.504-110.045867-119.381334-112.401066l33.390934-26.555734c0.426667 0.5376 43.537067 54.2208 111.445333 104.721067C356.616533 503.0912 435.882667 533.333333 512 533.333333c189.781333 0 335.5904-192.162133 337.041067-194.107733l34.184533 25.540267C876.7744 373.393067 722.935467 576 512 576z" fill="#ffffff" p-id="6138"></path><path d="M248.029867 446.037333l31.232 29.038934-99.413334 106.914133-31.232-29.056zM402.056533 535.381333l40.661334 12.936534-44.7744 140.765866-40.661334-12.928zM613.623467 537.762133l42.461866 138.666667-40.8064 12.484267-42.461866-138.666667zM771.746133 446.3616l95.342934 106.9056-31.829334 28.398933-95.351466-106.914133z" fill="#ffffff" p-id="6139"></path></svg>
              <svg v-show="!isHidden" t="1625813092129" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5274" width="20" height="20"><path d="M512.046 437.192h-0.55c-42.058 0.108-81.608 15.941-111.257 44.473-29.678 28.532-45.816 66.472-45.694 106.661 0.336 82.794 70.941 150.153 157.501 150.153h0.55c86.438-0.275 156.858-67.849 156.858-150.644v-0.551c-0.214-82.808-70.849-150.092-157.408-150.092z m0.336 245.968l-0.336 27.66v-27.66c-54.803 0-99.52-42.605-99.733-95.003-0.122-25.502 10.209-49.475 29.006-67.511 18.768-18.084 43.708-28.088 70.728-28.211 54.712 0 99.428 42.621 99.641 95.4-0.001 52.383-44.595 95.157-99.306 95.325z m324.904-252.958l111.623-70.143c13.388-8.415 17.116-25.518 8.344-38.323-8.803-12.759-26.713-16.276-39.979-7.925l-126.783 79.613c-39.765-28.471-85.551-53.927-136.411-71.474l54.59-138.543c5.593-14.288-1.987-30.243-16.903-35.629-14.945-5.385-31.634 1.866-37.257 16.171l-56.118 142.672c-27.692-5.783-56.453-8.965-86.346-8.965-30.198 0-58.991 3.289-86.315 9.071l-56.24-142.777c-5.624-14.305-22.313-21.556-37.259-16.171-14.916 5.386-22.495 21.341-16.81 35.629l54.588 138.817c-53.03 18.42-98.938 44.916-136.074 71.429l-127.089-79.843c-13.418-8.352-31.298-4.834-40.101 7.925-8.772 12.806-5.044 29.908 8.344 38.323l112.051 70.418c-68.22 58.837-111.164 120.016-122.81 146.635-3.087 6.869-3.087 14.564 0 21.387 12.624 28.808 61.742 97.864 139.712 160.862C271.072 813.456 378.936 878 512.046 878c246.598 0 420.48-217.817 447.622-279.394 3.057-6.93 3.057-14.687 0-21.556-12.409-28.194-55.598-89.067-122.382-146.848z m-54.803 287.273c-59.54 47.991-154.78 105.222-270.438 105.222-198.794 0-352.688-172.412-388.938-234.86 36.249-62.463 190.144-234.875 388.938-234.875 115.657 0 210.897 57.186 270.438 105.176 61.833 49.857 102.484 103.188 118.317 129.699-15.832 26.495-56.484 79.826-118.317 129.638z" p-id="5275" fill="#ffffff"></path></svg>
          </span>
      </div>
      <div class="header">
          <button @click="showBox = true;searchData = []">添加基金</button>
          <button @click="saveMoney(true)" v-if="showEditMoney === false">设置金额</button>
          <button @click="saveMoney(false)" v-else>保存金额</button>
          <button @click="updataAllFund()">立即获取</button>
      </div>
      <div class="content">
          <div class="fundItemHeader">
              <div>基金名称</div>
              <div>持仓金额</div>
              <div>估值&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>
          <div class="fundItem" 
          @click="goDetail(item)"
          v-for="(item, index) in fundList" 
          :key="index">
              <div :class="[item.value >= 0 ? 'up': 'down']">{{item.name}}</div>
              <div :class="[item.value >= 0 ? 'up': 'down']" v-if="showEditMoney === false">{{ isHidden? '****' : +item.money}}</div>
              <div :class="[item.value >= 0 ? 'up': 'down']" v-else>
                  <input type="text" v-model="item.money" class="moneyInput">
              </div>
              <div :class="[item.value >= 0 ? 'up': 'down']">
                  {{item.value}}&nbsp;&nbsp;
                  <span @click.stop='delFund(item.name)'>
                    <svg t="1623331573314" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1171" width="12" height="12"><path d="M512 0C229.236364 0 0 229.236364 0 512s229.236364 512 512 512 512-229.236364 512-512v-0.698182C1023.627636 228.817455 794.530909 0 512 0z m219.229091 664.622545a47.872 47.872 0 1 1-65.908364 69.352728L512 577.931636l-153.320727 152.622546a49.058909 49.058909 0 0 1-69.352728-69.376l152.622546-153.320727-152.645818-152.622546a49.058909 49.058909 0 1 1 69.376-69.376L512 445.393455l153.320727-153.320728a47.872 47.872 0 0 1 65.908364 69.352728l-152.622546 152.66909 152.622546 150.528z" fill="#7d7d7d" p-id="1172"></path></svg>
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
  name: 'home',
  data() {
    return {
        isHidden:false,
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
      // 盈亏
      sum() {
          let sum = 0
          this.fundList.forEach(item => {
              sum += item.money * (+item.value) * 0.01
          })
          return sum.toFixed(2)
      },
    //   持仓
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
    // 先从本地拿缓存数据
    this.fundList = JSON.parse(localStorage.getItem("funklist")) || []
    this.fundList.forEach(item => {
        this.fundNameList.push(item.code)
    })
  },
  mounted () {
    //   先更新一下
      this.updataAllFund(true)
    //   然后30秒更新一次(轮询)
      this.timer = setInterval(()=> {
          this.updataAllFund()
      }, 30000)
  },
  methods:{
    // 更新所有基金估值
    updataAllFund (isFirst) {
        if (this.fundList.length > 0) {
            this.fundList.forEach((item, index) => {
                if (isFirst) {
                    this.getFundDetail(item, index, true)
                } else {
                    this.getFundDetail(item, index)
                }
            })
        }
    },
    //   搜索
    query () {
        if(!this.searchValue) this.searchData = []
        if(!this.searchValue) return
        this.loading = true
        this.NoSearch = false
        setTimeout(()=>{
            let arr = []
            this.AllFunkData.forEach(item => {
                if (item[2].indexOf(this.searchValue) != -1 || item[0].indexOf(this.searchValue) != -1 ) {
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
        if (!type) {
            // 计算份额，份额用于计算每天的持仓
            this.fundList.forEach(item => {
                item['count'] = (item.money/item.dwjz).toFixed(2)
            })
            // console.log(this.fundList)
            localStorage.setItem("funklist", JSON.stringify(this.fundList));
        }
    },
    // 添加基金至列表
    addFundToList (item) {
        if (!this.fundNameList.includes(item[0])){
            let obj = {
                name: item[2],
                code: item[0],
                money: 0,
                value: 0,
                dwjz: 0
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
                message: '这只鸡已经在你的鸡场里了',
            }).then(() => {});
        }
    },
    // 获取单只基金详情
    getFundDetail (item, index, isFirst) {
        let time = new Date().getTime()
        axios({
                baseURL: '/fund',
                method:'get',
                url:'/js/'+ item.code +'.js?rt=' + time,
                headers: {
                    "Server": 'NWS_TCloud_static_msoc2',
                    "Content-Type": 'application/x-javascript'
                }
        })
        .then(res => {
            let str = res.data.substring(8,res.data.length - 2)
            let data = JSON.parse(str)
            this.$set(this.fundList[index], 'value', data.gszzl)
            this.$set(this.fundList[index], 'dwjz', data.dwjz)
            // 如果是第一次，更新持仓金额
            if (isFirst) {
                // 利用份额计算持仓
                let m = data.dwjz * (item.count ? item.count : 0)
                this.$set(this.fundList[index], 'money', m.toFixed(2))
            }
        })
    },
    //   获取基金列表
    getAllFundList () {
        axios({
            baseURL: '/apis',
            method:'get',
            url:'/js/fundcode_search.js',
            headers: {
                "Server": 'NWS_TCloud_static_msoc2',
                "Content-Type": 'application/x-javascript'
            }
        })
        .then( (response) => {
            this.AllFunkData = eval(response.data.substring(8))
            console.log(this.AllFunkData)
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
        Dialog.confirm({
            title: '删除',
            message: '是否确定删除该基金',
        }).then(() => {
            this.fundList = arr
            localStorage.setItem("funklist", JSON.stringify(this.fundList));
        }).catch(() => {
        // on cancel
        });
    },
    // 跳转详情
    goDetail(item) {
        if(this.showEditMoney) return
        this.$router.push({
        name: 'Detail',
        query: item
      })
    },
    toPic() {
        this.$router.push({
            name:'pic'
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./home.less');
</style>
