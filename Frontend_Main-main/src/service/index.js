import axios from 'axios';

export const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

// Attach access token from localStorage to Authorization header for every request
axiosJWT.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                config.headers = config.headers || {};
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        } catch (e) {
            // ignore
        }
        return config;
    },
    (error) => Promise.reject(error),
);
