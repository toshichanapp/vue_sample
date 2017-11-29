<template lang="pug">
  div
    button(@click='showModal = true') モーダル表示
    modal-body(v-show='showModal' @close='showModal = false')
</template>
<script>
  import ModalBody from "./ModalBody.vue";
  export default {
    components: {
      ModalBody
    },
    data(){
      return {
        showModal: false
      }
    }
  }
</script>
