<script setup lang="ts">

</script>

<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <Sidebar />

    <main class="flex-1 p-6 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
