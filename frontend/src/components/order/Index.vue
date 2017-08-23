<template>

  <div class="page page-current">
    <!-- 标题栏 -->

    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">我的订单</h1>
    </header>

    <div class="content">
      <tab-link :tabs="tabs" v-on:select="onSelect" :defaultId="defaultId">
        <order-list :status="tabs[0].status" :show="tabs[0].show" slot="tab1"></order-list>
        <order-list :status="tabs[1].status" :show="tabs[1].show" slot="tab2"></order-list>
        <order-list :status="tabs[2].status" :show="tabs[2].show" slot="tab3"></order-list>
        <order-list :status="tabs[3].status" :show="tabs[3].show" slot="tab4"></order-list>
        <order-list :status="tabs[4].status" :show="tabs[4].show" slot="tab5"></order-list>
      </tab-link>
    </div>
  </div>

</template>

<style lang="less" scoped>

</style>


<script>

  import TabLink from '../common/TableLink'
  import OrderList from './List'
  import {each as _each} from 'underscore'

  export default {
    components: {
      TabLink,
      OrderList
    },
    data(){
      return {
        tabs: [
          {
            id: 'tab1',
            text: '全部',
            status: null,
            show: false
          },
          {
            id: 'tab2',
            text: '待付款',
            status: "1100",
            show: false
          },
          {
            id: 'tab3',
            text: '待收货',
            status: "1200,1300,1400",
            show: false
          },
          {
            id: 'tab4',
            text: '已完成',
            status: "1500",
            show: false
          },
          {
            id: 'tab5',
            text: '已取消',
            status: "1600",
            show: false
          }
        ],

        defaultId: 'tab1'
      }
    },

    created(){
      let defaultId = sessionStorage.getItem('orderDefaultId')
      if (defaultId) {
        this.defaultId = defaultId;
      }
    },
    methods: {
      pageBack(){
        this.$router.go(-1)
      },

      onSelect(id){
        _each(this.tabs, (item) => {
          if (item.id === id) {
            item.show = true;
          } else {
            item.show = false;
          }
        });
        sessionStorage.setItem("orderDefaultId",id)
      }
    }
  }
</script>




















