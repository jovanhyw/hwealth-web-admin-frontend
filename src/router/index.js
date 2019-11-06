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
  },
  {
    path: '/two-factor',
    name: 'twofaverification',
    component: () => import('@/views/TwoFaVerification'),
    meta: {
      onlyForTfa: true,
      onlyForThoseWhoHaveNotAuthenticate: true
    }
  },
  {
    path: '/*',
    redirect: '/'
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
  const onlyForTfa = to.matched.some(record => record.meta.onlyForTfa)
  const onlyForThoseWhoHaveNotAuthenticate = to.matched.some(
    record => record.meta.onlyForThoseWhoHaveNotAuthenticate
  )

  const loggedIn = !!TokenService.getToken()
  const tfaEnabled = !!(TokenService.getTfaState() === 'false' ? false : true)
  const tfaAuthenticated = !!(TokenService.getTfaAuth() === 'false'
    ? false
    : true)

  // if route is private & user not loggedIn
  // redirect to login page
  if (!isPublic && !loggedIn) {
    return next({
      path: '/',
      query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
    })
  }

  // this code not working
  // if user is logged in, and have tfa enabled, and tfa is not authenticated
  // if (tfaAuthenticated === false) {
  //   return next('/two-factor')
  // }

  // Do not allow user to visit login page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/search')
  }

  // Do not allow user to visit tfa page if they did not enable tfa
  if (!tfaEnabled && onlyForTfa) {
    return next('/search')
  }

  // Do not allow user to visit tfa page if they already authenticated 2fa
  if (tfaAuthenticated && onlyForThoseWhoHaveNotAuthenticate) {
    return next('/search')
  }

  next()
})

export default router
