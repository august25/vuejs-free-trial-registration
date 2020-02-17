export const setEmailValue = (state, val) => {
  state.email.value = val
  state.email.valid = testEmail(val)
}

export const setFirstNameValue = (state, val) => {
  state.firstName.value = val
  state.firstName.valid = validText(val)
}

export const setLastNameValue = (state, val) => {
  state.lastName.value = val
  state.lastName.valid = validText(val)
}

export const setPasswordValue = (state, val) => {
  state.password.value = val
  state.password.valid = validPassword(val)
}

export const setStoreNameValue = (state, val) => {
  state.storeName.value = val
  state.storeName.valid = validText(val)
}

export const setPostalCodeValue = (state, val) => {
  state.postalCode.value = val
  state.postalCode.valid = validPostal(val)
}

export const setPhoneNumber1Value = (state, val) => {
  state.phoneNumber1.value = val
  state.phoneNumber1.valid = validPhone(val, 3)
}

export const setPhoneNumber2Value = (state, val) => {
  state.phoneNumber2.value = val
  state.phoneNumber2.valid = validPhone(val, 3)
}

export const setPhoneNumber3Value = (state, val) => {
  state.phoneNumber3.value = val
  state.phoneNumber3.valid = validPhone(val, 4)
}

export const setStoreTypeValue = (state, val) => {
  state.storeType.value = val
  state.storeType.valid = validOption(val)
}

export const setNumberOfLocationsValue = (state, val) => {
  state.numberOfLocations.value = val
  state.numberOfLocations.valid = validOption(val)
}

export const setPin1Value = (state, val) => {
  state.pin.pin1.value = val
  state.pin.pin1.valid = val.length > 0
}

export const setPin2Value = (state, val) => {
  state.pin.pin2.value = val
  state.pin.pin2.valid = val.length > 0
}

export const setPin3Value = (state, val) => {
  state.pin.pin3.value = val
  state.pin.pin3.valid = val.length > 0
}

export const setPin4Value = (state, val) => {
  state.pin.pin4.value = val
  state.pin.pin4.valid = val.length > 0
}

export const setPin5Value = (state, val) => {
  state.pin.pin5.value = val
  state.pin.pin5.valid = val.length > 0
}

export const resetParams = (state) => {
  setEmailValue(state, undefined)
  setFirstNameValue(state, undefined)
  setLastNameValue(state, undefined)
  setPasswordValue(state, undefined)
  setPhoneNumber1Value(state, undefined)
  setPhoneNumber2Value(state, undefined)
  setPhoneNumber3Value(state, undefined)
  setPin1Value(state, undefined)
  setPin2Value(state, undefined)
  setPin3Value(state, undefined)
  setPin4Value(state, undefined)
  setPin5Value(state, undefined)
}

function testEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function validText (text) {
  return (text && text.length > 1)
}

function validOption (option) {
  return (option !== undefined && option !== null)
}

function validPassword (text) {
  return (text && text.length > 5)
}

function validPhone (numbers, lengthRequirement) {
  return (numbers && numbers.length === lengthRequirement)
}

function validPostal (postal) {
  var rePostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/
  var reZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  var valid = false

  if (rePostal.test(postal)) {
    valid = true
  } else if (reZip.test(postal)) {
    valid = true
  }
  return valid
}
