import React from 'react';
import { ArrowBack } from '@mui/icons-material/';
import BaseTheme from 'utils/theme';
import { useHistory } from 'react-router-dom';

interface propType {
  Title: string;
  onBackClick?: Function;
  customTitle?: Function;
}

const BackHeader = (props: propType) => {
  let { Title, onBackClick = void 0, customTitle = void 0 } = props;
  let history = useHistory();
  return (
    <div
      style={{
        backgroundColor: BaseTheme.colors.header,
        color: BaseTheme.colors.white,
        padding: '16px 16px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <ArrowBack
        style={{ marginRight: 8 }}
        onClick={() => {
          onBackClick ? onBackClick() : history.goBack();
        }}
      />
      {customTitle && customTitle()}
      {Title}
    </div>
  );
};

export default BackHeader;
