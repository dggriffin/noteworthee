import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

export default class TagSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {sidebarOpen: this.props.sidebarOpen};
  }

  render() {
    return (
      <div>
        <Drawer width={200} openSecondary={false} open={this.state.sidebarOpen} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
    );
  }
}
