import { Card, debounce, TextField } from '@mui/material';
import IconNavigationBack from 'components/backNavigation';
import Base from 'components/base';
import SearchResults from 'components/search/searchResults';
import React from 'react';
import Constants from 'constants/constants';
import HTTP from 'utils/http';
import Url from 'config/url';
import { withRouter } from 'react-router-dom';
import SearchUtil from 'utils/searchUtil';
import SearchLoaderGif from 'assets/svg/search_loader.gif';
import AlertDialog from 'components/AlertDialog';
import moment from 'moment';
import BookingUtil from 'utils/bookingUtil';
import AuthUtil from 'utils/authUtil';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      searchResults: [],
      showLoader: false,
      inputDisabled: false,
      errorMsg: '',
    };
  }

  /**
   * When the input changed
   * @param {String} userInput The input value of the user
   */
  onInputChange = (e) => {
    this.setState({ searchKeyword: e.target.value }, this.debounceSearch);
  };

  /**
   * On After the input got changed
   */
  onAfterInputChange = () => {
    this.getResults(this.state.searchKeyword);
  };

  getSearchStops = (constraint, params, city) => {
    const apiUrl = `${Url.api.scheduler_version}${city}${
      Url.api.searchStops
    }?${params.toString()}`;
    HTTP.get(apiUrl)
      .then((serverResponse) => {
        let serverList = [];
        if (serverResponse.data != null && serverResponse.data) {
          serverResponse.data.places.forEach((ele, index) => {
            serverList.push({
              ...serverResponse.data.places[index],
              ...serverResponse.data.stops[index],
            });
          });
          if (
            serverResponse.data.places &&
            !serverResponse.data.places.length
          ) {
            serverList = serverResponse.data.stops;
          }
        }

        this.setState({
          searchResults: serverList,
          showLoader: false,
        });
      })
      .catch((e) => {
        let errorMessage = 'Something went wrong';
        if (e.response) {
          errorMessage = e.response.data.error;
        }
        this.setState({
          showLoader: false,
          errorMsg: errorMessage,
        });
      });
  };

  getResults = async (constraint) => {
    if (constraint.length > 2) {
      this.setState({ showLoader: true });
      const location = BookingUtil.getLocation();
      const city = AuthUtil.getCity();
      const params = new URLSearchParams({
        str: constraint,
        day: moment().format('dddd').toLowerCase(),
        station_type: Constants.STATION_TYPE.TRANSIT,
        location: JSON.stringify(location),
      });
      this.getSearchStops(constraint, params, city);
    } else {
      this.setState({
        searchResults: [],
        showLoader: false,
      });
    }
  };

  debounceSearch = debounce(this.onAfterInputChange, 600);

  onResultSelect = (result, type, resultIndex) => {
    SearchUtil.setResult(result, this.props.match.params.type);
    this.cacheResultsForRecentSearches(JSON.stringify(result));
    this.props.history.goBack();
  };

  onFocusPreventScroll = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  };

  cacheResultsForRecentSearches(data) {
    new Promise(function (resolve, reject) {
      try {
        let search_1 = localStorage.getItem(Constants.SEARCH_RECENT_1);
        let search_2 = localStorage.getItem(Constants.SEARCH_RECENT_2);
        let search_3 = localStorage.getItem(Constants.SEARCH_RECENT_3);

        //check if any of them already has that data
        if (search_1 === data || search_2 === data || search_3 === data) {
          resolve('done');
          return;
        }

        if (search_2) {
          //2 has it
          localStorage.setItem(Constants.SEARCH_RECENT_3, search_2);
          localStorage.setItem(Constants.SEARCH_RECENT_2, search_1);
          localStorage.setItem(Constants.SEARCH_RECENT_1, data);
        } else if (search_1) {
          //move 1 to 2 and insert into 1
          localStorage.setItem(Constants.SEARCH_RECENT_2, search_1);
          localStorage.setItem(Constants.SEARCH_RECENT_1, data);
        } else {
          //we don't have any cached result
          localStorage.setItem(Constants.SEARCH_RECENT_1, data);
        }

        resolve('done');
      } catch (e) {
        reject(e);
      }
    }).then((resp) => {});
  }

  render() {
    return (
      <Base isToolbarEnabled={false} disableBackNav={true}>
        <Card style={{ margin: '12px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconNavigationBack color={'#4E4E4E'} />
            <div style={{ position: 'relative', width: '80%' }}>
              <TextField
                value={this.state.searchKeyword}
                placeholder='Search Location'
                hiddenLabel
                InputProps={{ disableUnderline: true }}
                type='search'
                variant='standard'
                id='searchLocationInput'
                disabled={this.state.inputDisabled}
                fullWidth={true}
                onChange={this.onInputChange}
                onFocus={this.onFocusPreventScroll}
                autoFocus
              />
              <img
                alt=''
                src={SearchLoaderGif}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  display: this.state.showLoader ? 'block' : 'none',
                }}
              />
            </div>
          </div>
        </Card>

        <SearchResults
          results={this.state.searchResults}
          onResultSelect={this.onResultSelect}
        />
        <AlertDialog
          open={!!this.state.errorMsg}
          title={'Error'}
          desc={this.state.errorMsg}
          onClose={() => {
            this.setState({ errorMsg: '' });
            this.props.history.goBack();
          }}
        />
      </Base>
    );
  }
}

export default withRouter(Search);
