import { CHANGE_MSG } from './mutation_types'

export default {
  changeMessage ({ commit }, msg) {
    commit(CHANGE_MSG, msg)
  }
}
