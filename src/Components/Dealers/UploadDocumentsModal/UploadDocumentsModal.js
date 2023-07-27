import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import {
  downloadFileApi,
  getDocumnetImageOnView,
  getUploadedDocumnetDetails,
  uploadFileApi,
} from "../../service/uploadFile";
import { useToasts } from "react-toast-notifications";
// import axios from "axios";

function UploadDocumentsModal(props) {
  const AgreementfileInput = React.useRef();
  const PancardfileInput = React.useRef();
  const KYCfileInput = React.useRef();
  const GstfileInput = React.useRef();
  const BankStatementfileInput = React.useRef();
  const PennyCheckfileInput = React.useRef();
  const ApproveMailsfileInput = React.useRef();

  // const [openViewModal, setopenViewModal] = useState(false);
  const [agreementfile, setagreementFile] = useState({
    file: {},
    filename: "",
  });
  const [pancard, setpancard] = useState({
    file: {},
    filename: "",
  });
  const [kycFile, setKycFile] = useState({
    file: {},
    filename: "",
  });
  const [gstcertify, setgstcertify] = useState({
    file: {},
    filename: "",
  });
  const [bankstatement, setbankstatement] = useState({
    file: {},
    filename: "",
  });
  const [pennycheck, setpennycheck] = useState({
    file: {},
    filename: "",
  });
  const [approvemails, setapprovemails] = useState({
    file: {},
    filename: "",
  });
  const mainDealerId = props.mainDealerID;
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImage1, setSelectedImage1] = useState();
  const [selectedImage2, setSelectedImage2] = useState();
  const [selectedImage3, setSelectedImage3] = useState();
  const [selectedImage4, setSelectedImage4] = useState();
  const [selectedImage5, setSelectedImage5] = useState();
  const [active, setactive] = useState(null);
  const [active1, setactive1] = useState(false);
  const [active2, setactive2] = useState(false);
  const [activate, setactivate] = useState(false);
  const [active3, setactive3] = useState(false);
  const [active4, setactive4] = useState(false);
  const [active5, setactive5] = useState(false);
  const { addToast } = useToasts();

  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    // Increment the refreshCount to trigger a re-render
    setRefreshCount((prevCount) => prevCount + 1);
  };
  const handleAgreementFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", agreementfile.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "AgreementFile");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive(data.data);
        addToast("File Uploaded", { appearance: "success" });
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
  };
  // console.log(active, agreementfile.filename, "item112");

  const handlePanCardDetailsUpload = async () => {
    const payload = new FormData();
    payload.append("file", pancard.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "PanCardDetails");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive1(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
  };

  const handleKYCFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", kycFile.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "KYCDetails");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive2(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    //
  };

  const handleGstCertificateUpload = async () => {
    const payload = new FormData();
    payload.append("file", gstcertify.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "GSTCertificate");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive3(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    // setactive3(!active3);
  };

  const handleBankStatementFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", bankstatement.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "BankStatement");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactivate(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    // setactivate(!activate);
  };

  const handlePennyCheckFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", pennycheck.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "PennyCheck");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive4(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    // setactive4(!active4);
  };

  const handleApprovMailsFileUpload = async () => {
    const payload = new FormData();
    payload.append("file", approvemails.file);
    payload.append("ID", mainDealerId);
    payload.append("documentType", "ApproveMails");
    const { data, errRes } = await uploadFileApi(payload);
    if (data.data) {
      if (data.data.error == "FALSE") {
        setactive5(data.data);
      }
    } else if (errRes) {
      addToast(errRes, { appearance: "error" });
    }
    // setactive5(!active5);
  };

  const handleAgreementFileDownload = async (mainDealerId, documentType) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
      // `http://localhost:9666/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
      //https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handlePanCardDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = filename;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleKYCFileDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleGstCertificateDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleBankStatementFileDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handlePennyCheckFileDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleApproveMailsDownload = async (
    mainDealerId,
    documentType,
    filename
  ) => {
    const response = await fetch(
      `https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`
    );

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = mainDealerId + "" + documentType;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleAgreementFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handlePanCardFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handleKycFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handleGSTCertificateFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handleBankStatementFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handlePennyCheckFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };
  const handleApproveMailsFileView = async (mainDealerId, documentType) => {
    const response = await getDocumnetImageOnView(mainDealerId, documentType);
  };

  useEffect(() => {
    getAllDocumentDetails();
  }, []);

  const getAllDocumentDetails = async () => {
    const { data } = await getUploadedDocumnetDetails(mainDealerId);
    if (data) {
      data?.data.forEach((item) => {
        if (item.documentType == "AgreementFile") {
          setactive(item);
        }
        if (item.documentType === "PanCardDetails") {
          setactive1(item);
          // setpancard({ filename: item.fileName });
        }
        if (item.documentType === "KYCDetails") {
          setactive2(item);
          // setKycFile({ filename: item.fileName });
        }
        if (item.documentType === "GSTCertificate") {
          setactive3(item);
          // setbankstatement({ filename: item.fileName });
        }
        if (item.documentType === "BankStatement") {
          setactivate(item);
          // setgstcertify({ filename: item.fileName });
        }
        if (item.documentType === "PennyCheck") {
          setactive4(item);
          // setpennycheck({ filename: item.fileName });
        }
        if (item.documentType === "ApproveMails") {
          setactive5(item);
          // setapprovemails({ filename: item.fileName });
        }
      });
    }
  };

  return (
    <>
      <Modal
        {...props}
        show={props.show}
        close={props.close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mw-100"
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-align-center"
          >
            Upload Documents
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Agreement
            </Typography>
            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => AgreementfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}

              <input
                ref={AgreementfileInput}
                type="file"
                style={{
                  display: "none",
                  background: agreementfile.file ? "green" : "blue",
                }}
                onChange={(e) => {
                  setagreementFile({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                }}
              />

              {(agreementfile.filename || active?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {active?.fileType ? active?.fileType : agreementfile.filename}
                </Typography>
              )}
              {/* {agreementfile.filename && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {agreementfile.filename}
                </Typography>
              )} */}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handleAgreementFileUpload();
                    handleRefresh();
                  }}
                  variant={active ? "contained" : "outlined"}
                  sx={
                    active && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}

              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handleAgreementFileDownload(mainDealerId, "AgreementFile")
                }
                className="m-2"
              >
                Download
              </Button>
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}`}
                //http://localhost:9666/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}
                //`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"AgreementFile"}`
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handleAgreementFileView(mainDealerId, "AgreementFile")
                }
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Pan Card
            </Typography>

            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => PancardfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={PancardfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setpancard({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                  // if (e.target.files && e.target.files.length > 0) {
                  //   setSelectedImage1(e.target.files[0]);
                  // }
                }}
              />

              {(pancard.filename || active1.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {pancard.filename ? pancard.filename : active1?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handlePanCardDetailsUpload();
                    handleRefresh();
                  }}
                  variant={active1 ? "contained" : "outlined"}
                  sx={
                    active1 && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}

              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handlePanCardDownload(
                    mainDealerId,
                    "PanCardDetails",
                    pancard.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"PanCardDetails"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handlePanCardFileView(mainDealerId, "PanCardDetails")
                }
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Dealer KYC
            </Typography>

            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => KYCfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={KYCfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setKycFile({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                  // if (e.target.files && e.target.files.length > 0) {
                  //   setSelectedImage1(e.target.files[0]);
                  // }
                }}
              />
              {(kycFile.filename || active2?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {kycFile.filename ? kycFile.filename : active2?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handleKYCFileUpload();
                    handleRefresh();
                  }}
                  variant={active2 ? "contained" : "outlined"}
                  sx={
                    active2 && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}

              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handleKYCFileDownload(
                    mainDealerId,
                    "KYCDetails",
                    kycFile.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"KYCDetails"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleKycFileView(mainDealerId, "KYCDetails")}
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              GST Certificate
            </Typography>
            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => GstfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={GstfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setgstcertify({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                }}
              />
              {(gstcertify.filename || active3?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {gstcertify.filename
                    ? gstcertify.filename
                    : active3?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handleGstCertificateUpload();
                    handleRefresh();
                  }}
                  variant={active3 ? "contained" : "outlined"}
                  sx={
                    active3 && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}

              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handleGstCertificateDownload(
                    mainDealerId,
                    "GSTCertificate",
                    gstcertify.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"GSTCertificate"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handleGSTCertificateFileView(mainDealerId, "GSTCertificate")
                }
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Bank Statement or Cancelled Cheque{" "}
            </Typography>
            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => BankStatementfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={BankStatementfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setbankstatement({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                  // if (e.target.files && e.target.files.length > 0) {
                  //   setSelectedImage3(e.target.files[0]);
                  // }
                }}
              />
              {(bankstatement.filename || activate?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {bankstatement.filename
                    ? bankstatement.filename
                    : activate?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handleBankStatementFileUpload();
                    handleRefresh();
                  }}
                  variant={activate ? "contained" : "outlined"}
                  sx={
                    activate && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}

              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handleBankStatementFileDownload(
                    mainDealerId,
                    "BankStatement",
                    bankstatement.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"BankStatement"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handleBankStatementFileView(mainDealerId, "BankStatement")
                }
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Penny Check Status ScreenShot
            </Typography>
            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => PennyCheckfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={PennyCheckfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setpennycheck({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                }}
              />
              {(pennycheck.filename || active4?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {pennycheck.filename
                    ? pennycheck.filename
                    : active4?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handlePennyCheckFileUpload();
                    handleRefresh();
                  }}
                  variant={active4 ? "contained" : "outlined"}
                  sx={
                    active4 && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}
              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handlePennyCheckFileDownload(
                    mainDealerId,
                    "PennyCheck",
                    pennycheck.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>

              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"PennyCheck"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handlePennyCheckFileView(mainDealerId, "PennyCheck")
                }
              >
                View
              </a>
            </form>
          </Grid>
          <Grid
            sx={{
              p: 2,
              m: 1,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", flexBasis: "30%" }}
            >
              Approval Mails
            </Typography>
            <form
              action="/action_page.php"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexBasis: "70%",
              }}
            >
              {props.hideButtons ? null : (
                <Button
                  variant="contained"
                  onClick={() => ApproveMailsfileInput.current.click()}
                >
                  Choose file
                </Button>
              )}
              <input
                ref={ApproveMailsfileInput}
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setapprovemails({
                    file: e.target.files[0],
                    filename: e.target.files[0].name,
                  });
                }}
              />

              {(approvemails.filename || active5?.fileType) && (
                <Typography sx={{ m: 2, width: 100 }}>
                  {approvemails.filename
                    ? approvemails.filename
                    : active5?.fileType}
                </Typography>
              )}

              {props.hideButtons ? null : (
                <Button
                  name="Upload"
                  onClick={() => {
                    handleApprovMailsFileUpload();
                    handleRefresh();
                  }}
                  variant={active5 ? "contained" : "outlined"}
                  sx={
                    active5 && {
                      background: "green",
                      color: "#FFFFFF",
                    }
                  }
                >
                  Upload
                </Button>
              )}
              <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handleApproveMailsDownload(
                    mainDealerId,
                    "ApproveMails",
                    approvemails.filename
                  )
                }
                className="m-2"
              >
                Download
              </Button>
              {/* <Button
                variant="outlined"
                name="Download"
                onClick={() => {
                  handleApproveMailsFileView(mainDealerId, "AgreementFile");
                  setopenViewModal(true);
                }}
                className="m-2"
              >
                View
              </Button> */}
              <a
                href={`https://caglcampaignleads.grameenkoota.in/TwoWheelerLoan/viewimage?mainDealerID=${mainDealerId}&documentType=${"ApproveMails"}`}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  handleApproveMailsFileView(mainDealerId, "ApproveMails")
                }
              >
                View
              </a>
            </form>
          </Grid>
        </Modal.Body>
        <ModalFooter>
          <Button onClick={props.close} variant="contained">
            close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const showImageButton = document.getElementById("show-image-button");
const myImage = document.getElementById("Approvmails");
// showImageButton.addEventListener("click", () => {
//    myImage.style.display = "block";

// });
export default UploadDocumentsModal;
// await axios
//   .get(
//     `http://localhost:9666/getfile?mainDealerID=${mainDealerId}&documentType=${documentType}`,
//     {
//       method: "GET",
//       responseType: "blob", // important
//     }
//   )
//   .then((response) => {
//     console.log(response, "response");
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     console.log(url, "response");
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `name`);
//     document.body.appendChild(link);
//     link.click();
//   });
{
  /* <Button
                variant="outlined"
                name="Download"
                onClick={() =>
                  handlePanCardFileView(mainDealerId, "AgreementFile")
                }
                className="m-2"
              >
                View
              </Button> */
}
{
  /* <img
                src={`http://localhost:9666/viewimage?mainDealerID=${mainDealerId}&documentType=${"PanCardDetails"}`}
                alt=""
                id="pancardDetails"
                width="100px"
                height="40px"
                onClick={() =>
                  handleApproveMailsFileView(mainDealerId, "PanCardDetails")
                }
              /> */
}
{
  /* {selectedImage1 && (
                <img
                  src={URL.createObjectURL(selectedImage1)}
                  alt="pancard"
                  width="50px"
                  height="30px"
                />
              )} */
}
