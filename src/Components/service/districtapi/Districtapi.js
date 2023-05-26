import serviceUtil from "../serviceUtil/ServiceUtils";

const getAllDistrictDetails = (state) => {
  return serviceUtil
    .get(`districtdropdown?state=${state}`)
    .then((res) => {
      console.log(res,"districtres");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

const getDistrictDetailsByState = (params) => {
  return serviceUtil
    .get(`regiondropdown?state=${params}`)
    .then((res) => {
      // console.log(res, "regionres");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

const getAreaDetailsByStateandRegion = (state, payload) => {
  return serviceUtil
    .post(`areadropdown?state=${state}`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

const getDistrictDetailsByStateInSubDealers = (params) => {
  return serviceUtil
    .get(`regiondropdown?state=${params}`)
    .then((res) => {
      // console.log(res, "regionres");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

const getAreaDetailsByStateandRegionInSubDealers = (state, payload) => {
  return serviceUtil
    .post(`areadropdown?state=${state}`, payload)
    .then((res) => {
      // console.log(payload,"payload");
      console.log(res, "areares");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

export {
  getAllDistrictDetails,
  getDistrictDetailsByState,
  getAreaDetailsByStateandRegion,
  getDistrictDetailsByStateInSubDealers,
  getAreaDetailsByStateandRegionInSubDealers,
};
