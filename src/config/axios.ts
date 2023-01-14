import axios from 'axios';

export const axiosFront = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AXIOS_FRONT_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_FRONT_HOST}${process.env.NEXT_PUBLIC_AXIOS_FRONT_COMMON_PATH}`,
  withCredentials: true
});

export const axiosBack = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_AXIOS_BACK_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_BACK_HOST}${process.env.NEXT_PUBLIC_AXIOS_BACK_COMMON_PATH}`,
  withCredentials: true
});