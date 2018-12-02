import Vue from 'vue'
import Router from 'vue-router'
import NewOrder from '@/components/NewOrder'
import OnWayOrder from '@/components/OnWayOrder'
import DeliveredOrder from '@/components/DeliveredOrder'
import Login from '@/components/Login'
import { auth } from '../firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      name: 'NewOrder',
      component: NewOrder,
      path: '/newOrder',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'OnWayOrder',
      component: OnWayOrder,
      path: '/onWayOrder',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'DeliveredOrder',
      component: DeliveredOrder,
      path: '/deliveredOrder',
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'Login',
      component: Login,
      path: '/login'
    },
    {
      name: 'Login',
      component: Login,
      path: '/'
    },
    {
      name: 'Login',
      component: Login,
      path: '*'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) {
    next('Login')
  } else if (!requiresAuth && currentUser) {
    next('NewOrder')
  } else {
    next()
  }
})

export default router
