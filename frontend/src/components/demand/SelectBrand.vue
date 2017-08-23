<template>

  <div class="page page-current">

    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">选择品牌</h1>
    </header>
    <div class="content">
      <quick-select :list="brandList"></quick-select>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>

  import QuickSelect from '@/components/common/QuickSelect'
  import Service from '../../services'

  export default {

    components: {
      QuickSelect
    },

    data() {
      return {
        brandList: []
      }
    },

    created(){
      this.getBrandList()
    },

    methods: {
      pageBack() {
        this.$router.go(-1)
      },

      //获取商品品牌
      getBrandList() {
        Service.get("/product/brandList").then(response => {
          let ret = response.data;
          if (ret.success) {
            let list = ret.dataList
            this.brandList = list
          }
        })
      }


    }
  }
</script>
