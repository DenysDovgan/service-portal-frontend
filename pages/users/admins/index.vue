<script setup lang="ts">
import { Role } from '~/constants/role';

const layoutState = useLayoutState()
layoutState.value.heading = 'Admins'
</script>

<template>
<!--  TODO:: Role authorisation check-->
  <UsersGrid :role="Role.ADMIN"/>
</template>

<style scoped>

</style>