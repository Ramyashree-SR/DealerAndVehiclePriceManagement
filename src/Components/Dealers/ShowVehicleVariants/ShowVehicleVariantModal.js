import React, { useEffect, useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import {
  addAllVehicleVariantsInMainDealer,
  removeAllVehicleVariantsInMainDealer,
  showVehicleVariantsToAddInMainDealer,
} from "../../service/dealers";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  bgcolor: "#581845",
};

function ShowVehicleVariantModal(props) {
  const [removeRowData, setRemoveRowData] = useState([]);

  useEffect(() => {
    const tempArr = [];
    props.showVariants?.map((item) => {
      tempArr.push({ ...item });
    });
    // setRemoveRowData([...props.showVariants]);
  }, [props.showVariants]);

  const removeRowDataofVariantsFromTable = async (params, value) => {
    let payload = [
      {
        variantID: value.variantID,
        variantName: value.variantName,
      },
    ];

    let { data } = await removeAllVehicleVariantsInMainDealer(params, payload);
    console.log("data", data);
    if (data?.data?.error === "FALSE") {
      props.getShowVariantsInMainDealers(props.mainDealerID);
      props.getAllAddVariantsDetails(props.mainDealerID);
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        size="medium"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        width="100%"
        sx={{ height: 200, width: 500, ...style }}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" sx={{ ...style }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", m: 1 }}
              align="left"
            >
              Vehicle Variants of The Dealers
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
            Vehicle Variants
          </Typography>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th align="right" colSpan={2} scope="col">
                  Variant ID
                </th>
                <th align="right" colSpan={10} scope="col">
                  Variant Name
                </th>
              </tr>
            </thead>

            <tbody className="table table-success table-striped">
              {props.showVariants?.map((value, idx) => (
                <tr key={idx}>
                  <td
                    colSpan={3}
                    cellSpacing={3}
                    style={{ fontWeight: "bold" }}
                  >
                    {value.variantID}
                  </td>
                  <td
                    colSpan={3}
                    cellSpacing={3}
                    style={{ fontWeight: "bold" }}
                  >
                    {value.variantName}
                  </td>

                  <td>
                    <DeleteIcon
                      onClick={() => {
                        removeRowDataofVariantsFromTable(
                          props.mainDealerID,
                          value
                        );
                      }}
                      size="large"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr
            style={{
              borderWidth: 3,
              borderStyle: "dashed",
              borderColor: "#CA2908",
            }}
          />
          <ChildModal
            showAddVariants={props.showAddVariants}
            mainDealerID={props.mainDealerID}
            removeRowData={removeRowData}
            getShowVariantsInMainDealers={props.getShowVariantsInMainDealers}
            getAllAddVariantsDetails={props.getAllAddVariantsDetails}
          />
        </Modal.Body>
        <ModalFooter>
          <Button onClick={props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const ChildModal = (props) => {
  const [addMainVariant, setAddMainVariant] = useState([]);

  useEffect(() => {
    const tempState = [];
    props.showAddVariants?.map((item) => {
      tempState.push({ ...item, checked: false });
    });
    console.log(tempState);
    setAddMainVariant([...props.showAddVariants]);
  }, [props.showAddVariants]);

  function onCheckBoxClick(e, index) {
    const tempState = [...addMainVariant];
    console.log(tempState, "tempp");
    tempState[index].checked = e.target.checked;
    setAddMainVariant([...tempState]);
  }

  const addAllVehicleVariantsInMainDealerOnSelect = async (params) => {
    const tempState = [...addMainVariant];
    const checkedValue = tempState.filter((val) => val.checked);
    if (checkedValue.length > 0) {
      const { data } = await addAllVehicleVariantsInMainDealer(
        params,
        checkedValue
      );
      if (data?.data?.error === "False") {
        props.getShowVariantsInMainDealers(props.mainDealerID);
        props.getAllAddVariantsDetails(props.mainDealerID);
      }
    }
  };

  console.log("state", addMainVariant);
  return (
    <>
      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
        Vehicle Variants to be Added
      </Typography>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th></th>
            <th align="right" colSpan={2} scope="col">
              Variant ID
            </th>
            <th align="right" colSpan={10} scope="col">
              Variant Name
            </th>
          </tr>
        </thead>

        <tbody className="table  ">
          {addMainVariant?.map((val, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="checkbox"
                  id="switch"
                  checked={val.checked}
                  value=""
                  onChange={(e) => {
                    onCheckBoxClick(e, idx);
                  }}
                />
              </td>
              <td colSpan={3} cellSpacing={3} style={{ fontWeight: "bold" }}>
                {val.variantID}
              </td>
              <td colSpan={3} cellSpacing={3} style={{ fontWeight: "bold" }}>
                {val.variantName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box className="d-flex align-Items-center justify-content-center">
        <Button
          onClick={() => {
            addAllVehicleVariantsInMainDealerOnSelect(props.mainDealerID);
          }}
          style={{ backgroundColor: "green", borderColor: "green" }}
        >
          Add variants
        </Button>
      </Box>
    </>
  );
};

export default ShowVehicleVariantModal;
