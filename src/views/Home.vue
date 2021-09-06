<template>
  <div
    class="container grid h-full max-w-[1190px] grid-cols-12 mx-auto gap-[30px] text-gray-1 px-[40px]"
  >
    <form class="col-span-4 py-[100px] flex flex-col gap-2 text-gray-2">
      <h1 class="text-xl text-gray-1">習得能力</h1>
      <p class="text-base">分析成大生最常使用的能力 TAG</p>
      <div>
        <label for="" class="block mb-2 text-blue-dark">系所</label>
        <input
          class="w-full bg-white border rounded-lg border-gray-5"
          type="text"
        />
      </div>
      <div class="mb-[42px]">
        <label for="graduate" class="block mb-2 text-blue-dark">系級</label>
        <select
          class="w-full bg-white border rounded-lg border-gray-5 "
          id="graduate"
        ></select>
      </div>
      <div>
        <h2 class="text-lg">學習類別</h2>
        <p class="text-sm font-light">*請至少選擇一個類別</p>
      </div>
      <div class="flex flex-wrap gap-x-[25px] gap-y-2">
        <label
          class="flex items-center gap-2"
          v-for="(chinese, type) in experienceTypes"
          :key="type"
        >
          <input
            class="border-2 rounded-[4px] border-gray-3 focus:ring-red focus:ring-offset-1 text-red"
            type="checkbox"
            :value="type"
          />
          <span>{{ chinese }}</span>
        </label>
      </div>
      <div class="flex justify-end gap-4 mt-auto">
        <button class="py-1.5 px-5 border rounded border-gray-4 bg-white">
          清空選項
        </button>
        <button class="py-1.5 px-5 border rounded border-red bg-red text-white">
          開始分析
        </button>
      </div>
    </form>
    <div class="col-start-6 col-end-13 pt-[100px] flex flex-col gap-y-[25px]">
      <div
        class="bg-white rounded-[10px] p-2.5 flex flex-col gap-y-2.5 items-center"
      >
        <div class="p-2.5 flex gap-x-2.5 items-center">
          <h2 class="text-lg">分析結果_參與類型性質</h2>
          <DocumentDownloadIcon class="w-[28px] h-[28px]" />
        </div>
        <div class="flex flex-wrap gap-x-[10px]">
          <div class="tag">管理學院</div>
          <div class="tag">工程學院</div>
          <div class="tag">理學院</div>
          <div class="tag">社會科學院</div>
        </div>
        <div class="w-[480px] h-[330px] bg-gray-4"></div>
        <div class="flex flex-col gap-y-[5px] text-base">
          <p>資料總數：80筆資料</p>
          <p>入學時間：110年</p>
          <p>學習類別：課程紀錄_工作坊、課程紀錄_密集課程、活動經驗</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-[10px]">
        <h2>透過TAG來了解學生們所建立的Portfolio</h2>
        <div class="flex flex-col gap-y-[5px]">
          <h3>學生最常使用之 TOP3</h3>
          <ul class="flex gap-x-[25px] gap-y-[10px] flex-wrap">
            <li class="rectangle-tag">分析能力｜50</li>
            <li class="rectangle-tag">資料視覺｜42</li>
            <li class="rectangle-tag">思考能力｜38</li>
          </ul>
        </div>
        <div class="flex flex-col gap-y-[5px]">
          <h3>學生們也使用了這些 TAG</h3>
          <ul class="flex gap-x-[25px] gap-y-[10px] flex-wrap">
            <li class="rectangle-tag">設計能力｜29</li>
            <li class="rectangle-tag">平面能力｜25</li>
            <li class="rectangle-tag">研究能力｜20</li>
            <li class="rectangle-tag">團隊溝通｜16</li>
            <li class="rectangle-tag">表達能力｜8</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { DocumentDownloadIcon } from '@heroicons/vue/outline'
import { useAuthStore } from '../stores/auth'

const experienceTypes = {
  course: '課程紀錄',
  experience: '活動經驗',
  competition: '競賽經驗',
  work: '工作經驗',
  certification: '外語能力或證照',
  other: '其他'
}

export default defineComponent({
  name: 'Home',
  components: {
    DocumentDownloadIcon
  },
  setup () {
    const authStore = useAuthStore()
    const { userName, isLogined } = storeToRefs(authStore)

    return {
      userName,
      isLogined,
      login: authStore.login,
      logout: authStore.logout,
      experienceTypes
    }
  }
})
</script>
