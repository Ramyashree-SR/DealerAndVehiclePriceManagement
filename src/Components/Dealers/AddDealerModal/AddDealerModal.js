import {
  Checkbox,
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
import { Button, Form, Modal } from "react-bootstrap";
import {
  addMainDealersDetails,
  editMainDealersDetails,
  getAllMainDealersDetails,
  getAllVehicleOEM,
  getVehicleOEM,
} from "../../service/dealers";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import {
  getAllStateDetails,
  stateDropDownApi,
} from "../../service/stateapi/stateapi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Search } from "@mui/icons-material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useToasts } from "react-toast-notifications";
import AddVehiclesModal from "./../../Vehicles/AddVehicles/AddVehiclesModal";
import { getAllDistrictDetailsForAddingMainDealer } from "../../service/districtapi/Districtapi";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

let errObj = {
  mainDealerContactNumbermainDealerName: "",
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
};
export default function AddDealerModal(props) {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [dealerState, setDealerState] = useState([]);
  const [districtData, setdistrictData] = useState([]);
  const [vehicleOEM, setVehicleOEM] = useState([]);

  let DealerSubDealer = ["MAIN"];
  let activationStatus = ["Active", "InActive"];
  let pennyCheckStatus = ["Success", "Failed"];
  const [dealerType, setDealerType] = useState(DealerSubDealer[0]);
  const [dealerTypeStatus, setDealerTypeStatus] = useState("");
  const [showModule, setshowModule] = useState(false);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });

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

  const nameRegex = /^[A-Za-z]+$/;
  const mobileRegex = /^(\+|\d)[0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(\.\w{2,3})$/;
  const notAllowSpecialChar = /[^a-zA-Z0-9]/;
  const nameWithSpaces = /^[a-zA-Z ]*$/;
  const nameWithSpacesAndNumbers = /^[a-zA-Z0-9 ]*$/;

  const [error, setError] = useState(errObj);
  useEffect(() => {
    let errObj = {
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
      district: "",
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
    };
    setError(errObj);
  }, []);

  const handleAddDealerError = () => {
    let errorInForm = false;
    let errObj = {
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
      district: "",
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
    };
    if (addDealer.mainDealerManufacturerName === "") {
      errorInForm = true;
      errObj.mainDealerManufacturerName = "*This field is required";
    }
    if (addDealer.state === "") {
      errorInForm = true;
      errObj.state = "*This field is required";
    }
    if (addDealer?.district === "") {
      errorInForm = true;
      errObj.district = "*This field is required";
    }
    if (addDealer.mainDealerName === "") {
      errorInForm = true;
      errObj.mainDealerName = "*This field is required";
    }
    if (addDealer.mainDealerContactPersonName === "") {
      errorInForm = true;
      errObj.mainDealerContactPersonName = "*This field is required";
    }
    if (addDealer.mainDealerAlternateContactNumber === "") {
      errorInForm = true;
      errObj.mainDealerAlternateContactNumber = "*This field is required";
    }
    if (addDealer.mainDealerContactNumber === "") {
      errorInForm = true;
      errObj.mainDealerContactNumber = "*This field is required";
    }
    if (addDealer.mainDealerContactPersonName === "") {
      errorInForm = true;
      errObj.mainDealerContactPersonName = "*This field is required";
    }
    if (addDealer.mainDealerMailID === "") {
      errorInForm = true;
      errObj.mainDealerMailID = "*This field is required";
    }
    if (addDealer.mainDealerPanNumber === "") {
      errorInForm = true;
      errObj.mainDealerPanNumber = "*This field is required";
    }
    if (addDealer.mainDealerAccountHolderName === "") {
      errorInForm = true;
      errObj.mainDealerAccountHolderName = "*This field is required";
    }
    if (addDealer.mainDealerActivationData === "") {
      errorInForm = true;
      errObj.mainDealerActivationData = "*This field is required";
    }
    if (addDealer.mainDealerExpireData === "") {
      errorInForm = true;
      errObj.mainDealerExpireData = "*This field is required";
    }
    if (addDealer.mainDealerBankName === "") {
      errorInForm = true;
      errObj.mainDealerBankName = "*This field is required";
    }
    if (addDealer.mainDealerBankBranchName === "") {
      errorInForm = true;
      errObj.mainDealerBankBranchName = "*This field is required";
    }
    if (addDealer.mainDealerGstNumber === "") {
      errorInForm = true;
      errObj.mainDealerGstNumber = "*This field is required";
    }
    if (addDealer.mainDealerIfsc === "") {
      errorInForm = true;
      errObj.mainDealerIfsc = "*This field is required";
    }
    if (addDealer.contactPersonMobile === "") {
      errorInForm = true;
      errObj.contactPersonMobile = "*This field is required";
    }
    if (addDealer.mainDealerBankAccNumber === "") {
      errorInForm = true;
      errObj.mainDealerBankAccNumber = "*This field is required";
    }
    if (addDealer.mainDealerActivationStatus === "") {
      errorInForm = true;
      errObj.mainDealerActivationStatus = "*This field is required";
    }

    if (addDealer.city === "") {
      errorInForm = true;
      errObj.city = "*This field is required";
    }
    if (addDealer.pinCode === "") {
      errorInForm = true;
      errObj.pinCode = "*This field is required";
    }

    if (
      !nameWithSpaces.test(addDealer?.mainDealerName) &&
      addDealer.mainDealerName !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerName = "*Invalid Dealer name";
    }
    if (
      !nameWithSpaces.test(addDealer?.mainDealerContactPersonName) &&
      addDealer.mainDealerContactPersonName !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerContactPersonName = "Invalid Name";
    }
    if (
      !nameWithSpaces.test(addDealer.mainDealerBankName) &&
      addDealer.mainDealerBankName !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerBankName = "Invalid Name";
    }
    if (
      !nameWithSpaces.test(addDealer.mainDealerBankBranchName) &&
      addDealer.mainDealerBankBranchName !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerBankBranchName = "Invalid Name";
    }
    if (
      !nameWithSpaces.test(addDealer.mainDealerAccountHolderName) &&
      addDealer.mainDealerAccountHolderName !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerAccountHolderName = "Invalid Name";
    }
    if (
      !emailRegex.test(addDealer.mainDealerMailID) &&
      addDealer.mainDealerMailID !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerMailID = "Invalid EmailID";
    }
    if (
      !mobileRegex.test(addDealer.mainDealerContactNumber) &&
      addDealer.mainDealerContactNumber !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerContactNumber = "Invalid Mobile Number";
    }
    if (
      !nameWithSpacesAndNumbers.test(
        addDealer.mainDealerAlternateContactNumber
      ) &&
      addDealer.mainDealerAlternateContactNumber !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerAlternateContactNumber = "Invalid Alternate Number";
    }
    if (
      !mobileRegex.test(addDealer.contactPersonMobile) &&
      addDealer.contactPersonMobile !== ""
    ) {
      errorInForm = true;
      errObj.contactPersonMobile = "Invalid contact Number";
    }
    if (
      notAllowSpecialChar.test(addDealer.mainDealerIfsc) &&
      addDealer.mainDealerIfsc !== ""
    ) {
      errorInForm = true;
      errObj.mainDealerIfsc = "Invalid Ifsc Number";
    }
    setError({ ...errObj });
    return errorInForm;
  };

  let ContactNumberValidation = () => {
    if (addDealer.mainDealerContactNumber) {
      let regex = /^(\+|\d)[0-9]{7,16}$/;
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
      props.close();
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
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };

  const handleDistrictChange = (name, e, val) => {
    // setAddDealer(val);
    setAddDealer(() => ({
      ...addDealer,
      [name]: val,
    }));

    // if (e) {
    //   setAddDealer(val);
    // }
  };

  const handleVehicleOEMChange = (name, event, value) => {
    setAddDealer(() => ({
      ...addDealer,
      [name]: value,
    }));
  };

  const addDealersDetails = async () => {
    if (props.type === "add") {
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
      const { data, errRes } = await addMainDealersDetails(payload);
      if (data) {
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
        addToast("Dealer Data Added Successfully", { appearance: "success" });
        props.close();
        setTimeout(() => {
          props.getDealersDetails();
        }, 9000);
      } else if (errRes) {
        addToast(errRes, { appearance: "error" });
        props.close();
      }
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
      mainDealerExpireData: moment(
        new Date(addDealer?.mainDealerExpireData)
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
    const { data, errRes } = await editMainDealersDetails(
      mainDealerID,
      payload
    );
    if (data) {
      props.getDealersDetails();
      addToast("Dealer Data Edited Successfully", { appearance: "success" });
      props.close();
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
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

  const updateChange = (event) => {
    setAddDealer({
      ...addDealer,
      [event.target.name]: event.target.value,
    });
  };

  const handleActivationDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setAddDealer({
      ...addDealer,
      mainDealerActivationData: date,
      // mainDealerExpireData: null,
    });
  };

  const handleExpiryDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setAddDealer({
      ...addDealer,
      mainDealerExpireData: date,
    });
  };
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

  useEffect(() => {
    getAllVehicleOemDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getVehicleOEM();

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
    getStateDetails();
  }, []);

  const getStateDetails = async () => {
    const { data } = await stateDropDownApi();
    // console.log(data?.data?.data, "data");
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
    getDistrictDetails();
  }, []);

  const getDistrictDetails = async () => {
    const { data } = await getAllDistrictDetailsForAddingMainDealer();
    // console.log(data?.data?.data, "data");
    if (data) {
      let districtData = [];
      data?.data?.data?.map((val) => {
        districtData?.push(val);
      });
      setdistrictData(districtData);
    } else {
      setdistrictData([]);
    }
  };

  useEffect(() => {
    if (props.type === "edit") {
      // getEditDetails(props.EditDealerData);
      setAddDealer({
        mainDealerName: props.EditDealerData?.mainDealerName,
        dealerType: props.EditDealerData?.dealerType,
        mainDealerMailID: props.EditDealerData?.mainDealerMailID,
        mainDealerManufacturerName:
          props.EditDealerData?.mainDealerManufacturerName,
        mainDealerContactNumber: props.EditDealerData?.mainDealerContactNumber,
        mainDealerAlternateContactNumber:
          props.EditDealerData?.mainDealerAlternateContactNumber,
        contactPersonMobile: props.EditDealerData?.contactPersonMobile,
        mainDealerContactPersonName:
          props.EditDealerData?.mainDealerContactPersonName,
        mainDealerPaymentEligible:
          props.EditDealerData?.mainDealerPaymentEligible,
        mainDealerActivationData: moment(
          new Date(props.EditDealerData?.mainDealerActivationData)
        ).format("YYYY-MM-DD"),
        mainDealerExpireData: moment(
          new Date(props.EditDealerData?.mainDealerExpireData)
        ).format("YYYY-MM-DD"),
        addressDetails: props.EditDealerData?.addressDetails,
        state: props.EditDealerData?.state,
        district: props.EditDealerData?.district,
        city: props.EditDealerData?.city,
        pinCode: props.EditDealerData.pinCode,
        mainDealerPanNumber: props.EditDealerData?.mainDealerPanNumber,
        mainDealerGstNumber: props.EditDealerData?.mainDealerGstNumber,
        mainDealerBankName: props.EditDealerData?.mainDealerBankName,
        mainDealerBankBranchName:
          props.EditDealerData?.mainDealerBankBranchName,
        mainDealerBankAccNumber: props.EditDealerData?.mainDealerBankAccNumber,
        mainDealerIfsc: props.EditDealerData?.mainDealerIfsc,
        mainDealerAccountHolderName:
          props.EditDealerData?.mainDealerAccountHolderName,
        mainDealerPaniniCheck: props.EditDealerData?.mainDealerPaniniCheck,
        mainDealerActivationStatus:
          props.EditDealerData?.mainDealerActivationStatus,
      });
    }
  }, [props.EditDealerData]);

  let Submit = () => {
    let err = handleAddDealerError();
    ContactNumberValidation();
    PanCardValidation();
    GSTNumberValidation();
    BankAccountNumberValidation();
    if (
      err &&
      PanCardValidation() &&
      GSTNumberValidation() &&
      BankAccountNumberValidation() &&
      BankAccountIFSCCodeValidation()
    ) {
      addDealersDetails();
      // setshowModule(true);
    }
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // const handleSubmit = (e) => {
  //   props.type === "edit" ? editDealerDetails() : addDealersDetails();
  //   e.preventDefault();
  // };
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
            {props.type === "edit" ? "Edit Dealer" : " Add New Dealer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Form > */}
          <Grid
            sx={{
              m: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Grid sx={{ display: "flex" }}>
              <Grid>
                <Autocomplete
                  id="combo-box-demo"
                  options={vehicleOEM}
                  sx={{ width: 225, ml: 1, m: 1 }}
                  // size="small"
                  // getOptionLabel={(option) => option.oemName}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Vehicle OEM" />
                  )}
                  name="mainDealerManufacturerName"
                  value={addDealer?.mainDealerManufacturerName}
                  onChange={(e, val) =>
                    handleVehicleOEMChange("mainDealerManufacturerName", e, val)
                  }
                  disabled={props.type === "edit" ? true : false}
                />
                {error.mainDealerManufacturerName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerManufacturerName}
                  </Typography>
                )}
              </Grid>
              <Grid>
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
                {error.state && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.state}
                  </Typography>
                )}
              </Grid>

              {/* <TextField
                id="outlined-basic"
                label="District"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="district"
                value={addDealer?.district}
                onChange={(e) => updateChange(e)}
                required
              /> */}

              <Grid>
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
                  value={addDealer?.district|| props.EditDealerData?.district}
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
                {error.district && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.district}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer Name"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerName"
                  value={addDealer?.mainDealerName}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerName}
                  </Typography>
                )}
              </Grid>

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
                disabled
              />
              <Grid>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Contact No."
                  variant="outlined"
                  sx={{ m: 1 }}
                  name="mainDealerContactNumber"
                  value={addDealer?.mainDealerContactNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerContactNumber && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerContactNumber}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Contact Person Name"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerContactPersonName"
                  value={addDealer?.mainDealerContactPersonName}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerContactPersonName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerContactPersonName}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Contact Person Mobile No."
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="contactPersonMobile"
                  value={addDealer?.contactPersonMobile}
                  onChange={(e) => updateChange(e)}
                />
                {error.contactPersonMobile && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.contactPersonMobile}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Alternate No."
                  variant="outlined"
                  sx={{ m: 1 }}
                  name="mainDealerAlternateContactNumber"
                  value={addDealer?.mainDealerAlternateContactNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerAlternateContactNumber && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerAlternateContactNumber}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              {/* <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Alternate Person Name"
                  variant="outlined"
                  sx={{ m: 1 }}
                  name="mainDealerAlternateContactNumber"
                  value={addDealer?.mainDealerAlternateContactNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />

              </Grid> */}

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer Email-ID"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerMailID"
                  value={addDealer?.mainDealerMailID}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerMailID && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerMailID}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer PAN No."
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerPanNumber"
                  value={addDealer?.mainDealerPanNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {panNoError && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {panNoError}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer GST No."
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerGstNumber"
                  value={addDealer?.mainDealerGstNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {gstNumberError && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {gstNumberError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer Bank Name"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerBankName"
                  value={addDealer?.mainDealerBankName}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerBankName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerBankName}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Dealer Bank Branch Name"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerBankBranchName"
                  value={addDealer?.mainDealerBankBranchName}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerBankBranchName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerBankBranchName}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Dealer Account Number"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerBankAccNumber"
                  value={addDealer?.mainDealerBankAccNumber}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {accountNoError && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {accountNoError}
                  </Typography>
                )}
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="IFSC Code"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerIfsc"
                  value={addDealer?.mainDealerIfsc}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerIfsc && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerIfsc}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Account Holder Name"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="mainDealerAccountHolderName"
                  value={addDealer?.mainDealerAccountHolderName}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.mainDealerAccountHolderName && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerAccountHolderName}
                  </Typography>
                )}
              </Grid>

              <Grid>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Address-Town/City/Village"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="city"
                  value={addDealer?.city}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.city && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.city}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <Grid>
                <TextField
                  id="outlined-basic"
                  label="Area"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="addressDetails"
                  value={addDealer?.addressDetails}
                  onChange={(e) => updateChange(e)}
                />
                {error.addressDetails && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.addressDetails}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Pincode"
                  variant="outlined"
                  // size="small"
                  sx={{ m: 1 }}
                  name="pinCode"
                  value={addDealer?.pinCode}
                  onChange={(e) => updateChange(e)}
                  required
                />
                {error.pinCode && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.pinCode}
                  </Typography>
                )}
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    disablePast={false}
                    value={new Date(addDealer?.mainDealerActivationData)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expiry Date"
                    inputFormat="YYYY-MM-DD"
                    defaultValue="00-00-2099"
                    disablePast={false}
                    disabled={props.type === "edit" ? false : true}
                    value={new Date(addDealer?.mainDealerExpireData)}
                    onChange={(e) => {
                      handleExpiryDateChange(e);
                    }}
                    sx={{
                      width: 225,
                      ml: 2,
                      // display: props.type === "edit" ? "block" : "none",
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Grid>
                <Autocomplete
                  id="combo-box-demo"
                  options={activationStatus}
                  sx={{ width: 225, m: 1 }}
                  filterOptions={(x) => x}
                  renderInput={(params) => (
                    <TextField {...params} label="Dealer Status" />
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
                />
                {error.mainDealerActivationStatus && (
                  <Typography sx={{ color: "red", ml: 1, fontSize: 12 }}>
                    {error.mainDealerActivationStatus}
                  </Typography>
                )}
              </Grid>

              <Autocomplete
                id="combo-box-demo"
                options={pennyCheckStatus}
                sx={{ width: 225, m: 1 }}
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
            </Grid>
          </Grid>
          {/* </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Grid sx={{ display: "flex" }}>
            <Grid sx={{ m: 1 }}>
              {props.type === "edit" ? (
                <Button
                  onClick={() => {
                    editDealerDetails(props.EditDealerData.mainDealerID);
                  }}
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
              {props.type === "edit" ? (
                <Button
                  onClick={() => {
                    props.close();
                    window.location.reload();
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    props.close();
                  }}
                >
                  Cancel
                </Button>
              )}
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
