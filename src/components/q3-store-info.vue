<template>
  <div class="page">
    <div class="page-form">
      <h1>Engage your customers.</h1>
      <h3>Two steps away from your free trial.</h3>
      <input
        type="text"
        placeholder="Store Name"
        autocomplete="store-info-name"
        v-model="storeName"
        @keyup.enter="next"
        ref="storeName"
        :class="{ 'invalid': !isStoreNameValid && showErrors }"
        :disabled="disabled" />
      <input
        type="text"
        class="postal-code"
        placeholder="Postal / Zipcode"
        autocomplete="store-info-postal"
        v-model="postalCode"
        @keyup.enter="next"
        ref="postalCode"
        :class="{ 'invalid': !isPostalCodeValid && showErrors }"
        :disabled="disabled" />
      <p class="input-description">Enter your postal code.</p>
      <div class="phone-cont">
        <input
          type="text"
          placeholder="(647)"
          autocomplete="store-info-phone-1"
          ref="phone1"
          numericOnly
          @keyup.enter="next"
          @keyup="phoneUpdated"
          maxlength="3"
          v-model="phoneNumber1"
          :class="{ 'invalid': !isPhoneNumber1Valid && showErrors }"
          :disabled="disabled" />
        <input
          type="text"
          placeholder="555"
          autocomplete="store-info-phone-2"
          ref="phone2"
          numericOnly
          @keyup.enter="next"
          @keyup="phoneUpdated"
          maxlength="3"
          v-model="phoneNumber2"
          :class="{ 'invalid': !isPhoneNumber2Valid && showErrors }"
          :disabled="disabled" />
        <input
          type="text"
          placeholder="5555"
          autocomplete="store-info-phone-3"
          ref="phone3"
          numericOnly
          @keyup.enter="next"
          @keyup="phoneUpdated"
          maxlength="4"
          v-model="phoneNumber3"
          :class="{ 'invalid': !isPhoneNumber3Valid && showErrors }"
          :disabled="disabled" />
      </div>
      <p class="input-description">
        Provide a contact number. (Optional)
      </p>
      <div class="buttons">
        <button
          @click="$emit('back')"
          ref="backButton"
          :disabled="disabled">
          <arrow-left />
        </button>
        <button
          @click="next"
          ref="nextButton"
          :disabled="disabled">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowLeft from 'vue-material-design-icons/ArrowLeft'
export default {
  name: 'StoreInfoForm',
  data () {
    return {
      showErrors: false
    }
  },
  computed: {
    storeName: {
      get () {
        return this.$store.state.formValues.storeName.value
      },
      set (val) {
        this.$store.commit('formValues/setStoreNameValue', val)
      }
    },
    postalCode: {
      get () {
        return this.$store.state.formValues.postalCode.value
      },
      set (val) {
        this.$store.commit('formValues/setPostalCodeValue', val)
      }
    },
    phoneNumber1: {
      get () {
        return this.$store.state.formValues.phoneNumber1.value
      },
      set (val) {
        this.$store.commit('formValues/setPhoneNumber1Value', val)
      }
    },
    phoneNumber2: {
      get () {
        return this.$store.state.formValues.phoneNumber2.value
      },
      set (val) {
        console.log(val)
        this.$store.commit('formValues/setPhoneNumber2Value', val)
      }
    },
    phoneNumber3: {
      get () {
        return this.$store.state.formValues.phoneNumber3.value
      },
      set (val) {
        this.$store.commit('formValues/setPhoneNumber3Value', val)
      }
    },
    isStoreNameValid: {
      get () {
        return this.$store.state.formValues.storeName.valid
      }
    },
    isPostalCodeValid: {
      get () {
        return this.$store.state.formValues.postalCode.valid
      }
    },
    isPhoneNumber1Valid: {
      get () {
        return this.$store.state.formValues.phoneNumber1.valid
      }
    },
    isPhoneNumber2Valid: {
      get () {
        return this.$store.state.formValues.phoneNumber2.valid
      }
    },
    isPhoneNumber3Valid: {
      get () {
        return this.$store.state.formValues.phoneNumber3.valid
      }
    }
  },
  watch: {
    storeName (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$emit('back')
      }
    },
    postalCode (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.storeName.focus()
      }
    },
    phoneNumber1 (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.postalCode.focus()
      }
    },
    phoneNumber2 (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.phone1.focus()
      }
    },
    phoneNumber3 (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.phone2.focus()
      }
    }
  },
  props: [
    'disabled'
  ],
  components: {
    ArrowLeft
  },
  methods: {
    setFocus () {
      setTimeout(() => {
        this.$refs.storeName.focus({
          preventScroll: true
        })
      }, 100)
    },
    phoneUpdated (ev) {
      if (ev.code === 'Backspace') {
        // console.log('valid value')
      } else {
        if (this.isPhoneNumber1Valid) {
          this.$refs.phone2.focus()

          if (this.isPhoneNumber2Valid) {
            this.$refs.phone3.focus()

            if (this.isPhoneNumber3Valid) {
              this.next()
            }
          }
        }
      }
    },
    prevInput (input) {
      if (input === this.$refs.pin2 && (!this.params.pin.pin2.value || this.params.pin.pin2.value.length === 0)) {
        this.params.pin.pin1.value = undefined
        this.$refs.pin1.focus()
      }

      if (input === this.$refs.pin3 && (!this.params.pin.pin3.value || this.params.pin.pin3.value.length === 0)) {
        this.params.pin.pin2.value = undefined
        this.$refs.pin2.focus()
      }

      if (input === this.$refs.pin4 && (!this.params.pin.pin4.value || this.params.pin.pin4.value.length === 0)) {
        this.params.pin.pin3.value = undefined
        this.$refs.pin3.focus()
      }

      if (input === this.$refs.pin5 && (!this.params.pin.pin5.value || this.params.pin.pin5.value.length === 0)) {
        this.params.pin.pin4.value = undefined
        this.$refs.pin4.focus()
      }

      if (input === this.$refs.phone2 && (!this.params.phoneNumber2.value || this.params.phoneNumber2.value.length === 0)) {
        this.$refs.phone1.focus()
      }

      if (input === this.$refs.phone3 && (!this.params.phoneNumber3.value || this.params.phoneNumber3.value.length === 0)) {
        this.$refs.phone2.focus()
      }
    },
    next () {
      this.showErrors = false
      if (this.isStoreNameValid && this.isPostalCodeValid && this.isPhoneNumber1Valid && this.isPhoneNumber2Valid && this.isPhoneNumber3Valid) {
        this.$emit('next')
      } else {
        setTimeout(() => {
          this.showErrors = true
          if (!this.isStoreNameValid) {
            this.$refs.storeName.focus({
              preventScroll: true
            })
          } else if (!this.isPostalCodeValid) {
            this.$refs.postalCode.focus({
              preventScroll: true
            })
          } else if (!this.isPhoneNumber1Valid) {
            this.$refs.phone1.focus({
              preventScroll: true
            })
          } else if (!this.isPhoneNumber2Valid) {
            this.$refs.phone2.focus({
              preventScroll: true
            })
          } else if (!this.isPhoneNumber3Valid) {
            this.$refs.phone3.focus({
              preventScroll: true
            })
          }
        }, 100)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.phone-cont
  display: grid
  grid-column-gap: 10px
  grid-template-columns: 1fr 1fr 1fr
.postal-code
  text-transform: uppercase
  &::-webkit-input-placeholder
     text-transform: none
  &:-moz-placeholder
     text-transform: none
  &::-moz-placeholder
     text-transform: none
  &:-ms-input-placeholder
     text-transform: none
</style>
