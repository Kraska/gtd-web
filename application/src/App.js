import React, { Component } from 'react';
import Main from './components/Main/Main';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './components/theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    );
  }
}

export default App;
