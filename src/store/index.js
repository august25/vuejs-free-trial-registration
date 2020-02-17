import Vue from 'vue'
import Vuex from 'vuex'
import formValues from './form-values'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    formValues
  }
})
