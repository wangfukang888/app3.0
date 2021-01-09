import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { Image as VanImage, Toast } from 'vant'
import './assets/css/tailwind.scss'

const app = createApp(App)
app.use(Toast)
app.use(router)
app.component('Img', VanImage)

app.mount('#app')
