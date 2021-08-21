<template>
  <router-link
    to="/about"
    class="inline-block px-6 py-4 mb-4 font-semibold text-white bg-blue-600 rounded-md"
    >Next Page</router-link
  >
  <div class="flex flex-col items-center gap-4">
    <button
      v-if="isLogined"
      class="flex items-center justify-center p-3 text-white bg-blue-500 rounded-md"
      @click="logout"
    >
      Log Out
    </button>
    <button
      v-else
      class="flex items-center justify-center p-3 text-white bg-blue-500 rounded-md"
      @click="login"
    >
      Login
    </button>
    <p>user: {{ userName }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'Home',
  setup () {
    const authStore = useAuthStore()
    const { userName, isLogined } = storeToRefs(authStore)
    
    return {
      userName,
      isLogined,
      login: authStore.login,
      logout: authStore.logout
    }
  }
})
</script>
