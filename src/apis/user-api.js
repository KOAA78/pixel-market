import axios from '@/utils/request.js';

const userApi = {
  sms(params) {
    return axios.get('user/sms', { params: { phone: params } });
  },
  signin(data){
    return axios.post('user/signin', data);
  },
  login(data){
    return axios.post('user/login', data);
  },
  logout(){
    return axios.post('user/logout');
  },
  getInfo(){
    return axios.get('user/info');
  }
};

export default userApi;
