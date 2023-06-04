/*
 * @Descripttion: 
 * @Author: Rui Lin
 * @Date: 2023-06-04
 */
import axios from '@/utils/request.js';

const ordersApi = {

    // 下单商品
    createOrder(merchandiseId) {
        return axios.post('/orders/user/addOrder', merchandiseId);
    },

    // 买家查看订单
    getBuyerOrders(status) {
        return axios.post('/orders/user/buyerGetOrders', status);
    },

    // 卖家查看订单
    getSellerOrders(status) {
        return axios.post('/orders/user/sellerGetOrders', status);
    },

    // 卖家发货
    delivery(orderId) {
        return axios.post(`/orders/user/deliver/${orderId}`);
    },

    // 买家收货
    takeDelivery(orderId) {
        return axios.post(`/orders/user/takeDeliver/${orderId}`)
    }
    
};

export default ordersApi;