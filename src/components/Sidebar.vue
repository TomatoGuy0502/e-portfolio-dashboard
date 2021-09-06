<template>
  <div
    class="relative flex-shrink-0 overflow-visible transition-all"
    :class="[isOpend ? 'w-[180px]' : 'w-0']"
  >
    <div
      class="absolute w-12 h-12 cursor-pointer -right-12 bg-red shadow-sidebar"
      @click="isOpend = !isOpend"
    >
      <MenuIcon class="text-white" />
    </div>
    <div class="absolute right-0 w-[180px] bg-red h-screen py-[108px] shadow-sidebar">
      <router-link
        :to="{ name: 'home' }"
        class="block p-[10px] text-lg text-pink"
      >
        習得能力
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { MenuIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuIcon
  },
  setup () {
    const isOpend = ref(true)

    return {
      isOpend
    }
  }
})
</script>

<style scoped>
.router-link-active {
  @apply bg-pink text-red;
}
</style>
