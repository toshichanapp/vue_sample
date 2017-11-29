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
    input-image
    modal
    button(@click='showModalTypeA') showModalTypeA
    button(@click='showModalTypeB') showModalTypeB
    multi-modal-view
</template>

<script>
  import store from './vuex/store'
  import { mapActions } from 'vuex'
  import ItemCheckbox from './components/ItemCheckbox'
  import OutputTable from './components/OutputTable'
  import InputImage from './components/DDInputImage'
  import Modal from './components/Modal'
  import MultiModalView from './components/MultiModalView.vue'

  export default {
    store,
    components: {
      ItemCheckbox,
      OutputTable,
      InputImage,
      Modal,
      MultiModalView
    },
    methods: {
      ...mapActions('multiModal', ['showModalTypeA', 'showModalTypeB'])
    }
  }
</script>

<style>
</style>
