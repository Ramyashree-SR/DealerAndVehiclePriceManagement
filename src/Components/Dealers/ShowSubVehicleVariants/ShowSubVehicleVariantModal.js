import React, { useEffect, useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { Box, Checkbox, TablePagination, Typography } from "@mui/material";
import {
  addVehicleVariantsInSubDealer,
  removeAllVehicleVariantsInSubDealer,
  showVehicleVariantsInSubDealerToAdd,
} from "../../service/subDealers";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ShowSubVehicleVariantModal(props) {
  const [removeRowData, setRemoveRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(props.showSubVariants, "showSubVariants");

  useEffect(() => {
    const tempArr = [];
    props.showSubVariants?.map((item) => {
      tempArr.push({ ...item });
    });
    // setRemoveRowData([...props.showVariants]);
  }, [props.showSubVariants]);

  const removeRowDataofVariantsFromTable = async (params, val) => {
    // let payload = [
    //   {
    //     variantID: value.variantID,
    //     variantName: value.variantName,
    //   },
    // ];
    let payload = [val];
    let { data } = await removeAllVehicleVariantsInSubDealer(params, payload);
    if (data?.data?.error === "FALSE") {
      props.getShowVariantsInSubDealers(props.subDealerID);
      props.getShowVariantsInSubDealersToAdd(props.subDealerID);
    }
  };

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        size="medium"
        aria-labelledby="contained-modal-title-center"
        centered
        width="100%"
        sx={{ height: 500, width: 500 }}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", m: 1 }}
              align="left"
            >
              Vehicle Variants of The Sub Dealers
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {props.showSubVariants
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((val, idx) => (
                  <tr key={idx}>
                    <td
                      colSpan={3}
                      cellSpacing={3}
                      style={{ fontWeight: "bold" }}
                    >
                      {val.variantID}
                    </td>
                    <td
                      colSpan={3}
                      cellSpacing={3}
                      style={{ fontWeight: "bold" }}
                    >
                      {val.variantName}
                    </td>
                    <td>
                      <DeleteIcon
                        onClick={() => {
                          removeRowDataofVariantsFromTable(
                            props.subDealerID,
                            val
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
            count={props?.showSubVariants?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
          <ChildModal
            subDealerID={props.subDealerID}
            showSubVariantsToAdd={props.showSubVariantsToAdd}
            removeRowData={removeRowData}
            getShowVariantsInSubDealers={props.getShowVariantsInSubDealers}
            getShowVariantsInSubDealersToAdd={
              props.getShowVariantsInSubDealersToAdd
            }
            close={props.close}
          />
        </Modal.Body>
        <ModalFooter>
          <Button onClick={props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function ChildModal(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedId, setselectedId] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [addvehicle, setaddvehicle] = useState([]);

  // useEffect(() => {
  //   const tempState = [];
  //   props.showSubVariantsToAdd?.map((item) => {
  //     tempState.push({ ...item, checked: false });
  //   });
  //   // console.log(tempState);
  //   setaddvehicle([...props.showSubVariantsToAdd]);
  // }, [props.showSubVariantsToAdd]);

  useEffect(() => {
    setaddvehicle(props.showSubVariantsToAdd);
  }, [props.showSubVariantsToAdd]);

  const isSelected = (id) => selectedId.indexOf(id) !== -1;

  function onCheckBoxClick(e, value, id) {
    // setchecked(!checked);
    // const tempState = [...addvehicle];
    // tempState[index].checked = e.target.checked;
    // setaddvehicle([...tempState]);
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
    // window.location.reload();
  }

  const adddisplayedVariantToTheTable = async (params) => {
    // const tempState = [...addvehicle];
    // const checkedValue = tempState.filter((val) => val.checked);
    // if (checkedValue.length > 0) {
    const payload = [];
    props?.showSubVariantsToAdd?.forEach((item) => {
      if (selectedId.includes(item.variantID)) {
        payload.push(item);
      }
    });
    const { data } = await addVehicleVariantsInSubDealer(params, payload);
    if (data?.data?.error === "False") {
      props.getShowVariantsInSubDealers(props.subDealerID);
      props.getShowVariantsInSubDealersToAdd(props.subDealerID);
      setselectedId([]);
      props.close();
    }
    // }
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
            <th style={{ fontWeight: "bold" }}>Variant ID</th>
            <th style={{ fontWeight: "bold" }}>Variant Name</th>
          </tr>
        </thead>

        <tbody className="table">
          {addvehicle
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              const isItemSelected = isSelected(item.variantID);
              return (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id="switch"
                      checked={isItemSelected}
                      onChange={(e) => {
                        onCheckBoxClick(e, item, item.variantID);
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: "bold" }}>{item.variantID}</td>
                  <td style={{ fontWeight: "bold" }}>{item.variantName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={addvehicle?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ alignItems: "center", justifyContent: "center" }}
      />
      <Button
        onClick={() => {
          adddisplayedVariantToTheTable(props.subDealerID);
        }}
      >
        Add
      </Button>
      {/* <Button onClick={() => setOpen(false)}>Close </Button> */}
    </>
  );
}

export default ShowSubVehicleVariantModal;
