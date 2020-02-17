import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Popup from '@/components/popup'

describe('Popup', () => {
  const headline = 'This is the headline'
  const line1 = 'This is line 1'
  const line2 = 'This is line 2'
  it('h1 displays string set in headline prop', async () => {
    const wrapper = shallowMount(Popup, {
      propsData: {
        headline
      }
    })
    expect(wrapper.find('h1').text()).to.equal(headline)
  })
  it('.line1 displays string set in line1 prop', async () => {
    const wrapper = shallowMount(Popup, {
      propsData: {
        line1
      }
    })
    expect(wrapper.find('.line1').text()).to.equal(line1)
  })
  it('.line2 displays string set in line2 prop', async () => {
    const wrapper = shallowMount(Popup, {
      propsData: {
        line2
      }
    })
    expect(wrapper.find('.line2').text()).to.equal(line2)
  })
})
