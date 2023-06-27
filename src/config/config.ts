const appConfig = {
  baseApiUrl: process.env.REACT_APP_API_BACKEND_URL,
};

const getConfig = (() => {
  return appConfig;
})();

export default getConfig;
