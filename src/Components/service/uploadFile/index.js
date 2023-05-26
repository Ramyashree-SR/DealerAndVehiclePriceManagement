import serviceUtil from "../serviceUtil/ServiceUtils";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

const getUploadedDocumnetDetails = (params) => {
  return serviceUtil
    .get(`getdocumentstatus?dealerID=${params}`, config)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const uploadFileApi = (payload) => {
  return serviceUtil
    .post(`uploadfile`, payload)
    .then((res) => {
      const data = res;
      return { data };
    })
    .catch((err) => {
      const errRes = err;
      return { errRes };
    });
};

const downloadFileApi = (mainDealerID, documentType) => {
  return serviceUtil
    .get(
      `getfile?mainDealerID=${mainDealerID}&documentType=${documentType}`,
      config
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

const getDocumnetImageOnView = (mainDealerID, documentType) => {
  return serviceUtil
    .get(
      `viewimage?mainDealerID=${mainDealerID}&documentType=${documentType}`,
      config
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
  uploadFileApi,
  downloadFileApi,
  getUploadedDocumnetDetails,
  getDocumnetImageOnView,
};
