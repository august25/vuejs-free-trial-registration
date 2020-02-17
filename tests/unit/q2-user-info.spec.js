import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Q2UserInfo from '@/components/q2-user-info'

const getComputed = () => {
  return {
    firstName () {
      return 'Jack'
    },
    lastName () {
      return 'Black'
    },
    password () {
      return 'password123'
    },
    isFirstNameValid () {
      return true
    },
    isLastNameValid () {
      return true
    },
    isPasswordValid () {
      return true
    }
  }
}

describe('Q2UserInfo', () => {
  it('Disabled property exists on next button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q2UserInfo, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on next button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q2UserInfo, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.not.have.property('disabled')
  })
})
