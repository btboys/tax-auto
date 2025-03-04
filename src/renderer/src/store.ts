import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const currentPage = ref<string>('Accounts')

  /**
   * 设置页面
   * @param p
   */
  const setPage = (p: string): void => {
    currentPage.value = p
    console.log(p)
  }

  return { currentPage, setPage }
})
