import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  addAllNewVehicleDetails,
  getVehicleOEM,
} from "../../service/VehicleApi/VehicleApi";
import { stateDropDownApi } from "../../service/stateapi/stateapi";

function AddVehiclesModal(props) {
  const [vehicleOEM, setVehicleOEM] = useState([]);
  const [vehcileState, setVehcileState] = useState([]);
  const [addNewVehicles, setaddNewVehicles] = useState({
    vehicleModel: "",
    vehicleVariant: "",
    vehicleOem: "",
    vehicleState: "",
    vehicleMaxLoanAmount: "",
    vehicalOnRoadPrice: "",
  });

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

  const updateChange = (event) => {
    setaddNewVehicles({
      ...addNewVehicles,
      [event.target.name]: event.target.value,
    });
  };
  const handleVehicleOEMChange = (name, event, value) => {
    // console.log(name,value,"ejhgf");
    setaddNewVehicles({
      ...addNewVehicles,
      [name]: value,
    });
  };

  const handleStateChange = (name, e, value) => {
    // console.log(value, "value");
    setaddNewVehicles(() => ({
      ...addNewVehicles,
      [name]: value,
    }));
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
  const addNewVehicleDetails = async () => {
    let payload = {
      // vehicleId:addNewVehicles?.vehicleId,
      vehicleModel: addNewVehicles?.vehicleModel,
      vehicleVariant: addNewVehicles?.vehicleVariant,
      vehicleOem: addNewVehicles?.vehicleOem,
      vehicleState: addNewVehicles?.vehicleState,
      vehicalOnRoadPrice: addNewVehicles?.vehicalOnRoadPrice,
      vehicleMaxLoanAmount: addNewVehicles?.vehicleMaxLoanAmount,
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
      });
    }
    // props.getVehicleVariantsDetails(data?.data.data)
    props.close();
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
                  <TextField {...params} label="Select State" />
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
                  <TextField {...params} label="Select OEM" />
                )}
                name="vehicleOem"
                value={addNewVehicles?.vehicleOem}
                onChange={(e, val) =>
                  handleVehicleOEMChange("vehicleOem", e, val)
                }
              />

              <TextField
                id="outlined-basic"
                label="Vehicle Model"
                variant="outlined"
                // size="small"
                sx={{ m: 1 }}
                name="vehicleModel"
                value={addNewVehicles?.vehicleModel}
                onChange={(e) => updateChange(e)}
              />
            </Grid>

            <TextField
              id="outlined-basic"
              label="Vehicle Variant"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicleVariant"
              value={addNewVehicles?.vehicleVariant}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="On Road Price"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicalOnRoadPrice"
              value={addNewVehicles?.vehicalOnRoadPrice}
              onChange={(e) => updateChange(e)}
            />

            <TextField
              id="outlined-basic"
              label="Max Loan Amount"
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
