<script setup>
import logo from '~/assets/logo.svg'
import { Role } from '~/constants/role.js'

const { data, signOut } = useAuth()
const userRole = computed(() => data.value?.role)

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Account', to: '/account' },
  { label: 'Admins', to: '/users/admins', roles: [Role.ADMIN] },
  { label: 'Technicians', to: '/users/technicians', roles: [Role.SERVICE_MANAGER, Role.ADMIN] },
  { label: 'Clients', to: '/users/clients', roles: [Role.TECHNICIAN, Role.SERVICE_MANAGER, Role.ADMIN] },
]

const filteredLinks = computed(() => {
  return links.filter(link => {
    // Show item if no roles specified OR if user has required role
    return !link.roles || (userRole.value && link.roles.includes(userRole.value))
  })
})

const handleLogout = async () => {
  await signOut({ redirect: false })
  await navigateTo('/login')
}
</script>

<template>
  <aside class="w-64 h-screen bg-white shadow px-6 py-8 sticky top-0">
    <div class="flex justify-center mb-4">
      <img :src="logo" alt="Logo" class="w-50 text-center"/>
    </div>

    <nav class="space-y-2">
      <template v-for="link in filteredLinks" :key="link.to">
        <NuxtLink
            :to="link.to"
            class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            :class="{ 'bg-gray-200 font-semibold text-gray-900': $route.path === link.to }"
        >
          <component v-if="link.icon" :is="link.icon" class="w-5 h-5" />
          <span class="text-sm">{{ link.label }}</span>
        </NuxtLink>
      </template>

      <hr class="border-gray-200 mb-4" />

      <button
          @click="handleLogout"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition text-sm w-full"
      >
        Log Out
      </button>
    </nav>

  </aside>
</template>
