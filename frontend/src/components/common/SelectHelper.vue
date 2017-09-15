<template>
  <div class="sh-container">
    <div class="sh-content" @click="selectBrand($event)">
      <template v-for="(list,key) in listObj">
        <div class="select-flag" :data-flag="key">{{key}}</div>
        <div>
          <a class="select-item" :data-id="item.id" v-for="item in list">{{item.enName}}</a>
        </div>
      </template>
    </div>
    <div class="sh-bar-container" v-show="showNav" @click="navTo($event)">
      <template v-for="(list,key) in listObj">
        <a class="nav-item" :data-value="key">{{key}}</a>
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
  import {string} from '../../lib/util'

  export default {
    props: {
      list: {
        type: Array,
        default: []
      },
      searchKey: {
        type: String,
        default: ''
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
      },

      showNav() {
        return this.searchKey == ''
      }
    },

    methods: {
      selectBrand(e) {
        let target = e.target;
        if (/select-item/.test(target.className)) {
          let id = target.getAttribute("data-id")
          this.$emit("onSelect", id)
        }
      },
      navTo(e) {
        let target = e.target
        if (/nav-item/.test(target.className)) {
          let value = target.getAttribute("data-value"),
            flag = this.$el.querySelector(string.format(".select-flag[data-flag='{0}']", value));
          this.$el.querySelector('.sh-content').scrollTop = flag.offsetTop
        }
      }
    }
  }

</script>

















