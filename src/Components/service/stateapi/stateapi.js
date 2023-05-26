import serviceUtil from "../serviceUtil/ServiceUtils";

const getAllStateDetails = (oem) => {
  return serviceUtil
    .get(`statedropdown?oem=${oem}`)
    .then((res) => {
      // console.log(res, "stateRes");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err, "stateRes");
      const errRes = err;
      return { errRes };
    });
};

const stateDropDownApi = () => {
  return serviceUtil
    .get(`allstatesdropdown`)
    .then((res) => {
      console.log(res,"stateRes");
      const data = res;
      return { data };
    })
    .catch((err) => {
      // console.log(err);
      const errRes = err;
      return { errRes };
    });
};

export { getAllStateDetails,stateDropDownApi};
