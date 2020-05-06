import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import animate from 'animate.css'
import './assets/index.css'
import axios from 'axios'
import './assets/fonts/iconfont.css'

// 上下文菜单插件
import VueContextMenu from '@xunlei/vue-context-menu'

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'



// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


//使用中间件
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.use(animate);
Vue.use(VueContextMenu)


//配置路由头部
axios.defaults.baseURL = 'http://localhost:8999/api/'
//请求头部传递token
// axios.defaults.headers.authorization =window.localStorage.getItem('token')

//请求挂载
Vue.prototype.$http = axios;

Vue.config.productionTip = false



//路由守卫
router.beforeEach((to,from,next)=>{

    if(to.path == '/login') return next();

    const tokenKey=window.localStorage.getItem('token')

    if(!tokenKey) return  next({path:'/login'})

    next()
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
