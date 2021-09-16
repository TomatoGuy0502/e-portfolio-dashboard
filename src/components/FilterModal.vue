<template>
  <teleport to="#app">
    <div
      class="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-2 bg-opacity-30"
      @mousedown.self="$emit('close')"
      v-show="showFilterModal"
    >
      <div class="bg-white rounded-[10px] pt-[15px] pb-[10px] w-[560px] flex flex-col gap-[15px] text-gray-1">
        <div class="px-2">
          <p class="mb-[5px]">已選擇系所：</p>
          <ul class="flex flex-wrap gap-x-[10px] gap-y-2 min-h-[34px]">
            <li
              class="inline-block px-2 py-1 text-base rounded-full bg-gray-6 text-blue-dark list-complete-item"
              v-for="opts in selectedColleges['bachelor']"
              :key="opts"
            >
              {{ opts }}(學)
            </li>
            <li
              class="inline-block px-2 py-1 text-base rounded-full bg-gray-6 text-blue-dark list-complete-item"
              v-for="opts in selectedColleges['master']"
              :key="opts"
            >
              {{ opts }}(碩)
            </li>
            <li
              class="inline-block px-2 py-1 text-base rounded-full bg-gray-6 text-blue-dark list-complete-item"
              v-for="opts in selectedDepartments"
              :key="opts"
            >
              {{ opts.text }}
            </li>
          </ul>
        </div>
        <div class="h-[300px] border-t-[1px] border-b-[1px] border-gray-5 flex">
          <ul class="w-40">
            <li class="flex items-center justify-between p-2 hover:bg-gray-5" :class="{'bg-gray-5': showingDegree === 'bachelor'}" @click="handleChangeDegree('bachelor')">
              <label for="college" class="flex items-center gap-2 py-1 cursor-pointer"
                ><input
                  type="checkbox"
                  id="college"
                  class="border-2 rounded-[4px] border-gray-3 checkbox-outline text-red h-[18px] w-[18px]"
                  @change="toggleAllColleges('bachelor', $event.target.checked)"
                />大學</label
              >
              <ChevronRightIcon class="w-5 h-5" />
            </li>
            <li class="flex items-center justify-between p-2 hover:bg-gray-5" :class="{'bg-gray-5': showingDegree === 'master'}" @click="handleChangeDegree('master')">
              <label for="master" class="flex items-center gap-2 py-1 cursor-pointer"
                ><input
                  type="checkbox"
                  id="master"
                  class="border-2 rounded-[4px] border-gray-3 checkbox-outline text-red h-[18px] w-[18px]"
                  @change="toggleAllColleges('master', $event.target.checked)"
                />碩士</label
              >
              <ChevronRightIcon class="w-5 h-5" />
            </li>
          </ul>
          <ul class="flex-1 overflow-y-auto">
            <Disclosure v-slot="{ open }" as="li" v-for="(departments, college) in showingOptions" :key="college">
              <DisclosureButton
                class="flex items-center justify-between p-2 hover:bg-gray-5 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                as="div"
              >
                <label :for="college" class="flex items-center gap-2 py-1 cursor-pointer" @click.stop
                  ><input
                    type="checkbox"
                    :id="college"
                    :value="college"
                    v-model="selectedColleges[showingDegree]"
                    @change="uncheckChildOptions(college)"
                    class="border-2 rounded-[4px] border-gray-3 checkbox-outline text-red h-[18px] w-[18px]"
                    :class="{
                      'text-gray-3 display-partial-checked':
                        collegesCheckedStatus[showingDegree][college].someChildrenAreChecked
                    }"
                  />{{ college }}</label
                >
                <ChevronUpIcon :class="open ? 'transform rotate-180' : ''" class="w-5 h-5" />
              </DisclosureButton>
              <DisclosurePanel as="ul" static v-show="open">
                <li
                  class="p-2 pl-8 hover:bg-gray-5"
                  v-for="department in departments"
                  :key="department.value"
                  :class="{
                    'cursor-not-allowed': collegesCheckedStatus[showingDegree][college].collegeIsChecked
                  }"
                >
                  <label
                    :for="department.value"
                    class="flex items-center gap-2 py-1 cursor-pointer"
                    :class="{
                      'cursor-not-allowed': collegesCheckedStatus[showingDegree][college].collegeIsChecked
                    }"
                    ><input
                      type="checkbox"
                      :id="department.value"
                      :value="department"
                      :disabled="collegesCheckedStatus[showingDegree][college].collegeIsChecked"
                      v-model="selectedDepartments"
                      @keydown.stop
                      class="border-2 rounded-[4px] border-gray-3 checkbox-outline text-red h-[18px] w-[18px]"
                      :class="{
                        'text-gray-3 cursor-not-allowed display-checked':
                          collegesCheckedStatus[showingDegree][college].collegeIsChecked
                      }"
                    />{{ department.text }}</label
                  >
                </li>
              </DisclosurePanel>
            </Disclosure>
          </ul>
        </div>
        <div class="px-[10px] flex justify-end">
          <button class="py-1.5 px-5 border rounded border-red bg-red text-white" @click="cofirmChoice">
            確認
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, Ref, ref, watch } from 'vue'
import { ChevronRightIcon, ChevronUpIcon } from '@heroicons/vue/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

const collegesOfUniverity: Colleges = {
  文學院: [
    { text: '中文系', value: 'B1' },
    { text: '外文系', value: 'B2' },
    { text: '歷史系', value: 'B3' },
    { text: '台文系', value: 'B5' }
  ],
  理學院: [
    { text: '數學系', value: 'C1' },
    { text: '物理系', value: 'C2' },
    { text: '化學系', value: 'C3' },
    { text: '地科系', value: 'C4' },
    { text: '理學院學士班', value: 'CZ' },
    { text: '光電系', value: 'F8' }
  ],
  管理學院: [],
  工學院: [],
  電機資訊學院: [],
  社會科學學院: [],
  規劃與設計學院: [],
  生物科學與科技學院: [],
  醫學院: [],
  敏求智慧運算學院: []
}
const collegesOfGraduateSchool: Colleges = {
  社會科學學院: [],
  規劃與設計學院: [],
  生物科學與科技學院: [],
  醫學院: [],
  敏求智慧運算學院: []
}
const collegesList = {
  bachelor: {
    文學院: [
      { text: '中文系', value: 'B1' },
      { text: '外文系', value: 'B2' },
      { text: '歷史系', value: 'B3' },
      { text: '台文系', value: 'B5' }
    ],
    理學院: [
      { text: '數學系', value: 'C1' },
      { text: '物理系', value: 'C2' },
      { text: '化學系', value: 'C3' },
      { text: '地科系', value: 'C4' },
      { text: '理學院學士班', value: 'CZ' },
      { text: '光電系', value: 'F8' }
    ],
    管理學院: [],
    工學院: [],
    電機資訊學院: [],
    社會科學學院: [],
    規劃與設計學院: [],
    生物科學與科技學院: [],
    醫學院: [],
    敏求智慧運算學院: []
  } as Colleges,
  master: {
    社會科學學院: [],
    規劃與設計學院: [],
    生物科學與科技學院: [],
    醫學院: [],
    敏求智慧運算學院: []
  } as Colleges
}

type Degree = 'bachelor' | 'master'
interface Colleges {
  [x: string]: FilterOption[]
}
interface FilterOption {
  text: string
  value: string
}

export default defineComponent({
  name: 'FilterModal',
  components: {
    ChevronRightIcon,
    ChevronUpIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  },
  props: {
    showFilterModal: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'cofirm', 'update:colleges', 'update:departments'],
  setup (props, { emit }) {
    // ===== 顯示大學 / 碩士選項 =====
    const showingDegree = ref('bachelor') as Ref<Degree>
    const showingOptions = computed(() => {
      return collegesList[showingDegree.value]
    })
    const handleChangeDegree = (degree: Degree) => {
      showingDegree.value = degree
    }

    // ===== 儲存被選中的選項 =====
    const selectedColleges = reactive({
      bachelor: [] as string[],
      master: [] as string[]
    })
    const selectedDepartments = ref([]) as Ref<FilterOption[]>

    watch(selectedColleges, (val) => {
      emit('update:colleges', val)
    })
    watch(selectedDepartments, (val) => {
      emit('update:departments', val)
    })

    /**
     * 勾選學院時，把底下的系所都取消選取
     */
    const uncheckChildOptions = (college: string) => {
      for (const department of collegesList[showingDegree.value][college]) {
        const index = selectedDepartments.value.findIndex(dep => dep.value === department.value)
        if (index > -1) {
          selectedDepartments.value.splice(index, 1)
        }
      }
    }

    /**
     * 選取 / 取消所有學院
     */
    const toggleAllColleges = (degree: Degree, isToggleOn: boolean) => {
      selectedColleges[degree].length = 0
      if (!isToggleOn) return
      for (const college in collegesList[degree]) {
        selectedColleges[degree].push(college)
      }
    }

    /**
     * 紀錄學院是否被勾選 & 學院下的系所是否被勾選
     */
    const collegesCheckedStatus = computed(() => {
      const obj = {
        bachelor: {} as { [x: string]: { someChildrenAreChecked?: Boolean; collegeIsChecked?: Boolean } },
        master: {} as { [x: string]: { someChildrenAreChecked?: Boolean; collegeIsChecked?: Boolean } }
      }
      ;['bachelor', 'master'].forEach((degree: Degree) => {
        for (const college in collegesList[degree]) {
          obj[degree][college] = {}
          obj[degree][college].someChildrenAreChecked = selectedDepartments.value.some(opt => {
            return collegesList[degree][college].some((department: FilterOption) => department.value === opt.value)
          })
          obj[degree][college].collegeIsChecked = !!selectedColleges[degree].find(opt => opt === college)
        }
      })
      return obj
    })

    // ===== 確認選項 =====
    const cofirmChoice = () => {
      emit('close')
      emit('cofirm', {
        colleges: selectedColleges,
        departments: selectedDepartments.value.map(dept => dept.value)
      })
    }

    return {
      showingDegree,
      showingOptions,
      handleChangeDegree,
      selectedColleges,
      selectedDepartments,
      uncheckChildOptions,
      toggleAllColleges,
      collegesCheckedStatus,
      cofirmChoice
    }
  }
})
</script>

<style scoped>
.display-checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
  @apply bg-current border-transparent;
}
.display-partial-checked {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M18 12H6' /%3E%3C/svg%3E");
  @apply bg-current border-transparent;
}
</style>
