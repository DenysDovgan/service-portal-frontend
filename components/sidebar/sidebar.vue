<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()

type SidebarLink = {
  label: string
  path: string
  roles?: Array<'TECHNICIAN' | 'SERVICE_MANAGER' | 'ADMIN'>
}

const links: SidebarLink[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Account', path: '/account' },
  { label: 'Add Client', path: '/clients/add', roles: ['TECHNICIAN', 'SERVICE_MANAGER', 'ADMIN'] },
  { label: 'Clients', path: '/clients', roles: ['SERVICE_MANAGER', 'ADMIN'] },
  { label: 'Technicians', path: '/technicians', roles: ['SERVICE_MANAGER', 'ADMIN'] },
]

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="w-64 min-h-screen bg-white shadow px-6 py-8">
    <h2 class="text-xl font-semibold mb-8">Service Portal</h2>

    <nav class="space-y-3">
      <NuxtLink
          v-for="(link, index) in links"
          :key="index"
          :to="link.path"
      >
        {{ link.label }}
      </NuxtLink>

      <button
          @click="handleLogout"
          class="mt-6 text-sm text-red-600 hover:underline"
      >
        Log out
      </button>
    </nav>
  </aside>
</template>
