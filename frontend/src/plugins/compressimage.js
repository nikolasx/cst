/**
 * 图片压缩
 */

const imageAgent = {
  
  loadImageByFile: function (file, $img) {
    var imgType = /image.*/;
    if (file.type.match(imgType)) {
      var reader = new FileReader();
      reader.onload = function () {
        $img.attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  },
  //压缩图片质量
  compressImageByQuality: function (imageObj, compressRate, width, height) {
    var imageType = "image/jpg";
    var canvas = document.createElement('canvas') //$("<canvas></canvas>")[0];
    if (canvas.getContext) {
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imageObj, 0, 0, width, height);
      var newImageData = canvas.toDataURL(imageType, compressRate);
      return newImageData;
    }
    return imageObj.src;
  },
  //压缩图片大小
  compressImageBySize: function (imageObj, maxSizeLen, width, height) {
    var resizeAlgorithm = {
      cByRate: function (w, h, r) {
        return {"w": Math.round(w * r / 100), "h": Math.round(h * r / 100)};
      },
      cByLen: function (w, h, l) {
        var len = 0, r = 0;
        len = h;
        if (len == 0 || l == 0) {
          return {"w": w, "h": h};
        }
        if (w > h) {
          len = w;
        }
        r = l / len;
        
        return {"w": Math.round(w * r), "h": Math.round(h * r)};
      }
    };
    var s = resizeAlgorithm.cByLen(width, height, maxSizeLen);
    
    var imageType = "image/jpeg";
    var canvas = document.createElement('canvas') //$("<canvas></canvas>")[0];
    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");
      canvas.width = s.w;
      canvas.height = s.h;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imageObj, 0, 0, s.w, s.h);
      var newImageData = canvas.toDataURL(imageType, 0.7);
      return newImageData;
    }
    return imageObj.src;
  },
  
  mixedCompress: function (base64, rate = 0.8, size = 1000) {
    
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        let width = image.width, height = image.height;
        let newImageData = this.compressImageBySize(image, size, width, height);
        resolve(newImageData)
      };
      image.src = base64;
      
      
      /*let image = new Image();
       image.onload = () => {
       let width = image.width, height = image.height;
       let newImageData = this.compressImageByQuality(image, rate, width, height);
       let image2 = new Image();
       image2.onload = () => {
       newImageData = this.compressImageBySize(image2, size, width, height);
       resolve(newImageData);
       };
       image2.src = newImageData;
       };
       image.src = base64;*/
    })
    
    
  }
};

export default imageAgent;



