import { createTheme } from '@mui/material/styles';

const appBarHeight = 56;

const colors = {
  primary: '#f47c21',
  secondary: '#384248',
  header: '#384248',
  textPrimary: '#212121',
  textSecondary: '#7F7F7F',
  textDisabled: '#C4C4C4',
  background: '#f2f2f2',
  divider: '#f1f1f1',
  footer: '#6A7174',
  error: '#ff0303',
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  black: '#000000',
  black50: '#00000080',
  primary40: 'rgba(244, 124, 33, 0.08)',
};

const BaseTheme = {
  muiTheme: createTheme({
    palette: {
      primary: {
        main: colors.primary,
        contrastText: colors.white,
      },
      secondary: {
        main: colors.secondary,
      },
      borderColor: colors.divider,
    },
    appBar: {
      height: appBarHeight,
    },
    button: {
      height: 40,
    },
  }),
  spacing: {
    low: '4px',
    base: '8px',
    medium: '12px',
    high: '16px',
    xhigh: '24px',
    cardMargin: '12px 8px',
  },
  font: {
    base: '14px',
    small: '12px',
    xsmall: '10px',
    medium: '16px',
    large: '20px',
    xlarge: '24px',
    huge: '34px',
  },
  border: '1px solid ' + colors.divider,
  appBarHeight: appBarHeight,
  colors: colors,
  borderRadius: 2,
};

export default BaseTheme;
