import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// اضافه کردن vue3-jalali-moment
// import vueJalaliMoment from 'vue3-jalali-moment';



createApp(App).use(router).mount('#app')
    // createApp(App).use(router).use(vueJalaliMoment).mount('#app')