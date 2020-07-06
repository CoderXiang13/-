import Vue from 'vue'
import VueRouter from 'vue-router'
import detailsPage from '../components/views/detailsPage'
import foodsShop from '../components/views/foodsShop'
import products from '../components/views/products'
import vip from '../components/views/vip'
import counts from '../components/views/counts'
import setUp from '../components/views/setUp'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/detailsPage'
  },
  {
    path: '/detailsPage',
    name: 'detailsPage',
    component: detailsPage
  },
  {
    path: '/foodsShop',
    name: 'foodsShop',
    component: foodsShop
  },
  {
    path: '/products',
    name: 'products',
    component: products
  },
  {
    path: '/vip',
    name: 'vip',
    component: vip
  },
  {
    path: '/counts',
    name: 'counts',
    component: counts
  },
  {
    path: '/setUp',
    name: 'setUp',
    component: setUp
  }

]

const router = new VueRouter({ routes })

export default router
