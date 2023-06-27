import React from 'react';
import { LocationOn, RadioButtonChecked } from '@mui/icons-material';
import { Paper } from '@mui/material';
import IconNavigationBack from 'components/backNavigation';
import BaseTheme from 'utils/theme';
import BookingUtil from 'utils/bookingUtil';

const textStyle = {
  overflow: 'hidden',
  marginLeft: 16,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const SlotsSearchHeader = (props) => {
  let bookingState = BookingUtil.getSelectedRoute();
  let footerColor = '#ffffffcc';
  return (
    <Paper elevation={5}>
      <div
        style={{
          display: 'flex',
          backgroundColor: BaseTheme.colors.header,
          flexDirection: 'row',
          alignItems: 'flex-start',
          color: footerColor,
          paddingTop: 10,
          paddingLeft: 8,
        }}
      >
        <IconNavigationBack style={{ color: footerColor }} />
        <div style={{ overflow: 'hidden', paddingRight: 16, width: '80%' }}>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <RadioButtonChecked
              style={{ color: footerColor, height: 16, width: 16 }}
            />
            <div style={textStyle}>{bookingState.fromStopName}</div>
          </div>
          <div
            style={{
              backgroundColor: footerColor,
              height: '20px',
              width: '2px',
              marginLeft: '8px',
              marginTop: '4px',
              marginBottom: '4px',
            }}
          ></div>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <LocationOn style={{ color: footerColor, height: 16, width: 16 }} />
            <div style={textStyle}>{bookingState.toStopName}</div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default SlotsSearchHeader;
