import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passenger_id: '',
  passengerDetails: {},
  user_coupon_id: '',
  createPreOrderDetails: {
    orderId: '',
    amount: 0,
    bookingId: '',
    currency: '',
    userId: '',
    qrImage: '',
  },
};

const passengerFormSlice = createSlice({
  name: 'PassengerDetails',
  initialState,
  reducers: {
    setPassengerId: (state, action) => {
      state.passenger_id = action.payload;
    },
    setPassengerCouponId: (state, action) => {
      state.user_coupon_id = action.payload;
    },
    clearPassengerData: () => ({ ...initialState }),
    setPassengerDetailsInStore: (state, action) => {
      state.passengerDetails = action.payload;
    },
    createPreOrderDetailsInStore: (state, action) => {
      state.createPreOrderDetails = action.payload;
    },
  },
});

export const {
  setPassengerId,
  setPassengerCouponId,
  clearPassengerData,
  setPassengerDetailsInStore,
  createPreOrderDetailsInStore,
} = passengerFormSlice.actions;

export default passengerFormSlice.reducer;
