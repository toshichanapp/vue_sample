import * as types from './mutation_types'

export default {
  [types.EMIT_CHANGE_SELECTS] (state, data) {
    state.currentChecked = Object.assign([],data.value);
  },
  [types.REMOVE_ITEM] (state, data) {
    state.currentChecked.splice(data.value, 1);
  }
}
