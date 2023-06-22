import serviceUtil from "../serviceUtil/ServiceUtils";
const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const getAllVehicleDetails = () => {
  return serviceUtil
    .get(`vehicaldata`)
    .then((res) => {
      console.log(res, "response");
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
    .post(`insertvehicle`, payload)
    .then((res) => {
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
    .put(`editdata?variantID=${params}`, payload)
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
    .get(`vehicleallstate`)
    .then((res) => {
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
    .get(`vehiclealloem?state=${params}`)
    .then((res) => {
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
    .get(`vehicleModels?oem=${oem}`)
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

const getAllVehicleVariantDetails = (vehicleModel) => {
  return serviceUtil
    .get(`vehiclevariantdropdown?vehicleModel=${vehicleModel}`)
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
    .get(`allvariants`)
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
    .post(`uploadVariantimage`, payload)
    .then((res) => {
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
    .get(`viewvariantimage?variantID=${variantId}`)
    .then((res) => {
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
  getAllVehicleVariantDetails,
  getVehicleOEM,
  getAllVehicleVariantsToUplodImage,
  postAllVariantImageOnSelect,
  getAllVariantImageView,
};
