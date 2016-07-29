import React from 'react';
import Rebase from 're-base';
import BoardSidebar from 'components/BoardSidebar';
import { browserHistory } from 'react-router';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class BoardSidebarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.mountBoardList(this.props.teamName);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teamName !== this.props.teamName) {
      base.removeBinding(this.ref);
      this.mountBoardList(nextProps.teamName);
    }
  }

  mountBoardList(teamName) {
    this.ref = base.syncState(`teams/${teamName}`, {
      context: this,
      state: 'boardList',
      then() {
        this.setState({loading: false});
      }
    });
  }

  handleBoardSelect(boardName) {
    browserHistory.push(`/${this.props.teamName}/${boardName}`);
  }

  render() {
    return (
      <BoardSidebar
        {...this.props}
        loading={this.state.loading}
        handleBoardSelect={this.handleBoardSelect.bind(this)}
        boardList={this.state.boardList}
      />
    );
  }
}

export default BoardSidebarContainer;
