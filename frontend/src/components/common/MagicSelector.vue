<template>

  <div class="page page-current">

    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">选择品牌</h1>
    </header>
    <div class="content">
      <div class="selector-container">
        <div class="selector-bar">
          <ul class="bar-list" @click="navTo($event)">
            <li v-for="barItem in barList" class="bar-item" :data-value="barItem">{{barItem}}</li>
          </ul>
        </div>

        <div class="selector-content" id="brandList" @click="selectBrand($event)">
          <div class="brand-list">
            <template v-for="(value,key) in brandList">
              <div class="item-container" v-if="value.length>0">
                <div class="brand-flag" v-if="key!='NO'" :data-flag="key"><strong>{{key}}</strong></div>
                <a class="brand-item" :data-id="item.id" v-for="item in value">{{item.enName}}</a>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>

  .selector-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #ffffff;
  }

  .selector-bar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1.5rem;
    border: 1px solid #ccc;
    border-radius: .2rem;

    .bar-list {
      height: 100%;
      margin: 0;
      padding: 0;

      .bar-item {
        list-style: none;
        text-align: center;
        min-height: 1rem;
        line-height: 1rem;
      }

    }
  }

  .selector-content {
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 1.6rem;
    overflow: hidden;
    background-color: #ffffff;
    padding: .5rem;

    .brand-list {
      padding-bottom: .5rem;
      .brand-flag {
        height: 1.5rem;
        border-bottom: 1px solid #999;
        line-height: 1.5rem;
        text-indent: 4px;
        margin-bottom: .2rem;
      }

      .brand-item {
        display: block;
        color: #222;
        height: 1.2rem;
        line-height: 1.2rem;
        text-indent: 4px;
      }
    }

  }

</style>

<script>

  import service from '../../services'
  import {each as _each} from 'underscore'
  import BScroll from 'better-scroll'
  import {string} from '../../lib/util'

  export default {

    data(){
      return {
        barList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        brandList: []
      }
    },

    created(){

      service.get("/product/brandList").then((response) => {
        let ret = response.data;
        if (ret.success) {
          this.buildData(ret.dataList)
        }
      })
    },

    mounted(){
      let scroll = new BScroll(this.$el.querySelector('#brandList'), {
        startX: 0,
        startY: 0,
        click: true
      });

      this.scroll = scroll;

    },

    methods: {
      pageBack(){
        this.$router.go(-1)
      },

      buildData(list){

        let tmpData = {'NO': []};

        _each(this.barList, item => {
          tmpData[item] = []
        })

        _each(list, item => {
          let flag = item.enName.charAt(0).toUpperCase();
          if (/[A-Z]/.test(flag)) {
            tmpData[flag].push(item)
          } else {
            tmpData['NO'].push(item)
          }
        })
        this.brandList = tmpData;

        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },

      navTo($event){
        let target = $event.target,
          value = target.getAttribute("data-value"),
          flag = this.$el.querySelector(string.format(".brand-flag[data-flag='{0}']", value))
        this.scroll.scrollToElement(flag, 100, 0, 0, 'easing')
      },

      selectBrand($event){
        let target = $event.target
        if (/brand-item/.test(target.className)) {
          let tmpObj = {
            brandId: target.getAttribute('data-id')
          }
          this.$store.dispatch('updateDemand', tmpObj).then(() => {
            this.$router.go(-1)
          })
        }
      }
    }
  }


</script>





















