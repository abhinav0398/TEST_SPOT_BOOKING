import React from 'react';
import { ListItem, ListItemButton, Paper } from '@mui/material';
import DateTimeUtil from 'utils/dateTimeUtil';
import BaseTheme from 'utils/theme';
import ReserveSeat from 'assets/svg/reserve-seat-icon.svg';
import Circle from 'assets/svg/circle.svg';

const RoutesCard = (props: any) => {
  const { slot, SlotIndex, cardOnClick, selectedIndex } = props;
  const { toStopName, fromStopName, fromStopId } = slot;

  let isDisabled = false;
  let isSelected = selectedIndex === SlotIndex;

  return (
    <Paper elevation={3} key={fromStopId}>
      <ListItem
        key={fromStopId}
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
              key={fromStopId}
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
                <div>
                  <div style={{}}>
                    <img
                      src={Circle}
                      alt='circle'
                      style={{
                        height: '10px',
                        width: '10px',
                        marginRight: '10px',
                      }}
                    />
                    <span
                      style={{
                        fontSize: BaseTheme.font.base,
                        color: BaseTheme.colors.black,
                        fontWeight: 500,
                      }}
                    >
                      {fromStopName}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: '16px',
                    width: '2px',
                    backgroundColor: BaseTheme.colors.black,
                    marginLeft: '4px',
                  }}
                />
                <div>
                  <div
                    style={{
                      marginBottom: BaseTheme.spacing.base,
                    }}
                  >
                    <img
                      src={Circle}
                      alt='circle'
                      style={{
                        height: '10px',
                        width: '10px',
                        marginRight: '10px',
                      }}
                    />
                    <span
                      style={{
                        color: BaseTheme.colors.black,
                        fontSize: BaseTheme.font.base,
                        fontWeight: 500,
                      }}
                    >
                      {toStopName}
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

export default RoutesCard;
