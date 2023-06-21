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
import { editsubDealersDetails, getAllVehicleOEM } from "../../service/dealers";
import { getAllStateDetails } from "../../service/stateapi/stateapi";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getStatusDetails } from "../../service/checker";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import { editSubDealersDetails } from "../../service/subDealers";

function ViewSubDealerModal(props) {
  const [vehicleOEM, setVehicleOEM] = useState([]);
  const [dealerState, setDealerState] = useState([]);
  const { addToast } = useToasts();
  const StatusOptions = ["APPROVED", "REJECTED"];
  const activationStatus = ["Active", "InActive"];
  const pennyCheckStatus = ["Success", "Failed"];

  const [editingDealer, setEditingDealer] = useState({
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
    subDealerPaymentEligible: "",
    subDealerActivationData: "",
    state: "",
    addressDetails: "",
    district: "",
    city: "",
    pinCode: "",
    subDealerActivationStatus: "",
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

  const editDealerDetails = async (subDealerID) => {
    console.log(subDealerID, "subDealerID");
    let payload = {
      mainDealerID: props.paramsId,
      subDealerName: editingDealer?.subDealerName,
      subDealerMailID: editingDealer?.subDealerMailID,
      subDealerManufacturerName: editingDealer?.subDealerManufacturerName,
      subDealerContactNumber: editingDealer?.subDealerContactNumber,
      subDealerAlternateContactNumber:
        editingDealer?.subDealerAlternateContactNumber,
      contactPersonMobile: editingDealer?.contactPersonMobile,
      subDealerContactPersonName: editingDealer?.subDealerContactPersonName,
      subDealerPanNumber: props.mainDealerData.mainDealerPanNumber,
      subDealerGstNumber: props.mainDealerData.mainDealerGstNumber,
      subDealerBankName: props.mainDealerData.mainDealerBankName,
      subDealerBankBranchName: props.mainDealerData.mainDealerBankBranchName,
      subDealerBankAccNumber: props.mainDealerData.mainDealerBankAccNumber,
      subDealerIfsc: props.mainDealerData.mainDealerIfsc,
      subDealerActivationStatus: editingDealer?.subDealerActivationStatus,
      subDealerAccountHolderName:
        props.mainDealerData.mainDealerAccountHolderName,
      subDealerActivationData: moment(
        new Date(editingDealer?.subDealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: editingDealer?.addressDetails,
      state: editingDealer?.state,
      district: editingDealer?.district,
      city: editingDealer?.city,
      pinCode: editingDealer?.pinCode,
      subDealerExpireData: moment(
        new Date(editingDealer?.subDealerExpireData)
      ).format("YYYY-MM-DD"),
    };
    const { data } = await editSubDealersDetails(subDealerID, payload);

    if (data) {
      setEditingDealer(data);
      props.getSubDealerDetails();
      props.close();
    }
    // window.location.reload();
  };

  const updateChange = (event) => {
    setEditingDealer({
      ...editingDealer,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setEditingDealer({ ...props.viewSubDealerData });
  }, [props.viewSubDealerData]);

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
      subDealerActivationData: date,
    });
  };

  const handleExpiryDateChange = (val) => {
    console.log(val, "val12");
    const date = moment(val).format("YYYY-MM-DD");
    console.log(date, "val1");
    setEditingDealer({
      ...editingDealer,
      subDealerExpireData: date,
    });
  };

  const handleActivationChange = (name, event, value) => {
    setEditingDealer(() => ({
      ...editingDealer,
      [name]: value,
    }));
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
              <TextField
                id="outlined-basic"
                label="Vehicle OEM"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="subDealerManufacturerName"
                value={editingDealer?.subDealerManufacturerName}
                onChange={(e) => updateChange(e)}
                disabled
              />
              {/* <Autocomplete
                id="combo-box-demo"
                options={vehicleOEM}
                sx={{ width: "225px", ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select ManuFacturerName" />
                )}
                name="subDealerManufacturerName"
                value={editingDealer?.subDealerManufacturerName}
                onChange={(e, val) =>
                  handleVehicleOEMChange("subDealerManufacturerName", e, val)
                }
                disabled
              /> */}
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
                name="subDealerName"
                value={editingDealer?.subDealerName}
                onChange={(e) => updateChange(e)}
                disabled
              />
            </Grid>

            <TextField
              id="outlined-basic"
              label="Dealer Type"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerType"
              value={editingDealer?.dealerType}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerMailID"
              value={editingDealer?.subDealerMailID}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Contact No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerContactNumber"
              value={editingDealer?.subDealerContactNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Alternate No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerAlternateContactNumber"
              value={editingDealer?.subDealerAlternateContactNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Contact Person Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerContactPersonName"
              value={editingDealer?.subDealerContactPersonName}
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
              name="subDealerPanNumber"
              value={editingDealer?.subDealerPanNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerGstNumber"
              value={editingDealer?.subDealerGstNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerBankName"
              value={editingDealer?.subDealerBankName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Branch Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerBankBranchName"
              value={editingDealer?.subDealerBankBranchName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerBankAccNumber"
              value={editingDealer?.subDealerBankAccNumber}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerIfsc"
              value={editingDealer?.subDealerIfsc}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Account Holder Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="subDealerAccountHolderName"
              value={editingDealer?.subDealerAccountHolderName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            {/* <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="addressDetails"
              value={editingDealer?.addressDetails}
              onChange={(e) => updateChange(e)}
              disabled
            /> */}
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
            <Grid sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(editingDealer?.subDealerActivationData)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1, m: 1 }}
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
                    value={new Date(editingDealer?.subDealerExpireData)}
                    onChange={(e) => {
                      handleExpiryDateChange(e);
                    }}
                    sx={{
                      width: 225,
                      ml: 2,
                      m: 1,
                      // display: props.type === "edit" ? "block" : "none",
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Autocomplete
                id="combo-box-demo"
                options={activationStatus}
                sx={{ width: 225, m: 2, ml: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select Activation Status" />
                )}
                name="subDealerActivationStatus"
                value={editingDealer?.subDealerActivationStatus}
                // inputValue={dealerTypeStatus}
                onChange={(event, newValue) => {
                  handleActivationChange(
                    "subDealerActivationStatus",
                    event,
                    newValue
                  );
                }}
                disabled
              />
            </Grid>

            <Grid sx={{ display: "flex" }}>
              {/* <Autocomplete
                id="combo-box-demo"
                options={pennyCheckStatus}
                sx={{ width: 225, ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select PennyCheck Status" />
                )}
                name="subDealerPaniniCheck"
                value={editingDealer?.subDealerPaniniCheck}
                onChange={(e, val) =>
                  handlePennyCheckStatusChange("subDealerPaniniCheck", e, val)
                }
                disabled
              /> */}
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

export default ViewSubDealerModal;
