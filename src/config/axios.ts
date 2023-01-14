import axios from 'axios';

export const axiosBack = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AXIOS_BACK_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_BACK_HOST}${process.env.NEXT_PUBLIC_AXIOS_BACK_COMMON_PATH}`,
  withCredentials: true
});