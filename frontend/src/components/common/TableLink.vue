//标签页通用组件

<template>
  <div class="tab-container">
    <div class="link-header">
      <template v-for="item in list">
        <a :class="item.selected? 'tab-link active':'tab-link'" @click="onSelect(item)">
          {{item.name}}
        </a>
      </template>

    </div>
    <div class="link-content">
      <template v-for="(item,index) in list">
        <div class="tab-content" v-show="item.selected">
          <slot :name="item.id"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .tab-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .link-header {
      width: 100%;
      height: 2.5rem;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      overflow-y: hidden;
      overflow-x: auto;

      .tab-link {
        width: 100%;
        min-width: 3rem;
        display: block;
        line-height: 2.4rem;
        color: #222;
        text-decoration: none;
        text-align: center;
        border-bottom: 1px solid #ffffff;
        &.active {
          color: #DCBB6F;
          border-bottom: 1px solid #DCBB6F;
        }
      }
    }

    .link-content {
      position: absolute;
      top: 2.5rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
      border-top: 1px solid #f3f3f3;

      .tab-content {
        width: 100%;
        overflow: hidden;
      }
    }
  }
</style>

<script>

  import {each as _each} from 'underscore'

  export default {
    name: "tab-link",

    props: ["tabs",'defaultId'],
    data(){
      return {
        list: []
      }
    },

    created(){
      _each(this.tabs, (item, index) => {
        this.list.push({
          name: item.text,
          id: item.id,
          selected: item.id == this.defaultId ? true : false
        })
      });

      this.$emit("select", this.defaultId);

    },


    methods: {

      onSelect(item){
        _each(this.list, (item) => {
          item.selected = false;
        });
        item.selected = true;

        this.$emit("select", item.id);

      }
    }
  }
</script>













