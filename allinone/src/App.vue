<template lang="pug">
  #app
    allin-one
</template>

<script>
  import store from './vuex/store'
  import { mapGetters } from 'vuex'
  import ItemCheckbox from './components/ItemCheckbox'
  import OutputTable from './components/OutputTable'
  import AllinOne from './components/AllinOne'

  export default {
    store,
    components: {
      ItemCheckbox,
      OutputTable,
      AllinOne
    }
  }
</script>

<style>
</style>
