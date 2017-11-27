import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  activeFilters: ['all'],
  list: [ { id: 0, title: 'First Item'},
          { id: 1, title: 'Second Item'},
          { id: 2, title: 'Third Item'},
          { id: 3, title: '1'},
          { id: 4, title: '2'},
          { id: 5, title: '3'},
          { id: 6, title: 'Test 1'},
          { id: 7, title: 'Test 2'} ]
}
export default new Vuex.Store({
  state, mutations, getters, actions
})
