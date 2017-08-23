import service from '../../services/index';


const state = {
  
  addressInfo: null,
  productList: [],
  baseInfo: {}
  
};


const getters = {
  address: state => state.addressInfo,
  productList: state => state.productList,
  baseInfo: state => state.baseInfo
};

const actions = {
  
  
  //下单
  fillOrder({commit}, {pids}){
    
    return new Promise((resolve, reject) => {
      service.post("/shappingCart/balanceAccounts", {
        pids: pids
      }).then((response) => {
        let ret = response.data;
        if (ret.success) {
          commit("updateByFill", ret.data)
        }
        resolve();
      }).catch(error => {
        reject(error);
      })
    });
    
    
  },
  
  //获取订单信息
  getDataByOrderId({commit}, orderId){
    return new Promise((resolve, reject) => {
      service.get("/order/pendingPayment", {
        orderId: orderId
      }).then((res) => {
        let ret = res.data;
        if (ret.success) {
          commit("updateByScan", ret.data);
          resolve();
        } else {
          reject();
        }
      })
    });
  },
  
  //重新选择地址信息
  selectAddress({commit}, address){
    
    return new Promise((resolve, reject) => {
      if (!address) {
        reject({msg: "地址信息为空"});
      } else {
        commit("updateAddress", address);
        resolve();
      }
    })
  },
  
  //下单成功后设置订单状态
  setOrderStatus({commit}, data){
    return new Promise((resolve, reject) => {
      commit("updateOrderStatus", true);
      commit("updateAddress", data.address);
      resolve();
    })
  }
  
};


const mutations = {
  
  //购物车下单后更新订单信息
  updateByFill(state, data){
    state.addressInfo = data.address;
    state.productList = data.listProductDetail;
    
    //更新基础信息
    state.baseInfo = {
      quantity: data.quantity,
      productTotalPrice: data.productTotalPrice,
      amountPayable: data.amountPayable,
      amountPaid: data.amountPaid,
      inlandFreight: data.inlandFreight,
      freightPayable: data.freightPayable,
      taxesPayable: data.taxesPayable,
      exchangeRate: '1:' + data.exchangeRateVO.cny,
      discountRate: data.discountRate,
      productIds: data.productIds,
      isFree: data.isFree,
      hasOrder: false
    }
  },
  
  //从订单列表进入
  updateByScan(state, data){
    state.addressInfo = data.orderPendingPaymentVo;
    state.productList = data.listProductDetail;
    
    let tempObj = data.orderPendingPaymentVo;
    state.baseInfo = {
      quantity: tempObj.quantity,
      productTotalPrice: tempObj.productTotalPrice,
      amountPayable: tempObj.amountPayable,
      inlandFreight: tempObj.inlandFreight,
      freightPayable: tempObj.freightPayable,
      taxesPayable: tempObj.taxesPayable,
      exchangeRate: '1:' + data.exchangeRateVO.cny,
      productIds: tempObj.productIds,
      discountRate: data.discountRate,
      isFree: data.isFree,
      amountPaid: tempObj.amountPaid,
      hasOrder: true
    }
  },
  
  
  updateAddress(state, address){
    state.addressInfo = address;
  },
  
  updateOrderStatus(state, status){
    state.baseInfo.hasOrder = status;
  }
};


export default{
  state,
  getters,
  actions,
  mutations
}
