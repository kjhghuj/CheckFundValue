
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    // outputDir: 'dist',  //build输出目录
    assetsDir: '', //静态资源目录（js, css, img）
    // lintOnSave: false, //是否开启eslint
    devServer: {
        open: false, //是否自动弹出浏览器页面
        host: "localhost", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
        port: '8081', // 设置端口号
        https: false,  //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/apis': {
              target: 'http://fund.eastmoney.com', //API服务器的地址
            //   ws: true, //代理websockets
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
              pathRewrite: {
                // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
                '^/apis': '/'
                //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                // '^/api': '',
              }
            },
            '/fund': {
              target: 'http://fundgz.1234567.com.cn', //API服务器的地址
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
              pathRewrite: {
                '^/fund': '/'
              }
            },
			// '/foo': {
			// 	target: 'http://yd.abc.top'
			// }
        },
    },
    chainWebpack: (config) => {
      config.externals={
        "echarts": "echarts",
      }
      config.resolve.alias
        .set('@src', resolve('src'))
        .set('@components', resolve('src/components'))
        plugins: [
            new CompressionPlugin({
                algorithm: 'gzip', // 使用gzip压缩
                test: /\.js$|\.html$|\.css$/, // 匹配文件名
                filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
                minRatio: 1, // 压缩率小于1才会压缩
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
            }),
        ]
      }
}