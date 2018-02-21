<template lang="pug">
  nav.mx-auto(draggable="true" @dragstart="onDragStart" @dragend = "dragEnd")
    ul.pagination.justify-content-center.mb-0
      li.page-item.disabled
        a.page-link(href="#")
          i.fa.fa-fw.fa-angle-double-left(aria-hidden="true")
          .sr-only 前へ
      li.page-item.active
        a.page-link(href="#") 1
      li.page-item
        a.page-link(href="#") 2
      li.page-item
        a.page-link(href="#") 3
      li.page-item
        a.page-link(href="#") 4
      li.page-item
        a.page-link(href="#") 5
      li.page-item
        a.page-link(href="#")
          i.fa.fa-fw.fa-angle-double-right(aria-hidden="true")
          .sr-only 次へ
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
