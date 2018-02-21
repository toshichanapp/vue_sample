import {
  EMIT_CHANGE_SELECTS_ORG,
  REMOVE_ORG_ITEM,
  EMIT_CHANGE_SELECTS_USER,
  REMOVE_USER_ITEM
} from './mutation_types'

export default {
  emitChangeSelectsOrg: ({ commit }, data) => {
    commit(EMIT_CHANGE_SELECTS_ORG, data);
  },
  removeOrgItem: ({ commit }, data) => {
    commit(REMOVE_ORG_ITEM, data);
  },
  emitChangeSelectsUser: ({ commit }, data) => {
    commit(EMIT_CHANGE_SELECTS_USER, data);
  },
  removeUserItem: ({ commit }, data) => {
    commit(REMOVE_USER_ITEM, data);
  }
}
