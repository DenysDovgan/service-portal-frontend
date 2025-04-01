<script setup lang="ts">
import AccountItem from "~/components/account/AccountItem.vue";
import {formatRole} from "~/utils/format";

useHead({ title: 'My Account' })

const { data: session } = useAuth()
const user = computed(() => session.value)

const layoutState = useLayoutState()
layoutState.value.heading = 'My Account'
</script>

<template>
  <div v-if="!user" class="text-gray-500">Loading...</div>

  <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <AccountItem label="First Name" :value="user.firstName" />
    <AccountItem label="Last Name" :value="user.lastName" />
    <AccountItem label="Email" :value="user.email" />
    <AccountItem label="Phone Number" :value="user.phoneNumber" />
    <AccountItem label="City" :value="user.city" />
    <AccountItem label="Country" :value="user.country" />
    <AccountItem label="Company" :value="user.companyName || '—'" />
    <AccountItem label="Role" :value="formatRole(user.role)" />
  </div>
</template>
