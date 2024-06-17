<template>
  <q-page>
    <q-table :rows="products" :columns="columns" row-key="id" title="Car Info">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat dense @click="openEditDialog(props.row)" icon="edit" color="primary" />
          <q-btn flat dense @click="openDeleteDialog(props.row)" icon="delete" color="negative" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="editDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit Product</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="editForm.sku" label="SKU" />
          <q-input v-model="editForm.title" label="Title" />
          <q-input v-model="editForm.description" label="Description" />
          <q-input v-model="editForm.category" label="Category" />
          <q-input v-model="editForm.price" label="Price" type="number" />
          <q-input v-model="editForm.total_rating" label="Total Rating" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
        </q-card-section>

        <q-card-section>
          Are you sure you want to delete this product?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="negative" @click="deleteProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useProductStore } from 'stores/product-store';
export default defineComponent({
  name: 'IndexPage',

  setup() {

    const $q = useQuasar();
    const productStore = useProductStore();
    const products = computed(() => productStore.products)
    const editDialog = ref(false);
    const productToDelete = ref(null);
    const deleteDialog = ref(false);
    const editForm = ref({
      id: null,
      name: '',
      sku: '',
      title: '',
      description: '',
      category: '',
      price: 0,
      total_rating: 0,
    })



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


    const openEditDialog = (row) => {
      editForm.value = { ...row }
      editDialog.value = true
    }

    const saveProduct = () => {
      const index = products.value.findIndex(item => item.id === editForm.value.id);
      if (index !== -1) {
        products.value.splice(index, 1, { ...editForm.value });
      }
      editDialog.value = false;

      $q.notify({
        color: 'green-4',
        message: 'Product updated',
        type: 'positive',
      });
    }

    const openDeleteDialog = (row) => {
      productToDelete.value = row
      deleteDialog.value = true

    }

    const deleteProduct = () => {
      productStore.deleteProduct(productToDelete.value.id)
      deleteDialog.value = false
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Product deleted',
        type: 'negative',
      })
    }




    const fetchProducts = productStore.fetchProducts

    fetchProducts();

    return {
      products,
      columns,
      fetchProducts,
      openEditDialog,
      editForm,
      editDialog,
      saveProduct,
      openDeleteDialog,
      deleteDialog,
      deleteProduct
    }

  }
});
</script>
