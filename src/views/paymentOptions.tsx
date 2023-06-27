import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import AlertDialog from 'components/AlertDialog';
import BackHeader from 'components/BackHeader';
import Base from 'components/base';
import BookingSuccess from 'components/Bookingsuccess';
import Url from 'config/url';
import Constants from 'constants/constants';
import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { clearPassengerData } from 'slices/passengerForm.Slice';
import { clearSelectedRoute } from 'slices/routes.Slice';
import { RootState } from 'store';
import AuthUtil from 'utils/authUtil';
import BookingUtil from 'utils/bookingUtil';
import HTTP from 'utils/http';
import BaseTheme from 'utils/theme';

const paymentDefaultData = {
  orderId: '',
  amount: 0,
  bookingId: '',
  currency: '',
  userId: '',
  qrImage: '',
};

const defaultErrorType = {
  type: '',
  message: '',
};

const PaymentOptions = () => {
  let history = useHistory();
  const [selectedProvider, setSelectedProvider] = useState('');
  const [paymentData, setPaymentData] = useState(paymentDefaultData);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [openCancelBookingDialog, setOpenCancelBookingDialog] = useState(false);
  const [showError, setShowError] = useState(defaultErrorType);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const passenger_id = useAppSelector(
    (state: RootState) => state.passengerData.passenger_id,
  );
  const user_coupon_id = useAppSelector(
    (state: RootState) => state.passengerData.user_coupon_id,
  );
  const selectedRoute = useAppSelector(
    (state: RootState) => state.routeDetails.selectedRoute,
  );
  let preOrderDetailsInStore = useAppSelector(
    (state: RootState) => state.passengerData.createPreOrderDetails,
  );
  const { fromStopId, toStopId, tripId, payableAmount } = selectedRoute;
  const tripFare = payableAmount;

  useEffect(() => {
    setPaymentData(preOrderDetailsInStore);
    setDisplayLoader(false);

    window.onbeforeunload = function (e) {
      setOpenCancelBookingDialog(true);
      return "Don't leave";
    };
    return () => {
      window.onbeforeunload = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackClick = () => {
    setOpenCancelBookingDialog(true);
  };
  const handleClose = () => {
    setOpenCancelBookingDialog(false);
  };
  const cancelBooking = () => {
    // setOpen(false);
    HTTP.post(
      Url.api.booking.create + `/${paymentData.orderId}/delete_reservation`,
    )
      .then(() => {
        dispatch(clearSelectedRoute());
        dispatch(clearPassengerData());
        history.replace(Url.router.home);
      })
      .catch((e) => {
        console.warn(e);
        if (e.response) {
          setShowError(e.response.data.error);
        } else {
          setShowError(Constants.defaultErrorMessage);
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let providerValue = (event.target as HTMLInputElement).value;
    setSelectedProvider(providerValue);
    // setDisplayLoader(true);
    // HTTP.post(Url.api.booking.create + `/${paymentData.orderId}/payments`, {
    //   payment_gateway: providerValue,
    // })
    //   .then((res) => {
    //     setDisplayLoader(false);
    //     setSelectedProvider(providerValue);
    //     setProviderInfo(res.data.data);
    //   })
    //   .catch((e) => {
    //     console.warn(e);
    //     if (e.response) {
    //       setShowError(e.response.data.error);
    //     } else {
    //       setShowError(Constants.defaultErrorMessage);
    //     }
    //   });
  };

  const onSendTickets = () => {
    setDisplayLoader(true);
    HTTP.post(
      Url.api.m_ticketing_version + Url.api.confirmBooking,
      {
        bookingId: paymentData.bookingId,
        productType: Constants.BOOKING.PRODUCT_TYPE,
        paymentType: selectedProvider,
        status: Constants.BOOKING.STATUS.CONFIRMED,
      },
      {
        headers: {
          source: 4,
          appVer: Constants.APP_VERSION.B,
          deviceId: 'ASD',
          accessToken: AuthUtil.getSessionId(),
          authType: '',
        },
      },
    )
      .then(() => {
        setShowSuccess(true);
        setDisplayLoader(false);
        BookingUtil.clearBookingDestination();
        dispatch(clearSelectedRoute());
        dispatch(clearPassengerData());
      })
      .catch((e) => {
        console.warn(e);
        if (e.response) {
          setShowError(e.response.data.error);
        } else {
          setShowError(Constants.defaultErrorMessage);
        }
      });
  };

  return (
    <Base displayLoader={displayLoader}>
      <div
        style={{
          backgroundColor: BaseTheme.colors.white,
          height: '100%',
          position: 'relative',
        }}
      >
        {!showSuccess ? (
          <>
            <BackHeader
              Title={`Pay ₹${tripFare}`}
              onBackClick={onBackClick}
              customTitle={() => null}
            />
            <div style={{ padding: 16 }}>
              <RadioGroup
                row
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={selectedProvider}
                onChange={handleChange}
              >
                {Constants.BOOKING.PAYMENT_TYPE.length > 0 &&
                  Constants.BOOKING.PAYMENT_TYPE.map((item) => {
                    let { type = '', provider = '' } = item;
                    return (
                      <FormControlLabel
                        key={type}
                        value={provider}
                        control={<Radio />}
                        label={type}
                      />
                    );
                  })}
              </RadioGroup>
              {paymentData.qrImage && selectedProvider !== 'CASH' ? (
                <img
                  src={paymentData.qrImage}
                  alt='QR code'
                  style={{ width: '100%' }}
                />
              ) : null}
              <Button
                fullWidth={true}
                disabled={!selectedProvider}
                variant='contained'
                size='large'
                style={{ marginTop: '37px', borderRadius: 0 }}
                onClick={onSendTickets}
              >
                <Typography>Book TICKET</Typography>
              </Button>

              <AlertDialog
                open={!!showError.type}
                title={'Error'}
                desc={showError.message}
                onClose={() => {
                  BookingUtil.clearBookingDestination();
                  history.replace(Url.router.home);
                }}
              />

              <Dialog
                open={openCancelBookingDialog}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  <b>Are you sure you want to cancel this booking?</b>
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    No
                  </Button>
                  <Button onClick={cancelBooking}>Yes</Button>
                </DialogActions>
              </Dialog>
            </div>
          </>
        ) : null}
        <BookingSuccess
          handleClose={() => {
            history.replace(Url.router.home);
          }}
          showSucess={showSuccess}
        />
      </div>
    </Base>
  );
};

export default PaymentOptions;
