import { axiosJWT } from '.';
import { message } from 'antd';

export const createProduct = async (data) => {
    try {
        const res = await axiosJWT.post(`ingredient`, data);
        return res.data;
    } catch (e) {
        message.error(e.response.data.mess);
        throw e;
    }
};

export const createProductElasticSearch = async (data) => {
    const res = await axiosJWT.post(`ingredient/elasticsearch`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    try {
        const res = await axiosJWT.delete(`ingredient/${id}`);
        return res.data;
    } catch (error) {
        message.error(error.response.data.error);
        throw error;
    }
};

export const updateProduct = async (id, data) => {
    try {
        const res = await axiosJWT.put(`ingredient/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const getAllIngredient = async () => {
    try {
        const res = await axiosJWT.get(`/ingredient`);
        return res.data;
    } catch (error) {
        throw new Error('L��i khi lấy dữ liệu đơn hàng');
    }
};

export const getAllIngredientV1 = async () => {
    try {
        const res = await axiosJWT.get(`/inventor`);
        return res.data;
    } catch (error) {
        return error.message;
    }
};
