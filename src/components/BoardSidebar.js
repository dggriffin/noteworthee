require('styles/index.css');
import styles from 'styles/BoardSidebar.css'
import React from 'react';
import { MenuItem } from 'material-ui';
import { Link } from 'react-router';
import BulletIcon from 'material-ui/svg-icons/editor/format-list-bulleted';

const defaultProps = {
  boardList: [],
  loading: true,
  boardName: ''
};

class BoardSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBoard: this.props.boardName
    };
  }

  handleBoardSelect(selectedBoard) {
    this.setState({selectedBoard});
    this.props.handleBoardSelect(selectedBoard);
  }

  handleHomeClick(){
    this.setState({selectedBoard: ''});
  }

  renderTeamBoards() {
    return Object.keys(this.props.boardList).map((boardName) => {
      var diff = localStorage.getItem(boardName) ? this.props.boardList[boardName].length - localStorage.getItem(boardName) : this.props.boardList[boardName].length;
      diff = diff < 0 ? 0 : diff;
      return <div key={boardName} style={{cursor: 'pointer', backgroundColor: boardName === this.state.selectedBoard ? '#EF5A8F' : ''}}>
          <MenuItem onClick={this.handleBoardSelect.bind(this, boardName)} style={{fontWeight: diff ? 500 : 300, color:'white', textAlign: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <BulletIcon color='white'/> {boardName}{`${diff ? ` (${diff})` : ''}`}
            </div>
          </MenuItem>
      </div>;
    });
  }

  render() {
    return (
      <div className={styles.boardList}>
        <div className={styles.boardListContent}>
          <div className={styles.boardListTitle}>
            <Link style={{textDecoration: 'none', color: 'white'}} onClick={this.handleHomeClick.bind(this)} to={`/${this.props.teamName}`}>
               {this.props.teamName}
            </Link>
          </div>
            <p style={{color:'white', textAlign: 'center', fontWeight: 500}}>Team Boards</p>
            {this.state.boardsLoading ?
              <p style={{color:'white', textAlign: 'center', fontWeight: 100}}>Loading...</p>
           : this.renderTeamBoards()}
        </div>
        <div className={styles.footer}>
          Find a problem?
          <a
            target='_blank'
            href={'http://www.github.com/dggriffin/noteworthy/issues'}
            className={styles.link}>
            File an issue
          </a>
        </div>
      </div>
    );
  }
}

BoardSidebar.defaultProps = defaultProps;

export default BoardSidebar;
