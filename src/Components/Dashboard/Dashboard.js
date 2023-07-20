import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { Children, useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DealerSubDealerTable from "./../Dealers/DealerSubDealerTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import VehicleDetails from "../Vehicles/VehicleDetails";
// import { GlobalContext } from "../Loader/GloabalProvider";

const { Header, Content, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModule, setshowModule] = useState(true);
  const [active, setActive] = useState(false);

  let navigate = useNavigate();

  let navigateToDealersTable = () => {
    // navigate("dealers");
    setActive(true);
    setshowModule(true);
  };

  let navigateToVehicleTable = () => {
    // navigate("vehicle");\
    setActive(true);
    setshowModule(false);
  };

  let navigateToLogin = () => {
    sessionStorage.clear();
    navigate("/");
    // setshowModule(false);
  };

  // useEffect(() => {
  //   sessionStorage.clear();
  // }, []);
  return (
    <>
      <Header
        style={{
          height: "75px",
          background: "#ffffff",
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ p: 1 }}>
            <img
              src="./assets/cagllogo1.png"
              alt="cagimage1"
              width="130px"
              height="100%"
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
            >
              Two-Wheeler Dealer & Vehicle Price Management
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              size="medium"
              onClick={navigateToLogin}
              sx={{
                background: "green",
                fontSize: 15,
              }}
            >
              Logout
            </Button>
            <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
              {" "}
              user: {sessionStorage.getItem("userName")}
            </Typography>
          </Box>
        </Box>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="10%"
          style={{
            background: "#ffffff ", //#D9EEED
            marginLeft: "20px",
            marginTop: "50px",
            marginBottom: "60px",
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 100,
            bottom: 0,
            mt: 10,
            margin: 0,
            zIndex: 1,
          }}
        >
          <Button
            id="Dealer"
            className="bg-success"
            variant={active ? "primary" : "secondary"}
            onClick={navigateToDealersTable}
            sx={{ margin: 1, color: "white", mt: 5, fontSize: 10, width: 100 }}
          >
            Dealer SubDealer Management
          </Button>

          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToVehicleTable}
            sx={{
              margin: 1,
              color: "white",
              mt: 2,
              fontSize: 10,
              width: 100,
              background: active ? "primary" : "secondary",
            }}
          >
            Vehicle Price Management
          </Button>
          {/* </Link> */}
        </Sider>

        {/* <BreadCrumb/> */}
        <Layout
          style={{
            padding: "0px 0px 0px 0px",
          }}
        >
          <Content
            style={{
              overflow: "auto",
              position: "fixed",
              left: 120,
              top: 0,
              bottom: 0,
              zIndex: 1,
              marginTop: "90px",
              background: "#ffffff",
              width: "90%",
            }}
          >
            {showModule && <DealerSubDealerTable />}
            {!showModule && <VehicleDetails />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
