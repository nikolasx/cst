<template>

  <div class="page cart-container page-current">

    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title header-title">购物车</h1>

    </header>

    <div class="content">

      <div class="top-text" v-show="exchangeRate !=''">
        欧元：人民币 ={{exchangeRate}}
      </div>

      <ul class="order-list">
        <li class="order-box" v-for="item in list">

          <div class="order-select" @click="onSelect(item)">
            <i v-if="item.selected" class="iconfont icon-duigou icon-select icon-selected"></i>
            <i v-else class="iconfont icon-quan icon-select"></i>
          </div>

          <template v-if="item.remoteImgLst && item.remoteImgLst.length>0">
            <div class="order-image"
                 v-bind:style="'background-image: url('+item.remoteImgLst[0].riFileurl+'!m90x90.jpg)'"></div>
          </template>
          <template v-else>
            <div class="order-image"></div>
          </template>

          <div class="order-info">
            <div class="order-info-item order-info-name">
              {{item.brandNameEn}} {{item.categoryNameEn}} {{item.styleNameEn}}
            </div>
            <div class="order-info-item order-info-color">{{item.coclorNameEn}} {{item.sizeNameEn}}</div>
            <div class="order-info-item order-info-amount">库存 {{item.repertory}}</div>
            <div class="order-info-item order-info-price">EUR{{item.retailPriceEur}}/CNY{{item.retailPriceCny}}
            </div>
            <div class="order-info-item order-info-real-price">CNY {{item.finalPrice}}</div>
            <!--<div class="order-info-item order-info-off">{{(item.discountRate * 100).toFixed(2)}}% off</div>-->

            <div class="order-info-count-box">
              <div class="order-info-count-item order-info-count-min" @click="updateCount(item,-1)">-</div>
              <div class="order-info-count-item order-info-count">{{item.quantity}}</div>
              <div class="order-info-count-item order-info-count-plus" @click="updateCount(item,1)">+</div>
            </div>
          </div>
        </li>
        <div v-if="hasLoad && !!list && list.length ===0" class="empty-container">
          <div class="empty-icon"></div>
          <p class="empty-text">对不起，目前没有数据</p>
        </div>
      </ul>

      <div class="bottom-container">

        <div class="order-selectAll" data-selected="0" @click="onSelectedAll">
          <i v-if="count != list.length || list.length == 0" class="iconfont icon-quan icon-select"></i>
          <template v-else>
            <i class="iconfont icon-select icon-duigou icon-selected"></i>
          </template>
        </div>
        <div class="total-price">
          <label class="bottom-text1">全选</label>
          <label class="bottom-text2">&nbsp;&nbsp;合计：</label>
          <label class="bottom-text3">CNY <label class="selected-totalAmount">{{totalAmount.toFixed(2)}}</label></label>
        </div>
        <div class="btn-submit" @click="fillOrder">下单<label style="color: #ffffff;">({{count}})</label></div>
      </div>
    </div>

  </div>

</template>

<style lang="less" scoped>


  //顶部英镑：人民币
  .top-text {
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background-color: #fffaf2;
  }

  //购物车列表
  .order-list {
    margin: 0;
    padding: 0 0 3rem;
    overflow: hidden;
    .order-box {
      display: flex;

      height: 6.1rem;
      padding: .75rem 0;
      list-style: none;
      background-color: #fff;
      border-bottom: 2px solid #f4f4f4;

      //1. 选中指示
      .order-select {
        width: 1rem;
        height: 1rem;
        line-height: 1;
        margin: 1.75rem .5rem;

        .icon-select {
          font-size: 0.95rem !important;
          color: #ccc;
        }

        .icon-selected {
          color: #D9B766 !important;
        }

      }

      //2. 简略图
      .order-image {
        width: 4.5rem;
        height: 4.5rem;
        background-color: #F3F3F3;
        background-size: cover;
        background-position: center center;
      }

      //3.订单信息
      .order-info {
        position: relative;
        width: 12rem;
        padding: 0 .5rem;
        overflow: hidden;

        .order-info-item {
          font-size: .6rem !important;
          line-height: .7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .order-info-name {
          font-weight: bold;
        }
        .order-info-color, .order-info-amount {
          color: #777;
        }
        .order-info-price {
          margin-top: 1rem;
          color: #999;
          text-decoration: line-through;
        }

        .order-info-real-price, .order-info-off {
          color: #DD5A60;
        }

        .order-info-count-box {
          position: absolute;
          display: flex;
          width: 3.1rem;
          height: 1.1rem;
          right: .2rem;
          bottom: 0;
          border-radius: 2px;
          border: 1px solid #f3f3f3;
          overflow: hidden;

          .order-info-count-item {
            width: 1rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
          }
          .order-info-count-min, .order-info-count-plus {
            background-color: #F3F3F3;
            color: #666;
          }
        }

      }
    }
  }

  //底部
  .bottom-container {
    display: flex;
    position: fixed;
    height: 2.55rem;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    z-index: 999;
    border-top: 1px solid #D4D4D4;
    background-color: #fff;

    .order-selectAll {
      width: 1rem;
      height: 1rem;
      line-height: 1;
      margin: .75rem .5rem;
      flex-shrink: 0;

      .icon-select {
        font-size: 0.95rem !important;
        color: #ccc;
      }

      .icon-selected {
        color: #D9B766 !important;
      }
    }
    .total-price {
      width: 10.7rem;
      line-height: 2.5rem;
      flex-shrink: 0;

      .bottom-text1 {
        font-weight: bold;
      }
      .bottom-text2 {
        color: #777;
      }
      .bottom-text3 {
        color: #DD5A60;
      }
    }
    .btn-submit {
      width: 100%;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #000;
      color: #fff;
      text-align: center;
    }
  }
</style>


<script>

  import {each as _each} from 'underscore';
  import service from '../../services';

  export default {

    data(){
      return {
        hasLoad: false,

        totalAmount: 0,
        count: 0,
        exchangeRate: "",
        list: []
      }
    },

    methods: {

      //更新商品数量
      updateCount(item, flag){

        if (flag == -1 && item.quantity > 1 || flag == 1 && item.quantity < item.repertory) {

          let newCount = item.quantity + flag;
          service.post("/shappingCart/update", {
            id: item.id,
            quantity: newCount,
            subtotal: item.finalPrice
          }, {dataType: "json"}).then((response) => {
            let ret = response.data;
            if (ret.success) {
              item.quantity = newCount;
              this.calTotalAmount();
            }
          })
        }
      },

      onSelect(item){

        if (item.selected) {
          item.selected = false;
          this.count--;
        } else {
          item.selected = true;
          this.count++;
        }

        this.calTotalAmount();
      },


      //计算总选中金额    //全选
      onSelectedAll(){
        if (this.count == this.list.length) {
          _each(this.list, (item) => {
            item.selected = false;
          })
          this.count = 0;
        } else {
          _each(this.list, (item) => {
            item.selected = true;
          })
          this.count = this.list.length;
        }
        this.calTotalAmount();
      },

      calTotalAmount(){
        let result = 0;
        _each(this.list, (item) => {
          if (item.selected) {
            result += item.finalPrice * item.quantity;
          }
        });
        this.totalAmount = result;
      },

      //下单
      fillOrder(){
        if (this.count == 0) {
          return;
        }

        let selectedIds = [];
        _each(this.list, (item) => {
          if (item.selected) {
            selectedIds.push(item.productId)
          }
        });

        this.$store.dispatch("fillOrder",
          {
            pids: selectedIds.join(",")
          }).then(() => {
          this.$router.push("/fillorder");
        });


      },

      pageBack(){
        this.$router.back()
      }
    },

    created(){


      service.get("/shappingCart/list")
        .then((response) => {
          let ret = response.data;
          if (ret.success) {
            let data = ret.data;
            this.exchangeRate = " 1 : " + data.exchangeRate.cny;
            _each(data.shappingCartList, (item) => {
              item.selected = false;
            });
            this.list = data.shappingCartList;
            this.hasLoad = true;
          }
        })
    }
  }


</script>
















