import { Box, Button, Grid, Typography } from "@mui/material";
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
              src="./assets/cagllogo.png"
              alt="cagllogo"
              width="130px"
              height="100%"
            />
          </Box>

          <Box sx={{ alignItems: "center", justifyContent: "center" }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                color: "#000000",
                textAlign: "center",
                fontFamily: "sans-serif",
              }}
            >
              Dealer And Price Management
            </Typography>
          </Box>

          <Box>
            <Button
              variant="contained"
              size="medium"
              onClick={naviagteToLogin}
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
          {/* <Link to={"./vehicle"}> */}
          <Button
            id="Dealer"
            className="bg-success"
            onClick={navigateToMainDealerTableForChecking}
            sx={{ margin: 1, color: "white", mt: 5, fontSize: 10, width: 100 }}
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
            sx={{ margin: 1, color: "white", mt: 2, fontSize: 10, width: 100 }}
          >
            View ALL Dealer SubDealer Details
          </Button>
          {/* </Link> */}
        </Sider>
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
            {showModule && <CheckerDetails />}
            {!showModule && <DealerSubDealerTable hideButtons={hideButtons} />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default CheckerDashboard;
