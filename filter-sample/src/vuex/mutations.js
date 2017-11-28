import * as types from './mutation_types'

export default {
  [types.EMIT_CHANGE_SELECTS] (state, data) {
    state.checkedItems = Object.assign([],data.value);
    state.currentChecked = Object.assign([],data.value);
  },
  [types.REMOVE_ITEM] (state, data) {
    state.checkedItems.splice(data.index, 1);
  },
  [types.CANCEL_CHANGE_SELECTS] (state, data) {
    console.log(data.value)
    state.checkedItems = Object.assign([], data.value);
  }
}
