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
import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
import {
  deepOrange,
  deepPurple,
  green,
  pink,
  yellow,
} from "@mui/material/colors";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getDealersAndSubDealersDetailsPendingDetails } from "../../service/checker";
import {
  getAllBranchesInSubDealer,
  getAllBranchesInSubDealerToAdd,
  showVehicleVariantsInSubDealer,
  showVehicleVariantsInSubDealerToAdd,
} from "../../service/subDealers";
import {
  getAllBranchesInMainDealer,
  getAllBranchesToAddInMainDealer,
  showVehicleVariantsInMainDealer,
  showVehicleVariantsToAddInMainDealer,
} from "../../service/dealers";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EditSubDealerModal from "../../Dealers/SubDealerEditModal/EditSubDealerModal";
import ShowBranchesForSubDealers from "../../Dealers/ShowBranchesForSubDealers/ShowBranchesForSubDealers";
import EditDealerModal from "../../Dealers/EditDealerModal/EditDealerModal";
import UploadDocumentsModal from "../../Dealers/UploadDocumentsModal/UploadDocumentsModal";
import ShowBranchesOfMainDealer from "../../Dealers/ShowBranchesOfMainDealer/ShowBranchesOfMainDealer";
import ShowSubVehicleVariantModal from "../../Dealers/ShowSubVehicleVariants/ShowSubVehicleVariantModal";
import SourceIcon from "@mui/icons-material/Source";
import ShowVehicleVariantModal from "../../Dealers/ShowVehicleVariants/ShowVehicleVariantModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "6px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.common.white,
    fontSize: 10,
    // borderRight:2,
    // borderWidth:1
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 800,
    backgroundColor: "#EEF5C7",
    // borderRight:2,
    // borderWidth:1
  },
}));

const StyledSubTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.root}`]: {
    padding: "6px",
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.common.white,
    fontSize: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    fontWeight: 800,
    backgroundColor: " ",
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

export default function CheckerDetails(props) {
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
  const [openShowVariants, setOpenShowVariants] = useState(false);
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
  const [addSubdealerId, setaddSubdealerId] = useState("");
  const [filterAddSubBranch, setfilterAddSubBranch] = useState({});
  const [addSubStateId, setaddSubStateId] = useState(null);
  const [dealerId, setdealerId] = useState("");
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

  const handleStateChange = (value) => {
    setFilterAllDealer({ ...filterAllDealer, state: value.target.outerText });
    setdisableDistrictOption(false);
    if (typeof value.target.outerText == "undefined") {
      setdisableDistrictOption(true);
    }
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
    }
  };

  const handleEditTable = (record) => {
    setOpenEditDealerModal(true);
    setOpenAddDealerModal(true);
    setEditDealerData(record);
  };

  const handleEditSubDealerTable = (editData) => {
    setOpenEditSubDealerModal(true);
    setEditSubDealerData(editData);
  };

  const handelAddSubDealerTable = (valData) => {
    setopenAddSubDealerModal(true);
    // setAddSubDealerData(valData)
  };

  useEffect(() => {
    getDealersDetails();
  }, []);

  const getDealersDetails = async () => {
    const { data } = await getDealersAndSubDealersDetailsPendingDetails();
    // console.log(data?.data, "data");
    if (data) {
      let dealersData = data?.data;
      setAllDealers([...dealersData]);
      setallSubDealers([...dealersData]);
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

  const getShowVariantsInMainDealers = async (mainDealerID) => {
    const { data } = await showVehicleVariantsInMainDealer(mainDealerID);
    // console.log(data, "showVariants");
    if (data) {
      if (data?.data?.error === "FALSE") {
        const vehicleData = data?.data?.data;
        setShowVariants(vehicleData);
      }
    }
  };

  const getAllAddVariantsDetails = async (params) => {
    const { data } = await showVehicleVariantsToAddInMainDealer(params);
    // console.log(data?.data?.data,"mainVariantstoadd");
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
    // console.log(subDealerID, "subDealerID");
    const { data } = await showVehicleVariantsInSubDealer(subDealerID);
    if (data) {
      if (data?.data?.error === "FALSE") {
        let subData = data?.data?.data;
        setShowSubVariants(subData);
      }
    }
  };

  const getShowVariantsInSubDealersToAdd = async (subDealerID) => {
    const { data } = await showVehicleVariantsInSubDealerToAdd(subDealerID);
    // console.log(data, "dataVariants");
    if (data) {
      // if (data) {
      let showData = data?.data?.data;
      setShowSubVariantsToAdd([...showData]);
      // }
    }
  };

  useEffect(() => {
    const res = dealerId?.split("-")[dealerId?.split("-").length - 1];
    const response = async () => {
      if (res === "A01") {
        await getShowBranchesInMainDealers();
        await getShowBranchesToAddInMainDealers();
      } else {
        // console.log("else");
        await getShowBranchesInSubDealers();
        await getShowBranchesInSubDealersToAdd();
      }
    };
    response();
  }, [dealerId]);

  return (
    <Box
      sx={{
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ position: "fixed", maxWidth: "89%" }}>
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

        <TableContainer
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
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell>Dealers ID</StyledTableCell>
                <StyledTableCell>Dealers Name</StyledTableCell>
                <StyledTableCell>Dealers Type</StyledTableCell>
                <StyledTableCell align="center">Contact No.</StyledTableCell>
                <StyledTableCell align="center">
                  Alternative No.
                </StyledTableCell>
                <StyledTableCell align="center">
                  Contact Person Name
                </StyledTableCell>
                <StyledTableCell align="center">
                  Contact Person Mobile
                </StyledTableCell>
                <StyledTableCell align="center" style={{ display: "none" }}>
                  EmailId
                </StyledTableCell>
                <StyledTableCell align="center">
                  Activation Date
                </StyledTableCell>
                <StyledTableCell align="center">Expiry Date</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
                <StyledTableCell />
                <StyledTableCell>Checker Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allDealers &&
                allDealers
                  ?.filter((value) => {
                    if (searchText === "") {
                      return value;
                    } else if (
                      value.dealerName
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
                        sx={{ "& > *": { borderBottom: "unset" } }}
                        key={row.dealerID}
                      >
                        <StyledTableCell align="center">
                          {row.dealerManufacturerName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.state}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.district}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.addressDetails}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.dealerID}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.dealerName}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row.dealerType}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.dealerContactNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.dealerAlternateContactNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.dealerContactPersonName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.contactPersonMobile}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ display: "none" }}
                        >
                          {row.dealerMailID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.dealerActivationData}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.dealerExpireData}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Grid
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              // ml: 5,
                            }}
                          >
                            <StyledTableCell align="center">
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
                                    <EditIcon
                                      fontSize="small"
                                      onClick={() => {
                                        handleEditTable(row);
                                        setdealerId(row?.dealerID);
                                      }}
                                    />
                                    <Typography
                                      sx={{ fontSize: 8, fontWeight: 800 }}
                                    >
                                      View & Check Details
                                    </Typography>
                                  </Grid>
                                </ColorIcon>
                                <EditDealerModal
                                  show={openEditDealerModal}
                                  close={() => setOpenEditDealerModal(false)}
                                  editDealerData={EditDealerData}
                                  getDealersDetails={getDealersDetails}
                                  dealerID={dealerId}
                                />
                              </Grid>
                            </StyledTableCell>

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
                                    setfileMaindealerId(row.dealerID);
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
                                // sx={{display:dealerType==="SubDealer"? "none":""}}
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
                                <FormatListBulletedIcon
                                  fontSize="small"
                                  onClick={() => {
                                    setOpenShowBranchModal(true);
                                    setaddStateId(row?.state);
                                    getShowBranchesInMainDealers(row.dealerID);
                                    getShowBranchesToAddInMainDealers(
                                      row.dealerID
                                    );
                                    setaddMaindealerId(row.dealerID);
                                    setdealerId(row?.dealerID);
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
                              setOpenShowBranchModal={setOpenShowBranchModal}
                            />

                            <Button>
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
                                        row.dealerID
                                      );
                                      getAllAddVariantsDetails(row.dealerID);
                                      setaddMaindealerId(row.dealerID);
                                    }}
                                  />
                                  <Typography
                                    sx={{ fontSize: 8, fontWeight: 800 }}
                                  >
                                    Link Vehicles
                                  </Typography>
                                </Grid>
                              </ColorIcon>
                            </Button>
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
                          </Grid>
                        </StyledTableCell>

                        <StyledTableCell />
                        <StyledTableCell>{row.dealerStatus}</StyledTableCell>
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
                                      {row.dealerID}
                                    </Typography>
                                    )
                                  </Typography>
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
                                      <StyledSubTableCell
                                        align="center"
                                        style={{ display: "none" }}
                                      >
                                        EmailId
                                      </StyledSubTableCell>
                                      <StyledSubTableCell align="center">
                                        Manufacturer Name
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
                                        Expiry Date
                                      </StyledSubTableCell>
                                      <StyledSubTableCell align="center">
                                        Address
                                      </StyledSubTableCell>
                                      <StyledSubTableCell align="center">
                                        State
                                      </StyledSubTableCell>
                                      <StyledSubTableCell align="center">
                                        District
                                      </StyledSubTableCell>
                                      <StyledSubTableCell align="center">
                                        Actions
                                      </StyledSubTableCell>
                                      <StyledSubTableCell>
                                        Status
                                      </StyledSubTableCell>
                                    </StyledSubTableRow>
                                  </TableHead>
                                  <TableBody>
                                    {allSubDealers?.map((val) => (
                                      <StyledSubTableRow key={val.dealerID}>
                                        <StyledSubTableCell>
                                          {val.dealerID}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell
                                          component="th"
                                          scope="row"
                                        >
                                          {val.dealerName}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell
                                          align="center"
                                          style={{ display: "none" }}
                                        >
                                          {val.dealerMailID}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerManufacturerName}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerContactNumber}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerAlternateContactNumber}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerContactPersonName}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.contactPersonMobile}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerActivationData}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.dealerExpireData}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.addressDetails}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.state}
                                        </StyledSubTableCell>
                                        <StyledSubTableCell align="center">
                                          {val.district}
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
                                                <EditIcon
                                                  sx={{ ml: 1 }}
                                                  onClick={() => {
                                                    handleEditSubDealerTable(
                                                      val
                                                    );
                                                    setMainDealerData(val);
                                                  }}
                                                />
                                                <Typography>Edit</Typography>
                                              </Grid>
                                            </ColorIcon>
                                            <EditSubDealerModal
                                              show={openEditSubDealerModal}
                                              close={() =>
                                                setOpenEditSubDealerModal(false)
                                              }
                                              editSubDealerData={
                                                EditSubDealerData
                                              }
                                              // getSubDealerDetails={
                                              //   getSubDealerDetails
                                              // }
                                              paramsId={paramsId}
                                              mainDealerData={mainDealerData}
                                            />

                                            <ColorIcon>
                                              <Grid
                                                sx={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <FormatListBulletedIcon
                                                  size="large"
                                                  onClick={() => {
                                                    setOpenShowSubBranchModal(
                                                      true
                                                    );
                                                    setaddSubStateId(
                                                      val?.state
                                                    );
                                                    setaddSubdealerId(
                                                      val?.dealerID
                                                    );
                                                    getShowBranchesInSubDealers(
                                                      val?.dealerID
                                                    );
                                                    getShowBranchesInSubDealersToAdd(
                                                      val?.dealerID
                                                    );
                                                  }}
                                                />
                                                <Typography
                                                  sx={{
                                                    fontSize: 13,
                                                    fontWeight: 800,
                                                  }}
                                                >
                                                  Show Branch
                                                </Typography>
                                              </Grid>
                                            </ColorIcon>

                                            <ShowBranchesForSubDealers
                                              show={openShowSubBranchModal}
                                              close={() =>
                                                setOpenShowSubBranchModal(false)
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
                                                      val?.dealerID
                                                    );
                                                    getShowVariantsInSubDealersToAdd(
                                                      val?.dealerID
                                                    );
                                                    setaddSubdealerId(
                                                      val?.dealerID
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
                                              showSubVariants={showSubVariants}
                                              subDealerID={addSubdealerId}
                                              setShowSubVariants={
                                                setShowSubVariants
                                              }
                                              showSubVariantsToAdd={
                                                showSubVariantsToAdd
                                              }
                                              getShowVariantsInSubDealers={
                                                getShowVariantsInSubDealers
                                              }
                                              getShowVariantsInSubDealersToAdd={
                                                getShowVariantsInSubDealersToAdd
                                              }
                                            />
                                          </Grid>
                                        </StyledSubTableCell>
                                        <StyledSubTableCell />
                                        <StyledSubTableCell>
                                          {val.dealerStatus}
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
          <Grid item xs={12} md={12}>
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
        </TableContainer>
      </Box>
    </Box>
  );
}
