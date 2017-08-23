/**
 * 新增商品需求缓存数据
 * Created by Nicholas on 2017/8/15.
 */

import {extend} from '../../lib/util'

const state = {
  
  form: {
    id: "",
    productId: "",
    proNo: "",
    brandId: "",
    categoryId: "",
    styleId: "",
    sizeNameEn: ""
  },
  
  imgList: [],
  newImageList: []
  
}

const getters = {
  
  demandObj: state => state.form,
  demandImgList: state => state.imgList,
  demandNewImageList: state => state.newImageList
  
}

const actions = {
  
  
  updateDemand({commit}, form, imgList, newImageList){
    return new Promise((resolve, reject) => {
      commit('update', form, imgList, newImageList)
      resolve()
    })
  },
  
  clearDemand({commit}){
    return new Promise((resolve, reject) => {
      commit('clear')
    })
  }
  
}


const mutations = {
  
  
  update(state, form, imgList, newImageList){
    extend(state.form, form)
    if (imgList !== void 0) {
      state.imgList = imgList
    }
    if (newImageList !== void 0) {
      state.newImageList = newImageList
    }
  },
  
  clear(state){
    state.form = {
      id: "",
      productId: "",
      proNo: "",
      brandId: "",
      categoryId: "",
      styleId: "",
      sizeNameEn: ""
    }
    
    state.imgList = []
    state.newImageList = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
