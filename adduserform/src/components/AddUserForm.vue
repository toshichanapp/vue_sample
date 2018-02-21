<template lang="pug">
  .form-group
    label.col-form-label ユーザ
      .badge.badge-secondary 任意
    .form-control-plaintext.pt-0
      .btn.btn-secondary(data-target="#add-user" data-toggle="modal" type="btn")
        i.fa.fa-fw.fa-plus-circle(aria-hidden="true")
        | ユーザ追加
    #add-user.modal.fade(aria-hidden="true" ref="vuemodal")
      .modal-dialog
        .modal-content
          .modal-header ユーザ追加
          .modal-body
            ul.list-unstyled
              li(v-for="org in orgs")
                .custom-control.custom-checkbox
                  input.custom-control-input(type="checkbox", :id="org.name",:value="org.user_ids", :data-org="org.name", @change="addUsers(org.name, org.user_ids)")
                  label.custom-control-label(:for="org.name") {{org.name}}
                  .custom-control.custom-checkbox(v-for="user in org.users")
                    input.custom-control-input(type="checkbox", name= "users", :id="user.id", :value="user.id", v-model="localCheck", :data-belong="org.name", @change="switchCheck(org.name)")
                    label.custom-control-label(:for="user.id") {{user.name}}
                      span.x-small.text-muted {{user.admin_flag ? '管理者' : '一般'}}
            hr
            .form-row
              .col-6.col-sm-4.ml-auto
                .btn.btn-secondary.btn-block(data-dismiss="modal", @click="rollBack()") キャンセル
              .col-6.col-sm-4.mr-auto
                .btn.btn-primary.btn-block(data-dismiss="modal", @click="emitChangeSelects({value: localCheck})") 追加
    .table-responsive.mb-0(v-if="currentChecked.length > 0")
      table.table.table-bordered.table-striped.small.mb-0
        thead
          tr
            th(scope="col" v-for="name in columns")
              | {{name}}
            th.col-delete(scope="col")
        tbody
          tr(v-for="(checkedItem,index) in currentChecked")
            template(v-for="user in users" v-if="user.id == checkedItem")
              td {{ user.name }}
              td {{ user.authority_name }}
              td {{ user.organization_name }}
              td {{ user.role_name }}
              td.text-danger(style="cursor:pointer" @click="removeCheck(index) + emitChangeSelects({value: localCheck})")
                i.fa.fa-fw.fa-times(aria-hidden="true")
                | 削除
</template>
<script>
  import axios from 'axios';
  import store from '../vuex/store'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        orgs: [],
        columns: [],
        query: "",
        localCheck: [],
        users: []
      }
    },
    store,
    computed: {
      ...mapGetters({
        currentChecked: 'getCurrentUserChecked'
      })
    },
    methods: {
      ...mapActions({
        emitChangeSelects: 'emitChangeSelectsUser',
        removeItem: 'removeUserItem'
      }),
      rollBack(){
        this.localCheck = Object.assign([], this.currentChecked)
      },
      removeCheck(index){
        this.localCheck.splice(index, 1);
      },
      addUsers: function(org_name, user_ids){
        let value = document.querySelectorAll(`[data-org=${org_name}]`)[0].checked;
        if(value){
          for(let i =0; i < user_ids.length; i++){
            if(this.localCheck.indexOf(String(user_ids[i])) == -1){
              this.localCheck.push(String(user_ids[i]));
            }
          }
        }
        else{
          for(let i =0; i < user_ids.length; i++){
            let index = this.localCheck.indexOf(user_ids[i]);
            this.localCheck.splice(index, 1);
          }
        }
      },
      switchCheck: function(org_name){
        let userChecks = document.querySelectorAll(`[data-belong=${org_name}]`);
        let checksCount = 0;
        for(let i =0; i < userChecks.length; i++){
          if(userChecks[i].checked == false){
            document.querySelectorAll(`[data-org=${org_name}]`)[0].checked = false;
          }else{
            checksCount += 1;
            if(checksCount == userChecks.length){
              document.querySelectorAll(`[data-org=${org_name}]`)[0].checked = true;
            }
          }
        }
      }
    },
    created() {
      var userColumns = ['メンバ','権限','組織','ロ-ル']
      axios.get('../api/organizations.json')
      .then(response=>{
        this.orgs = Object.assign([], response.data)
      });
      axios.get('../api/users.json')
      .then(response=>{
        this.users = Object.assign([], response.data)
      });
      this.columns = Object.assign([], userColumns)
      this.localCheck = store.state.currentUserChecked
    },
    mounted() {
      $(this.$refs.vuemodal).on("hidden.bs.modal", this.rollBack)
    }
  }
</script>
