<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <filter-item v-for="checkItem in filterOptions" :item="checkItem" @changed="changedFilter"
      :key="checkItem.id"></filter-item>
    </ul>
  </div>
</template>
<script>
  import filterItem from './filterItem'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        filterOptions: [{ id: 0, name: 'all', checked: false},
                        { id: 1, name: 'numeric', checked: false},
                        { id: 2, name: 'letters', checked: false}]
      };
    },
    components: {
      filterItem: filterItem
    },
    methods: mapActions({
      changedFilter: 'changedFilter'
    })
  }
</script>
