import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'tailwindcss/tailwind.css'
import App from './App.vue'
import router from './router'

import '@/styles/index.css'

const app = createApp(App)
app.use(createPinia()).use(router).mount('#app')
