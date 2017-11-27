import { EMIT_CHANGE_SELECTS, REMOVE_ITEM } from './mutation_types'

export default {
  emitChangeSelects: ({ commit }, data) => {
    commit(EMIT_CHANGE_SELECTS, data);
  },
  removeItem: ({ commit }, data) => {
    commit(REMOVE_ITEM, data);
  }
}
