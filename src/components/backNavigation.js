import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const IconNavigationBack = (props) => {
  const history = useHistory();
  const onNavBackClick = () => {
    history.goBack();
  };

  return (
    <IconButton id='backButton' style={props.style} onClick={onNavBackClick}>
      <ArrowBackIcon />
    </IconButton>
  );
};

IconNavigationBack.defaultProps = {
  color: '#4E4E4E',
  style: {
    margin: '4px 8px',
  },
};

export default IconNavigationBack;
