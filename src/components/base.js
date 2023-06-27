import React from 'react';
import ScreenLoader from './screenLoader.js';
import Constants from 'constants/constants.js';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: this.props.showAlert,
    };
    this.handleAlertDialog = this.handleAlertDialog.bind(this);
  }

  handleAlertDialog(enabled) {
    this.setState({ showAlert: enabled });
  }
  render() {
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <ScreenLoader isVisible={this.props.displayLoader} />
        {this.props.children}
      </div>
    );
  }
}

Base.defaultProps = {
  title: Constants.appName,
  isToolbarEnabled: true,
  displayLoader: false,
  disableToolbarShadow: false,
};

export default Base;
