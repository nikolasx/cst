import EventEmitter from './eventEmitter'
import {
  extend
} from './lang'
import {
  createDom,
  printf,
  addEvent,
  removeEvent
} from './dom'
import viewTemplate from './view.handlebars'
import './view.css'
import './font/iconfont.css'


export default class ImageView extends EventEmitter {
  
  constructor(options) {
    
    super();
    
    this.options = {
      imgs: []
    }
    
    extend(this.options, options);
    
    this.viewEl = createDom(viewTemplate({
      imgs: this.options.imgs
    }))
    document.body.appendChild(this.viewEl)
    
    this.maxImgWidth = this.viewEl.clientWidth - 20
    this.maxImgHeight = this.viewEl.clientHeight - 80
    this.imgEl = this.viewEl.querySelector('.view-image')
    this.imgsScale = new Array(this.options.imgs.length)
    this.count = this.options.imgs.length
    this.headerTextEl = this.viewEl.querySelector(".iv-header>span")
    this.currentIndex = 0
    
    //滑动属性
    this.currentX = 0
    this.currentY = 0
    this.posX = 0
    this.posY = 0
    
    this._init();
    
  }
  
  _init() {
    
    
    this._renderImg(0)
    
    this._bindEvents();
  }
  
  _bindEvents() {
    
    addEvent(this.viewEl.querySelector(".iv-swipe-right"), 'click', this)
    addEvent(this.viewEl.querySelector(".iv-swipe-left"), 'click', this)
    addEvent(this.viewEl.querySelector(".iv-back"), 'click', this)
    
    addEvent(this.imgEl, 'touchstart', this)
    addEvent(this.imgEl, 'touchmove', this)
    addEvent(this.imgEl, 'touchend', this)
  }
  
  _unbindEvents() {
    removeEvent(this.viewEl.querySelector(".iv-swipe-right"), 'click', this)
    removeEvent(this.viewEl.querySelector(".iv-swipe-left"), 'click', this)
    removeEvent(this.viewEl.querySelector(".iv-back"), 'click', this)
    
    removeEvent(this.imgEl, 'touchstart', this)
    removeEvent(this.imgEl, 'touchmove', this)
    removeEvent(this.imgEl, 'touchend', this)
  }
  
  handleEvent(e) {
    let target = e.currentTarget
    switch (e.type) {
      case 'click':
        if (/iv-swipe-right/.test(target.className)) {
          this._next()
        } else if (/iv-swipe-left/.test(target.className)) {
          this._pre();
        } else if (/iv-back/.test(target.className)) {
          this._destroy()
        }
        break;
      case 'touchstart':
        this._startHandle(e)
        break;
      case 'touchmove':
        this._moveHandle(e)
        break;
      case 'touchend':
        this._endHandle(e)
        break;
    }
  }
  
  _startHandle(e) {
    this.currentX = e.touches[0].pageX
    this.currentY = e.touches[0].pageY
  }
  
  _moveHandle(e) {
    e.preventDefault()
    
    let touch = e.touches[0]
    this.posX += touch.pageX - this.currentX
    this.posY += touch.pageY - this.currentY
    
    this.currentY = touch.pageY
    this.currentX = touch.pageX
    
    this._setTrans(this.posX, this.posY, 0)
    
  }
  
  _endHandle(e) {
    
    if (Math.abs(this.posX) < this.maxImgWidth / 3 || this.count <= 1 || this.posX < 0 && this.currentIndex >= this.count - 1 ||
      this.posX > 0 && this.currentIndex ==0 ) {
      this.posX = 0;
      this.posY = 0;
      this._setTrans(this.posX, this.posY, 300);
    } else {
      if (this.posX > 0) {
        this.posX = this.maxImgWidth
        this._setTrans(this.posX, this.posY, 400)
        setTimeout(() => {
          this.posX = 0;
          this.posY = 0;
          this._setTrans(this.posX, this.posY, 0)
          this._pre();
        }, 400)
      } else {
        this.posX = -this.maxImgWidth
        this._setTrans(this.posX, this.posY, 400)
        setTimeout(() => {
          this.posX = 0;
          this.posY = 0;
          this._setTrans(this.posX, this.posY, 0)
          this._next();
        }, 400)
      }
    }
  }
  
  _next() {
    if (this.currentIndex < this.count - 1) {
      this._renderImg(this.currentIndex + 1)
    }
  }
  
  _pre() {
    if (this.currentIndex > 0) {
      this._renderImg(this.currentIndex - 1)
    }
  }
  
  _renderImg(index) {
    
    let imgs = this.options.imgs
    if (index >= imgs.length) {
      return;
    }
    this.currentIndex = index
    this.headerTextEl.innerHTML = printf('{0}/{1}', index + 1, this.count);
    
    this._getImgScale(index, imgs[index].src).then(obj => {
      
      let width = obj.width,
        height = obj.height,
        renderWidth, renderHeight
      
      if (width / height > this.maxImgWidth / this.maxImgHeight) {
        
        if (width > this.maxImgWidth) {
          renderWidth = this.maxImgWidth
          renderHeight = height * renderWidth / width
        } else {
          renderWidth = width
          renderHeight = height
        }
      } else {
        if (height > this.maxImgHeight) {
          renderHeight = this.maxImgHeight
          renderWidth = width * renderHeight / height
        } else {
          renderWidth = width
          renderHeight = height
        }
      }
      
      this.imgEl.style.width = renderWidth + 'px'
      this.imgEl.style.height = renderHeight + 'px'
      this.imgEl.style.marginTop = ((this.maxImgHeight - renderHeight) / 2) + 'px'
      this.imgEl.style.marginLeft = ((this.maxImgWidth - renderWidth) / 2) + 'px'
      
      this.imgEl.setAttribute('src', imgs[index].src)
    })
    
  }
  
  _getImgScale(index, imgSrc) {
    let imgsScale = this.imgsScale
    
    return new Promise((resolve, reject) => {
      if (imgsScale[index] && imgsScale[index].width) {
        resolve(imgsScale[index])
      } else {
        let image = new Image();
        image.onload = res => {
          imgsScale[index] = {
            width: image.naturalWidth,
            height: image.naturalHeight
          }
          resolve(imgsScale[index])
        }
        image.src = imgSrc
      }
    })
    
    
  }
  
  _setTrans(x, y, time) {
    
    this.imgEl.style.webkitTransitionDuration = time;
    this.imgEl.style.webkitTransform = printf('translate3d({0}px,0,0)', x, y)
  }
  
  _destroy() {
    this._unbindEvents();
    document.body.removeChild(this.viewEl)
  }
  
}
























