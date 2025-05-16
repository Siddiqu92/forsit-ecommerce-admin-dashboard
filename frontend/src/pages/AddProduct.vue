<template>
  <v-container class="pa-6" max-width="600">
    <v-form ref="formRef" @submit.prevent="submit" v-model="valid" lazy-validation>
      <v-text-field
        v-model="product.name"
        label="Product Name"
        :rules="[(v) => !!v || 'Name is required']"
        required
        prepend-icon="mdi-tag"
        color="primary"
        outlined
        dense
      />

      <v-text-field
        v-model.number="product.price"
        label="Price ($)"
        type="number"
        :rules="[(v) => v > 0 || 'Price must be positive']"
        required
        prepend-icon="mdi-currency-usd"
        color="primary"
        outlined
        dense
      />

      <v-text-field
        v-model.number="product.stock"
        label="Stock Quantity"
        type="number"
        :rules="[(v) => v >= 0 || 'Stock cannot be negative']"
        required
        prepend-icon="mdi-warehouse"
        color="primary"
        outlined
        dense
      />

      <v-file-input
        label="Upload Product Image"
        prepend-icon="mdi-image"
        accept="image/*"
        dense
        color="primary"
        v-model="product.image"
        placeholder="Select image (optional)"
        show-size
      />

      <v-btn
        class="mt-6"
        :disabled="!valid"
        color="primary"
        type="submit"
        elevation="2"
        large
        block
      >
        Add Product
      </v-btn>
    </v-form>

    <v-alert
      v-if="successMessage"
      type="success"
      class="mt-4"
      border="start"
      colored-border
      elevation="2"
      dense
      prominent
      @click="successMessage = ''"
    >
      {{ successMessage }}
    </v-alert>

    <v-alert
      v-if="errorMessage"
      type="error"
      class="mt-4"
      border="start"
      colored-border
      elevation="2"
      dense
      prominent
      @click="errorMessage = ''"
    >
      {{ errorMessage }}
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { VForm } from 'vuetify/components'
import API from '../api' // TS will use the declaration file below

interface Product {
  name: string
  price: number | null
  stock: number | null
  image: File | null
}

const product = ref<Product>({
  name: '',
  price: null,
  stock: null,
  image: null,
})

const valid = ref(false)
const formRef = ref<InstanceType<typeof VForm> | null>(null)
const successMessage = ref('')
const errorMessage = ref('')

const submit = async () => {
  if (!formRef.value?.validate()) return

  try {
    await API.post('/products', product.value)
    successMessage.value = 'Product added successfully!'
    errorMessage.value = ''

    product.value = { name: '', price: null, stock: null, image: null }
    formRef.value?.resetValidation()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to add product. Please try again.'
    successMessage.value = ''
  }
}
</script>

<style scoped>
.v-text-field,
.v-file-input {
  max-width: 100%;
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:disabled {
  background-color: #90caf9 !important;
  color: #e3f2fd !important;
  cursor: not-allowed;
}

.v-alert {
  cursor: pointer;
  user-select: none;
}
</style>
