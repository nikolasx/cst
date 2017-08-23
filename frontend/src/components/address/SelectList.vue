<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="page-back pull-left" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>

      <h1 class="title">收货地址</h1>
    </header>

    <div class="content">
      <ul class="list-container">
        <template v-for="item in list">
          <li class="list-item">
            <a class="item-select" @click="onSelectAddress(item)">
              <template v-if="curAddress&&curAddress.id == item.id">
                <div class="select-icon selected">
                  <i class="iconfont icon-duigou1"></i>
                </div>
              </template>
              <template v-else>
                <div class="select-icon">
                  <i class="iconfont icon-duigou1"></i>
                </div>
              </template>

            </a>

            <div class="item-info" @click="onSelectAddress(item)">
              <div class="item-row">
                <div class="address-name">{{item.consignee}}</div>
                <div class="address-phone">{{item.mobile}}</div>
                <div v-if="item.isDefault" class="address-default">默认地址</div>
              </div>
              <div class="item-row">
                <div class="address-text">
                  {{item.province + item.city + item.country + item.address}}
                </div>
              </div>
            </div>
            <a class="item-edit" @click="edit(item.id)">
              <i class="iconfont icon-edit"></i>
            </a>
          </li>
        </template>
      </ul>
      <router-link class="btn-bottom" :to="{path:'/addressform',query:{mode:1}}">
        新建地址
      </router-link>
    </div>
  </div>

</template>


<style lang="less" scoped>
  .list-container {
    margin: 1px 0 0 0;
    padding: 0 0 3rem 0;
    overflow: hidden;

    .list-item {
      display: flex;
      min-height: 2.5rem;
      padding: .5rem;
      margin-bottom: 4px;
      background-color: #fff;

      .item-select {
        display: block;
        width: 1.6rem;
        height: 2.5rem;
        text-decoration: none;
        flex-shrink: 0;

        .select-icon {
          text-align: center;
          line-height: 2.5rem;
          display: none;
          i {
            font-size: 1rem !important;
            color: #222;
          }
        }
        .selected {
          display: block;
        }
      }

      .item-info {
        width: 100%;

        .item-row {
          padding: 0 1rem 0 .5rem;
          display: flex;

          .address-name {
            flex-shrink: 0;
            max-width: 5rem;
            line-height: 1.25rem;
          }
          .address-phone {
            width: 100%;
            margin-left: 1rem;
            line-height: 1.25rem;
          }
          .address-default {
            padding: 0 8px;
            margin: .125rem 0;
            flex-shrink: 0;
            line-height: 1rem;
            background-color: #D9B766;
            color: #fff;
            border-radius: 4px;
          }
          .address-text {
            line-height: 1rem;
            margin: .125rem 0;
          }
        }
      }
      .item-edit {
        width: 1.65rem;
        height: 2.5rem;
        line-height: 2.5rem;
        text-align: right;
        flex-shrink: 0;
        border-left: 2px solid #E9E9E9;

        i {
          font-size: 1rem !important;
          color: #222;
        }
      }
    }

  }
</style>
<script>

  import service from '../../services'
  import {each as _each} from 'underscore'

  export default {
    data(){
      return {
        curAddress: null,
        list: []
      }
    },
    created(){

      this.curAddress = this.$store.getters.address;
      console.log(this.curAddress)
      this.getList();
    },
    methods: {
      getList(){
        service.get("/addressManage/list").then((res) => {
          let ret = res.data;
          if (ret.success) {
            this.list = ret.dataList;
          }
        })
      },

      onSelectAddress(item){
        this.$store.dispatch("selectAddress", item).then(() => {
          this.$router.go(-1)
        })
      },
      pageBack(){
        if (this.curAddress) {
          _each(this.list, (item) => {
            if (item.id === this.curAddress.id) {
              this.$store.dispatch("selectAddress", item);
            }
          })
        }
        this.$router.go(-1)
      },
      edit(id){
        this.$router.push({
          path: '/addressform',
          query: {
            mode: 2,
            id: id
          }
        })
      }
    }
  }
</script>













