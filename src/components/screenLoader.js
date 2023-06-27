import React from 'react';

const loaderStyle = {
  zIndex: 999,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  WebkitAlignItems: 'center',
  WebkitBoxPack: 'center',
  msFlexPack: 'center',
  WebkitJustifyContent: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,.7)',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

class ScreenLoader extends React.Component {
  render() {
    return (
      <div style={{ display: this.props.isVisible ? 'block' : 'none' }}>
        <div style={loaderStyle}>
          {/*<object data="/resources/images/loader.svg" type="image/svg+xml"></object>*/}
          <div
            className='uil-ripple-css'
            style={{ transform: 'scale(0.69)', height: 72, width: 72 }}
          >
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
//<img style={{height: '64px', width: '64px'}} src={process.env.REACT_APP_API_BASE_URL + "/resources/images/loader.svg"}/>
ScreenLoader.defaultProps = {
  isVisible: false,
};

export default ScreenLoader;
