import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { CHANGE_MSG } from './mutation_types'

Vue.use(Vuex)

const state = {
  message: 'store'
}

const mutations = {
  [CHANGE_MSG](state, msg){
    state.message = msg
  }
}

export default new Vuex.Store({
  state, mutations, getters
})
