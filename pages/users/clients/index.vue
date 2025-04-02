<script setup lang="ts">
useHead({ title: 'Clients' })
import { Role } from '~/constants/role';


const layoutState = useLayoutState()
layoutState.value.heading = 'Clients'
</script>

<template>
  <UsersGrid :role="Role.CLIENT"/>
</template>

<style scoped>

</style>