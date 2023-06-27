import React from 'react';
import { Button } from '@mui/material';

interface propType {
  disabled: boolean;
  ctaOnClick?: () => null;
}

const BottomCTA = (props: propType) => {
  let { ctaOnClick, disabled = false } = props;
  return (
    <div
      style={{
        position: 'absolute',
        maxWidth: 600,
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 997,
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0px -2px 4px',
      }}
    >
      <Button
        variant='contained'
        size='large'
        disabled={disabled}
        fullWidth
        sx={{ borderRadius: 0 }}
        onClick={ctaOnClick}
      >
        Continue
      </Button>
    </div>
  );
};

export default BottomCTA;
