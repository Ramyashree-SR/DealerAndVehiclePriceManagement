import serviceUtil from "./serviceUtil/ServiceUtils";

const getLoginDetails = (payload) => {
  return serviceUtil
    .post(`login/userlogin`, payload)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err && err.response && err.response.data;
      return { errRes };
    });
};

export { getLoginDetails };
