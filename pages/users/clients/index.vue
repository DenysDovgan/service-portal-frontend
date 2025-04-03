<script setup lang="ts">
import { Role } from '~/types/role';
import {useHasRole} from "~/composables/useHasRole";


// Title
useHead({ title: 'Clients' })

// Authentication
const hasAccess = useHasRole([Role.ADMIN, Role.SERVICE_MANAGER])

if (!hasAccess.value) {
  await navigateTo('/unauthorized')
}

// Heading
const layoutState = useLayoutState()
layoutState.value.heading = 'Clients'
</script>

<template>
  <UsersGrid :role="Role.CLIENT"/>
</template>

<style scoped>

</style>