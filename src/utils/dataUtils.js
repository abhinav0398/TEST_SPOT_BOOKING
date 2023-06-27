const storageMethods = {
  get: (key) => {
    return sessionStorage.getItem(key);
  },
  remove: (key) => {
    return sessionStorage.removeItem(key);
  },
  set: (key, data) => {
    return sessionStorage.setItem(key, data);
  },
  clear: () => {
    return sessionStorage.clear();
  },
};

const DataUtils = {
  storage: storageMethods,
};

export default DataUtils;
