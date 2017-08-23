import axios from 'axios';
import qs from 'qs';

const debug = process.env.NODE_ENV === 'development';


const service = {
  
  get(url, data, config){
    url = debug ? '/api' + url : url;
    return axios.get(url, {params: data});
  },
  
  post(url, data, config){
    url = debug ? '/api' + url : url;
    data = undefined === data ? data : qs.stringify(data);
    return axios.post(url, data, config);
  },
  
  //用于图片的表单上传
  form(url, formData){
    url = debug ? '/api' + url : url;
    return axios.post(url, formData, {
      method: 'post',
      
      headers: {'Content-Type': 'multipart/form-data'}
    })
  }
  
};

export default service;
