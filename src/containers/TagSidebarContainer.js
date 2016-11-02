import React from 'react';
import Rebase from 're-base';
import TagSidebar from 'components/TagSidebar';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class TagSidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.mountTagList(this.props.teamName, this.props.boardName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamName !== this.props.teamName) {
      base.removeBinding(this.ref);
      this.mountBoardList(nextProps.teamName);
    }
  }

  mountTagList(teamName, boardName) {
    this.ref = base.syncState(`tags/${teamName}/${boardName}`, {
      context: this,
      state: 'tagList',
      asArray: true,
      then() {
        this.setState({loading: false});
      }
    });
  }

  render() {
    return (
      <TagSidebar
        {...this.props}
        loading={this.state.loading}
        tagList={this.state.tagList}
      />
    );
  }
}

export default TagSidebarContainer;
