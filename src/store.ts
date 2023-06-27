import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas/rootSaga';
import homeSlice from 'slices/home.Slice';
import passengerFormSlice from 'slices/passengerForm.Slice';
import routesSlice from 'slices/routes.Slice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  home: homeSlice,
  routeDetails: routesSlice,
  passengerData: passengerFormSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
