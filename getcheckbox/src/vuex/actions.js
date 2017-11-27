import { CHANGED_FILTER } from './mutation_types'
export default {
  changedFilter: ({ commit }, data) => {
    commit(CHANGED_FILTER, data)
  }
}
