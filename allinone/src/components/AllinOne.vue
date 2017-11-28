<template lang="pug">
  #app
    .form-group
      label.col-form-label 組織
        .badge.badge-secondary 任意
      .form-control-plaintext.pt-0
        button.btn.btn-secondary(data-target="#add-org" data-toggle="modal" type="btn")
          i.fa.fa-fw.fa-plus-circle(aria-hidden="true")
          | 組織追加
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
      #org-table.table-responsive.mb-0(v-if="currentChecked.length > 0")
        table.table.table-bordered.table-striped.small.mb-0
          thead
            tr
              th(scope="col" v-for="name in columns")
                | {{name}}
              th.col-delete(scope="col")
          tbody
            tr(v-for="(checkedItem,index) in currentChecked")
              template(v-for="item in items" v-if="item.id == checkedItem")
                td {{ item.name }}
                td {{ item.size }}
                td.text-danger(style="cursor:pointer" @click="removeCheck(index) + removeItem({value: index}) ")
                  i.fa.fa-fw.fa-times(aria-hidden="true")
                  | 削除
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        query: "",
        localCheck: []
      }
    },
    computed: {
      ...mapGetters({
        columns: 'getColumns',
        currentChecked: 'getCurrentChecked',
        items: 'getItems'
      }),
      filteredItems: function() {
        return this.items.filter(function(item) {
          return item.name.indexOf(this.query) > -1
        }, this)
      }
    },
    methods: {
      ...mapActions({
        emitChangeSelects: 'emitChangeSelects',
        removeItem: 'removeItem'
      }),
      rollBack(){
        this.localCheck = Object.assign([], this.currentChecked)
      },
      removeCheck(index){
        this.localCheck.splice(index, 1);
      }
    }
  }
</script>
