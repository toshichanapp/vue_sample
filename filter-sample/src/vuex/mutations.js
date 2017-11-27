import * as types from './mutation_types'

export default {
  [types.EMIT_CHANGE_SELECTS] (state, data) {
    state.checkedItems = data.value
  }
}
