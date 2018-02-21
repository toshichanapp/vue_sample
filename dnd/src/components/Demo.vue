<template lang="pug">
  div
    Search#search
    Tableindex#Tableindex
    Pagenation#Pagenation
</template>
<script>
  import Pagenation from './Pagenation.vue'
  import Search from './Search.vue'
  import Tableindex from './Tableindex.vue'
  import DnD from '../mixins/drag_item'
  export default {
    components: {
      Pagenation,
      Search,
      Tableindex
    }
  }
</script>
<style>
</style>
