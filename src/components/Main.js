require('styles/App.css');

import styles from 'styles/Main.css'
import React from 'react';
import Rebase from 're-base';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import NavBar from 'components/NavBar';
import Noteboard from 'components/Noteboard';
import {Paper, TextField} from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import HappyIconBorder from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import SadIconBorder from 'material-ui/svg-icons/social/mood-bad';
import Subheader from 'material-ui/Subheader';
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
  };

  handleDialogClose(){
    this.setState({dialogOpen: false});
  };

  handleMoodChange(event, value){
    this.setState({moodState: value});
  }

  handleMessageChange(event){
    this.setState({
      messageValue: event.target.value,
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
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.handleDialogClose.bind(this)}
        />
      ,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.addNote.bind(this)}
        />
      ,
    ];

    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <NavBar/>
          <Paper style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className={styles.toolbar}>
              <div style={{display: 'flex'}}>
                <FlatButton
                  label={this.state.showHappy ? 'Hide Happy' : 'Show Happy'}
                  secondary={true}
                  onClick={this.handleToggleHappy.bind(this)} />
                <FlatButton
                  label={this.state.showSad ? 'Hide Sad' : 'Show Sad'}
                  secondary={true}
                  onClick={this.handleToggleSad.bind(this)} />
              </div>
              <div style={{display: 'flex'}}>
                <FlatButton
                  label="Archive"
                  secondary={true}
                  onClick={this.handleArchiveClick.bind(this)} />
                <RaisedButton
                  label="+ Add Note"
                  secondary={true}
                  onClick={this.handleDialogOpen.bind(this)} />
              </div>
            </div>
            <Noteboard notes={this.getFilteredNotes()} />
          </Paper>

          <Dialog
            title="New Note"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose.bind(this)}
            >
            <TextField
              floatingLabelText="Message"
              style={{width:'100%'}}
              value={this.state.messageValue}
              onChange={this.handleMessageChange.bind(this)}
            />

            <div style={{paddingTop: '1em', fontSize: '2em', fontWeight: '100', justifyContent: 'center', display:'flex'}}>
              This message makes me feel...
            </div>

            <RadioButtonGroup
              style={{justifyContent: 'center', display:'flex'}}
              name="shipSpeed"
              defaultSelected="happy"
              valueSelected={this.state.moodState}
              onChange={this.handleMoodChange.bind(this)}
            >
              <RadioButton
                value="happy"
                checkedIcon={
                  <HappyIcon/>
                }
                uncheckedIcon={
                  <HappyIconBorder/>
                }
                iconStyle={{width: 100, height: 100}}
                style={{width: 'auto'}}
              />
              <RadioButton
                value="sad"
                checkedIcon={
                  <SadIcon/>
                }
                uncheckedIcon={
                  <SadIconBorder/>
                }
                iconStyle={{width: 100, height: 100}}
                style={{width: 'auto'}}
              />
            </RadioButtonGroup>
          </Dialog>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppComponent;
