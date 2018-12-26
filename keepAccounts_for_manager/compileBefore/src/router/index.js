import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/pages/login/login'),
    hidden: true
  },  
  {
    path: '/',
    component: () => import('@/pages/login/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/authredirect',
    redirect: 'login',
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/pages/homeIndex/homeIndex'),
        name: 'menuIndex1',
        meta: { title: 'menuIndex1',  noCache: true }
      }
    ]
  },  
  {
    path: '/',
    component: Layout,
    redirect: 'leaveMessage',
    children: [
      {
        path: 'leaveMessage',
        component: () => import('@/pages/leaveMessage/leaveMessage'),
        name: 'menuIndex2',
        meta: { title: 'menuIndex2',  noCache: true }
      }
    ]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
