import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'boot/axios';

export const useProductStore = defineStore('ProductStore', () => {
  const products = ref([]);

  const fetchProducts = async () => {
    const response = await api.get('/products');
    products.value = response.data.products.map((product: any) => ({
      id: product.id,
      sku: product.sku,
      price: product.price,
      title: product.title,
      description: product.description,
      category: product.category,
      total_rating: product.rating,
    }));
  };

  const updateProduct = (product) => {
    const index = products.value.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.value[index] = product;
    }
  };

  const deleteProduct = (id) => {
    products.value = products.value.filter((product) => product.id !== id);
  };

  return {
    products,
    fetchProducts,
    updateProduct,
    deleteProduct,
  };
});
