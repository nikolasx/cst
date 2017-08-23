<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">商品详情</h1>
    </header>

    <div class="content">

      <div class="banner-container" v-if="!!imgs && imgs.length>0">
        <slider :items="imgs" :width="750" :height="320" :speed="10000" :sync="true"></slider>
      </div>

      <ul class="form-container" v-if="!!data">
        <li class="form-row">
          <span class="row-label">商品编号：</span>
          <span class="row-content">{{data.proNo}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">品牌：</span>
          <span class="row-content">{{data.brandNameEn}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">品类：</span>
          <span class="row-content">{{data.categoryNameEn}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">款式：</span>
          <span class="row-content">{{data.styleNameEn}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">尺寸：</span>
          <span class="row-content">{{data.sizeNameEn}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">价格：</span>
          <span class="row-content">
            <div>{{'CNY ' + data.finalPrice}}</div>
            <!--<div style="color: #DD5A60;">{{(data.discountRate * 100).toFixed(0) + "% off"}}</div>
            <div style="color: #DD5A60;">{{'CNY' + data.finalPrice}}</div>-->
          </span>
        </li>
        <li class="form-row">
          <span class="row-label">库存量：</span>
          <span class="row-content">{{data.repertory}}</span>
        </li>
        <li class="form-row">
          <span class="row-label">描述：</span>
          <span class="row-content">{{data.detail}}</span>
        </li>
      </ul>


      <!--<div class="btn-bottom" v-if="!!id" @click="addShoppingCart">加入购物车</div>-->
    </div>
  </div>

</template>


<style lang="less" scoped>

  .banner-container {
    height: 8rem;
    background-color: #ffffff;
    border-bottom: 1px solid #F3F3F3;
  }

  .form-container {
    margin: 0;
    padding: .25rem 0;
    border-top: 1px solid #fff;
    background-color: #fff;

    .form-row {
      list-style: none;
      display: flex;
      padding: .25rem .5rem;
    }

    .row-label {
      width: 4rem;
      height: 1rem;
      flex-shrink: 0;
      line-height: 1rem;
      text-align: right;
      font-size: .7rem;
      color: #666;
    }
    .row-content {
      width: 100%;
      padding-left: 1.5rem;
      line-height: 1rem;
      font-size: .7rem;
      word-break: break-all;
    }
  }

</style>
<script>

  import service from '../../services'
  import Slider from '../common/Slider'
  import {each} from 'underscore'

  export default {

    components: {
      Slider
    },

    data(){
      return {
        id: "",
        data: null,

        imgs: []
      }
    },

    created(){
      let id = this.$router.currentRoute.query.id;

      if (id) {
        this.id = id;
        this.getDetail(id);
      }

    },

    methods: {


      pageBack(){
        this.$router.go(-1);
      },

      getDetail(id){
        service.get("/product/load", {
          id: id
        }).then((res) => {
          let ret = res.data;
          if (ret.success) {
            this.data = ret.data;

            let tmp = [];
            each(this.data.remoteImgLst, item => {
              tmp.push({
                src: item.riFileurl+'!w375x160.jpg'
              })
            });
            this.imgs = tmp;
          }
        })
      },
      //加入购物车
      addShoppingCart(){
        service.post("/shappingCart/add", {
          quantity: 1,
          subtotal: this.data.finalPrice,
          productId: this.id
        }).then((res) => {
          let ret = res.data;
          if (ret.success) {
            this.$toast.success("加入购物车成功！")
          } else {
            this.$toast.error(ret.msg);
          }
        })
      }
    }
  }
</script>
