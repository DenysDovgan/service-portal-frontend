<script setup lang="ts">
import { Role } from '~/constants/role';

const layoutState = useLayoutState()
layoutState.value.heading = 'Technicians'
</script>

<template>
  <UsersGrid :role="Role.TECHNICIAN"/>
</template>

<style scoped>

</style>