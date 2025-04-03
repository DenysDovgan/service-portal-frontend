<script setup lang="ts">
import logo from '~/assets/logo.svg'
import { loginSchema, type LoginSchema } from '~/schemas/loginSchema'
import { useLogin } from '~/composables/useLogin'
import type { FormSubmitEvent } from '#ui/types'

useHead({ title: 'Login' })

definePageMeta({
  layout: 'empty',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard'
  }
})

const state = reactive<LoginSchema>({
  email: '',
  password: ''
})

const { login, loginError } = useLogin()

const onSubmit = async (event: FormSubmitEvent<LoginSchema>) => {
  await login(event.data)
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen p-6 bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">

      <div class="flex justify-center mb-6">
        <img :src="logo" alt="Logo" class="w-50 text-center"/>
      </div>

      <UForm :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" size="lg"/>
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" type="password" class="w-full" size="lg" />
        </UFormField>

        <div class="flex flex-row justify-center items-center content-center pt-2">
          <UButton type="submit" variant="outline">
            Log In
          </UButton>
        </div>

      </UForm>
    </div>
  </div>
</template>
