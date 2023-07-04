import serviceUtil from "./serviceUtil/ServiceUtils";

const getAllMainDealersDetails = (params) => {
  return serviceUtil
    .get(`getmaindealers?flag=${params}`)
    .then((res) => {
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
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;
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
      return { errRes };
    });
};

///Vehicleoem Api

//For Filters in Dealer and SubDealer Details
const getAllVehicleOEM = () => {
  return serviceUtil
    .get(`getoems`)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

//For Adding the Dealer ALL oem Api's
const getVehicleOEM = () => {
  return serviceUtil
    .get(`alloem`)
    .then((res) => {
      // console.log(res,"res");
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
    .getWithResp(`mainvariants?mainDealerID=${params}`)
    .then((res) => {
      // console.log(res,"mainVar");
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
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeAllVehicleVariantsInMainDealer = (params, payload) => {
  return serviceUtil
    .deleteById(`removemainvariant?mainDealerID=${params}`, payload)
    .then((res) => {
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
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllBranchesToAddInMainDealer = (mainDealerID) => {
  return serviceUtil
    .getWithResp(`showmainbranches?mainDealerID=${mainDealerID}`)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addAllBranchesInMainDealer = (params, payload) => {
  return serviceUtil
    .post(`addmainbranch?mainDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeAllBranchesInMainDealer = (params, payload) => {
  return serviceUtil
    .deleteById(`removemainbranch?mainDealerID=${params}`, payload)
    .then((res) => {
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
