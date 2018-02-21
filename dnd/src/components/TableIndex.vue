<template lang="pug">
  .table-responsive(draggable="true" @dragstart="onDragStart" @dragend = "dragEnd")
    table.table.table-bordered.table-striped.mb-3.small
      thead
        tr
          th(scope="col") Component
      tbody
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="1")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="2")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="3")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="4")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="5")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="6")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="7")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="8")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="9")
              | Component
        tr
          td.align-middle.p-0
            a(href="project-show.html")
              img.mr-3(data-src="holder.js/80x60?theme=noimage" width="80" height="60" alt="10")
              | Component
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
<style>
</style>
