import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  blue,
  blueGrey,
  deepOrange,
  green,
  lightBlue,
} from "@mui/material/colors";
import {
  getAllStateInVehicleDetails,
  getAllVehicleDetails,
  getAllVehicleModelDetails,
  getAllVehicleOEMDetails,
  getAllVehicleVariantsToUplodImage,
} from "../service/VehicleApi/VehicleApi";
import AddVehiclesModal from "./AddVehicles/AddVehiclesModal";
import EditVehiclesModal from "./EditVehicles/EditVehiclesModal";
import SearchIcon from "@mui/icons-material/Search";
// import { AddCircleOutlineIcon } from "@mui/icons-material/AddCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";
import VariantImageModal from "./VariantImage/VariantImageModal";
// import VariantImage from "./VariantImage/VariantImages";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    fontWeight: 800,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.getContrastText(green[500]),
  backgroundColor: green[900],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  color: green[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

export default function VehicleDetails(props) {
  const [allVehicleDetails, setAllVehicleDetails] = useState([]);
  // console.log(allVehicleDetailsCopy,"allVehicleDetailsCopy");
  const [openAddVehicleModal, setOpenAddVehicleModal] = useState(false);
  const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false);
  const [editVehicleData, seteditVehicleData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setsearchText] = useState("");
  const [State, setState] = useState([]);
  // console.log(State, "state");
  const [VehicleOEM, setVehicleOEM] = useState([]);
  // console.log(VehicleOEM, "VehicleOEM");
  const [VehicleModel, setVehicleModel] = useState([]);
  const [filterAllVehicles, setfilterAllVehicles] = useState({});
  const [filterAllVehicles1, setfilterAllVehicles1] = useState({});
  const [filterAllVehicles2, setfilterAllVehicles2] = useState({});
  const [disableOemOption, setdisableOemOption] = useState(true);
  const [disableModelOptions, setdisableModelOptions] = useState(true);
  const [openVariantImageModal, setopenVariantImageModal] = useState(false);
  const [allVariants, setallVariants] = useState([]);
  // const [vehState, setvehState] = useState([]);
  // const [filterState, setfilterState] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditVehicleTable = (record) => {
    setOpenEditVehicleModal(true);
    seteditVehicleData(record);
  };

  const handleStateChange = (value) => {
    console.log(value.target.outerText, "value");
    setfilterAllVehicles({
      ...filterAllVehicles,
      State: value.target.outerText,
    });
    // setfilterState({
    //   ...filterState,
    //   vehState: value.target.outerText,
    // });

    setdisableOemOption(false);

    if (typeof value.target.outerText == "undefined") {
      setdisableModelOptions(true);
    }
    setfilterAllVehicles1({});
    setfilterAllVehicles2({});
    getAllVehicleOemDetails(value.target.outerText);
  };

  const handleVehicleOEMChange = (value) => {
    console.log(value.target.outerText, "value");
    setfilterAllVehicles1({
      ...filterAllVehicles1,
      VehicleOEM: value.target.outerText,
    });
    setdisableModelOptions(false);
    if (typeof value.target.outerText == "undefined") {
      setdisableModelOptions(true);
    }
    getModelDetails(value.target.outerText);
  };

  const handleVehicleModelChange = (value) => {
    console.log(value.target.outerText, "value");
    setfilterAllVehicles2({
      ...filterAllVehicles2,
      VehicleModel: value.target.outerText,
    });
  };

  useEffect(() => {
    getStateDetails();
  }, []);

  const getStateDetails = async () => {
    const { data } = await getAllStateInVehicleDetails();
    if (data) {
      let stateData = [];
      data?.data?.map((val) => {
        stateData?.push(val);
      });
      setState(stateData);
      // setvehState(stateData);
    } else {
      setState([]);
      // setvehState([]);
    }
  };

  const getAllVehicleOemDetails = async (state) => {
    const { data } = await getAllVehicleOEMDetails(state);
    if (data) {
      let OemData = [];
      data?.data?.map((val) => {
        OemData?.push(val);
      });
      setVehicleOEM(OemData);
    } else {
      setVehicleOEM([]);
    }
  };

  useEffect(() => {
    getModelDetails();
  }, []);

  const getModelDetails = async (oem) => {
    const { data } = await getAllVehicleModelDetails(oem);
    if (data) {
      let modelData = [];
      data?.data.map((val) => {
        modelData?.push(val);
      });
      setVehicleModel(modelData);
    } else {
      setVehicleModel([]);
    }
  };

  // useEffect(() => {
  //   if (filterState?.vehState) {
  //     let filterStateData = allVehicleDetails.filter((item) => {
  //       return item?.vehicalState
  //         .toLowerCase()
  //         .includes(filterState?.vehState.toLowerCase());
  //     });
  //     // return filterStateData;

  //     if (filterStateData) {
  //       setAllVehicleDetails([...filterStateData]);
  //     } else {
  //       setAllVehicleDetails([]);
  //     }
  //   } else {
  //     setAllVehicleDetails([...allVehicleDetails]);
  //   }
  // }, [filterState?.vehState]);

  useEffect(() => {
    if (
      filterAllVehicles?.State &&
      filterAllVehicles1?.VehicleOEM &&
      filterAllVehicles2?.VehicleModel
    ) {
      const filteredData = () => {
        let StatefilteredData = allVehicleDetails.filter((item) => {
          if (item.vehicalState) {
            return item?.vehicalState
              .toLowerCase()
              .includes(filterAllVehicles?.State.toLowerCase());
          }
        });
        // console.log(StatefilteredData,"StatefilteredData");

        let OemfilteredData = StatefilteredData.filter((item) => {
          if (item.vehicalOem) {
            return item?.vehicalOem
              .toLowerCase()
              .includes(filterAllVehicles1?.VehicleOEM.toLowerCase());
          }
        });

        let ModelfilteredData = OemfilteredData.filter((item) => {
          if (item.vehicleModel) {
            return item?.vehicleModel
              .toLowerCase()
              .includes(filterAllVehicles2?.VehicleModel.toLowerCase());
          }
        });
        return ModelfilteredData;
      };
      if (filteredData) {
        setAllVehicleDetails(filteredData);
        // console.log(allVehicleDetails, "filteredData");
      } else {
        setAllVehicleDetails([]);
      }
    } else {
      setAllVehicleDetails([...allVehicleDetails]);
    }
  }, [
    filterAllVehicles?.State,
    filterAllVehicles1?.VehicleOEM,
    filterAllVehicles2?.VehicleModel,
  ]);

  useEffect(() => {
    getVehicleVariantsDetails();
  }, []);

  const getVehicleVariantsDetails = async () => {
    const { data } = await getAllVehicleDetails();
    // console.log(data?.data,"vehivleData");
    if (data) {
      let vehData = data?.data;
      setAllVehicleDetails(vehData);
      // setAllVehicleDetailsCopy(data?.data);
    }
  };

  useEffect(() => {}, []);

  const getVehicleVariantsImageDetails = async () => {
    const { data } = await getAllVehicleVariantsToUplodImage();
    // console.log(data.data,"data");
    if (data) {
      let variant = data?.data;
      setallVariants(variant);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 2 }} xs={12} md={12}>
      <Grid container xs={12} md={12}>
        <Typography
          sx={{
            fontSize: 35,
            fontWeight: "bold",
            fontFamily: "sans-serif",
            textAlign: "center",
            color: "#091CA4",
          }}
        >
          Vehicle Models And Price Details
        </Typography>

        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
            ml: 1,
          }}
          xs={12}
          md={12}
        >
          <Typography
            sx={{
              ml: 1,
              fontSize: 13,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TuneIcon />
            <br /> Filter By
          </Typography>

          <Autocomplete
            // ref={ref0}
            id="combo-box-demo"
            options={State}
            sx={{ m: 1, width: 450, ml: 1 }}
            size="large"
            // filterOptions={(x) => x}
            // getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} label="Select State" />
            )}
            value={filterAllVehicles?.State}
            onChange={(e) => handleStateChange(e)}
            inputValue={filterAllVehicles?.State}
          />

          <Autocomplete
            // ref={ref0}
            id="combo-box-demo"
            options={VehicleOEM}
            sx={{ m: 1, width: 450, ml: 1 }}
            size="large"
            renderInput={(params) => (
              <TextField {...params} label="Select Vehicle OEM" />
            )}
            value={filterAllVehicles1?.VehicleOEM ?? ""}
            onChange={(e) => handleVehicleOEMChange(e)}
            disabled={disableOemOption}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={VehicleModel}
            sx={{ m: 1, width: 550, ml: 1 }}
            size="large"
            renderInput={(params) => (
              <TextField {...params} label="Select Vehicle Model" />
            )}
            name="Model"
            value={filterAllVehicles2?.VehicleModel ?? ""}
            inputValue={filterAllVehicles2?.VehicleModel ?? ""}
            onChange={(e) => handleVehicleModelChange(e)}
            disabled={disableModelOptions}
          />

          <TextField
            id="outlined-size-small"
            placeholder="Search"
            InputProps={{
              "aria-label": "Without label",
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="large"
            sx={{ width: 900, m: 1, ml: 1 }}
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />

          <Grid sx={{ ml: 90 }}>
            <ColorButton
              variant="contained"
              size="large"
              sx={{ m: 2, background: "#2F41C6" }}
              onClick={() => {
                setopenVariantImageModal(true);
                getVehicleVariantsImageDetails();
              }}
            >
              Variant Images
            </ColorButton>
            {/* <VariantImage show={openVariantImageModal}
              close={() => setopenVariantImageModal(false)}
              allVariants={allVariants}/> */}
            <VariantImageModal
              show={openVariantImageModal}
              close={() => setopenVariantImageModal(false)}
              allVariants={allVariants}
            />
          </Grid>

          <Grid sx={{ mr: 3 }}>
            <ColorButton
              variant="contained"
              size="large"
              sx={{ m: 2, background: "green", fontSize: 18 }}
              onClick={() => setOpenAddVehicleModal(true)}
            >
              <AddIcon /> Add and Update Vehicle/Price
            </ColorButton>
          </Grid>
          <AddVehiclesModal
            show={openAddVehicleModal}
            close={() => setOpenAddVehicleModal(false)}
            getAllVehicleDetails={getAllVehicleDetails}
          />
        </Grid>
      </Grid>
      <Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="customized table">
            <TableHead>
              <TableRow align="center">
                <StyledTableCell>Vehicle ID</StyledTableCell>
                <StyledTableCell>State</StyledTableCell>
                <StyledTableCell>Vehicle OEM</StyledTableCell>
                <StyledTableCell>Vehicle Model</StyledTableCell>
                <StyledTableCell>Vehicle Variant Name</StyledTableCell>
                <StyledTableCell>Ex ShowRoom Price</StyledTableCell>
                <StyledTableCell>On Road Price</StyledTableCell>
                <StyledTableCell>Max Loan Amount</StyledTableCell>
                <StyledTableCell>Updated User</StyledTableCell>
                <StyledTableCell>Updated Date</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVehicleDetails &&
                allVehicleDetails
                  ?.filter((value) => {
                    // console.log(value,"value");
                    if (searchText === "") {
                      return value;
                    } else if (
                      value.vehicleId
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    ) {
                      // console.log(searchText,"searchText");
                      return value;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.vehicleId}>
                      <StyledTableCell component="th" scope="row">
                        {row.vehicleId}
                      </StyledTableCell>
                      <StyledTableCell>{row.vehicalState}</StyledTableCell>
                      <StyledTableCell>{row.vehicalOem}</StyledTableCell>
                      <StyledTableCell>{row.vehicleModel}</StyledTableCell>
                      <StyledTableCell>{row.vehicleVariant}</StyledTableCell>
                      <StyledTableCell>--{row.exShowRoomPrice}</StyledTableCell>
                      <StyledTableCell>
                        {row.vehicalOnRoadPrice}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.vehicleMaxLoanAmount}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.vehicleMaxLoanAmount}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.vehicleMaxLoanAmount}
                      </StyledTableCell>

                      <StyledTableCell align="left">
                        <ColorIcon>
                          <Grid
                            sx={{
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <ModeEditIcon
                              onClick={() => handleEditVehicleTable(row)}
                            />
                            <Typography sx={{ fontWeight: "bold" }}>
                              EDIT
                            </Typography>
                            <EditVehiclesModal
                              show={openEditVehicleModal}
                              close={() => setOpenEditVehicleModal(false)}
                              editVehicleData={editVehicleData}
                              getVehicleVariantsDetails={
                                getVehicleVariantsDetails
                              }
                            />
                          </Grid>
                        </ColorIcon>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allVehicleDetails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ alignItems: "center", justifyContent: "center" }}
        />
      </Grid>
    </Paper>
  );
}
