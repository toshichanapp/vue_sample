import * as types from './mutation_types'
export default {
  [types.CHANGED_FILTER](state, filter) {
    console.log(filter);
    // filter.checkState = true --> check if in activeFilters list
    // filter.checkState = false --> remove filter from activeFilters
    let index = state.activeFilters.indexOf(filter.item.name);

    if ((index == -1) &&
      filter.checkState) {
      // item not in list && checked --> add to list
      state.activeFilters.push(filter.item.name);
    }
    else {
      // item in list & toggled to false
      state.activeFilters.splice(index, 1); // remove from list
    }
  }
}
