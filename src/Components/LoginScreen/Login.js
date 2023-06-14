// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getLoginDetails } from "../service/login";
import Cookies from "universal-cookie";
import { Gradient, Visibility, VisibilityOff } from "@mui/icons-material";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Loader/GloabalProvider";
import { useToasts } from "react-toast-notifications";

function Login() {
  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const { setDashboard } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [userNameErr, setUserNameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const cookies = new Cookies();

  let userNameValidation = () => {
    if (loginDetails.userName) {
      let regex = /^[a-zA-Z ]{2,30}$/;
      if (regex.test(loginDetails.userName)) {
        setUserNameErr("");
        return true;
      } else {
        setUserNameErr("*Enter valid userName");
      }
    } else {
      setUserNameErr("Username required");
      return false;
    }
  };

  let passwordValidation = () => {
    if (loginDetails.password) {
      let regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
      if (regex.test(loginDetails.password)) {
        setPasswordErr("");
        return true;
      } else {
        setPasswordErr("*Enter valid password");
      }
    } else {
      setPasswordErr("password required");
      return false;
    }
  };

  let updateChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const loginDetailsOfMakerChecker = async () => {
    const payload = {
      userName: loginDetails.userName,
      userPassword: loginDetails.password,
    };
    const { data, errRes } = await getLoginDetails(payload);
    // console.log(data,"data");
    if (data) {
      if (data) {
        data.data.userROle.forEach((item) => {
          if (item === "ROLE_MAKER") {
            navigate("/dashboard");
          }
          if (item === "ROLE_CHECKER") {
            navigate("/checkerdashboard");
          }
        });
      }
      // sessionStorage.setItem("jwtData", JSON.stringify(data));
      // sessionStorage.setItem("userName", loginDetails?.userName);
      // sessionStorage.setItem("token", JSON.stringify(data?.token));
      // if (data?.userrole.includes("ROLE_MAKER")) {
      //   navigate("/dashboard");
      // } else if (data?.userrole.includes("ROLE_CHECKER")) {
      //   navigate("/checkerdashboard");
      // } else {
      //   navigate("/dashboard");
      // }

      // window.location.reload();
      addToast(data.message, { appearance: "success" });
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
  };

  const Submit = () => {
    userNameValidation();
    passwordValidation();
    if (userNameValidation() && passwordValidation()) {
      setLoginDetails({
        userName: "",
        password: "",
      });
    }
    loginDetailsOfMakerChecker();
    setDashboard();
    setLoading(true);
  };

  return (
    <Box
      className="d-flex align-items-center justify-content-center "
      sx={{ height: "100vh" }}
    >
      <Paper
        sx={{
          width: 500,
          height: 400,
          background: "#D0F0F5 ",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
        elevation={12}
      >
        <Box>
          <img
            src="./assets/cagllogo1.png"
            alt="cagllogo"
            width="150px"
            height="80px"
          />
        </Box>
        <Typography sx={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>
          LOGIN
        </Typography>

        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            UserName
          </Typography>
          <TextField
            placeholder="EnterUserName"
            name="userName"
            value={loginDetails.userName}
            onChange={(e) => {
              updateChange(e);
            }}
            size="small"
          />
        </Box>

        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 15, fontWeight: 600 }}>
            Password
          </Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            name="password"
            value={loginDetails.password}
            onChange={(e) => updateChange(e)}
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Visibility
                      sx={{
                        fill: "#A6A6A6",
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      sx={{
                        fill: "#A6A6A6",
                      }}
                    />
                  )}
                </IconButton>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Button>
              <i
                class="fa fa-spinner fa-spin"
                style={{ marginLeft: "12px", marginRight: "8px" }}
              ></i>
              loading....
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => Submit()}
              sx={{
                fontSize: 12,
                background: "#297E09",
                paddingX: "15px",
                paddingY: "10px",
              }}
            >
              Login
            </Button>
          )}

          {/* {loading && (
              <i
                class="fa fa-spinner fa-spin"
                style={{ marginLeft: "12px", marginRight: "8px" }}
              ></i>
            )} */}
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;