import Base from 'components/base';
import { useEffect, useState } from 'react';
import FindShuttl from 'components/Home/findShuttl';
import MyBookingsDetail from 'components/myBookings';
import ProfileWhite from 'icons/profileWhite';
import BookingUtil from 'utils/bookingUtil';
import SearchUtil from 'utils/searchUtil';
import chalologo from 'assets/svg/chalo_logo_white.png';
import { clearSelectedRoute } from 'slices/routes.Slice';
import { clearPassengerData } from 'slices/passengerForm.Slice';
import { useAppDispatch } from 'hooks';

function Home() {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  // const [ticketCount, setTicketCount] = useState(1);
  const [myBookings, setMyBookings] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let searchResult = SearchUtil.getResult();
    if (searchResult) {
      BookingUtil.setBookingStateForType(
        searchResult.type,
        JSON.stringify(searchResult.location),
      );
    }

    let bookingState = BookingUtil.getBookingState();

    if (bookingState.source) {
      setSource(bookingState.source);
    }

    if (bookingState.destination) {
      setDestination(bookingState.destination);
    }
    // if (bookingState.ticketCount) {
    //   setTicketCount(parseInt(bookingState.ticketCount));
    // }

    let element = document.getElementById('root');

    if (element && element.style) {
      element.style.backgroundColor = '#f2f2f2';
    }

    // clear redux state
    dispatch(clearSelectedRoute());
    dispatch(clearPassengerData());

    return () => {
      if (element && element.style) {
        element.style.backgroundColor = '';
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Base
      title=''
      enableAccountIcon={true}
      displayLoader={displayLoader}
      disableBackNav={true}
    >
      <div
        style={{
          backgroundColor: '#3A4149',
          padding: '13px 22px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <img src={chalologo} alt='chalo' style={{ height: 25 }} />
        <div onClick={() => setMyBookings(true)} style={{ cursor: 'pointer' }}>
          <ProfileWhite />
        </div>
      </div>
      <FindShuttl
        source={source}
        destination={destination}
        // ticketCount={ticketCount}
      />
      {myBookings ? (
        <MyBookingsDetail
          setDisplayLoader={setDisplayLoader}
          onCloseClick={() => {
            setMyBookings(false);
          }}
        />
      ) : null}
    </Base>
  );
}

export default Home;
