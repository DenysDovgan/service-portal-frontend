<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '#imports'

import logo from '~/assets/logo.svg'

const { signIn } = useAuth()

const email = ref('');
const password = ref('');

const error = ref('');

const handleLogin = async () => {
  const credentials = { email: email.value, password: password.value }

  try {
    await signIn(credentials, {
      redirect: false, // Prevents automatic redirection
    });
  } catch (err) {
    error.value = err.message || 'Login failed. Please try again.';
  }

};

const route = useRoute()
const errorCode = computed(() => route.query.error)

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">

      <div class="flex justify-center mb-6">
        <img :src="logo" alt="Logo" class="w-50 text-center"/>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
              v-model="credentials.email"
              type="email"
              placeholder="E-mail"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="credentials.password"
              type="password"
              placeholder="Password"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <p v-if="errorCode" class="text-red-500 text-sm mt-2">{{ errorCode }}</p>

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