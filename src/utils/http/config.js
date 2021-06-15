const ENV =
  process.env.NODE_ENV !== 'dev' ? process.env.NODE_ENV : 'dev'

const WRB_CONFIG = {
  development: {
    HOST: '/api' // 测试
    // HOST: 'http://192.168.211.184:9002' // 中强
    // HOST: 'http://192.168.216.192:9002' // 徐勇
    // HOST: 'http://192.168.197.91:9002' // 竞雄
    // HOST: 'http://192.168.194.194:9002' // 健雄
    // HOST: 'http://192.168.196.29:9002/' // 川哥
    // HOST: 'http://192.168.201.209:9002' // 林峰
    // HOST: 'http://192.168.206.134:9002' // 昌安
    // HOST: 'http://192.168.214.8:9002' // 钟荣杰
    // HOST: 'http://192.168.216.102:9002' // 王延鹏
    // HOST: 'http://192.168.109.1:9002' // 张林
  },
  production: {
    HOST: 'http://fund.eastmoney.com'
  }
}[ENV]

export default WRB_CONFIG