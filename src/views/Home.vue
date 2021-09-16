<template>
  <div class="container grid h-full max-w-[1190px] grid-cols-12 mx-auto gap-[30px] text-gray-1 px-[40px]">
    <form class="col-span-4 py-[100px] flex flex-col gap-2 text-gray-2" @submit.prevent="handleAnalyze">
      <h1 class="text-xl text-gray-1">習得能力</h1>
      <p class="text-base">分析成大生最常使用的能力 TAG</p>
      <div>
        <label @click="openFilterModal" class="block mb-2 text-blue-dark"
          >系所<span class="ml-2 text-sm text-red-light">{{ formError.departments }}</span></label
        >
        <div
          class="w-full h-[42px] bg-white border rounded-lg border-gray-5 cursor-pointer p-2"
          @click="openFilterModal"
        >
          {{ totalSelectedNumber ? `已選系所數：${totalSelectedNumber}` : '' }}
        </div>
      </div>
      <div class="mb-[42px]">
        <label for="graduate" class="block mb-2 text-blue-dark">系級</label>
        <select class="w-full bg-white border rounded-lg border-gray-5 " id="graduate">
          <option v-for="semester in semesters" :key="semester">{{ semester }}</option>
        </select>
      </div>
      <div>
        <h2 class="text-lg">學習類別<span class="ml-2 text-sm text-red-light">{{ formError.categories }}</span></h2>
        <p class="text-sm font-light">*請至少選擇一個類別</p>
      </div>
      <div class="flex flex-wrap gap-x-[25px] gap-y-2">
        <label class="flex items-center gap-2" v-for="(chinese, type) in experienceTypes" :key="type">
          <input
            class="border-2 rounded-[4px] border-gray-3 focus:ring-red focus:ring-offset-1 text-red checkbox-outline"
            type="checkbox"
            v-model="formData.categories"
            :value="type"
            :name="experienceTypes"
          />
          <span>{{ chinese }}</span>
        </label>
      </div>
      <div class="flex justify-end gap-4 mt-auto">
        <button class="py-1.5 px-5 border rounded border-gray-4 bg-white">
          清空選項
        </button>
        <button class="py-1.5 px-5 border rounded border-red bg-red text-white" type="submit">
          開始分析
        </button>
      </div>
    </form>
    <div class="col-start-6 col-end-13 pt-[100px] flex flex-col gap-y-[25px]">
      <div class="bg-white rounded-[10px] p-2.5 flex flex-col gap-y-2.5 items-center">
        <div class="p-2.5 flex gap-x-2.5 items-center">
          <h2 class="text-lg">分析結果_參與類型性質</h2>
          <DocumentDownloadIcon class="w-[28px] h-[28px]" />
        </div>
        <div class="flex flex-wrap gap-x-[10px]">
          <div class="tag" v-for="department in analysisResult.departments" :key="department">{{ department.text || department }}</div>
        </div>
        <div class="w-[480px] h-[330px] bg-gray-4 overflow-auto">
          <ul class="overflow-auto">
            <li v-for="exp in analysisResult.experiences" :key="exp.name">{{ exp.name }} - {{ exp.count }}</li>
          </ul>
        </div>
        <div class="flex flex-col gap-y-[5px] text-base">
          <p>資料總數：{{ analysisResult.totalCount }}筆資料</p>
          <p>入學時間：{{ analysisResult.enrollYear }}年</p>
          <p>學習類別：{{ analysisResult.categories.map(category => experienceTypes[category]).join('、') }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-[10px]">
        <h2>透過TAG來了解學生們所建立的Portfolio</h2>
        <div class="flex flex-col gap-y-[5px]">
          <h3>學生最常使用之 TOP3</h3>
          <ul class="flex gap-x-[25px] gap-y-[10px] flex-wrap">
            <li class="rectangle-tag" v-for="tag in analysisResult.mostUsedTags.slice(0, 3)" :key="tag">{{tag.name}}｜{{tag.count}}</li>
          </ul>
        </div>
        <div class="flex flex-col gap-y-[5px]">
          <h3>學生們也使用了這些 TAG</h3>
          <ul class="flex gap-x-[25px] gap-y-[10px] flex-wrap">
            <li class="rectangle-tag" v-for="tag in analysisResult.mostUsedTags.slice(3)" :key="tag">{{tag.name}}｜{{tag.count}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <FilterModal
    @close="showFilterModal = false"
    :showFilterModal="showFilterModal"
    @update:colleges="handleUpdateColleges"
    @update:departments="handleUpdateDepartments"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { DocumentDownloadIcon } from '@heroicons/vue/outline'
import FilterModal from '@/components/FilterModal.vue'
import { ExperienceTypes } from '@/types/experience.type'
import { analyze } from '@/api/analyze'

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
    DocumentDownloadIcon,
    FilterModal
  },
  setup () {
    const mostUsedTags = ref([])

    // ===== 儲存modal狀態 =====
    const showFilterModal = ref(false)
    const openFilterModal = () => {
      showFilterModal.value = true
    }

    // ===== 儲存表單資料 =====
    const formData = reactive({
      colleges: {
        bachelor: [] as string[],
        master: [] as string[]
      },
      departments: [] as {text: string, value: string}[],
      categories: [] as ExperienceTypes[]
    })
    const formError = reactive({
      departments: null,
      categories: null
    })

    // ===== 更新系所資料 =====
    const handleUpdateColleges = (payload: { bachelor: string[]; master: string[] }) => {
      formData.colleges = payload
    }
    const handleUpdateDepartments = (payload: {text: string, value: string}[]) => {
      formData.departments = payload
    }
    const totalSelectedNumber = computed(() => {
      return formData.colleges.bachelor.length + formData.colleges.master.length + formData.departments.length
    })

    // ===== 更新錯誤訊息 =====
    watch(totalSelectedNumber, val => {
      formError.departments = val ? null : '請至少選擇一個系所'
    })
    watch(
      () => formData.categories,
      categories => {
        formError.categories = categories.length ? null : '請至少選擇一個類別'
      }
    )

    // ===== 產生系級選項 =====
    const year = new Date().getFullYear() - 1911
    const semesters = [...Array(10).keys()].map((_, i) => `${year - i}`)

    // ===== 表單送出 =====
    const analysisResult = reactive({
      experiences: [],
      mostUsedTags: [],
      departments: [],
      totalCount: 0,
      enrollYear: '110',
      categories: []
    })
    const handleAnalyze = async () => {
      if (!formData.colleges.bachelor.length && !formData.colleges.master.length && !formData.departments.length) {
        formError.departments = '請至少選擇一個系所'
      }
      if (!formData.categories.length) {
        formError.categories = '請至少選擇一個'
      }
      if (formError.departments || formError.categories) return

      const { data } = await analyze({
        ...formData,
        departments: formData.departments.map(dept => dept.value)
      })
      console.log(data)
      analysisResult.experiences = data.experiences
      analysisResult.mostUsedTags = data.tags.slice(0, 8)
      analysisResult.totalCount = data.experiences.length
      analysisResult.departments = [...formData.colleges.bachelor, ...formData.colleges.master, ...formData.departments]
      analysisResult.categories = [...formData.categories]
    }

    return {
      experienceTypes,
      showFilterModal,
      openFilterModal,
      formData,
      formError,
      handleUpdateColleges,
      handleUpdateDepartments,
      totalSelectedNumber,
      semesters,
      analysisResult,
      handleAnalyze,
      mostUsedTags
    }
  }
})
</script>
