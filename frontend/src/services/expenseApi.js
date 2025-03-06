import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = Cookies.get("xpenso-accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const createExpenseAPI = (data) => API.post("/expenses", data);
export const getExpensesAPI = (query = "") => API.get(`/expenses${query}`);
export const totalExpenseAPI = (start, end) => API.get(`/expenses/total?start=${start}&end=${end}`);
