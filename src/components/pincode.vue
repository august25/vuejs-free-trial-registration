<template>
  <div class="overlay-box">
    <h1>Check your email.</h1>
    <div class="pincode-text">
      <h4>We just sent you a 5 digit code to unlock your free account. (any code works)</h4>
    </div>
    <div class="pincode-grid">
      <input
        v-for="(pin, pinIndex) in pinValues"
        :key="pinIndex"
        :class="{ 'invalid': !isPinValueValid(pinIndex) }"
        @input="focusNextPinInput(pinIndex)"
        @keyup.backspace="focusPrevPinInput(pinIndex)"
        v-model="pin.value"
        ref="pins"
        type="text"
        maxlength="1"
        minlength="1" />
    </div>
    <h4 v-if="!hasResent">
      Didn't receive an email? <a href="javascript:void(0)" @click="resendEmail(email)">Resend code</a>
    </h4>
    <h4 v-else>
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
      hasResent: false,
      pinValues: [
        {
          value: undefined,
          valid: false
        },
        {
          value: undefined,
          valid: false
        },
        {
          value: undefined,
          valid: false
        },
        {
          value: undefined,
          valid: false
        },
        {
          value: undefined,
          valid: false
        }
      ]
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.formValues.email.value
      }
    }
  },
  methods: {
    setFocus () {
      this.$nextTick(() => {
        this.gotoInput(0)
      })
    },
    isPinValueValid (currentPinInputIndex) {
      return this.pinValues[currentPinInputIndex].value && this.pinValues[currentPinInputIndex].value.length === 1
    },
    focusPrevPinInput (currentPinInputIndex) {
      const prevPinInputIndex = currentPinInputIndex - 1
      if (prevPinInputIndex > -1) {
        this.gotoInput(prevPinInputIndex)
      }
    },
    focusNextPinInput (currentPinInputIndex) {
      const nextPinInputIndex = currentPinInputIndex + 1
      if (nextPinInputIndex < this.pinValues.length) {
        this.gotoInput(currentPinInputIndex + 1)
      } else {
        this.submitPin()
      }
    },
    gotoInput (pinInputIndex) {
      this.$refs.pins[pinInputIndex].focus({
        preventScroll: true
      })
    },
    resendEmail (email) {
      this.hasResent = true
      this.$emit('send-email', email)
    },
    submitPin () {
      console.log(this.pinValues.reduce((accumulator, curPin) => {
        return accumulator + curPin.value
      }, ''))
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
