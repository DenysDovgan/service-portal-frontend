<script setup lang="ts">
import { Role } from '~/types/role';
import {useHasRole} from "~/composables/useHasRole";

// Title
useHead({ title: 'Technicians' })

// Authentication
const hasAccess = useHasRole([Role.ADMIN, Role.SERVICE_MANAGER])

if (!hasAccess.value) {
  await navigateTo('/unauthorized')
}

// Page Heading
const layoutState = useLayoutState()
layoutState.value.heading = 'Technicians'
</script>

<template>
  <UsersGrid :role="Role.TECHNICIAN"/>
</template>

<style scoped>

</style>