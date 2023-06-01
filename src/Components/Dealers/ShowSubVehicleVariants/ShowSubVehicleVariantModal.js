import React, { useState } from "react";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { Box, Checkbox, Typography } from "@mui/material";
import { addVehicleVariantsInSubDealer, showVehicleVariantsInSubDealerToAdd } from "../../service/subDealers";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function ChildModal(props) { 
    
   
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const [showVariantToAdd, setShowVariantToAdd] = useState([]);


  const showVehicleVariantsToAdd = async (params) => {
    const { data } = await showVehicleVariantsInSubDealerToAdd(params);
  
    if (data) {
      if (data) {
        let showData = data?.data?.data;
        setShowVariantToAdd(showData);
      }
    }
  };

  const [addvehicle, setaddvehicle] = useState([])
 

const adddisplayedVariantToTheTable=async(params)=>{
    let payload={
        variantID:addvehicle?.variantID,
        variantName:addvehicle?.variantName,
    }
const {data}=await addVehicleVariantsInSubDealer(params,payload)
   
    if(data){
        if(data){
          let tempArr=[]
          data?.map((temp)=>(
            tempArr.push(temp)
          ))
          setaddvehicle(tempArr)
           
        }
        
    }
  }


  return (
    <React.Fragment>
      <Button
        onClick={() => {
          handleOpen();
          showVehicleVariantsToAdd(props.subDealerID);
        }}
      >
        Add Variants
      </Button>
      <Modal
        show={open}
        close={() => setOpen(false)}
        size="medium"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        sx={{ height: "100%", width: 700 }}
      >
        <Box sx={{ ...style,width: 400,height:400 }}>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th></th>
                <th style={{ fontWeight: "bold" }}>variant ID</th>
                <th style={{ fontWeight: "bold" }}>Variant Name</th>
              </tr>
            </thead>
            
            <tbody  className="table table-success table-striped">
              {showVariantToAdd?.map((item,index) => (
                <tr key={item.variantID}>
                     <td>
                  <input
                        type="checkbox"
                       value={showVariantToAdd}
                        className="form-check-input"
                        id="rowcheck{user.id}"
                        // onChange={(event)=>{handleChange(event,item.variantID);}}
                      />
                  </td>
                 <td style={{ fontWeight: "bold" }}>{item.variantID}</td>
                  <td style={{ fontWeight: "bold" }}>{item.variantName}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={() => {adddisplayedVariantToTheTable(props.subDealerID);}}>Add </Button>
          <Button onClick={() => setOpen(false)}>Close </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function ShowSubVehicleVariantModal(props) {
  //  const {addVariants}=props


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
              {props.showSubVariants?.map((val, idx) => (
                <tr key={idx} >
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
                </tr>
              ))}
            </tbody>
          </table>
          <ChildModal subDealerID={props.subDealerID} />
        </Modal.Body>
        <ModalFooter>
          <Button onClick={props.close}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ShowSubVehicleVariantModal;
