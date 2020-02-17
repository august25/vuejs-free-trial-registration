<template>
  <div class="flex">
    <div class="left-side">
      <div class="page-cont" :style="{ 'transform': 'translateX(' + -100 * qIndex + '%)' }">
        <email-form
          :disabled="qIndex !== 0"
          v-show="qIndex - 1 === 0 || qIndex === 0"
          ref="emailForm"
          @next="next"
          @send-email="sendEmail" />
        <user-info-form
          :disabled="qIndex !== 1"
          v-show="qIndex - 1 === 1 || qIndex === 1"
          ref="userInfoForm"
          @next="next" />
        <store-info-form
          :disabled="qIndex !== 2"
          v-show="qIndex - 1 === 2 || qIndex === 2 || qIndex + 1 === 2"
          ref="storeInfoForm"
          @next="next"
          @back="back" />
        <locations-info-form
          :disabled="qIndex !== 3"
          v-show="qIndex - 1 === 3 || qIndex === 3 || qIndex + 1 === 3"
          ref="locationsInfoForm"
          @next="next"
          @back="back" />
        <thank-you
          v-show="qIndex - 1 === 4 || qIndex === 4" />
      </div>
    </div>
    <div class="right-side">
      <div class="page-cont" :style="{ 'transform': 'translateX(' + -100 * qIndex + '%)' }">
        <right-content
          blurb="The simple appreciation of work well done." />
        <right-content
          blurb="Know your customers." />
        <right-content
          blurb="We honour your craft." />
        <right-content
          blurb="The true joy of doing what you love." />
      </div>
    </div>
    <transition name="fade">
      <div class="overlay-bg" v-if="hasPopup"></div>
    </transition>
    <transition name="fade">
      <pincode
        @send-email="sendEmail"
        @retrieved-token="retrievedToken"
        ref="pincode"
        v-if="showPinRequest" />
    </transition>
    <transition name="fade">
      <popup
        v-if="showAccountError"
        headline="Already registered."
        line1="Looks like you've already registered with us. Would you like to <a href='/'>try another email?</a>"
        line2="If you know your account, you can <a href='/login' target='_blank'>login here</a>" />
    </transition>
    <transition name="fade">
      <popup
        v-if="showRegistrationRequest"
        headline="It's almost ready!"
        line1="Please wait as we create your account"
        line2="If you are experiencing long wait times please refresh and try again."
        :spinner="true" />
      <popup
        v-if="showRegistrationError"
        headline="Oops we couldn't set you up!"
        line1="It looks like that email or company name has already been registered."
        line2="You can try a different company name or enter a <a href='/'>different email address</a>." />
    </transition>
  </div>
</template>

<script>
// import axios from 'axios'
import EmailForm from './components/q1-email'
import UserInfoForm from './components/q2-user-info'
import StoreInfoForm from './components/q3-store-info'
import LocationsInfoForm from './components/q4-locations-info'
import ThankYou from './components/q5-thank-you'
import RightContent from './components/right-content'
import Pincode from './components/pincode'
import Popup from './components/popup'

import 'vue-material-design-icons/styles.css'

export default {
  name: 'qIndex',
  data () {
    return {
      qIndex: 0,
      hasPopup: false,
      isDelayedRegistration: false,
      showPinRequest: false,
      showAccountError: false,
      showRegistrationRequest: false,
      showRegistrationError: false
    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.formValues.email
      }
    },
    signupParams: {
      get () {
        return {
          email: this.$store.state.formValues.email.value,
          firstName: this.$store.state.formValues.firstName.value,
          lastName: this.$store.state.formValues.lastName.value,
          password: this.$store.state.formValues.password.value,
          phone_number: this.$store.state.formValues.phoneNumber1.value ? this.$store.state.formValues.phoneNumber1.value + this.$store.state.formValues.phoneNumber2.value + this.$store.state.formValues.phoneNumber3.value : '',
          storeName: this.$store.state.formValues.storeName.value,
          postalCode: this.$store.state.formValues.postalCode.value.toUpperCase(),
          storeType: this.$store.state.formValues.storeType.value,
          numberOfLocations: this.$store.state.formValues.numberOfLocations.value
        }
      }
    }
  },
  components: {
    EmailForm,
    UserInfoForm,
    StoreInfoForm,
    LocationsInfoForm,
    ThankYou,
    RightContent,
    Pincode,
    Popup
  },
  watch: {
    qIndex (newVal, oldVal) {
      if (newVal === 0) {
        this.$refs.emailForm.setFocus()
      } else if (newVal === 1) {
        this.$refs.userInfoForm.setFocus()
      } else if (newVal === 2) {
        this.$refs.storeInfoForm.setFocus()
      } else if (newVal === 3) {
        this.$refs.locationsInfoForm.setFocus()
      }
    }
  },
  mounted () {
    this.$refs.emailForm.setFocus()
  },
  destroyed () {
    //
  },
  methods: {
    next (invalidValue = 0) {
      if (this.qIndex < 3) {
        this.qIndex++
      } else {
        this.submit()
      }
    },
    back () {
      this.qIndex--
    },
    hidePopup () {
      this.hasPopup = false
      this.showPinRequest = false
      this.showAccountError = false
      this.showRegistrationRequest = false
      this.showRegistrationError = false
    },
    showPopup (popupType) {
      this.hidePopup()
      this.hasPopup = true

      if (popupType === 'pincode') {
        this.showPinRequest = true
        this.$nextTick(() => {
          this.$refs.pincode.setFocus()
        })
      } else if (popupType === 'account_error') {
        this.showAccountError = true
      } else if (popupType === 'registration') {
        this.showRegistrationRequest = true
      } else if (popupType === 'registration_error') {
        this.showRegistrationError = true
      }
    },
    sendEmail (email) {
      // Used for demo purposes
      this.showPopup('pincode')
      // axios.post('/api/signup', {
      //   email: email
      // }).then(function (response) {
      //   if (response.data.success === true) {
      //     this.showPopup('pincode')
      //   } else {
      //     this.showPopup('account_error')
      //   }
      // }.bind(this)).catch(function (error) {
      //   console.log(error)
      // })
    },
    retrievedToken (token) {
      this.hidePopup()
      this.jwtToken = token
      this.qIndex = 1
    },
    submit () {
      this.showPopup('registration')
      // Used for demo purposes
      console.log(this.signupParams)
      setTimeout(() => {
        this.hidePopup()
        this.qIndex = 4
      }, 4000)
      // axios.post('/api/create-account', this.signupParams, {
      //   headers: {
      //     Authorization: this.jwtToken
      //   }
      // }).then((response) => {
      //   if (response.data.redirect_url) {
      //     if (isDelayedRegistration) {
      //       setTimeout(() => {
      //         this.hidePopup()
      //         this.qIndex = 4
      //       }, 500)
      //     } else {
      //       setTimeout(function () {
      //         window.location.replace(response.data.redirect_url)
      //       }, 500)
      //     }
      //   } else {
      //     this.showPopup('registration_error')
      //   }
      // }).catch((error) => {
      //   console.log(error)
      // })
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap')
$themes: './assets/q1.jpg' #eed503 #6f6512, './assets/q2.jpg' #5beeb5 #207d59, './assets/q3.jpg' #ee5b7a #852539, './assets/q4.jpg' #815bee #FFFFFF, none #333333 #FFFFFF
@mixin full-window
  position: absolute
  top: 0px
  left: 0px
  width: 100%
  height: 100%
@keyframes shake
  10%, 90%
    transform: translate3d(-1px, 0, 0)
    border: 1px solid #F22C3E
    background: #FFF4F5
  20%, 80%
    transform: translate3d(2px, 0, 0)
    border: 1px solid #F22C3E
    background: #FFF4F5
  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)
    border: 1px solid #F22C3E
    background: #FFF4F5
  40%, 60%
    transform: translate3d(4px, 0, 0)
    border: 1px solid #F22C3E
    background: #FFF4F5
body
  font-family: 'Roboto', sans-serif
  min-height: 100vh
  padding: 0px
  margin: 0px
*
  box-sizing: border-box
a
  color: #EED503
button
  background: #333
  border: 0px
  border-radius: 50px
  color: #FFF
  cursor: pointer
  font-size: 20px
  font-weight: bold
  margin-bottom: 10px
  outline: none
  padding: 20px
  width: 100%
h1
  font-size: 250%
  font-weight: normal
  margin: 0px 0px 10px 0px
h2
  font-size: 200%
  font-weight: normal
  margin: 0px 0px 10px 0px
h3
  font-size: 150%
  line-height: 30px
  margin: 0px 0px 40px 0px
  &.nomargin
    margin: 0px 0px 20px 0px
h4
  font-size: 14px
input
  border: 1px solid #CCC
  font-size: 20px
  margin-bottom: 10px
  outline: none
  padding: 20px
  width: 100%
  &.invalid
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both
    transform: translate3d(0, 0, 0)
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
.flex
  display: flex
  min-height: 100vh
.buttons
  display: flex
  button:first-child
    margin-right: 10px
    width: 70px
.input-description
  color: #AAA
  font-size: 12px
  margin: 0px
  padding: 0px 0px 20px 0px
  text-align: center
.left-side
  flex: 1
  background: #FFF
  overflow: hidden
  overflow-y: scroll /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch
.right-side
  flex: 1
  color: #FFF
  font-size: 60px
  font-weight: bold
  background: #333
  overflow: hidden
  position: relative
  @for $i from 1 through length($themes)
    $theme: nth($themes, $i)
    .page:nth-child(#{$i})
      background: #{nth($theme, 2)}
      color: #{nth($theme, 3)}
      overflow: hidden
      .page-image
        @if #{nth($theme, 1)} != none
          background-image: url('#{nth($theme, 1)}')
.page-cont
  height: 100%
  width: 100%
  position: relative
  transform: translateX(0%)
  -webkit-transition-property: transform
  transition-property: transform
  -webkit-transition-duration: 0.5s
  transition-duration: 0.5s
  -webkit-transition-timing-function: cubic-bezier(0.7,0,0.3,1)
  transition-timing-function: cubic-bezier(0.7,0,0.3,1)
  .page
    @include full-window
    align-items: center
    background-size: cover
    display: flex
    flex-direction: column
    justify-content: center
    .page-form
      width: 480px
      padding: 40px
      position: relative
    .page-image
      @include full-window
      background-size: cover
      opacity: 0.4
    .page-text
      @include full-window
      align-items: center
      color: #FFFFFF
      display: flex
      flex-direction: column
      justify-content: center
      padding: 0 15%
.overlay-bg
  @include full-window
  background: url('./assets/q1.jpg') center center no-repeat
  background-size: cover
.overlay-box
  @include full-window
  color: #FFF
  background: rgba(30, 30, 30, 0.9)
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
@for $i from 1 through length($themes)
  $theme: nth($themes, $i)
  .page-cont .page:nth-child(#{$i})
    transform: translateX(#{$i * 100 - 100 + '%'})
    button
      background: #{nth($theme, 2)}
      color: #{nth($theme, 3)}
@media (max-width: 500px)
  h1
    font-size: 200%
  .page-form
    width: 100%
@media (max-height: 850px)
  .page
    justify-content: flex-start
@media (max-width: 900px)
  .page-text
    font-size: 40px
  .page-form
    width: 80%
@media (max-width: 920px)
  .right-side
    display: none
  .page-form
    background: #FFF
    width: 90%
@media (max-width: 1000px)
  .page-text
    font-size: 50px
</style>
