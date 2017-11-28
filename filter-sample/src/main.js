import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

new Vue({
  el: '#app',
  created: function() {
    store.state.items = [{"id":1,"name":"synapz","size":40},
                        {"id":51,"name":"鷹の爪団","size":0},
                        {"id":52,"name":"秘密結社","size":2},
                        {"id":53,"name":"宇宙忍者","size":1},
                        {"id":54,"name":"富士急行","size":1},
                        {"id":55,"name":"オリジン電気","size":0}],
    store.state.columns = ['名前','メンバ']
  },
  render: h => h(App)
})
