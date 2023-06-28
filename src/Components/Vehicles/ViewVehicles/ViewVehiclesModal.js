import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { editAllVehicleDetailsByRow } from "../../service/VehicleApi/VehicleApi";

function ViewVehiclesModal(props) {
  const [editVehicles, seteditVehicles] = useState({
    vehicleId: "",
    vehicleModel: "",
    vehicleVariant: "",
    vehicalOem: "",
    state: "",
    MaxLoanAmount: "",
    vehicalOnRoadPrice: "",
  });

  const updateChange = (event) => {
    seteditVehicles({
      ...editVehicles,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    seteditVehicles({ ...props.viewVehicleData });
  }, [props.viewVehicleData]);

  const editVehicleDetails = async (vehicleId) => {
    let payload = {
      // vehicleId:editVehicles?.vehicleId,
      vehicleModel: editVehicles?.vehicleModel,
      vehicleVariant: editVehicles?.vehicleVariant,
      vehicalOem: editVehicles?.vehicalOem,
      state: editVehicles?.vehicalState,
      vehicleMaxLoanAmount: editVehicles?.vehicleMaxLoanAmount,
      vehicalOnRoadPrice: editVehicles?.vehicalOnRoadPrice,
    };
    const { data } = await editAllVehicleDetailsByRow(vehicleId, payload);
    console.log(data, "editData");
    if (data) {
      seteditVehicles({
        vehicleModel: "",
        vehicleVariant: "",
        vehicalOem: "",
        state: "",
        vehicleMaxLoanAmount: "",
        vehicalOnRoadPrice: "",
      });
    }
    props.getVehicleVariantsDetails();
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
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            View Vehicle And Price Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body sx={{ backgroundColor: "#00000" }}>
          <Grid
            sx={{ m: 1, alignItems: "center", justifyContent: "space-around" }}
            key={editVehicles.vehicleId}
          >
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
            <TextField
              id="outlined-basic"
              label="Vehicle Model"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicleModel"
              value={editVehicles?.vehicleModel}
              onChange={(e) => updateChange(e)}
              disabled
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
              disabled
            />
            <TextField
              id="outlined-basic"
              label="On Road Price"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicalOnRoadPrice"
              value={editVehicles?.vehicalOnRoadPrice}
              onChange={(e) => updateChange(e)}
              disabled
            />

            <TextField
              id="outlined-basic"
              label="Max Loan Amount"
              variant="outlined"
              // size="small"
              sx={{ m: 1 }}
              name="vehicleMaxLoanAmount"
              value={editVehicles?.vehicleMaxLoanAmount}
              onChange={(e) => updateChange(e)}
              disabled
            />
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewVehiclesModal;
