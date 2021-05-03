import { reactive, toRefs } from 'vue'

export const countMethod = () => {
  const state = reactive({
    count: 0
  })

  const incrementBy = (x) => {
    state.count += x
  }

  const decrementBy = (x) => {
    if (state.count - x >= 0) {
      state.count -= x
    }
  }

  return {
    ...toRefs(state),
    incrementBy,
    decrementBy
  }
}
