<script setup lang="ts">

useHead({
  title: 'Dashboard',
})

const { data } = useAuth()
const userName = computed(() => data.value?.firstName)

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Welcome, {{ userName }}👋</h1>

    <div class="bg-white p-6 rounded shadow">

      <div class="space-y-6">
        <DashboardInsightsGrid />
      </div>

    </div>
  </div>
</template>
