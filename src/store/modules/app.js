export default {
  namespaced: true,

  state: {
    modalOpen: false,
    modalSettings: {
      componentName: '',
      props: {}
    }
  },

  mutations: {
    setModalsettings (state, payload) {
      state.modalSettings = payload
    },

    setModalStatus (state, payload) {
      state.modalOpen = payload
    }
  },

  actions: {
    changeModalStatus ({ commit }, payload) {
      const { open, options } = payload

      commit('setModalStatus', open)
      if (options) {
        commit('setModalsettings', options)
      }
    }
  },

  getters: {
    getAppItem (state) {
      return (key) => state[key]
    }
  }
}
