<template>

  <my-scroll :refresh="refresh" :loadMore="loadMore" :list="list" :hasMoreData="hasMoreData">
    <ul class="order-list">
      <template v-for="item in list">
        <li class="order-item">
          <div class="item-header">
            <div class="item-header-content">
              <span class="item-label">商品名称</span>
              <span class="item-content">订单号：{{item.orderNo}}</span>
            </div>
            <div class="item-header-status">
              <strong v-if="item.status=='1100'" style="color: #dd5a60;">待付款</strong>
              <strong v-if="item.status=='1200'" style="color: #dd5a60;">待收货</strong>
              <strong v-if="item.status=='1300'" style="color: #dd5a60;">待收货</strong>
              <strong v-if="item.status=='1400'" style="color: #dd5a60;">待收货</strong>
              <strong v-if="item.status=='1500'" style="color: #dd5a60;">已收货</strong>
              <strong v-if="item.status=='1600'" style="color: #dd5a60;">已取消</strong>
            </div>
          </div>
          <div class="order-info">
            <div class="order-image-box">
              <template v-for="product in item.listProduct">
                <template v-if="product.remoteLst && product.remoteLst.length>0">
                  <div class="order-info-image" @click="scanImages(item)"
                       v-bind:style="'background-image: url('+fdshost+ product.remoteLst[0].riFileurl+'!m90x90.jpg)'"></div>
                </template>
              </template>
              <div class="order-info-image order-info-image-empty" v-if="!item.hasImg"></div>
            </div>
          </div>
          <div class="order-info-amount">
            <span style="color: #DD5A60;">订单总额：CNY {{item.amountPaid}}</span>
            <span style="margin-right: .5rem;">总件数：{{item.quantity}}件</span>
          </div>
          <div class="order-bottom-container" v-if="item.status == '1100'">
            <a class="order-btn-bottom btn-payment" @click="goPay(item)">去付款</a>
          </div>
          <div class="order-bottom-container" v-if="item.status >=1200 && item.status < 1600">
            <a class="order-btn-bottom btn-payment" @click="onOrderTracking(item)">订单跟踪</a>
            <!--<a class="order-btn-bottom btn-payment" @click="onConfirmReceipt(item)"
               v-if="item.status >=1300 && item.status < 1500">确认收货</a>-->
          </div>
        </li>
      </template>
    </ul>

    <div v-if="load && list.length ===0" class="empty-container">
      <div class="empty-icon"></div>
      <p class="empty-text">对不起，目前没有数据</p>
    </div>

  </my-scroll>


</template>


<style lang="less" scoped>

  .order-list {
    margin: 0;
    padding: 0;

    .order-item {
      list-style: none;
      background-color: #fff;
      margin-bottom: .5rem;

      .item-header {
        height: 2rem;
        padding: 0 .5rem;
        line-height: 2rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f3f3f3;

        .item-header-content {
          display: flex;

          .item-content {
            color: #777;
            font-size: .6rem !important;
            margin-left: 1rem;
          }
        }

      }

      .order-info {

        margin-top: 2px;
        padding: .75rem .5rem;
        background-color: #fff;
        position: relative;
        overflow: hidden;

        .order-image-box {
          display: flex;
          overflow-x: auto;
        }

        .order-info-image {
          width: 4.5rem;
          height: 4.5rem;
          flex-shrink: 0;
          margin-right: .5rem;
          background-size: cover;
          background-position: center center;
          background-color: #f3f3f3;
        }

        .order-info-image-empty {
          background-image: url("../../assets/img/dingdan/zanwutupian@2x.png");
        }

      }

      .order-info-amount {
        display: flex;
        flex-direction: row-reverse;
        height: 2.1rem;
        line-height: 2rem;
        padding: 0 .5rem;
        border-top: 1px solid #f3f3f3;
        border-bottom: 1px solid #f3f3f3;
      }

      .order-bottom-container {
        display: flex;
        flex-direction: row-reverse;
        height: 2rem;
        padding: 0 .5rem;

        .order-btn-bottom {
          width: 3rem;
          height: 1.1rem;
          margin: .4rem 0 0 .5rem;
          text-align: center;
          font-size: .6rem !important;
          line-height: 1rem;
          border: 1px solid #D9B766;
          border-radius: .1rem;
        }
        .btn-payment {
          background-color: #D9B766;
          color: #fff;
        }
        .btn-delete {
          color: #D9B766;
        }
      }
    }

  }
</style>
<script>

  import {each as _each} from 'underscore'
  import service from '../../services'
  import MyScroll from '../common/MyScroll'
  import ImageView from '../../plugins/imageview/imageview'

  export default {

    name: "order-list",
    components: {
      MyScroll
    },
    props: {
      status: {
        type: String,
        default: null
      },
      show: {
        required: true,
        type: Boolean
      }
    },
    data(){
      return {
        list: [],
        fdshost: "",

        pageSize: 10,
        pageCount: 1,
        pageIndex: 1,
        hasMoreData: true,
        load: false
      }
    },

    watch: {
      show(val){
        if (val && !this.load) {
          this.getData(true);
        }
      }
    },

    methods: {

      //获取列表数据，flag: true 刷新列表，flag:false 加载下一页数据
      getData(flag){
        return service.get("/order/list", {
          status: this.status,
          page: this.pageIndex,
          limit: this.pageSize
        }).then((response) => {
          let ret = response.data;
          if (ret.success) {
            let data = ret.data;

            //判断订单是否有图片
            _each(data.listOrder.list, item => {
              item.hasImg = false;
              let imgs = [];
              _each(item.listProduct, product => {
                if (product.remoteLst && product.remoteLst.length > 0) {
                  item.hasImg = true;

                  _each(product.remoteLst, img => {
                    imgs.push(data.fdshost + img.riFileurl)
                  })
                }

              });
              item.imgs = imgs
            })

            if (flag) {
              this.list = data.listOrder.list
            } else {
              this.list = this.list.concat(data.listOrder.list)
            }


            this.fdshost = data.fdshost;
            this.load = true;
            this.pageCount = Math.ceil(data.listOrder.total / this.pageSize)
            this.hasMoreData = this.pageIndex < this.pageCount ? true : false;
          }
        })
      },

      refresh(done){
        setTimeout(() => {
          this.pageIndex = 1;
          this.getData(true).then(() => {
            done();
          })
        }, 500)
      },

      loadMore(done){
        setTimeout(() => {
          if (this.pageIndex < this.pageCount) {
            this.pageIndex++;
            this.getData(false).then(() => {
              done();
            })
          } else {
            done();
          }
        }, 500)
      },


      //去付款
      goPay(item){

        this.$store.dispatch("getDataByOrderId", item.orderId).then(() => {
          this.$router.push('/fillorder');
        })

      },

      //订单跟踪
      onOrderTracking(item){
        this.$router.push({
          path: '/productlist',
          query: {
            orderId: item.orderId,
            ids: item.productIds
          }
        })
      },

      //图片预览
      scanImages(item){
        let imgs = [];
        _each(item.imgs, img => {
          imgs.push({
            src: img
          })
        })
        this.imageView = new ImageView({
          imgs: imgs
        })
      }
    }

  }
</script>
