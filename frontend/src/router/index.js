import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/shoppingcart',
      name: 'shopping cart',
      component: resolve => require(['@/components/business/ShoppingCart'], resolve)
    },
    {
      path: '/fillorder',
      name: 'fill order',
      component: resolve => require(["@/components/business/FillOrder"], resolve)
    },
    {
      path: '/payment',
      name: 'payment',
      component: resolve => require(["@/components/business/Payment"], resolve)
    },
    {
      path: '/mine',
      name: 'personal center',
      component: resolve => require(["@/components/mine"], resolve)
    },
    {
      path: "/demandindex",
      name: "demand list",
      component: resolve => require(["@/components/demand"], resolve)
    },
    {
      path: "/adddemand",
      name: "add demand",
      component: resolve => require(["@/components/demand/Add"], resolve)
    },
    {
      path: "/demanddetail",
      name: "demanddetail",
      component: resolve => require(["@/components/demand/Detail"], resolve)
    },
    {
      path: "/orderindex",
      name: "order",
      component: resolve => require(["@/components/order"], resolve)
    },
    {
      path: "/addresslist",
      name: "address list",
      component: resolve => require(["@/components/address/List"], resolve)
    },
    {
      path: "/addressform",
      name: "address form",
      component: resolve => require(["@/components/address/Form"], resolve)
    },
    {
      path: "/selectaddress",
      name: "select address",
      component: resolve => require(["@/components/address/SelectList"], resolve)
    },
    //汇率管理
    {
      path: "/exchangerate",
      name: "exchange rate",
      component: resolve => require(["@/components/mine/ExchangeRate"], resolve)
    },
    //个人信息详情
    {
      path: "/minedetail/:name",
      name: "detail for mine",
      component: resolve => require(["@/components/mine/Nav"], resolve)
    },
    //商品清单
    {
      path: "/productlist",
      name: "product list",
      component: resolve => require(["@/components/order/ProductList"], resolve)
    },
    //订单跟踪
    {
      path: "/ordertracking",
      name: "order tracking",
      component: resolve => require(["@/components/order/OrderTracking"], resolve)
    },
    //选择品牌
    {
      path: "/selectbrand",
      name: "select brand name",
      component: resolve => require(["@/components/demand/SelectBrand"], resolve)
    }
  ]
})




















