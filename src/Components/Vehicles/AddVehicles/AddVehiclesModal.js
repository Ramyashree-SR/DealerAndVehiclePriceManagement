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

function AddVehiclesModal(props) {
  const [vehicleOEM, setVehicleOEM] = useState([]);
  // console.log(vehicleOEM, "vehicleOEM");
  const [showModel, setShowModel] = useState(false);
  // const showVariant = false;
  const [showModelComponent, setShowModelComponent] = useState(false);
  const [showVariant, setshowVariant] = useState(false);
  // const showVariant = false;
  const [showInputComponent, setShowInputComponent] = useState(false);
  const [vehcileState, setVehcileState] = useState([]);
  const [VehicleModels, setVehicleModels] = useState([]);
  const [vehicleVariant, setvehicleVariant] = useState([]);
  const [addNewVehicles, setaddNewVehicles] = useState({
    vehicleModel: "",
    vehicleVariant: "",
    vehicleOem: "",
    vehicleState: "",
    vehicleMaxLoanAmount: "",
    vehicalOnRoadPrice: "",
    exShowRoomPric: "",
  });

  const handleStateChange = (name, e, value) => {
    // console.log(value, "value");
    setaddNewVehicles(() => ({
      ...addNewVehicles,
      [name]: value,
    }));
  };

  const updateChange = (event) => {
    setaddNewVehicles({
      ...addNewVehicles,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    // getStateDetails();
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
    // console.log("value", value);

    setaddNewVehicles({
      ...addNewVehicles,
      [name]: value,
    });
    setShowModel(true);
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
      setvehicleVariant(modelData);
    } else {
      setshowVariant(true);
      setvehicleVariant([]);
    }
  };
  const addNewVehicleDetails = async () => {
    let payload = {
      // vehicleId:addNewVehicles?.vehicleId,
      vehicleModel: addNewVehicles?.vehicleModel,
      vehicleVariant: addNewVehicles?.vehicleVariant,
      vehicleOem: addNewVehicles?.vehicleOem,
      vehicleState: addNewVehicles?.vehicleState,
      vehicalOnRoadPrice: addNewVehicles?.vehicalOnRoadPrice,
      vehicleMaxLoan: addNewVehicles?.exShowRoomPric,
    };
    const { data } = await addAllNewVehicleDetails(payload);
    // console.log(data,"dataadd");
    if (data) {
      setaddNewVehicles({
        vehicleModel: "",
        vehicleVariant: "",
        vehicleOem: "",
        vehicleState: "",
        vehicalOnRoadPrice: "",
        vehicleMaxLoanAmount: "",
        exShowRoomPric: "",
      });
    }
    // props.getVehicleVariantsDetails(data?.data.data)
    props.close();
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
        <Modal.Header closeButton>
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
                    onChange={(e) => updateChange(e)}
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
                    label="Vehicle Model*"
                    variant="outlined"
                    // size="small"
                    sx={{ m: 1 }}
                    name="vehicleVariant"
                    value={addNewVehicles?.vehicleVariant}
                    onChange={(e) => updateChange(e)}
                  />
                </Box>
              ) : (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={vehicleVariant}
                  sx={{ m: 1, width: 224, ml: 1 }}
                  size="large"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Vehicle Variants"
                      onBlur={() => {
                        if (
                          addNewVehicles.vehicleVariant &&
                          addNewVehicles.vehicleVariant.id === 0
                        ) {
                          setaddNewVehicles({
                            ...addNewVehicles,
                            vehicleVariant: { id: "", label: "" },
                          });
                        }
                      }}
                    />
                  )}
                  name="vehicleVariant"
                  value={addNewVehicles?.vehicleVariant}
                  onChange={(e, val) => {
                    handleVehicleVariantChange("vehicleVariant", e, val);
                  }}
                  onInputChange={(name, value) => {
                    setaddNewVehicles({
                      ...addNewVehicles,
                      vehicleVariant: { id: 0, label: value },
                    });
                  }}
                  noOptionsText={
                    showVariant ? (
                      <Box>
                        <Box
                          onClick={() => addBtnClick()}
                          className="d-flex border rounded p-1 border-primary justify-content-around align-items-center cursor-pointer bg-info"
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
                id="outlined-basic"
                label="On Road Price*"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicalOnRoadPrice"
                value={addNewVehicles?.vehicalOnRoadPrice}
                onChange={(e) => updateChange(e)}
              />
            </Grid>
            <TextField
              id="outlined-basic"
              label="Max Loan Amount *"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicleMaxLoanAmount"
              value={addNewVehicles?.vehicleMaxLoanAmount}
              onChange={(e) => updateChange(e)}
            />
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
