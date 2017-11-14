import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods/Goods'
import Ratings from '@/components/Ratings/Ratings'
import Seller from '@/components/Seller/Seller'
//创建异步组件并 分开打包
/*const User = r => require.ensure([], () => r(require('@/pages/User.vue')), 'User')*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path:'/ratings',
      name:"Ratings",
      component:Ratings
    },
    {
      path:'/seller',
      name:"Seller",
      component:Seller
    },
    { 
     	path: '/', 
     	redirect: '/goods'
    }
  ],
  linkActiveClass:'active'
})
