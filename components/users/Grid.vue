<script setup lang="ts">
import { ref, watch } from 'vue'
import type { UserDto } from '~/types/user'
import type { Role } from "~/constants/role";

const { token, data: session } = useAuth()

const config = useRuntimeConfig()

const props = defineProps<{
  role: Role
}>()

const filters = ref({
  role: props.role,
  name: '',
  email: '',
  company: '',
})

const state = reactive({
  email: undefined,
  password: undefined
})

// todo: move fetch logic to useUsers
const users = ref<UserDto[]>([])
const pending = ref(false)
const error = ref<Error | null>(null)

const fetchUsers = async () => {
  pending.value = true
  error.value = null

  try {
    const { data: response } = await useFetch<{
      status: string
      message: string
      data: UserDto[]
    }>('/users/filter', {
      baseURL: config.public.apiBaseUrl,
      headers: {
        Authorization: `${token.value}`
      },
      query: {
        ...filters.value
      }
    })

    users.value = response.value?.data || []
    console.log(users.value)
  } catch (err) {
    error.value = err as Error
  } finally {
    pending.value = false
  }
}

watch(filters, fetchUsers, { deep: true, immediate: true })
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white p-4 rounded shadow">
      <UForm :state="state" class="space-y-4 grid grid-cols-3" @submit="onSubmit">
        <UFormField label="Name">
          <UInput v-model="filters.name" placeholder="Search by name" />
        </UFormField>

        <UFormField label="Email">
          <UInput v-model="filters.email" placeholder="Search by email" />
        </UFormField>

        <UFormField label="Company">
          <UInput v-model="filters.company" placeholder="Company" />
        </UFormField>
      </UForm>
    </div>

    <div v-if="pending" class="text-gray-500">Loading users...</div>
    <div v-else-if="error" class="text-red-500">Failed to load users.</div>

    <div v-else class="gap-4 space-y-4">
      <div
          v-for="user in users"
          :key="user.id"
          class="p-4 bg-white rounded shadow flex flex-col gap-2"
      >
        <p class="text-lg font-semibold text-gray-800">
          {{ user.firstName }} {{ user.lastName }}
        </p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
        <p class="text-sm text-gray-500">{{ user.phoneNumber }}</p>
        <p class="text-sm text-gray-500">{{ user.city }}, {{ user.country }}</p>
        <p class="text-sm text-gray-500">Company: {{ user.companyName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>