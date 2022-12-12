import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유