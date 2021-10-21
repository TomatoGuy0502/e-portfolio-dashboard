import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
  { path: '/login', name: 'login', component: Login },
  { path: '/:path(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  if (to.name === 'login' && authStore.tokenStr && await authStore.isTokenValid()) {
    return { name: 'home' }
  }
  if (to.meta.requiresAuth && (!authStore.tokenStr || !await authStore.isTokenValid())) {
    return { name: 'login' }
  }
})

export default router
