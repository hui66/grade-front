import Vue from 'vue'
import Vuex from 'vuex'
import { requestUserInfo } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      permissions: [],
      accessMenu: []
    },
    source: {
      token: null,
      cancel: null
    }
  },
  mutations: {
    setUser (state, { user }) {
      state.user.name = user.data.userName
      state.user.permissions = [
        { name: 'index' },
        { name: 'table' },
        { name: 'formsBase' },
        { name: 'formsEdit' },
        { name: 'charts' },
        { name: 'errorDemo403' },
        { name: 'errorDemo404' },
        { name: 'errorDemo500' },
        { name: 'drag' },
        { name: 'userPassword' },
        { name: 'userPermissions' },
        { name: 'score' },
        { name: 'about' },
        { name: 'userInfo' },
        { name: 'learnInfo' }
      ]
      state.user.accessMenu = user.accessMenu
    },
    deleteUser (state) {
      state.user.name = ''
      state.user.permissions = []
      state.user.accessMenu = []
    },
    updateSource (state, { source }) {
      state.source = source
    }
  },
  actions: {
    requestUserInfo ({ commit }) {
      return requestUserInfo().then(user => {
        console.log(user)
        commit('setUser', { user })
      })
    }
  }
})
