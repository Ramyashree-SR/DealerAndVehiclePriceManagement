import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import React, { useContext, useRef } from "react";
import { GlobalContext } from "./GloabalProvider";

function LoaderComponent() {
  const { showGlobalLoader } = useContext(GlobalContext);
  // const timer = useRef();
  // useEffect(() => {
  //   return () => {
  //     clearTimeout(timer.current);
  //   };
  // }, []);

  //   const handleButtonClick = () => {
  //     if (!loading) {
  //       setLoading(true);
  //       timer.current = window.setTimeout(() => {
  //         setLoading(false);
  //       }, 2000);
  //     }
  //   };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {showGlobalLoader && (
        <CircularProgress
          size={68}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}

export default LoaderComponent;
