import React, { useEffect, useState } from 'react';
import SlotsSearchHeader from 'components/search/slotsSearchHeader';
import Url from 'config/url';
import { useHistory } from 'react-router-dom';
import BookingUtil from 'utils/bookingUtil';
import AuthUtil from 'utils/authUtil';
import HTTP from 'utils/http';
import Base from 'components/base';
import { Button, List } from '@mui/material';
import SlotsCard from 'components/search/slotsCard';
import { setSelectedRoute } from 'slices/routes.Slice';
import { useAppDispatch } from 'hooks';
import ShuttlCard from 'components/shuttlCard';
import BaseTheme from 'utils/theme';
import NoRouteData from 'icons/noRouteData';
import AlertDialog from 'components/AlertDialog';
import Constants from 'constants/constants';
import moment from 'moment';

const SearchResultSlots = () => {
  const [allRoutes, setAllRoutes] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [showError, setShowError] = useState({ type: '', message: '' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [adultFare, setAdultFare] = useState({});
  const dispatch = useAppDispatch();
  // const bookingState;

  const history = useHistory();
  useEffect(() => {
    getData();
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    fetchFare(index, null);
  };

  const fetchFare = (index: number, slotsData?: any) => {
    // bookingState = BookingUtil.getBookingState();
    const apiUrl = `${Url.api.m_ticketing_version}${Url.api.mTicketFare}`;
    let routes: any;
    if (!slotsData) routes = allRoutes;
    else routes = slotsData;
    HTTP.post(apiUrl, {
      routeId: routes[index]['routeId'],
      startStopId: routes[index]['fromStopId'],
      endStopId: routes[index]['toStopId'],
      filters: {
        tripId: routes[index]['tripId'],
        configurationId: BookingUtil.getConfigurationId(),
      },
      city: AuthUtil.getCity(),
    })
      .then(function (fare) {
        console.log('fare: ', fare.data.passengerDetails);
        const fareObj: any = fare.data.passengerDetails.find((ele: any) =>
          ele.id.includes('adult'),
        );

        routes[index]['actualAmount'] = fareObj.actualAmount;
        routes[index]['payableAmount'] = fareObj.payableAmount;
        setAllRoutes(routes);
        setAdultFare(fareObj);
        BookingUtil.setFareDetails({
          actualAmount: fareObj.actualAmount,
          payableAmount: fareObj.payableAmount,
        });
        setDisplayLoader(false);
      })
      .catch((e) => {
        if (e.response) {
          setShowError(e.response.data.error);
        } else {
          setShowError(Constants.defaultErrorMessage);
        }
        setDisplayLoader(false);
      });
  };

  const getData = () => {
    setDisplayLoader(true);
    const selectedRoute = BookingUtil.getSelectedRoute();
    if (AuthUtil.getSessionId()) {
      const city = AuthUtil.getCity();
      const apiUrl = `${Url.api.tub_version}${Url.api.trips}`;
      HTTP.get(apiUrl, {
        params: {
          fromStopId: selectedRoute.fromStopId,
          toStopId: selectedRoute.toStopId,
          fetchAvailableSeats: false,
          windowStartTime: moment().valueOf(),
          windowEndTime: moment().add(8, 'hours').valueOf(),
          city,
        },
      })
        .then(function (slots: any) {
          setDisplayLoader(false);
          fetchFare(0, slots.data);
        })
        .catch((e) => {
          if (e.response) {
            setShowError(e.response.data.error);
          } else {
            setShowError(Constants.defaultErrorMessage);
          }
          setDisplayLoader(false);
        });
    }
  };

  return (
    <Base displayLoader={displayLoader}>
      <div style={{ position: 'relative' }}>
        <SlotsSearchHeader />
        <div style={{ padding: '18px 16px 40px 16px' }}>
          <List disablePadding>
            {allRoutes.map((item: any, index: number) => {
              return (
                <SlotsCard
                  slot={item}
                  SlotIndex={index}
                  selectedIndex={selectedIndex}
                  adultFare={adultFare}
                  cardOnClick={(
                    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
                    index: number,
                  ) => handleListItemClick(event, index)}
                />
              );
            })}

            {!displayLoader && !allRoutes.length ? (
              <ShuttlCard title='SLots'>
                <div
                  style={{
                    textAlign: 'center',
                    padding: BaseTheme.spacing.high,
                  }}
                >
                  <NoRouteData />
                  <div
                    style={{
                      marginTop: BaseTheme.spacing.high,
                      fontWeight: 500,
                    }}
                  >
                    No Slots Found
                  </div>
                </div>
              </ShuttlCard>
            ) : null}
          </List>
        </div>

        {!displayLoader && allRoutes.length ? (
          <div
            style={{
              position: 'fixed',
              maxWidth: 600,
              bottom: 0,
              // left: 16,
              // right: 16,
              zIndex: 997,
              width: '100%',
              boxShadow: 'rgba(0, 0, 0, 0.117647) 0px -2px 4px',
            }}
          >
            <Button
              variant='contained'
              size='large'
              fullWidth
              sx={{ borderRadius: 0 }}
              onClick={() => {
                let selectedRoute = allRoutes[selectedIndex];
                dispatch(setSelectedRoute(selectedRoute));
                history.push(Url.router.passengerForm);
              }}
            >
              Continue
            </Button>
          </div>
        ) : null}

        <AlertDialog
          open={!!showError.message}
          title={'Error'}
          desc={showError.message}
          onClose={() => {
            history.goBack();
          }}
        />
      </div>
    </Base>
  );
};

export default SearchResultSlots;
