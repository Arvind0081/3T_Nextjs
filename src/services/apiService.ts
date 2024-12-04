// services
import axiosInstance from '@/utils/axiosInstance';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const apiService = {
  get: async (endpoint:string, params = {}) => {
    try { 
      
      const response = await axiosInstance.get(`${endpoint}`, { params });
      
      return response.data;
    } catch (error:any) {
      
      if (error.response && error.response.data && error.response.data.message) {      
        error.response?.data?.message.map((item: any) => toastr.error(`${item}`, '', { timeOut: 1000 }));
      }     
    }
  },

  post: async (endpoint:string, data:Object) => {
    try {
      const response = await axiosInstance.post(`${endpoint}`, data);
      response.data.message.map((message:any)=>toastr.success(`${message}`, '', { timeOut: 1000 })) ;
      return response.data;
    } catch (error:any) {
      error?.response?.data?.message.map((item: any)=> toastr.error(`${item}`, '', { timeOut: 1000 }));
         throw error.response ? error.response.data.message : new Error('Network Error');
    }
  },

  put: async (endpoint:string, data:Object) => {

    try {
      const response = await axiosInstance.put(`${endpoint}`, data);
      response.data.message.map((message:any)=>toastr.success(`${message}`, '', { timeOut: 1000 })) ;
      return response.data;
    } catch (error:any) {
      error?.response?.data?.message.map((item: any)=> toastr.error(`${item}`, '', { timeOut: 1000 }));
        throw error.response ? error.response.data.message : new Error('Network Error');
    }
  },

  delete: async (endpoint:string) => {
    try {
      const response = await axiosInstance.delete(`${endpoint}`);
      response.data.message.map((message:any)=>toastr.success(`${message}`, '', { timeOut: 1000 })) ;
      return response.data;
    } catch (error:any) {
      error.response?.data?.message?.map((item: any)=> toastr.error(`${item}`, '', { timeOut: 1000 }));
        throw error.response ? error.response.data.message : new Error('Network Error');
    }
  },

  patch: async (endpoint:string, data:Object) => {
    try {
      const response = await axiosInstance.patch(`${endpoint}`, data);
      response.data.message.map((message:any)=>toastr.success(`${message}`, '', { timeOut: 1000 })) ;
      return response.data;
    } catch (error:any) {
      error.response?.data.message.map((item: any)=> toastr.error(`${item}`, '', { timeOut: 1000 }));
        throw error.response ? error.response.data.message : new Error('Network Error');
    }
  },
};

export default apiService;