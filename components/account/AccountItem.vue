<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="flex flex-col">
    <span class="text-sm text-gray-500 mb-1">{{ label }}</span>
    <span class="text-base font-medium text-gray-900">{{ value }}</span>
  </div>
</template>