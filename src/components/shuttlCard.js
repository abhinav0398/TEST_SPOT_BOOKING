import React from 'react';
import Card from '@mui/material/Card';
import BaseTheme from '../utils/theme';
import ShuttlCardHeader from './shuttlCardHeader';

class ShuttlCard extends React.Component {
  render() {
    return (
      <Card
        id={this.props.id}
        style={{
          margin: BaseTheme.spacing.cardMargin,
          position: 'relative',
        }}
        onClick={this.props.onTouchTap}
      >
        {(() => {
          if (this.props.title) {
            return <ShuttlCardHeader title={this.props.title} />;
          }
        })()}
        {this.props.children}
      </Card>
    );
  }
}

export default ShuttlCard;
