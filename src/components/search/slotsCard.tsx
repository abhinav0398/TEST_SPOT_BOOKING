import React, { useEffect } from 'react';
import { ListItem, ListItemButton, Paper } from '@mui/material';
import DateTimeUtil from 'utils/dateTimeUtil';
import BaseTheme from 'utils/theme';
import ReserveSeat from 'assets/svg/reserve-seat-icon.svg';
import Circle from 'assets/svg/circle.svg';
import BookingUtil from 'utils/bookingUtil';

const SlotsCard = (props: any) => {
  const { slot, SlotIndex, cardOnClick, selectedIndex, adultFare } = props;
  const selectedRoute = BookingUtil.getSelectedRoute();
  const { tripId, availableSeats, fromStopTime, toStopTime } = slot;

  const tags: any = [];
  const bookable = false;
  const { toStopName, fromStopName } = selectedRoute;

  // if (!bookable) {
  //   return null;
  // }

  useEffect(() => {}, [adultFare]);

  const convertTime = (time: any, format: string) => {
    let etrTime = DateTimeUtil.formatAmPm(new Date(time));
    let etrMinutes = (new Date(time).valueOf() - new Date().valueOf()) / 60000;
    etrMinutes = Math.round(etrMinutes);
    return etrMinutes < 60 && etrMinutes > 0
      ? `${format} ${etrMinutes} mins`
      : `${format == 'Arrival at' ? format + ' ' : ''}${etrTime}`;
  };

  const { display_text = '' } = (tags && tags[0]) || {};
  let display_time = convertTime(fromStopTime, 'In');
  let arrival_time = convertTime(toStopTime, 'Arrival at');

  let isDisabled = false;
  let isSelected = selectedIndex === SlotIndex;

  return (
    <Paper elevation={3} key={slot.tripId}>
      <ListItem
        key={slot.tripId}
        disablePadding
        sx={{
          backgroundColor: isSelected
            ? BaseTheme.colors.primary40
            : BaseTheme.colors.white,
          marginBottom: '12px',
          borderRadius: '8px',
        }}
        onClick={(e) => {
          return cardOnClick(e, SlotIndex);
        }}
      >
        <ListItemButton
          sx={{ display: 'flex', padding: '16px' }}
          selected={isSelected}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <div
              key={tripId}
              style={{
                display: 'flex',
                color: isDisabled
                  ? BaseTheme.colors.textDisabled
                  : BaseTheme.colors.textPrimary,
              }}
            >
              <div
                style={{
                  msFlex: '3 0 0',
                  WebkitFlex: '3 0 0',
                  // flex: '3 0 0',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <b
                    style={{
                      fontSize: BaseTheme.font.medium,
                      fontWeight: '700',
                    }}
                  >
                    {display_time}
                  </b>
                  {slot.payableAmount ? (
                    <div>&#x20B9; {slot.payableAmount}</div>
                  ) : (
                    <div>{''}</div>
                  )}
                </div>

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <b
                    style={{
                      fontSize: BaseTheme.font.medium,
                      fontWeight: '500',
                    }}
                  >
                    {arrival_time}
                  </b>
                  <div>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={ReserveSeat} alt='ReserveSeat' />
                      {availableSeats}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ListItemButton>
      </ListItem>
    </Paper>
  );
};

export default SlotsCard;
