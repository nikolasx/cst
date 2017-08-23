<template>

  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>
      <h1 class="title">修改昵称</h1>
      <a class="pull-right btn-save" @click="save">保存</a>
    </header>
    <div class="content">
      <div class="input-container">
        <input v-model.trim="nickname" placeholder="请填写昵称"/>
      </div>
    </div>

  </div>

</template>


<style lang="less" scoped>
  .btn-save {
    position: relative;
    width: 2rem;
    text-align: right;
    color: #222;
    text-decoration: none;
    line-height: 2.2rem;
    z-index: 1;
  }

  .input-container {
    position: relative;
    width: 100%;
    height: 2.5rem;
    margin: .5rem 0;
    background-color: #ffffff;

    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: .75rem .5rem;
      line-height: 1rem;
    }
  }
</style>


<script>

  import service from '../../services'

  export default {
    data(){
      return {
        id: "",
        nickname: ""
      }
    },
    created(){
      service.get("/mine/member").then((res) => {
        let ret = res.data;
        if (ret.success) {
          let data = ret.data;
          this.id = data.id;
          this.nickname = data.nickname;
        }
      })
    },
    methods: {
      pageBack(){
        this.$emit("back")
      },
      save(){
        if (this.nickname == "") {
          this.$toast.warning("请填写昵称");
          return;
        }

        service.post("/mine/updateMember", {
          id: this.id,
          nickname: this.nickname
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
