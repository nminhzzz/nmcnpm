import { axiosJWT } from '.';

export const getAll = async () => {
    try {
        const res = await axiosJWT.get(`/category`);
        return res.data.categories;
    } catch (error) {
        console.error('Error fetching category by slug:', error.response || error.message || error);
        throw new Error('Failed to fetch category by slug');
    }
};
export const getAllSupplies = async () => {
    try {
        const res = await axiosJWT.get(`/supplier`);
        return res.data.suppliers;
    } catch (error) {
        console.error('Error fetching category by slug:', error.response || error.message || error);
        throw new Error('Failed to fetch category by slug');
    }
};
