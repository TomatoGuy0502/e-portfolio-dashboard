<template>
  <div class="flex items-center justify-center h-screen">
    <form class="flex flex-col gap-6 w-[350px] bg-white p-8 rounded-lg shadow-md" @submit.prevent="handleSubmit">
      <h2 class="text-lg font-bold text-center">
        使用者登入
      </h2>
      <div>
        <label for="userId" class="block mb-2">帳號</label>
        <input
          id="userId"
          v-model="authData.userId"
          type="text"
          class="w-full border-gray-300 rounded-md shadow-sm text-gray-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          pattern="[a-zA-Z0-9]{8,}"
          title="請輸入8位以上英數字"
        />
      </div>
      <div>
        <label for="password" class="block mb-2">密碼</label>
        <input
          id="password"
          v-model="authData.password"
          type="password"
          class="w-full border-gray-300 rounded-md shadow-sm text-gray-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
          pattern="[a-zA-Z0-9#]{8,}"
          title="請輸入8位以上英數字"
        />
      </div>
      <p v-if="error">
        登入失敗，請重新嘗試
      </p>
      <button class="py-1.5 px-5 border rounded-md shadow-sm bg-red text-white hover:bg-red/80 transition" :disabled="isPending" type="submit">
        {{ isPending ? '登入中' : '登入' }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'Login',
  setup () {
    const router = useRouter()
    const authStore = useAuthStore()
    const { error, isPending } = storeToRefs(authStore)

    const authData = reactive({
      userId: '',
      password: ''
    })

    const handleSubmit = async () => {
      if (isPending.value) {
        return
      }
      await authStore.login(authData)
      if (!error.value) {
        router.push({ name: 'home' })
      }
    }

    return { authData, handleSubmit, error, isPending }
  }
})
</script>

<style></style>
