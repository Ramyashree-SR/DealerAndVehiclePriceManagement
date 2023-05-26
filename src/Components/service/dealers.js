import serviceUtil from "./serviceUtil/ServiceUtils";

const getAllMainDealersDetails = (params) => {
  return serviceUtil
    .get(`getmaindealers?flag=${params}`)
    .then((res) => {
      // console.log(res,"res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addMainDealersDetails = (payload) => {
  return serviceUtil
    .post(`addmaindealer`, payload)
    .then((res) => {
      // console.log(res, "response add maindealer");
      // console.log(payload, "payload");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;
      // console.log(errRes, "errRes");
      return { errRes };
    });
};

const editMainDealersDetails = (mainDealerID, payload) => {
  return serviceUtil
    .put(`editmaindealer?mainDealerID=${mainDealerID}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;
      console.log(errRes, "errRes");
      return { errRes };
    });
};

///Vehicleoem Api

//For Filters in Dealer and SubDealer Details
const getAllVehicleOEM = () => {
  return serviceUtil
    .get(`getoems`)
    .then((res) => {
      // console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

//For Addinfg the Dealer ALL oem Api's
const getVehicleOEM = () => {
  return serviceUtil
    .get(`alloem`)
    .then((res) => {
      console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

//Vehicle Variants Apis
const showVehicleVariantsInMainDealer = (mainDealerID) => {
  return serviceUtil
    .get(`avaliablemainvariants?mainDealerID=${mainDealerID}`)
    .then((res) => {
      // console.log(res,"responseshowvarianta");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const showVehicleVariantsToAddInMainDealer = (params) => {
  return serviceUtil
    .get(`mainvariants?mainDealerID=${params}`)
    .then((res) => {
      // console.log(params,"params");
      // console.log(res, "responseshowvariant");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addAllVehicleVariantsInMainDealer = (params, payload) => {
  return serviceUtil
    .post(`addmainvariant?MainDealerID=${params}`, payload)
    .then((res) => {
      // console.log(res,"response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeAllVehicleVariantsInMainDealer = (params, payload) => {
  console.log("payload", payload);
  return serviceUtil
    .deleteById(`removemainvariant?mainDealerID=${params}`, payload)
    .then((res) => {
      // console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

///Branch Api's
const getAllBranchesInMainDealer = (params) => {
  return serviceUtil
    .get(`showavaliablemainbranches?mainDealerID=${params}`)
    .then((res) => {
      // console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllBranchesToAddInMainDealer = (mainDealerID) => {
  // console.log("params", params);
  return serviceUtil
    .getWithResp(`showmainbranches?mainDealerID=${mainDealerID}`)
    .then((res) => {
      // console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addAllBranchesInMainDealer = (params, payload) => {
  // console.log("params", params);
  return serviceUtil
    .post(`addmainbranch?mainDealerID=${params}`, payload)
    .then((res) => {
      console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeAllBranchesInMainDealer = (params, payload) => {
  // console.log("params", params);
  return serviceUtil
    .deleteById(`removemainbranch?mainDealerID=${params}`, payload)
    .then((res) => {
      // console.log(res, "response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export {
  getAllMainDealersDetails,
  addMainDealersDetails,
  editMainDealersDetails,
  getAllVehicleOEM,
  getVehicleOEM,
  showVehicleVariantsInMainDealer,
  showVehicleVariantsToAddInMainDealer,
  addAllVehicleVariantsInMainDealer,
  removeAllVehicleVariantsInMainDealer,
  getAllBranchesInMainDealer,
  getAllBranchesToAddInMainDealer,
  addAllBranchesInMainDealer,
  removeAllBranchesInMainDealer,
};
