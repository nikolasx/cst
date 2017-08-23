<template>

  <div class="page page-current page-index">

    <header class="bar bar-nav">
      <h1 class="title">GOGO 买手</h1>
    </header>


    <nav class="nav-bar">
      <router-link class="nav-item nav-item-selected" to="/">
        <div class="nav-icon"><i class="iconfont icon-icon1460189545542"></i></div>
        <div class="nav-text">首页</div>
      </router-link>
      <router-link class="nav-item " to="/demandindex">
        <div class="nav-icon"><i class="iconfont icon-xuqiu"></i></div>
        <div class="nav-text">需求</div>
      </router-link>
      <router-link class="nav-item " to="/shoppingcart">
        <div class="nav-icon"><i class="iconfont icon-gouwuche"></i></div>
        <div class="nav-text">购物车</div>
      </router-link>
      <router-link class="nav-item " to="/orderindex">
        <div class="nav-icon"><i class="iconfont icon-home_list"></i></div>
        <div class="nav-text">订单</div>
      </router-link>
      <router-link class="nav-item " to="/mine">
        <div class="nav-icon"><i class="iconfont icon-wode"></i></div>
        <div class="nav-text">我的</div>
      </router-link>
    </nav>

    <div class="content">
      <div class="banner-container">
        <slider :items="imgs" :width="750" :height="376" :pagination="true" :auto-play="true" :speed="5000"
                :sync="true"></slider>
      </div>
    </div>

  </div>

</template>


<style lang="less" scoped>

  header.bar-nav {
    background-color: #ffffff;
  }

  .nav-bar {
    position: absolute;
    table-layout: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    background-color: #222222;
    z-index: 10;
    display: flex;

    .nav-item {
      width: 100%;
      height: 100%;
      padding: .25rem 0;

      .nav-icon, .nav-text {
        width: 100%;
        color: #7A7A7A;
        text-align: center;
        line-height: 1rem;

        .iconfont {
          color: #7a7a7a;
        }

      }

    }
    .nav-item-selected {
      .nav-icon, .nav-text {
        color: #ffffff;
        .iconfont {
          color: #ffffff;
        }
      }
    }
  }

  .banner-container {
    height: 9.4rem;
  }

</style>

<script>

  import Slider from './common/Slider'

  export default {

    components: {
      Slider
    },

    data(){
      return {
        imgs: []
      }
    },

    created(){
      this.imgs = [{src: '/frontend/dist/index/shouye_banner@2x.png', href: ''},
        {src: '/frontend/dist/index/shouye_bannertwo@2x.png', href: ''},
        {src: '/frontend/dist/index/shouye_bannerthree@2x.png', href: ''}];
    }
  }

</script>



















