<template>
  <div class="flex h-full">
    <Sidebar />
    <div class="flex-grow">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: {
    Sidebar
  }
})
</script>

<style>
#app {
  @apply bg-pink h-screen
}
</style>
