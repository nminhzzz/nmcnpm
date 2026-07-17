import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as Userservice from '../service/Userservice';
import { logout, updateUser } from '../redux/slides/UserSlideV1';

// Tạo một instance của axios
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true, // Đảm bảo cookies được gửi trong mỗi request
});

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Interceptor để xử lý lỗi (token hết hạn)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.error('Response Error:', error);
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('refresh_token='))
                    ?.split('=')[1];

                console.log('Refresh Token:', refreshToken);

                const { data } = await Userservice.refreshToken({ refreshToken });

                document.cookie = `access_token=${data.accessToken}; path=/;`;

                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                useDispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
