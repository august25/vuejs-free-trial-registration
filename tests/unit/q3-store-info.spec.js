import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Q3StoreInfo from '@/components/q3-store-info'

const getComputed = () => {
  return {
    storeName () {
      return 'JackoLantern'
    },
    postalCode () {
      return 'L8M4R0'
    },
    phoneNumber1 () {
      return '647'
    },
    phoneNumber2 () {
      return '555'
    },
    phoneNumber3 () {
      return '5555'
    },
    isStoreNameValid () {
      return true
    },
    isPostalCodeValid () {
      return true
    },
    isPhoneNumber1Valid () {
      return true
    },
    isPhoneNumber2Valid () {
      return true
    },
    isPhoneNumber3Valid () {
      return true
    }
  }
}

describe('Q3StoreInfo', () => {
  it('Disabled property exists on next button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q3StoreInfo, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on next button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q3StoreInfo, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.not.have.property('disabled')
  })
  it('Disabled property exists on back button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q3StoreInfo, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'backButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on back button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q3StoreInfo, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'backButton' }).attributes()).to.not.have.property('disabled')
  })
})
