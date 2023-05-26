import axios from "axios";
import serviceUtil from "./serviceUtil/ServiceUtils";

const downloadeExcelofDealerAndSubDealerDetails = () => {
  return axios
    .get(`http://10.10.51.64:9666/downloadexcel`)
    .then((res) => {
      const data = res.data;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

export { downloadeExcelofDealerAndSubDealerDetails };
