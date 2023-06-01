import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { Children, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DealerSubDealerTable from "./../Dealers/DealerSubDealerTable";
import { Button, Grid, Typography } from "@mui/material";
import VehicleDetails from "../Vehicles/VehicleDetails";

const { Header, Content, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModule, setshowModule] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let navigate = useNavigate();

  let navigateToDealersTable = () => {
    // navigate("dealers");
    setshowModule(true);
  };

  let navigateToVehicleTable = () => {
    // navigate("vehicle");
    setshowModule(false);
  };

  let navigateToLogin = () => {
    navigate("/");
    // setshowModule(false);
  };

  return (
    <Layout>
      <Header className="" style={{ height: "150px", background: "#ffffff" }}>
        <Grid sx={{ display: "flex", width: "100%" }}>
          <Grid sx={{ mr: 100, mt: 3 }}>
            <img
              src="./assets/cagllogo.png"
              alt="cagllogo"
              width="220px"
              height="100%"
              margin="20px"
            />
          </Grid>

          <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                // color: "#C83815",
                textAlign: "center",
                mt: 6,
                fontFamily: "sans-serif",
              }}
            >
              Dealer And Vehicle Price Management
            </Typography>
          </Grid>

          <Grid sx={{ ml: 70 }}>
            <Button
              variant="contained"
              size="large"
              onClick={navigateToLogin}
              sx={{
                mt: 6,
                background: "green",
                fontSize: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          // backgroundColor="#ffffff"
          width="320px"
          height="100%"
          style={{
            background: "#ffffff ", //#D9EEED
            // height: "100%",
            // position:"fixed",
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "60px",
          }}
        >
          <div className="logo" />
          {/* <Link to={"./dealers"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToDealersTable}
            sx={{ margin: 2, color: "white", mt: 20, fontSize: 20 }}
          >
            Dealer SubDealer Details
          </Button>
          {/* </Link> */}

          {/* <Link to={"./vehicle"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToVehicleTable}
            sx={{ margin: 2, color: "white", fontSize: 20 }}
          >
            Vehicle Price Management
          </Button>
          {/* </Link> */}
        </Sider>
        {/* <BreadCrumb/> */}
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              mt: 10,
              padding: 24,
              margin: 0,
              height: "100%",
              // position:"relative",
              marginLeft: "10px",
              marginTop: "20px",
              background: colorBgContainer,
            }}
          >
            {showModule && <DealerSubDealerTable />}
            {!showModule && <VehicleDetails />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
