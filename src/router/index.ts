import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import Login from '@/pages/Login.vue'
//import Dashboard from '@/pages/Dashboard.vue'
//import CreateIssue from '@/pages/CreateIssue.vue'
//import IssueDetails from '@/pages/IssueDetails.vue'

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/:pathMatch(.*)*', redirect: '/' }, // Catch-all
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()

  // Allow access to login page
  if (to.name === 'Login') return next()

  // Require authentication for everything else
  if (!auth.token) return next('/login')

  // Example: restrict create page to CLIENT only
  if (to.name === 'CreateIssue' && auth.user?.role !== 'CLIENT') {
    return next('/')
  }

  next()
})

export default router
