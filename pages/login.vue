<script lang="ts" setup>
import logo from '~/assets/logo.svg'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
})

interface AuthError extends Error {
  statusCode?: number
  message: string
}

const { signIn } = useAuth()

const loginError = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

async function handleLogin(): Promise<void> {
  loginError.value = ''

  const credentials = { email: email.value, password: password.value }

  try {
    const result = await signIn(credentials, {
      redirect: false
    })

    if (result?.error) {
      throw new Error(result.error)
    }

    // Optional: Redirect on success
    await navigateTo('/dashboard')
  } catch (error: unknown) {
    loginError.value = formatAuthError(error)
  }
}

function formatAuthError(error: unknown): string {
  // Type guard for AuthError
  if (typeof error === 'object' && error !== null) {
    const authError = error as AuthError

    // Customize based on your API's error responses
    // todo: 403 -> 401
    if (authError.statusCode === 403) {
      return 'Invalid email or password'
    }
    if (authError.message.includes('CredentialsSignin')) {
      return 'Authentication failed'
    }
    return 'Login failed. Please try again.'
  }

  return 'An unexpected error occurred'
}
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
              v-model="email"
              type="email"
              placeholder="E-mail"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full border border-gray-300 p-2 rounded"
              required
          />
        </div>

        <div
            v-if="loginError"
            class="error-message text-center mx-auto p-3 mb-4 max-w-md"
        >
          <p class="font-medium text-red-500">{{ loginError }}</p>
        </div>

        <button
            type="submit"
            class="duration-200 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-400"
        >
          Sign In
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>