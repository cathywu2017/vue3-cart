import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import tool from "./utils/tools"

const app = createApp(App)

app
  .use(router)
  .use(tool)

app.mount('#app')
