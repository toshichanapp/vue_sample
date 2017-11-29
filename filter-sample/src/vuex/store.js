import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import multiModal from './modules/multiModal'

Vue.use(Vuex)

const state = {
  items: [],
  currentChecked: [],
  columns: []
}

const modules = {
  multiModal
}

export default new Vuex.Store({
  state, modules, mutations, getters, actions
})
