
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import "@/assets/icon/iconfont.css"
import Jump from "@/components/Jump.vue";
import Index from "@/components/Index.vue";
import * as VueRouter from "vue-router";
const routes = [
    {path: '/', component: Index},
    { path: '/jump', component: Jump },
]

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

createApp(App).use(Antd).use(router).mount('#app')
