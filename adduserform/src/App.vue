<template>
  <addUserForm/>
</template>

<script>
import addUserForm from './components/AddUserForm'
import store from './vuex/store'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
</style>
