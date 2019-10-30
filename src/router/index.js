import Vue from 'vue'
import VueRouter from 'vue-router'
import { TokenService } from '@/services/storage.service'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(
    record => record.meta.onlyWhenLoggedOut
  )
  const loggedIn = !!TokenService.getToken()

  // if route is private & user not loggedIn
  // redirect to login page
  if (!isPublic && !loggedIn) {
    return next({
      path: '/',
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    })
  }

  // Do not allow user to visit login page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/search')
  }

  next()
})

export default router
