import * as types from './mutation_types';

export default {
  [types.EMIT_CHANGE_SELECTS_USER](state, data) {
    state.currentUserChecked = Object.assign([], data.value);
    state.currentOrgChecked = Object.assign([], data.org);
  },
  [types.REMOVE_USER_ITEM](state, data) {
    state.currentUserChecked.splice(data.value, 1);
  },
};
