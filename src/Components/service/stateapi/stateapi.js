import serviceUtil from "../serviceUtil/ServiceUtils";

const getAllStateDetails = (oem) => {
  return serviceUtil
    .get(`statedropdown?oem=${oem}`)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const stateDropDownApi = () => {
  return serviceUtil
    .get(`allstatesdropdown`)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { getAllStateDetails,stateDropDownApi};
