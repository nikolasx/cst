<template>

  <div class="wrapper">

    <router-view></router-view>

  </div>

</template>

<style lang="less">

  @import "./assets/css/sm.min.css";
  @import "./assets/font/iconfont.css";
  @import "./assets/css/common";

  .picker {
    z-index: 9999 !important;
  }

  .empty-container {
    .empty-icon {
      width: 8.75rem;
      height: 5rem;
      margin: 3rem auto 0;
      background-image: url("./assets/img/wushuju_img@2x.png");
      background-size: cover;
    }

    .empty-text {
      line-height: 2rem;
      text-align: center;
      color: #999;
    }
  }

  .iconfont {
    font-size: .8rem !important;
  }

  .c9 {
    color: #999 !important;
  }

  .c6 {
    color: #666 !important;
  }

  .cred {
    color: #dd5a60 !important;
  }

  //气泡信息样式
  .toast-container {
    position: absolute;
    z-index: 19900829;
    background-color: #ffffff;
    width: 10rem;
    border-radius: 4px;
    left: 50%;
    margin-left: -5rem;

    &:after {
      content: '';
      clear: both;
      display: table-cell;
    }

    &.toast-success {
      border: 1px solid #2ac845;
      span {
        color: #2ac845 !important;
      }
    }

    &.toast-error {
      border: 1px solid #dd5a60;
      span {
        color: #dd5a60 !important;
      }
    }

    &.toast-warning {
      border: 1px solid #FBBC05;
      span {
        color: #FBBC05 !important;
      }
    }

    .toast-left {
      float: left;
      position: relative;
      width: 2rem;

      span {
        font-size: 1rem !important;
        margin-left: .5rem;
      }
    }

    .toast-right {
      float: left;
      .toast-tip {
        width: 7.5rem;
        line-height: .8rem;
        padding: .5rem 0;
        color: #666 !important;
      }
    }

  }

  //confirm信息样式
  .toast-confirm-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 19900829;
    background: rgba(0,0,0,.2);

    *{
      font-size: .8rem !important;
    }


    .toast-confirm-content {
      position: absolute;
      width: 12rem;
      top: 12rem;
      left: 50%;
      margin-left: -6rem;
      background-color: #fff;
      border: 1px solid #BDBDBC;
      border-radius: 8px;

      .toast-tip {
        padding: 1.5rem 1rem;
        text-align: center;
        line-height: .8rem;
        border-bottom: 1px solid #E5E5E5;
      }

      .toast-bottom {
        height: 2.5rem;
        display: flex;

        .button1,.button2{
          width: 100%;
          height: 100%;
          line-height: 2.5rem;
          text-align: center;
          color: #838383;
        }

        .button2{
          border-left: 1px solid #e5e5e5;
          color: #347AFE;
        }
      }
    }
  }

</style>
