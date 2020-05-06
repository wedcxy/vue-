import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Card from '@/components/Card.vue'
import Show from '@/components/Show.vue'
import NotFound from '@/components/NotFound.vue'
import OneShow from '@/components/OneShow.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/OneShow',
    children:[
      {
        path:'/Card',
        component:Card
      },
      {
        path:'/Show',
        component:Show
      },
      {
        path:'/OneShow',
        component:OneShow
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
