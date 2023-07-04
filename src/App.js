import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DealerSubDealerTable from "./Components/Dealers/DealerSubDealerTable";
import VehicleDetails from "./Components/Vehicles/VehicleDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ToastProvider } from "react-toast-notifications";
import CheckerDashboard from "./Components/Dashboard/CheckerDashboard";
import Login from "./Components/LoginScreen/Login";
import ToasterComponent from "./Components/ToasterComponent/ToasterComponent";
import CheckerDetails from "./Components/Checker/CheckerDetails/CheckerDetails";
import GloabalProvider from "./Components/Loader/GloabalProvider";
import LoaderComponent from "./Components/Loader/LoaderComponent";
import { useState } from "react";
import authToken from "./Components/AuthToken/AuthToken";

function App() {
  // const [hideLoginScreen, setHideLoginScreen] = useState(true);

  const tokenCredentials = authToken();

  console.log(tokenCredentials);
  return (
    <>
      <BrowserRouter>
        <GloabalProvider>
          <ToastProvider
            components={{ Toast: ToasterComponent }}
            placement="top-center"
            autoDismissTimeout={5000}
            autoDismiss
            id="toaster"
            transitionDuration={4}
          >
            {!tokenCredentials && (
              <Routes>
                <Route path="/" element={<Login />} />
              </Routes>
            )}

            {tokenCredentials?.userrole.includes("ROLE_MAKER") && (
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dealers" element={<DealerSubDealerTable />} />
                <Route path="/vehicle" element={<VehicleDetails />} />
              </Routes>
            )}

            {tokenCredentials?.userrole?.includes("ROLE_CHECKER") && (
              <Routes>
                <Route
                  path="/checkerdashboard"
                  element={<CheckerDashboard />}
                />
                <Route path="/checkerdashboard" element={<CheckerDetails />} />
              </Routes>
            )}
          </ToastProvider>
          <LoaderComponent />
        </GloabalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
