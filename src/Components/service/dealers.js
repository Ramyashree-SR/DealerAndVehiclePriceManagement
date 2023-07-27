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
const showVehicleVariantsInMainDealer = (params) => {
  let vehicleId = params?.split("-")[params?.split("-").length - 1];
  if (vehicleId === "A01") {
    return serviceUtil
      .get(`avaliablemainvariants?mainDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  } else {
    return serviceUtil
      .get(`avaliablesubvariants?subDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  }
};

const showVehicleVariantsToAddInMainDealer = (params) => {
  let vehicleId = params?.split("-")[params?.split("-").length - 1];
  if (vehicleId === "A01") {
    return serviceUtil
      .getWithResp(`mainvariants?mainDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  } else {
    return serviceUtil
      .getWithResp(`subvariants?subDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  }
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
  let array = params?.split("-")[params?.split("-").length - 1];
  if (array === "A01") {
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
  } else {
    return serviceUtil
      .get(`showavaliablesubbranches?subDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  }
};

const getAllBranchesToAddInMainDealer = (params) => {
  let array = params?.split("-")[params?.split("-").length - 1];
  if (array === "A01") {
    return serviceUtil
      .getWithResp(`showmainbranches?mainDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  } else {
    return serviceUtil
      .getWithResp(`showsubbranches?subDealerID=${params}`)
      .then((res) => {
        const data = res;
        return { data };
      })
      .catch((err) => {
        const errRes = err;
        return { errRes };
      });
  }
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
