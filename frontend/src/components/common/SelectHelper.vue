<template>


  <div class="sh-container">
    <div class="sh-content">
      <template v-for="(list,key) in listObj">
        <div class="select-flag">{{key}}</div>
        <div>
          <a class="select-item" v-for="item in list">{{item.enName}}</a>
        </div>
      </template>
    </div>
    <div class="sh-bar-container">
      <template v-for="(list,key) in listObj">
        <a class="nav-item">{{key}}</a>
      </template>
    </div>
  </div>

</template>

<style lang="less" scoped>

  .sh-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .sh-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;

    .select-flag {
      height: .8rem;
      padding: 0 .75rem;
      line-height: .8rem;
      font-weight: bold;
    }

    .select-item {
      display: block;
      height: 1.75rem;
      padding: 0 .75rem;
      background-color: #fff;
      line-height: 1.75rem;
      color: #222222;
      text-decoration: none;
      border-bottom: 1px solid #F4F4F4;
    }
  }

  .sh-bar-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1.25rem;
    z-index: 99;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .nav-item {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: #222;
      font-weight: bold;
      text-decoration: none;
    }
  }


</style>

<script>

  import {each as _each} from 'underscore'

  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        charList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      }
    },

    mounted() {

    },

    computed: {
      listObj() {
        let rep = /[A-Z]/, result = {};
        _each(this.charList, char => {
          result[char] = []
        })
        result['#'] = []
        _each(this.list, item => {
          let firstChar = item.enName.charAt(0).toUpperCase()
          if (rep.test(firstChar)) {
            result[firstChar].push(item)
          } else {
            result['#'].push(item)
          }
        })
        _each(result, (list, key) => {
          if (list.length == 0) {
            delete result[key]
          }
        })
        return result
      }
    },

    methods: {}
  }

</script>
