<script setup lang="ts">
useHead({
  title: 'Dashboard',
})

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Welcome, asdf👋</h1>

    <div class="bg-white p-6 rounded shadow">
      <p class="text-gray-600">
        This is your dashboard. Here you'll see different content based on your role:
      </p>

      <ul class="list-disc pl-6 mt-4 text-sm text-gray-700 space-y-1">
        <li>Your submitted issues + create new issue</li>
        <li>Issues assigned to you</li>
        <li>All issues in the system (filterable)</li>
      </ul>
    </div>
  </div>
</template>
