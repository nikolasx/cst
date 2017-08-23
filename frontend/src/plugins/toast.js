/**
 * 弹出信息提示插件
 * Created by nicholas on 2017/8/8.
 */

const toast = {
  
  install(Vue, option){
    
    Vue.prototype.$toast = (type, tip) => {
      
      let toastTpl, time
      switch (type) {
        case 'success':
          toastTpl = Vue.extend({
            template: `<div class="toast-container toast-success">
                        <div class="toast-left"><span class="iconfont icon-duigou"></span></div>
                        <div class="toast-right">
                          <div class="toast-tip">${tip}</div>
                        </div>
                       </div>`
          })
          time = 1000
          break
        case 'error':
          toastTpl = Vue.extend({
            template: `<div class="toast-container toast-error">
                        <div class="toast-left"><span class="iconfont icon-cha"></span></div>
                        <div class="toast-right">
                          <div class="toast-tip">${tip}</div>
                        </div>
                       </div>`
          })
          time = 3000
          break
        case 'warning':
          toastTpl = Vue.extend({
            template: `<div class="toast-container toast-warning">
                        <div class="toast-left"><span class="iconfont icon-gantanhao-copy"></span></div>
                        <div class="toast-right">
                          <div class="toast-tip">${tip}</div>
                        </div>
                       </div>`
          })
          time = 2000
          break
        default:
          return
      }
      let tpl = new toastTpl().$mount().$el
      document.body.appendChild(tpl)
      let height = tpl.clientHeight,
        bodyHeight = document.body.clientHeight;
      tpl.style.top = ((bodyHeight - height) / 2) + 'px'
      tpl.querySelector(".iconfont").style.lineHeight = height + 'px'
      
      setTimeout(() => {
        document.body.removeChild(tpl)
      }, time)
    }
    
    
    ["success", "error", "warning"].forEach(type => {
      Vue.prototype.$toast[type] = tip => Vue.prototype.$toast(type, tip)
    })
    
    //确认
    Vue.prototype.$toast['confirm'] = (tip, callback) => {
      let toastTpl = Vue.extend({
        template: `<div class="toast-confirm-container">
                    <div class="toast-confirm-content">
                    <div class="toast-tip">${tip}</div>
                    <div class="toast-bottom">
                    <a class="button1" @click="destroy">取消</a>
                    <a class="button2" @click="submit">确定</a></div>
                    </div>
                  </div>`,
        methods: {
          destroy(){
            document.body.removeChild(this.$el)
          },
          submit(){
            this.destroy();
            callback();
          }
        }
      })
      let tpl = new toastTpl().$mount().$el
      document.body.appendChild(tpl)
      
      let content = tpl.querySelector(".toast-confirm-content"),
        height = content.clientHeight,
        bodyHeight = document.body.clientHeight;
      content.style.top = ((bodyHeight - height) / 2) + 'px'
    }
  }
  
  
}

module.exports = toast;
