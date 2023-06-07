import axios from "axios";
import { createContext } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const baseURL = `${process.env.REACT_APP_DOMAIN}`;


const axiosInstance = axios.create({ baseURL });
axiosInstance.interceptors.request.use(async (config) => {
  config.headers = {
    "content-type": "application/json",
    mainDealerID: cookies.get("mainDealerID"),
    stateId: cookies.get("stateId"),
    districtId: cookies.get("districtId"),
    ...config.headers,
  };
  return config;
});

export { axiosInstance };
