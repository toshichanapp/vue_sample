<template>
  <li class="dropdown-child">
    <label >
      <input type="checkbox" :name="item.id" :value="item.name" :checked="isActive()" @change="emitChange" >
      <span>{{ item.name }}</span>
    </label>
  </li>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['item', 'changed'],
    computed: mapGetters({
      activeFilters: 'getActiveFilters'
    }),
    methods: {
      isActive() {
        return this.activeFilters.indexOf(this.item.name) != -1;
      },
      emitChange() {
        this.$emit('changed', {
          item: this.item,
          checkState: !this.isActive() // toggle current checkState
        });
      }
    }
  }
</script>
