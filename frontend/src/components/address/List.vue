<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">收货地址</h1>
      <router-link class="pull-right" :to="{path:'/addressform',query:{mode:1}}">
        <i class="iconfont icon-add page-nav"></i>
      </router-link>
    </header>
    <div class="content">

      <template v-for="item in list">

        <ul class="address-item-container">
          <li class="recipient-info">
            <div class="item-inner">
              <div class="item-title">{{item.consignee}}</div>
              <div class="item-after">{{item.mobile}}</div>
            </div>
            <div class="item-inner">
              <div class="item-title">{{item.province}}{{item.city}}{{item.country}}{{item.address}}</div>
            </div>
          </li>
          <li class="recipient-info address-info">
            <div class="item-inner">
              <div class="item-title">
                <div class="set-default set-default-yes" v-if="item.isDefault"><i class="iconfont icon-duigou"></i>
                </div>
                <div class="set-default" v-if="!item.isDefault" @click="setDefault(item)"><i
                  class="iconfont icon-quan"></i></div>
                <div class="set-default-text">默认地址</div>
              </div>
              <div class="item-after">
                <div class="btn-edit" @click="edit(item)"><i class="iconfont icon-edit"
                                                             style="font-size: 0.9rem !important;"></i>编辑
                </div>
                <div class="btn-delete" @click="deleteAddress(item)">
                  <i class="iconfont icon-delete" style="font-size:0.9rem !important;"></i>删除
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
      <router-link class="btn-bottom" :to="{path:'/addressform',query:{mode:1}}">新建地址</router-link>

    </div>
  </div>

</template>


<style lang="stylus" scoped>

  .content {
    padding-bottom 3rem;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .address-item-container {
    padding 0;
    margin 0;

    li {
      display list-item;
      list-style none;
    }
    margin-bottom .5rem;
    background-color #fff;

    .recipient-info {
      padding .5rem .75rem;
      border-bottom 2px solid #F3F3F3;

      .item-inner {
        display flex;
        justify-content: space-between;
      }

      .item-title, .item-after {
        display flex;
      }

    }
    .address-info {
      padding .5rem .75rem;
    }

    .set-default {
      width 1rem;
      height: 1rem;
      line-height 1rem;

      i {
        font-size 1rem !important;
      }
    }
    .set-default-yes {
      color #D9B766;
      i {
        color #D9B766;
      }
    }
    .set-default-text {
      margin-left .5rem;
    }

    .btn-delete {
      margin-left 1rem;
    }

  }

</style>
<script>

  import service from '../../services'


  export default {

    data(){
      return {
        list: []
      }
    },

    created(){



      //获取地址列表数据
      this.getList();
    },

    methods: {

      pageBack(){
        this.$router.go(-1);
      },

      getList(){
        service.get("/addressManage/list").then((res) => {
          let ret = res.data;
          if (ret.success) {
            this.list = ret.dataList;
          }
        })
      },

      setDefault(item){
        service.post("/addressManage/update", {
          id: item.id,
          isDefault: 1,
          accountId: item.accountId
        }).then((res) => {
          let ret = res.data;
          if (ret.success) {
            this.getList();
          }
        })
      },

      deleteAddress(item){

        this.$toast.confirm("确认删除这个地址", () => {
          service.post("/addressManage/delete", {
            id: item.id
          }).then((res) => {
            let ret = res.data;
            if (ret.success) {
              this.getList();
            }
          })
        })

      },

      //编辑
      edit(item){
        this.$router.push({
          path: '/addressform',
          query: {
            mode: 2,
            id: item.id
          }
        })
      }
    }
  }
</script>























