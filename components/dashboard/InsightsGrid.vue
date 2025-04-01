<script setup lang="ts">
import { useInsights } from '~/composables/useInsights'

const { insights, pending, error, refresh } = useInsights()

onMounted(() => {
  refresh()
})

const formatKey = (key: string) => {
  return key
      .replace(/count/, ' ')
      .replace(/^clientMy/, 'My ')
      .replace(/^staffMy/, 'My ')
      .replace(/^total/, 'Total ')
      .replace(/^open/, 'Open ')
      .replace(/^inProgress/, 'In Progress ')
      .replace(/^resolved/, 'Resolved ')
      .replace(/^closed/, 'Closed ')
      .replace(/Count$/, '')
      .replace(/([A-Z])/g, ' $1')
      .replace(/\s+/g, ' ')
      .trim()
}
</script>

<template>
  <div>
    <div v-if="pending" class="text-gray-500">Loading insights...</div>
    <div v-else-if="error" class="text-red-500">Failed to load insights.</div>

    <div v-else-if="insights" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
          v-for="(value, key) in insights"
          :key="key"
          class="p-4 bg-white rounded shadow flex flex-col items-start"
      >
        <p class="text-sm text-gray-500 capitalize">
          {{ formatKey(key) }}
        </p>
        <p class="text-2xl font-semibold text-gray-800">
          {{ value }}
        </p>
      </div>
    </div>
  </div>
</template>
