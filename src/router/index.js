import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import HotDetail from '@/views/HotDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
	{
		path: '/hotdetail',
		name: 'HotDetail',
		component: HotDetail
	}
  ]
})
