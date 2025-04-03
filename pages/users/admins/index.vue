<script setup lang="ts">
import { Role } from '~/types/role';
import {useHasRole} from "~/composables/useHasRole";

// Title
useHead({ title: 'Admins' })

// Authentication
const hasAccess = useHasRole([Role.ADMIN])

if (!hasAccess.value) {
  await navigateTo('/unauthorized')
}

// Page Heading
const layoutState = useLayoutState()
layoutState.value.heading = 'Admins'
</script>

<template>
  <UsersGrid :role="Role.ADMIN"/>
</template>

<style scoped>

</style>