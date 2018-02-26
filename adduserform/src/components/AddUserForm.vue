<template lang="pug">
  .form-group
    .modal-dialog
        .modal-content
          .modal-header ユーザ追加
          .modal-body
            ul.list-unstyled
              li(v-for="org in orgs")
                .custom-control.custom-checkbox
                  input.custom-control-input(type="checkbox", :id="org.name",:value="org.id", v-model="orgCheck",:data-org="org.name", @change="addUsers(org.name, org.user_ids)")
                  label.custom-control-label(:for="org.name") {{org.name}}
                  .custom-control.custom-checkbox(v-for="user in org.users")
                    input.custom-control-input(type="checkbox", name= "users", :id="user.id", :value="user.id", v-model="localCheck", :data-belong="org.name", @change="switchCheck(org.id, org.name)")
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
  import store from '../vuex/store'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        orgs: [],
        columns: [],
        orgCheck: [],
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
        if(this.localCheck.length == 0){
          this.localCheck = Object.assign([], user_ids);
        }
        const isChecked = document.querySelectorAll(`[data-org=${org_name}]`)[0].checked;
        if(isChecked){
          for(let i =0; i < user_ids.length; i++){
            if(!this.localCheck.includes(user_ids[i])){
              this.localCheck.push(user_ids[i]);
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
      switchCheck: function(org_id, org_name){
        const userChecks = document.querySelectorAll(`[data-belong=${org_name}]`);
        const userChecked = document.querySelectorAll(`[data-belong=${org_name}]:checked`);
        if(userChecks.length == userChecked.length){
          this.orgCheck.push(org_id);
        }else{
          const index = this.orgCheck.indexOf(org_id)
          if(index != -1){
            this.orgCheck.splice(index, 1);
          }
        }
      }
    },
    created() {
      var userColumns = ['メンバ','権限','組織','ロ-ル']
      this.orgs = [{"id":52,"name":"秘密結社","users":[{"id":34,"name":"荒井 陽輝","admin_flag":false},{"id":40,"name":"古賀 千晶","admin_flag":false},{"id":89,"name":"toshi","admin_flag":false}],"user_ids":[34,40,89],"size":3},{"id":53,"name":"宇宙忍者","users":[{"id":32,"name":"古賀こころ","admin_flag":false},{"id":39,"name":"安藤 実咲","admin_flag":false},{"id":41,"name":"古閑 愛菜","admin_flag":false}],"user_ids":[32,39,41],"size":3},{"id":64,"name":"NTT西","users":[{"id":33,"name":"前田 はるか","admin_flag":false},{"id":36,"name":"吉田 祐子","admin_flag":false},{"id":77,"name":"test","admin_flag":false},{"id":81,"name":"中村 愛菜","admin_flag":false},{"id":85,"name":"中村 天音","admin_flag":false},{"id":88,"name":"fdsa","admin_flag":true}],"user_ids":[33,36,77,81,85,88],"size":6}]
      this.users = [{"id":1,"authority_name":"管理者","name":"admin_synapz","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":32,"authority_name":"一般","name":"古賀こころ","role_name":"designer","organization_id":53,"organization_name":"宇宙忍者"},{"id":33,"authority_name":"一般","name":"前田 はるか","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":34,"authority_name":"一般","name":"荒井 陽輝","role_name":"engineer","organization_id":52,"organization_name":"秘密結社"},{"id":35,"authority_name":"一般","name":"池田 尚太","role_name":"director","organization_id":null,"organization_name":""},{"id":36,"authority_name":"一般","name":"吉田 祐子","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":38,"authority_name":"一般","name":"宮里 優人","role_name":"designer","organization_id":null,"organization_name":""},{"id":39,"authority_name":"一般","name":"安藤 実咲","role_name":"designer","organization_id":53,"organization_name":"宇宙忍者"},{"id":40,"authority_name":"一般","name":"古賀 千晶","role_name":"director","organization_id":52,"organization_name":"秘密結社"},{"id":41,"authority_name":"一般","name":"古閑 愛菜","role_name":"director","organization_id":53,"organization_name":"宇宙忍者"},{"id":77,"authority_name":"一般","name":"test","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":78,"authority_name":"一般","name":"斎藤 駿","role_name":"designer","organization_id":null,"organization_name":""},{"id":79,"authority_name":"一般","name":"近藤 秀樹","role_name":"designer","organization_id":null,"organization_name":""},{"id":80,"authority_name":"一般","name":"西森 海斗","role_name":"reviewer","organization_id":1,"organization_name":"synapz"},{"id":81,"authority_name":"一般","name":"中村 愛菜","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":82,"authority_name":"一般","name":"伊藤 翼","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":83,"authority_name":"一般","name":"玉城 朱里","role_name":"engineer","organization_id":null,"organization_name":""},{"id":84,"authority_name":"一般","name":"相田 和希","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":85,"authority_name":"一般","name":"中村 天音","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":86,"authority_name":"一般","name":"高嶺 彩夏","role_name":"engineer","organization_id":1,"organization_name":"synapz"},{"id":87,"authority_name":"一般","name":"橋本 一樹","role_name":"director","organization_id":null,"organization_name":""},{"id":88,"authority_name":"管理者","name":"fdsa","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":89,"authority_name":"一般","name":"toshi","role_name":"reviewer","organization_id":52,"organization_name":"秘密結社"}]
      this.columns = Object.assign([], userColumns)
      this.localCheck = this.$store.state.currentUserChecked
      const users = this.users
      const localCheck = this.localCheck
      const org_ids = this.orgs.map(function(org){return org.id});
      let no_org = [];
      org_ids.forEach(function(org_id){
        const org_users = users.filter(function(user){return user.organization_id == org_id});
        const o_user_ids = org_users.map(function(user){return user.id});
        let has_all_member = true;
        for(let i = 0; i < o_user_ids.length; i++){
          if(!localCheck.includes(o_user_ids[i])){
            has_all_member = false;
            break;
          }
        }
        if(has_all_member){
          no_org.push(org_id);
        }
      });
      this.orgCheck = Object.assign([], no_org);
    },
    mounted() {
      $(this.$refs.vuemodal).on("hidden.bs.modal", this.rollBack)
    }
  }
</script>
<style lang="scss">
  @import "../assets/stylesheets/application";
</style>
