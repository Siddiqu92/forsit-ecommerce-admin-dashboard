import { createRouter, createWebHistory } from 'vue-router'


const Dashboard = () => import('../pages/Dashboard.vue')
const Inventory = () => import('../pages/Inventory.vue')
const AddProduct = () => import('../pages/AddProduct.vue')

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
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
