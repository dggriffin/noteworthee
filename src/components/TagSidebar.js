import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {Chip} from 'material-ui';

export default class TagSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {sidebarOpen: this.props.sidebarOpen};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({sidebarOpen: nextProps.sidebarOpen});
  }

  renderTagList() {
    if (!this.props.tagList) {
      return null;
    }

    return this.props.tagList.map((tag) => {
      return <Chip>{tag.key}</Chip>
    });
  }

  render() {
    return (
      <div>
        <Drawer width={400} openSecondary={true} open={this.state.sidebarOpen} docked={false} onRequestChange={(sidebarOpen) => this.setState({sidebarOpen})}>
          <AppBar title="AppBar" />
          {this.renderTagList()}
        </Drawer>
      </div>
    );
  }
}
