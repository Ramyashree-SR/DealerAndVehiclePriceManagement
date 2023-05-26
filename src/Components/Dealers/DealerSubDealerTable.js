import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Grid,
  InputAdornment,
  TablePagination,
  TextField,
  Tooltip,
  styled,
  tooltipClasses,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddIcon from "@mui/icons-material/Add";
import {
  deepOrange,
  deepPurple,
  green,
  pink,
  yellow,
} from "@mui/material/colors";
import AddDealerModal from "./AddDealerModal/AddDealerModal";

import Autocomplete from "@mui/material/Autocomplete";
import {
  getAllBranchesInMainDealer,
  getAllBranchesOfInMainDealer,
  getAllBranchesToAddInMainDealer,
  getAllMainDealersDetails,
  getAllVehicleOEM,
  getAllVehicleOEMDetails,
  showVehicleVariantsInMainDealer,
  showVehicleVariantsToAddInMainDealer,
} from "../service/dealers";
import {
  getAllStateDetails,
  stateDropDownApi,
} from "../service/stateapi/stateapi";
import { getAllDistrictDetails } from "../service/districtapi/Districtapi";
import {
  getAllBranchesInSubDealer,
  getAllBranchesInSubDealerToAdd,
  getAllSubDealersDetails,
  showVehicleVariantsInSubDealer,
} from "../service/subDealers";
import AddSubDealerModal from "./SubDealersAddModal/AddSubDealersModal";
import EditSubDealerModal from "./SubDealerEditModal/EditSubDealerModal";
import * as FileSaver from "file-saver";
import * as xlsx from "xlsx";
import SourceIcon from "@mui/icons-material/Source";
import ShowVehicleVariantModal from "./ShowVehicleVariants/ShowVehicleVariantModal";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TuneIcon from "@mui/icons-material/Tune";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ShowBranchesOfMainDealer from "./ShowBranchesOfMainDealer/ShowBranchesOfMainDealer";
import ShowBranchesForSubDealers from "./ShowBranchesForSubDealers/ShowBranchesForSubDealers";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios, { AxiosRequestConfig } from "axios";
import UploadDocumentsModal from "./UploadDocumentsModal/UploadDocumentsModal";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import { getUploadedDocumnetDetails } from "../service/uploadFile";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 700,
    backgroundColor: "gray",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
    fontSize: 20,
    // borderRight:2,
    // borderWidth:1
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    fontWeight: 850,
    backgroundColor: "#D9F1F8",
    // borderRight:2,
    // borderWidth:1
  },
}));

const StyledSubTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: 800,
    backgroundColor: "#CDFCE3",
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

const StyledSubTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.focusOpacity,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: deepOrange[500],
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: deepOrange[700],
  },
}));

const ColorIcon = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  color: pink[900],
  // color: theme.palette.common.white,
  "&:hover": {
    color: deepOrange[700],
  },
}));

export default function DealerSubDealerTable(props) {
  const [allDealers, setAllDealers] = useState([]);
  const [allDealersCopy, setAllDealersCopy] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [state, setState] = useState([]);
  // console.log(state,"state");
  const [district, setDistrict] = useState([]);
  const [filterAllDealer, setFilterAllDealer] = useState({});
  const [filterAllDealer1, setFilterAllDealer1] = useState({});
  // console.log(filterAllDealer1, "filterAllDealer1");
  const [vehicleOEM, setVehicleOEM] = useState([]);
  // console.log(vehicleOEM, "vehicleOEM");
  const [filterAllDealers, setFilterAllDealers] = useState({});
  // console.log(filterAllDealers,"filterAllDealers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mainDealerData, setMainDealerData] = useState({});
  // console.log(mainDealerData, "mainDealerData");
  const [showVariants, setShowVariants] = useState([]);
  // console.log("fgh",showVariants);
  const [openAddDealerModal, setOpenAddDealerModal] = useState(false);
  const [openEditDealerModal, setOpenEditDealerModal] = useState(false);
  // const [openShowVariants, setOpenShowVariants] = useState(false);
  const [EditDealerData, setEditDealerData] = useState({});
  const ref0 = useRef();
  const [open, setOpen] = useState(false);
  const [allSubDealers, setallSubDealers] = useState([]);
  const [openAddSubDealerModal, setopenAddSubDealerModal] = useState(false);
  const [openEditSubDealerModal, setOpenEditSubDealerModal] = useState(false);
  const [EditSubDealerData, setEditSubDealerData] = useState({});
  // console.log(EditSubDealerData, "EditSubDealerData");
  const [rowData, setRowData] = useState("");
  // console.log(rowData,"fghjk");
  const [paramsId, setParamsId] = useState("");
  // console.log(paramsId, "ds");
  const [showAddVariants, setshowAddVariants] = useState([]);
  // console.log(showAddVariants,"fghjk");
  const [OpenShowBranchModal, setOpenShowBranchModal] = useState(false);
  const [showBranch, setShowBranch] = useState([]);
  // console.log(showSubVariants,"ghjk");
  const [showBranchToAdd, setShowBranchToAdd] = useState([]);
  // console.log(showSubVariants,"ghjk");
  const [filterAddBranch, setFilterAddBranch] = useState({});
  const [openShowSubBranchModal, setOpenShowSubBranchModal] = useState(false);
  const [showSubBranch, setShowSubBranch] = useState([]);
  // console.log(showSubBranch, "showSubBranch");
  const [showSubBranchToAdd, setshowSubBranchToAdd] = useState([]);
  const [disableStateOption, setdisableStateOption] = useState(true);
  const [disableDistrictOption, setdisableDistrictOption] = useState(true);
  // console.log(showSubBranchToAdd, "showSubBranchToAdd");
  const [openAddDocumentModal, setOpenAddDocumentModal] = useState(false);
  const [filemainDealerId, setfileMaindealerId] = useState(null);
  const [addStateId, setaddStateId] = useState(null);
  const [active, setActive] = useState(false);
  const [addMaindealerId, setaddMaindealerId] = useState(null);
  const [addSubdealerId, setaddSubdealerId] = useState(null);
  const [filterAddSubBranch, setfilterAddSubBranch] = useState({});
  const [addSubStateId, setaddSubStateId] = useState(null);
  // const [roles, setRolea] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDistrictChange = (value) => {
    // console.log(value, "value");
    setFilterAllDealer1({
      ...filterAllDealer1,
      district: value.target.outerText,
    });
  };

  const handleVehicleOEMChange = (value) => {
    // console.log(value.target.outerText, "value");
    if (value) {
      setFilterAllDealers({
        ...filterAllDealers,
        vehicleOEM: value.target.outerText,
      });

      setdisableStateOption(false);
      setdisableDistrictOption(true);
      setFilterAllDealer({});
      setFilterAllDealer1({});
      getStateDetails(value.target.outerText);
    }
  };

  const handleStateChange = (value) => {
    // console.log(value.target.outerText, "value");
    setFilterAllDealer({ ...filterAllDealer, state: value.target.outerText });
    setdisableDistrictOption(false);
    if (typeof value.target.outerText == "undefined") {
      setdisableDistrictOption(true);
    }
    getDistrictDetails(value.target.outerText);
  };

  const handleEditTable = (record) => {
    setOpenAddDealerModal(true);
    setOpenEditDealerModal(true);
    setEditDealerData(record);
  };

  const handleEditSubDealerTable = (record) => {
    setopenAddSubDealerModal(true);
    setOpenEditSubDealerModal(true);
    setEditSubDealerData(record);
  };

  const handelAddSubDealerTable = (valData) => {
    setopenAddSubDealerModal(true);
    // setAddSubDealerData(valData)
  };

  useEffect(() => {
    getAllVehicleOemDetails();
    getStateDetails();
    getDistrictDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    // console.log(state, "state ");
    const { data } = await getAllVehicleOEM();
    // console.log(data?.data, "OEM");
    if (data) {
      let OemData = [];
      data.data?.data?.map((val) => {
        OemData?.push(val);
      });
      setVehicleOEM(OemData);
    } else {
      setVehicleOEM([]);
    }
  };

  const getStateDetails = async (oem) => {
    const { data } = await getAllStateDetails(oem);
    // console.log(data,"state");
    if (data) {
      let stateData = [];
      data?.data?.data?.map((val) => {
        stateData?.push({ id: val, label: val });
      });
      setState(stateData);
    } else {
      setState([]);
    }
  };

  const getDistrictDetails = async (state) => {
    const { data } = await getAllDistrictDetails(state);
    if (data) {
      let districtData = [];
      data?.data?.data?.map((val) => {
        districtData?.push({ id: val, label: val });
      });
      setDistrict(districtData);
    } else {
      setDistrict([]);
    }
  };

  useEffect(() => {
    if (
      filterAllDealers?.vehicleOEM &&
      filterAllDealer?.state &&
      filterAllDealer1?.district
    ) {
      const filteredData = () => {
        let ManufaturerfilteredData = allDealersCopy.filter((item) => {
          if (item.mainDealerManufacturerName) {
            return item?.mainDealerManufacturerName
              .toLowerCase()
              .includes(filterAllDealers?.vehicleOEM.toLowerCase());
          }
        });

        let statefilteredData = ManufaturerfilteredData.filter((item) => {
          if (item.state) {
            return item?.state
              .toLowerCase()
              .includes(filterAllDealer?.state.toLowerCase());
          }
        });

        let districtfilteredData = statefilteredData.filter((item) => {
          if (item.district) {
            return item?.district
              .toLowerCase()
              .includes(filterAllDealer1?.district.toLowerCase());
          }
        });
        return districtfilteredData;
      };
      if (filteredData) {
        setAllDealers(filteredData);
        console.log(allDealers);
      } else {
        setAllDealers([]);
      }
    } else {
      setAllDealers([...allDealersCopy]);
    }
  }, [
    filterAllDealers?.vehicleOEM,
    filterAllDealer?.state,
    filterAllDealer1?.district,
  ]);

  useEffect(() => {
    getDealersDetails();
  }, []);

  const getDealersDetails = async (id) => {
    // console.log(state, "state");
    let paramsData = id ? id : "All";
    // console.log(paramsData, "tej");
    const { data } = await getAllMainDealersDetails(paramsData);
    if (data) {
      if (data) {
        let dealersData = data?.data;
        setAllDealers([...dealersData]);
        setAllDealersCopy([...data.data]);
      }
    }
    setActive(!active);
  };

  const getSubDealerDetails = async (mainDealerId) => {
    // setOpen(!open);
    const { data } = await getAllSubDealersDetails(mainDealerId);
    // console.log(params, "params");
    const subdealerData = data?.data?.data;
    setallSubDealers(subdealerData);
  };

  // const getShowVariantsInMainDealers = async (mainDealerID) => {
  //   const { data } = await showVehicleVariantsInMainDealer(mainDealerID);
  //   // console.log(data?.data?.data,"showData");
  //   if (data) {
  //     if (data) {
  //       let vehicleData = data?.data?.data;
  //       setShowVariants(vehicleData);
  //     }
  //   }
  // };

  const getAllAddVariantsDetails = async (params) => {
    const { data } = await showVehicleVariantsToAddInMainDealer(params);
    // console.log(data?.data,"data");
    if (data) {
      if (data) {
        setshowAddVariants(data?.data?.data);
      }
    }
  };

  useEffect(() => {
    getAllAddVariantsDetails();
  }, []);

  const getShowBranchesInMainDealers = async (mainDealerID) => {
    const { data } = await getAllBranchesInMainDealer(mainDealerID);
    if (data) {
      if (data) {
        if (data) {
          let branchData = data?.data?.data;
          setShowBranch([...branchData]);
        }
      }
    }
  };

  const getShowBranchesToAddInMainDealers = async (mainDealerID) => {
    // console.log(mainDealerID,"mainDealerID");
    const { data } = await getAllBranchesToAddInMainDealer(mainDealerID);
    // console.log(data?.data, "Dealer");
    if (data) {
      if (data) {
        if (data) {
          let branches = data?.data?.data;
          setShowBranchToAdd([...branches]);
        }
      }
    }
  };

  const getShowBranchesInSubDealers = async (params) => {
    const { data } = await getAllBranchesInSubDealer(params);
    // console.log(data.data?.data, "datainsub");
    if (data) {
      if (data) {
        let subBranchData = data?.data?.data;
        setShowSubBranch([...subBranchData]);
      }
    }
  };

  const getShowBranchesInSubDealersToAdd = async (params) => {
    const { data } = await getAllBranchesInSubDealerToAdd(params);
    // console.log(data.data, "datainsub1");
    if (data) {
      if (data) {
        let subBranchDataToAdd = data?.data?.data;
        setshowSubBranchToAdd([...subBranchDataToAdd]);
      }
    }
  };

  const downloadXLSFile = async () => {
    await axios
      .get("http://localhost:9666/downloadexcel", {
        method: "GET",
        responseType: "blob", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <Box
      sx={{
        alignSelf: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "light.dark",
      }}
    >
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={12}>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontSize: 34,
              fontWeight: "bold",
              textAlign: "center",
              color: "#202DAF ",
            }}
          >
            Dealer and SubDealer Details
          </Typography>
        </Grid>

        <Grid
          item
          sx={{ ml: 4, display: "flex", flexDirection: "row" }}
          xs={12}
          md={12}
        >
          <Typography
            sx={{
              ml: 1,
              mt: 2,
              fontSize: 13,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TuneIcon />
            <br /> Filter By
          </Typography>

          <Autocomplete
            ref={ref0}
            id="combo-box-demo"
            options={vehicleOEM}
            sx={{ m: 1, width: 200, ml: 1 }}
            size="large"
            renderInput={(params) => (
              <TextField {...params} label="Select Vehicle OEM" />
            )}
            value={filterAllDealers?.vehicleOEM}
            onChange={handleVehicleOEMChange}
          />

          <Autocomplete
            ref={ref0}
            id="combo-box-demo"
            options={state}
            sx={{ m: 1, width: 200, ml: 1 }}
            size="large"
            renderInput={(params) => (
              <TextField {...params} label="Select State" />
            )}
            name="state"
            onChange={(e) => handleStateChange(e)}
            value={filterAllDealer?.state ?? ""}
            inputValue={filterAllDealer?.state ?? ""}
            disabled={disableStateOption}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={district}
            sx={{ m: 1, width: 200, ml: 1 }}
            size="large"
            renderInput={(params) => (
              <TextField {...params} label="Select District" />
            )}
            name="district"
            value={filterAllDealer1?.district ?? ""}
            inputValue={filterAllDealer1?.district ?? ""}
            onChange={(e) => handleDistrictChange(e)}
            disabled={disableDistrictOption}
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
            sx={{ width: 600, m: 1, ml: 6 }}
            value={searchText}
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Grid sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: "bold", m: 1 }}
                align="left"
              >
                Dealers
              </Typography>

              <Grid sx={{ m: 1, ml: 200, display: "flex" }}>
                {props.hideButtons ? null : (
                  // <Grid >
                  <Typography
                    style={{
                      color: "green",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                    onClick={downloadXLSFile}
                  >
                    <FileDownloadIcon
                      fontSize="large"
                      sx={{ color: "green" }}
                      onClick={downloadXLSFile}
                    />
                    Download
                  </Typography>
                  // </Grid>
                )}

                {props.hideButtons ? null : (
                  <ColorButton
                    variant="contained"
                    size="large"
                    sx={{ background: "green", m: 1, ml: 5, fontSize: 20 }}
                    onClick={() => setOpenAddDealerModal(true)}
                    // size="lg"
                  >
                    {<AddIcon sx={{ color: "#ffffff" }} />}
                    Add Main Dealer
                  </ColorButton>
                )}
              </Grid>

              <AddDealerModal
                show={openAddDealerModal}
                close={() => setOpenAddDealerModal(false)}
                getDealersDetails={getDealersDetails}
                type={openEditDealerModal ? "edit" : "add"}
                disabled={openEditDealerModal ? "edit" : "add"}
                EditDealerData={openEditDealerModal && EditDealerData}
              />
            </Grid>
            <Table aria-label="collapsible table" sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Vehicle OEM</StyledTableCell>
                  <StyledTableCell align="right">State</StyledTableCell>
                  <StyledTableCell align="right">District</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell>Dealers ID</StyledTableCell>
                  <StyledTableCell>Dealers Name</StyledTableCell>
                  <StyledTableCell>Dealers Type</StyledTableCell>
                  <StyledTableCell align="right">Contact No.</StyledTableCell>
                  <StyledTableCell align="right">
                    Alternative No.
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Contact Person Name
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Contact Person Mobile
                  </StyledTableCell>
                  <StyledTableCell align="right" style={{ display: "none" }}>
                    EmailId
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Activation Date
                  </StyledTableCell>
                  <StyledTableCell align="right">Expiry Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell>Checker Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allDealers &&
                  allDealers
                    ?.filter((value) => {
                      // console.log(value,"value");
                      if (searchText === "") {
                        return value;
                      } else if (
                        value.mainDealerName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      ) {
                        // console.log(searchText,"searchText");
                        return value;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, id) => (
                      <React.Fragment>
                        <StyledTableRow
                          sx={{ "& > *": { borderBottom: "unset" } }}
                          key={row.mainDealerID}
                        >
                          <StyledTableCell align="right">
                            {row.mainDealerManufacturerName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.state}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.district}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.addressDetails}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.mainDealerID}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.mainDealerName}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.dealerType}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.mainDealerContactNumber}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.mainDealerAlternateContactNumber}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.mainDealerContactPersonName}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.contactPersonMobile}
                          </StyledTableCell>
                          <StyledTableCell
                            align="right"
                            style={{ display: "none" }}
                          >
                            {row.mainDealerMailID}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.mainDealerActivationData}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.mainDealerExpireData}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                // ml: 5,
                              }}
                            >
                              {props.hideButtons ? null : (
                                <ColorIcon>
                                  <Grid
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <EditIcon
                                      fontSize="large"
                                      onClick={() => handleEditTable(row)}
                                    />
                                    <Typography
                                      sx={{ fontSize: 12, fontWeight: 800 }}
                                    >
                                      View & Edit
                                    </Typography>
                                  </Grid>
                                </ColorIcon>
                              )}

                              <ColorIcon>
                                <Grid
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <UploadFileIcon
                                    fontSize="large"
                                    onClick={() => {
                                      setOpenAddDocumentModal(true);
                                      setfileMaindealerId(row.mainDealerID);
                                    }}
                                  />
                                  <Typography
                                    sx={{ fontSize: 12, fontWeight: 800 }}
                                  >
                                    Upload Documents
                                  </Typography>
                                </Grid>
                              </ColorIcon>

                              {openAddDocumentModal && (
                                <UploadDocumentsModal
                                  show={openAddDocumentModal}
                                  close={() => {
                                    setOpenAddDocumentModal(false);
                                    setfileMaindealerId(null);
                                  }}
                                  mainDealerID={filemainDealerId}
                                  hideButtons={props.hideButtons}
                                />
                              )}

                              {/* <ColorIcon>
                                <Grid>
                                  <Grid
                                    sx={
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                    }}
                                  >
                                    <SourceIcon
                                      size="lg"
                                      onClick={() => {
                                        setOpenShowVariants(true);
                                        getShowVariantsInMainDealers(
                                          row.mainDealerID
                                        );
                                        getAllAddVariantsDetails(
                                          row.mainDealerID
                                        );
                                      }}
                                    />
                                  </Grid>
                                  <Typography
                                    sx={{
                                      fontWeight: 800,
                                      fontSize: 12,
                                    }}
                                  >
                                    Link Vehicles
                                  </Typography>
                                </Grid>
                              </ColorIcon> */}

                              {/* <ShowVehicleVariantModal
                                show={openShowVariants}
                                close={() => setOpenShowVariants(false)}
                                getShowVariantsInMainDealers={
                                  getShowVariantsInMainDealers
                                }
                                showVariants={showVariants}
                                mainDealerID={row.mainDealerID}
                                showAddVariants={showAddVariants}
                                getAllAddVariantsDetails={
                                  getAllAddVariantsDetails
                                }
                              /> */}

                              <ColorIcon>
                                <Grid
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <AutoAwesomeMotionIcon
                                    fontSize="large"
                                    onClick={() => {
                                      setOpenShowBranchModal(true);
                                      setaddStateId(row?.state);
                                      getShowBranchesInMainDealers(
                                        row.mainDealerID
                                      );
                                      getShowBranchesToAddInMainDealers(
                                        row.mainDealerID
                                      );
                                      setaddMaindealerId(row.mainDealerID);
                                    }}
                                  />
                                  <Typography
                                    sx={{ fontSize: 13, fontWeight: 800 }}
                                  >
                                    Branch Mapping
                                  </Typography>
                                </Grid>
                              </ColorIcon>
                              <ShowBranchesOfMainDealer
                                show={OpenShowBranchModal}
                                close={() => setOpenShowBranchModal(false)}
                                mainDealerID={addMaindealerId}
                                showBranch={showBranch}
                                showBranchToAdd={showBranchToAdd}
                                setShowBranchToAdd={setShowBranchToAdd}
                                getShowBranchesInMainDealers={
                                  getShowBranchesInMainDealers
                                }
                                getShowBranchesToAddInMainDealers={
                                  getShowBranchesToAddInMainDealers
                                }
                                // showBranchToAddCopy={showBranchToAddCopy}
                                // setShowBranchToAddCopy={setShowBranchToAddCopy}
                                filterAddBranch={filterAddBranch}
                                setFilterAddBranch={setFilterAddBranch}
                                state={addStateId}
                                city={row?.city}
                              />
                            </Grid>
                          </StyledTableCell>

                          <StyledTableCell sx={{ color: "#136A0C" }}>
                            <IconButton aria-label="expand row">
                              <PlaylistAddIcon
                                fontSize="large"
                                sx={{ color: "green" }}
                                onClick={() => {
                                  // console.log("id", id);
                                  open === id ? setOpen(null) : setOpen(id);
                                  setParamsId(row.mainDealerID);
                                  getSubDealerDetails(row.mainDealerID);
                                  setRowData(row?.mainDealerID);
                                }}
                              />
                            </IconButton>
                            Sub <br /> Dealers
                          </StyledTableCell>
                          <StyledTableCell>
                            {row.mainDealerStatus}
                          </StyledTableCell>
                        </StyledTableRow>

                        <React.Fragment>
                          <TableRow>
                            <TableCell
                              style={{
                                paddingBottom: 0,
                                paddingTop: 0,
                                m: 2,
                              }}
                              colSpan={19}
                            >
                              <Collapse
                                in={Boolean(open === id)}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ margin: 1 }}>
                                  <Grid sx={{ display: "flex", m: 1 }}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      component="div"
                                      sx={{
                                        fontSize: 23,
                                        fontWeight: "bold",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                      }}
                                    >
                                      Sub Dealers (
                                      <Typography
                                        sx={{ fontSize: 15, fontWeight: 800 }}
                                      >
                                        {row.mainDealerID}
                                      </Typography>
                                      )
                                    </Typography>

                                    {props.hideButtons ? null : (
                                      <ColorButton
                                        variant="contained"
                                        size="large"
                                        sx={{
                                          ml: 110,
                                          background: "#2334BF",
                                          fontSize: 20,
                                          ml: 150,
                                        }}
                                        onClick={() => {
                                          setopenAddSubDealerModal(true);
                                          // handelAddSubDealerTable(
                                          //   row.mainDealerID
                                          // );
                                          setParamsId(row.mainDealerID);
                                          setMainDealerData(row);
                                        }}
                                      >
                                        {<AddIcon sx={{ color: "#ffffff" }} />}
                                        Add Sub Dealer
                                      </ColorButton>
                                    )}
                                    <AddSubDealerModal
                                      show={openAddSubDealerModal}
                                      close={() =>
                                        setopenAddSubDealerModal(false)
                                      }
                                      getSubDealerDetails={getSubDealerDetails}
                                      mainDealerID={row?.mainDealerID}
                                      type={
                                        openEditSubDealerModal ? "edit" : "add"
                                      }
                                      disabled={
                                        openEditSubDealerModal ? "edit" : "add"
                                      }
                                      EditSubDealerData={
                                        openEditSubDealerModal &&
                                        EditSubDealerData
                                      }
                                      paramsId={paramsId}
                                      mainDealerData={mainDealerData}
                                    />
                                  </Grid>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <StyledSubTableRow>
                                        <StyledSubTableCell>
                                          Dealers ID
                                        </StyledSubTableCell>
                                        <StyledSubTableCell>
                                          Dealers Name
                                        </StyledSubTableCell>
                                        <StyledSubTableCell>
                                          Dealers Type
                                        </StyledSubTableCell>
                                        <StyledSubTableCell
                                          align="right"
                                          style={{ display: "none" }}
                                        >
                                          EmailId
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Vehicle OEM
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Contact No.
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Alternative No.
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Contact Person Name
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Contact Person Mobile
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Activation Date
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Address
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          State
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Actions
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="right">
                                          Checker Status
                                        </StyledSubTableCell>
                                      </StyledSubTableRow>
                                    </TableHead>
                                    <TableBody>
                                      {allSubDealers?.map((val) => (
                                        <StyledSubTableRow
                                          key={val.subDealerID}
                                        >
                                          <StyledSubTableCell>
                                            {val.subDealerID}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell
                                            component="th"
                                            scope="row"
                                          >
                                            {val.subDealerName}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell>
                                            {val.dealerType}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell
                                            align="right"
                                            style={{ display: "none" }}
                                          >
                                            {val.subDealerMailID}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.subDealerManufacturerName}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.subDealerContactNumber}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {
                                              val.subDealerAlternateContactNumber
                                            }
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.subDealerContactPersonName}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.contactPersonMobile}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.subDealerActivationData}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.addressDetails}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.state}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            <Grid
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                ml: 5,
                                              }}
                                            >
                                              {props.hideButtons ? null : (
                                                <ColorIcon>
                                                  <Grid
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <EditIcon
                                                      sx={{ ml: 1 }}
                                                      onClick={() => {
                                                        handleEditSubDealerTable(
                                                          val
                                                        );
                                                        setMainDealerData(row);
                                                      }}
                                                    />
                                                    <Typography
                                                      sx={{ fontWeight: 800 }}
                                                    >
                                                      Edit
                                                    </Typography>
                                                  </Grid>
                                                </ColorIcon>
                                              )}
                                              {/* <EditSubDealerModal
                                                show={openEditSubDealerModal}
                                                close={() =>
                                                  setOpenEditSubDealerModal(
                                                    false
                                                  )
                                                }
                                                editSubDealerData={
                                                  EditSubDealerData
                                                }
                                                getSubDealerDetails={
                                                  getSubDealerDetails
                                                }
                                                paramsId={paramsId}
                                                mainDealerData={mainDealerData}
                                              /> */}

                                              <ColorIcon>
                                                <Grid
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <AutoAwesomeMotionIcon
                                                    size="large"
                                                    onClick={() => {
                                                      setOpenShowSubBranchModal(
                                                        true
                                                      );
                                                      setaddSubStateId(
                                                        val?.state
                                                      );
                                                      setaddSubdealerId(
                                                        val.subDealerID
                                                      );
                                                      getShowBranchesInSubDealers(
                                                        val.subDealerID
                                                      );
                                                      getShowBranchesInSubDealersToAdd(
                                                        val.subDealerID
                                                      );
                                                    }}
                                                  />
                                                  <Typography
                                                    sx={{
                                                      fontSize: 13,
                                                      fontWeight: 800,
                                                    }}
                                                  >
                                                    Branch Mapping
                                                  </Typography>
                                                </Grid>
                                              </ColorIcon>
                                              <ShowBranchesForSubDealers
                                                show={openShowSubBranchModal}
                                                close={() =>
                                                  setOpenShowSubBranchModal(
                                                    false
                                                  )
                                                }
                                                showSubBranch={showSubBranch}
                                                showSubBranchToAdd={
                                                  showSubBranchToAdd
                                                }
                                                getShowBranchesInSubDealers={
                                                  getShowBranchesInSubDealers
                                                }
                                                getShowBranchesInSubDealersToAdd={
                                                  getShowBranchesInSubDealersToAdd
                                                }
                                                filterAddSubBranch={
                                                  filterAddSubBranch
                                                }
                                                setfilterAddSubBranch={
                                                  setfilterAddSubBranch
                                                }
                                                state={addSubStateId}
                                                subDealerID={addSubdealerId}
                                                city={val.city}
                                                setShowBranchToAd={
                                                  setShowBranchToAdd
                                                }
                                              />
                                              {/* <ColorIcon>
                                                <Grid>
                                                  <Grid
                                                    sx={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <SourceIcon
                                                      size="lg"
                                                      onClick={() => {
                                                        setOpenShowVariants(
                                                          true
                                                        );
                                                        getShowVariantsInSubDealers(
                                                          val.subDealerID
                                                        );
                                                      }}
                                                    />
                                                  </Grid>

                                                  <Typography
                                                    sx={{
                                                      fontWeight: "bold",
                                                      fontSize: 12,
                                                    }}
                                                  >
                                                    Link Vehicles
                                                  </Typography> */}
                                              {/* <ShowSubVehicleVariantModal
                                                    show={openShowVariants}
                                                    close={() =>
                                                      setOpenShowVariants(false)
                                                    }
                                                    showSubVariants={
                                                      showSubVariants
                                                    }
                                                    subDealerID={
                                                      val.subDealerID
                                                    }
                                                    setShowSubVariants={
                                                      setShowSubVariants
                                                    }
                                                  /> */}
                                              {/* </Grid>
                                              </ColorIcon> */}
                                            </Grid>
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="right">
                                            {val.subDealerStatus}
                                          </StyledSubTableCell>
                                        </StyledSubTableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      </React.Fragment>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allDealers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
