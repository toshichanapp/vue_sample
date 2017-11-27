<template lang="pug">
  #org-table.table-responsive.mb-0(v-if="checkedItems.length > 0")
    table.table.table-bordered.table-striped.small.mb-0
      thead
        tr
          th(scope="col" v-for="name in columns")
            | {{name}}
          th.col-delete(scope="col")
      tbody
        tr(v-for="(checkedItem,index) in checkedItems")
          template(v-for="item in items" v-if="item.id == checkedItem")
            td {{ item.name }}
            td {{ item.size }}
            td.text-danger(style="cursor:pointer")
              i.fa.fa-fw.fa-times(aria-hidden="true")
              | 削除
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters({
      columns: 'getColumns',
      checkedItems: 'getCheckedItems',
      items: 'getItems'
    })
  }
</script>
