import axios from "axios";
import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

const GlobalContext = createContext();

const cookies = new Cookies();

const baseURL = `${process.env.REACT_APP_DOMAIN}`;
const axiosInstance = axios.create({ baseURL });

function GloabalProvider({ children }) {
  const [showGlobalLoader, setShowGlobalLoader] = useState(false);
  const [dashboard, setDashboard] = useState({});
  const [checkerDashboard, setCheckerDashboard] = useState({});

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

  axiosInstance.interceptors.response.use(
    async (response) => {
      setShowGlobalLoader(false);
      return response;
    },
    async (error) => {
      setShowGlobalLoader(false);
      return Promise.reject(error);
    }
  );

  const value = {
    showGlobalLoader,
    setShowGlobalLoader: setShowGlobalLoader,
    dashboard,
    setDashboard,
    checkerDashboard,
    setCheckerDashboard,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GloabalProvider;

export { GlobalContext, axiosInstance };
