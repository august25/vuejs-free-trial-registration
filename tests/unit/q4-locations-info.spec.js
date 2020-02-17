import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Q4LocationsInfo from '@/components/q4-locations-info'

const getComputed = () => {
  return {
    storeType () {
      return 'Retail'
    },
    numberOfLocations () {
      return '5-10'
    },
    isStoreTypeValid () {
      return true
    },
    isNumberOfLocationsValid () {
      return true
    }
  }
}

describe('Q4LocationInfo', () => {
  it('Disabled property exists on next button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q4LocationsInfo, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on next button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q4LocationsInfo, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.not.have.property('disabled')
  })
  it('Disabled property exists on back button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q4LocationsInfo, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'backButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on back button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q4LocationsInfo, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'backButton' }).attributes()).to.not.have.property('disabled')
  })
})
