/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-06-04
 */
import axios from '@/utils/request.js';

const favoritesApi = {
    // 查看我的收藏列表
    getFavorites(currentPage) {
        return axios.get('favor/user/getFavorites');
    },

    //确认收藏状态
    checkFavor(merchandiseId) {
        return axios.get('favor/user/checkFavorites', { params: { mid: merchandiseId } });
    },

    // 收藏某个商品
    favorMerchandise(merchandiseId) {
        return axios.post('favor/user/add', merchandiseId);
    },

    // 取消收藏
    cancelFavor(merchandiseId) {
        return axios.post('favor/user/deleteFavorites', merchandiseId);
    },
};

export default favoritesApi;