import React from 'react';

import Theme from '../utils/theme.js';
import { CardHeader } from '@mui/material';

class ShuttlCardHeader extends React.Component {
  render() {
    return (
      <CardHeader
        title={this.props.title}
        titleTypographyProps={{
          fontSize: Theme.font.xsmall,
          color: Theme.colors.textSecondary,
          fontWeight: 300,
          textTransform: 'uppercase',
        }}
        style={{ paddingBottom: 0 }}
      />
    );
  }
}

export default ShuttlCardHeader;
