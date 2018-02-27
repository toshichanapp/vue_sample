import {
  EMIT_CHANGE_SELECTS_USER,
  REMOVE_USER_ITEM,
} from './mutation_types';

export default {
  emitChangeSelectsUser: ({commit}, data) => {
    commit(EMIT_CHANGE_SELECTS_USER, data);
  },
  removeUserItem: ({commit}, data) => {
    commit(REMOVE_USER_ITEM, data);
  },
};
