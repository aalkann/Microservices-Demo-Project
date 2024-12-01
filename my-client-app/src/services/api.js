import axios from 'axios';
import { keycloak } from '../helpers/keycloak';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    if (keycloak?.token) {
      config.headers['Authorization'] = `Bearer ${keycloak.token}`;  
      config.headers["Content-Type"] = "application/json"
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchProducts = async () => {
  try {
    const response = await api.get('/api/product');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await api.post('/api/product', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};



export const createOrder = async (orderData) => {
  try {
    const response = (await api.post('/api/order', orderData));
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export default api;
