//付款页面数据
const state = {
  
  paymentInfo: null
};

const getters = {
  
  payment: state => state.paymentInfo
  
};

const actions = {
  
  setPaymentInfo({commit}, {data}){
    return new Promise((resolve, reject) => {
      commit("setPaymentInfo", data);
      resolve();
    })
    
  }
};

const mutations = {
  
  setPaymentInfo(state, data){
    state.paymentInfo = data;
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations
}
