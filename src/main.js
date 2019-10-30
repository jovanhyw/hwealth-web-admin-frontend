import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ApiService from '@/services/api.service'
import { TokenService } from '@/services/storage.service'

Vue.config.productionTip = false

// Initialise API URL Path for Axios HTTP calls
ApiService.init(process.env.VUE_APP_API_URL)
ApiService.mountInterceptor()

// If token exists, set header for axios
if (TokenService.getToken()) {
  ApiService.setHeader()
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
