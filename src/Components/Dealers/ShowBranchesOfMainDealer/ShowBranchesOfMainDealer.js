import React, { useEffect, useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import {
  addAllBranchesInMainDealer,
  removeAllBranchesInMainDealer,
} from "../../service/dealers";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getAreaDetailsByStateandRegion,
  getDistrictDetailsByState,
} from "../../service/districtapi/Districtapi";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const style = {
  bgcolor: "#581845",
  width: 500,
};

function ShowBranchesOfMainDealer(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [removeRowData, setRemoveRowData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // console.log(props, "props");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const tempArr = [];
    props.showBranch?.map((item) => {
      tempArr.push({ ...item });
    });

    // setRemoveRowData([...props.showBranch]);
  }, [props.showBranch]);
  // console.log(props.showBranch, "props.showBranch"); 	
  // console.log();
  const removeRowDataofBranchesFromTable = async (params, value) => {
    let payload = [value];

    const { data } = await removeAllBranchesInMainDealer(params, payload);
    // console.log("data", data);
    if (data?.data?.error === "FALSE") {
      props.getShowBranchesInMainDealers(props.mainDealerID);
      props.getShowBranchesToAddInMainDealers(props.mainDealerID);
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // maxwidth="900px"
        sx={{ height: 200, width: 500, ...style }}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" sx={{ ...style }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", m: 1 }}
              align="left"
            >
              Branch Details of The Dealers
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Branch Mapped
          </Typography>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th align="right" scope="col">
                  Sl NO.
                </th>

                <th align="right" scope="col">
                  Branch ID
                </th>
                <th align="right" scope="col">
                  Branch Name
                </th>
                <th align="right" scope="col">
                  Region/Division
                </th>
                <th align="right" scope="col">
                  Area
                </th>
                <th align="right" scope="col">
                  State
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="table table-success table-striped">
              {props.showBranch
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, idx) => (
                  <tr key={idx}>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {idx}
                    </td>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {value.branchID}
                    </td>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {value.branchName}
                    </td>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {value.region}
                    </td>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {value.area}
                    </td>
                    <td align="left" colSpan={1} style={{ fontWeight: "bold" }}>
                      {value.state}
                    </td>

                    <td align="left" colSpan={1} size="large">
                      <DeleteSweepIcon
                        onClick={() => {
                          setOpen(true);
                        }}
                        fontSize="large"
                      />
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                      </DialogTitle> */}
                        <DialogContent>
                          <Typography>
                            Are you sure you want to delete?
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Back</Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              removeRowDataofBranchesFromTable(
                                props.mainDealerID,
                                value
                              );
                            }}
                            autoFocus
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={props.showBranch?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />

          <hr
            style={{
              borderWidth: 3,
              borderStyle: "dashed",
              borderColor: "#CA2908",
            }}
          />
          <ChildModal
            showBranchToAdd={props.showBranchToAdd}
            mainDealerID={props.mainDealerID}
            removeRowData={removeRowData}
            getShowBranchesInMainDealers={props.getShowBranchesInMainDealers}
            getShowBranchesToAddInMainDealers={
              props.getShowBranchesToAddInMainDealers
            }
            filterAddBranch={props.filterAddBranch}
            // showBranchToAddCopy={props.showBranchToAddCopy}
            state={props?.state}
            region={props.region}
            setShowBranchToAdd={props.setShowBranchToAdd}
          />
        </Modal.Body>
        <ModalFooter>
          <Button onClick={props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const ChildModal = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [regionData, setRegionData] = useState([]);
  // console.log("regionData", regionData);
  const [selectedDistrict, setselectedDistrict] = useState([]);
  // console.log(selectedDistrict, "selectedDistrict");
  const [areaData, setAreaData] = useState([]);
  // console.log(areaData, "areaData");
  const [addMainBranches, setAddMainBranches] = useState([]);
  //   console.log("removeRowData", props.showBranchToAdd);
  const [selectedId, setselectedId] = useState([]);
  // console.log(selectedId,"selectedId");
  const [checked, setChecked] = useState(false);
  const [filterAddBranch, setFilterAddBranch] = useState([]);
  const [sendselectedBranches, setsendselectedBranches] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // console.log(props, "props");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setAddMainBranches(props.showBranchToAdd);
  }, [props.showBranchToAdd]);

  function onCheckBoxClick(e, value, id) {
    const selectedIndex = selectedId.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedId.slice(1));
    } else if (selectedIndex === selectedId.length - 1) {
      newSelected = newSelected.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      );
    }
    setselectedId(newSelected);
  }

  function onselectAllCheckBox(e) {
    if (e.target.checked) {
      setChecked(!checked);
      const tempArr = [];
      addMainBranches.forEach((item) => {
        tempArr.push(item.branchID);
      });
      setselectedId(tempArr);
      setsendselectedBranches(addMainBranches);
    } else {
      setChecked(false);
      setselectedId([]);
      setsendselectedBranches([]);
    }
  }

  const isSelected = (id) => selectedId.indexOf(id) !== -1;

  const addAllBranchesInMainDealerOnSelect = async (mainDealerID) => {
    const payload = [];
    props.showBranchToAdd.forEach((item) => {
      if (selectedId.includes(item.branchID)) {
        payload.push(item);
      }
    });
    const { data } = await addAllBranchesInMainDealer(mainDealerID, payload);
    if (data?.data?.error === "FALSE") {
      props.getShowBranchesInMainDealers(props.mainDealerID);
      props.getShowBranchesToAddInMainDealers(props.mainDealerID);
      setselectedId([]);
      setChecked(false);
    }
  };

  useEffect(() => {
    getAllRegionDetailsOnSelect(props.state);
  }, []);

  const getAllRegionDetailsOnSelect = async (state) => {
    const { data } = await getDistrictDetailsByState(state);
    if (data) {
      let districtData = [];
      data?.data?.data?.map((val) => {
        districtData?.push(val);
      });
      setRegionData(districtData);
    } else {
      setRegionData([]);
    }
  };

  const handleDistrictChange = (e, value) => {
    if (e) {
      setselectedDistrict(value);
    }
  };

  const handleAreaChange = (e, value) => {
    if (e) {
      setFilterAddBranch(value);
    }
  };

  useEffect(() => {
    getAllAreaDetailsOnSelect(props.state);
  }, [selectedDistrict]);

  const getAllAreaDetailsOnSelect = async (state) => {
    const payload = selectedDistrict;
    const { data } = await getAreaDetailsByStateandRegion(state, payload);
    if (data) {
      if (data.data.error === "False") {
        let areaDatas = [];
        data.data?.data?.forEach((val) => {
          areaDatas?.push(val);
        });
        setAreaData(areaDatas);
      } else {
        setAreaData([]);
      }
    }
  };

  useEffect(() => {
    if (selectedDistrict.length > 0 || filterAddBranch.length > 0) {
      if (selectedDistrict.length > 0) {
        const filteredDatas = props.showBranchToAdd.filter((item) => {
          return selectedDistrict.includes(item.region.toString());
        });
        setAddMainBranches([...filteredDatas]);
        
        if (selectedDistrict.length > 0 && filterAddBranch.length > 0) {
          const getFinalData = filteredDatas.filter((item) => {
            return filterAddBranch.includes(item.area?.toString());
          });
          setAddMainBranches([...getFinalData]);
        }
      }
    } else {
      setAddMainBranches([...props.showBranchToAdd]);
    }
  }, [selectedDistrict, filterAddBranch]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <>
      <Grid sx={{ display: "flex" }}>
        <Autocomplete
          id="combo-box-demo"
          multiple
          disableCloseOnSelect
          options={regionData}
          filterSelectedOptions
          sx={{ m: 1, width: 200, ml: 1 }}
          size="small"
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Region/Division" />
          )}
          // filterOptions={[selectedDistrict?.district]}
          // defaultValue={selectedDistrict}
          // value={selectedDistrict?.district ?? ""}
          // inputValue={[selectedDistrict?.district??""]}
          onChange={handleDistrictChange}
          // showSelectAll={true}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          multiple
          options={areaData}
          filterSelectedOptions
          sx={{ m: 1, width: 200, ml: 1 }}
          size="small"
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Select Area" />
          )}
          onChange={handleAreaChange}
          value={filterAddBranch}
        />
      </Grid>
      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
        Branches to be Mapped
      </Typography>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="isAllSelected"
                onChange={(e) => onselectAllCheckBox(e)}
                checked={checked}
              />
            </th>
            <th align="right" scope="col">
              Branch ID
            </th>
            <th align="right" scope="col">
              Branch Name
            </th>
            <th align="right" scope="col">
              Region/Division
            </th>
            <th align="right" scope="col">
              Area
            </th>
            <th align="right" scope="col">
              State
            </th>
          </tr>
        </thead>

        <tbody className="table  ">
          {addMainBranches
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((val, idx) => {
              const isItemSelected = isSelected(val.branchID);
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      id="switch"
                      checked={isItemSelected}
                      onChange={(e) => {
                        onCheckBoxClick(e, val, val.branchID);
                      }}
                    />
                  </td>
                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.branchID}
                  </td>

                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.branchName}
                  </td>

                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.region}
                  </td>

                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.area}
                  </td>

                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.state}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={addMainBranches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignItems: "center", justifyContent: "center" }}
      />

      <Box className="d-flex align-Items-center justify-content-center">
        <Button
          onClick={() => {
            addAllBranchesInMainDealerOnSelect(props.mainDealerID);
          }}
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ShowBranchesOfMainDealer;
