<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui';
</script>

<template>
  <NConfigProvider class="h-full">
    <RouterView class="bg-layout" />
  </NConfigProvider>
</template>
