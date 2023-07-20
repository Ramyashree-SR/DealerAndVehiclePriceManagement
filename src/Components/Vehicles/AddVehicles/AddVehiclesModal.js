import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  addAllNewVehicleDetails,
  getAllVehicleModelDetails,
  getAllVehicleVariantDetails,
  getVehicleOEM,
} from "../../service/VehicleApi/VehicleApi";
import { stateDropDownApi } from "../../service/stateapi/stateapi";

import AddIcon from "@mui/icons-material/Add";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment/moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useToasts } from "react-toast-notifications";

function AddVehiclesModal(props) {
  const { addToast } = useToasts();
  const [vehicleOEM, setVehicleOEM] = useState([]);
  // console.log(vehicleOEM, "vehicleOEM");
  const [showModel, setShowModel] = useState(false);
  // const showVariant = false;
  const [showModelComponent, setShowModelComponent] = useState(false);
  const [showVariant, setshowVariant] = useState(false);
  // const showVariant = false;
  const [showInputComponent, setShowInputComponent] = useState(false);
  const [onRoadPrice, setOnRoadPrice] = useState("");
  const [maxLoanAmt, setMaxLoanAmt] = useState("");
  const [vehcileState, setVehcileState] = useState([]);
  const [VehicleModels, setVehicleModels] = useState([]);
  const [VehicleVariant, setVehicleVariant] = useState([]);
  const [addNewVehicles, setaddNewVehicles] = useState({
    vehicleModel: "",
    vehicleVariant: "",
    vehicleOem: "",
    vehicleState: "",
    vehicleMaxLoanAmount: "",
    vehicalOnRoadPrice: "",
    exShowRoomPrice: "",
    priceActivationDate: "",
    priceExpireDate: "",
  });

  const handleStateChange = (name, e, value) => {
    // console.log(value, "value");
    setaddNewVehicles(() => ({
      ...addNewVehicles,
      [name]: value,
    }));
  };

  const updateChange = (event) => {
    if (event.target.name === "onRoadPrice") {
      setOnRoadPrice(event.target.value);
    } else if (event.target.name === "addNewVehicles") {
      setaddNewVehicles({
        ...addNewVehicles,
        [event.target.name]: event.target.value,
      });
    }
    const calculated = calculateValue(parseFloat(onRoadPrice));
    setMaxLoanAmt(calculated);
  };

  const calculateValue = (price) => {
    if (isNaN(price)) {
      return "";
    }
    return (9 * price).toFixed(0);
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
      setVehcileState(stateData);
    } else {
      setVehcileState([]);
    }
  };

  // console.log(vehicleOEM,"fghj");
  useEffect(() => {
    getAllVehicleOemDetails();
  }, []);

  const getAllVehicleOemDetails = async () => {
    const { data } = await getVehicleOEM();
    console.log(data.data.data, "OEM");
    if (data) {
      let OemData = [];
      data?.data?.data?.map((val) => {
        OemData?.push(val);
      });
      setVehicleOEM(OemData);
    } else {
      setVehicleOEM([]);
    }
  };

  const handleVehicleOEMChange = (name, event, value) => {
    // console.log(name,value,"ejhgf");
    setaddNewVehicles({
      ...addNewVehicles,
      [name]: value,
    });

    getModelDetails(value);
  };

  const handleVehicleModelChange = (name, event, value) => {
    setaddNewVehicles({
      ...addNewVehicles,
      [name]: value,
    });
    setShowModel(true);
    setshowVariant(true);
    getVariantDetails(value);
  };

  const getModelDetails = async (vehicleModel) => {
    const { data } = await getAllVehicleModelDetails(vehicleModel);
    // console.log(data,"data");
    if (data) {
      let modelData = [];
      data?.data.map((val) => {
        modelData?.push(val);
      });
      setVehicleModels(modelData);
    } else {
      setShowModel(true);
      setVehicleModels([]);
    }
  };

  const handleVehicleVariantChange = (name, event, value) => {
    // console.log("value", value);
    setaddNewVehicles({
      ...addNewVehicles,
      [name]: value,
    });
    setshowVariant(true);
  };

  const getVariantDetails = async (vehicleOEM) => {
    const { data } = await getAllVehicleVariantDetails(vehicleOEM);
    // console.log(data,"data");
    if (data) {
      let modelData = [];
      data?.data.map((val) => {
        modelData?.push(val);
      });
      setVehicleVariant(modelData);
    } else {
      setshowVariant(true);
      setVehicleVariant([]);
    }
  };

  const addNewVehicleDetails = async () => {
    let payload = {
      // vehicleId:addNewVehicles?.vehicleId,
      vehicleModel: addNewVehicles?.vehicleModel,
      vehicleVariant: addNewVehicles?.vehicleVariant,
      vehicleOem: addNewVehicles?.vehicleOem,
      vehicleState: addNewVehicles?.vehicleState,
      vehicalOnRoadPrice:  onRoadPrice,
      vehicleMaxLoanAmount: maxLoanAmt,
      priceActivationDate: moment(
        new Date(addNewVehicles?.priceActivationDate)
      ).format("YYYY-MM-DD"),
      priceExpireDate: moment(new Date(addNewVehicles.priceExpireDate)).format(
        "YYYY-MM-DD"
      ),
    };
    const { data, errRes } = await addAllNewVehicleDetails(payload);
    // console.log(data,"dataadd");
    if (data) {
      setaddNewVehicles({
        vehicleModel: "",
        vehicleVariant: "",
        vehicleOem: "",
        vehicleState: "",
        vehicalOnRoadPrice: "",
        vehicleMaxLoanAmount: "",
        exShowRoomPrice: "",
        priceActivationDate: "",
        priceExpireDate: "",
      });
      addToast("Vehicle Data Added Successfully", { appearance: "success" });
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    // props.getVehicleVariantsDetails(data?.data.data)
    props.close();
  };

  const handleActivationDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setaddNewVehicles({
      ...addNewVehicles,
      priceActivationDate: date,
    });
    // const date = [...addNewVehicles];
    // date.priceActivationDate = val;
    // date.priceExpireDate = null;
    // setaddNewVehicles([...date]);
  };

  const handleExpiryDateChange = (val) => {
    const date = moment(val).format("YYYY-MM-DD");
    setaddNewVehicles({
      ...addNewVehicles,
      priceExpireDate: date,
    });
  };

  const addBtnClick = () => {
    setShowInputComponent(true);
  };

  const addButtonClick = () => {
    setShowModelComponent(true);
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
            Add New Vehicle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
          >
            <Grid sx={{ display: "flex" }}>
              <Autocomplete
                id="combo-box-demo"
                options={vehcileState}
                sx={{ width: 225, ml: 1, m: 1 }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                  <TextField {...params} label="Select State*" />
                )}
                name="vehicleState"
                value={addNewVehicles?.vehicleState}
                onChange={(e, value) => {
                  handleStateChange("vehicleState", e, value);
                }}
                disabled={props.type === "edit" ? true : false}
              />

              <Autocomplete
                id="combo-box-demo"
                options={vehicleOEM}
                sx={{ width: "225px", ml: 1, m: 1 }}
                // size="small"
                // getOptionLabel={(option) => option.oemName}
                renderInput={(params) => (
                  <TextField {...params} label="Select OEM*" />
                )}
                name="vehicleOem"
                value={addNewVehicles?.vehicleOem}
                onChange={(e, val) =>
                  handleVehicleOEMChange("vehicleOem", e, val)
                }
              />

              {/* <TextField
                id="outlined-basic"
                label="Vehicle Model*"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleModel"
                value={addNewVehicles?.vehicleModel}
                onChange={(e) => updateChange(e)}
              /> */}
              {showModelComponent ? (
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Vehicle Model*"
                    variant="outlined"
                    // size="small"
                    sx={{ m: 1 }}
                    name="vehicleModel"
                    value={addNewVehicles?.vehicleModel}
                    onChange={(e) =>
                      setaddNewVehicles({
                        ...addNewVehicles,
                        vehicleModel: e.target.value,
                      })
                    }
                  />
                </Box>
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={VehicleModels}
                  sx={{ m: 1, width: 224, ml: 1 }}
                  size="large"
                  renderInput={(params) => (
                    <TextField {...params} label="Select Vehicle Model" />
                  )}
                  name="vehicleModel"
                  value={addNewVehicles?.vehicleModel}
                  onChange={(e, val) => {
                    handleVehicleModelChange("vehicleModel", e, val);
                  }}
                  noOptionsText={
                    showModel ? (
                      <Box>
                        <Box
                          onClick={() => addButtonClick()}
                          className="d-flex border rounded p-1 border-secondary justify-content-around align-items-center cursor-pointer bg-secondary text-white"
                        >
                          <AddIcon className="color-blue" />
                          <Typography className="fs-14">Add Model</Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Typography>No Options Available</Typography>
                    )
                  }
                />
              )}
            </Grid>

            {/* <TextField
              id="outlined-basic"
              label="Vehicle Variant*"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicleVariant"
              value={addNewVehicles?.vehicleVariant}
              onChange={(e) => updateChange(e)}
            /> */}

            <Grid sx={{ display: "flex" }}>
              {showInputComponent ? (
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Vehicle Variant*"
                    variant="outlined"
                    // size="small"
                    sx={{ m: 1 }}
                    name="vehicleVariant"
                    value={addNewVehicles?.vehicleVariant}
                    onChange={(e) => {
                      setaddNewVehicles({
                        ...addNewVehicles,
                        vehicleVariant: e.target.value,
                      });
                    }}
                  />
                </Box>
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={VehicleVariant}
                  sx={{ m: 1, width: 224, ml: 1 }}
                  size="large"
                  renderInput={(params) => (
                    <TextField {...params} label="Select Vehicle Variants" />
                  )}
                  name="vehicleVariant"
                  value={addNewVehicles?.vehicleVariant}
                  onChange={(e, val) => {
                    handleVehicleVariantChange("vehicleVariant", e, val);
                  }}
                  noOptionsText={
                    showVariant ? (
                      <Box>
                        <Box
                          onClick={() => addBtnClick()}
                          className="d-flex border rounded p-1 border-secondary justify-content-around align-items-center cursor-pointer bg-secondary text-white"
                        >
                          <AddIcon className="color-blue" />
                          <Typography className="fs-14">Add Variant</Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Typography>No Options Available</Typography>
                    )
                  }
                />
              )}

              <TextField
                type="number"
                id="outlined-basic"
                label="Ex-Showroom Price"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="exShowRoomPrice"
                // value={addNewVehicles?.exShowRoomPrice}
                onChange={(e) => updateChange(e)}
              />

              <TextField
                type="number"
                id="outlined-basic"
                label="On Road Price*"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="onRoadPrice"
                value={onRoadPrice}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <Grid sx={{ display: "flex" }}>
              <TextField
                type="number"
                id="outlined-basic"
                label="Max Loan Amount *"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="maxLoanAmt"
                value={maxLoanAmt}
                onChange={(e) => updateChange(e)}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Activation Date"
                    inputFormat="YYYY-MM-DD"
                    disablePast={true}
                    value={new Date(addNewVehicles?.priceActivationDate)}
                    onChange={(e, val) => {
                      handleActivationDateChange(e, val);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expiry Date"
                    inputFormat="YYYY-MM-DD"
                    value={new Date(addNewVehicles?.priceExpireDate)}
                    onChange={(e) => {
                      handleExpiryDateChange(e);
                    }}
                    sx={{ width: 225, ml: 1 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addNewVehicleDetails()}>Add</Button>
          <Button onClick={props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddVehiclesModal;
