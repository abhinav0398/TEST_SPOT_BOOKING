import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import BackHeader from 'components/BackHeader';
import { useHistory, useLocation } from 'react-router-dom';
import BaseTheme from 'utils/theme';
import Url from 'config/url';
import Base from 'components/base';
import HTTP from 'utils/http';
import AuthUtil from 'utils/authUtil';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'slices/home.Slice';
import Constants from 'constants/constants';

const EnterOtp = () => {
  let timeLeft = 30;
  var timerId: string | number | NodeJS.Timeout | undefined;

  let [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState('');
  const [displayLoader, setDisplayLoader] = useState(false);
  const [timer, setTimer] = useState(timeLeft);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const search = useLocation().search;
  let errorMessage = 'Invalid OTP. Please check OTP and try again';

  const phoneNumber = new URLSearchParams(search).get('phone');

  useEffect(() => {
    startCountdown();

    return () => {
      timerId && clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otp.length === 4) {
      onsubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.substring(0, 4));
    otpError && setOtpError('');
  };

  const onsubmit = () => {
    if (
      otp &&
      otp.length >= 4 &&
      otp.length <= 6 &&
      isNaN(parseInt(otp)) === false
    ) {
      setDisplayLoader(true);

      HTTP.post(Url.api.auth.verify, {
        mobile_number: phoneNumber,
        otp: otp,
      })
        .then(function (response) {
          if (response.data && response.data.data && response.data.data.id) {
            const data = response.data.data;
            AuthUtil.setSessionId(response.data.data.id);
            dispatch(setIsAuthenticated(true));
            AuthUtil.setUser(
              '-',
              data.email,
              phoneNumber,
              data.id,
              data.user.id,
            );
            history.replace(Url.router.home);
          } else {
            setDisplayLoader(false);
          }
        })
        .catch((e) => {
          let error;
          if (e.response) {
            error = e.response.data.error;
            errorMessage = error.message;
          } else {
            errorMessage = Constants.defaultErrorMessage.message;
          }
          setOtpError(errorMessage);
          setDisplayLoader(false);
        });
    } else {
      //error
      setOtpError(errorMessage);
    }
  };

  const onResentOtp = () => {
    setDisplayLoader(true);
    HTTP.post(Url.api.auth.resendOtp, {
      mobile_number: phoneNumber,
    })
      .then(() => {
        setDisplayLoader(false);
        setTimer(timeLeft);
        startCountdown();
      })
      .catch((e) => {
        if (e.response) {
          let error = e.response.data.error;
          errorMessage = error.message;
        } else {
          errorMessage = Constants.defaultErrorMessage.message;
        }
        setOtpError(errorMessage);
        setDisplayLoader(false);
      });
  };

  const startCountdown = () => {
    timerId = setInterval(() => {
      setTimer((timer) => {
        if (timer <= 0) {
          clearTimeout(timerId);
          return 0;
        }
        return timer - 1;
      });
    }, 1000);
  };

  return (
    <>
      <Base title='Enter OTP' displayLoader={displayLoader}>
        <div
          style={{
            backgroundColor: 'white',
            // height: '100%',
            position: 'relative',
          }}
        >
          <BackHeader Title={'OTP'} />
          <div style={{ padding: 16, position: 'relative' }}>
            <TextField
              autoFocus
              variant='standard'
              fullWidth={true}
              type='number'
              id='Otp'
              label='Enter OTP'
              error={!!otpError}
              helperText={otpError ? otpError : ''}
              sx={{ color: BaseTheme.colors.textPrimary, marginTop: '8px' }}
              value={otp}
              onChange={handleChange}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 16,
                height: '36px',
              }}
            >
              <Typography>Sent to {phoneNumber}</Typography>
              <Button variant='text' disabled={!!timer} onClick={onResentOtp}>
                <Typography
                  id='timer'
                  style={{ color: BaseTheme.colors.primary }}
                >
                  {timer
                    ? timer > 9
                      ? `00:${timer}`
                      : `00:0${timer}`
                    : 'Resend'}
                </Typography>
              </Button>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
};

export default EnterOtp;
