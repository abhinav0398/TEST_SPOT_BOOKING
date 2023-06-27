import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import BaseTheme from 'utils/theme';
import { CheckCircle } from '@mui/icons-material';

interface propType {
  showSucess: boolean;
  handleClose?: any;
}

const BookingSuccess = (props: propType) => {
  let { handleClose, showSucess } = props;
  if (!showSucess) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: BaseTheme.colors.white,
        zIndex: 999,
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
          onClick={handleClose}
          aria-label='close'
        >
          <CloseIcon sx={{ color: BaseTheme.colors.white }} />
        </IconButton>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '80%',
          justifyContent: 'center',
        }}
      >
        <CheckCircle
          style={{ height: '72px', width: '72px', color: '#5CB84B' }}
        />
        Booking Success
      </div>
      <div style={{ position: 'fixed', bottom: 16, left: 16, right: 16 }}>
        <Button
          fullWidth={true}
          variant='contained'
          size='large'
          style={{ marginTop: '37px', borderRadius: 0 }}
          onClick={handleClose}
        >
          <Typography>OKAY</Typography>
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccess;
