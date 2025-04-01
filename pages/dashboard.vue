<script setup lang="ts">
useHead({
  title: 'Dashboard',
})

const { data } = useAuth()
const userName = computed(() => data.value?.firstName)

const layoutState = useLayoutState()
layoutState.value.heading = 'Welcome, ' + userName.value
</script>

<template>
  <div class="space-y-6">
    <DashboardInsightsGrid />
  </div>
</template>
