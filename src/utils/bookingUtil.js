import DataUtils from '../utils/dataUtils.js';
import Url from 'config/url';
import Constants from 'constants/constants.js';

const BookingUtil = {
  getBookingState: () => {
    return {
      source: JSON.parse(DataUtils.storage.get(Constants.bookingState.source)),
      destination: JSON.parse(
        DataUtils.storage.get(Constants.bookingState.destination),
      ),
      ticketCount: DataUtils.storage.get(Constants.bookingState.ticketCount),
    };
  },
  setBookingStateForType: (type, data) => {
    DataUtils.storage.set(type, data);
  },
  clearBookingState: () => {
    DataUtils.storage.remove(Constants.bookingState.source);
    DataUtils.storage.remove(Constants.bookingState.destination);
  },
  clearBookingDestination: () => {
    DataUtils.storage.remove(Constants.bookingState.destination);
  },
  getSMCUrl: (bookingState) => {
    return (
      Url.startMyRoute +
      '/#home?origin=msite&fromLat=' +
      bookingState.source.lat +
      '&fromLng=' +
      bookingState.source.lng +
      '&fromLocationName=' +
      bookingState.source.name +
      '&toLat=' +
      bookingState.destination.lat +
      '&toLng=' +
      bookingState.destination.lng +
      '&toLocationName=' +
      bookingState.destination.name
    );
  },
  saveStarredRoutes: (data) => {
    localStorage.setItem('starredRoutes', JSON.stringify(data));
  },
  getStarredRoutes: () => {
    return JSON.parse(localStorage.getItem('starredRoutes'));
  },
  getSelectedRoute: () => {
    return JSON.parse(DataUtils.storage.get(Constants.SELECTED_ROUTE));
  },
  setSelectedRoute: (data) => {
    DataUtils.storage.set(Constants.SELECTED_ROUTE, JSON.stringify(data));
  },
  clearSelectedRoute: () => {
    DataUtils.storage.remove(Constants.SELECTED_ROUTE);
  },
  getFareDetails: () => {
    return JSON.parse(DataUtils.storage.get(Constants.FARE));
  },
  setFareDetails: (fare) => {
    DataUtils.storage.set(Constants.FARE, JSON.stringify(fare));
  },
  removeFareDetails: () => {
    DataUtils.storage.remove(Constants.FARE);
  },
  setLocation: (location) => {
    DataUtils.storage.set(Constants.LOCATION, JSON.stringify(location));
  },
  getLocation: () => {
    return JSON.parse(DataUtils.storage.get(Constants.LOCATION));
  },
  getConfigurationId: () => {
    return JSON.parse(DataUtils.storage.get(Constants.CONFIGURATION));
  },
  setConfigurationId: (configId) => {
    DataUtils.storage.set(Constants.CONFIGURATION, JSON.stringify(configId));
  },
  removeConfigurationId: () => {
    DataUtils.storage.remove(Constants.CONFIGURATION);
  },
};

export default BookingUtil;
