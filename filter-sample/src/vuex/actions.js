import { EMIT_CHANGE_SELECTS } from './mutation_types'

export default {
  emitChangeSelects: ({ commit }, data) => {
    commit(EMIT_CHANGE_SELECTS, data)
  }
}
