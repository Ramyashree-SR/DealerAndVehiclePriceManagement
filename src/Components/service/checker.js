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

///subDealer Checker Apis

// const getSubDealersDetailsPendingDetails = () => {
//   return serviceUtil
//     .get(`checker/allcheckerdealers`)
//     .then((res) => {
//       //   console.log(res, "res");
//       const data = res.data;
//       return { data };
//     })
//     .catch((err) => {
//       const errRes = err;
//       return { errRes };
//     });
// };

export {
  getDealersAndSubDealersDetailsPendingDetails,
  getStatusDetails,
  // getSubDealersDetailsPendingDetails,
};
