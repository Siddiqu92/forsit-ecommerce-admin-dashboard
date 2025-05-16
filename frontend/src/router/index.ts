import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import Inventory from '../pages/Inventory.vue'
import AddProduct from '../pages/AddProduct.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
