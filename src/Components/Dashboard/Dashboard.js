import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { Children, useContext, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import DealerSubDealerTable from "./../Dealers/DealerSubDealerTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import VehicleDetails from "../Vehicles/VehicleDetails";
// import { GlobalContext } from "../Loader/GloabalProvider";

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
    // <Box sx={{position:"",width:"100%"}}>
    <Layout>
      <Header className="" style={{ height: "100px", background: "#ffffff" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src="./assets/cagllogo.png"
              alt="cagllogo"
              width="130px"
              height="100%"
              marginTop="1px"
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
              Dealer And Vehicle Price Management
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
          </Box>
        </Box>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          
          width="115px"
          height="100%"
          style={{
            background: "#ffffff ", //#D9EEED
            marginLeft: "12px",
            marginTop: "10px",
            marginBottom: "60px",
          }}
        >
          {/* <Link to={"./dealers"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToDealersTable}
            sx={{ margin: 1, color: "white", mt: 5, fontSize: 10, width: 100 }}
          >
            Dealer SubDealer Details
          </Button>
          {/* </Link> */}

          {/* <Link to={"./vehicle"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToVehicleTable}
            sx={{ margin: 1, color: "white", mt: 2, fontSize: 10, width: 100 }}
          >
            Vehicle Price Management
          </Button>
          {/* </Link> */}
        </Sider>

        {/* <BreadCrumb/> */}
        <Layout
          style={{
            padding: "0 12px 12px",
          }}
        >
          <Content
            style={{
              mt: 10,
              // padding: 24,
              margin: 0,
              // height: "100%",
              // position:"relative",
              // marginLeft: "10px",
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
    // </Box>
  );
}

export default Dashboard;
