import axios from '@/utils/request.js';

const merchandiseApi = {
  addMerchandise(form) {
    return axios.post('merchandise/add', form);
  },
  getOverviewList(currentPage) {
    return axios.get('merchandise/overview', { params: { page: currentPage } });
  },
  getDetails(merchandiseId) {
    return axios.get('merchandise/details', { params: { mid: merchandiseId } });
  },
  displayTag(){
    return axios.get('tag/all');
  },
  uploadImg(imgFile){
    return axios.post('image/upload', imgFile,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};

export default merchandiseApi;