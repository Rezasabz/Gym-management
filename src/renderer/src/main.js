import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
// اضافه کردن vue3-jalali-moment
// import vueJalaliMoment from 'vue3-jalali-moment';
import DatePicker from 'vue3-persian-datetime-picker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('date-picker', DatePicker)

app.mount('#app')

// createApp(App).use(createPinia).use(router).mount('#app')
    // createApp(App).use(router).use(vueJalaliMoment).mount('#app')