<script setup lang="ts">
  import DarkModeSwitch from "./components/DarkModeSwitch.vue";
  
</script>

<template>
  <nav class="flex justify-between p-4 h-20 items-center shadow-sm dark:bg-dark-blue bg-white">
    <span class="font-Nunito font-semibold text-xl  dark:text-white text-very-dark-blue-text">Where in the world?</span>
    <DarkModeSwitch />
  </nav>

  <router-view></router-view>
</template>