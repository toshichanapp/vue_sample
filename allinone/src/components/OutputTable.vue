<template lang="pug">
  #org-table.table-responsive.mb-0(v-if="currentCheckedItems.length > 0")
    table.table.table-bordered.table-striped.small.mb-0
      thead
        tr
          th(scope="col" v-for="name in columns")
            | {{name}}
          th.col-delete(scope="col")
      tbody
        tr(v-for="(checkedItem,index) in currentCheckedItems")
          template(v-for="item in items" v-if="item.id == checkedItem")
            td {{ item.name }}
            td {{ item.size }}
            td.text-danger(style="cursor:pointer" @click="removeItem({ index: index })")
              i.fa.fa-fw.fa-times(aria-hidden="true")
              | 削除
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: mapGetters({
      columns: 'getColumns',
      currentCheckedItems: 'getCurrentChecked',
      items: 'getItems'
    }),
    methods: mapActions({
      removeItem: 'removeItem'
    })
  }
</script>
