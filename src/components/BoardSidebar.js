require('styles/index.css');
import styles from 'styles/BoardSidebar.css'
import React from 'react';
import Rebase from 're-base';
import { MenuItem } from 'material-ui';
import { browserHistory, Link } from 'react-router';
import Cookies from 'cookies-js';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class BoardSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardValue: '',
      boardsLoading: true
    };
  }

  componentDidMount() {
    base.syncState(`notes/${this.state.params.teamName}`, {
      context: this,
      state: 'boardList',
      then(data){
        if (data) {
          this.setState({boardsLoading: false});
        }
        else {
          this.setState({boardsLoading: true});
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleBoardSelect(boardName) {
    this.setState({boardValue: boardName});
    base.removeBinding(this.ref);
    browserHistory.push(`/${this.state.params.teamName}/${boardName}`);
    this.setState({loading: true});
  }

  renderTeamBoards() {
    return Object.keys(this.state.boardList).map((boardName) => {
      var diff = Cookies.get(boardName) ? this.state.boardList[boardName].length - Cookies.get(boardName) : this.state.boardList[boardName].length;
      diff = diff < 0 ? 0 : diff;
      return <MenuItem
        onClick={this.handleBoardSelect.bind(this, boardName)}
        key={boardName}
        style={{backgroundColor: boardName === this.state.boardValue ? '#2D7288' : '', fontWeight: diff ? 500 : 100, color:'white', textAlign: 'center'}}>
        {boardName}{`${diff ? ` (${diff})` : ''}`}
      </MenuItem>;
    })
  }

  render() {
    return (
      <div className={styles.boardList}>
        <div className={styles.boardListContent}>
          <div className={styles.boardListTitle}>
            <Link style={{textDecoration: 'none', color: 'white'}} onClick={this.handleHomeClick.bind(this)} to={`/${this.state.params.teamName}`}>
               {this.state.params.teamName}
            </Link>
          </div>
            <p style={{color:'white', textAlign: 'center'}}>Boards: </p>
            {this.state.boardsLoading ?
              <p style={{color:'white', textAlign: 'center', fontWeight: 100}}>Loading...</p>
           : this.renderTeamBoards()}
        </div>
      </div>
    );
  }
}

export default BoardSidebar;
