<template>
  <div class="relative flex-shrink-0 overflow-visible transition-all" :class="[isOpend ? 'w-[180px]' : 'w-0']">
    <div class="absolute w-12 h-12 cursor-pointer -right-12 bg-red shadow-sidebar" @click="isOpend = !isOpend">
      <MenuIcon class="text-white" />
    </div>
    <div class="flex flex-col absolute right-0 w-[180px] bg-red h-screen pt-20 pb-4 shadow-sidebar">
      <router-link :to="{ name: 'home' }" class="block p-[10px] text-lg text-pink hover:bg-red-light/30 transition">
        習得能力
      </router-link>
      <router-link
        v-if="!isLogined"
        :to="{ name: 'login' }"
        class="py-1.5 px-5 mx-4 rounded bg-white mt-auto hover:bg-gray-6 transition text-center"
        >登入</router-link
      >
      <button v-else class="py-1.5 px-5 mx-4 rounded bg-white mt-auto hover:bg-gray-6 transition" @click="logout">
        登出
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MenuIcon } from '@heroicons/vue/solid'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'Sidebar',
  components: {
    MenuIcon
  },
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()
    const { isLogined } = storeToRefs(authStore)

    const isOpend = ref(true)

    const logout = () => {
      authStore.logout()
      router.push({ name: 'login' })
    }

    return {
      isOpend,
      logout,
      isLogined
    }
  }
})
</script>

<style scoped>
.router-link-active {
  @apply bg-pink text-red;
}
</style>
