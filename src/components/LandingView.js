require('styles/index.css');

import styles from 'styles/App.css'
import React from 'react';
import Rebase from 're-base';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Noteboard from 'components/Noteboard';
import NoteDialog from 'components/NoteDialog';
import _ from 'underscore';


const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');
const darkMuiTheme = getMuiTheme(darkBaseTheme);


class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      dialogOpen: false,
      moodState: 'happy',
      messageValue: '',
      showHappy: true,
      showSad: true
    };
  }

  componentDidMount(){
    base.syncState(`notes`, {
      context: this,
      state: 'notes',
      asArray: true,
      queries: {
        orderByChild: 'likes'
      }
    });
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
    base.push(`archives/${new Date().toISOString().split('T')[0]}`, {
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

  handleMessageChange(event){
    this.setState({
      messageValue: event.target.value
    });
  }

  handleToggleHappy(){
    this.setState({showHappy: !this.state.showHappy});
  }

  handleToggleSad(){
    this.setState({showSad: !this.state.showSad});
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

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={styles.teamContent}>
          <div className={styles.boardList}>
            Test
          </div>
          <Noteboard
            notes={this.getFilteredNotes()}
            handleToggleHappy={this.handleToggleHappy.bind(this)}
            handleToggleSad={this.handleToggleSad.bind(this)}
            handleDialogOpen={this.handleDialogOpen.bind(this)}
            handleArchiveClick={this.handleArchiveClick.bind(this)}
            showHappy={this.state.showHappy}
            showSad={this.state.showSad}
          />
          <NoteDialog
            dialogOpen={this.state.dialogOpen}
            handleAddNote={this.addNote.bind(this)}
            handleDialogClose={this.handleDialogClose.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
