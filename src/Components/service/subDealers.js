import serviceUtil from "./serviceUtil/ServiceUtils";

const getAllSubDealersDetails = (params) => {
  return serviceUtil
    .get(`getsubdealers?mainDealerID=${params}`)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addSubDealersDetails = (params, payload) => {
  return serviceUtil
    .post(`addsubdealer?mainDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const editSubDealersDetails = (params, payload) => {
  return serviceUtil
    .put(`editsubdealer?subDealerID=${params}`, payload)

    .then((res) => {
      console.log(params, "params");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

//Vehicle Variant Api
const showVehicleVariantsInSubDealer = (params) => {
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
};

const showVehicleVariantsInSubDealerToAdd = (params) => {
  return serviceUtil
    .get(`subvariants?subDealerID=${params}`)
    .then((res) => {
      console.log(res,"response");
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addVehicleVariantsInSubDealer = (params, payload) => {
  return serviceUtil
    .post(`addsubvariant?subDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeAllVehicleVariantsInSubDealer = (params, payload) => {
  return serviceUtil
    .deleteById(`removesubvariant?subDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

///Branches Api

const getAllBranchesInSubDealer = (params) => {
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
};

const getAllBranchesInSubDealerToAdd = (params) => {
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
};

const addBranchesInSubDealer = (params, payload) => {
  return serviceUtil
    .post(`addsubbranch?subDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const removeBranchesInSubDealer = (params, payload) => {
  return serviceUtil
    .deleteById(`removesubbranch?subDealerID=${params}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const addAllBranchesofMainDealerInSubDealer = (mainDealerID, subDealerID) => {
  return serviceUtil
    .post(
      `addallmainbranches?mainDealerID=${mainDealerID}&subDealerID=${subDealerID}`
    )
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
  getAllSubDealersDetails,
  addSubDealersDetails,
  editSubDealersDetails,
  showVehicleVariantsInSubDealer,
  showVehicleVariantsInSubDealerToAdd,
  addVehicleVariantsInSubDealer,
  removeAllVehicleVariantsInSubDealer,
  getAllBranchesInSubDealer,
  getAllBranchesInSubDealerToAdd,
  addBranchesInSubDealer,
  removeBranchesInSubDealer,
  addAllBranchesofMainDealerInSubDealer,
};
