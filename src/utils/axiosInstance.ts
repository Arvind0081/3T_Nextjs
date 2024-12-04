
// utils/axiosInstance.ts
import axios from 'axios';
import {token} from '@/utils/getUserServerSide';
import { redirect} from 'next/navigation';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Adjust the base URL to your API
});


// Request interceptor
axiosInstance.interceptors.request.use(
   async config => {
    // Prevent caching by setting headers
  config.headers['Cache-Control'] = 'no-cache';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  config.headers['X-API-KEY'] = process.env.NEXT_PUBLIC_API_KEY;
        const authToken =await token();
         config.headers.Authorization = `Bearer ${authToken}`;
        return config;

        },
    error => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Modify response data here if needed
        return response;
    },
    error => {
        // Handle response error here
        if (error.response && error.response.status === 401) {
            // Example: Redirect to login on 401 unauthorized error
            redirect('/');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
