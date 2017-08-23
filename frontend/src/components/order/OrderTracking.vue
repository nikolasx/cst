<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">订单追踪</h1>
    </header>
    <div class="content">
      <div class="step-container">
        <template v-for="step in steps">
          <span class="step-item "
                v-bind:class="{'step-item-finish': step.status<=curStatus,'step-item-right':step.marginRight}">
            {{step.text}}
          </span>
        </template>
      </div>

      <div class="tracking-container">
        <template v-for="(item,index) in list">
          <div class="track-item">
            <div class="track-point">
              <div class="track-point-line-top" v-if="index !=0"></div>
              <div class="track-point-dot" v-bind:class="{'track-point-dot-cur': index==0}"></div>
              <div class="track-point-line-bottom" v-if="index!=count-1"></div>
            </div>
            <div class="track-content">
              <div class="track-text">{{item.context}}</div>
              <div class="track-time">{{item.time}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

</template>


<style lang="less" scoped>
  .step-container {
    height: 1.6rem;
    background-color: #ffffff;
    display: flex;

    .step-item {
      width: 100%;
      border-top: .1rem solid #E9E9E9;
      line-height: 1.5rem;
      text-align: center;
    }
    .step-item-finish {
      border-color: #D9B766;
    }
    .step-item-right {
      margin-right: .1rem;
    }
  }

  .tracking-container {
    background-color: #ffffff;
    margin-top: .5rem;
    overflow: hidden;
    padding-bottom: 1rem;
    .track-item {
      position: relative;

      .track-point {
        position: absolute;
        width: 3.75rem;
        left: 0;
        top: 0;
        bottom: 0;

        .track-point-dot {
          position: absolute;
          width: .6rem;
          height: .6rem;
          top: 50%;
          left: 50%;
          margin-top: -.3rem;
          margin-left: -.3rem;
          background-image: url("../../assets/img/dingdan/dingdanguanli_lishijilu@2x.png");
          background-size: cover;
          z-index: 10;
        }

        .track-point-dot-cur {
          width: .9rem;
          height: .9rem;
          margin-top: -.45rem;
          margin-left: -.45rem;
          background-image: url("../../assets/img/dingdan/dingdanguanli_danqianjilu@2x.png");
        }

        .track-point-line-top {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 50%;
          border-left: 1px solid #f3f3f3;
        }
        .track-point-line-bottom {
          position: absolute;
          left: 50%;
          top: 50%;
          bottom: 0;
          border-left: 1px solid #f3f3f3;
        }
      }
      .track-content {
        margin-left: 3.75rem;
        padding: .5rem 0;
        border-bottom: 1px solid #F3F3F3;
        word-break: break-all;

        .track-text {
          padding: .2rem .5rem .2rem 0;
          line-height: 1rem;
        }
        .track-time {
          line-height: 1rem;
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
        productId: "",
        curStatus: 0,

        steps: [{
          status: 1000,
          text: "已支付",
          marginRight: true
        }, {
          status: 1000,
          text: "已下单",
          marginRight: false
        }, {
          status: 1100,
          text: "已发货",
          marginRight: false
        }, {
          status: 1200,
          text: "到中转仓",
          marginRight: false
        }, {
          status: 1200,
          text: "发往国内",
          marginRight: true
        }, {
          status: 1500,
          text: "签收",
          marginRight: false
        }
        ],

        list: []
      }
    },
    created(){
      let params = this.$router.currentRoute.query;
      this.orderId = params.orderId;
      this.productId = params.productId
      this.getData()
    },

    computed: {
      count(){
        return this.list.length;
      }
    },

    methods: {
      pageBack(){
        this.$router.go(-1)
      },

      getData(){
        service.get("/order/logistics", {
          orderId: this.orderId,
          productId: this.productId
        }).then(res => {
          let ret = res.data;
          if (ret.success) {
            this.list = ret.data.list;
            this.curStatus = ret.data.status;
          }
        })
      }
    }
  }
</script>
