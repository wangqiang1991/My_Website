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
        component: () => import('@/pages/promoterIndex/promoterIndex'),
        name: 'menuIndex1',
        meta: { title: 'menuIndex1',  noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'table1',
    children: [
      {
        path: 'table1',
        component: () => import('@/pages/promoterData/promoterData'),
        name: 'menuIndex2',
        meta: { title: 'menuIndex2', noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'table2',
    children: [
      {
        path: 'table2',
        component: () => import('@/pages/promoterSettle/promoterSettle'),
        name: 'menuIndex3',
        meta: { title: 'menuIndex3', noCache: true }
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
