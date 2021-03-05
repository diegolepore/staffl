import { createStore } from 'vuex'
import app from './modules/app'

const store = createStore({
  modules: {
    app
  }
})

export default store

// store.state.a // -> `moduleA`'s state
// store.state.b // -> `moduleB`'s state
