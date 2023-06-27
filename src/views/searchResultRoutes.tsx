import React, { useEffect, useState } from 'react';
import SearchHeader from 'components/search/searchHeader';
import Url from 'config/url';
import { useHistory } from 'react-router-dom';
import BookingUtil from 'utils/bookingUtil';
import AuthUtil from 'utils/authUtil';
import HTTP from 'utils/http';
import Base from 'components/base';
import { Button, List } from '@mui/material';
import RoutesCard from 'components/search/routesCard';
import { setSelectedRoute } from 'slices/routes.Slice';
import { useAppDispatch } from 'hooks';
import ShuttlCard from 'components/shuttlCard';
import BaseTheme from 'utils/theme';
import NoRouteData from 'icons/noRouteData';
import AlertDialog from 'components/AlertDialog';
import Constants from 'constants/constants';

const SearchResultRoutes = () => {
  const [allRoutes, setAllRoutes] = useState([]);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [showError, setShowError] = useState({ type: '', message: '' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useAppDispatch();

  const history = useHistory();
  useEffect(() => {
    getData();
    // BookingUtil.setConfigurationId('Cwo23hsGb');
    getConfigurationId();
  }, []);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    BookingUtil.setSelectedRoute(allRoutes[index]);
  };

  const getConfigurationId = () => {
    const city = AuthUtil.getCity();
    const apiUrl = `${Url.api.configuration_version}${city}${Url.api.products}`;
    HTTP.get(apiUrl, {
      params: {
        appVer: Constants.APP_VERSION.A,
        configType: Constants.CONFIG_TYPE.PREMIUM,
      },
    })
      .then(function (config) {
        setDisplayLoader(false);
        if (
          config.data.products &&
          config.data.products.length &&
          config.data.products[0].id
        ) {
          BookingUtil.setConfigurationId(config.data.products[0].id);
        }
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
    let bookingState = BookingUtil.getBookingState();
    if (AuthUtil.getSessionId()) {
      const city = AuthUtil.getCity();
      const apiUrl = `${Url.api.scheduler_version}${city}${Url.api.odPair}`;
      HTTP.get(apiUrl, {
        params: {
          serviceType: Constants.CONFIG_TYPE.PREMIUM,
          fromId: bookingState.source.stop_name
            ? bookingState.source.stop_id
            : bookingState.source.place_id,
          fromIdType: bookingState.source.stop_name ? 'stop' : 'place',
          toId: bookingState.destination.stop_name
            ? bookingState.destination.stop_id
            : bookingState.destination.place_id,
          toIdType: bookingState.destination.stop_name ? 'stop' : 'place',
          appVersion: Constants.APP_VERSION.B,
          // ticket_count: bookingState.ticketCount,
        },
      })
        .then(function (slotsResponse) {
          if (slotsResponse.data) {
            if (slotsResponse.data.length) {
              setAllRoutes(slotsResponse.data);
              BookingUtil.setSelectedRoute(slotsResponse.data[0]);
              setDisplayLoader(false);
            } else {
              //no data
              setAllRoutes([]);
              setDisplayLoader(false);
            }
          }
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
        <SearchHeader />
        <div style={{ padding: '18px 16px 40px 16px' }}>
          <List disablePadding>
            {allRoutes.map((item: any, index: number) => {
              return (
                <RoutesCard
                  slot={item}
                  SlotIndex={index}
                  selectedIndex={selectedIndex}
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
                history.push(Url.router.slotsResult);
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

export default SearchResultRoutes;
