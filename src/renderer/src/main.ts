import './assets/main.less'
import TDesign from 'tdesign-vue-next'
import TDesignIcons from 'tdesign-icons-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import layer from '@layui/layer-vue'

createApp(App).use(layer).use(createPinia()).use(TDesign).use(TDesignIcons).mount('#app')
