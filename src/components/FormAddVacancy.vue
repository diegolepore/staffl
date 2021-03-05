<template>
  <div class="sl-form">
    <form @submit.prevent="submitData" novalidate="true">
      <!-- Project Input -->
      <div
        class="sl-form__field"
        :class="{
          'sl-form__field--has-error': $v.formData.project.$invalid && $v.formData.project.$anyDirty
        }"
      >
        <div class="sl-form__field-icon sl-icon--bar"></div>
        <div class="sl-form__field-inner">
          <input type="text" v-model="$v.formData.$model.project" class="sl-form__field-input" id="project" required>
          <label class="sl-form__field-label" for="project">Project</label>
        </div>
      </div>

      <!-- Date Input -->
      <div class="sl-form__field sl-form__field--date">
        <div class="sl-form__field-icon sl-icon--date"></div>
        <div class="sl-form__field-inner">
          <input type="date" v-model="formData.date" class="sl-form__field-input" id="date" required>
          <label class="sl-form__field-label" for="date">Date</label>
        </div>
      </div>

      <!-- Email Input -->
      <div
        class="sl-form__field"
        :class="{
          'sl-form__field--has-error':  $v.formData.email.$invalid && $v.formData.email.$anyDirty
        }"
      >
        <div class="sl-form__field-icon sl-icon--email"></div>
        <div class="sl-form__field-inner">
          <input type="text" v-model="$v.formData.$model.email" class="sl-form__field-input" id="email" required>
          <label class="sl-form__field-label" for="email">Email</label>
        </div>
      </div>

      <!-- Clerance Checkbox -->
      <div class="sl-form__field sl-form__field--checkbox">
        <div class="sl-form__field-inner">
          <div class="sl-form__field-title">Clearance for</div>
          <input type="checkbox" v-model="formData.clearance" class="sl-form__field-input-checkbox" id="clearance">
          <label class="sl-form__field-label" for="clearance">All</label>
        </div>
      </div>

      <button type="button" class="sl-form__more-info-btn" @click="toggleAdditionalInfo">
        <span>{{ additionalInfoSigns }}</span>
        Additional informantion
      </button>

      <template v-if="isMoreInfoOpen">
        <!-- Additional info Textarea -->
        <div class="sl-form__field sl-form__field--textarea">
          <div class="sl-form__field-icon sl-icon--info"></div>
          <div class="sl-form__field-inner">
            <textarea type="text" v-model="formData.additionalInfo" class="sl-form__field-input" id="additionalInfo" required></textarea>
            <label class="sl-form__field-label" for="additionalInfo">Additional Staff Information</label>
          </div>
        </div>

        <!-- File input -->
        <div class="sl-form__field-file">
          <button @click="onPickFile" type="button" class="sl-button sl-button--flat sl-button--light">
            <span class="sl-button__icon sl-icon--plus"></span>
            Add Document
          </button>
          <input
            type="file"
            style="display: none"
            ref="fileInput"
            @change="onFileSelected"/>

          <div v-if="fileName" class="sl-form__field-file-info">
            <p>{{ fileName }}</p>
            <button @click="removeSelectedFile" class="sl-form__field-file-delete">Delete</button>
          </div>
        </div>
      </template>

      <!-- Submit button -->
      <button class="sl-form__submit-btn" type="submit" :disabled="$v.$invalid || isLoading">
        {{ isLoading ? 'Sending...' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'FormAddVacancy',

  setup () {
    return { $v: useVuelidate() }
  },

  data () {
    return {
      formData: {
        project: '',
        date: dayjs(Date.now()).format('YYYY-MM-DD'),
        email: '',
        clearance: false,
        additionalInfo: '',
        file: null
      },
      fileName: '',
      isMoreInfoOpen: false,
      isLoading: false
    }
  },

  validations () {
    return {
      formData: {
        project: { required, $autoDirty: true },
        email: { required, email, $autoDirty: true }
      }
    }
  },

  computed: {
    additionalInfoSigns () {
      return this.isMoreInfoOpen ? '-' : '+'
    }
  },

  methods: {
    ...mapActions('app', ['changeModalStatus']),

    toggleAdditionalInfo () {
      this.isMoreInfoOpen = !this.isMoreInfoOpen
    },

    onPickFile () {
      this.$refs.fileInput.click()
    },

    onFilePicked (event) {
      const files = event.target.files
      const filename = files[0].name
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.formData.file = files[0]
      this.fileName = filename
    },

    onFileSelected (event) {
      this.formData.file = event.target.files[0]
      this.fileName = event.target.files[0].name
    },

    removeSelectedFile () {
      this.formData.file = null
      this.fileName = ''
      this.$refs.fileInput.value = ''
    },

    async submitData () {
      this.isLoading = true
      try {
        const res = await this.axios.post(
          'https://jsonplaceholder.typicode.com/posts',
          this.formData,
          {
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }
        )
        // Log res data to the console
        console.log(res.data)
        this.isLoading = false
        alert('Form sent successfully!!')

        // Close modal after submit is successfull
        this.changeModalStatus({
          open: false,
          options: {
            componentName: ''
          }
        })
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sl-form {
  $parent: &;

  &__field {
    width: 100%;
    height: rem(50);
    padding: 0 0 0 rem(12);
    border-radius: 3px;
    border: 1px solid $gray-1;
    display: flex;
    align-items: center;
    position: relative;

    &:not(:last-child) {
      margin-bottom: rem(15);
    }

    &-icon {
      font-size: rem(12);
      margin-right: rem(10);
      font-weight: normal;

      &.sl-icon--email {
        font-size: rem(9);
      }
    }

    &-inner {
      width: 100%;
      height: 100%;
      position: relative;
    }

    &-label {
      position: absolute;
      left: 0;
      transition: all 0.3s ease;
      transform: translateY(14px);
    }

    &-title {
      transform: translateY(5px);
      font-size: rem(12);
      position: relative;
    }

    &-input {
      width: 100%;
      height: 100%;
      padding-top: 15px;
      font-weight: bold;

      &[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        margin: 0;
      }

      &:focus,
      &:valid {

        ~label {
          transform: translateY(5px);
          font-size: rem(12);
        }
      }

      &-checkbox {
        display: none;

        ~label {
          display: flex;
          cursor: pointer;

          &:before {
            font-family: 'stafflist-icons';
            content: '\e907';
            display: block;
            margin-right: rem(10);
          }
        }

        &:checked {
          ~label {
            &:before {
              font-family: 'stafflist-icons';
              content: '\e906';
              display: block;
            }
          }
        }
      }
    }

    &--date {
      width: 50%;
    }

    &--checkbox {
      height: rem(55);
    }

    &--textarea {
      align-items: initial;
      height: rem(112);

      #{$parent}__field-input {
        padding-top: rem(25);
      }

      #{$parent}__field-icon {
        position: relative;
        top: 17px;
      }
    }

    &-file {
      &-info {
        display: flex;
        justify-content: space-between;
        margin-top: rem(15);
        color: $gray-2;
      }

      &-delete {
        cursor: pointer;
        color: $gray-2;
        font-size: rem(16);
        transition: opacity 0.3s;

        &:hover {
          opacity: 0.5;
        }
      }
    }

    &--has-error {
      border-color: $error-red;
      #{$parent}__field-input,
      #{$parent}__field-label,
      #{$parent}__field-icon {
        color: $error-red;
      }

      &:after {
        font-family: 'stafflist-icons';
        content: '\e900';
        display: block;
        color: $error-red;
        margin-right: rem(12);
      }
    }
  }

  &__more-info-btn {
    color: $brand-blue;
    margin-bottom: rem(10);
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__submit-btn {
    display: block;
    margin: rem(50) auto 0 auto;
    height: rem(50);
    max-width: rem(260);
    width: 100%;
    background: $brand-green;
    border-radius: 3px;
    text-transform: uppercase;
    color: $white;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}
</style>
