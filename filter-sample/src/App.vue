<template lang="pug">
  #app
    .form-group
      label.col-form-label 組織
        .badge.badge-secondary 任意
      .form-control-plaintext.pt-0
        button.btn.btn-secondary(data-target="#add-org" data-toggle="modal" type="btn")
          i.fa.fa-fw.fa-plus-circle(aria-hidden="true")
          | 組織追加
      item-checkbox
      output-table
</template>

<script>
  import store from './vuex/store'
  import { mapGetters } from 'vuex'
  import ItemCheckbox from './components/ItemCheckbox'
  import OutputTable from './components/OutputTable'

  export default {
    store,
    components: {
      ItemCheckbox,
      OutputTable
    }
  }
</script>

<style>
</style>
