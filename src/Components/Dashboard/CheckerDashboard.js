import { Button, Grid, Typography } from "@mui/material";
import { Layout, theme } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckerDetails from "../Checker/CheckerDetails/CheckerDetails";
import DealerSubDealerTable from "./../Dealers/DealerSubDealerTable";
import AddDealerModal from "../Dealers/AddDealerModal/AddDealerModal";

const { Header, Content, Sider } = Layout;

function CheckerDashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [showModule, setshowModule] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  let navigate = useNavigate();

  let navigateToMainDealerTableForChecking = () => {
    // navigate("dealers");
    setshowModule(true);
  };

  let naviagteToLogin = () => {
    navigate("/");
    // setshowModule(true);
  };

  let navigateToMainDealeTable = () => {
    // navigate("dealers");
    setshowModule(false);
  };
  return (
    <Layout>
      <Header
        className="w-100"
        style={{ height: "150px", background: "#ffffff" }}
      >
        <Grid sx={{ display: "flex", width: "100%" }}>
          <Grid sx={{ mr: 100 }}>
            <img
              src="./assets/cagllogo.png"
              alt="cagllogo"
              width="220px"
              height="120px"
              margin="20px"
            />
          </Grid>

          <Grid sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: 800,
                color: "#000000",
                textAlign: "center",
                mt: 4,
                fontFamily: "sans-serif",
              }}
            >
              Dealer And Price Management
            </Typography>
          </Grid>

          <Grid sx={{ ml: 70 }}>
            <Button
              variant="contained"
              size="large"
              onClick={naviagteToLogin}
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
          width={260}
          style={{
            background: "#ffffff",
            maxHeight: "100%",
          }}
          className="mt-10"
        >
          {/* <Link to={"./vehicle"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToMainDealerTableForChecking}
            sx={{ margin: 2, color: "white", fontSize: 22 }}
          >
            Pending Authorisation
          </Button>
          {/* </Link> */}

          {/* <Link to={"./Checker"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={() => {
              navigateToMainDealeTable();
              setHideButtons(true);
            }}
            sx={{ margin: 2, color: "white", fontSize: 22 }}
          >
            View ALL Dealer SubDealer Details
          </Button>
          {/* </Link> */}
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          {/* <BreadCrumb/> */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {showModule && <CheckerDetails />}
            {!showModule && <DealerSubDealerTable hideButtons={hideButtons} />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default CheckerDashboard;
