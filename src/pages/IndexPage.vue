<template>
  <q-page padding>
    <q-btn @click="fetchProducts" label="Fetch Products" color="primary" class="q-mt-xl" />

    <q-table :rows="products" :columns="columns" row-key="id" title="Car Info">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense @click="openEditDialog(props.row)" icon="edit" color="primary" />
          <q-btn flat dense @click="confirmDelete(props.row)" icon="delete" color="negative" />
        </q-td>
      </template>
    </q-table>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
//import { useQuasar } from 'quasar';
import { useProductStore } from 'stores/product-store';
export default defineComponent({
  name: 'IndexPage',

  setup() {

    //const $q = useQuasar();
    const productStore = useProductStore();
    const products = computed(() => productStore.products)
    const editDialog = ref();

    // qTable columns
    const columns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id',
        sortable: true,
      },
      { name: 'sku', align: 'justify', label: 'SKU', field: 'sku', sortable: true },
      { name: 'title', label: 'Title', field: 'title', sortable: true, align: 'justify' },
      { name: 'description', label: 'Description', field: 'description', align: 'justify' },
      { name: 'category', label: 'Category', field: 'category' },
      { name: 'price', label: 'Price', field: 'price' },
      { name: 'total_rating', label: 'Total Rating', field: 'total_rating' },
      { name: 'actions', label: 'Action', field: 'actions', sortable: false },
    ]

    const fetchProducts = productStore.fetchProducts

    fetchProducts();

    return {
      products,
      columns,
      fetchProducts
    }

  }
});
</script>
