/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-06-02
 */
import axios from '@/utils/request.js';

const merchandiseApi = {

  // 获取首页商品列表
  getOverviewList(currentPage) {
    return axios.get('merchandise/list/overview', { params: { page: currentPage } });
  },

  // 获取商品详情
  getDetails(merchandiseId) {
    return axios.get('merchandise/list/details', { params: { mid: merchandiseId } });
  },

  // 获取我发布的商品
  getPublishedList(currentPage) {
    return axios.get('merchandise/list/publish', { params: { page: currentPage } });
  },

  // 获取我下架的商品
  getOutList(currentPage) {
    return axios.get('merchandise/list/out', { params: { page: currentPage } });
  },

  
  // 发布商品
  addMerchandise(form) {
    return axios.post('merchandise/manage/add', form);
  },

  // 下架商品
  outMerchandise(merchandiseId) {
    return axios.post(`merchandise/manage/out/${merchandiseId}` );
  },


  // ----------杂七杂八的零散接口【都是商品相关，就不单独拆一个文件了】------------
  // 获取可选游戏标签
  displayTag() {
    return axios.get('tag/publish/getTags');
  },

  // 上传图片
  uploadImg(imgFile) {
    return axios.post('image/upload', imgFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      // request.js 里被统一设置了默认使用json请求，所以某些特殊的接口需要额外指定类型
    });
  },



};

export default merchandiseApi;