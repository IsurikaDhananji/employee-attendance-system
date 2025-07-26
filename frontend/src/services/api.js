import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // change to your backend URL
  withCredentials: true, // if using cookies for auth
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
