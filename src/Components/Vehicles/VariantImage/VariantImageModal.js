import { Box, Grid, TablePagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  getAllVariantImageView,
  postAllVariantImageOnSelect,
} from "../../service/VehicleApi/VehicleApi";

function VariantImageModal(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allvariants, setallvariants] = useState([]);

  const handleFileChange = (e, id) => {
    const updatedVariant = allvariants.map((item) => {
      if (item.variantID === id) {
        return {
          ...item,
          filePath: e.target.files[0],
          fileName: e.target.files[0].name,
        };
      }
      return item;
    });
    setallvariants(updatedVariant);
  };
  const handleVariantsFileUpload = async (filePath, variantId) => {
    console.log(filePath);
    const payload = new FormData();
    payload.append("file", filePath);
    payload.append("variantID", variantId);
    const { data } = await postAllVariantImageOnSelect(payload);
    if (data) {
      // console.log(data, "data");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // console.log(props, "props");
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handlefileUpladedView = async (variantId) => {
    const { data } = await getAllVariantImageView(variantId);
  };

  const getallvariants = () => {
    const tempArr = [];
    props.allVariants.forEach((item) => {
      tempArr.push(item);
    });
    setallvariants(tempArr);
  };

  useEffect(() => {
    getallvariants();
  }, [props.allVariants]);

  return (
    <>
      <Modal
        show={props.show}
        close={props.close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="w-200"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            Vehicle Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th rowspan={1} scope="col">
                  Variant ID
                </th>
                <th rowspan={1} scope="col">
                  Variant Name
                </th>
                <th rowspan={1} scope="col">
                  Vehicle OEM
                </th>
                <th rowspan={1} scope="col"></th>
                <th rowspan={1} scope="col"></th>
              </tr>
            </thead>
            <tbody className="table table-info table-striped">
              {allvariants.length > 0 &&
                allvariants
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <tr>
                        <td
                          rowspan={1}
                          scope="col"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.variantID}
                        </td>
                        <td
                          rowspan={1}
                          scope="col"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.variantName}
                        </td>
                        <td
                          rowspan={1}
                          scope="col"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.oem}
                        </td>

                        <td rowspan={1} scope="col">
                          <div>
                            <div style={{ flexBasis: "50%" }}>
                              {props.btnhide ? null : (
                                <input
                                  type="file"
                                  title=" "
                                  onChange={(e) => {
                                    handleFileChange(e, item.variantID);
                                  }}
                                  style={{ color: "rgba(0, 0, 0, 0)" }}
                                  accept="image/png, image/jpeg"
                                />
                              )}
                            </div>

                            <div style={{ flexBasis: "50%" }}>
                              <Typography sx={{ ml: 20 }}>
                                {item.fileName === "...." ? "" : item.fileName}
                              </Typography>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div style={{ flexBasis: "50%" }}>
                              {props.btnhide ? null : (
                                <Button
                                  onClick={() => {
                                    handleVariantsFileUpload(
                                      item.filePath,
                                      item.variantID
                                    );
                                  }}
                                  style={{
                                    backgroundColor: "green",
                                    borderColor: "green",
                                  }}
                                >
                                  Upload
                                </Button>
                              )}
                            </div>
                            <div style={{ flexBasis: "50%" }}>
                              <a
                                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewvariantimage?variantID=${item.variantID}`}
                                //http://localhost:9666/viewvariantimage?variantID=${item.variantID}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() =>
                                  handlefileUpladedView(item.variantID)
                                }
                                style={{ marginLeft: "20px", color: "green" }}
                              >
                                View
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </Modal.Body>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={props.allVariants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ alignItems: "center", justifyContent: "center" }}
        />
        <Modal.Footer>
          <Button onClick={props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VariantImageModal;
