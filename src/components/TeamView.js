require('styles/index.css');

import styles from 'styles/TeamView.css'
import React from 'react';
import Rebase from 're-base';
import Noteboard from 'components/Noteboard';
import NoteDialog from 'components/NoteDialog';
import { TextField, RaisedButton, MenuItem } from 'material-ui';
import { browserHistory, Link } from 'react-router';
import _ from 'underscore';
import Cookies from 'cookies-js';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');


class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      dialogOpen: false,
      moodState: 'happy',
      messageValue: '',
      boardValue: '',
      showHappy: true,
      showSad: true,
      boardsLoading: true,
      boardList: [],
      ...props
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
          this.setState({boardsLoading: false});
        }
      }
    });

    this.ref = base.syncState(`notes/${this.state.params.teamName}/${this.state.params.boardName}`, {
      context: this,
      state: 'notes',
      asArray: true,
      queries: {
        orderByChild: 'likes'
      },
      then() {
        this.setState({boardValue: this.state.params.boardName});
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({...nextProps});
  }

  addNote(){
    this.setState({
      notes: this.state.notes.concat([{
        message: this.state.messageValue,
        dateCreated: new Date().getTime(),
        likes: 0,
        comments: [],
        mood: this.state.moodState,
        key: `${this.state.notes.length}`
      }]),
      dialogOpen: false
    });
  }

  handleArchiveClick(){
    base.push(`archives/${this.state.params.teamName}/${this.state.params.boardName}/${new Date().toISOString().split('T')[0]}`, {
      data: this.state.notes
    });
    this.setState({
      notes: []
    });
  }

  resetNotes(){
    this.setState({
      notes: []
    });
  }

  handleDialogOpen(){
    this.setState({dialogOpen: true});
  }

  handleDialogClose(){
    this.setState({dialogOpen: false});
  }

  handleMessageChange(value){
    this.setState({
      messageValue: value
    });
  }

  handleToggleHappy(){
    this.setState({showHappy: !this.state.showHappy});
  }

  handleToggleSad(){
    this.setState({showSad: !this.state.showSad});
  }

  handleMoodChange(value){
    this.setState({moodState: value});
  }

  handleBoardChange(event) {
    this.setState({boardValue: event.target.value});
  }

  handleBoardSubmit(){
     base.removeBinding(this.ref);
     browserHistory.push(`/${this.state.params.teamName}/${this.state.boardValue}`);
     this.ref = base.syncState(`notes/${this.state.params.teamName}/${this.state.boardValue}`, {
       context: this,
       state: 'notes',
       asArray: true,
       queries: {
         orderByChild: 'likes'
       }
     });
  }

  handleBoardSelect(boardName){
    this.setState({boardValue: boardName});
    base.removeBinding(this.ref);
    browserHistory.push(`/${this.state.params.teamName}/${boardName}`);
    this.setState({loading: true});
    this.ref = base.syncState(`notes/${this.state.params.teamName}/${boardName}`, {
      context: this,
      state: 'notes',
      asArray: true,
      queries: {
        orderByChild: 'likes'
      },
      then() {
        this.setState({loading: false});
      }
    });
  }

  renderTeamBoards(){
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

  getFilteredNotes(){
    return _.sortBy(_.filter(this.state.notes, (note) => {
      switch (note.mood) {
        case 'happy':
          return this.state.showHappy;
        case 'sad':
          return this.state.showSad;
      }
    }), 'likes').reverse();
  }

  handleHomeClick(){
    this.setState({boardValue: ''});
  }

  render() {
    return (
        <div className={styles.teamContent}>
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
          {
            this.state.params.boardName ?
            <Noteboard
              notes={this.getFilteredNotes()}
              noteCount={this.state.notes.length}
              handleToggleHappy={this.handleToggleHappy.bind(this)}
              handleToggleSad={this.handleToggleSad.bind(this)}
              handleDialogOpen={this.handleDialogOpen.bind(this)}
              handleArchiveClick={this.handleArchiveClick.bind(this)}
              showHappy={this.state.showHappy}
              showSad={this.state.showSad}
              team={this.state.params.teamName}
              board={this.state.params.boardName}
              loading={this.state.loading}
            /> :
            <div className={styles.noBoard}>
              Welcome to the <b style={{color: '#EF5A8F'}}>{this.state.params.teamName} noteworthee!</b>
              <br/>
              Create a board and get jotting!
              <div>
                <TextField
                  floatingLabelText="Enter Board Name"
                  value={this.state.boardValue}
                  onChange={this.handleBoardChange.bind(this)}
                  style={{fontWeight: '500'}}
                />
                <RaisedButton
                  secondary={true}
                  label='Go!'
                  style={{height: '100%'}}
                  labelStyle={{height:'100%', fontSize: '1em'}}
                  onClick={this.handleBoardSubmit.bind(this)}
                />

              </div>
            </div>
          }
          <NoteDialog
            dialogOpen={this.state.dialogOpen}
            handleAddNote={this.addNote.bind(this)}
            handleDialogClose={this.handleDialogClose.bind(this)}
            handleMessageChange={this.handleMessageChange.bind(this)}
            handleMoodChange={this.handleMoodChange.bind(this)}
          />
        </div>
    );
  }
}

export default TeamView;
