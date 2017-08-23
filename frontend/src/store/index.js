import Vue from 'vue';
import Vuex from 'vuex';
import fillOrder from './modules/fillOrder';
import payment from './modules/Payment'
import newDemand from './modules/newdemand'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    fillOrder,
    payment,
    newDemand
  }
  
})
export default store
