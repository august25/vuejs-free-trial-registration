<template>
  <div class="page">
    <div class="page-form">
      <h1>Know your customers. Build your brand.</h1>
      <h3>Begin with a free trial.</h3>
      <input
        type="text"
        placeholder="Enter your email"
        autocomplete="user-email"
        ref="email"
        v-model="email"
        @keyup.enter="next"
        :class="{ 'invalid': !isEmailValid && showErrors }"
        :disabled="disabled" />
      <p class="input-description">We'll send you an activation code to get started right away.</p>
      <button
        @click="next"
        ref="nextButton"
        :disabled="disabled">
        Create Free Account
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailForm',
  data () {
    return {
      showErrors: false
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.formValues.email.value
      },
      set (val) {
        this.$store.commit('formValues/setEmailValue', val)
      }
    },
    isEmailValid: {
      get () {
        return this.$store.state.formValues.email.valid
      }
    }
  },
  props: [
    'disabled'
  ],
  methods: {
    setFocus () {
      setTimeout(() => {
        this.$refs.email.focus({
          preventScroll: true
        })
      }, 100)
    },
    next () {
      this.showErrors = false
      if (this.isEmailValid) {
        this.$emit('send-email', this.email)
      } else {
        setTimeout(() => {
          console.log('show error')
          this.showErrors = true
          this.$refs.email.focus({
            preventScroll: true
          })
        }, 100)
      }
    }
  }
}
</script>
