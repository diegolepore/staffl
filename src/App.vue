<template>
  <div class="sl-container">
    <nav class="sl-nav">
      <div class="sl-logo">
        <span class="sl-icon--logo"></span>
      </div>
    </nav>
    <div class="sl-info-box">
      <h1 class="sl-info-box__title">Level Up. Go Stafflist.</h1>
      <p class="sl-info-box__body">
        An administration & collaboration tool -
        Stafflist is the intersectiong point of all the
        stakeholders in the staffing proccess
      </p>
      <div class="sl-info-box__actions">
        <button @click="openModal" type="button" class="sl-button">
          <span class="sl-button__icon sl-icon--bar"></span>
          Just Click me
        </button>
      </div>
    </div>

    <div class="sl-abstract-shape">
      <div class="sl-abstract-shape__sphere"></div>
      <div class="sl-abstract-shape__stain"></div>
    </div>
  </div>

  <ModalWrapper/>
</template>

<script>
import { mapActions } from 'vuex'
import ModalWrapper from './components/ModalWrapper.vue'

export default {
  name: 'App',
  components: {
    ModalWrapper
  },
  methods: {
    ...mapActions('app', ['changeModalStatus']),

    openModal () {
      this.changeModalStatus({
        open: true,
        options: {
          componentName: 'FormAddVacancy'
        }
      })
    }
  },
  mounted () {
    this.openModal()
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/main';
</style>
