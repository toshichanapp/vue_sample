<template lang="pug">
  #add-org.modal.fade(aria-hidden="true")
    .modal-dialog
      .modal-content
        .modal-header 組織追加
        .modal-body
          .mb-3
            .input-group
              input.form-control(type="search", placeholder="Search...", v-model="query")
          .form-checkbox.mb-0(v-for="item in filteredItems", :key="item.id")
            label.custom-control.custom-checkbox
              input.custom-control-input(type="checkbox",
                 :value="item.id", name="group[item_ids][]", v-model="checkedItems")
              span.custom-control-indicator
              span.custom-control-description {{item.name}}
          hr
          .form-row
            .col-6.col-sm-4.ml-auto
              button.btn.btn-secondary.btn-block(data-dismiss="modal") キャンセル
            .col-6.col-sm-4.mr-auto
              button.btn.btn-primary.btn-block(data-dismiss="modal", @click="emitChangeSelects({ value: checkedItems })") 追加
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  export default{
    data() {
      return {
        query: "",
        checkedItems: []
      }
    },
    computed: {
      ...mapState(['items']),
      filteredItems: function() {
        return this.items.filter(function(item) {
          return item.name.indexOf(this.query) > -1
        }, this)
      }
    },
    methods: mapActions({
      emitChangeSelects: 'emitChangeSelects'
    })
  }
</script>
