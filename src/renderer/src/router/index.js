import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import About from '../components/About.vue'
import User from '../components/Users.vue'
import Payments from '../components/Payments.vue'
import Reports from '../components/Reports.vue'
import Messages from '../components/Messages.vue'

const routes = [
    { path: '/', component: Dashboard },
    // { path: '/about', component: About },
    { path: '/payments', component: Payments },
    { path: '/users', component: User },
    { path: '/reports', component: Reports },
    { path: '/messages', component: Messages },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router