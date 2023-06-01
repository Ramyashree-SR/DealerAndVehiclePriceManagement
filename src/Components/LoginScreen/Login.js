// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
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

function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });

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
    const { data } = await getLoginDetails(payload);
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
        // const roles = JSON.stringify(data.userrole || []);
        // // console.log(roles,"roles");
        // cookies.set("userName", data?.userName);
        // // console.log(data?.userName,"data?.userName");
        // cookies.set("userrole", data?.roles);
        // cookies.set("token", JSON.stringify(data?.token));
        // cookies.set("refreshtoken", data.data?.refreshToken);
        // localStorage.setItem("role", roles);
        // if (data?.roles?.length > 0) {
        //   let dataArr= [];
        //   data?.roles?.map((item,idx) => {
        //     console.log("role",idx);
        //     if (dataArr === "") {
        //      dataArr=item
        //      } else if (dataArr[0] === "ROLE_MAKER") {
        //       navigate("/dashboard");
        //     } else if (dataArr[1] === "ROLE_CM") {
        //       navigate("/checker");
        //       return false;
        //     }
        //   });
      }
    }
  };

  const Submit = () => {
    // userNameValidation();
    // passwordValidation();
    // if (userNameValidation() && passwordValidation()) {
    //   setLoginDetails({
    //     userName: "",
    //     password: "",
    //   });
    // }
    loginDetailsOfMakerChecker();
    // navigate("/dashboard");
  };

  return (
    <>
      <Paper
        sx={{
          width: 900,
          height: 700,
          ml: 100,
          mt: 30,
          position: "fixed",
          background: "#D0F0F5 ",
        }}
        //  variant="contained-success"
        elevation={12}
      >
        <Grid sx={{ ml: 40, p: 3 }}>
          <img
            src="./assets/cagllogo1.png"
            alt="cagllogo"
            width="220px"
            height="120px"
            margin="50px"
          />
        </Grid>
        <Typography sx={{ fontSize: 30, fontWeight: 800, textAlign: "center" }}>
          LOGIN
        </Typography>

        <Grid
          sx={{
            alignItems: "center",
            justifyContent: "center",
            ml: 25,
            mt: 9,
            size: "lg",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>
            UserName
          </Typography>
          <TextField
            placeholder="EnterUserName"
            name="userName"
            value={loginDetails.userName}
            onChange={(e) => {
              updateChange(e);
            }}
            sx={{ width: 500 }}
            height="100px"
            size="large"
          />
        </Grid>

        <Grid
          sx={{
            alignItems: "center",
            justifyContent: "center",
            ml: 25,
            mt: 5,
            position: "relative",
          }}
        >
          <Typography sx={{ fontSize: 20, fontWeight: 800 }}>
            Password
          </Typography>
          <Grid sx={{ position: "relative" }}>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              value={loginDetails.password}
              onChange={(e) => updateChange(e)}
              sx={{ width: 500 }}
            />

            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              sx={{ position: "absolute", top: 10, left: 430 }}
            >
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
          </Grid>
        </Grid>

        <Grid
          sx={{
            alignItems: "center",
            justifyContent: "center",
            ml: 45,
            mt: 10,
          }}
        >
          <Button
            variant="contained"
            onClick={() => Submit()}
            size="large"
            sx={{ width: 200, height: 50, fontSize: 20, background: "#297E09" }}
          >
            Login
          </Button>
        </Grid>
      </Paper>
    </>
  );
}

export default Login;
