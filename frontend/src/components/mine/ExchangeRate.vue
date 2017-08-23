<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">汇率换算</h1>
    </header>

    <div class="content">
      <div class="cur-container">
        <div class="cur-img"></div>
        <div class="cur-content">
          <span class="cur-text">欧元</span>
          <div class="cur-content-box">
            <p class="cur-content-value"><strong>100</strong></p>
            <p class="cur-content-text">100欧元</p>
          </div>
        </div>
      </div>

      <div class="list-container">
        <div class="list-item">
          <div class="item-container">
            <div class="item-image item-image-meiyuan"></div>
            <div class="item-content">
              <span class="item-content-text">美元</span>
              <span class="item-info-text">
                <strong>100</strong>
                <label class="label-grey"> EUR = </label>
                <strong>{{usd}}</strong>
                <label>USD</label>
              </span>
            </div>
          </div>
        </div>

        <div class="list-item">
          <div class="item-container">
            <div class="item-image item-image-rmb"></div>
            <div class="item-content">
              <span class="item-content-text">人民币</span>
              <span class="item-info-text">
                <strong>100</strong>
                <label class="label-grey"> EUR = </label>
                <strong>{{cny}}</strong>
                <label>CNY</label>
              </span>
            </div>
          </div>
        </div>

        <div class="list-item">
          <div class="item-container">
            <div class="item-image item-image-gb"></div>
            <div class="item-content">
              <span class="item-content-text">港币</span>
              <span class="item-info-text">
                <strong>100</strong>
                <label class="label-grey"> EUR = </label>
                <strong>{{hkd}}</strong>
                <label>HKD</label>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="less" scoped>
  .cur-container {
    padding: 1rem .6rem;
    background-color: #ffffff;
    display: flex;

    .cur-img {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      margin-right: 1rem;
      background-image: url("../../assets/img/mine/huilvhuansaun_yinbang_da@2x.png");
      background-size: cover;
    }

    .cur-content {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .cur-text {
        line-height: 2rem;
      }
      .cur-content-box {
        height: 2rem;
        .cur-content-value, .cur-content-text {
          line-height: 1rem;
          padding: 0;
          margin: 0;
          text-align: right;
        }
        .cur-content-text {
          color: #666;
        }
      }
    }
  }

  .list-container {
    margin-top: .3rem;
    overflow: hidden;
    background-color: #fff;

    .list-item {
      padding: .5rem;
      border-bottom: 1px solid #f3f3f3;

      .item-container {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .item-image {
          width: 1.75rem;
          height: 1.75rem;
          flex-shrink: 0;
          margin-right: 1rem;
          background-size: cover;
        }
        .item-image-meiyuan {
          background-image: url("../../assets/img/mine/huilvhuansaun_meiyuan@2x.png");
        }

        .item-image-rmb {
          background-image: url("../../assets/img/mine/huilvhuansaun_renminbi@2x.png");
        }

        .item-image-gb {
          background-image: url("../../assets/img/mine/huilvhuansaun_gangbi@2x.png");
        }

        .item-content{
          width: 100%;
          display: flex;
          justify-content: space-between;

          .item-content-text{
            line-height: 1.75rem;
          }

          .item-info-text{
            line-height: 1.75rem;

            .label-grey{
              color: #666;
            }
          }
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
        cny: '',
        eur: '',
        hkd: '',
        usd: ''
      }
    },

    created(){
      service.get("/mine/transRate", {
        currency: "EUR",
        amount: 100
      }).then(res => {
        let ret = res.data;
        if (ret.success) {
          let data = ret.data;
          this.cny = data.cny.toFixed(2);
          this.eur = data.eur.toFixed(2);
          this.hkd = data.hkd.toFixed(2);
          this.usd = data.usd.toFixed(2);
        }
      })
    },

    methods: {
      pageBack(){
        this.$router.go(-1)
      }
    }
  }

</script>
