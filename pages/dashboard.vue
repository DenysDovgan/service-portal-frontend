<script setup lang="ts">

useHead({
  title: 'Dashboard',
})

const { data } = useAuth()
const userName = computed(() => data.value?.firstName)

const { insights, loading, error } = await useInsights()

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Welcome, {{ userName }}👋</h1>

    <div class="bg-white p-6 rounded shadow">

      <div class="space-y-6">
        <DashboardInsightsGrid v-if="insights" :insights="insights" />
        <p v-else-if="loading">Loading...</p>
        <p v-else-if="error">Failed to load insights.</p>
      </div>

    </div>
  </div>
</template>
