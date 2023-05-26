import logo from "./logo.svg";
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

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider
          components={{ Toast: ToasterComponent }}
          placement="bottom-center"
          autoDismissTimeout={5000}
          autoDismiss
          id="toaster"
          transitionDuration={4}
        >
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkerdashboard" element={<CheckerDashboard />} />
            <Route path="/checkerdashboard" element={<CheckerDetails />} />

            <Route path="/dealers" element={<DealerSubDealerTable />} />
            <Route path="/vehicle" element={<VehicleDetails />} />
          </Routes>
        </ToastProvider>
      </BrowserRouter>

      {/* <DealerSubDealerTable/> */}
      {/* <DealersTable/> */}
      {/* <State/> */}
      {/* <VehicleDetails/> */}
      {/* <BreadCrumb/> */}
    </>
  );
}

export default App;
