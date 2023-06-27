import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedRoute: {
    fromStopId: '',
    toStopId: '',
    tripId: '',
    routeId: '',
    routeName: '',
    fromStopTime: 0,
    toStopTime: 0,
    vehicleCapacity: 0,
    availableSeats: 0,
    actualAmount: 0,
    payableAmount: 0,
  },
};

const routesSlice = createSlice({
  name: 'Routes',
  initialState,
  reducers: {
    setSelectedRoute: (state, action) => {
      state.selectedRoute = action.payload;
    },
    clearSelectedRoute: (state) => ({ ...initialState }),
    getUser: () => {},
  },
});

export const { setSelectedRoute, clearSelectedRoute, getUser } =
  routesSlice.actions;

export default routesSlice.reducer;
