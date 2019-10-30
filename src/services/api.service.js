import axios from 'axios'
import { TokenService } from './storage.service'
import store from '../store'
import router from '../router'
import { LOGOUT } from '../store/modules/actions.type'

const ApiService = {
  // Instantiate interceptor to handle expired token
  // or any 401 / 403 errors
  _interceptor: null,

  init(baseURL) {
    axios.defaults.baseURL = baseURL
  },

  setHeader() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${TokenService.getToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource) {
    return axios.get(resource)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  },

  mountInterceptor() {
    this._interceptor = axios.interceptors.response.use(
      response => {
        return response
      },
      async error => {
        if (error.response.status == 401) {
          // when 401 is received, clear localStorage
          // redirect to login page
          store.dispatch(LOGOUT)
          router.push({ name: 'login' })
          throw error
        }

        if (error.response.status == 403) {
          router.push({ name: 'forbiddenpage' })
          throw error
        }

        if (error.response.status == 404) {
          router.push({ name: 'notfoundpage' })
          throw error
        }

        // error not caused by 401, 403 or 404
        throw error
      }
    )
  },

  unmountInterceptor() {
    axios.interceptors.response.eject(this._interceptor)
  }
}

export default ApiService
