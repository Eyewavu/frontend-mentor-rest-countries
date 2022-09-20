import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/pages/home/Page.vue")
    },
    {
      path: "/country/:name",
      name: "country",
      component: () => import("@/pages/country/Page.vue")
    }
  ]
})

export default router
