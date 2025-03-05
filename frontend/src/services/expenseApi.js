import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Authorization": `Bearer ${Cookies.get("xpenso-accessToken")}`,
    "Content-Type": "application/json",
  },
});

export const createExpenseAPI = (data) => API.post("/expenses", data);
export const getExpensesAPI = (query="") => API.get(`/expenses${query}`);
export const totalExpenseAPI = (start,end) => API.get(`/expenses/total?start=${start}&end=${end}`);