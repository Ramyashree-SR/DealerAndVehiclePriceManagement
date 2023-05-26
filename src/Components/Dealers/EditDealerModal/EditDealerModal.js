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

function EditDealerModal(props) {
  const [vehicleOEM, setVehicleOEM] = useState([]);
  const [dealerState, setDealerState] = useState([]);
  const { addToast } = useToasts();
  const StatusOptions = ["APPROVED", "REJECTED"];
  const activationStatus = ["Active", "InActive"];
  const pennyCheckStatus = ["Success", "Failed"];

  const [editingDealer, setEditingDealer] = useState({
    dealerID: "",
    dealerActivationStatus: "",
    dealerAlternateContactNumber: "",
    dealerActivationData: "",
    dealerAccountHolderName: "",
    dealerStatus: "",
    dealerName: "",
    dealerBankName: "",
    dealerGstNumber: "",
    dealerPaniniCheck: "",
    dealerBankAccNumber: "",
    dealerBankBranchName: "",
    dealerManufacturerName: "",
    dealerContactNumber: "",
    dealerContactPersonName: "",
    contactPersonMobile: "",
    dealerIfsc: "",
    dealerMailID: "",
    dealerPanNumber: "",
    addressDetails: "",
    pinCode: "",
    city: "",
    district: "",
    state: "",
    dealerType: "",
  });

  useEffect(() => {
    getAllVehicleOemDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getAllVehicleOEM();
    // console.log(data, "OEM");
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
    // console.log(data, "state");
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
  // useEffect(() => {
  //   editDealerDetails();
  // }, []);

  const editDealerDetails = async (dealerID) => {
    let payload = {
      dealerName: editingDealer?.dealerName,
      dealerType: editingDealer?.dealerType,
      dealerMailID: editingDealer?.dealerMailID,
      dealerManufacturerName: editingDealer?.dealerManufacturerName,
      dealerContactNumber: editingDealer?.dealerContactNumber,
      dealerAlternateContactNumber: editingDealer?.dealerAlternateContactNumber,
      contactPersonMobile: editingDealer?.contactPersonMobile,
      dealerContactPersonName: editingDealer?.dealerContactPersonName,
      dealerActivationData: moment(
        new Date(editingDealer?.dealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: editingDealer?.addressDetails,
      state: editingDealer?.state,
      district: editingDealer?.district,
      city: editingDealer?.city,
      pinCode: editingDealer.pinCode,
      dealerPanNumber: editingDealer?.dealerPanNumber,
      dealerGstNumber: editingDealer?.dealerGstNumber,
      dealerBankName: editingDealer?.dealerBankName,
      dealerBankBranchName: editingDealer?.dealerBankBranchName,
      dealerBankAccNumber: editingDealer?.dealerBankAccNumber,
      dealerIfsc: editingDealer?.dealerIfsc,
      dealerAccountHolderName: editingDealer?.dealerAccountHolderName,
      dealerStatus: editingDealer?.dealerStatus,
      dealerActivationStatus: editingDealer?.dealerActivationStatus,
      dealerPaniniCheck: editingDealer?.dealerPaniniCheck,
    };
    const { data, errRes } = await editMainDealersDetails(dealerID, payload);
    if (data) {
      if (data) {
        setEditingDealer({
          dealerID: "",
          dealerActivationStatus: "",
          dealerAlternateContactNumber: "",
          dealerActivationData: "",
          dealerAccountHolderName: "",
          dealerStatus: "",
          dealerName: "",
          dealerBankName: "",
          dealerGstNumber: "",
          dealerPaniniCheck: "",
          dealerBankAccNumber: "",
          dealerBankBranchName: "",
          dealerManufacturerName: "",
          dealerContactNumber: "",
          dealerContactPersonName: "",
          contactPersonMobile: "",
          dealerIfsc: "",
          dealerMailID: "",
          dealerPanNumber: "",
          addressDetails: "",
          pinCode: "",
          city: "",
          district: "",
          state: "",
          dealerType: "",
        });
        props.getDealersDetails();
        addToast(data?.message, { appearance: "success" });
      } else if (errRes) {
        addToast(errRes, { appearance: "error" });
      }
    }
    props.close();
  };

  const updateChange = (event) => {
    setEditingDealer({
      ...editingDealer,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setEditingDealer({ ...props.editDealerData });
  }, [props.editDealerData]);

  const onStateChange = (name, e, value) => {
    // console.log(value, "value");
    setEditingDealer({
      ...editingDealer,
      [name]: value,
    });
  };

  const handleVehicleOEMChange = (name, event, value) => {
    // console.log(name,value,"ejhgf");
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
      dealerActivationData: date,
    });
  };

  // useEffect(() => {
  //   getStatusOfDealerByChecker(props.mainDealerID, approve);
  //   console.log(approve,"approve");
  // }, []);

  const getStatusOfDealerByChecker = async (dealerID) => {
    // console.log(dealerID,"params");
    let payload = {
      dealerName: editingDealer?.dealerName,
      dealerType: editingDealer?.dealerType,
      dealerMailID: editingDealer?.dealerMailID,
      dealerManufacturerName: editingDealer?.dealerManufacturerName,
      dealerContactNumber: editingDealer?.dealerContactNumber,
      dealerAlternateContactNumber: editingDealer?.dealerAlternateContactNumber,
      contactPersonMobile: editingDealer?.contactPersonMobile,
      dealerContactPersonName: editingDealer?.dealerContactPersonName,
      dealerActivationData: moment(
        new Date(editingDealer?.dealerActivationData)
      ).format("YYYY-MM-DD"),
      addressDetails: editingDealer?.addressDetails,
      state: editingDealer?.state,
      district: editingDealer?.district,
      city: editingDealer?.city,
      pinCode: editingDealer.pinCode,
      dealerPanNumber: editingDealer?.dealerPanNumber,
      dealerGstNumber: editingDealer?.dealerGstNumber,
      dealerBankName: editingDealer?.dealerBankName,
      dealerBankBranchName: editingDealer?.dealerBankBranchName,
      dealerBankAccNumber: editingDealer?.dealerBankAccNumber,
      dealerIfsc: editingDealer?.dealerIfsc,
      dealerAccountHolderName: editingDealer?.dealerAccountHolderName,
      dealerStatus: editingDealer?.dealerStatus,
      dealerActivationStatus: editingDealer?.dealerActivationStatus,
      dealerPaniniCheck: editingDealer?.dealerPaniniCheck,
    };
    const { data, errRes } = await getStatusDetails(dealerID, payload);
    // console.log(data, "data");
    if (data) {
      if (data.error === "FALSE") {
        props.getDealersDetails();
        props.close();
        addToast(data?.message, { appearance: "success" });
      } else if (errRes) {
        addToast(errRes, { appearance: "error" });
      }
    }
  };

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

  const handleCheckerStatus = (name, event, value) => {
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
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            Check Dealer Details
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
                name="dealerManufacturerName"
                value={editingDealer?.dealerManufacturerName}
                onChange={(e, val) =>
                  handleVehicleOEMChange("dealerManufacturerName", e, val)
                }
                disabled
              />
              <Autocomplete
                id="combo-box-demo"
                options={dealerState}
                sx={{ width: "225px", ml: 1, m: 1 }}
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
                name="dealerName"
                value={editingDealer?.dealerName}
                onChange={(e) => updateChange(e)}
              />
            </Grid>

            <TextField
              id="outlined-basic"
              label="Email ID"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerMailID"
              value={editingDealer?.dealerMailID}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Contact No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerContactNumber"
              value={editingDealer?.dealerContactNumber}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Alternate No."
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerAlternateContactNumber"
              value={editingDealer?.dealerAlternateContactNumber}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Contact Person Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerContactPersonName"
              value={editingDealer?.dealerContactPersonName}
              onChange={(e) => updateChange(e)}
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
            />
            <TextField
              id="outlined-basic"
              label="Pan No"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerPanNumber"
              value={editingDealer?.dealerPanNumber}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerGstNumber"
              value={editingDealer?.dealerGstNumber}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerBankName"
              value={editingDealer?.dealerBankName}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Branch Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerBankBranchName"
              value={editingDealer?.dealerBankBranchName}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerBankAccNumber"
              value={editingDealer?.dealerBankAccNumber}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="mainDealerIfsc"
              value={editingDealer?.dealerIfsc}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Account Holder Name"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="dealerAccountHolderName"
              value={editingDealer?.dealerAccountHolderName}
              onChange={(e) => updateChange(e)}
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
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(editingDealer?.dealerActivationData)}
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
                sx={{ width: 225, ml: 1, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select ActivationType" />
                )}
                name="dealerActivationStatus"
                value={editingDealer?.dealerActivationStatus}
                // inputValue={dealerTypeStatus}
                onChange={(e, val) => {
                  handleActivationChange("dealerActivationStatus", e, val);
                }}
                disabled
              />
            </Grid>
            <Autocomplete
              id="combo-box-demo"
              options={pennyCheckStatus}
              sx={{ width: 225, ml: 1, m: 1 }}
              // size="small"
              // getOptionLabel={(option) => option.oemName}
              renderInput={(params) => (
                <TextField {...params} label="Select PennyCheck Status" />
              )}
              name="dealerPaniniCheck"
              value={editingDealer?.dealerPaniniCheck}
              onChange={(e, val) =>
                handlePennyCheckStatusChange("dealerPaniniCheck", e, val)
              }
              disabled
            />
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={StatusOptions}
            sx={{ m: 1, width: 200, ml: 1 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Checker Status" />
            )}
            name="dealerStatus"
            value={editingDealer?.dealerStatus}
            // inputValue={approveStatus}
            onChange={(e, val) => {
              handleCheckerStatus("dealerStatus", e, val);
            }}
          />
          <Button onClick={() => getStatusOfDealerByChecker(props.dealerID)}>
            Submit
          </Button>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditDealerModal;
