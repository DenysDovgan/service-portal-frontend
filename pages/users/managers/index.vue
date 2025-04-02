<script setup lang="ts">
import { Role } from '~/constants/role';

const layoutState = useLayoutState()
layoutState.value.heading = 'Managers'
</script>

<template>
  <UsersGrid :role="Role.SERVICE_MANAGER"/>
</template>

<style scoped>

</style>