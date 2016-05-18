require('styles/index.css');

import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const darkMuiTheme = getMuiTheme(darkBaseTheme);

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
