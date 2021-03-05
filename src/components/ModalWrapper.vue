<template>
  <div v-if="isOpen" class="sl-modal">
    <div class="sl-modal__content">
      <div class="sl-modal__content-header">
        <p class="sl-modal__content-header-title">Add Vacancy</p>
        <button class="sl-modal__content-header-close"  @click="closeModal">
          <span class="sl-icon--close"></span>
        </button>
      </div>
      <div class="sl-modal__content-body">
        <component :is="settings.componentName"></component>
      </div>
    </div>
    <div class="sl-modal__bg" @click="closeModal"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormAddVacancy from './FormAddVacancy'

export default {
  name: 'ModalWrapper',

  components: {
    FormAddVacancy
  },

  computed: {
    ...mapGetters('app', ['getAppItem']),

    isOpen () {
      return this.getAppItem('modalOpen')
    },

    settings () {
      return this.getAppItem('modalSettings')
    }
  },

  methods: {
    ...mapActions('app', ['changeModalStatus']),

    closeModal () {
      this.changeModalStatus({
        open: false,
        options: {
          componentName: ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sl-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  &__content {
    width: rem(400);
    position: relative;
    z-index: 2;
    max-width: 95%;
    top: rem(50);
    margin-bottom: rem(100);

    &-header,
    &-body {
      padding: rem(20);
      background: $white;
    }

    &-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $gray-1;
      color: $dark-blue;
      border-radius: 3px 3px 0 0;

      &-close {
        cursor: pointer;
        transition: all 0.3s ease;
        color: $dark-blue;

        &:hover {
          transform: rotate(90deg);
          opacity: 0.6;
        }
      }
    }

    &-body {
      padding-top: rem(30);
      padding-bottom: rem(50);
      overflow-y: auto;
      border-radius: 0 0 3px 3px;
    }
  }

  &__bg {
    position: fixed;
    background: $dark-blue;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
