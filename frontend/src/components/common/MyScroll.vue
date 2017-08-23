<template>

  <div class="scroll-wrapper">
    <div class="scroll-container">
      <header class="scroll-header">
        <div class="pulldown-tip" v-show="showTopText">
          <div class="pulldown-text pulldown-arrow"><i class="iconfont icon-iconset0413 c9"></i></div>
          <div class="pulldown-text c9">下拉刷新</div>
        </div>
        <div class="scroll-loading" v-show="showTopLoading">

        </div>
      </header>
      <div class="scroll-content">
        <slot></slot>
      </div>
      <footer class="scroll-footer">
        <div class="pullup-tip" v-show="showBottomText">
          <div class="pulldown-text c9">加载更多数据</div>
          <div class="pulldown-text pullup-arrow"><i class="iconfont icon-iconset0413 c9"></i></div>
        </div>
        <div class="scroll-loading" v-show="showBottomLoading"></div>
        <div class="scroll-nodata" v-show="!hasMoreData && this.pullUpEnable">没有更多数据了</div>
      </footer>
    </div>

  </div>

</template>

<style scoped lang="less">

  * {
    box-sizing: border-box;
  }

  .scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .scroll-header {
    height: 60px;
    margin-top: -60px;
    overflow: hidden;
  }

  .pulldown-text, pullup-text {
    height: 30px;
    text-align: center;
    line-height: 30px;

    .iconfont {
      font-size: 20px !important;
      font-weight: bold;
    }
  }

  .pullup-arrow {
    transform: rotate(180deg);
  }

  .scroll-loading {
    width: 30px;
    height: 30px;
    margin: 15px auto;
    background-image: url("../../assets/loading.gif");
    background-size: cover;

  }

  .scroll-nodata {
    color: #999;
    line-height: 30px;
    margin: 5px auto;
    text-align: center;
  }

  .scroll-content {
    overflow: hidden;
  }

  .scroll-footer {
    height: 60px;
  }

</style>

<script>
  export default {

    props: {
      refresh: {
        required: true,
        type: Function
      },

      loadMore: {
        required: true,
        type: Function
      },

      hasMoreData: {
        required: true,
        type: Boolean
      },

      list: {
        type: Array,
        required: true
      }
    },

    data(){

      return {

        /**
         * 提示文字显示信息
         */
        showTopText: false, //显示顶部提示文字
        showTopLoading: false, //显示顶部加载图标
        showBottomText: false, //显示底部提示文字
        showBottomLoading: false, //显示底部加载图标

        /**
         * 容器固有属性信息
         */
        $container: null, //动画容器
        scrollHeight: 0, //内容高度
        clientHeight: 0, //窗口高度

        /**
         * 动画过程状态信息
         */
        timestamp: 0, //时间戳
        scrollTop: 0, //滚动位置
        startY: 0, //一次动画的开始位置，后面用于计算惯性
        currentY: 0, //当前手指位置
        pullUpEnable: false, //是否允许上拉操作
      }

    },

    mounted(){

      this.$container = this.$el.querySelector(".scroll-container")

      this.$watch("list", () => {
        this.init();
      })
    },

    methods: {
      init(){
        this.$nextTick(() => {
          this.scrollHeight = this.$container.querySelector(".scroll-content").scrollHeight
          this.clientHeight = this.$el.clientHeight
          this.pullUpEnable = this.scrollHeight > this.clientHeight ? true : false;

          this.addEvents()
        })
      },
      addEvents(){
        this.removeEvents();
        this.$el.addEventListener("touchstart", this.startHandler, false)
        this.$el.addEventListener("touchmove", this.moveHandler, false)
        this.$el.addEventListener("touchend", this.endHandler, false)
      },
      removeEvents(){
        this.$el.removeEventListener("touchstart", this.startHandler, false)
        this.$el.removeEventListener("touchmove", this.moveHandler, false)
        this.$el.removeEventListener("touchend", this.endHandler, false)
      },

      startHandler(event){
        /**
         * 一次滑动开始
         */
        this.timestamp = new Date() * 1;
        this.startY = this.currentY = event.touches[0].clientY;
      },
      moveHandler(event){

        /**
         * 滑动过程中
         */
        //阻止默认操作，保证莫vestart持续触发
        event.preventDefault();

        let _currentY = event.touches[0].clientY,
          _diffY = _currentY - this.currentY

        if (_diffY > 0) {
          //下拉操作
          //1. 滚动条scrollTop>=0
          if (this.scrollTop >= 0) {
            //加大下拉阻力
            this.scrollTop += _diffY * 0.5;

            //处理顶部提示文字显示
            if (this.scrollTop > 10) {
              this.showTopText = true;

              //处理箭头旋转
              if (this.scrollTop >= 50 && this.scrollTop <= 100) {
                this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(' + (this.scrollTop - 50) * 180 / 50 + 'deg)';
              } else if (this.scrollTop > 100) {
                this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(180deg)';
              } else {
                this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(0deg)';
              }
            }

            this.setTrans(0, this.scrollTop); //滑动到对应位置
          }

          //2. 滚动条scrollTop<0
          else {
            this.scrollTop += _diffY; //正常滑动
            this.setTrans(0, this.scrollTop);

            if (!!this.pullUpEnable && this.scrollTop <= this.clientHeight - this.scrollHeight) {
              let tmpRelativeHeight = Math.abs(this.scrollTop) - (this.scrollHeight - this.clientHeight);
              if (tmpRelativeHeight >= 50 && tmpRelativeHeight <= 100) {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(' + ((tmpRelativeHeight - 50) * 180 / 50 + 180) + 'deg)';
              } else if (tmpRelativeHeight > 100) {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(360deg)';
              } else {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(180deg)';
              }
            }
          }
        }


        if (_diffY < 0) {
          //上拉操作
          if (!!this.pullUpEnable && this.scrollTop <= this.clientHeight - this.scrollHeight) {
            //加大上拉阻力
            this.scrollTop += _diffY * 0.5;
            let tmpRelativeHeight = Math.abs(this.scrollTop) - (this.scrollHeight - this.clientHeight);

            if (this.hasMoreData) {
              this.showBottomText = true;

              if (tmpRelativeHeight >= 50 && tmpRelativeHeight <= 100) {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(' + ((tmpRelativeHeight - 50) * 180 / 50 + 180) + 'deg)';
              } else if (tmpRelativeHeight > 100) {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(360deg)';
              } else {
                this.$el.querySelector(".pullup-arrow").style.transform = 'rotate(180deg)';
              }
            }

            this.setTrans(0, this.scrollTop); //滑动到对应位置
          } else if (!this.pullUpEnable) {
            this.scrollTop += _diffY * 0.5;
            this.setTrans(0, this.scrollTop);

            //处理箭头旋转
            if (this.scrollTop >= 50 && this.scrollTop <= 100) {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(' + (this.scrollTop - 50) * 180 / 50 + 'deg)';
            } else if (this.scrollTop > 100) {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(180deg)';
            } else {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(0deg)';
            }

          } else {
            this.scrollTop += _diffY; //正常滑动
            this.setTrans(0, this.scrollTop);

            //处理箭头旋转
            if (this.scrollTop >= 50 && this.scrollTop <= 100) {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(' + (this.scrollTop - 50) * 180 / 50 + 'deg)';
            } else if (this.scrollTop > 100) {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(180deg)';
            } else {
              this.$el.querySelector(".pulldown-arrow").style.transform = 'rotate(0deg)';
            }
          }
        }

        this.currentY = _currentY;

      },
      endHandler(event){

        /**
         * 滑动结束时动画
         */
        let _timestamp = new Date() * 1;

        //讨论滚动条所处的位置
        //1. 若滚动条scrollTop>0
        if (this.scrollTop > 0) {
          if (this.scrollTop > 100) {
            //开启刷新操作
            this.scrollTop = 60;
            this.setTrans(200, this.scrollTop);
            this.showTopText = false;
            this.showTopLoading = true;
            this.removeEvents();

            this.refresh(() => {
              //刷新后的方法
              this.showTopLoading = false;
              this.scrollTop = 0;
              this.setTrans(0, this.scrollTop);
              this.init();
            })


          } else {
            //回弹
            this.showTopText = false;
            this.showTopLoading = false;
            this.scrollTop = 0;
            this.setTrans(300, this.scrollTop);
          }
        }
        else if (!this.pullUpEnable) {
          // 不能上拉，但滚动条有上拉操作,直接回弹
          this.scrollTop = 0;
          this.setTrans(300, this.scrollTop);
        }
        else if (this.scrollTop < this.clientHeight - this.scrollHeight) {
          //判断是否加载更多数据
          let tmpRelativeHeight = Math.abs(this.scrollTop) - (this.scrollHeight - this.clientHeight);
          if (tmpRelativeHeight > 100 && this.hasMoreData) {
            //开启加载更多数据操作
            this.scrollTop = this.clientHeight - this.scrollHeight - 60;
            this.setTrans(200, this.scrollTop);
            this.showBottomText = false;
            this.showBottomLoading = true;
            this.removeEvents();

            this.loadMore(flag => {
              this.showBottomLoading = false;
              this.scrollTop = this.clientHeight - this.scrollHeight;
              this.setTrans(0, this.scrollTop)
              this.init();
            })
          }
          else {
            //直接回弹
            this.scrollTop = this.clientHeight - this.scrollHeight;
            this.setTrans(300, this.scrollTop)
            this.showBottomText = false;
            this.showBottomLoading = false;
          }
        }
        else {
          let _diffDis = this.currentY - this.startY;
          let _distance = Math.abs(_diffDis)
          if (_distance < 120 || _distance * 1000 / (_timestamp - this.timestamp) < 200) {
            //这种情况不做惯性处理
          } else {
            let _slideDistance = _diffDis * 600 / (_timestamp - this.timestamp);
            if (this.scrollTop + _slideDistance > 0) {
              this.scrollTop = 0
            } else if (this.scrollTop + _slideDistance < -this.scrollHeight + this.clientHeight) {
              this.scrollTop = -this.scrollHeight + this.clientHeight
            } else {
              this.scrollTop += _slideDistance
            }
            this.setTrans(500, this.scrollTop)
          }
        }
      },
      setTrans(time, target){

        this.$container.style.webkitTransition = 'ease'
        this.$container.style.WebkitTransitionDuration = time + 'ms'
        this.$container.style.WebkitTransform = 'translate3d(0,' + target + 'px,  0)'
      }
    }

  }
</script>


























