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
  lightGreen,
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
  showVehicleVariantsInSubDealerToAdd,
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
import ViewDealerModal from "./ViewDealerModal/ViewDealerModal";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewSubDealerModal from "./SubDealerEditModal/ViewSubDealerModal";
import ShowSubVehicleVariantModal from "./ShowSubVehicleVariants/ShowSubVehicleVariantModal";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "6px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
    fontSize: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 740,
    backgroundColor: "#D9F1F8",
  },
}));

const StyledSubTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "5px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.common.white,
    fontSize: 9,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 9,
    fontWeight: 750,
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
  const [district, setDistrict] = useState([]);
  const [filterAllDealer, setFilterAllDealer] = useState({});
  const [filterAllDealer1, setFilterAllDealer1] = useState({});
  const [vehicleOEM, setVehicleOEM] = useState([]);
  const [filterAllDealers, setFilterAllDealers] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [mainDealerData, setMainDealerData] = useState({});
  const [showVariants, setShowVariants] = useState([]);
  const [openAddDealerModal, setOpenAddDealerModal] = useState(false);
  const [openEditDealerModal, setOpenEditDealerModal] = useState(false);
  const [openShowVariants, setOpenShowVariants] = useState(false);
  const [EditDealerData, setEditDealerData] = useState({});
  const ref0 = useRef();
  const [open, setOpen] = useState(false);
  const [allSubDealers, setallSubDealers] = useState([]);
  const [openAddSubDealerModal, setopenAddSubDealerModal] = useState(false);
  const [openEditSubDealerModal, setOpenEditSubDealerModal] = useState(false);
  const [EditSubDealerData, setEditSubDealerData] = useState({});
  const [rowData, setRowData] = useState("");
  const [paramsId, setParamsId] = useState("");
  const [showAddVariants, setshowAddVariants] = useState([]);
  const [OpenShowBranchModal, setOpenShowBranchModal] = useState(false);
  const [showBranch, setShowBranch] = useState([]);
  const [showBranchToAdd, setShowBranchToAdd] = useState([]);
  const [filterAddBranch, setFilterAddBranch] = useState({});
  const [openShowSubBranchModal, setOpenShowSubBranchModal] = useState(false);
  const [showSubBranch, setShowSubBranch] = useState([]);
  const [showSubBranchToAdd, setshowSubBranchToAdd] = useState([]);
  const [disableStateOption, setdisableStateOption] = useState(true);
  const [disableDistrictOption, setdisableDistrictOption] = useState(true);
  const [openAddDocumentModal, setOpenAddDocumentModal] = useState(false);
  const [filemainDealerId, setfileMaindealerId] = useState(null);
  const [addStateId, setaddStateId] = useState(null);
  const [active, setActive] = useState(false);
  const [addMaindealerId, setaddMaindealerId] = useState(null);
  const [addSubdealerId, setaddSubdealerId] = useState(null);
  const [filterAddSubBranch, setfilterAddSubBranch] = useState({});
  const [addSubStateId, setaddSubStateId] = useState(null);
  const [openViewDealerModal, setopenViewDealerModal] = useState(false);
  const [viewDealerData, setViewDealerData] = useState({});
  const [openViewSubDealerModal, setopenViewSubDealerModal] = useState(false);
  const [viewSubDealerData, setViewSubDealerData] = useState({});
  const [showSubVariants, setShowSubVariants] = useState([]);
  const [showSubVariantsToAdd, setShowSubVariantsToAdd] = useState([]);
  const [openShowSubVariants, setOpenShowSubVariants] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDistrictChange = (value) => {
    setFilterAllDealer1({
      ...filterAllDealer1,
      district: value.target.outerText,
    });
  };

  const handleVehicleOEMChange = (value) => {
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
    setFilterAllDealer({ ...filterAllDealer, state: value.target.outerText });
    setdisableDistrictOption(false);
    if (typeof value.target.outerText == "undefined") {
      setdisableDistrictOption(true);
    }
    getDistrictDetails(value.target.outerText);
  };

  const handleEditTable = (event, record) => {
    // event.preventDefault();
    setOpenAddDealerModal(true);
    setOpenEditDealerModal(true);
    setEditDealerData(record);
  };

  const handleViewTable = (records) => {
    setopenViewDealerModal(true);
    setViewDealerData(records);
  };

  const handleSubViewTable = (record) => {
    setopenViewSubDealerModal(true);
    setViewSubDealerData(record);
  };

  const handleEditSubDealerTable = (record) => {
    setopenAddSubDealerModal(true);
    setOpenEditSubDealerModal(true);
    setEditSubDealerData(record);
  };

  const handelAddSubDealerTable = (valData) => {
    setopenAddSubDealerModal(true);
  };

  useEffect(() => {
    getAllVehicleOemDetails();
    getStateDetails();
    getDistrictDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getAllVehicleOEM();
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
              .toString()
              .toLowerCase()
              .includes(filterAllDealer1?.district.toString().toLowerCase());
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
    let paramsData = id ? id : "All";
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
    const { data } = await getAllSubDealersDetails(mainDealerId);
    const subdealerData = data?.data?.data;
    setallSubDealers(subdealerData);
  };

  const getShowVariantsInMainDealers = async (mainDealerID) => {
    const { data } = await showVehicleVariantsInMainDealer(mainDealerID);
    console.log(data, "showVariants");
    if (data) {
      if (data?.data?.error === "FALSE") {
        const vehicleData = data?.data?.data;
        setShowVariants(vehicleData);
      }
    }
  };

  const getAllAddVariantsDetails = async (params) => {
    const { data } = await showVehicleVariantsToAddInMainDealer(params);
    if (data) {
      if (data) {
        if (data) {
          let addData = data?.data?.data;
          setshowAddVariants([...addData]);
        }
      }
    }
  };

  const getShowVariantsInSubDealers = async (subDealerID) => {
    const { data } = await showVehicleVariantsInSubDealer(subDealerID);
    if (data) {
      let subData = data?.data?.data;
      setShowSubVariants(subData);
    }
  };

  const getShowVariantsInSubDealersToAdd = async (subDealerID) => {
    const { data } = await showVehicleVariantsInSubDealerToAdd(subDealerID);
    if (data) {
      // if (data) {
      let showData = data?.data?.data;
      showSubVariantsToAdd([...showData]);
      // }
    }
  };

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
    const { data } = await getAllBranchesToAddInMainDealer(mainDealerID);
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
    if (data) {
      if (data) {
        let subBranchData = data?.data?.data;
        setShowSubBranch([...subBranchData]);
      }
    }
  };

  const getShowBranchesInSubDealersToAdd = async (params) => {
    const { data } = await getAllBranchesInSubDealerToAdd(params);
    if (data) {
      if (data) {
        let subBranchDataToAdd = data?.data?.data;
        setshowSubBranchToAdd([...subBranchDataToAdd]);
      }
    }
  };

  const downloadXLSFile = async () => {
    await axios
      .get(
        "http://caglcampaignleads.grameenkoota.in:8080/TwoWheelerLoan/downloadexcel",
        {
          // http://localhost:9666/downloadexcel
          method: "GET",
          responseType: "blob", // important
        }
      )

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
      }}
    >
      <Box
        sx={{
          mt: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "sans-serif",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              color: "#202DAF ",
            }}
          >
            Dealer and SubDealer Details
          </Typography>
        </Box>

        <Box
          sx={{
            ml: 4,
            mt: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 5,
              flexBasis: "5%",
            }}
          >
            <TuneIcon />
            <br /> Filter By
          </Typography>

          <Box
            sx={{
              flexBasis: "15%",
              ml: 2,
              width: "200px",
            }}
          >
            <Autocomplete
              id="combo-box-demo"
              options={vehicleOEM}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select Vehicle OEM" />
              )}
              value={filterAllDealers?.vehicleOEM}
              onChange={handleVehicleOEMChange}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "15%",
              ml: 2,
              width: "100px",
            }}
          >
            <Autocomplete
              ref={ref0}
              id="combo-box-demo"
              options={state}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select State" />
              )}
              name="state"
              onChange={(e) => handleStateChange(e)}
              value={filterAllDealer?.state ?? ""}
              inputValue={filterAllDealer?.state ?? ""}
              disabled={disableStateOption}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "20%",
              ml: 2,
              width: "100px",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={district}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="Select District" />
              )}
              name="district"
              value={filterAllDealer1?.district ?? ""}
              inputValue={filterAllDealer1?.district ?? ""}
              onChange={(e) => handleDistrictChange(e)}
              disabled={disableDistrictOption}
            />
          </Box>

          <Box
            sx={{
              flexBasis: "35%",
              ml: 2,
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
        </Box>

        <Box
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
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Dealers
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
          >
            {props.hideButtons ? null : (
              <ColorIcon>
                <Typography
                  style={{
                    color: lightGreen[900],
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                  onClick={downloadXLSFile}
                >
                  <FileDownloadIcon
                    fontSize="small"
                    sx={{ color: lightGreen[900] }}
                    onClick={downloadXLSFile}
                  />
                  Download
                </Typography>
              </ColorIcon>
            )}

            {props.hideButtons ? null : (
              <ColorButton
                variant="contained"
                size="large"
                sx={{
                  background: "green",
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ml: 1,
                }}
                // onSubmit={(e) => e.preventDefault()}
                onClick={(e) => setOpenAddDealerModal(true)}
                // size="lg"
              >
                {<AddIcon sx={{ color: "#ffffff" }} />}
                Add Main Dealer
              </ColorButton>
            )}
          </Box>

          <AddDealerModal
            show={openAddDealerModal}
            close={() => setOpenAddDealerModal(false)}
            getDealersDetails={getDealersDetails}
            type={openEditDealerModal ? "edit" : "add"}
            disabled={openEditDealerModal ? "edit" : "add"}
            EditDealerData={openEditDealerModal && EditDealerData}
          />
        </Box>
        <Box sx={{ position: "fixed", maxWidth: "89%" }}>
          <TableContainer
            component={Paper}
            sx={{
              margin: "10px 10px 30px 10px",
              mt: 7,
              maxHeight: "350px",
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Vehicle OEM</StyledTableCell>
                  <StyledTableCell align="center">State</StyledTableCell>
                  <StyledTableCell align="center">District</StyledTableCell>
                  {/* <StyledTableCell align="center">Address</StyledTableCell> */}
                  <StyledTableCell align="center">Dealers ID</StyledTableCell>
                  <StyledTableCell align="center">Dealers Name</StyledTableCell>
                  <StyledTableCell align="center">Dealers Type</StyledTableCell>
                  <StyledTableCell align="center">Contact No.</StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Alternative No.
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    Contact Person Name
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Contact Person Mobile
                  </StyledTableCell> */}
                  <StyledTableCell align="center" style={{ display: "none" }}>
                    EmailId
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Activation Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Expiry Date</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell align="center">
                    Checker Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allDealers &&
                  allDealers
                    ?.filter((value) => {
                      if (searchText === "") {
                        return value;
                      } else if (
                        Object.values(value)
                          .join("")
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, id) => (
                      <React.Fragment>
                        <StyledTableRow
                          // sx={{ "& > *": { borderBottom: "unset" } }}
                          key={row.mainDealerID}
                        >
                          <StyledTableCell align="center">
                            {row.mainDealerManufacturerName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.state}
                          </StyledTableCell>

                          {/* {row.split(",").map((value, i) => (
                            <StyledTableCell align="center" key={i}>
                              {value}
                            </StyledTableCell>
                          ))} */}

                          <StyledTableCell align="center">
                            {row.district.join(", ")}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.mainDealerID}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.mainDealerName}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {row.dealerType}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.mainDealerContactNumber}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">
                            {row.mainDealerAlternateContactNumber}
                          </StyledTableCell> */}
                          <StyledTableCell align="center">
                            {row.mainDealerContactPersonName}
                          </StyledTableCell>
                          {/* <StyledTableCell align="center">
                            {row.contactPersonMobile}
                          </StyledTableCell> */}
                          <StyledTableCell
                            align="center"
                            style={{ display: "none" }}
                          >
                            {row.mainDealerMailID}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.mainDealerActivationData}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.mainDealerExpireData}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Grid
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                // ml: 5,
                              }}
                            >
                              <ColorIcon>
                                <Grid
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <ViewModuleIcon
                                    fontSize="small"
                                    onClick={() => handleViewTable(row)}
                                  />
                                  <Typography
                                    sx={{ fontSize: 8, fontWeight: 800 }}
                                  >
                                    View Details
                                  </Typography>
                                </Grid>
                              </ColorIcon>

                              <ViewDealerModal
                                show={openViewDealerModal}
                                close={() => {
                                  setopenViewDealerModal(false);
                                }}
                                getDealersDetails={getDealersDetails}
                                viewDealerData={viewDealerData}
                                setViewDealerData={setViewDealerData}
                              />
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
                                      fontSize="small"
                                      onClick={(e) => handleEditTable(e, row)}
                                    />
                                    <Typography
                                      sx={{ fontSize: 8, fontWeight: 800 }}
                                    >
                                      Edit Details
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
                                    fontSize="small"
                                    onClick={() => {
                                      setOpenAddDocumentModal(true);
                                      setfileMaindealerId(row.mainDealerID);
                                    }}
                                  />
                                  <Typography
                                    sx={{ fontSize: 8, fontWeight: 800 }}
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

                              <ColorIcon>
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
                                      setOpenShowVariants(true);
                                      getShowVariantsInMainDealers(
                                        row.mainDealerID
                                      );
                                      getAllAddVariantsDetails(
                                        row.mainDealerID
                                      );
                                      setaddMaindealerId(row.mainDealerID);
                                    }}
                                  />
                                  <Typography
                                    sx={{ fontSize: 8, fontWeight: 800 }}
                                  >
                                    Link Vehicles
                                  </Typography>
                                </Grid>
                              </ColorIcon>

                              <ShowVehicleVariantModal
                                show={openShowVariants}
                                close={() => setOpenShowVariants(false)}
                                getShowVariantsInMainDealers={
                                  getShowVariantsInMainDealers
                                }
                                showVariants={showVariants}
                                mainDealerID={addMaindealerId}
                                showAddVariants={showAddVariants}
                                getAllAddVariantsDetails={
                                  getAllAddVariantsDetails
                                }
                              />

                              <ColorIcon>
                                <Grid
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <AutoAwesomeMotionIcon
                                    fontSize="small"
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
                                    sx={{ fontSize: 8, fontWeight: 800 }}
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
                                fontSize="small"
                                sx={{ color: "green" }}
                                onClick={() => {
                                  open === id ? setOpen(null) : setOpen(id);
                                  setParamsId(row.mainDealerID);
                                  getSubDealerDetails(row.mainDealerID);
                                  setRowData(row?.mainDealerID);
                                }}
                              />
                            </IconButton>
                            Sub Dealers
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
                                <Box sx={{ margin: "0px" }}>
                                  <Box
                                    sx={{
                                      margin: "10px 30px 0px 0px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      component="div"
                                      sx={{
                                        fontSize: 20,
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
                                        sx={{ fontSize: 10, fontWeight: 800 }}
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
                                          background: "green",
                                          fontSize: 10,
                                          ml: 5,
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
                                  </Box>
                                  <Table
                                    size="small"
                                    aria-label="purchases"
                                    sx={{ margin: "30px 0px", minWidth: 650 }}
                                  >
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
                                          align="center"
                                          style={{ display: "none" }}
                                        >
                                          EmailId
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Vehicle OEM
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Contact No.
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Alternative No.
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Contact Person Name
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Contact Person Mobile
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Activation Date
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Address
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          State
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          Actions
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
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
                                            align="center"
                                            style={{ display: "none" }}
                                          >
                                            {val.subDealerMailID}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.subDealerManufacturerName}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.subDealerContactNumber}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {
                                              val.subDealerAlternateContactNumber
                                            }
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.subDealerContactPersonName}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.contactPersonMobile}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.subDealerActivationData}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.addressDetails}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            {val.state}
                                          </StyledSubTableCell>
                                          <StyledSubTableCell align="center">
                                            <Grid
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                ml: 5,
                                              }}
                                            >
                                              <ColorIcon>
                                                <Grid
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <ViewModuleIcon
                                                    fontSize="small"
                                                    onClick={() =>
                                                      handleSubViewTable(val)
                                                    }
                                                  />
                                                  <Typography
                                                    sx={{
                                                      fontSize: 8,
                                                      fontWeight: 800,
                                                    }}
                                                  >
                                                    View Details
                                                  </Typography>
                                                </Grid>
                                              </ColorIcon>
                                              <ViewSubDealerModal
                                                show={openViewSubDealerModal}
                                                close={() =>
                                                  setopenViewSubDealerModal(
                                                    false
                                                  )
                                                }
                                                viewSubDealerData={
                                                  viewSubDealerData
                                                }
                                                getSubDealerDetails={
                                                  getSubDealerDetails
                                                }
                                                paramsId={paramsId}
                                                mainDealerData={mainDealerData}
                                              />

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
                                                      size="small"
                                                    />
                                                    <Typography
                                                      sx={{
                                                        fontWeight: 800,
                                                        fontSize: 8,
                                                      }}
                                                    >
                                                      Edit
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
                                                  <AutoAwesomeMotionIcon
                                                    size="small"
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
                                                      fontSize: 7,
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
                                                mainDealerID={row.mainDealerID}
                                              />

                                              <ColorIcon>
                                                <Grid
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <SourceIcon
                                                    fontSize="small"
                                                    onClick={() => {
                                                      setOpenShowSubVariants(
                                                        true
                                                      );
                                                      getShowVariantsInSubDealers(
                                                        val.subDealerID
                                                      );
                                                      getShowVariantsInSubDealersToAdd(
                                                        val.subDealerID
                                                      );
                                                    }}
                                                  />
                                                  <Typography
                                                    sx={{
                                                      fontSize: 8,
                                                      fontWeight: 800,
                                                    }}
                                                  >
                                                    Link Vehicles
                                                  </Typography>
                                                </Grid>
                                              </ColorIcon>

                                              <ShowSubVehicleVariantModal
                                                show={openShowSubVariants}
                                                close={() =>
                                                  setOpenShowSubVariants(false)
                                                }
                                                showSubVariants={
                                                  showSubVariants
                                                }
                                                subDealerID={val.subDealerID}
                                                setShowSubVariants={
                                                  setShowSubVariants
                                                }
                                                showSubVariantsToAdd={
                                                  showSubVariantsToAdd
                                                }
                                                getShowVariantsInSubDealer={
                                                  getShowVariantsInSubDealers
                                                }
                                                getShowVariantsInSubDealersToAdd={
                                                  getShowVariantsInSubDealersToAdd
                                                }
                                              />
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
            <Grid item xs={12} md={12} sx={{ mr: 3 }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={allDealers.length}
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
