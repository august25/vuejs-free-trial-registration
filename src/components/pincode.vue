<template>
  <div class="overlay-box">
    <h1>Check your email.</h1>
    <div class="pincode-text">
      <h4>We just sent you a 5 digit code to unlock your free account. (any code works)</h4>
    </div>
    <div class="pincode-grid">
      <input
        type="text"
        @input="pinUpdated"
        :class="{ 'invalid': isPin1Valid === 0 }"
        v-model="pin1"
        ref="pin1"
        maxlength="5"
        minlength="1" />
      <input
        type="text"
        @input="pinUpdated"
        :class="{ 'invalid': isPin2Valid === 0 }"
        @keyup.backspace="gotoInput($refs.pin1)"
        v-model="pin2"
        ref="pin2"
        maxlength="1"
        minlength="1" />
      <input
        type="text"
        @input="pinUpdated"
        :class="{ 'invalid': isPin3Valid === 0 }"
        @keyup.backspace="gotoInput($refs.pin2)"
        v-model="pin3"
        ref="pin3"
        maxlength="1"
        minlength="1" />
      <input
        type="text"
        @input="pinUpdated"
        :class="{ 'invalid': isPin4Valid === 0 }"
        @keyup.backspace="gotoInput($refs.pin3)"
        v-model="pin4"
        ref="pin4"
        maxlength="1"
        minlength="1" />
      <input
        type="text"
        @input="pinUpdated"
        :class="{ 'invalid': isPin5Valid === 0 }"
        @keyup.backspace="gotoInput($refs.pin4)"
        v-model="pin5"
        ref="pin5"
        maxlength="1"
        minlength="1" />
    </div>
    <h4 v-if="!hasResent">
      Didn't receive an email? <a href="javascript:void(0)" @click="resendEmail(email)">Resend code</a>
    </h4>
    <h4 v-if="hasResent">
      Your activation code has been resent to {{ email }}
    </h4>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Pincode',
  data () {
    return {
      hasResent: false
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.formValues.email.value
      }
    },
    pin1: {
      get () {
        return this.$store.state.formValues.pin.pin1.value
      },
      set (val) {
        this.$store.commit('formValues/setPin1Value', val)
      }
    },
    pin2: {
      get () {
        return this.$store.state.formValues.pin.pin2.value
      },
      set (val) {
        this.$store.commit('formValues/setPin2Value', val)
      }
    },
    pin3: {
      get () {
        return this.$store.state.formValues.pin.pin3.value
      },
      set (val) {
        this.$store.commit('formValues/setPin3Value', val)
      }
    },
    pin4: {
      get () {
        return this.$store.state.formValues.pin.pin4.value
      },
      set (val) {
        this.$store.commit('formValues/setPin4Value', val)
      }
    },
    pin5: {
      get () {
        return this.$store.state.formValues.pin.pin5.value
      },
      set (val) {
        this.$store.commit('formValues/setPin5Value', val)
      }
    },
    isPin1Valid: {
      get () {
        return this.$store.state.formValues.pin.pin1.valid
      }
    },
    isPin2Valid: {
      get () {
        return this.$store.state.formValues.pin.pin2.valid
      }
    },
    isPin3Valid: {
      get () {
        return this.$store.state.formValues.pin.pin3.valid
      }
    },
    isPin4Valid: {
      get () {
        return this.$store.state.formValues.pin.pin4.valid
      }
    },
    isPin5Valid: {
      get () {
        return this.$store.state.formValues.pin.pin5.valid
      }
    }
  },
  methods: {
    setFocus () {
      this.$nextTick(() => {
        this.$refs.pin1.focus({
          preventScroll: true
        })
      })
    },
    gotoInput (input) {
      input.focus({
        preventScroll: true
      })
    },
    resendEmail (email) {
      this.hasResent = true
      this.$emit('send-email', email)
    },
    pinUpdated () {
      if (this.pin1.length > 1) {
        this.pin5 = this.pin1.length > 4 ? this.pin1.charAt(4) : undefined
        this.pin4 = this.pin1.length > 3 ? this.pin1.charAt(3) : undefined
        this.pin3 = this.pin1.length > 2 ? this.pin1.charAt(2) : undefined
        this.pin2 = this.pin1.length > 1 ? this.pin1.charAt(1) : undefined
        this.pin1 = this.pin1.charAt(0)
      }
      if (this.pin1 && this.pin1.length === 1) {
        this.$refs.pin2.focus()
        if (this.pin2 && this.pin2.length === 1) {
          this.$refs.pin3.focus()
          if (this.pin3 && this.pin3.length === 1) {
            this.$refs.pin4.focus()
            if (this.pin4 && this.pin4.length === 1) {
              this.$refs.pin5.focus()
              if (this.pin5) {
                this.$nextTick(() => {
                  this.pinEntered(`${this.pin1}${this.pin2}${this.pin3}${this.pin4}${this.pin5}`)
                })
              }
            }
          }
        }
      }
    },
    pinEntered (pincode) {
      // Used for demo purposes
      this.$emit('retrieved-token', 'dummy_jwt_token')
      // axios.post('/api/signin', {
      //   email: this.email,
      //   pincode: pincode
      // }).then(function (response) {
      //   if (response.data.success === true) {
      //     this.$emit('retrieved-token', 'dummy_jwt_token')
      //   }
      // }.bind(this)).catch(function (error) {
      //   console.log(error)
      // })
    }
  }
}
</script>

<style lang="sass" scoped>
@keyframes shake-dark
  10%, 90%
    transform: translate3d(-1px, 0, 0)
    border: 1px solid #333
    background: #000
  20%, 80%
    transform: translate3d(2px, 0, 0)
    border: 1px solid #333
    background: #000
  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)
    border: 1px solid #333
    background: #000
  40%, 60%
    transform: translate3d(4px, 0, 0)
    border: 1px solid #333
    background: #000
.pincode-text
  width: 80%
  max-width: 410px
  text-align: center
.pincode-grid
  width: 60%
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  grid-column-gap: 20px
  margin: 40px 0px
  max-width: 1000px
.pincode-grid
  input
    background: transparent
    text-transform: uppercase
    border: 1px solid #CCC
    border-radius: 40px
    font-size: 60px
    text-align: center
    color: #FFF
    padding: 60px 20px
    &.invalid
      animation: shake-dark 0.82s cubic-bezier(.36,.07,.19,.97) both
      transform: translate3d(0, 0, 0)
h3, h4
  line-height: 20px
  margin: 0px
@media (max-width: 500px)
  .pincode-grid
    width: 80%
    grid-column-gap: 5px
  .pincode-grid input
    font-size: 20px
    padding: 20px 0px
</style>
