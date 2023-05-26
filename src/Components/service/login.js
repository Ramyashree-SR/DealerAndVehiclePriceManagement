import serviceUtil from "./serviceUtil/ServiceUtils";

const getLoginDetails = (payload) => {
  return serviceUtil
    .post(`login`, payload)
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

export { getLoginDetails };
