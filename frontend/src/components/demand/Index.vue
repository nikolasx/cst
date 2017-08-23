<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">我的产品需求</h1>
      <router-link class="pull-right" :to="{path:'/adddemand',query:{type:'add'}}">
        <i class="iconfont icon-add page-nav"></i>
      </router-link>
    </header>

    <div class="content">
      <tab-link :tabs="tabs" v-on:select="onSelect" :defaultId="defaultId">
        <demand-list slot="tab1" :status="tabs[0].status" :show="tabs[0].show"></demand-list>
        <demand-list slot="tab2" :status="tabs[1].status" :show="tabs[1].show"></demand-list>
        <demand-list slot="tab3" :status="tabs[2].status" :show="tabs[2].show"></demand-list>
        <demand-list slot="tab4" :status="tabs[3].status" :show="tabs[3].show"></demand-list>
        <demand-list slot="tab5" :status="tabs[4].status" :show="tabs[4].show"></demand-list>
      </tab-link>
    </div>
  </div>
</template>


<script>

  import TabLink from '../common/TableLink'
  import DemandList from './List'
  import {each as _each} from 'underscore'

  export default{
    components: {
      TabLink,
      DemandList
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
            text: '待反馈',
            status: "1100,1200",
            show: false
          },
          {
            id: 'tab3',
            text: '已反馈',
            status: "1300",
            show: false
          },
          {
            id: 'tab4',
            text: '已取消',
            status: "1400",
            show: false
          },
          {
            id: 'tab5',
            text: '已完成',
            status: "1500",
            show: false
          }
        ],

        defaultId: 'tab1'
      }
    },

    created(){
      let defaultId = sessionStorage.getItem('lastDemandSelect')
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
            item.show = true
          } else {
            item.show = false
          }
        })
        sessionStorage.setItem('lastDemandSelect', id)
      }
    }
  }
</script>
