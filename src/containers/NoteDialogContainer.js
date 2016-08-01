import React from 'react';
import NoteDialog from 'components/NoteDialog';
import Rebase from 're-base';
const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

export default class NoteDialogContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  addNote(message, moodState) {
    base.push(`teams/${this.props.teamName}/${this.props.boardName}`, {
      data: {
          message: message,
          dateCreated: new Date().getTime(),
          likes: 0,
          comments: [],
          mood: moodState
      }
    });
    this.props.handleDialogClose();
  }

  render() {
    return (
      <NoteDialog
        handleAddNote={this.addNote.bind(this)}
        {...this.props}
      />
    );
  }
}

export default NoteDialogContainer;
