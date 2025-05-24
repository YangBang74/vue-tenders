import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    // router/index.ts
    {
      path: '/tenders/:id',
      name: 'TenderDetails',
      component: () => import('@/views/TenderDetail.vue'),
      props: true,
    },
  ],
})

export default router
