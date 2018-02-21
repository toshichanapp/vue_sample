<template lang="pug">
  .input-group.mb-3(draggable="true" @dragstart="onDragStart" @dragend = "dragEnd")
    input.form-control(type="search" placeholder="Search...")
    .input-group-btn
      button.btn.btn-primary(type="button")
        i.fa.fa-fw.fa-search(aria-hidden="true")
        .sr-only 検索
</template>
<script>
import DnD from '../mixins/drag_item'
export default {
  mixins: [DnD],
  data () {
    return {

    }
  }
}
</script>
