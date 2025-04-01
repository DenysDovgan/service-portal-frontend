<script setup lang="ts">
const props = defineProps<{
  insights: Record<string, number>
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
        v-for="(value, key) in insights"
        :key="key"
        class="p-4 bg-white rounded shadow flex flex-col items-start"
    >
      <p class="text-sm text-gray-500 capitalize">
        {{ key.replace(/([A-Z])/g, ' $1') }}
      </p>
      <p class="text-2xl font-semibold text-gray-800">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>