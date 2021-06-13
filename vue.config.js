module.exports = {
    outputDir: 'dist',  //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", //表示启动的时候使用的域名，默认可以不写，则是使用localhost和本机IP
        port: '8081', // 设置端口号
        https: false,  //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/': {
              target: 'http://fund.eastmoney.com', //API服务器的地址
            //   ws: true, //代理websockets
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
            //   pathRewrite: {
            //     // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
            //     '^/api5': '/api',
            //     //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            //     '^/api': '',
            //   }
            },
            '/js': {
              target: 'http://fundgz.1234567.com.cn/', //API服务器的地址
            //   ws: true, //代理websockets
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
            //   pathRewrite: {
            //     // '^/api5'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api5' 转接为 http://localhost:8081/api/
            //     '^/api5': '/api',
            //     //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
            //     '^/api': '',
            //   }
            },
			// '/foo': {
			// 	target: 'http://yd.abc.top'
			// }
        },
    },
    chainWebpack: (config) => {
        // 修复HMR
        // config.resolve.symlinks(true)
    
        // config.resolve.extensions.add('less')
    
        // 设置别名
        // config.resolve.alias
        //   .set('@', '/src')
        //   .set('@utils', '/src/utils')
    
        // if (APP_ENV === 'production') {
        //   config.optimization.minimizer('uglifyjs-webpack-plugin').use(
        //     new UglifyjsWebpackPlugin({
        //       uglifyOptions: {
        //         sourceMap: false,
        //         parallel: true,
        //         warnings: false,
        //         compress: {
        //           drop_console: true,
        //           drop_debugger: true,
        //           pure_funcs: ['console.log']
        //         }
        //       }
        //     })
        //   )
        // }
      }
}