<template>
  <v-container fluid class="inventory-container">
    <h2 class="page-title">Inventory Management</h2>

    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1 custom-table"
      dense
      loading-text="Loading products..."
    >
      <template #item.price="{ item }"> ${{ item.price.toFixed(2) }} </template>

      <template #item.stock="{ item }">
        <v-chip
          :color="item.stock > 10 ? '#66BB6A' : item.stock > 0 ? '#FFB74D' : '#EF5350'"
          text-color="white"
          small
        >
          {{ item.stock }} in stock
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import API from '../api'

const products = ref([])

const headers = [
  { text: 'Product Name', value: 'name' },
  { text: 'Price ($)', value: 'price' },
  { text: 'Stock Status', value: 'stock' },
]

onMounted(async () => {
  try {
    const res = await API.get('/products')
    products.value = res.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>

<style scoped>
.inventory-container {
  background-color: #f9fafb;
  padding-top: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #37474f;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.custom-table {
  font-family: 'Poppins', sans-serif;
  border-radius: 12px;
  overflow: hidden;
}

.v-data-table-header th {
  background-color: #eceff1;
  color: #455a64;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
}
</style>
