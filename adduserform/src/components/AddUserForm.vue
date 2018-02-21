<template lang="pug">
  .form-group
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
      this.orgs = [{"id":1,"name":"synapz","users":[{"id":1,"role_id":4,"organization_id":1,"name":"admin_synapz","email":"admin@synapz.jp","password_digest":"$2a$10$hVSjak4rmvZLZ5eE/KZL2OZ558o18fgseEC0LkWJSuh8/bHkguEWy","admin_flag":true,"remember_digest":null,"reset_digest":"$2a$10$M1EtVz5PP89edWe58QV.CeMEeizsCXkVNqV6k10l06QD70vOVe6v.","reset_sent_at":"2017-11-14T11:36:05.000+09:00","reseted_flag":true,"activation_digest":null,"activate_sent_at":null,"activated":true,"activated_at":"2017-10-24T05:28:31.000+09:00","created_at":"2017-10-20T10:43:23.000+09:00","updated_at":"2017-11-14T12:09:17.000+09:00"},{"id":80,"role_id":1,"organization_id":1,"name":"西森 海斗","email":"tcollins@kare.mil","password_digest":"$2a$10$1VtGiDlDQ7PL97X3swrqx.t7FMta55xZrIwC6BWrLzh5BSYvfYNzy","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$WratITg7kEpHT6YNjJyAE.6B/KA4ezYKjJz5yrr4dckEhOQGA.YRa","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:43.000+09:00","updated_at":"2017-10-27T19:54:43.000+09:00"},{"id":82,"role_id":4,"organization_id":1,"name":"伊藤 翼","email":"jlawson@dabtype.net","password_digest":"$2a$10$hzoSDNfV/dfMonn2cy3PhusPDyR3w7Hck98dJmcUQM2RtMFoJoD1q","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$bNMZSqcn85yt0uwRTYh72./VuwKlvjjX87IzHEnQJJEw4TJkhQwkO","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:44.000+09:00","updated_at":"2017-10-27T19:54:44.000+09:00"},{"id":84,"role_id":4,"organization_id":1,"name":"相田 和希","email":"agarcia@camimbo.com","password_digest":"$2a$10$zq3jk2m9fzlCuq3YUjA72u2GMTkCP91LORYjfORcDHfpnBhGpudRW","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$Q09YtRbRImNwAHgoqhWtJejF7Dnq8k5KL0vVwJJkmw1sQzpsuA8xK","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:44.000+09:00","updated_at":"2017-10-27T19:54:44.000+09:00"},{"id":86,"role_id":3,"organization_id":1,"name":"高嶺 彩夏","email":"dbaker@quaxo.org","password_digest":"$2a$10$WS0DpJs3tXVgtUsGrhZ/WuduNClLPhA9BgltS5oruOUCdOwU.mjnK","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$Trdvv8EDMM5/wrGdWQfoUuO24voUrayS52hHv8Ma.bV.sUnle32Iy","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:44.000+09:00","updated_at":"2017-10-27T19:54:44.000+09:00"}],"user_ids":[1,80,82,84,86],"size":5},{"id":52,"name":"秘密結社","users":[{"id":34,"role_id":3,"organization_id":52,"name":"荒井 陽輝","email":"jmurphy@voonyx.com","password_digest":"$2a$10$FVoFneAtHOmLZiMDnqaHuOOmlbsqtlLpdAC9Jc5jOMHFC6NHv1PiW","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$1C9nCDJSzzpxvKFDDLHkjOLH1A5t29k6fURCKsdvISrLuVKVYsr2W","activate_sent_at":null,"activated":true,"activated_at":"2017-10-24T05:28:31.000+09:00","created_at":"2017-10-23T10:37:24.000+09:00","updated_at":"2017-10-24T00:41:38.000+09:00"},{"id":40,"role_id":2,"organization_id":52,"name":"古賀 千晶","email":"jmoore@zoombeat.mil","password_digest":"$2a$10$WyoHr39D49hPnkExCQiWh.DGtqC4FS9wuiRmOKJSBkTD8vV3sJ2KC","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$6eBIU7JIxxPjLyFxYccZ/uS7O67xLOEsKt3PsknNu82hx.pGlDUp2","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-23T10:37:25.000+09:00","updated_at":"2017-10-23T10:37:25.000+09:00"},{"id":89,"role_id":1,"organization_id":52,"name":"toshi","email":"toshichan@synapz.jp","password_digest":"$2a$10$R3r5c793EzH1eqZKBtlvIe2E6as64RIOKkPSf2Egcoa7Hubfxn56i","admin_flag":false,"remember_digest":null,"reset_digest":"$2a$10$IAhLcIFTHMkcTx/n4HBjN.BAtFCpXqypdC4IPhDzigooJfSSpxymu","reset_sent_at":"2018-02-02T18:05:58.000+09:00","reseted_flag":true,"activation_digest":"$2a$10$k9f5UfSWj/7Odrfwq1.ACu5aG.MWcmG3.hpCl/1US6aSQxtcLq9QW","activate_sent_at":"2018-01-19T15:32:57.000+09:00","activated":true,"activated_at":"2018-01-19T15:33:46.000+09:00","created_at":"2018-01-19T15:32:57.000+09:00","updated_at":"2018-02-02T18:06:33.000+09:00"}],"user_ids":[34,40,89],"size":3},{"id":53,"name":"宇宙忍者","users":[{"id":32,"role_id":4,"organization_id":53,"name":"古賀こころ","email":"mwright@voolith.name","password_digest":"$2a$10$kfpJLnZegcJ2VKB2GjffFu7IThXy9oDPt6BkIf3VhcqZJ5DxVqF5i","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$16Pw6fcRsd//k.YKs7t3weSXk6MkG12523ukQkAeOWRMVzGq0UB1W","activate_sent_at":null,"activated":true,"activated_at":"2017-10-24T05:28:31.000+09:00","created_at":"2017-10-23T10:37:24.000+09:00","updated_at":"2017-10-26T13:31:42.000+09:00"},{"id":39,"role_id":4,"organization_id":53,"name":"安藤 実咲","email":"cchapman@browsezoom.net","password_digest":"$2a$10$4xGAya03S.TVdWeH2rYfHO.N4JNsC4wIc49l9I2.JZFSuEI0lXhQu","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$BIo3I7TJaCKmukbjb0yaAeN6WDkZ4xqmL4WTn4BrHOBKXvD6YsZ2C","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-23T10:37:25.000+09:00","updated_at":"2018-02-21T15:50:38.000+09:00"},{"id":41,"role_id":2,"organization_id":53,"name":"古閑 愛菜","email":"bperkins@browseblab.com","password_digest":"$2a$10$0AdIXJnD7l7ww7jrhLVPpOVEX1c1JdhEslJweQb60JvhZQCGGMJxi","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$4iBBmTZCe8lTMzUpTNy6auuBsS/kSSGLwlEheerzEHEi5UtEKANTW","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-23T10:37:25.000+09:00","updated_at":"2018-02-21T15:50:38.000+09:00"}],"user_ids":[32,39,41],"size":3},{"id":64,"name":"NTT西","users":[{"id":33,"role_id":3,"organization_id":64,"name":"前田 はるか","email":"jmiller@jetpulse.go","password_digest":"$2a$10$fzGMa59/eejCDQpYIgdQtuxgCq4WIajE2IbcikDDCpQZfQiUd.JAe","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$gIRNBYT1Pkf5WoAgozR/9.jZUwHpKKBI7jTFn8qGJe9tKFXPd2DQu","activate_sent_at":null,"activated":true,"activated_at":"2017-10-24T05:28:31.000+09:00","created_at":"2017-10-23T10:37:24.000+09:00","updated_at":"2018-02-21T15:50:25.000+09:00"},{"id":36,"role_id":3,"organization_id":64,"name":"吉田 祐子","email":"dkim@edgeblab.com","password_digest":"$2a$10$LWv0GNZjlfGymrTAU76obe8puiVVtOYQO6QPLJYHnmY3FYQbL5BT2","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$aYRnW9V25LNgvkktBThKqeYGGQq1cQfcDy54kWLcGddBKSFXHIkc6","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-23T10:37:24.000+09:00","updated_at":"2017-12-28T14:01:44.000+09:00"},{"id":77,"role_id":1,"organization_id":64,"name":"test","email":"test@test.jp","password_digest":"$2a$10$5gko5g3wJCcin32LSKOZ9eJTuaEiJps2bFxXLLnn8sY4MKOornYYi","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$X2o2Pmf4DhXj4C/Nyyt1x.8tmgf7RTdcI1Y1ognQpYOIaH1k7LnIK","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T11:50:23.000+09:00","updated_at":"2017-12-28T17:17:07.000+09:00"},{"id":81,"role_id":3,"organization_id":64,"name":"中村 愛菜","email":"rlong@wikido.edu","password_digest":"$2a$10$lj7N8dI3oqPBcdcQWEvr9.b5ETYnrR7aNg4/HhErErOSwnD/qTSx.","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$8Vqw1Gn8nbGN9uXeObN5ZugTUw7ptCthjL98xGkWB./oPTF3si.Rm","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:44.000+09:00","updated_at":"2018-02-21T15:50:25.000+09:00"},{"id":85,"role_id":1,"organization_id":64,"name":"中村 天音","email":"dnichols@yabox.com","password_digest":"$2a$10$Ti36INhU8pwWkUwwOdlV9.dqcQZaYePtLa8DVxZFX4wOlwCRv2gOy","admin_flag":false,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$uNrnf1Vu/x6xmI0j8YcLgOFwdST4F7tnc.6VG3zb8FRFTURiuPFBG","activate_sent_at":null,"activated":false,"activated_at":null,"created_at":"2017-10-27T19:54:44.000+09:00","updated_at":"2018-02-21T15:50:25.000+09:00"},{"id":88,"role_id":1,"organization_id":64,"name":"fdsa","email":"dfsd@fsd.jo","password_digest":"$2a$10$qZG0FMH7iHw4migX64CDX..H1qKIH/qgN2UWsbkdWHdv0R6SIHIgi","admin_flag":true,"remember_digest":null,"reset_digest":null,"reset_sent_at":null,"reseted_flag":false,"activation_digest":"$2a$10$KWMp7kbhwIa7oScE84VX5e7uwoUxEFnnT6BDg1Q0iLvUs21eADhqa","activate_sent_at":"2018-01-11T14:08:12.000+09:00","activated":false,"activated_at":null,"created_at":"2018-01-11T14:08:12.000+09:00","updated_at":"2018-02-21T15:50:25.000+09:00"}],"user_ids":[33,36,77,81,85,88],"size":6}]
      this.users = [{"id":1,"authority_name":"管理者","name":"admin_synapz","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":32,"authority_name":"一般","name":"古賀こころ","role_name":"designer","organization_id":53,"organization_name":"宇宙忍者"},{"id":33,"authority_name":"一般","name":"前田 はるか","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":34,"authority_name":"一般","name":"荒井 陽輝","role_name":"engineer","organization_id":52,"organization_name":"秘密結社"},{"id":35,"authority_name":"一般","name":"池田 尚太","role_name":"director","organization_id":null,"organization_name":""},{"id":36,"authority_name":"一般","name":"吉田 祐子","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":38,"authority_name":"一般","name":"宮里 優人","role_name":"designer","organization_id":null,"organization_name":""},{"id":39,"authority_name":"一般","name":"安藤 実咲","role_name":"designer","organization_id":53,"organization_name":"宇宙忍者"},{"id":40,"authority_name":"一般","name":"古賀 千晶","role_name":"director","organization_id":52,"organization_name":"秘密結社"},{"id":41,"authority_name":"一般","name":"古閑 愛菜","role_name":"director","organization_id":53,"organization_name":"宇宙忍者"},{"id":77,"authority_name":"一般","name":"test","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":78,"authority_name":"一般","name":"斎藤 駿","role_name":"designer","organization_id":null,"organization_name":""},{"id":79,"authority_name":"一般","name":"近藤 秀樹","role_name":"designer","organization_id":null,"organization_name":""},{"id":80,"authority_name":"一般","name":"西森 海斗","role_name":"reviewer","organization_id":1,"organization_name":"synapz"},{"id":81,"authority_name":"一般","name":"中村 愛菜","role_name":"engineer","organization_id":64,"organization_name":"NTT西"},{"id":82,"authority_name":"一般","name":"伊藤 翼","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":83,"authority_name":"一般","name":"玉城 朱里","role_name":"engineer","organization_id":null,"organization_name":""},{"id":84,"authority_name":"一般","name":"相田 和希","role_name":"designer","organization_id":1,"organization_name":"synapz"},{"id":85,"authority_name":"一般","name":"中村 天音","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":86,"authority_name":"一般","name":"高嶺 彩夏","role_name":"engineer","organization_id":1,"organization_name":"synapz"},{"id":87,"authority_name":"一般","name":"橋本 一樹","role_name":"director","organization_id":null,"organization_name":""},{"id":88,"authority_name":"管理者","name":"fdsa","role_name":"reviewer","organization_id":64,"organization_name":"NTT西"},{"id":89,"authority_name":"一般","name":"toshi","role_name":"reviewer","organization_id":52,"organization_name":"秘密結社"}]
      this.columns = Object.assign([], userColumns)
      this.localCheck = store.state.currentUserChecked
    },
    mounted() {
      $(this.$refs.vuemodal).on("hidden.bs.modal", this.rollBack)
    }
  }
</script>
<style lang="scss">
  @import "../assets/stylesheets/application";
</style>
