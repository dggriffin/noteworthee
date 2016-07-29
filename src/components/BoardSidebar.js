require('styles/index.css');
import styles from 'styles/BoardSidebar.css'
import React from 'react';
import { MenuItem } from 'material-ui';
import { Link } from 'react-router';

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
      return <div key={boardName} style={{cursor: 'pointer', backgroundColor: boardName === this.state.selectedBoard ? '#2D7288' : ''}}>
          <MenuItem onClick={this.handleBoardSelect.bind(this, boardName)} style={{fontWeight: diff ? 500 : 100, color:'white', textAlign: 'center'}}>
            {boardName}{`${diff ? ` (${diff})` : ''}`}
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
            <p style={{color:'white', textAlign: 'center'}}>Team Boards: </p>
            {this.state.boardsLoading ?
              <p style={{color:'white', textAlign: 'center', fontWeight: 100}}>Loading...</p>
           : this.renderTeamBoards()}
        </div>
      </div>
    );
  }
}

BoardSidebar.defaultProps = defaultProps;

export default BoardSidebar;
