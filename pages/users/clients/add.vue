<script setup lang="ts">

const layoutState = useLayoutState()
layoutState.value.heading = 'Add Client'

import { ref } from 'vue'
import { useToast } from '#imports'

const toast = useToast()

const state = ref({
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  city: '',
  country: '',
  companyName: '',
  role: 'CLIENT'
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await $fetch('/api/users/create', {
      method: 'POST',
      body: state.value
    })
    toast.add({ title: 'User created successfully', color: 'success' })
    Object.assign(state.value, {
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      city: '',
      country: '',
      companyName: '',
      role: 'CLIENT'
    })
  } catch (error) {
    toast.add({ title: 'Failed to create user', color: 'error' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :state="state" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField label="First Name" name="firstName">
        <UInput v-model="state.firstName" />
      </UFormField>

      <UFormField label="Last Name" name="lastName">
        <UInput v-model="state.lastName" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput type="email" v-model="state.email" />
      </UFormField>

      <UFormField label="Phone Number" name="phoneNumber">
        <UInput v-model="state.phoneNumber" />
      </UFormField>

      <UFormField label="City" name="city">
        <UInput v-model="state.city" />
      </UFormField>

      <UFormField label="Country" name="country">
        <UInput v-model="state.country" />
      </UFormField>

      <UFormField label="Company Name" name="companyName">
        <UInput v-model="state.companyName" />
      </UFormField>

      <UFormField label="Role" name="role">
        <USelect v-model="state.role" :options="['CLIENT', 'TECHNICIAN', 'SERVICE_MANAGER', 'ADMIN']" />
      </UFormField>
    </div>

    <div class="pt-4">
      <UButton type="submit" :loading="loading" color="primary">
        Create User
      </UButton>
    </div>
  </UForm>
</template>
