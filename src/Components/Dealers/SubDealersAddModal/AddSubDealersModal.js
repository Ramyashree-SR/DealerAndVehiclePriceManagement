import {
  Autocomplete,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  addSubDealersDetails,
  editSubDealersDetails,
  getAllSubDealersDetails,
} from "../../service/subDealers";
import moment from "moment/moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { getAllDistrictDetailsForAddingMainDealer } from "../../service/districtapi/Districtapi";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

export default function AddSubDealerModal(props) {
  let activationStatus = ["Active", "InActive"];
  let SubDealer = ["SUB"];
  const [dealerType, setDealerType] = useState(SubDealer[0]);
  const [dealerTypeStatus, setDealerTypeStatus] = useState("");
  const [addSubDealer, setAddSubDealer] = useState({
    mainDealerID: "",
    subDealerName: "",
    subDealerManufacturerName: "",
    subDealerMailID: "",
    subDealerContactNumber: "",
    subDealerAlternateContactNumber: "",
    subDealerContactPersonName: "",
    contactPersonMobile: "",
    subDealerPanNumber: "",
    subDealerGstNumber: "",
    subDealerBankName: "",
    subDealerBankBranchName: "",
    subDealerBankAccNumber: "",
    subDealerIfsc: "",
    subDealerAccountHolderName: "",
    subDealerActivationData: "",
    state: "",
    addressDetails: "",
    district: "",
    city: "",
    pinCode: "",
    subDealerActivationStatus: "",
  });
  const [districtData, setdistrictData] = useState([]);
  const handleDistrictChange = (name, e, val) => {
    // setAddDealer(val);
    setAddSubDealer(() => ({
      ...addSubDealer,
      [name]: val,
    }));
  };

  useEffect(() => {
    getDistrictDetails();
  }, []);

  const getDistrictDetails = async () => {
    const { data } = await getAllDistrictDetailsForAddingMainDealer();
    if (data) {
      if (data) {
        let districtData = [];
        data?.data?.data?.map((val) => {
          districtData?.push(val);
        });
        setdistrictData(districtData);
      } else {
        setdistrictData([]);
      }
    }
  };

  const [contactError, setContactError] = useState("");

  let ContactNumberValidation = () => {
    if (addSubDealer.subDealerContactNumber) {
      let regex = /^(\+|\d)[0-9]{9}$/;
      if (regex.test(addSubDealer.subDealerContactNumber)) {
        setContactError("");
        return true;
      } else {
        setContactError("*Enter Valid Number");
      }
    } else {
      setContactError("*Mobile number required");
      return false;
    }
  };

  const handleActivationDateChange = (val) => {
    console.log(val, "val1");
    const date = moment(val).format("YYYY-MM-DD");
    console.log(date, "val1");
    setAddSubDealer({
      ...addSubDealer,
      subDealerActivationData: date,
    });
  };
  // console.log(props.mainDealerData, "props.mainDealerData");
  const addAllSubDealersDetails = async (params) => {
    let payload = {
      mainDealerID: props.paramsId,
      subDealerName: addSubDealer?.subDealerName,
      subDealerMailID: addSubDealer?.subDealerMailID,
      subDealerManufacturerName:
        props.mainDealerData.mainDealerManufacturerName,
      subDealerContactNumber: addSubDealer?.subDealerContactNumber,
      subDealerAlternateContactNumber:
        addSubDealer?.subDealerAlternateContactNumber,
      contactPersonMobile: addSubDealer?.contactPersonMobile,
      subDealerContactPersonName: addSubDealer?.subDealerContactPersonName,
      subDealerPanNumber: props.mainDealerData.mainDealerPanNumber,
      subDealerGstNumber: props.mainDealerData.mainDealerGstNumber,
      subDealerBankName: props.mainDealerData.mainDealerBankName,
      subDealerBankBranchName: props.mainDealerData.mainDealerBankBranchName,
      subDealerBankAccNumber: props.mainDealerData.mainDealerBankAccNumber,
      subDealerIfsc: props.mainDealerData.mainDealerIfsc,
      subDealerAccountHolderName:
        props.mainDealerData.mainDealerAccountHolderName,
      subDealerActivationData: moment(
        new Date(addSubDealer?.subDealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: addSubDealer?.addressDetails,
      state: props.mainDealerData.state,
      district: addSubDealer?.district,
      city: addSubDealer?.city,
      pinCode: addSubDealer?.pinCode,
      subDealerActivationStatus: addSubDealer?.subDealerActivationStatus,
    };
    const { data } = await addSubDealersDetails(params, payload);
    if (data) {
      if (data) {
        setAddSubDealer({
          mainDealerID: "",
          subDealerName: "",
          subDealerManufacturerName: "",
          subDealerMailID: "",
          subDealerContactNumber: "",
          subDealerAlternateContactNumber: "",
          subDealerContactPersonName: "",
          contactPersonMobile: "",
          subDealerPanNumber: "",
          subDealerGstNumber: "",
          subDealerBankName: "",
          subDealerBankBranchName: "",
          subDealerBankAccNumber: "",
          subDealerIfsc: "",
          subDealerAccountHolderName: "",
          subDealerActivationData: "",
          state: "",
          addressDetails: "",
          district: "",
          city: "",
          pinCode: "",
          subDealerActivationStatus: "",
        });
      }
      props.getSubDealerDetails(props.paramsId);
      props.close();
    }
  };

  const editAllSubDealersDetails = async (subDealerID) => {
    let payload = {
      mainDealerID: props.paramsId,
      subDealerName: addSubDealer?.subDealerName,
      subDealerMailID: addSubDealer?.subDealerMailID,
      subDealerManufacturerName:
        props.mainDealerData.mainDealerManufacturerName,
      subDealerContactNumber: addSubDealer?.subDealerContactNumber,
      subDealerAlternateContactNumber:
        addSubDealer?.subDealerAlternateContactNumber,
      contactPersonMobile: addSubDealer?.contactPersonMobile,
      subDealerContactPersonName: addSubDealer?.subDealerContactPersonName,
      subDealerPanNumber: props.mainDealerData.mainDealerPanNumber,
      subDealerGstNumber: props.mainDealerData.mainDealerGstNumber,
      subDealerBankName: props.mainDealerData.mainDealerBankName,
      subDealerBankBranchName: props.mainDealerData.mainDealerBankBranchName,
      subDealerBankAccNumber: props.mainDealerData.mainDealerBankAccNumber,
      subDealerIfsc: props.mainDealerData.mainDealerIfsc,
      subDealerAccountHolderName:
        props.mainDealerData.mainDealerAccountHolderName,
      subDealerActivationData: moment(
        new Date(addSubDealer?.subDealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: addSubDealer?.addressDetails,
      state: props.mainDealerData.state,
      district: addSubDealer?.district,
      city: addSubDealer?.city,
      pinCode: addSubDealer?.pinCode,
      subDealerActivationStatus: addSubDealer?.subDealerActivationStatus,
    };
    const { data } = await editSubDealersDetails(subDealerID, payload);
    if (data) {
      props.getSubDealerDetails(props.paramsId);
      props.close();
    }
  };

  // console.log(props.EditSubDealerData,"props.EditSubDealerData");
  // const getEditDetails = async () => {
  //   const { data } = await getAllSubDealersDetails(
  //     props.EditSubDealerData.subDealerID
  //   );
  //   if (data) {
  //     if (data.data?.error === "False") {
  //       const sendData = data?.data?.data[0];
  //       setAddSubDealer({
  //         ...sendData,
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    if (props.type === "edit") {
      // getEditDetails(props.EditSubDealerData);
      setAddSubDealer({
        mainDealerID: props.EditSubDealerData.mainDealerID,
        subDealerName: props.EditSubDealerData.subDealerName,
        subDealerManufacturerName:
          props.EditSubDealerData.subDealerManufacturerName,
        subDealerMailID: props.EditSubDealerData.subDealerMailID,
        subDealerContactNumber: props.EditSubDealerData.subDealerContactNumber,
        subDealerAlternateContactNumber:
          props.EditSubDealerData.subDealerAlternateContactNumber,
        subDealerContactPersonName:
          props.EditSubDealerData.subDealerContactPersonName,
        contactPersonMobile: props.EditSubDealerData.contactPersonMobile,
        subDealerPanNumber: props.EditSubDealerData.subDealerPanNumber,
        subDealerGstNumber: props.EditSubDealerData.subDealerGstNumber,
        subDealerBankName: props.EditSubDealerData.subDealerBankName,
        subDealerBankBranchName:
          props.EditSubDealerData.subDealerBankBranchName,
        subDealerBankAccNumber: props.EditSubDealerData.subDealerBankAccNumber,
        subDealerIfsc: props.EditSubDealerData.subDealerIfsc,
        subDealerAccountHolderName:
          props.EditSubDealerData.subDealerAccountHolderName,
        subDealerActivationData:
          props.EditSubDealerData.subDealerActivationData,
        state: props.EditSubDealerData.state,
        addressDetails: props.EditSubDealerData.addressDetails,
        district: props.EditSubDealerData.district,
        city: props.EditSubDealerData.city,
        pinCode: props.EditSubDealerData.pinCode,
        subDealerActivationStatus:
          props.EditSubDealerData.subDealerActivationStatus,
      });
    }
  }, [props.EditSubDealerData]);

  const updateChange = (event) => {
    setAddSubDealer({
      ...addSubDealer,
      [event.target.name]: event.target.value,
    });
  };

  const handleActivationChange = (name, event, value) => {
    setAddSubDealer(() => ({
      ...addSubDealer,
      [name]: value,
    }));
  };

  const AddEditSubmit = () => {
    ContactNumberValidation();
    if (ContactNumberValidation()) {
      addAllSubDealersDetails(props.paramsId);
    }
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
          <Modal.Title id="contained-modal-title-vcenter">
            {props.type === "edit" ? "Edit Sub Dealer" : " Add New Sub Dealer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
          >
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Vehicle OEM"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerManufacturerName"
                value={props.mainDealerData.mainDealerManufacturerName}
                onChange={(e) => updateChange(e)}
                disabled
                required
              />

              <TextField
                id="outlined-basic"
                label="State"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="state"
                value={props.mainDealerData.state}
                onChange={(e) => updateChange(e)}
                disabled
                required
              />
              {/* <TextField
              id="outlined-basic"
              label="District"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="district"
              value={addSubDealer?.district ?? ""}
              onChange={(e) => updateChange(e)}
            /> */}

              {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                multiple
                options={districtData}
                filterSelectedOptions
                getOptionLabel={(option) => option}
                // defaultValue={[districtData[0]]}
                sx={{ m: 1, width: 225, ml: 1 }}
                size="large"
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
                  <TextField {...params} label="Select District " />
                )}
                name="district"
                // value={props.EditSubDealerData.district}
                value={
                  props.type === "edit"
                    ? props.EditSubDealerData.district
                    : undefined
                }
                onChange={(e, value) =>
                  handleDistrictChange("district", e, value)
                }
                required
              /> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                multiple
                options={districtData}
                filterSelectedOptions
                // getOptionLabel={(option) => option}
                // defaultValue={[districtData[0]]}
                sx={{ m: 1, width: 225, ml: 1 }}
                size="large"
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
                  <TextField {...params} label="Select District " />
                )}
                name="district"
                // value={
                //   props.type === "edit"
                //     ? props.EditDealerData?.district
                //     : undefined
                // }
                value={
                  addSubDealer?.district || props.EditSubDealerData?.district
                }
                // onChange={
                //   props.type === "edit"
                //     ? () => handleDistrictChange()
                //     : (e, value) => {
                //         handleDistrictChange("district", e, value);
                //       }
                // }
                onChange={(e, value) => {
                  handleDistrictChange("district", e, value);
                }}
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="MainDealer ID"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="props.paramsId"
                value={props.paramsId}
                onChange={(e) => updateChange(e)}
                disabled
                required
              />

              <TextField
                id="outlined-basic"
                label="Sub Dealer Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="subDealerName"
                value={addSubDealer?.subDealerName}
                onChange={(e) => updateChange(e)}
                required
              />

              <Autocomplete
                id="combo-box-demo"
                options={SubDealer}
                sx={{ width: 225, ml: 1, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select DealerType" />
                )}
                name="state"
                value={dealerType}
                onChange={(event, newValue) => {
                  setDealerTypeStatus(newValue);
                }}
                disabled
                required
              />
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Email ID"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="subDealerMailID"
                value={addSubDealer?.subDealerMailID}
                onChange={(e) => updateChange(e)}
                required
              />
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Contact No."
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="subDealerContactNumber"
                  value={addSubDealer?.subDealerContactNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {contactError && (
                  <Typography sx={{ color: "red" }}>{contactError}</Typography>
                )}
              </Grid>
              <TextField
                id="outlined-basic"
                label="Alternate No."
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="subDealerAlternateContactNumber"
                value={addSubDealer?.subDealerAlternateContactNumber}
                onChange={(e) => updateChange(e)}
                required
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Contact Person Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="subDealerContactPersonName"
                value={addSubDealer?.subDealerContactPersonName}
                onChange={(e) => updateChange(e)}
                required
              />

              <TextField
                id="outlined-basic"
                label="ContactPersonMobile"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="contactPersonMobile"
                value={addSubDealer?.contactPersonMobile}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Pan No"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerPanNumber"
                value={props.mainDealerData.mainDealerPanNumber}
                onChange={(e) => updateChange(e)}
                required
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                disabled
                id="outlined-basic"
                label="GST Number"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="props.mainDealerGstNumber"
                value={props.mainDealerData.mainDealerGstNumber}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                disabled
                id="outlined-basic"
                label="Bank Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerBankName"
                value={props.mainDealerData.mainDealerBankName}
                onChange={(e) => updateChange(e)}
                required
              />

              <TextField
                disabled
                id="outlined-basic"
                label="Branch Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerBankBranchName"
                value={props.mainDealerData.mainDealerBankBranchName}
                onChange={(e) => updateChange(e)}
                required
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                disabled
                id="outlined-basic"
                label="Account Number"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerBankAccNumber"
                value={props.mainDealerData.mainDealerBankAccNumber}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                disabled
                id="outlined-basic"
                label="IFSC Code"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerIfsc"
                value={props.mainDealerData.mainDealerIfsc}
                onChange={(e) => updateChange(e)}
                required
              />

              <TextField
                disabled
                id="outlined-basic"
                label="Account Holder Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1, fontWeight: 800 }}
                name="mainDealerAccountHolderName"
                value={props.mainDealerData.mainDealerAccountHolderName}
                onChange={(e) => updateChange(e)}
                required
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="addressDetails"
                value={addSubDealer?.addressDetails}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="city"
                value={addSubDealer?.city}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="pinCode"
                value={addSubDealer?.pinCode}
                onChange={(e) => updateChange(e)}
                required
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(addSubDealer?.subDealerActivationData)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Autocomplete
                id="combo-box-demo"
                options={activationStatus}
                sx={{ width: 224, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="SubDealer Status" />
                )}
                name="subDealerActivationStatus"
                value={addSubDealer?.subDealerActivationStatus}
                // inputValue={dealerTypeStatus}
                onChange={(e, value) => {
                  handleActivationChange("subDealerActivationStatus", e, value);
                }}
                disabled={props.type === "edit" ? true : false}
                required
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          {props.type === "edit" ? (
            <Button
              onClick={() => {
                editAllSubDealersDetails(props.EditSubDealerData.subDealerID);
              }}
              sx={{ m: 1 }}
            >
              Edit
            </Button>
          ) : (
            <Button
              onClick={() => {
                AddEditSubmit();
              }}
              sx={{ m: 1 }}
            >
              Add
            </Button>
          )}
          <Grid sx={{ m: 1 }}>
            <Button onClick={props.close}>Cancel</Button>
          </Grid>
        </Modal.Footer>
      </Modal>
    </>
  );
}
