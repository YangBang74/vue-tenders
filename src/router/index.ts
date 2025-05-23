import { createRouter, createWebHistory } from 'vue-router'
import TenderList from '../views/TenderList.vue'
import TenderDetail from '../views/TenderDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: TenderList },
    { path: '/tender/:id', component: TenderDetail, props: true },
  ],
})

export default router
