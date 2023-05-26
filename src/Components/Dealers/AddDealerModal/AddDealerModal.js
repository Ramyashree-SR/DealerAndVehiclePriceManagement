import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  addMainDealersDetails,
  editMainDealersDetails,
  getAllMainDealersDetails,
  getAllVehicleOEM,
  getVehicleOEM,
} from "../../service/dealers";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getAllStateDetails,
  stateDropDownApi,
} from "../../service/stateapi/stateapi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Search } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useToasts } from "react-toast-notifications";
// import { ToastProvider, useToasts } from "react-toast-notifications";

export default function AddDealerModal(props) {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [dealerState, setDealerState] = useState([]);
  // console.log(dealerState,"dealerState");
  const [vehicleOEM, setVehicleOEM] = useState([]);

  let DealerSubDealer = ["MAIN ", "SUBDEALER"];
  let activationStatus = ["Active", "InActive"];
  let pennyCheckStatus = ["Success", "Failed"];
  const [dealerType, setDealerType] = useState(DealerSubDealer[0]);
  const [dealerTypeStatus, setDealerTypeStatus] = useState("");
  const [showModule, setshowModule] = useState(false);

  const [addDealer, setAddDealer] = useState({
    mainDealerName: "",
    mainDealerManufacturerName: "",
    mainDealerMailID: "",
    mainDealerContactNumber: "",
    mainDealerAlternateContactNumber: "",
    mainDealerContactPersonName: "",
    contactPersonMobile: "",
    mainDealerPaymentEligible: "",
    mainDealerActivationData: "",
    state: "",
    city: "",
    pinCode: "",
    addressDetails: "",
    mainDealerPanNumber: "",
    mainDealerGstNumber: "",
    mainDealerBankName: "",
    mainDealerBankBranchName: "",
    mainDealerBankAccNumber: "",
    mainDealerIfsc: "",
    mainDealerAccountHolderName: "",
    mainDealerExpireData: "",
    mainDealerPaniniCheck: "",
    mainDealerActivationStatus: "",
  });

  const [contactError, setContactError] = useState("");
  const [panNoError, setPanNoError] = useState("");
  const [gstNumberError, setgstNumberError] = useState("");
  const [accountNoError, setaccountNoError] = useState("");
  const [IfscError, setIfscError] = useState("");

  let ContactNumberValidation = () => {
    if (addDealer.mainDealerContactNumber) {
      let regex = /^[0-9]*\d$/;
      if (regex.test(addDealer.mainDealerContactNumber)) {
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

  let PanCardValidation = (event) => {
    if (addDealer.mainDealerPanNumber) {
      let regex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
      if (regex.test(addDealer.mainDealerPanNumber)) {
        setPanNoError("");
        return true;
      } else {
        setPanNoError("*Enter Valid Pan Number");
      }
    } else {
      setPanNoError("*Pan Number required");
    }
    return false;
  };

  let GSTNumberValidation = (event) => {
    if (addDealer.mainDealerGstNumber) {
      let regex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
      if (regex.test(addDealer.mainDealerGstNumber)) {
        setgstNumberError("");
        return true;
      } else {
        setgstNumberError("*Enter Valid GST Number");
      }
    } else {
      setgstNumberError("*Gst Number required");
    }
    return false;
  };

  let BankAccountNumberValidation = (event) => {
    if (addDealer.mainDealerBankAccNumber) {
      let regex = /^\d{9,18}$/;
      if (regex.test(addDealer.mainDealerBankAccNumber)) {
        setaccountNoError("");
        return true;
      } else {
        setaccountNoError("*Enter Valid Account Number");
      }
    } else {
      setaccountNoError("*Account Number required");
    }
    return false;
  };

  let BankAccountIFSCCodeValidation = () => {
    if (addDealer.mainDealerIfsc) {
      let regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (regex.test(addDealer.mainDealerIfsc)) {
        setIfscError("");
        return true;
      } else {
        setIfscError("*Enter Valid IFSC Code");
      }
    } else {
      setIfscError("*IFSC Code required");
      return false;
    }
  };
  const handleStateChange = (name, e, value) => {
    // console.log(value, "value");
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };

  const handleVehicleOEMChange = (name, event, value) => {
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };

  const addDealersDetails = async () => {
    let payload = {
      mainDealerName: addDealer?.mainDealerName,
      mainDealerMailID: addDealer?.mainDealerMailID,
      mainDealerManufacturerName: addDealer?.mainDealerManufacturerName,
      mainDealerContactNumber: addDealer?.mainDealerContactNumber,
      mainDealerAlternateContactNumber:
        addDealer?.mainDealerAlternateContactNumber,
      contactPersonMobile: addDealer?.contactPersonMobile,
      mainDealerContactPersonName: addDealer?.mainDealerContactPersonName,
      mainDealerPaymentEligible: addDealer?.mainDealerPaymentEligible,
      mainDealerActivationData: moment(
        addDealer?.mainDealerActivationData
      ).format("YYYY-MM-DD"),
      addressDetails: addDealer?.addressDetails,
      state: addDealer?.state,
      district: addDealer.district,
      city: addDealer.city,
      pinCode: addDealer.pinCode,
      mainDealerPanNumber: addDealer?.mainDealerPanNumber,
      mainDealerGstNumber: addDealer?.mainDealerGstNumber,
      mainDealerBankName: addDealer?.mainDealerBankName,
      mainDealerBankBranchName: addDealer?.mainDealerBankBranchName,
      mainDealerBankAccNumber: addDealer?.mainDealerBankAccNumber,
      mainDealerIfsc: addDealer?.mainDealerIfsc,
      mainDealerAccountHolderName: addDealer?.mainDealerAccountHolderName,
      mainDealerPaniniCheck: addDealer?.mainDealerPaniniCheck,
      mainDealerActivationStatus: addDealer?.mainDealerActivationStatus,
    };
    const { data, errRes } = await addMainDealersDetails(payload);
    // console.log(data?.data?.data, "dataaaaa");
    if (data) {
      // if (data) {
      // console.log(data.data, "dataaaaa");
      setAddDealer({
        mainDealerName: "",
        mainDealerManufacturerName: "",
        mainDealerMailID: "",
        mainDealerContactNumber: "",
        mainDealerAlternateContactNumber: "",
        mainDealerContactPersonName: "",
        contactPersonMobile: "",
        mainDealerPaymentEligible: "",
        mainDealerActivationData: "",
        state: "",
        district: "",
        city: "",
        pinCode: "",
        addressDetails: "",
        mainDealerPanNumber: "",
        mainDealerGstNumber: "",
        mainDealerBankName: "",
        mainDealerBankBranchName: "",
        mainDealerBankAccNumber: "",
        mainDealerIfsc: "",
        mainDealerAccountHolderName: "",
        mainDealerExpireData: "",
        mainDealerPaniniCheck: "",
        mainDealerActivationStatus: "",
      });
      props.getDealersDetails(data?.data?.data);
      addToast(data.message, { appearance: "success" });
      props.close();
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
      // console.log(errRes?.data?.message, "errRes");
    }
  };

  const editDealerDetails = async (mainDealerID) => {
    let payload = {
      mainDealerName: addDealer?.mainDealerName,
      dealerType: addDealer?.dealerType,
      mainDealerMailID: addDealer?.mainDealerMailID,
      mainDealerManufacturerName: addDealer?.mainDealerManufacturerName,
      mainDealerContactNumber: addDealer?.mainDealerContactNumber,
      mainDealerAlternateContactNumber:
        addDealer?.mainDealerAlternateContactNumber,
      contactPersonMobile: addDealer?.contactPersonMobile,
      mainDealerContactPersonName: addDealer?.mainDealerContactPersonName,
      mainDealerPaymentEligible: addDealer?.mainDealerPaymentEligible,
      mainDealerActivationData: moment(
        new Date(addDealer?.mainDealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: addDealer?.addressDetails,
      state: addDealer?.state,
      district: addDealer?.district,
      city: addDealer?.city,
      pinCode: addDealer.pinCode,
      mainDealerPanNumber: addDealer?.mainDealerPanNumber,
      mainDealerGstNumber: addDealer?.mainDealerGstNumber,
      mainDealerBankName: addDealer?.mainDealerBankName,
      mainDealerBankBranchName: addDealer?.mainDealerBankBranchName,
      mainDealerBankAccNumber: addDealer?.mainDealerBankAccNumber,
      mainDealerIfsc: addDealer?.mainDealerIfsc,
      mainDealerAccountHolderName: addDealer?.mainDealerAccountHolderName,
      mainDealerPaniniCheck: addDealer?.mainDealerPaniniCheck,
      mainDealerActivationStatus: addDealer?.mainDealerActivationStatus,
    };
    const { data } = await editMainDealersDetails(mainDealerID, payload);
    if (data) {
      props.getDealersDetails();
      props.close();
    }
  };

  const getEditDetails = async () => {
    const { data } = await getAllMainDealersDetails(
      props.EditDealerData.mainDealerID
    );
    if (data) {
      if (data.error === "False") {
        const sendData = data.data[0];
        setAddDealer({
          ...sendData,
        });
      }
    }
  };

  // console.log(addDealer, "te");

  const updateChange = (event) => {
    setAddDealer({
      ...addDealer,
      [event.target.name]: event.target.value,
    });
    // if (props.type === "add") {
    //   if (addDealer?.mainDealerPanNumber.includes(event.target.value.trim())) {
    //     setPanNoError("*PAN No Already Exist");
    //   } else {
    //     setPanNoError("");
    //   }

    //   if (addDealer?.mainDealerGstNumber.includes(event.target.value.trim())) {
    //     setgstNumberError("*Gst No Already Exist");
    //   } else {
    //     setgstNumberError("");
    //   }

    //   if (
    //     addDealer?.mainDealerBankAccNumber.includes(event.target.value.trim())
    //   ) {
    //     setaccountNoError("*Account No Already Exist");
    //   } else {
    //     setaccountNoError("");
    //   }
    // }
  };

  const handleActivationDateChange = (val) => {
    console.log(val, "val1");
    const date = moment(val).format("YYYY-MM-DD");
    console.log(date, "val1");
    setAddDealer({
      ...addDealer,
      mainDealerActivationData: date,
    });
  };

  // const handleExpiryDateChange = (val) => {
  //   const date = moment(val).format("YYYY-MM-DD");
  //   setAddDealer({
  //     ...addDealer,
  //     mainDealerExpireData: date,
  //   });
  // };
  const handleActivationChange = (name, event, value) => {
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };
  const handlePennyCheckStatusChange = (name, event, value) => {
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };

  // console.log(vehicleOEM,"fghj");
  useEffect(() => {
    getAllVehicleOemDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getVehicleOEM();
    // console.log(data, "OEM");
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

  useEffect(() => {
    // getStateDetails();
    getStateDetails();
  }, []);

  const getStateDetails = async () => {
    const { data } = await stateDropDownApi();
    console.log(data?.data?.data, "data");
    if (data) {
      let stateData = [];
      data?.data?.data?.map((val) => {
        stateData?.push(val);
      });
      setDealerState(stateData);
    } else {
      setDealerState([]);
    }
  };

  useEffect(() => {
    if (props.type === "edit") {
      // console.log(props.EditDealerData,"props.EditDealerData");
      getEditDetails(props.EditDealerData);
    }
  }, [props.EditDealerData]);

  // console.log(addDealer, "addDealer");

  let Submit = () => {
    ContactNumberValidation();
    PanCardValidation();
    GSTNumberValidation();
    BankAccountNumberValidation();
    if (
      ContactNumberValidation() &&
      PanCardValidation() &&
      GSTNumberValidation() &&
      BankAccountNumberValidation() &&
      BankAccountIFSCCodeValidation()
    ) {
      addDealersDetails();
      setshowModule(true);
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
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.type === "edit" ? "Edit Dealer" : " Add New Dealer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
          >
            <Grid sx={{ display: "flex" }}>
              <Autocomplete
                id="combo-box-demo"
                options={vehicleOEM}
                sx={{ width: 225, ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select VehicleOEM" />
                )}
                name="mainDealerManufacturerName"
                value={addDealer?.mainDealerManufacturerName}
                onChange={(e, val) =>
                  handleVehicleOEMChange("mainDealerManufacturerName", e, val)
                }
                disabled={props.type === "edit" ? true : false}
              />

              <Autocomplete
                id="combo-box-demo"
                options={dealerState}
                sx={{ width: 225, ml: 1, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select State" />
                )}
                name="state"
                value={addDealer?.state}
                onChange={(e, value) => {
                  handleStateChange("state", e, value);
                }}
                disabled={props.type === "edit" ? true : false}
              />

              <TextField
                id="outlined-basic"
                label="District"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="district"
                value={addDealer?.district}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Dealer Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerName"
                value={addDealer?.mainDealerName}
                onChange={(e) => updateChange(e)}
              />

              <Autocomplete
                id="combo-box-demo"
                options={DealerSubDealer}
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
                disabled={props.type === "edit" ? true : false}
              />
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Contact No."
                  variant="outlined"
                  sx={{ m: 1 }}
                  name="mainDealerContactNumber"
                  value={addDealer?.mainDealerContactNumber}
                  onChange={(e) => updateChange(e)}
                />
                {contactError && (
                  <Typography sx={{ color: "red" }}>{contactError}</Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Alternate No."
                  variant="outlined"
                  sx={{ m: 1 }}
                  name="mainDealerAlternateContactNumber"
                  value={addDealer?.mainDealerAlternateContactNumber}
                  onChange={(e) => updateChange(e)}
                />
                {/* {contactError && (
                  <Typography sx={{ color: "red" }}>{contactError}</Typography>
                )} */}
              </Grid>
              <TextField
                id="outlined-basic"
                label="Contact Person Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerContactPersonName"
                value={addDealer?.mainDealerContactPersonName}
                onChange={(e) => updateChange(e)}
              />

              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Contact Person Mobile No."
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="contactPersonMobile"
                  value={addDealer?.contactPersonMobile}
                  onChange={(e) => updateChange(e)}
                />
                {contactError && (
                  <Typography sx={{ color: "red" }}>{contactError}</Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Dealer Pan No"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerPanNumber"
                  value={addDealer?.mainDealerPanNumber}
                  onChange={(e) => updateChange(e)}
                />
                {panNoError && (
                  <Typography sx={{ color: "red" }}>{panNoError}</Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Dealer GST Number"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerGstNumber"
                  value={addDealer?.mainDealerGstNumber}
                  onChange={(e) => updateChange(e)}
                />
                {gstNumberError && (
                  <Typography sx={{ color: "red" }}>
                    {gstNumberError}
                  </Typography>
                )}
              </Grid>

              <TextField
                id="outlined-basic"
                label="Dealer Bank Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerBankName"
                value={addDealer?.mainDealerBankName}
                onChange={(e) => updateChange(e)}
              />
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Dealer Bank Branch Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerBankBranchName"
                value={addDealer?.mainDealerBankBranchName}
                onChange={(e) => updateChange(e)}
              />
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Dealer Account Number"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerBankAccNumber"
                  value={addDealer?.mainDealerBankAccNumber}
                  onChange={(e) => updateChange(e)}
                />
                {accountNoError && (
                  <Typography sx={{ color: "red" }}>
                    {accountNoError}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  id="outlined-basic"
                  label="IFSC Code"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerIfsc"
                  value={addDealer?.mainDealerIfsc}
                  onChange={(e) => updateChange(e)}
                />
                {IfscError && (
                  <Typography sx={{ color: "red" }}>{IfscError}</Typography>
                )}
              </Grid>
            </Grid>

            <TextField
              id="outlined-basic"
              label="Account Holder Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerAccountHolderName"
              value={addDealer?.mainDealerAccountHolderName}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="addressDetails"
              value={addDealer?.addressDetails}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="city"
              value={addDealer?.city}
              onChange={(e) => updateChange(e)}
            />

            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="pinCode"
                value={addDealer?.pinCode}
                onChange={(e) => updateChange(e)}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(addDealer?.mainDealerActivationData)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expiry Date"
                    inputFormat="YYYY-MM-DD"
                    defaultValue="00-00-2099"
                    disabled
                    value={new Date(addDealer?.mainDealerExpireData)}
                    onChange={(e) => {
                      handleExpiryDateChange(e);
                    }}
                    sx={{ width: 225, ml: 2 }}
                  />
                </DemoContainer>
              </LocalizationProvider> */}
              <Autocomplete
                id="combo-box-demo"
                options={activationStatus}
                sx={{ width: 225, ml: 5, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select ActivationType" />
                )}
                name="mainDealerActivationStatus"
                value={addDealer?.mainDealerActivationStatus}
                onChange={(event, newValue) => {
                  handleActivationChange(
                    "mainDealerActivationStatus",
                    event,
                    newValue
                  );
                }}
                // disabled={props.type === "edit" ? true : false}
              />
            </Grid>

            <Grid sx={{ display: "flex", m: 1 }}>
              <Autocomplete
                id="combo-box-demo"
                options={pennyCheckStatus}
                sx={{ width: 225, ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select PennyCheck Status" />
                )}
                name="mainDealerPaniniCheck"
                value={addDealer?.mainDealerPaniniCheck}
                onChange={(e, val) =>
                  handlePennyCheckStatusChange("mainDealerPaniniCheck", e, val)
                }
                disabled={props.type === "edit" ? true : false}
              />
              <TextField
                id="outlined-basic"
                label="Dealer EmailID"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerMailID"
                value={addDealer?.mainDealerMailID}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Grid sx={{ display: "flex" }}>
            <Grid sx={{ m: 1 }}>
              {props.type === "edit" ? (
                <Button
                  onClick={() =>
                    editDealerDetails(props.EditDealerData.mainDealerID)
                  }
                  sx={{ m: 1 }}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    Submit();
                  }}
                  sx={{ m: 1 }}
                >
                  Add
                </Button>
              )}
            </Grid>

            <Grid sx={{ m: 1 }}>
              <Button onClick={props.close}>Cancel</Button>
            </Grid>
          </Grid>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//PANCARD
// First 3 letters will be the random alphabets generated from A to Z.
// 4th letter represents the category of a tax payer. Each category has its own identification letter as below
// A — Association of persons (AOP)
// B — Body of individuals (BOI)
// C — Company
// F — Firm
// G — Government
// H — HUF (Hindu undivided family)
// L — Local authority
// J — Artificial juridical person
// P — Individual or Person
// T — Trust (AOP)
// 5th letter is the first letter of the individual’s surname
// The next 4 letters are a 4 digit random number under 9999
// The last(10th) letter is an alphabet which is used as a check-sum to verify the validity of that current code.

//GST NUMBER
// The first two digits of the GST Number will represent the State Code as per the Census (2011).
// The next 10 digits will be same as in the PAN number of the taxpayer.
// The first five will be alphabets
// The next four will be numbers
// The last will be the check code
// The 13th digit will be the number of registrations you take within a state, i.e., after 9, A to Z are considered as 10 to 35.
// The 14th digit will be Z by default.
// The last would be the check code.

//BANk Account Number
// RBI dictates certain rules like you've mentioned over Indian Bank Account Number structures (9 - 18).

// Most of the banks have unique account numbers.
// Account number length varies from 9 digits to 18 digits.
// Most of the banks (67 out of 78) have included branch code as part of the account number structure. Some banks have product code as part of the account number structure.
// 40 out of 78 banks do not have check digit as part of the account number structure.
// All banks have purely numeric account numbers, except one or two foreign banks.
// Only in the case of 20 banks, account numbers are formed without any pattern with a unique running serial number.
