import axios from "axios";

export const http = axios.create({
  baseURL: "https://themarket.onrender.com/api/v1",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials:true
});
export const base = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  headers: { 
    "Content-Type": "multipart/form-data"
   },
  //  withCredentials:true
});
