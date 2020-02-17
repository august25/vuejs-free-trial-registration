<template>
  <div class="page">
    <div class="page-form">
      <h1>A brand that cares is addictive.</h1>
      <h3>Select your business type</h3>
      <div class="location-type-toggle" :class="{ 'invalid': !isStoreTypeValid && showErrors }">
        <div
          v-for="(locationType, i) in locationTypes"
          :key="locationType.name"
          :class="{ active: toggleTypeIndex === i }"
          @click="setToggleTypeIndex(i, locationType.name)">
          {{ locationType.name }}
        </div>
      </div>
      <h3 class="nomargin">Number of locations</h3>
      <div class="location-toggle" :class="{ 'invalid': !isNumberOfLocationsValid && showErrors }">
        <div
          v-for="(locationSize, i) in locationSizes"
          :key="locationSize.name"
          :class="{ active: toggleIndex === i }"
          @click="setToggleIndex(i, locationSize.name)">
          {{ locationSize.name }}
        </div>
      </div>
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
  name: 'LocationInfoForm',
  data () {
    return {
      showErrors: false,
      locationTypes: [
        {
          name: 'Coffee Shop',
          icon: 'local_cafe'
        },
        {
          name: 'Quick-serve Restaurant',
          icon: 'fastfood'
        },
        {
          name: 'Retail',
          icon: 'local_offer'
        },
        {
          name: 'Spa/Salon',
          icon: 'store_mall_directory'
        },
        {
          name: 'Florist',
          icon: 'local_florist'
        },
        {
          name: 'Other',
          icon: 'trip_origin'
        }
      ],
      locationSizes: [
        {
          name: 'One'
        },
        {
          name: '2-4'
        },
        {
          name: '5-10'
        },
        {
          name: '10+'
        }
      ],
      toggleTypeIndex: -1,
      toggleIndex: -1
    }
  },
  computed: {
    storeType: {
      get () {
        return this.$store.state.formValues.storeType.value
      },
      set (val) {
        this.$store.commit('formValues/setStoreTypeValue', val)
      }
    },
    numberOfLocations: {
      get () {
        return this.$store.state.formValues.numberOfLocations.value
      },
      set (val) {
        this.$store.commit('formValues/setNumberOfLocationsValue', val)
      }
    },
    isStoreTypeValid: {
      get () {
        return this.$store.state.formValues.storeType.valid
      }
    },
    isNumberOfLocationsValid: {
      get () {
        return this.$store.state.formValues.numberOfLocations.valid
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
    setToggleIndex (index, value) {
      this.toggleIndex = index
      this.numberOfLocations = value
    },
    setToggleTypeIndex (index, value) {
      this.toggleTypeIndex = index
      this.storeType = value
    },
    next () {
      this.showErrors = false
      if (this.isStoreTypeValid && this.isNumberOfLocationsValid) {
        this.$emit('next')
      } else {
        setTimeout(() => {
          this.showErrors = true
        }, 100)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.location-toggle
  border: 1px solid #CCC
  border-radius: 50px
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  margin-bottom: 20px
  padding: 10px 20px
  text-align: center
  &.invalid
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both
    transform: translate3d(0, 0, 0)
  > div
    align-items: center
    background: #FFF
    border-radius: 50px
    color: #333
    display: flex
    justify-content: center
    padding: 10px 0px
  > div.active
    background: #333
    color: #FFF
    font-weight: bold
.location-type-toggle
  border: 1px solid #CCC
  border-radius: 5px
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  margin-bottom: 20px
  padding: 10px 10px
  text-align: center
  &.invalid
    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both
    transform: translate3d(0, 0, 0)
  > div
    align-items: center
    border: 5px solid #FFF
    border-radius: 10px
    color: #333
    display: flex
    flex-direction: column
    font-size: 11px
    justify-content: center
    padding: 10px 0px
  > div.active
    background: #333
    color: #FFF
    font-weight: bold
@media (max-width: 500px)
  .location-type-toggle
    grid-template-columns: 1fr 1fr 1fr
</style>
