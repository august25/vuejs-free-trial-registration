import { expect } from 'chai'
import { setPostalCodeValue } from '../../src/store/form-values/mutations'

const getState = () => {
  return {
    pageIndex: 0,
    email: {
      value: undefined,
      valid: false
    },
    firstName: {
      value: undefined,
      valid: false
    },
    lastName: {
      value: undefined,
      valid: false
    },
    password: {
      value: undefined,
      valid: false
    },
    phoneNumber1: {
      value: undefined,
      valid: false
    },
    phoneNumber2: {
      value: undefined,
      valid: false
    },
    phoneNumber3: {
      value: undefined,
      valid: false
    },
    storeName: {
      value: undefined,
      valid: false
    },
    postalCode: {
      value: undefined,
      valid: false
    },
    storeType: {
      value: undefined,
      valid: false
    },
    numberOfLocations: {
      value: undefined,
      valid: false
    },
    pin: {
      full: '',
      pin1: {
        value: undefined,
        valid: false
      },
      pin2: {
        value: undefined,
        valid: false
      },
      pin3: {
        value: undefined,
        valid: false
      },
      pin4: {
        value: undefined,
        valid: false
      },
      pin5: {
        value: undefined,
        valid: false
      }
    }
  }
}

describe('FormValues Store Mutations', () => {
  it('Valid Postal Code: L8L8L8', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L8L8')
    expect(state.postalCode.valid).to.equal(true)
  })
  it('Valid Postal Code: L8L 8L8', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L 8L8')
    expect(state.postalCode.valid).to.equal(true)
  })
  it('Valid Postal Code: L8L-8L8', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L-8L8')
    expect(state.postalCode.valid).to.equal(true)
  })
  it('Invalid Postal Code: L8L8L', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L8L')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: 555555', async () => {
    const state = getState()
    setPostalCodeValue(state, '555555')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: LLLLLLL', async () => {
    const state = getState()
    setPostalCodeValue(state, 'LLLLLLL')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: 8L8L8L', async () => {
    const state = getState()
    setPostalCodeValue(state, '8L8L8L')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: L8L 8L8 L8L', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L 8L8 L8L')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: L8L8L8L', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L8L8L')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: L8L.8L8', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L.8L8')
    expect(state.postalCode.valid).to.equal(false)
  })
  it('Invalid Postal Code: L8L_8L8', async () => {
    const state = getState()
    setPostalCodeValue(state, 'L8L_8L8')
    expect(state.postalCode.valid).to.equal(false)
  })
})
