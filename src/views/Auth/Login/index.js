// import React, { useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import styles from './login.module.css';
// import Theme from 'utils/theme';
// import HTTP from 'utils/http';
// import Url from 'config/url';
// import Base from 'components/base';
// import { useHistory } from 'react-router-dom';
// import AlertDialog from 'components/AlertDialog';
// import MobileLogin from 'icons/mobileLogin';
// import Constants from 'constants/constants';

// const Login = () => {
//   let [showPhoneError, setShowPhoneError] = useState(false);
//   let [phoneNumber, setPhoneNumber] = useState('');
//   let [displayLoader, setDisplayLoader] = useState(false);
//   let [errorMsg, setErrorMsg] = useState({ type: '', message: '' });
//   const history = useHistory();

//   const validateDetails = () => {
//     setShowPhoneError(false);

//     let isValid = true;

//     let number = parseInt(phoneNumber);
//     let pattern = new RegExp(/^[^.]*$/);

//     if (
//       !(
//         phoneNumber.length === 10 &&
//         isNaN(number) === false &&
//         pattern.test(phoneNumber)
//       )
//     ) {
//       isValid = false;
//       setShowPhoneError(true);
//     }

//     return isValid;
//   };

//   const onGetOtpClick = () => {
//     if (validateDetails()) {
//       setDisplayLoader(true);

//       let number = phoneNumber.trim();

//       //Make call and proceed to OTP
//       HTTP.post(Url.api.auth.initiate, {
//         mobile_number: number,
//       })
//         .then((response) => {
//           if (response.data) {
//             setDisplayLoader(false);

//             history.push(Url.router.authVerify + '?phone=' + number);
//           } else {
//             setDisplayLoader(false);
//             setErrorMsg(response.data.error);
//           }
//         })
//         .catch((e) => {
//           if (e.response) {
//             setErrorMsg(e.response.data.error);
//           } else {
//             setErrorMsg(Constants.defaultErrorMessage);
//           }
//           setDisplayLoader(false);
//         });
//     }
//   };

//   const onHandleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPhoneNumber(e.target.value.substring(0, 10));
//     if (showPhoneError) {
//       setShowPhoneError(false);
//     }
//   };

//   return (
//     <Base
//       isToolbarEnabled={false}
//       displayLoader={displayLoader}
//       disableBackNav={true}
//     >
//       <div className={styles.container}>
//         <div style={{ padding: Theme.spacing.high }}>
//           <div
//             style={{ textAlign: 'center', marginBottom: Theme.spacing.high }}
//           >
//             <div
//               style={{
//                 fontSize: Theme.font.large,
//                 fontWeight: 500,
//                 marginTop: Theme.spacing.low,
//                 marginBottom: Theme.spacing.high,
//               }}
//             >
//               LOGIN
//             </div>
//             <MobileLogin />
//           </div>

//           <TextField
//             error={!!showPhoneError}
//             variant='standard'
//             fullWidth={true}
//             type='number'
//             id='phoneNumberInput'
//             label={'Mobile Number (To Verify OTP)'}
//             helperText={
//               showPhoneError
//                 ? 'Please enter a valid 10 digit mobile number'
//                 : ''
//             }
//             value={phoneNumber}
//             onChange={onHandleChangePhone}
//           />

//           <Button
//             variant='contained'
//             id='proceedAuth'
//             size='large'
//             onClick={onGetOtpClick}
//             style={{
//               width: 259,
//               position: 'relative',
//               left: '50%',
//               marginLeft: '-130px',
//               marginTop: 20,
//             }}
//           >
//             Proceed
//           </Button>

//           <AlertDialog
//             open={!!errorMsg.type}
//             title={'Error'}
//             desc={errorMsg && errorMsg.message}
//             onClose={() => {
//               setErrorMsg({ type: '', message: '' });
//             }}
//           />
//         </div>
//       </div>
//     </Base>
//   );
// };

// export default Login;

import { useState } from 'react';
// import { Button, TextField } from '@mui/material';
// import styles from './login.module.css';
// import Theme from 'utils/theme';
import HTTP from 'utils/http';
import Url from 'config/url';
import Base from 'components/base';
import { useHistory } from 'react-router-dom';
// import AlertDialog from 'components/AlertDialog';
// import MobileLogin from 'icons/mobileLogin';
import Constants from 'constants/constants';
import { ChaloReactHybridLogin } from 'chalo-react-hybrid-login';
import 'chalo-react-hybrid-login/dist/index.css';
import jwt_decode from 'jwt-decode';
import AuthUtil from 'utils/authUtil';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'slices/home.Slice';

const Login = () => {
  let [showPhoneError, setShowPhoneError] = useState(false);
  let [phoneNumber, setPhoneNumber] = useState('');
  let [displayLoader, setDisplayLoader] = useState(false);
  let [errorMsg, setErrorMsg] = useState({ type: '', message: '' });
  const history = useHistory();
  const dispatch = useAppDispatch();

  const validateDetails = () => {
    setShowPhoneError(false);

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
      setShowPhoneError(true);
    }

    return isValid;
  };

  const onGetOtpClick = () => {
    if (validateDetails()) {
      setDisplayLoader(true);

      let number = phoneNumber.trim();

      //Make call and proceed to OTP
      HTTP.post(Url.api.auth.initiate, {
        mobile_number: number,
      })
        .then((response) => {
          if (response.data) {
            setDisplayLoader(false);

            history.push(Url.router.authVerify + '?phone=' + number);
          } else {
            setDisplayLoader(false);
            setErrorMsg(response.data.error);
          }
        })
        .catch((e) => {
          if (e.response) {
            setErrorMsg(e.response.data.error);
          } else {
            setErrorMsg(Constants.defaultErrorMessage);
          }
          setDisplayLoader(false);
        });
    }
  };

  const onHandleChangePhone = (e) => {
    setPhoneNumber(e.target.value.substring(0, 10));
    if (showPhoneError) {
      setShowPhoneError(false);
    }
  };

  return (
    <Base
      isToolbarEnabled={false}
      displayLoader={displayLoader}
      disableBackNav={true}
    >
      <ChaloReactHybridLogin
        clientId='chalo_postman'
        clientSecret='AkzeDXfVAd'
        redirectUri='http://localhost:3000/'
        hasMobileLogin={false}
        hasUserLogin={true}
        hasResetPw={false}
        hasGoogleLogin={false}
        onLoginResponse={(response) => {
          if (response.data && response.data.access_token) {
            AuthUtil.setSessionId(response.data.access_token);
            dispatch(setIsAuthenticated(true));
            const decoded = jwt_decode(response.data.access_token);
            let city = 'MUMBAI';
            if (
              decoded.authorities[0] &&
              decoded.authorities[0].roles[0]['roleInfo'] &&
              decoded.authorities[0].roles[0]['roleInfo'].length &&
              decoded.authorities[0].roles[0]['roleInfo'][0] &&
              decoded.authorities[0].roles[0]['roleInfo'][0].value
            ) {
              city = decoded.authorities[0].roles[0]['roleInfo'][0].value;
            }
            AuthUtil.setUser(
              decoded.name,
              '-', //email
              '-', //phNo
              response.data.access_token, //sessionId
              decoded.userId,
              '-',
              city,
            );
            history.replace(Url.router.home);
          } else {
            setDisplayLoader(false);
          }
        }}
      />
    </Base>
  );
};

export default Login;
