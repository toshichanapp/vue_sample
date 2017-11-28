import { EMIT_CHANGE_SELECTS, REMOVE_ITEM, CANCEL_CHANGE_SELECTS } from './mutation_types'

export default {
  emitChangeSelects: ({ commit }, data) => {
    commit(EMIT_CHANGE_SELECTS, data);
  },
  removeItem: ({ commit }, data) => {
    commit(REMOVE_ITEM, data);
  },
  cancelChangeSelects: ({ commit }, data) => {
    commit(CANCEL_CHANGE_SELECTS, data);
  }
}
