<template lang="pug">
  #user
    .form-group
      label.col-form-label ユーザ
        .badge.badge-secondary 任意
      .form-control-plaintext.pt-0
        button.btn.btn-secondary(data-target="#add-user" data-toggle="modal" type="btn" @click='toggleModal()')
          i.fa.fa-fw.fa-plus-circle(aria-hidden="true")
          | ユーザ追加
      #add-user.modal.fade(aria-hidden="true" @click=" toggleModal()" ref="vuemodal")
        .modal-dialog
          .modal-content
            .modal-header ユーザ追加
            .modal-body
              .mb-3
                .input-group
                  input.form-control(type="search", placeholder="Search...", v-model="query")
              .form-checkbox.mb-0(v-for="item in filteredItems", :key="item.id")
                label.custom-control.custom-checkbox
                  input.custom-control-input(type="checkbox",
                     :value="item.id", v-model="localCheck")
                  span.custom-control-indicator
                  span.custom-control-description {{item.name}}
              hr
              .form-row
                .col-6.col-sm-4.ml-auto
                  button.btn.btn-secondary.btn-block(data-dismiss="modal", @click="rollBack() + toggleModal()") キャンセル
                .col-6.col-sm-4.mr-auto
                  button.btn.btn-primary.btn-block(data-dismiss="modal", @click="emitChangeSelects()") 追加
      .table-responsive.mb-0(v-if="currentChecked.length > 0")
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
                td {{ item.authority_name }}
                td {{ item.organization_name }}
                td {{ item.role_name }}
                td.text-danger(style="cursor:pointer" @click="removeCheck(index)")
                  i.fa.fa-fw.fa-times(aria-hidden="true")
                  | 削除
</template>
<script>
  import store from '../vuex/store'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    store,
    data() {
      return {
        items: [],
        columns: [],
        query: "",
        localCheck: [],
        currentChecked: [],
        showModal: false
      }
    },
    created() {
      var userItems = [{"id":1,"authority_name":"管理者","name":"admin_synapz","role_name":"designer","organization_id":1,"organization_name":"synapz"},
      {"id":32,"authority_name":"一般","name":"古賀こころ","role_name":"designer","organization_id":53,"organization_name":"宇宙忍者"},
      {"id":33,"authority_name":"一般","name":"前田 はるか","role_name":"engineer","organization_id":58,"organization_name":"京都ホテル"}]
      var userColumns = ['メンバ','権限','組織','ロール']
      this.items = Object.assign([], userItems)
      this.columns = Object.assign([], userColumns)
    },
    computed: {
      filteredItems: function() {
        return this.items.filter(function(item) {
          return item.name.indexOf(this.query) > -1
        }, this)
      }
    },
    methods: {
      toggleModal(){
        this.showModal = !this.showModal
      },
      emitChangeSelects(){
        this.currentChecked = Object.assign([], this.localCheck)
      },
      rollBack(){
        this.localCheck = Object.assign([], this.currentChecked)
      },
      removeCheck(index){
        this.localCheck.splice(index, 1);
        this.currentChecked.splice(index, 1);
      }
    },
    mounted() {
      $(this.$refs.vuemodal).on("hidden.bs.modal", this.rollBack)
    }
  }
</script>
