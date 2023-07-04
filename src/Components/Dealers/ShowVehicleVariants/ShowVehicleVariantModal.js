import React, { useEffect, useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { Box, TablePagination, Typography } from "@mui/material";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [removeRowData, setRemoveRowData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const tempArr = [];
    props.showVariants?.map((item) => {
      tempArr.push({ ...item });
    });
    // setRemoveRowData([...props.showVariants]);
  }, [props.showVariants]);

  const removeRowDataofVariantsFromTable = async (params, value) => {
    let payload = [value];
    const { data } = await removeAllVehicleVariantsInMainDealer(
      params,
      payload
    );
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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mw-100"
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
                <th align="center" scope="col">
                  Variant ID
                </th>
                <th align="center" scope="col">
                  Variant Name
                </th>
                <th></th>
              </tr>
            </thead>

            <tbody className="table table-success table-striped">
              {props.showVariants
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: "bold" }} colSpan={1}>
                      {value.variantID}
                    </td>
                    <td style={{ fontWeight: "bold" }} colSpan={1}>
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
                        fontSize="large"
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={props.showVariants?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [addMainVariant, setAddMainVariant] = useState([]);
  const [selectedId, setselectedId] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setAddMainVariant(props.showAddVariants);
  }, [props.showAddVariants]);

  const isSelected = (id) => selectedId.indexOf(id) !== -1;

  function onCheckBoxClick(e, value, id) {
    const selectedIndex = selectedId.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedId, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedId.slice(1));
    } else if (selectedIndex === selectedId.length - 1) {
      newSelected = newSelected.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      );
    }
    setselectedId(newSelected);
  }

  // function onCheckBoxClick(e, index) {
  //   const tempState = [...addMainVariant];
  //   console.log(tempState, "tempp");
  //   tempState[index].checked = e.target.checked;
  //   setAddMainVariant([...tempState]);
  // }

  // useEffect(() => {
  //   const tempState = [];
  //   props.showAddVariants?.map((item) => {
  //     tempState.push({ ...item, checked: false });
  //   });
  //   console.log(tempState);
  //   setAddMainVariant([...props.showAddVariants]);
  // }, [props.showAddVariants]);

  // function onCheckBoxClick(e, index) {
  //   const tempState = [...addMainVariant];
  //   console.log(tempState, "tempp");
  //   tempState[index].checked = e.target.checked;
  //   setAddMainVariant([...tempState]);
  // }

  const addAllVehicleVariantsInMainDealerOnSelect = async (params) => {
    const payload = [];
    props.showAddVariants.forEach((item) => {
      if (selectedId.includes(item.variantID)) {
        payload.push(item);
      }
    });
    const { data } = await addAllVehicleVariantsInMainDealer(params, payload);
    if (data?.data?.error === "False") {
      props.getShowVariantsInMainDealers(props.mainDealerID);
      props.getAllAddVariantsDetails(props.mainDealerID);
      setselectedId([]);
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
        Vehicle Variants to be Added
      </Typography>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th></th>
            <th align="center" scope="col">
              Variant ID
            </th>
            <th align="center" scope="col">
              Variant Name
            </th>
          </tr>
        </thead>

        <tbody className="table">
          {addMainVariant
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((val, idx) => {
              const isItemSelected = isSelected(val.variantID);
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      id="switch"
                      checked={isItemSelected}
                      onChange={(e) => {
                        onCheckBoxClick(e, val, val.variantID);
                      }}
                    />
                  </td>
                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.variantID}
                  </td>
                  <td colSpan={1} style={{ fontWeight: "bold" }}>
                    {val.variantName}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={addMainVariant?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignItems: "center", justifyContent: "center" }}
      />
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
