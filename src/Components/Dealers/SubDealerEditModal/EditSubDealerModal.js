import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editSubDealersDetails } from "../../service/subDealers";

export default function EditSubDealerModal(props) {
  const [editingSubDealer, setEditingSubDealer] = useState({
    mainDealerID: "",
    subDealerName: "",
    subDealerManufacturerName: "",
    subDealerMailID: "",
    subDealerContactNumber: "",
    subDealerAlternateContactNumber: "",
    subDealerContactPersonName: "",
    contactPersonMobile: "",
    mainDealerPanNumber: "",
    mainDealerGstNumber: "",
    mainDealerBankName: "",
    mainDealerBankBranchName: "",
    mainDealerBankAccNumber: "",
    mainDealerIfsc: "",
    mainDealerAccountHolderName: "",
    mainDealerPaymentEligible: "",
    subDealerActivationData: "",
    state: "",
    addressDetails: "",
    district: "",
    city: "",
    pinCode: "",  
  });

  let updateChange = (event) => {
    setEditingSubDealer({
      ...editingSubDealer,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setEditingSubDealer({...props.editSubDealerData});
  }, [props.editSubDealerData]);

  const editSubDealerRowDetails = async (subDealerID) => {
    let payload = {
      mainDealerID: props.paramsId,
      subDealerName: editingSubDealer?.subDealerName,
      subDealerMailID: editingSubDealer?.subDealerMailID,
      mainDealerManufacturerName: props.mainDealerManufacturerName,
      subDealerContactNumber: editingSubDealer?.subDealerContactNumber,
      subDealerAlternateContactNumber:
        editingSubDealer?.subDealerAlternateContactNumber,
      contactPersonMobile: editingSubDealer?.contactPersonMobile,
      subDealerContactPersonName: editingSubDealer?.subDealerContactPersonName,
      mainDealerPanNumber: props.mainDealerPanNumber,
      mainDealerGstNumber: props.mainDealerGstNumber,
      mainDealerBankName: props.mainDealerBankName,
      mainDealerBankBranchName: props.mainDealerBankBranchName,
      mainDealerBankAccNumber: props.mainDealerBankAccNumber,
      mainDealerIfsc: props.mainDealerIfsc,
      mainDealerAccountHolderName: props.mainDealerAccountHolderName,
      mainDealerPaymentEligible: props.mainDealerPaymentEligible,
      subDealerActivationData: editingSubDealer?.subDealerActivationData,
      addressDetails: editingSubDealer?.addressDetails,
      state: editingSubDealer?.state,
      district: editingSubDealer?.district,
      city: editingSubDealer?.city,
      pinCode: editingSubDealer?.pinCode,
    };
    const { data } = await editSubDealersDetails(subDealerID, payload);
    if (data) {
      setEditingSubDealer(data);
      props.getSubDealerDetails();
      props.close();
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            Edit Dealer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
          >
            <TextField
              id="outlined-basic"
              label="MainDealer ID"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="props.paramsId"
              value={props.paramsId}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Sub Dealer Name"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="subDealerName"
              value={editingSubDealer?.subDealerName}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="SubDealer Email ID"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="subDealerMailID"
              value={editingSubDealer?.subDealerMailID}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="VehicleOEM"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="mainDealerManufacturerName"
              value={props.mainDealerData.mainDealerManufacturerName}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Contact No."
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="subDealerContactNumber"
              value={editingSubDealer?.subDealerContactNumber}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Contact Person Name"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="subDealerContactPersonName"
              value={editingSubDealer?.subDealerContactPersonName}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Alternate No."
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="subDealerAlternateContactNumber"
              value={editingSubDealer?.subDealerAlternateContactNumber}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="ContactPersonMobile"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="contactPersonMobile"
              value={editingSubDealer?.contactPersonMobile}
              onChange={(e) => updateChange(e)}
            />
            {/* <TextField id="outlined-basic" label="Payment Eligible" variant="outlined" size='small'  sx={{m:1}} name="subDealerPaymentEligible" value={editingSubDealer?.subDealerPaymentEligible} onChange={(e)=>updateChange(e)}/>
       <TextField id="outlined-basic" label="Activation Date" variant="outlined" size='small'  sx={{m:1}} name="subDealerActivationData" value={editingSubDealer?.subDealerActivationData} onChange={(e)=>updateChange(e)}/> */}
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="addressDetails"
              value={editingSubDealer?.addressDetails}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Pan No"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="mainDealerPanNumber"
              value={props.mainDealerData.mainDealerPanNumber}
              // onChange={(e) => updateChange(e)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="GST Number"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="props.mainDealerGstNumber"
              value={props.mainDealerData.mainDealerGstNumber}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name=" props.mainDealerBankName"
              value={props.mainDealerData.mainDealerBankName}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              disabled
              id="outlined-basic"
              label="Branch Name"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="props.mainDealerBankBranchName"
              value={props.mainDealerData.mainDealerBankBranchName}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="Account Number"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="props.mainDealerBankAccNumber"
              value={props.mainDealerData.mainDealerBankAccNumber}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              disabled
              id="outlined-basic"
              label="IFSC Code"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="props.mainDealerIfsc"
              value={props.mainDealerData.mainDealerIfsc}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              disabled
              id="outlined-basic"
              label="Account Holder Name"
              variant="outlined"
              size="small"
              sx={{ m: 1, fontWeight: 800 }}
              name="props.mainDealerAccountHolderName"
              value={props.mainDealerData.mainDealerAccountHolderName}
              onChange={(e) => updateChange(e)}
            />
            {/* <TextField
              id="outlined-basic"
              label="Payment Eligible"
              variant="outlined"
              size="small"
              sx={{ m: 1, }}
              name="props.mainDealerPaymentEligible"
              value={props.mainDealerData.mainDealerPaymentEligible}
              onChange={(e) => updateChange(e)}
              disabled
            /> */}

            <TextField
              id="outlined-basic"
              label="State"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="state"
              value={editingSubDealer?.state}
              onChange={(e) => updateChange(e)}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="District"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="district"
              value={editingSubDealer?.district}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="city"
              value={editingSubDealer?.city}
              onChange={(e) => updateChange(e)}
            />
            <TextField
              id="outlined-basic"
              label="Pincode"
              variant="outlined"
              size="small"
              sx={{ m: 1 }}
              name="pinCode"
              value={editingSubDealer?.pinCode}
              onChange={(e) => updateChange(e)}
            />
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() =>
              editSubDealerRowDetails(props.editSubDealerData.subDealerID)
            }
          >
            Edit
          </Button>
          <Button onClick={props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
