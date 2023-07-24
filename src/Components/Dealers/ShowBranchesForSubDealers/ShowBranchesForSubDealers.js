import React, { useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Radio,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  addAllBranchesofMainDealerInSubDealer,
  addBranchesInSubDealer,
  getAllBranchesInSubDealer,
  removeBranchesInSubDealer,
} from "../../service/subDealers";
import {
  getAreaDetailsByStateandRegionInSubDealers,
  getDistrictDetailsByStateInSubDealers,
} from "../../service/districtapi/Districtapi";

const style = {
  bgcolor: "#581845",
};

function ShowBranchesForSubDealers(props) {
  const [active, setActive] = useState(false);
  const [removeRowData, setRemoveRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const tempArr = [];
    props.showSubBranch?.map((item) => {
      tempArr.push({ ...item });
    });
  }, [props.showSubBranch]);

  const removeRowDataofBranchesFromTable = async (params, value) => {
    let payload = [value];
    const { data } = await removeBranchesInSubDealer(params, payload);

    if (data?.data?.error === "False") {
      props.getShowBranchesInSubDealers(props.subDealerID);
      props.getShowBranchesInSubDealersToAdd(props.subDealerID);
    }
  };

  const addBranchesofMainDealer = async (mainDealerID, subDealerID) => {
    const { data } = await addAllBranchesofMainDealerInSubDealer(
      mainDealerID,
      subDealerID
    );
    if (data) {
      if (data) {
        let addData = data?.data;
        props.setShowBranches(addData);
        getAllBranchesInSubDealer(props.subDealerID);
        setActive(!active);
      }
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
        className="mw-100"
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
          <Box sx={{ m: 2 }}>
            <Button
              onClick={() =>
                addBranchesofMainDealer(props.mainDealerID, props.subDealerID)
              }
              sx={
                active && {
                  backgroundColor: active ? "red" : "green",
                  color: "white",
                }
              }
            >
              Same As MainDealer
            </Button>
            {/* <a
              href={`showavaliablesubbranches?subDealerID=${props.subDealerID}`}
            >
              Refresh
            </a> */}
          </Box>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Sl NO.
                </th>

                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Branch ID
                </th>
                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Branch Name
                </th>
                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Region
                </th>
                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  Area
                </th>
                <th
                  align="right"
                  scope="col"
                  style={{ fontWeight: "bold", fontSize: "12px" }}
                >
                  State
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="table table-success table-striped">
              {props.showSubBranch?.map((value, idx) => (
                <tr key={idx}>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {idx}
                  </td>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value.branchID}
                  </td>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value.branchName}
                  </td>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value.region}
                  </td>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value.area}
                  </td>
                  <td
                    align="left"
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {value.state}
                  </td>

                  <td align="left" colSpan={1} size="large">
                    <DeleteSweepIcon
                      onClick={() => {
                        removeRowDataofBranchesFromTable(
                          props.subDealerID,
                          value
                        );
                      }}
                      style={{ fontSize: "lg" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr
            style={{
              borderWidth: 3,
              borderStyle: "dashed",
              borderColor: "#CA2908",
            }}
          />
          <ChildModal
            showSubBranchToAdd={props.showSubBranchToAdd}
            subDealerID={props.subDealerID}
            removeRowData={removeRowData}
            getShowBranchesInSubDealers={props.getShowBranchesInSubDealers}
            getShowBranchesInSubDealersToAdd={
              props.getShowBranchesInSubDealersToAdd
            }
            state={props.state}
            region={props.region}
            filterAddSubBranch={props.filterAddSubBranch}
            setShowBranches={props.setShowBranchesToAdd}
          />
        </Modal.Body>
        <ModalFooter>
          <Button
            onClick={props.close}
            sx={{
              backgroundColor: "blue",
              color: "white",
              borderColor: "green",
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const ChildModal = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterAddSubBranch, setFilterAddSubBranch] = useState([]);
  const [selectedDistrict, setselectedDistrict] = useState([]);
  const [addSubBranches, setAddSubBranches] = useState([]);
  const [selectedId, setselectedId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [sendselectedBranches, setsendselectedBranches] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setAddSubBranches(props.showSubBranchToAdd);
  }, [props.showSubBranchToAdd]);

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
      addSubBranches.forEach((item) => {
        tempArr.push(item.branchID);
      });
      setselectedId(tempArr);
      setsendselectedBranches(addSubBranches);
    } else {
      setChecked(false);
      setselectedId([]);
      setsendselectedBranches([]);
    }
  }

  const isSelected = (id) => selectedId.indexOf(id) !== -1;

  const addBranchesInSubDealerOnSelect = async (mainDealerID) => {
    const payload = [];
    props.showSubBranchToAdd.forEach((item) => {
      if (selectedId.includes(item.branchID)) {
        payload.push(item);
      }
    });
    const { data } = await addBranchesInSubDealer(mainDealerID, payload);

    if (data?.data?.error === "FALSE") {
      props.getShowBranchesInSubDealers(props.subDealerID);
      props.getShowBranchesInSubDealersToAdd(props.subDealerID);
      setselectedId([]);
      setChecked(false);
    }
  };

  useEffect(() => {
    getAllDistrictDetailsOnSelect(props.state);
  }, []);

  const getAllDistrictDetailsOnSelect = async (state) => {
    const { data } = await getDistrictDetailsByStateInSubDealers(state);
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
      setFilterAddSubBranch(value);
    }
  };

  useEffect(() => {
    getAllAreaDetailsOnSelect(props.state);
  }, [selectedDistrict]);

  const getAllAreaDetailsOnSelect = async (state) => {
    const payload = selectedDistrict;

    const { data } = await getAreaDetailsByStateandRegionInSubDealers(
      state,
      payload
    );
    console.log(data, "data");
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
    if (selectedDistrict.length > 0 || filterAddSubBranch.length > 0) {
      if (selectedDistrict.length > 0) {
        const filteredDatas = props.showSubBranchToAdd.filter((item) => {
          return selectedDistrict.includes(item?.region.toString());
        });
        setAddSubBranches([...filteredDatas]);
        if (selectedDistrict.length > 0 && filterAddSubBranch.length > 0) {
          const getFinalData = filteredDatas.filter((item) => {
            return filterAddSubBranch.includes(item.area?.toString());
          });
          setAddSubBranches([...getFinalData]);
        }
      }
    } else {
      setAddSubBranches([...props.showSubBranchToAdd]);
    }
  }, [selectedDistrict, filterAddSubBranch]);

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
          renderInput={(params) => (
            <TextField {...params} label="Select Region/Division" />
          )}
          // value={selectedDistrict?.district ?? "10px"}
          onChange={handleDistrictChange}
        />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          multiple
          options={areaData}
          filterSelectedOptions
          sx={{ m: 1, width: 200, ml: 1 }}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Select Area" />
          )}
          onChange={handleAreaChange}
          value={filterAddSubBranch}
        />
      </Grid>
      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
        Branches to be Added
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

            <th
              align="right"
              scope="col"
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              Branch ID
            </th>
            <th
              align="right"
              scope="col"
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              Branch Name
            </th>
            <th
              align="right"
              scope="col"
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              Region
            </th>
            <th
              align="right"
              scope="col"
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              Area
            </th>
            <th
              align="right"
              scope="col"
              style={{ fontWeight: "bold", fontSize: "12px" }}
            >
              State
            </th>
          </tr>
        </thead>

        <tbody className="table  ">
          {addSubBranches
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

                  <td
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {val.branchID}
                  </td>
                  <td
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {val.branchName}
                  </td>
                  <td
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {val.region}
                  </td>
                  <td
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    {val.area}
                  </td>
                  <td
                    colSpan={1}
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
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
        count={addSubBranches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignItems: "center", justifyContent: "center" }}
      />

      <Box className="d-flex align-Items-center justify-content-center">
        <Button
          onClick={() => {
            addBranchesInSubDealerOnSelect(props.subDealerID);
          }}
          style={{
            backgroundColor: "green",
            borderColor: "green",
            color: "#ffffff",
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default ShowBranchesForSubDealers;
