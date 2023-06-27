import React from 'react';
import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { DirectionsBus, AccessTime } from '@mui/icons-material';
import Constants from 'constants/constants.js';
import Theme from '../../utils/theme.js';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheResults: null,
      showCacheResults: false,
    };
    this.listItemStyle = {
      fontSize: Theme.font.base,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: Theme.colors.textPrimary,
    };
  }

  componentDidMount() {
    if (this.props.results.length <= 0) {
      this.getCacheResultView();
    } else {
      this.setState({
        showCacheResults: false,
      });
    }
  }

  getCacheResultView() {
    var _this = this;

    new Promise(function (resolve, reject) {
      try {
        let search_1 = localStorage.getItem(Constants.SEARCH_RECENT_1);
        let search_2 = localStorage.getItem(Constants.SEARCH_RECENT_2);
        let search_3 = localStorage.getItem(Constants.SEARCH_RECENT_3);

        let returnDataList = [];
        if (search_1) returnDataList.push(search_1);

        if (search_2) returnDataList.push(search_2);

        if (search_3) returnDataList.push(search_3);

        var finalRenderList;
        if (returnDataList.length > 0) {
          finalRenderList = returnDataList.map(function (result, index) {
            var data = JSON.parse(result);
            return (
              <ListItem
                key={data.name}
                onClick={() => {
                  _this.props.onResultSelect(data, Constants.SEARCH_TYPE_CACHE);
                }}
              >
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <div key={data.name} style={_this.listItemStyle}>
                  {data.name}
                </div>
              </ListItem>
            );
          });
        }
        resolve(finalRenderList);
      } catch (e) {
        reject(e);
      }
    }).then(function (results) {
      _this.setState({
        cacheResults: results,
        showCacheResults: true,
      });
    });
  }

  render() {
    let renderedItems;
    let hasResults = false;

    if (this.props.results.length > 0) {
      hasResults = true;
      renderedItems = this.props.results.map((result, index) => {
        // if (result && result.place_id) {
        //   //this is google result
        //   return (
        //     <ListItem
        //       key={result.place_id}
        //       onClick={() => {
        //         this.props.onResultSelect(
        //           result,
        //           Constants.SEARCH_TYPE_GOOGLE,
        //           index,
        //         );
        //       }}
        //     >
        //       <ListItemIcon>
        //         <Place />
        //       </ListItemIcon>
        //       <div key={result.place_id} style={this.listItemStyle}>
        //         {result.description}
        //       </div>
        //     </ListItem>
        //   );
        // } else {

        //this is server result
        return (
          <ListItem
            key={result.place_id}
            divider
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.props.onResultSelect(
                result,
                Constants.SEARCH_TYPE_SERVER,
                index,
              );
            }}
          >
            <ListItemIcon
              style={{
                borderStyle: 'solid',
                borderWidth: 1,
                height: 56,
                width: 54,
                borderRadius: 30,
                display: 'flex',
                color: Theme.colors.black50,
                marginRight: ' 16px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DirectionsBus />
            </ListItemIcon>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                justifyContent: 'center',
              }}
            >
              <Typography
                key={result.place_id}
                style={{
                  ...this.listItemStyle,
                  fontSize: Theme.font.medium,
                  fontWeight: 600,
                }}
              >
                {result.stop_name}
              </Typography>
              <Typography
                key={result.place_id}
                style={{
                  ...this.listItemStyle,
                  color: Theme.colors.secondary,
                }}
              >
                {result.description}
              </Typography>
            </div>
          </ListItem>
        );
        // }
      });
    } else {
      renderedItems = '';
    }

    if (renderedItems) {
      return (
        <Card style={{ margin: '12px 8px 28px 8px' }}>
          {(() => {
            if (this.state.showCacheResults && !hasResults) {
              return (
                <CardHeader
                  title='Recent Searches'
                  titleStyle={{
                    fontSize: Theme.font.xsmall,
                    color: Theme.colors.textSecondary,
                    fontWeight: 300,
                    textTransform: 'uppercase',
                  }}
                  style={{ paddingBottom: 0 }}
                />
              );
            }
          })()}
          <List id='searchResults'>{renderedItems}</List>
        </Card>
      );
    } else {
      return null;
    }
  }
}

SearchResults.defaultProps = {
  searchResults: [],
};

export default SearchResults;
