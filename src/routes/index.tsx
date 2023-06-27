/**
 * @name routes/index.tsx
 * @fileoverview Exports the frontend application's Router component,
 * Imports all the views defined in /views,
 * Each Route renders a React Component (views) out of /views,
 * Views are react components composed out of other react components from /components.
 */

import Url from 'config/url';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { setIsAuthenticated } from 'slices/home.Slice';
import { RootState } from 'store';
import AuthUtil from 'utils/authUtil';
import Login from 'views/Auth/Login';
import EnterOtp from 'views/Auth/Login/enterOtp';
import Home from 'views/Home';
import PassengerForm from 'views/PassengerDetails/passengerForm';
import PaymentOptions from 'views/paymentOptions';
import Search from 'views/search';
import SearchResultRoutes from 'views/searchResultRoutes';
import SearchResultSlots from 'views/searchResultSlots';

const Routes = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.home.authenticated,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const authenticated = AuthUtil.routeAuthCheck();
    dispatch(setIsAuthenticated(authenticated));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='app-container'>
      <Suspense fallback={<div>Loading...</div>}>
        {!isLoggedIn ? (
          <Switch>
            <Route exact path={Url.router.authInitiate} component={Login} />
            <Route path={Url.router.authVerify} component={EnterOtp} />
            <Redirect to={Url.router.authInitiate} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path={Url.router.home} component={Home} />
            <Route
              path={Url.router.routesResult}
              component={SearchResultRoutes}
            />
            <Route
              path={Url.router.slotsResult}
              component={SearchResultSlots}
            />
            <Route path={Url.router.passengerForm} component={PassengerForm} />
            <Route path={Url.router.passengerOtp} component={EnterOtp} />
            <Route
              path={Url.router.paymentOptions}
              component={PaymentOptions}
            />
            <Route path={Url.router.search} component={Search} />
            <Redirect to={Url.router.home} />
          </Switch>
        )}
      </Suspense>
    </div>
  );
};

export default Routes;
