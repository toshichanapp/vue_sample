<template>
  <div id="app">
    <filter-menu></filter-menu>
    selected filters: {{$store.getters.activeFilters}}
    <h1> List to filter:</h1>
    <ul>
      <li v-for="listItem in applyFilter(list)" :key="listItem.id"> {{listItem.title}}</li>
    </ul>
  </div>
</template>

<script>
  import filterMenu from './components/filterMenu'
  import store from './vuex/store'
  import { mapGetters } from 'vuex'

  export default {
    store,
    components: {
      filterMenu: filterMenu
    },
    computed: mapGetters({
      list: 'getList',
      activeFilters: 'getActiveFilters'
    }),
    methods: {
      applyFilter(orgList) {
        // activeFilters = all, numeric, letters
        let filtered = orgList;
        if (this.activeFilters.indexOf('all') == -1) {
          // all not included
          let numericFiltered = [];
          let letterFiltered = [];

          if (this.activeFilters.indexOf('numeric') > -1) {
            numericFiltered = orgList.filter((item) => {
              console.log('check match', item.title.match(/^\d+$/), item);
              return /^[\d+\s+]+$/.test(item.title);
            });
          }

          if (this.activeFilters.indexOf('letters') > -1) {
            letterFiltered = orgList.filter((item) => {
              return /^[a-zA-Z\s+]+$/.test(item.title);
            });
          }
          filtered = numericFiltered.concat(letterFiltered);
        }

        console.log('new filter', filtered);
        return filtered;
      }
    }
  }
</script>
