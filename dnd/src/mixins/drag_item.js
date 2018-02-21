export default {
  methods: {
    onDragStart(e) {
      e.dataTransfer.dropEffect = "move"
      e.dataTransfer.setData('text/plain', e.target.id);
      e.dataTransfer.setData('dragItem', e.target.outerHTML)
      e.target.style.opacity = 0.5;
    },
    dragEnd(e) {
      e.target.style.opacity = 1;
    }
  }
}
