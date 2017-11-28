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
                 :value="item.id", name="group[item_ids][]" v-model="localCheck")
              span.custom-control-indicator
              span.custom-control-description {{item.name}}
          hr
          .form-row
            .col-6.col-sm-4.ml-auto
              button.btn.btn-secondary.btn-block(data-dismiss="modal", @click="rollBack()") キャンセル
            .col-6.col-sm-4.mr-auto
              button.btn.btn-primary.btn-block(data-dismiss="modal", @click="emitChangeSelects({ value: localCheck })") 追加
</template>
<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default{
    data() {
      return {
        query: "",
        localCheck: []
      }
    },
    computed: {
      ...mapState(['items','currentChecked']),
      filteredItems: function() {
        return this.items.filter(function(item) {
          return item.name.indexOf(this.query) > -1
        }, this)
      }
    },
    methods: {
      ...mapActions({
        emitChangeSelects: 'emitChangeSelects',
        cancelChangeSelects: 'cancelChangeSelects'
      }),
      rollBack(){
        this.localCheck = Object.assign([], this.currentChecked)
        cancelChangeSelects({ value: currentChecked })
      }
    }
  }
</script>
