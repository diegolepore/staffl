<template>

  <!-- <div>
    <h1>{{ count }}</h1>
    <button @click="incrementBy(changeAmount)">Add</button>
    <br>
    <br>
    <button @click="decrementBy(changeAmount)">Remove</button>
    <br>
    <br>
    <input type="number" v-model.number="changeAmount">
  </div> -->

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

import { ref } from 'vue'

import { countMethod } from './features/addCount'

export default {
  name: 'App',
  components: {
    ModalWrapper
  },
  setup () {
    const { incrementBy, decrementBy, count } = countMethod()

    const changeAmount = ref(2)

    return {
      count,
      incrementBy,
      decrementBy,
      changeAmount
    }
  },
  methods: {
    ...mapActions('app', ['changeModalStatus']),

    openModal () {
      this.changeModalStatus({
        open: true,
        options: {
          componentName: 'FormAddVacancy',
          props: {
            test: 'Some test here!!'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/main';
</style>
