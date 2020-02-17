import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import RightContent from '@/components/right-content'

describe('RightContent', () => {
  const blurb = 'hello'
  it('.page-text div displays string set in blurb prop', async () => {
    const wrapper = shallowMount(RightContent, {
      propsData: {
        blurb
      }
    })
    expect(wrapper.find('.page-text').text()).to.equal(blurb)
  })
})
