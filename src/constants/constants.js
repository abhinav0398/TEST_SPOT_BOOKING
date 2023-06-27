const Constants = {
  appName: 'Ground Promotor App',
  bookingState: {
    source: 'source',
    destination: 'destination',
    ticketCount: 'ticketCount',
  },
  keyName: 'name',
  keyEmail: 'email',
  keyPhone: 'phone',
  keyPictureUrl: 'pictureUrl',
  keyUserId: 'UserId',
  keySessionId: 'sessionId',
  keyCity: 'city',
  SEARCH_TYPE_GOOGLE: 100, // remove them later
  SEARCH_TYPE_SERVER: 101,
  SEARCH_TYPE_CACHE: 102,
  SEARCH_RECENT_1: 'recentSearch_1',
  SEARCH_RECENT_2: 'recentSearch_2',
  SEARCH_RECENT_3: 'recentSearch_3',
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  PHONENUMBER: 'phoneNumber',
  defaultErrorMessage: {
    type: 'Error',
    message: 'something went wrong',
  },
  SELECTED_ROUTE: 'selectedRoute',
  FARE: 'fare',
  LOCATION: 'location',
  APP_VERSION: {
    A: 3600,
    B: 804,
  },
  CONFIG_TYPE: {
    PREMIUM: 'premium',
  },
  STATION_TYPE: {
    TRANSIT: 'transit',
  },
  CONFIGURATION: 'configuration',
  BOOKING: {
    STATUS: {
      CONFIRMED: 'CONFIRMED',
      CANCELLED: 'CANCELLED',
    },
    PRODUCT_TYPE: 'MobileTicket',
    PAYMENT_TYPE: [
      { type: 'CASH', provider: 'CASH', mode: 'GATEWAY' },
      { type: 'CARD', provider: 'CARD', mode: 'GATEWAY' },
      { type: 'UPI_QR', provider: 'UPI_QR', mode: 'GATEWAY' },
    ],
  },
};

export default Constants;
