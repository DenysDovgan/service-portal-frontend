<script setup lang="ts">
import { ref } from 'vue'
import type { UserDto } from '~/types/user'
import type { Role } from "~/types/role";
import { formatRole, formatCapitalize } from "~/utils/format";

const { token, data: session } = useAuth()
const config = useRuntimeConfig()

const slideoverOpen = ref(false)

// input params
const props = defineProps<{
  role: Role
}>()

const formatedRole = formatRole(props.role)

// filter body
const filters = ref({
  role: props.role,
  name: '',
  email: '',
  company: '',
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
  } catch (err) {
    error.value = err as Error
  } finally {
    pending.value = false
  }
}

const successUserAddTrigger = () => {
  fetchUsers()
  slideoverOpen.value = !slideoverOpen.value
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="space-y-6">

    <USlideover v-model:open="slideoverOpen">
      <UButton variant="outline">
        Add {{ formatedRole }}
      </UButton>

      <template #header>
        <h2 class="text-xl font-semibold text-black">Add New {{ formatedRole }}</h2>
      </template>

      <template #body>
        <UsersAddForm :role="props.role" @success="fetchUsers" />
      </template>
    </USlideover>

<!--    Filter fields-->
    <div class="bg-white p-4 rounded shadow">
      <div class="mx-4 space-y-4 flex flex-row justify-between items-center">
        <UFormField label="Name">
          <UInput v-model="filters.name" placeholder="Search by name" />
        </UFormField>

        <UFormField label="Email">
          <UInput v-model="filters.email" placeholder="Search by email" />
        </UFormField>

        <UFormField label="Company">
          <UInput v-model="filters.company" placeholder="Company" />
        </UFormField>

        <UButton label="Search" @click="fetchUsers" />
      </div>
    </div>

<!--    Fetching Status-->
    <div v-if="pending" class="text-gray-500">Loading users...</div>
    <div v-else-if="error" class="text-red-500">Failed to load users.</div>

<!--    Fetched users list-->
    <div v-else class="gap-4 space-y-4">
      <div
          v-for="user in users"
          :key="user.id"
          class="p-4 bg-white rounded shadow flex flex-col gap-2"
      >
        <p class="text-lg font-semibold text-gray-800">
          {{ formatCapitalize(user.firstName) }} {{ formatCapitalize(user.lastName) }}
        </p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
        <p class="text-sm text-gray-500">{{ user.phoneNumber }}</p>
        <p class="text-sm text-gray-500">{{ formatCapitalize(user.city) }}, {{ formatCapitalize(user.country) }}</p>
        <p class="text-sm text-gray-500">Company: {{ user.companyName }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>