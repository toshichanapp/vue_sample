<template>
  <div id="app">
    <item-checkbox :items="items"></item-checkbox>
  </div>
</template>

<script>
import store from './vuex/store'
import { mapGetters } from 'vuex'
import ItemCheckbox from './components/ItemCheckbox'

export default {
  store,
  components: {
    ItemCheckbox
  },
  computed: mapGetters({
    items: 'getItems'
  })
}
</script>

<style>
</style>
