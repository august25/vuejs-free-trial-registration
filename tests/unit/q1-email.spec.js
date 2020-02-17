import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Q1Email from '@/components/q1-email'

const getComputed = () => {
  return {
    email () {
      return 'info@test.com'
    },
    isEmailValid () {
      return true
    }
  }
}

describe('Q1Email', () => {
  it('Disabled property exists on next button when disabled prop is true', async () => {
    const wrapper = shallowMount(Q1Email, {
      propsData: {
        disabled: true
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.have.property('disabled')
  })
  it('Disabled property is not present on next button when disabled prop is false', async () => {
    const wrapper = shallowMount(Q1Email, {
      propsData: {
        disabled: false
      },
      computed: getComputed()
    })
    expect(wrapper.find({ ref: 'nextButton' }).attributes()).to.not.have.property('disabled')
  })
})
