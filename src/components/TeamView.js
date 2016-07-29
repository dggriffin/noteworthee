require('styles/index.css');

import styles from 'styles/TeamView.css'
import React from 'react';
import Rebase from 're-base';
import NoteboardContainer from 'containers/NoteboardContainer';
import NoteDialog from 'components/NoteDialog';
import BoardSidebarContainer from 'containers/BoardSidebarContainer';
import { TextField, RaisedButton } from 'material-ui';
import { browserHistory} from 'react-router';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class TeamView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      moodState: 'happy',
      messageValue: '',
      boardValue: '',
      showHappy: true,
      showSad: true,
      ...props
    };
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

  handleMoodChange(value){
    this.setState({moodState: value});
  }

  handleBoardChange(event) {
    this.setState({boardValue: event.target.value});
  }

  handleBoardSubmit(){
     base.removeBinding(this.ref);
     browserHistory.push(`/${this.state.params.teamName}/${this.state.boardValue}`);
     this.ref = base.syncState(`teams/${this.state.params.teamName}/${this.state.boardValue}`, {
       context: this,
       state: 'notes',
       asArray: true,
       queries: {
         orderByChild: 'likes'
       }
     });
  }

  render() {
    return (
        <div className={styles.teamContent}>
          <BoardSidebarContainer
            teamName={this.state.params.teamName}
            boardName={this.state.params.boardName}
          />
          {
            this.state.params.boardName ?
            <NoteboardContainer
              handleDialogOpen={this.handleDialogOpen.bind(this)}
              handleArchiveClick={this.handleArchiveClick.bind(this)}
              teamName={this.state.params.teamName}
              boardName={this.state.params.boardName}
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
