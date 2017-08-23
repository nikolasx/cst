<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">修改性别</h1>
    </header>

    <div class="content">
      <div class="container">
        <template v-for="item in list">
          <a class="select-container" @click="onSelect(item)">
            <span class="select-text">{{item.text}}</span>
            <span class="select-button" v-if="item.selected">
              <i class="iconfont icon-duigou1"></i>
            </span>
          </a>
        </template>

      </div>
    </div>

  </div>

</template>


<style lang="less" scoped>
  .container {
    margin-top: .5rem;
    background-color: #ffffff;
    border-top: 1px solid #dddddd;

    .select-container {
      display: flex;
      justify-content: space-between;
      height: 2.5rem;
      padding: 0 .5rem;
      text-decoration: none;
      border-bottom: 1px solid #dddddd;
    }

    .select-text {
      line-height: 2.5rem;
    }
    .select-button {
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: right;
    }
  }
</style>

<script>

  import service from '../../services'

  export default {

    data(){
      return {
        id: "",
        list: [
          {
            value: 0,
            text: '男',
            selected: false
          },
          {
            value: 1,
            text: '女',
            selected: false
          }
        ]
      }
    },

    created(){
      this.getData();
    },

    methods: {

      pageBack(){
        this.$emit("back");
      },

      getData(){
        service.get("/mine/member").then(res => {
          let ret = res.data;
          if (ret.success) {
            let data = ret.data;
            this.id = data.id;
            if (data.sex != null) {
              this.list[data.sex].selected = true;
            }
          }
        })
      },

      onSelect(item){
        service.post("/mine/updateMember", {
          id: this.id,
          sex: item.value
        }).then(res => {
          let ret = res.data;
          if (ret.success) {
            this.pageBack();
          }
        })
      }
    }
  }

</script>
