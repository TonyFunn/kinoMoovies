import { defineStore } from 'pinia'
// import { ref } from 'vue'

export const useMainStore = defineStore('mainStore', () => {

  const toggleColor = (value) => {
    if (value === 0) {
      return 'teal'
    }
    if (value === 1) {
      return 'blue'
    }
    if (value === 2) {
      return 'brown'
    }
    if (value === 3) {
      return 'indigo'
    }
    if (value === 4) {
      return 'blue-grey'
    }
  }


  return {
    // value,
    toggleColor
  }
})
