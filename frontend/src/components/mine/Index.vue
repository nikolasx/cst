<template>

  <div class="page page-current mine-container">

    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>

      <h1 class="title">我的</h1>
    </header>
    <div class="content">
      <ul class="list-container">
        <li class="list-item">
          <a class="list-content">
            <div class="item-label item-label1">头像</div>
            <div class="item-text item-text1" @click="selectImg">
              <i class="iconfont icon-xiangyou"></i>
              <template v-if="info.img">
                <span class="mine-touxiang item-right-space" id="touxiang"
                      v-bind:style="'background-image: url('+info.fdshost+info.img+')'"></span>
              </template>
              <template v-else>
                <span class="mine-touxiang item-right-space" id="touxiang"></span>
              </template>
            </div>
          </a>
          <form id="uploadForm" enctype="multipart/form-data" style="display: none">
            <input type="file" name="imgFile" @change="uploadImage"/>
          </form>
        </li>
        <li class="list-item">
          <router-link class="list-content" to="minedetail/nickname">
            <div class="item-label">昵称</div>
            <div class="item-text">
              <i class="iconfont icon-xiangyou"></i>
              <span class="item-right-space">{{!!info.nickname ? info.nickname : "未知"}}</span>
            </div>
          </router-link>
        </li>
        <li class="list-item">
          <router-link class="list-content" to="minedetail/sex">
            <div class="item-label">性别</div>
            <div class="item-text">
              <i class="iconfont icon-xiangyou"></i>
              <span class="item-right-space">{{sex}}</span>
            </div>
          </router-link>
        </li>
        <li class="list-item">
          <a class="list-content">
            <div class="item-label">手机号码</div>
            <div class="item-text">
              <span class="item-right-space">{{!!info.phoneNum ? info.phoneNum : "未知"}}</span>
            </div>
          </a>
        </li>
        <li class="list-item">
          <a class="list-content">
            <div class="item-label">会员级别</div>
            <div class="item-text">
              <!--<i class="iconfont icon-xiangyou"></i>-->
              <span class="item-right-space">{{!!info.level ? info.level : "未知"}}</span>
            </div>
          </a>
        </li>
        <li class="list-item">
          <router-link class="list-content" to="addresslist">
            <div class="item-label">地址</div>
            <div class="item-text">
              <i class="iconfont icon-xiangyou"></i>
            </div>
          </router-link>
        </li>
        <li class="list-item">
          <router-link class="list-content" to="/exchangerate">
            <div class="item-label">汇率换算</div>
            <div class="item-text">
              <i class="iconfont icon-xiangyou"></i>
            </div>
          </router-link>
        </li>
        <li class="list-item">
          <router-link class="list-content" to="/minedetail/about">
            <div class="item-label">关于买手系统</div>
            <div class="item-text">
              <i class="iconfont icon-xiangyou"></i>
            </div>
          </router-link>
        </li>
        <li class="list-item">
          <a class="list-content" @click="clearCache">
            <div class="item-label">清空缓存</div>
            <div class="item-text">
            </div>
          </a>
        </li>
      </ul>

      <div class="btn-bottom" v-on:click="exit">退出当前登录</div>
    </div>
  </div>

</template>


<style lang="less" scoped>

  .list-container {

    margin: 0;
    padding: 0 0 3rem 0;

    .list-item {
      list-style: none;
      padding: .3rem .5rem;
      background-color: #ffffff;
      border-bottom: 1px solid #f3f3f3;

      .list-content {
        display: flex;
        justify-content: space-between;
        text-decoration: none;

        .item-label {
          height: 1.9rem;
          line-height: 1.9rem;
        }
        .item-text {
          display: flex;
          flex-direction: row-reverse;
          height: 1.9rem;
          line-height: 1.9rem;
        }
        .item-label1 {
          height: 2.2rem;
          line-height: 2.2rem;
        }

        .item-text1 {
          height: 2.2rem;
          line-height: 2.2rem;
        }

        .item-right-space {
          margin-right: .5rem;
        }
      }
    }

    .mine-touxiang {
      display: inline-block;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 2.2rem;
      background-image: url("../../assets/img/mine/wode_touxiang@2x.png");
      background-size: cover;
    }
  }

</style>


<script>

  import service from '../../services'
  import {each as _each, keys as _keys} from 'underscore'
  import {string} from '../../lib/util'
  import ImageAgent from '../../plugins/compressimage'

  export default {

    data(){
      return {
        info: {
          id: "",
          fdshost: "",
          img: null,
          nickname: null,
          phoneNum: null,
          level: null,
          sex: null

        }
      }
    },

    computed: {
      sex(){
        if (this.info.sex == null) {
          return "未知"
        } else {
          return this.info.sex == 0 ? '男' : '女'
        }
      }

    },

    created(){
      this.getMemberInfo();
    },

    methods: {

      pageBack(){
        this.$router.go(-1)
      },

      //退出
      exit(){
        service.get("/logout").then((response) => {
          location.href = "/index"
        })
      },

      //获取个人信息
      getMemberInfo(){
        service.get("/mine/member").then((res) => {
          let ret = res.data;
          if (ret.success) {
            let data = ret.data;
            _each(_keys(this.info), (item) => {
              this.info[item] = data[item];
            })
          }
        })
      },

      //清空缓存
      clearCache(){
        setTimeout(() => {
          this.$toast.success("已清空！")
        }, 1000)
      },


      //图片上传
      selectImg(){
        this.$el.querySelector("#uploadForm>input").click();
      },
      uploadImage(){
        let form = this.$el.querySelector("#uploadForm"),
          input = form.querySelector('input[name="imgFile"]')

        try {

          let file = null;
          if (input.files && input.files[0]) {
            file = input.files[0];
          } else if (input.files && input.files.item(0)) {
            file = input.files.item(0);
          } else {
            return;
          }

          let reader = new FileReader();
          reader.onload = e => {
            ImageAgent.mixedCompress(e.target.result).then(res => {
              service.post("/mine/imgFileUpload", {
                imageStrLst: res,
                imageNameLst: file.name
              }).then(res => {
                let ret = res.data;
                if (ret.success) {
                  let data = ret.data;
                  let path = data.fdshost + data.path;
                  this.$el.querySelector("#touxiang").style.backgroundImage = string.format('url({0})', path);

                  input.value = "";

                  service.post("/mine/updateMember", {
                    id: this.info.id,
                    img: data.path
                  })
                }
              })
              input.value = "";
            })

          }

          reader.readAsDataURL(file);


        } catch (e) {

        }


        /*service.form("/mine/imgFileUpload", new FormData(form)).then(res => {
         let ret = res.data;
         if (ret.success) {
         let data = ret.data;
         let path = data.fdshost + data.path;
         this.$el.querySelector("#touxiang").style.backgroundImage = string.format('url({0})', path);

         form.reset();

         service.post("/mine/updateMember", {
         id: this.info.id,
         img: data.path
         })
         }
         }).catch((error) => {
         form.reset();
         })*/
      }


    }

  }
</script>
