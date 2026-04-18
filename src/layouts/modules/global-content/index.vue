<script setup lang="ts">


</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition>
      <KeepAlive>
        <component :is="Component" class="flex-grow bg-layout transition-300" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>



<style scoped></style>
