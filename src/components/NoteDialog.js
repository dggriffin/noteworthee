import styles from 'styles/Note.css';
import React from 'react';
import { Dialog, FlatButton, TextField } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import HappyIcon from 'material-ui/svg-icons/social/mood';
import HappyIconBorder from 'material-ui/svg-icons/social/mood';
import SadIcon from 'material-ui/svg-icons/social/mood-bad';
import SadIconBorder from 'material-ui/svg-icons/social/mood-bad';
import AddLink from 'components/AddLink';

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
    let newNote = {
      messageValue: this.state.messageValue,
      moodState: this.state.moodState,
      urlList: this.state.urlList
    };
    this.props.handleAddNote(newNote);

    this.setState({
      dialogOpen: false
    });
    
    this.setState({messageValue: ''});
  }

  handleUrlChange(urlList) {
    let trimmedList = urlList.filter((url) => {
      return url.trim().length > 0;
    });
    this.setState({urlList: trimmedList});
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

        <AddLink handleUrlChange={this.handleUrlChange.bind(this)}/>

        <div style={{paddingTop: '1em', fontSize: '1em', fontWeight: '300', justifyContent: 'center', display:'flex'}}>
          This message makes me feel...
        </div>

        <RadioButtonGroup
          style={{justifyContent: 'center', display:'flex'}}
          name="mood"
          defaultSelected="happy"
          valueSelected={this.state.moodState}
          onChange={this.handleMoodChange.bind(this)}
        >

          <RadioButton
            value="happy"
            checkedIcon={<HappyIcon/>}
            uncheckedIcon={<HappyIconBorder />}
            iconStyle={{width: 100, height: 100}}
            style={{width: 'auto'}}
          />

          <RadioButton
            value="sad"
            checkedIcon={<SadIcon/>}
            uncheckedIcon={<SadIconBorder/>}
            iconStyle={{width: 100, height: 100}}
            style={{width: 'auto'}}
          />

        </RadioButtonGroup>

      </Dialog>
    );
  }
}

export default NoteDialog;
