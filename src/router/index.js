import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      name: 'home',
      meta: {
        keepAlive: true,
        title: '首页'
      },
      component: () => import('@components/home')
    },
    {
      path: '/Detail',
      name: 'Detail',
      meta: {
        // keepAlive: true,
        title: '基金详情'
      },
      component: () => import('@components/Detail')
    },
  ]
  
  const router = new VueRouter({
    routes,
    // mode: 'history',
    // base: process.env.BASE_URL,
    // scrollBehavior(to, from, savedPosition) {
    //   if (savedPosition) {
    //     return savedPosition
    //   } else {
    //     return {
    //       x: 0,
    //       y: 0
    //     }
    //   }
    // }
  })
  // router.beforeEach((to, from, next) => {
  //   if (
  //     to.path &&
  //     to.path.startsWith('/parameterManagement') &&
  //     to.query.from === 'jg'
  //   ) {
  //     window.document.title = '进出库明细'
  //     next()
  //     return
  //   }
  //   // window.document.title = '深圳市冷藏冷冻仓库进出库系统'
  //   if (to.name !== 'Login') {
  //     // 如果当前页面不是登录页面 则需要判断有没有token，没有的话就跳转到login页面
  //     if (!store.state.user.token) {
  //       next({ name: 'Login' })
  //       return
  //     }
  //   } else {
  //     // 如果来自i深圳 则不要再进入到登录页面了
  //     const isz = store.state.user.fromIsz === 'isz'
  //     if (isz) {
  //       next({ name: 'Home' })
  //       return
  //     }
  //   }
  //   next()
  // })
  
  export default router