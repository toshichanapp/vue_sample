<template lang="pug">
#add-org.modal.fade aria-hidden="true"
  .modal-dialog
    .modal-content
      .modal-header 組織追加
      .modal-body
        .mb-3
          .input-group
            input.form-control(type="search", placeholder="Search...", v-model="query")
        .form-checkbox.mb-0(v-for="item in filteredItems", :key="item.id")
          label.custom-control.custom-checkbox
            input.custom-control-input(type="checkbox", :value="item.id", name="group[item_ids][]")
            span.custom-control-indicator
            span.custom-control-description {{item.name}}
</template>
<script>
  import { mapState } from 'vuex'
  export default{
    props: ['name'],
    data() {
      return {
          query: ""
      }
    },
    computed: {
      ...mapState(['items']),
      filteredItems: function() {
        return this.items.filter(function(item) {
          return item.name.indexOf(this.query) > -1
        }, this)
      }
    }
  }
</script>
