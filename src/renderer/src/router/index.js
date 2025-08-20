// src/router/route.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import User from '../components/Users.vue'
import Payments from '../components/Payments.vue'
import Reports from '../components/Reports.vue'
import Messages from '../components/Messages.vue'
import Dashboard2 from '../components/Dashboard2.vue'
import ShopManagement from '../components/ShopManagement.vue'
import Login from '../components/Login.vue'

const routes = [
  { path: '/',        name: 'Home',      component: Dashboard,   meta: { requiresAuth: true } },
  { path: '/payments',name: 'Payments',  component: Payments,    meta: { requiresAuth: true } },
  { path: '/users',   name: 'Users',     component: User,        meta: { requiresAuth: true } },
  { path: '/reports', name: 'Reports',   component: Reports,     meta: { requiresAuth: true } },
  { path: '/messages',name: 'Messages',  component: Messages,    meta: { requiresAuth: true } },
  { path: '/dashboard',name:'Dashboard2',component: Dashboard2,  meta: { requiresAuth: true } },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopManagement,
    meta: { title: 'مدیریت فروشگاه', requiresAuth: true }
  },
  { path: '/login',   name: 'Login',     component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// گارد مسیر
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
