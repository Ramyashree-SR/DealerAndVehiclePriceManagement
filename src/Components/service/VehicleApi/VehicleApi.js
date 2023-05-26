import serviceUtil from "../serviceUtil/ServiceUtils";
const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const getAllVehicleDetails = () => {
  return serviceUtil
    .get(`api/cag1/twowheelerlone/vehicaldata`)
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

const addAllNewVehicleDetails = (payload) => {
  return serviceUtil
    .post(`api/cag1/twowheelerlone/insertvehicle`, payload)
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

const editAllVehicleDetailsByRow = (params, payload) => {
  return serviceUtil
    .put(`api/cag1/twowheelerlone/editdata?variantID=${params}`, payload)
    .then((res) => {
      console.log(params, "dfghjk");
      console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllStateInVehicleDetails = () => {
  return serviceUtil
    .get(`api/cag1/twowheelerlone/vehicleallstate`)
    .then((res) => {
      // console.log(res, "resState");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllVehicleOEMDetails = (params) => {
  return serviceUtil
    .get(`api/cag1/twowheelerlone/vehiclealloem?state=${params}`)
    .then((res) => {
      // console.log(state,"state");
      // console.log(res, "resOem");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllVehicleModelDetails = (oem) => {
  return serviceUtil
    .get(`api/cag1/twowheelerlone/vehicleModels?oem=${oem}`)
    .then((res) => {
      console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

//all Oem  Api
const getVehicleOEM = () => {
  return serviceUtil
    .get(`alloem`)
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

///VehicleImage Uplod Api's
const getAllVehicleVariantsToUplodImage = () => {
  return serviceUtil
    .get(`checker/allvariants`)
    .then((res) => {
      console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const postAllVariantImageOnSelect = (payload) => {
  return serviceUtil
    .post(`checker/uploadVariantimage`, payload)
    .then((res) => {
      // console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const getAllVariantImageView = (variantId) => {
  return serviceUtil
    .get(`checker/viewvariantimage?variantID=${variantId}`)
    .then((res) => {
      // console.log(res, "res");
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export {
  getAllVehicleDetails,
  addAllNewVehicleDetails,
  editAllVehicleDetailsByRow,
  getAllStateInVehicleDetails,
  getAllVehicleOEMDetails,
  getAllVehicleModelDetails,
  getVehicleOEM,
  getAllVehicleVariantsToUplodImage,
  postAllVariantImageOnSelect,
  getAllVariantImageView,
};
