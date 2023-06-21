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
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { deepOrange, green, pink } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
// import { AddCircleOutlineIcon } from "@mui/icons-material/AddCircleOutline";
import TuneIcon from "@mui/icons-material/Tune";
import { getVehiclePricePendingDetails } from "../../service/checker";
import {
  getAllStateInVehicleDetails,
  getAllVehicleModelDetails,
  getAllVehicleOEMDetails,
  getAllVehicleVariantsToUplodImage,
} from "../../service/VehicleApi/VehicleApi";
import AddVehiclesModal from "../../Vehicles/AddVehicles/AddVehiclesModal";
import EditVehiclesModal from "../../Vehicles/EditVehicles/EditVehiclesModal";
import VariantImageModal from "../../Vehicles/VariantImage/VariantImageModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: pink[900],
    color: theme.palette.common.white,
    fontSize: 9,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 9,
    fontWeight: 800,
    backgroundColor: pink[100],
    fontFamily: "sans-serif",
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

export default function VehicleChecker(props) {
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
  const [checkerEdit, setCheckerEdit] = useState(false);

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
    // console.log(data, "data");
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
    getVehiclePriceDetails();
  }, []);

  const getVehiclePriceDetails = async () => {
    const { data } = await getVehiclePricePendingDetails();
    // console.log(data, "daata");
    if (data) {
      let vehData = data?.data;
      setAllVehicleDetails(vehData);
    }
  };

  const getVehicleVariantsImageDetails = async () => {
    const { data } = await getAllVehicleVariantsToUplodImage();
    // console.log(data.data,"data");
    if (data) {
      let variant = data?.data;
      setallVariants(variant);
    }
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: "light.dark",
        position: "sticky",
        zIndex: 1,
      }}
      xs={12}
      md={12}
    >
      <Box
        sx={{
          mt: 1,
        }}
      >
        {/* <Box>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#202DAF ",
            }}
          >
            Vehicle Models And Price Details
          </Typography>
        </Box>

        <Box
          sx={{
            // ml: 0,
            mt: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography
            sx={{
              // flexBasis: "5%",
              fontSize: 5,
            }}
          >
            <TuneIcon />
            <br /> Filter By
          </Typography>

          <Box
            sx={{
              flexBasis: "15%",
              // ml: 2,
              width: "200px",
            }}
          >
            <Autocomplete
              // ref={ref0}
              id="combo-box-demo"
              options={State}
              size="small"
              // filterOptions={(x) => x}
              // getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} label="Select State" />
              )}
              value={filterAllVehicles?.State}
              onChange={(e) => handleStateChange(e)}
              inputValue={filterAllVehicles?.State}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "15%",
              // ml: 2,
              width: "100px",
            }}
          >
            <Autocomplete
              // ref={ref0}
              id="combo-box-demo"
              options={VehicleOEM}
              // sx={{ m: 1, width: 450, ml: 1 }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select Vehicle OEM" />
              )}
              value={filterAllVehicles1?.VehicleOEM ?? ""}
              onChange={(e) => handleVehicleOEMChange(e)}
              disabled={disableOemOption}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "20%",
              // ml: 2,
              width: "100px",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={VehicleModel}
              // sx={{ m: 1, width: 550, ml: 1 }}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select Vehicle Model" />
              )}
              name="Model"
              value={filterAllVehicles2?.VehicleModel ?? ""}
              inputValue={filterAllVehicles2?.VehicleModel ?? ""}
              onChange={(e) => handleVehicleModelChange(e)}
              disabled={disableModelOptions}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "35%",
              // ml: 2,
              width: "400px",
            }}
          >
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
              size="small"
              value={searchText}
              onChange={(e) => {
                setsearchText(e.target.value);
              }}
            />
          </Box>
        </Box> */}

        {/* <Box
          sx={{
            margin: "30px 30px 20px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "88%",
            mt: 1,
            position: "fixed",
            zIndex: 1,
            overflow: "auto",
            ml: "760px",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            <ColorButton
              variant="contained"
              size="small"
              sx={{ background: "#2F41C6", fontSize: 10 }}
              onClick={() => {
                setopenVariantImageModal(true);
                getVehicleVariantsImageDetails();
              }}
            >
              Variant Images
            </ColorButton>

            <VariantImageModal
              show={openVariantImageModal}
              close={() => setopenVariantImageModal(false)}
              allVariants={allVariants}
            />

            <ColorButton
              variant="contained"
              size="large"
              sx={{ ml: 2, background: "green", fontSize: 10 }}
              onClick={() => setOpenAddVehicleModal(true)}
            >
              <AddIcon /> Add and Update Vehicle/Price
            </ColorButton>
          </Box>
          <AddVehiclesModal
            show={openAddVehicleModal}
            close={() => setOpenAddVehicleModal(false)}
            // getAllVehicleDetails={getAllVehicleDetails}
          />
        </Box> */}
        <Box sx={{ position: "fixed", minWidth: "88%" }}>
          <TableContainer
            component={Paper}
            sx={{
              margin: "10px 10px 30px 20px",
              mt: 7,
              maxHeight: "350px",
              position: "sticky",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow align="center">
                  <StyledTableCell align="center">Vehicle ID</StyledTableCell>
                  <StyledTableCell align="center">State</StyledTableCell>
                  <StyledTableCell align="center">Vehicle OEM</StyledTableCell>
                  <StyledTableCell align="center">
                    Vehicle Model
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Vehicle Variant Name
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Ex ShowRoom Price
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    On Road Price
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Max Loan Amount
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Updated UserID
                  </StyledTableCell>
                  <StyledTableCell align="center">Updated Date</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                  <StyledTableCell align="center">
                    Checker Status
                  </StyledTableCell>
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
                        (value.vehicleId,
                        value.vehicleModel,
                        value.vehicleVariant
                          .toLowerCase()
                          .includes(searchText.toLowerCase()))
                      ) {
                        // console.log(searchText,"searchText");
                        return value;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.vehicleId}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="center"
                        >
                          {row.vehicleId}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicalState}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicalOem}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicleModel}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicleVariant}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.exShowroomPrice}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicalOnRoadPrice}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.vehicleMaxLoanAmount}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.updaterUserID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.updatedDate}
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
                                onClick={() => {
                                  handleEditVehicleTable(row);
                                  setCheckerEdit(true);
                                }}
                                fontSize="small"
                              />
                              <Typography
                                sx={{ fontWeight: "bold", fontSize: 10 }}
                              >
                                EDIT
                              </Typography>
                              <EditVehiclesModal
                                show={openEditVehicleModal}
                                close={() => setOpenEditVehicleModal(false)}
                                editVehicleData={editVehicleData}
                                getVehiclePriceDetails={getVehiclePriceDetails}
                                checkerEdit={checkerEdit}
                              />
                            </Grid>
                          </ColorIcon>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.status}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
            <Grid item xs={12} md={12} sx={{ mr: 2 }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allVehicleDetails.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ fontSize: 10, m: 0 }}
              />
            </Grid>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
