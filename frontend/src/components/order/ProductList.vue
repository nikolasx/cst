<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">商品清单</h1>
      <span class="pull-right product-count">共{{count}}件</span>
    </header>
    <div class="content">
      <ul class="list-container">
        <template v-for="item in productList">
          <li class="list-item">

            <div class="list-item-finish" v-if="item.status==1500"></div>
            <div class="item-container">
              <template v-if="item.remoteImgLst && item.remoteImgLst.length>0">
                <div class="item-image"
                     v-bind:style="'background-image: url('+item.remoteImgLst[0].riFileurl+'!m90x90.jpg)'"></div>
              </template>
              <template v-else>
                <div class="item-image"></div>
              </template>

              <div class="item-content">
                <div class="item-info-line">{{item.brandNameEn}} {{item.categoryNameEn}} {{item.styleNameEn}}</div>
                <div class="item-info-line c9">尺码：{{item.sizeNameEn}}</div>
                <div class="item-info-line cred mt1-5">CNY {{item.finalPrice}}</div>
                <div class="item-count">x{{item.quantity}}</div>
              </div>
            </div>
            <div class="item-bottom">
              <router-link class="item-btn"
                           :to="{path:'/ordertracking',query:{orderId:orderId , productId: item.proudctId}}">订单跟踪
              </router-link>

              <a class="item-btn" @click="onConfirmReceipt(item)"
                 v-if="item.status==1200">确认收货</a>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>

</template>


<style lang="less" scoped>
  .product-count {
    line-height: 2.2rem;
  }

  .list-container {
    padding: 0;
    margin: 0 0 .5rem 0;
    overflow: hidden;

    .list-item {
      position: relative;
      list-style: none;
      display: block;
      background-color: #ffffff;
      margin-bottom: .5rem;

      .list-item-finish {
        position: absolute;
        width: 3.75rem;
        height: 3.2rem;
        right: 0;
        top: 0;
        background-image: url("../../assets/img/dingdan/dingdan_wancheng@2x.png");
        background-size: cover;
      }

      .item-container {
        display: flex;
        padding: .5rem;
        border-bottom: 1px solid #f3f3f3;

        .item-image {
          width: 4.5rem;
          height: 4.5rem;
          margin-right: .5rem;
          flex-shrink: 0;
          background-image: url("../../assets/img/dingdan/zanwutupian@2x.png");
          background-size: cover;
        }
        .item-content {
          position: relative;
          width: 100%;
          height: 4.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;

          .item-info-line {
            line-height: 1rem;

            &.mt1-5 {
              margin-top: 1.5rem;
            }
          }
          .item-count {
            position: absolute;
            right: 0;
            bottom: 0;
            line-height: 1rem;
          }
        }
      }

      .item-bottom {
        display: flex;
        flex-direction: row-reverse;
        height: 2rem;
        padding: 0 .5rem;
        border-bottom: 1px solid #f3f3f3;

        .item-btn {
          width: 3rem;
          height: 1rem;
          margin: .5rem 0 0 .5rem;
          text-align: center;
          font-size: .6rem !important;
          line-height: 1rem;
          border-radius: .1rem;
          background-color: #D9B766;
          color: #fff;
        }
      }
    }
  }
</style>


<script>

  import service from '../../services'

  export default {

    data(){
      return {
        orderId: "",
        ids: "",

        productList: []
      }
    },
    created(){
      let params = this.$router.currentRoute.query;
      this.orderId = params.orderId;
      this.ids = params.ids;

      this.getProductList();
    },
    computed: {
      count(){
        return this.productList.length;
      }
    },
    methods: {
      pageBack(){
        this.$router.go(-1)
      },
      //获取清单列表数据
      getProductList(){
        service.get("/order/productDetail", {
          orderId: this.orderId,
          ids: this.ids
        }).then(res => {
          let ret = res.data;
          if (ret.success) {
            this.productList = ret.dataList;
          }
        })
      },

      //确认收货

      onConfirmReceipt(item){
        this.$toast.confirm("是否确认收货?", () => {
          service.post("/order/received", {
            productId: item.proudctId,
            orderId: this.orderId
          }).then(res => {
            let ret = res.data;
            if (ret.success) {
              this.getProductList();
            }
          })
        })
      }

    }
  }
</script>





























