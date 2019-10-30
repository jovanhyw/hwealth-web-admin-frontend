import ApiService from '@/services/api.service'
import { TokenService } from '@/services/storage.service'
import { SET_USER, REMOVE_USER } from './mutations.type'
import { LOGIN, LOGOUT } from './actions.type'

const state = {
  user: null,
  isAuthenticated: !!TokenService.getToken()
}

const mutations = {
  [SET_USER](state, user) {
    state.user = user
    state.isAuthenticated = true

    TokenService.saveToken(user.token)
    TokenService.saveTfaState(user.twoFactorEnabled)
    ApiService.setHeader()
  },
  [REMOVE_USER](state) {
    state.user = null
    state.isAuthenticated = false

    TokenService.removeToken()
    TokenService.removeTfaState()
    ApiService.removeHeader()
  }
}

const getters = {
  getCurrentUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated
}

const actions = {
  [LOGIN]({ commit }, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('/auth/login', credentials)
        .then(res => {
          commit(SET_USER, res.data)
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [LOGOUT]({ commit }) {
    return new Promise(resolve => {
      commit(REMOVE_USER)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
