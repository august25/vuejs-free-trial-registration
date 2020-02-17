<template>
  <div class="page">
    <div class="page-form">
      <h1>Grow your business.</h1>
      <h3>A few more steps to your free trial.</h3>
      <input
        type="text"
        placeholder="First Name"
        autocomplete="user-info-first-name"
        v-model="firstName"
        @keyup.enter="next"
        ref="firstName"
        :class="{ 'invalid': !isFirstNameValid && showErrors }"
        :disabled="disabled" />
      <input
        type="text"
        placeholder="Last Name"
        autocomplete="user-info-last-name"
        v-model="lastName"
        @keyup.enter="next"
        ref="lastName"
        :class="{ 'invalid': !isLastNameValid && showErrors }"
        :disabled="disabled" />
      <input
        type="password"
        placeholder="Password"
        autocomplete="user-info-password"
        v-model="password"
        @keyup.enter="next"
        ref="password"
        :class="{ 'invalid': !isPasswordValid && showErrors }"
        :disabled="disabled" />
      <p class="input-description">
        Passwords must be at least 6 characters long.
      </p>
      <button
        @click="next"
        ref="nextButton"
        :disabled="disabled">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoForm',
  data () {
    return {
      showErrors: false
    }
  },
  computed: {
    firstName: {
      get () {
        return this.$store.state.formValues.firstName.value
      },
      set (val) {
        this.$store.commit('formValues/setFirstNameValue', val)
      }
    },
    lastName: {
      get () {
        return this.$store.state.formValues.lastName.value
      },
      set (val) {
        this.$store.commit('formValues/setLastNameValue', val)
      }
    },
    password: {
      get () {
        return this.$store.state.formValues.password.value
      },
      set (val) {
        this.$store.commit('formValues/setPasswordValue', val)
      }
    },
    isFirstNameValid: {
      get () {
        return this.$store.state.formValues.firstName.valid
      }
    },
    isLastNameValid: {
      get () {
        return this.$store.state.formValues.lastName.valid
      }
    },
    isPasswordValid: {
      get () {
        return this.$store.state.formValues.password.valid
      }
    }
  },
  watch: {
    lastName (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.firstName.focus()
      }
    },
    password (newVal, oldVal) {
      if (oldVal.length > 0 && newVal.length === 0) {
        this.$refs.lastName.focus()
      }
    }
  },
  props: [
    'disabled'
  ],
  methods: {
    setFocus () {
      setTimeout(() => {
        this.$refs.firstName.focus({
          preventScroll: true
        })
      }, 100)
    },
    next () {
      this.showErrors = false
      if (this.isFirstNameValid && this.isLastNameValid && this.isPasswordValid) {
        console.log(this.isPasswordValid)
        this.$emit('next')
      } else {
        setTimeout(() => {
          this.showErrors = true
          if (!this.isFirstNameValid) {
            this.$refs.firstName.focus({
              preventScroll: true
            })
          } else if (!this.isLastNameValid) {
            this.$refs.lastName.focus({
              preventScroll: true
            })
          } else if (!this.isPasswordValid) {
            this.$refs.password.focus({
              preventScroll: true
            })
          }
        }, 100)
      }
    }
  }
}
</script>
