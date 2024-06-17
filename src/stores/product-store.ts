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

  return {
    products,
    fetchProducts,
  };
});
