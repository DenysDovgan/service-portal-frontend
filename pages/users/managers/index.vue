<script setup lang="ts">
import { Role } from '~/types/role';
import {useHasRole} from "~/composables/useHasRole";


// Title
useHead({ title: 'Managers' })

// Authentication
const hasAccess = useHasRole([Role.ADMIN, Role.SERVICE_MANAGER])

if (!hasAccess.value) {
  await navigateTo('/unauthorized')
}

// Page Heading
const layoutState = useLayoutState()
layoutState.value.heading = 'Managers'
</script>

<template>
  <UsersGrid :role="Role.SERVICE_MANAGER"/>
</template>

<style scoped>

</style>