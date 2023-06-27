// import * as Sentry from '@sentry/react';
import Constants from 'constants/constants.js';

const getSessionId = () => {
  let sid = localStorage.getItem(Constants.keySessionId);
  if (
    sid != null &&
    sid !== undefined &&
    sid !== 'undefined' &&
    sid.length > 0
  ) {
    return sid;
  }
  return null;
};

const AuthUtil = {
  getName: () => {
    return localStorage.getItem(Constants.keyName);
  },
  getEmail: () => {
    return localStorage.getItem(Constants.keyEmail);
  },
  getPhone: () => {
    return localStorage.getItem(Constants.keyPhone);
  },
  getPictureUrl: () => {
    return localStorage.getItem(Constants.keyPictureUrl);
  },
  getCity: () => {
    return localStorage.getItem(Constants.keyCity);
  },
  getUserId: () => {
    let userId = window.localStorage.getItem(Constants.keyUserId);
    if (userId != null && userId !== undefined && userId.length > 0) {
      return userId;
    }
    return null;
  },
  getSessionId: getSessionId,
  setUser: (name, email, phone, sessionId, userId, pictureUrl, city) => {
    if (name) localStorage.setItem(Constants.keyName, name);

    if (email) localStorage.setItem(Constants.keyEmail, email);

    if (phone) localStorage.setItem(Constants.keyPhone, phone);

    if (userId) window.localStorage.setItem(Constants.keyUserId, userId);

    if (sessionId) localStorage.setItem(Constants.keySessionId, sessionId);

    if (pictureUrl) localStorage.setItem(Constants.keyPictureUrl, pictureUrl);

    if (city) localStorage.setItem(Constants.keyCity, city);
  },
  setSessionId: (sessionId) => {
    localStorage.setItem(Constants.keySessionId, sessionId);
  },
  clear: () => {
    localStorage.removeItem(Constants.keyName);
    localStorage.removeItem(Constants.keyEmail);
    localStorage.removeItem(Constants.keyPhone);
    localStorage.removeItem(Constants.keyUserId);
    localStorage.removeItem(Constants.keySessionId);
    localStorage.removeItem(Constants.keyPictureUrl);
    localStorage.removeItem(Constants.keyCity);
  },
  routeAuthCheck: () => {
    if (!getSessionId()) {
      return false;
    } else {
      // uncomment later

      // Sentry.setUser({ id: AuthUtil.getPhone(), email: AuthUtil.getEmail() });
      return true;
    }
  },
};

export default AuthUtil;
