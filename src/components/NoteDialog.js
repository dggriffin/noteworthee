import styles from 'styles/Note.css';
import React from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import HappyIconBorder from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import SadIconBorder from 'material-ui/svg-icons/social/mood-bad';

export default class NoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageValue: '',
      moodState: 'happy',
      dialogOpen: this.props.dialogOpen
    };
  }

  handleDialogClose() {
    this.setState({dialogOpen: false});
    this.props.handleDialogClose();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dialogOpen: nextProps.dialogOpen});
  }

  handleMessageChange(event) {
    this.setState({
      messageValue: event.target.value
    });
  }

  handleMoodChange(event, value) {
    this.setState({moodState: value});
  }

  handleAddNote() {
    this.setState({
      dialogOpen: false
    });
    this.props.handleAddNote(this.state.messageValue, this.state.moodState);
    this.setState({messageValue: ''});
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
        onClick={this.handleAddNote.bind(this)}
        />

    ];

    return (
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
    );
  }
}

export default NoteDialog;
