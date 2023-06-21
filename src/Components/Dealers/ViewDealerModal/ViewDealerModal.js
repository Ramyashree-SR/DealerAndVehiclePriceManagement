import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  editMainDealersDetails,
  getAllVehicleOEM,
} from "../../service/dealers";
import { getAllStateDetails } from "../../service/stateapi/stateapi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getStatusDetails } from "../../service/checker";
import moment from "moment";
import { useToasts } from "react-toast-notifications";

function ViewDealerModal(props) {
  const [vehicleOEM, setVehicleOEM] = useState([]);
  const [dealerState, setDealerState] = useState([]);
  const { addToast } = useToasts();
  const StatusOptions = ["APPROVED", "REJECTED"];
  const activationStatus = ["Active", "InActive"];
  const pennyCheckStatus = ["Success", "Failed"];

  const [editingDealer, setEditingDealer] = useState({
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

  useEffect(() => {
    getAllVehicleOemDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getAllVehicleOEM();

    if (data) {
      if (data) {
        let OemData = [];
        data?.data?.map((val) => {
          OemData?.push({ label: val });
        });
        setVehicleOEM(OemData);
      } else {
        setVehicleOEM({});
      }
    }
  };

  useEffect(() => {
    getStateDetails();
  }, []);

  const getStateDetails = async () => {
    const { data } = await getAllStateDetails();
    if (data) {
      let stateData = [];
      data?.data?.data?.map((val) => {
        stateData?.push({ label: val });
      });
      setDealerState(stateData);
    } else {
      setDealerState([]);
    }
  };
  useEffect(() => {
    editDealerDetails();
  }, []);

  const editDealerDetails = async (mainDealerID) => {
    let payload = {
      mainDealerName: editingDealer?.mainDealerName,
      dealerType: editingDealer?.dealerType,
      mainDealerMailID: editingDealer?.mainDealerMailID,
      mainDealerManufacturerName: editingDealer?.mainDealerManufacturerName,
      mainDealerContactNumber: editingDealer?.mainDealerContactNumber,
      mainDealerAlternateContactNumber:
        editingDealer?.mainDealerAlternateContactNumber,
      contactPersonMobile: editingDealer?.contactPersonMobile,
      mainDealerContactPersonName: editingDealer?.mainDealerContactPersonName,
      mainDealerPaymentEligible: editingDealer?.mainDealerPaymentEligible,
      mainDealerActivationData: moment(
        new Date(editingDealer?.mainDealerActivationData)
      ).format("YYYY-MM-DD"),
      mainDealerExpireData: moment(
        new Date(editingDealer?.mainDealerExpireData)
      ).format("YYYY-MM-DD"),
      addressDetails: editingDealer?.addressDetails,
      state: editingDealer?.state,
      district: editingDealer?.district,
      city: editingDealer?.city,
      pinCode: editingDealer.pinCode,
      mainDealerPanNumber: editingDealer?.mainDealerPanNumber,
      mainDealerGstNumber: editingDealer?.mainDealerGstNumber,
      mainDealerBankName: editingDealer?.mainDealerBankName,
      mainDealerBankBranchName: editingDealer?.mainDealerBankBranchName,
      mainDealerBankAccNumber: editingDealer?.mainDealerBankAccNumber,
      mainDealerIfsc: editingDealer?.mainDealerIfsc,
      mainDealerAccountHolderName: editingDealer?.mainDealerAccountHolderName,
      mainDealerPaniniCheck: editingDealer?.mainDealerPaniniCheck,
      mainDealerActivationStatus: editingDealer?.mainDealerActivationStatus,
    };
    const { data } = await editMainDealersDetails(mainDealerID, payload);
    if (data) {
      props.getDealersDetails();
      props.close();
      window.location.reload();
    }
  };

  const updateChange = (event) => {
    setEditingDealer({
      ...editingDealer,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setEditingDealer(props.viewDealerData);
  }, [props.viewDealerData]);

  const onStateChange = (name, e, value) => {
    setEditingDealer({
      ...editingDealer,
      [name]: value,
    });
  };

  const handleVehicleOEMChange = (name, event, value) => {
    setEditingDealer({
      ...editingDealer,
      [name]: value,
    });
  };

  const handleActivationDateChange = (val) => {
    console.log(val, "val12");
    const date = moment(val).format("YYYY-MM-DD");
    console.log(date, "val1");
    setEditingDealer({
      ...editingDealer,
      mainDealerActivationData: date,
    });
  };

  const handleExpiryDateChange = (val) => {
    console.log(val, "val12");
    const date = moment(val).format("YYYY-MM-DD");
    console.log(date, "val1");
    setEditingDealer({
      ...editingDealer,
      mainDealerExpireData: date,
    });
  };

  //   const getStatusOfDealerByChecker = async (dealerID) => {
  //     let payload = {
  //       dealerName: editingDealer?.dealerName,
  //       dealerType: editingDealer?.dealerType,
  //       dealerMailID: editingDealer?.dealerMailID,
  //       dealerManufacturerName: editingDealer?.dealerManufacturerName,
  //       dealerContactNumber: editingDealer?.dealerContactNumber,
  //       dealerAlternateContactNumber: editingDealer?.dealerAlternateContactNumber,
  //       contactPersonMobile: editingDealer?.contactPersonMobile,
  //       dealerContactPersonName: editingDealer?.dealerContactPersonName,
  //       dealerActivationData: moment(
  //         new Date(editingDealer?.dealerActivationData)
  //       ).format("YYYY-MM-DD"),
  //       addressDetails: editingDealer?.addressDetails,
  //       state: editingDealer?.state,
  //       district: editingDealer?.district,
  //       city: editingDealer?.city,
  //       pinCode: editingDealer.pinCode,
  //       dealerPanNumber: editingDealer?.dealerPanNumber,
  //       dealerGstNumber: editingDealer?.dealerGstNumber,
  //       dealerBankName: editingDealer?.dealerBankName,
  //       dealerBankBranchName: editingDealer?.dealerBankBranchName,
  //       dealerBankAccNumber: editingDealer?.dealerBankAccNumber,
  //       dealerIfsc: editingDealer?.dealerIfsc,
  //       dealerAccountHolderName: editingDealer?.dealerAccountHolderName,
  //       dealerStatus: editingDealer?.dealerStatus,
  //       dealerActivationStatus: editingDealer?.dealerActivationStatus,
  //       dealerPaniniCheck: editingDealer?.dealerPaniniCheck,
  //     };
  //     const { data, errRes } = await getStatusDetails(dealerID, payload);

  //     if (data) {
  //       if (data.error === "FALSE") {
  //         props.getDealersDetails();
  //         props.close();
  //         addToast(data?.message, { appearance: "success" });
  //       } else if (errRes) {
  //         addToast(errRes, { appearance: "error" });
  //       }
  //     }
  //   };

  const handleActivationChange = (name, event, value) => {
    setEditingDealer(() => ({
      ...editingDealer,
      [name]: value,
    }));
  };
  const handlePennyCheckStatusChange = (name, event, value) => {
    setEditingDealer(() => ({
      ...editingDealer,
      [name]: value,
    }));
  };

  //   const handleCheckerStatus = (name, event, value) => {
  //     setEditingDealer(() => ({
  //       ...editingDealer,
  //       [name]: value,
  //     }));
  //   };

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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            View Dealer Details
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
                sx={{ width: "225px", ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select ManuFacturerName" />
                )}
                name="mainDealerManufacturerName"
                value={editingDealer?.mainDealerManufacturerName}
                onChange={(e, val) =>
                  handleVehicleOEMChange("mainDealerManufacturerName", e, val)
                }
                disabled
              />
              <Autocomplete
                id="combo-box-demo"
                options={dealerState}
                sx={{ width: 225, ml: 1, m: 1 }}
                // size="small"
                filterOptions={(x) => x}
                // getOptionLabel={option=>option.val}
                renderInput={(params) => (
                  <TextField {...params} label="Select State" />
                )}
                name="state"
                value={editingDealer?.state}
                onChange={(e, value) => {
                  onStateChange("state", e, value);
                }}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="Dealer Name"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="mainDealerName"
                value={editingDealer?.mainDealerName}
                onChange={(e) => updateChange(e)}
                disabled
              />
            </Grid>

            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerMailID"
              value={editingDealer?.mainDealerMailID}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Contact No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerContactNumber"
              value={editingDealer?.mainDealerContactNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Alternate No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerAlternateContactNumber"
              value={editingDealer?.mainDealerAlternateContactNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Contact Person Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerContactPersonName"
              value={editingDealer?.mainDealerContactPersonName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="ContactPersonMobile"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="contactPersonMobile"
              value={editingDealer?.contactPersonMobile}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Pan No"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerPanNumber"
              value={editingDealer?.mainDealerPanNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerGstNumber"
              value={editingDealer?.mainDealerGstNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerBankName"
              value={editingDealer?.mainDealerBankName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Branch Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerBankBranchName"
              value={editingDealer?.mainDealerBankBranchName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerBankAccNumber"
              value={editingDealer?.mainDealerBankAccNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerIfsc"
              value={editingDealer?.mainDealerIfsc}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Account Holder Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerAccountHolderName"
              value={editingDealer?.mainDealerAccountHolderName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="addressDetails"
              value={editingDealer?.addressDetails}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="city"
              value={editingDealer.city}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="District"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="district"
              value={editingDealer?.district}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <Grid sx={{ display: "flex" }}>
              <TextField
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="pinCode"
                value={editingDealer?.pinCode}
                onChange={(e) => updateChange(e)}
                disabled
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(editingDealer?.mainDealerActivationData)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expiry Date"
                    inputFormat="YYYY-MM-DD"
                    defaultValue="00-00-2099"
                    disabled
                    value={new Date(editingDealer?.mainDealerExpireData)}
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
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <Autocomplete
                id="combo-box-demo"
                options={activationStatus}
                sx={{ width: 225, ml: 1, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select ActivationType" />
                )}
                name="mainDealerActivationStatus"
                value={editingDealer?.mainDealerActivationStatus}
                // inputValue={dealerTypeStatus}
                onChange={(event, newValue) => {
                  handleActivationChange(
                    "mainDealerActivationStatus",
                    event,
                    newValue
                  );
                }}
                disabled
              />

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
                value={editingDealer?.mainDealerPaniniCheck}
                onChange={(e, val) =>
                  handlePennyCheckStatusChange("mainDealerPaniniCheck", e, val)
                }
                disabled
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewDealerModal;
