let authToken = () => {
  let tokenCredentials = JSON.parse(sessionStorage.getItem("jwtData"));
   return tokenCredentials;
};
export default authToken;