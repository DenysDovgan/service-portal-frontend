<script setup lang="ts">

import { useInsights } from '~/composables/useInsights'
import { insightCategories } from '~/utils/insightCategories'
import type {InsightsResponse} from "~/types/insights";

const { insights, pending, error, refresh } = useInsights()

onMounted(() => {
  refresh()
})

const groupedInsights = computed(() => {
  if (!insights.value) return []

  const sectionsMap: Record<string, Record<string, number>> = {}

  for (const [key, value] of Object.entries(insights.value)) {
    const category = insightCategories[key as keyof InsightsResponse] ?? 'Other'

    if (!sectionsMap[category]) {
      sectionsMap[category] = {}
    }

    sectionsMap[category][key] = value
  }

  return Object.entries(sectionsMap).map(([title, items]) => ({
    title,
    items
  }))
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

    <div v-else>
      <div v-for="section in groupedInsights" :key="section.title" class="mb-8">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ section.title }}</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <div
              v-for="(value, key) in section.items"
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
    </div>
  </div>
</template>

