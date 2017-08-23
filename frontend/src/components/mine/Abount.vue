<template>
  <div class="page page-current">
    <header class="bar bar-nav">
      <a class="pull-left page-back" @click="pageBack">
        <i class="iconfont icon-callback"></i>
      </a>

      <h1 class="title">关于我们</h1>
    </header>
    <div class="content">
      <div class="container">
        <p class="description">CST中星是一家由新加坡和中国企业家共同投资，致力于为购物中心和零售品牌提供All-In-One整体
          智慧商业解决方案的大数据科技公司。CST中星提供的解决方案贯穿整个商业的生态圈，从引流、创新体验感、
          提高成交率和销售额，到粉丝经济运营，到管理一线的导购员，打通整个价值链，帮助商家和消费者实现共赢。</p>
        <div class="contact-container">
          <div class="contact-line">电话： 400-995-5289</div>
          <div class="contact-line">邮箱： service@chinastartec.com</div>
          <div class="contact-line">地址： 深圳市南山区科苑南路储能大厦35DE单元</div>
        </div>
      </div>
    </div>

  </div>
</template>


<style lang="less" scoped>


  .container {
    padding: .7rem;
    background-color: #ffffff;

    .description {
      margin: 0 0 2rem;
      color: #282828;
      line-height: 1.4rem;
      text-indent: 1.4rem;
    }

    .contact-line{
      line-height: 1.4rem;
      color: #7a7a7a;
    }
  }
</style>


<script>


  export default {

    methods: {
      pageBack(){
        this.$emit("back")
      }
    }
  }

</script>
