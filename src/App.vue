<template>
  <ModalWrapper/>

  <div class="sl-icon--attention"></div>
  <div class="sl-icon--close"></div>
  <div class="sl-icon--date"></div>
  <div class="sl-icon--email"></div>
  <div class="sl-icon--info"></div>
  <div class="sl-icon--plus"></div>
  <div class="sl-icon--checked"></div>
  <div class="sl-icon--uncheck"></div>
  <div class="sl-icon--bar"></div>
</template>

<script>
import ModalWrapper from './components/ModalWrapper.vue'

export default {
  name: 'App',
  components: {
    ModalWrapper
  }
}
</script>

<style lang="scss">
  @import 'assets/styles/main';
</style>
