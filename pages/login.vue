<script setup lang="ts">
import { ref } from 'vue'
import logo from '~/assets/logo.svg'

const email = ref('')
const password = ref('')

</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">

      <div class="flex justify-center mb-6">
        <img :src="logo" alt="Logo" class="w-50 text-center"/>
      </div>

      <form @submit.prevent="">
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