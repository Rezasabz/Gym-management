import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import About from '../components/About.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
