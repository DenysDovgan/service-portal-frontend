<script setup lang="ts">
import { userSchema, type UserFormSchema } from '~/schemas/userSchema'
import { useCreateUser } from '~/composables/useCreateUser'
import { useCountryData } from '~/composables/useCountryData'
import type {FormSubmitEvent} from "#ui/types";
import type {Role} from "~/types/role";

const { countries, status, error } = await useCountryData()


// Trigger on success
const emit = defineEmits<{
  (e: 'success'): void
}>()

// Create user role
const props = defineProps<{ role: Role }>()

// Create user logic
const state = reactive<UserFormSchema>({
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  city: '',
  country: '',
  companyName: '',
  role: props.role
})

const { createUser, loading } = useCreateUser()

const handleSubmit = async (event: FormSubmitEvent<UserFormSchema>) => {
  const success = await createUser(event.data)
  if (success) emit('success')
}

</script>

<template>
  <!--
    todo: create country and city dropdown list. Same for phone code
    -->
  <UForm :state="state" :schema="userSchema" @submit="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField label="First Name" name="firstName" required>
        <UInput v-model="state.firstName" />
      </UFormField>

      <UFormField label="Last Name" name="lastName" required>
        <UInput v-model="state.lastName" />
      </UFormField>

      <UFormField label="Email" name="email" required>
        <UInput type="email" v-model="state.email" />
      </UFormField>

      <UFormField label="Phone Number" name="phoneNumber" required>
        <UInput v-model="state.phoneNumber" />
      </UFormField>

      <UFormField label="Country" name="country" required>
        <USelectMenu
            :items="countries"
            :loading="status === 'pending'"
            label-key="label"
            :search-input="{ icon: 'i-lucide-search' }"
            placeholder="Select country"
            class="w-48"
        />
      </UFormField>

      <UFormField label="City" name="city" required>
        <UInput v-model="state.city" />
      </UFormField>

      <UFormField label="Company Name" name="companyName" required>
        <UInput v-model="state.companyName" />
      </UFormField>
    </div>

    <div class="pt-4">
      <UButton type="submit" :loading="loading" color="primary">
        Create User
      </UButton>
    </div>
  </UForm>
</template>
