import React, { useEffect, useState } from 'react';
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { RootState } from 'store';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import Url from 'config/url';
import HTTP from 'utils/http';
import {
  setPassengerCouponId,
  setPassengerDetailsInStore,
  setPassengerId,
  createPreOrderDetailsInStore,
} from 'slices/passengerForm.Slice';
import BackHeader from 'components/BackHeader';
import BottomCTA from 'components/BottomCTA';
import Constants from 'constants/constants';
import AlertDialog from 'components/AlertDialog';
import AuthUtil from 'utils/authUtil';
import BookingUtil from 'utils/bookingUtil';

const PassengerForm = () => {
  const passengerFormDefaultData = {
    passengerName: '',
    phoneNumber: '',
    gender: '',
  };

  let [passengerDetails, setpassengerDetails] = useState<{
    [key: string]: string;
  }>(passengerFormDefaultData);

  const [showPhoneError, setShowPhoneError] = useState('');
  const [errorMsg, setErrorMsg] = useState({ type: '', message: '' });
  let passengerDetailsInStore = useAppSelector(
    (state: RootState) => state.passengerData.passengerDetails,
  );
  let selectedRoute = useAppSelector(
    (state: RootState) => state.routeDetails.selectedRoute,
  );

  let errorMessage = 'Please enter a valid 10 digit mobile number';
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetch pre-filled values from store
    if (Object.keys(passengerDetailsInStore).length) {
      setpassengerDetails({ ...passengerDetailsInStore });
    }

    // navigate to home if no route is selected
    if (!selectedRoute['tripId']) {
      history.push(Url.router.home);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field: string = e.target.id || e.target.name;
    let value = e.target.value || '';
    if (field === Constants.PHONENUMBER) {
      value = e.target.value.substring(0, 10);
    }

    if (field === 'coupon_code') {
      value = value.toUpperCase();
    }

    passengerDetails[field] = value;
    setpassengerDetails({ ...passengerDetails });
    showPhoneError && setShowPhoneError('');
  };

  const validateDetails = () => {
    setShowPhoneError('');
    let phoneNumber = passengerDetails.phoneNumber;
    let isValid = true;

    let number = parseInt(phoneNumber);
    let pattern = new RegExp(/^[^.]*$/);

    if (
      !(
        phoneNumber.length === 10 &&
        isNaN(number) === false &&
        pattern.test(phoneNumber)
      )
    ) {
      isValid = false;
      setShowPhoneError(errorMessage);
    }

    return isValid;
  };

  const onsubmit = () => {
    if (passengerDetails.phoneNumber && validateDetails()) {
      // submitDetails();
      createPreOrder();
    }
    if (!passengerDetails.phoneNumber) createPreOrder(); //submitDetails();
    return null;
  };

  const createPreOrder = () => {
    const preOrder = {
      bookingId: 'oja8e',
      orderId: 'promoter_aibhsd',
      amount: 1000, // in paisa
      currency: 'INR',
      userId: '8447124572',
      qrImage: 'https://cdn.shuttlstage.xyz/static/staging_static_qr_code.jpeg',
    };
    dispatch(setPassengerId(preOrder.userId));
    dispatch(setPassengerDetailsInStore(passengerDetails));
    dispatch(createPreOrderDetailsInStore(preOrder));
    history.replace(Url.router.paymentOptions);

    // HTTP.post(`${Url.api.m_ticketing_version}${Url.api.createPreOrder}`, {
    //   tripId: selectedRoute.tripId,
    //   configId: BookingUtil.getConfigurationId(),
    //   amount: selectedRoute.payableAmount, // in paisa
    //   tripDetail: {
    //     routeId: selectedRoute.routeId,
    //     startStopId: selectedRoute.fromStopId,
    //     endStopId: selectedRoute.toStopId,
    //   },
    //   passengerDetails: [
    //     {
    //       id: 'child',
    //       count: 0,
    //     },
    //     {
    //       id: 'adult',
    //       count: BookingUtil.getBookingState().ticketCount,
    //     },
    //   ],
    //   userDetail: {
    //     mobileNo: passengerDetails.phoneNumber && validateDetails()? passengerDetails.phoneNumber: '',
    //     email: '',
    //     gender: passengerDetails.gender || '',
    //   },
    //   promoterDetail: {
    //     id: AuthUtil.getUserId(),
    //     name: AuthUtil.getName(),
    //   },
    // }, {
    //   headers: {
    //     source : 4,
    //     appVer : Constants.APP_VERSION.B,
    //     deviceId : '',
    //     accessToken : AuthUtil.getSessionId(),
    //     authType : 'ASD',
    //   }
    // }).then((res: any) => {
    //   const preOrder = res.data;
    //   console.log('res: ', res.data);
    //   dispatch(setPassengerId(preOrder.userId));
    //   dispatch(setPassengerDetailsInStore(passengerDetails));
    //   dispatch(createPreOrderDetailsInStore(preOrder));
    //   history.replace(Url.router.paymentOptions);
    // });
  };

  const submitDetails = () => {
    let { phoneNumber, gender, passengerName, coupon_code } = passengerDetails;
    HTTP.post(Url.api.user.createPassengers, {
      mobile_number: phoneNumber,
      profile: {
        name: passengerName,
        gender,
      },
      coupon_code,
    })
      .then((res) => {
        if (res.data && res.data.data) {
          let user = res.data.data;
          dispatch(setPassengerId(user.id));
          dispatch(setPassengerCouponId(user.user_coupon_id));
          history.replace(Url.router.paymentOptions);
          dispatch(setPassengerDetailsInStore(passengerDetails));
        }
      })
      .catch((e) => {
        if (e.response) {
          let { error } = e.response.data;
          errorMessage = error.message;
          if (error.type !== 'VALIDATION_EXCEPTION') {
            setErrorMsg(error);
            return;
          }
        } else {
          errorMessage = Constants.defaultErrorMessage.message;
        }

        setShowPhoneError(errorMessage);
      });
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: window.innerHeight,
        position: 'relative',
      }}
    >
      <BackHeader Title={'Passenger details'} />
      <div style={{ padding: 16 }}>
        <TextField
          error={!!showPhoneError}
          variant='standard'
          fullWidth={true}
          type='number'
          id={Constants.PHONENUMBER}
          placeholder='Mobile Number'
          hiddenLabel
          helperText={showPhoneError ? showPhoneError : ''}
          InputProps={{ disableUnderline: true }}
          // inputStyle={{ color: Theme.colors.textPrimary }}
          value={passengerDetails.phoneNumber}
          onChange={handleChange}
        />
        <FormControl style={{ marginTop: '45px' }}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            id='gender'
            name='gender'
            value={passengerDetails.gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value={Constants.FEMALE}
              control={<Radio />}
              label='Female'
            />
            <FormControlLabel
              value={Constants.MALE}
              control={<Radio />}
              label='Male'
            />
            <FormControlLabel value='OTHER' control={<Radio />} label='Other' />
          </RadioGroup>
        </FormControl>
        <Divider style={{ marginBottom: '28px', marginTop: '16px' }} />
        <TextField
          variant='standard'
          fullWidth={true}
          id='passengerName'
          placeholder='Name'
          hiddenLabel
          InputProps={{ disableUnderline: true }}
          // inputStyle={{ color: Theme.colors.textPrimary }}
          value={passengerDetails.passengerName}
          onChange={handleChange}
        />
        <Divider style={{ marginTop: '28px', marginBottom: '28px' }} />
        {/* <TextField
          variant='standard'
          fullWidth={true}
          id='coupon_code'
          placeholder='Coupon Code (Optional)'
          hiddenLabel
          InputProps={{ disableUnderline: true }}
          value={passengerDetails.coupon_code}
          onChange={handleChange}
        />
        <Divider style={{ marginTop: '28px' }} /> */}
        <BottomCTA ctaOnClick={onsubmit} disabled={false} />
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

export default PassengerForm;
