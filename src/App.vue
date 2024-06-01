<template>
  <NavigationBar class="hidden sm:block" />
  <main>
    <RouterView />
  </main>
  <!-- <MobileNavigationBar class="fixed bottom-0 left-0 border-t border-zinc-200 sm:hidden" /> -->
</template>

<script setup lang="ts">
// import MobileNavigationBar from './components/MobileNavigationBar.vue';
import NavigationBar from './components/NavigationBar.vue'
</script>


<style scoped></style>
