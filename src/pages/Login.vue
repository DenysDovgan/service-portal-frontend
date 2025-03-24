<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Role } from '@/types/models'
import type { User } from '@/types/models'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = () => {
  // simulate login
  const fakeUser: User = {
    id: 1,
    email: email.value,
    role: Role.CLIENT,
    firstName: 'Test',
    lastName: 'User',
  }

  auth.login('fake-jwt-token', fakeUser)
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
              v-model="email"
              type="email"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <button
            type="submit"
            class="duration-200 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-400"
        >
          Login
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>
