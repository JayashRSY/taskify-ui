import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './apiEndpoints';
import { IRefreshToken } from '../interfaces/IApiTypes';
import { store } from '../app/store';
import { setLoader } from '../features/layout/layoutSlice';

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Create an instance of Axios
const axiosClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your API base URL
    timeout: 10000, // Set a timeout if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        store.dispatch(setLoader(true));
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        store.dispatch(setLoader(false));
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        store.dispatch(setLoader(false));
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise<string>((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axiosClient(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.get<IRefreshToken>(API_ENDPOINTS.REFRESH);
                const { accessToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                processQueue(null, accessToken);
                return axiosClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError, null);
                localStorage.removeItem('accessToken');
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        store.dispatch(setLoader(false));

        // Handle other status codes
        if (error.response?.status === 403) {
            // Handle 403 Forbidden
            window.location.href = '/forbidden'; // Example: Redirect to forbidden page
        } else if (error.response?.status >= 500) {
            // Handle 500+ Server errors
            console.error('Server error:', error.response.status);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
