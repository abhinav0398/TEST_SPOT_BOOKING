import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import BaseTheme from 'utils/theme';
import CloseIcon from '@mui/icons-material/Close';
import AuthUtil from 'utils/authUtil';
import Url from 'config/url';
import HTTP from 'utils/http';
import DateTimeUtil from 'utils/dateTimeUtil';
import { setIsAuthenticated } from 'slices/home.Slice';
import { useAppDispatch } from 'hooks';
import BookingUtil from 'utils/bookingUtil';
import AlertDialog from './AlertDialog';
import Constants from 'constants/constants';

const textStyle = {
  fontWeight: 'bold',
  fontSize: '14px',
};

interface MyBookingType {
  totalBookingCount: number;
  totalBookingAmount: number;
  totalCashPayment: number;
  totalOnlinePayment: number;
}

const dafaultBookingValue = {
  totalBookingCount: 0,
  totalBookingAmount: 0,
  totalCashPayment: 0,
  totalOnlinePayment: 0,
};

const MyBookingsDetail = (props: any) => {
  let { onCloseClick, setDisplayLoader } = props;
  let [bookingData, setBookingData] =
    useState<MyBookingType>(dafaultBookingValue);
  let {
    totalBookingCount = 0,
    totalBookingAmount = 0,
    totalCashPayment = 0,
    totalOnlinePayment = 0,
  } = bookingData;

  let todayDate = DateTimeUtil.formatDate(new Date());
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState({ type: '', message: '' });

  useEffect(() => {
    var startTime = new Date();
    startTime.setHours(0, 0, 0, 0);
    //booking info api
    setDisplayLoader(true);
    HTTP.get(Url.api.m_ticketing_version + Url.api.getBookingInfo, {
      params: {
        promoterId: '8447124572',
      },
      headers: {
        source: 4,
        appVer: Constants.APP_VERSION.B,
        deviceId: 'ASD',
        accessToken: AuthUtil.getSessionId(),
        authType: '',
      },
    })
      .then((res) => {
        setBookingData(res.data);
        setDisplayLoader(false);
      })
      .catch((e) => {
        console.warn(e);
        if (e.response) {
          setErrorMsg(e.response.data.error);
        } else {
          setErrorMsg(Constants.defaultErrorMessage);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogoutClick = () => {
    let session_id = AuthUtil.getSessionId();
    HTTP.delete(Url.api.auth.verify + `/${session_id}`)
      .then((res) => {
        dispatch(setIsAuthenticated(false));
        AuthUtil.clear();
        BookingUtil.clearBookingState();
        history.replace(Url.router.authInitiate);
      })
      .catch((e) => {
        console.warn(e);
        if (e.response) {
          setErrorMsg(e.response.data.error);
        } else {
          setErrorMsg(Constants.defaultErrorMessage);
        }
      });
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 997,
        backgroundColor: BaseTheme.colors.header,
        color: BaseTheme.colors.white,
      }}
    >
      <div
        style={{
          backgroundColor: BaseTheme.colors.header,
          height: 56,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          edge='end'
          color='inherit'
          onClick={onCloseClick}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '22px',
          paddingBottom: '28px',
        }}
      >
        <Typography sx={textStyle}>Today, {todayDate}</Typography>
        <Typography sx={{ ...textStyle, fontSize: '36px' }}>
          ₹ {totalBookingAmount}
        </Typography>
        <Typography sx={textStyle}>
          {totalBookingCount} Tickets Issued
        </Typography>
      </div>
      <Divider sx={{ backgroundColor: 'white' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          paddingTop: '24px',
          paddingBottom: '24px',
        }}
      >
        <div>
          <Typography sx={textStyle}>Cash</Typography>
          <Typography sx={{ ...textStyle, fontSize: '28px' }}>
            ₹ {totalCashPayment}
          </Typography>
        </div>
        <div>
          <Typography sx={textStyle}>Digital</Typography>
          <Typography sx={{ ...textStyle, fontSize: '28px' }}>
            ₹ {totalOnlinePayment}
          </Typography>
        </div>
      </div>
      <Divider sx={{ backgroundColor: 'white' }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='contained'
          size='large'
          style={{
            marginTop: '38px',
            borderRadius: 0,
            height: '48px',
            width: '155px',
          }}
          onClick={onLogoutClick}
        >
          <Typography sx={textStyle}>LOGOUT</Typography>
        </Button>
      </div>

      <AlertDialog
        open={!!errorMsg.type}
        title={'Error'}
        desc={errorMsg.message}
        onClose={() => {
          setErrorMsg({ type: '', message: '' });
        }}
      />
    </div>
  );
};

export default MyBookingsDetail;
