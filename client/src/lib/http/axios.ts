import { API_ENDPOINT } from '@/constants/api';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: API_ENDPOINT,
});
  
export default axiosClient;