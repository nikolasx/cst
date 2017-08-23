<template>

  <div class="qs-container">
    <div class="qs-search-container">
      <span class="iconfont icon-search"></span>
      <input placeholder="搜索" v-model.trim="searchKey"/>
    </div>
    <div class="qs-content">
      <select-helper :list="selectList"></select-helper>
    </div>
  </div>

</template>

<style lang="less" scoped>

  .qs-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background-color: #f4f4f4;
  }

  .qs-search-container {
    height: 46px;
    padding: 10px;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    background-color: #fff;
    display: flex;

    .iconfont {
      width: 25px;
      flex-shrink: 0;
      font-size: 20px !important;
      line-height: 26px;
    }

    & > input {
      width: 100%;
      height: 26px;
      border: none;
      outline: none;
      padding: 3px;
      line-height: 20px;
    }
  }

  .qs-content {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>

<script>

  import SelectHelper from './SelectHelper'

  export default {
    components: {
      SelectHelper
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        searchKey: ''
      }
    },
    computed: {
      selectList() {
        let result = [],
          expKey;

        if (this.searchKey != '') {
          expKey = new RegExp(this.searchKey, 'gi')
        }
        this.list.forEach(item => {
          if (this.searchKey == '') {
            result.push(item)
          } else {
            if (expKey.test(item.enName)) {
              result.push(item)
            }
          }
        })
        return result;
      }
    }
  }
</script>
