import serviceUtil from "./serviceUtil/ServiceUtils";

const getDealersAndSubDealersDetailsPendingDetails = () => {
  return serviceUtil
    .get(`checker/allcheckerdealers`)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getStatusDetails = (dealerID, payload) => {
  return serviceUtil
    .post(`checker/updatestatusoredit?dealerID=${dealerID}`, payload)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;

      return { errRes };
    });
};

//vehicle Api
const getVehiclePricePendingDetails = () => {
  return serviceUtil
    .get(`getCheckerVehicleData`)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getVehiclePriceStatus = (variantID, payload) => {
  return serviceUtil
    .post(`editOrApproveCheckerData?id=${variantID}`, payload)
    .then((res) => {
      console.log(res, "response");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;
      return { errRes };
    });
};

export {
  getDealersAndSubDealersDetailsPendingDetails,
  getStatusDetails,
  getVehiclePriceStatus,
  getVehiclePricePendingDetails,
};
