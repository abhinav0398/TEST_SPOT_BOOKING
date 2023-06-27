/**
 * @name app.js
 * @fileoverview Exports the frontend application as <App/> Component,
 * Initialises Application Routes using react-router and React components from /views.
 * Renders global state providers.
 */

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'routes';
import { ThemeProvider } from '@mui/material/styles';
import BaseTheme from 'utils/theme';
import 'utils/localization';
import './main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <ThemeProvider theme={BaseTheme.muiTheme}>
      <div id='container'>
        <Router>
          <Routes />
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
