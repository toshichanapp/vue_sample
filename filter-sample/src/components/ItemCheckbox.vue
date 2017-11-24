<template lang="pug">
#add-org.modal.fade aria-hidden="true"
  .modal-dialog
    .modal-content
      .modal-header 組織追加
      .modal-body
        .mb-3
          .input-group
            input.form-control(type="search", placeholder="Search...", @input="onInput({ name: $event.target.value })")
        .form-checkbox.mb-0(v-for="item in items", :key="item.id")
          label.custom-control.custom-checkbox
            input.custom-control-input(type="checkbox", :value="item.id", name="group[item_ids][]")
            span.custom-control-indicator
            span.custom-control-description {{item.name}}
</template>
<script>
  import { mapActions } from 'vuex'
  export default{
    props: ['items', 'name'],
    methods: mapActions({
      onInput: 'filterItems'
    })
  }
</script>
