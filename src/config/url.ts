import Config from './config';

const Url = {
  baseUrl: Config.baseApiUrl,
  api: {
    searchSource: '/api/v1/stops/for_origin',
    searchDestination: '/api/v1/stops/for_destination',
    searchStops: '/search',
    scheduler_version: '/scheduler_v4/v4/',
    tub_version: '/tub/v1/',
    m_ticketing_version: '/mticketing/v2/',
    odPair: '/stopPairsBetweenPoints',
    trips: 'trips',
    mTicketFare: 'mobile-ticket/fare',
    configuration_version: '/configuration/v4/cities/',
    products: '/products',
    createPreOrder: 'auth/reserve-ticket/order',
    confirmBooking: 'auth/reserve-ticket/order/status',
    getBookingInfo: 'auth/reserve-ticket/order/booking-info',
    slots: {
      base: '/api/v1/slots/',
    },
    auth: {
      initiate: '/api/v1/promoters',
      verify: '/api/v1/sessions',
      resendOtp: '/api/v1/sessions/otp',
    },
    booking: {
      create: '/api/v1/orders',
      cancel: '/delete_reservation',
      details: '/api/v1/bookings/by_promoter',
    },
    user: {
      createPassengers: '/api/v1/passengers',
    },
  },
  router: {
    home: '/',
    slots: '/slots',
    routesResult: '/routesResult',
    slotsResult: '/slotsResult',
    passengerForm: '/PassengerForm',
    passengerOtp: '/PassengerOtp',
    paymentOptions: '/paymentOptions',
    search: '/search/:type',
    authInitiate: '/auth/initiate',
    authVerify: '/auth/verify',
    notFound: '*',
  },
};

export default Url;
