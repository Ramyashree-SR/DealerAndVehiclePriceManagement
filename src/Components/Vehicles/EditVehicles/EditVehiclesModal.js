import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editAllVehicleDetailsByRow } from "../../service/VehicleApi/VehicleApi";
import { getVehiclePriceStatus } from "../../service/checker";
import { useToasts } from "react-toast-notifications";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";

function EditVehiclesModal(props) {
  const StatusOptions = ["APPROVED", "SEND BACK"];
  const { addToast } = useToasts();
  const [onRoadPrice, setOnRoadPrice] = useState("");
  const [maxLoanAmt, setMaxLoanAmt] = useState("");
  const [editVehicles, seteditVehicles] = useState({
    vehicleId: "",
    vehicleModel: "",
    vehicleVariant: "",
    vehicalOem: "",
    state: "",
    vehicalOnRoadPrice: "",
    vehicleMaxLoanAmount: "",
    status: "",
    priceActivationDate: "",
    priceExpireDate: "",
    exShowroomPrice: "",
  });
  const calculateValue = (price) => {
    if (isNaN(price)) {
      return "";
    }
    return 9 * price;
  };

  const updateChange = (event) => {
    // if (event.target.name === "onRoadPrice") {
    //   setOnRoadPrice(event.target.value);
    // } else if (event.target.name === "editVehicles") {

    seteditVehicles({
      ...editVehicles,
      [event.target.name]: event.target.value,
    });
    // }
    setOnRoadPrice(event.target.value);
    const calculated = calculateValue(parseFloat(onRoadPrice));
    setMaxLoanAmt(calculated);
  };

  useEffect(() => {
    seteditVehicles({ ...props.editVehicleData });
  }, [props.editVehicleData]);

  const editVehicleDetails = async (vehicleId) => {
    let payload = {
      vehicleId: editVehicles?.vehicleId,
      vehicleModel: editVehicles?.vehicleModel,
      vehicleVariant: editVehicles?.vehicleVariant,
      vehicalOem: editVehicles?.vehicalOem,
      state: editVehicles?.vehicalState,
      vehicalOnRoadPrice: editVehicles?.vehicalOnRoadPrice,
      vehicleMaxLoanAmount: maxLoanAmt,
      priceActivationDate: moment(
        new Date(editVehicles?.priceActivationDate)
      ).format("YYYY-MM-DD"),
      priceExpireDate: moment(new Date(editVehicles.priceExpireDate)).format(
        "YYYY-MM-DD"
      ),
      status: editVehicles?.status,
      exShowroomPrice: editVehicles?.exShowroomPrice,
    };
    const { data } = await editAllVehicleDetailsByRow(vehicleId, payload);
    if (data) {
      seteditVehicles({
        vehicleId: "",
        vehicleModel: "",
        vehicleVariant: "",
        vehicalOem: "",
        state: "",
        vehicalOnRoadPrice: "",
        vehicleMaxLoanAmount: "",
        status: "",
        priceActivationDate: "",
        priceExpireDate: "",
        exShowroomPrice: "",
      });
    }
    props.getVehicleVariantsDetails();
    props.close();
  };

  const handleCheckerStatus = (name, event, value) => {
    seteditVehicles(() => ({
      ...editVehicles,
      [name]: value,
    }));
  };

  const handleActivationDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    seteditVehicles({
      ...editVehicles,
      priceActivationDate: date,
    });
  };

  const handleExpiryDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    seteditVehicles({
      ...editVehicles,
      priceExpireDate: date,
    });
  };

  const getStatusOfVehiclesByChecker = async (vehicleId) => {
    let payload = {
      vehicleId: editVehicles?.vehicleId,
      vehicleModel: editVehicles?.vehicleModel,
      vehicleVariant: editVehicles?.vehicleVariant,
      vehicalOem: editVehicles?.vehicalOem,
      state: editVehicles?.vehicalState,
      vehicalOnRoadPrice: editVehicles?.vehicalOnRoadPrice,
      vehicleMaxLoanAmount: editVehicles?.vehicleMaxLoanAmount,
      status: editVehicles?.status,
      priceExpireDate: editVehicles?.priceExpireDate,
      priceActivationDate: editVehicles?.priceActivationDate,
      exShowRoomPrice: editVehicles?.exShowroomPrice,
    };
    const { data, errRes } = await getVehiclePriceStatus(vehicleId, payload);
    if (data) {
      if (data.error === "False") {
        props.getVehicleVariantsDetails();
        props.close();
        addToast(data?.message, { appearance: "success" });
      } else if (errRes) {
        addToast(errRes, { appearance: "error" });
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
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            Edit Vehicle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body sx={{ backgroundColor: "#00000" }}>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
            key={editVehicles.vehicleId}
          >
            <Grid>
              <TextField
                id="outlined-basic"
                label="Vehicle ID"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleId"
                value={editVehicles?.vehicleId}
                onChange={(e) => updateChange(e)}
                disabled
              />
              <TextField
                id="outlined-basic"
                label="Vehiclle State"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicalState"
                value={editVehicles?.vehicalState}
                onChange={(e) => updateChange(e)}
                disabled
              />

              <TextField
                id="outlined-basic"
                label="Vehicle OEM"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicalOem"
                value={editVehicles?.vehicalOem}
                onChange={(e) => updateChange(e)}
                disabled
              />
            </Grid>
            <Grid>
              <TextField
                id="outlined-basic"
                label="Vehicle Model"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleModel"
                value={editVehicles?.vehicleModel}
                onChange={(e) => updateChange(e)}
              />
              <TextField
                id="outlined-basic"
                label="Vehicle Variant"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleVariant"
                value={editVehicles?.vehicleVariant}
                onChange={(e) => updateChange(e)}
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Ex-Showroom Price"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="exShowRoomPrice"
                value={editVehicles?.exShowroomPrice}
                onChange={(e) => updateChange(e)}
                disabled
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                type="number"
                id="outlined-basic"
                label="On Road Price"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicalOnRoadPrice"
                value={editVehicles?.vehicalOnRoadPrice}
                onChange={(e) => updateChange(e)}
                required
              />
              <TextField
                type="number"
                id="outlined-basic"
                label="Max Loan Amount"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleMaxLoanAmount"
                value={editVehicles?.vehicleMaxLoanAmount}
                onChange={(e) => updateChange(e)}
                required
                disabled
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(editVehicles?.priceActivationDate)}
                    onChange={(e) => {
                      handleActivationDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Expiry Date"
                  inputFormat="YYYY-MM-DD"
                  value={new Date(editVehicles?.priceExpireDate)}
                  onChange={(e) => {
                    handleExpiryDateChange(e);
                  }}
                  sx={{ width: 225, ml: 1 }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          {props.checkerEdit ? (
            <>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={StatusOptions}
                sx={{ m: 1, width: 200, ml: 1 }}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Checker Status" />
                )}
                name="status"
                value={editVehicles?.status}
                // inputValue={approveStatus}
                onChange={(e, val) => {
                  handleCheckerStatus("status", e, val);
                }}
              />
              <Button
                onClick={() =>
                  getStatusOfVehiclesByChecker(props.editVehicleData.vehicleId)
                }
              >
                Submit
              </Button>
            </>
          ) : (
            <Button
              onClick={() =>
                editVehicleDetails(props.editVehicleData.vehicleId)
              }
            >
              Edit
            </Button>
          )}
          <Button onClick={props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditVehiclesModal;
