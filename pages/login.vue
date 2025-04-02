<script lang="ts" setup>
import * as v from 'valibot'
import logo from '~/assets/logo.svg'
import type { FormSubmitEvent } from '#ui/types'

useHead({ title: 'Login' })

definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
})

// --- Schema ---
const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  email: '',
  password: ''
})

// --- Auth ---
const { signIn } = useAuth()
const loginError = ref<string>('')


const toast = useToast()
// --- Login Handler ---
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loginError.value = ''
  try {
    const result = await signIn({
      email: event.data.email,
      password: event.data.password
    }, { redirect: false })

    if (result?.error) {
      throw new Error(result.error)
    }

    toast.add({ title: 'Logged In Successfully', color: 'success' })
    await navigateTo('/dashboard')
  } catch (error: unknown) {
    loginError.value = formatAuthError(error)
    toast.add({ title: 'Log In Failed', description: loginError.value, color: 'error' })
  }
}

function formatAuthError(error: unknown): string {
  if (typeof error === 'object' && error !== null) {
    const authError = error as { message?: string; statusCode?: number }

    if (authError.statusCode === 401) {
      return 'Invalid email or password'
    }
    if (authError.message?.includes('CredentialsSignin')) {
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

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg"/>
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" size="lg" />
        </UFormField>

        <UButton type="submit">
          Submit
        </UButton>
      </UForm>

<!--      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-gray-600">Email</label>
          <input
              v-model="email"
              type="email"
              class="w-full border border-gray-300 p-2 rounded text-black"
              required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium mb-1 text-gray-600">Password</label>
          <input
              v-model="password"
              type="password"
              class="w-full border border-gray-300 p-2 rounded text-black"
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
            class="duration-200 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-400"
        >
          Sign In
        </button>
      </form>-->

    </div>
  </div>
</template>
