import React from 'react';
import ShuttlCard from '../../components/shuttlCard.js';
import BaseTheme from '../../utils/theme';
import { Link, withRouter } from 'react-router-dom';
import Url from 'config/url';
import { Button, Divider } from '@mui/material';
import BookingUtil from 'utils/bookingUtil';
import AuthUtil from 'utils/authUtil.js';
import Constants from 'constants/constants.js';

const nameStyle = {
  fontSize: BaseTheme.font.base,
  marginLeft: 26,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const buttonStyle = {
  marginTop: BaseTheme.spacing.high,
  display: 'block',
  minWidth: 'auto',
};

const dotStyle = {
  height: '10px',
  width: '10px',
  display: 'inline-block',
  zIndex: 1,
  position: 'absolute',
  top: 3,
  marginRight: BaseTheme.spacing.high,
  WebkitBorderRadius: '10px',
  MozBorderRadius: '10px',
  msBorderRadius: '10px',
  borderRadius: '10px',
};

const counterButtonStyle = {
  color: 'black',
  borderColor: '#f47c21',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  '&:active': {
    backgroundColor: 'white',
  },
};

class FindShuttl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorMessage: false,
      ticketCount: 1,
    };
    this.onFindShuttlClick = this.onFindShuttlClick.bind(this);
    navigator.geolocation.watchPosition(function (position) {
      const location = {
        lat: position.coords.latitude.toString(),
        lon: position.coords.longitude.toString(),
      };
      BookingUtil.setLocation(location);
    });
  }

  componentDidMount() {
    if (
      localStorage.getItem('ticketCount') &&
      parseInt(localStorage.getItem('ticketCount'))
    ) {
      this.setState({
        ticketCount: parseInt(localStorage.getItem('ticketCount')),
      });
    }
  }

  incrementTicketCount = () => {
    if (this.state.ticketCount < 10) {
      this.setState({ ticketCount: this.state.ticketCount + 1 }, () => {
        localStorage.setItem('ticketCount', this.state.ticketCount);
        BookingUtil.setBookingStateForType(
          'ticketCount',
          this.state.ticketCount,
        );
      });
    }
  };
  decrementTicketCount = () => {
    if (this.state.ticketCount > 1) {
      this.setState({ ticketCount: this.state.ticketCount - 1 }, () => {
        localStorage.setItem('ticketCount', this.state.ticketCount);
        BookingUtil.setBookingStateForType(
          'ticketCount',
          this.state.ticketCount,
        );
      });
    }
  };

  onFindShuttlClick = () => {
    let { source, destination, history } = this.props;

    this.setState({
      showErrorMessage: false,
    });

    if (source && destination) {
      const soruceStopName = source.stop_name || source.description;
      const destinationStopName =
        destination.stop_name || destination.description;
      if (soruceStopName === destinationStopName) {
        this.setState({
          showErrorMessage: true,
        });
      } else {
        //navigate to slots screen
        history.push(Url.router.routesResult);
      }
    }
  };

  render() {
    let disableFindShuttl = false;
    let { source, destination } = this.props;

    if (!source && !destination) {
      disableFindShuttl = true;
    }

    let sourceText = source
      ? `${source.stop_name || ''}${
          source.stop_name && source.description ? ', ' : ''
        }${source.description || ''}`
      : 'Where are you?';

    let destinationText = destination
      ? `${destination.stop_name || ''}${
          destination.stop_name && destination.description ? ', ' : ''
        }${destination.description || ''}`
      : 'Where do you want to go?';

    return (
      <ShuttlCard title='Book Your Ride'>
        <div style={{ padding: BaseTheme.spacing.high, position: 'relative' }}>
          <div
            style={{
              marginTop: BaseTheme.spacing.base,
              marginBottom: BaseTheme.spacing.base,
            }}
          >
            <Link
              id='searchFrom'
              to='/search/source'
              style={{
                textDecoration: 'none',
                display: 'block',
                color: !source
                  ? BaseTheme.colors.textSecondary
                  : BaseTheme.colors.textPrimary,
              }}
            >
              <div
                style={{
                  marginBottom: BaseTheme.spacing.xhigh,
                  position: 'relative',
                }}
              >
                <div
                  style={Object.assign({ background: '#f47c21' }, dotStyle)}
                ></div>
                <div style={nameStyle}>{sourceText}</div>
              </div>
            </Link>

            <Divider
              style={{
                marginLeft: '26px',
                marginTop: BaseTheme.spacing.low,
                marginBottom: BaseTheme.spacing.low,
              }}
            />

            <Link
              id='searchTo'
              to='/search/destination'
              style={{
                textDecoration: 'none',
                display: 'block',
                color: !destination
                  ? BaseTheme.colors.textSecondary
                  : BaseTheme.colors.textPrimary,
              }}
            >
              <div
                style={{
                  marginTop: BaseTheme.spacing.xhigh,
                  position: 'relative',
                  marginBottom: BaseTheme.spacing.xhigh,
                }}
              >
                <div
                  style={Object.assign({ background: '#bc362b' }, dotStyle)}
                ></div>
                <div style={nameStyle}>{destinationText}</div>
              </div>
            </Link>
            <Divider
              style={{
                marginLeft: '26px',
                marginTop: BaseTheme.spacing.low,
                marginBottom: BaseTheme.spacing.low,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                marginLeft: '26px',
                fontSize: '14px',
              }}
            >
              Number Of Tickets
            </div>
            <div className='col-xl-1' style={{ width: '110px' }}>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <button
                    className='btn'
                    type='button'
                    onClick={this.decrementTicketCount}
                    style={counterButtonStyle}
                  >
                    -
                  </button>
                </div>
                <input
                  type='text'
                  className='form-control'
                  value={this.state.ticketCount}
                  readOnly
                  style={{
                    textAlign: 'center',
                    border: '0',
                  }}
                />
                <div className='input-group-prepend'>
                  <button
                    className='btn'
                    type='button'
                    onClick={this.incrementTicketCount}
                    style={{
                      color: 'black',
                      borderColor: '#f47c21',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {(() => {
            if (this.state.showErrorMessage) {
              return (
                <div
                  style={{
                    color: BaseTheme.colors.error,
                    marginTop: BaseTheme.spacing.medium,
                    fontSize: BaseTheme.font.small,
                  }}
                >
                  Source and Destination cannot be same
                </div>
              );
            }
          })()}

          <Button
            fullWidth={true}
            variant='contained'
            id='findMyShuttl'
            disabled={disableFindShuttl}
            style={buttonStyle}
            onClick={this.onFindShuttlClick}
          >
            Find Bus
          </Button>
        </div>
      </ShuttlCard>
    );
  }
}

export default withRouter(FindShuttl);
