import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '@/view/index'
import List from '@/view/list'
import Edit from '@/view/edit'

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      redirect: '/'
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/edit/:title',
      props: true,
      component: Edit
    }

  ],
  mode: 'history',
  fallback: true
})
