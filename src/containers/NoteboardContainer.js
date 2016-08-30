import React from 'react';
import Noteboard from 'components/Noteboard'
import Rebase from 're-base';

const base = Rebase.createClass('https://noteworthyapp.firebaseio.com');

class NoteboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.mountNoteList(this.props.boardName);
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.boardName !== this.props.boardName) {
      base.removeBinding(this.ref);
      this.mountNoteList(nextProps.boardName);
    }
  }

  mountNoteList(boardName) {
    this.setState({loading: true});
    this.ref = base.syncState(`teams/${this.props.teamName}/${boardName}`, {
      context: this,
      state: 'notes',
      asArray: true,
      queries: {
        orderByChild: 'likes'
      },
      then() {
        this.setState({loading: false});
        this.setNoteCount(this.props.boardName);
      }
    });
  }

  setNoteCount(boardName) {
    base.fetch(`teams/${this.props.teamName}/${boardName}`, {
      context: this,
      asArray: true,
      then(data) {
        localStorage.setItem(boardName, data.length);
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

  render() {
    return (
      <Noteboard
        notes={this.state.notes}
        loading={this.state.loading}
        {...this.props}
      />
    );
  }
}


export default NoteboardContainer;
