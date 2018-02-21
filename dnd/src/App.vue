<template lang="pug">
  #app
    .container
      .row
        .col-md-2
          Demo
        .col-md-5(@dragover="onDragOver" @drop="onDrop" @mousedown= "onMouseDown" @mouseup = "onMouseUp")
        .col-md-5#cont
          iframe(src="../sandbox.html" title="iframe example 1" scrolling="yes" width="400" height="600")
</template>
<script>
import PartsSlot from './components/parts_slot.vue'
import Demo from './components/Demo.vue'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    Demo,
    PartsSlot
  },
  methods: {
    onDragOver(e){
      e.preventDefault();
    },
    onDrop(e) {
      let ary = ['id', 'style', 'draggable'];
      let id_name = e.dataTransfer.getData("text/plain");
      let drag_elm = document.getElementById(id_name);
      let node = e.dataTransfer.getData('dragItem')
      let clone = drag_elm.cloneNode(true);
      ary.forEach(function(value, index){
        clone.removeAttribute(value);
      });
      let wrap = this.parts_wrap(clone)
      e.currentTarget.appendChild(wrap);
      e.preventDefault();
    },
    onMouseDown(e){
      e.target.setAttribute('draggable', true)
    },
    onMouseUp(e){
      e.target.removeAttribute('draggable')
    },
    parts_wrap(element){
      let container = document.createElement('div')
      let row = document.createElement('div')
      let col = document.createElement('div')
      container.setAttribute('class', "container")
      row.setAttribute('class', "row")
      col.setAttribute('class',"col-md-12")
      col.appendChild(element)
      row.appendChild(col)
      container.appendChild(row)
      return container
    }
  },
  mounted() {
    let content = document.getElementById("cont")
    content.addEventListener("dragover", this.onDragOver)
    content.addEventListener("drop", this.onDrop)
    content.addEventListener("mousedown", this.onMouseDown)
  }
}
</script>

<style lang="scss">
  @import "./assets/application";
</style>
