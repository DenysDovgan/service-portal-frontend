<script setup lang="ts">
const layoutState = useLayoutState()
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <Sidebar />

    <main class="flex-1 p-6 overflow-y-auto">
      <div class="p-6">
        <h1 class="text-2xl font-semibold mb-4">{{ layoutState.heading }}</h1>
        <div class="bg-white p-6 rounded shadow">

          <slot />

        </div>
      </div>
    </main>
  </div>
</template>
