import styles from 'styles/Noteboard.css';
import React from 'react';
import FlipMove from 'react-flip-move';
import Note from 'components/Note'
import { Paper, FlatButton, RaisedButton, CircularProgress } from 'material-ui';
import _ from 'underscore';

const defaultProps = {
  notes: [],
  loading: true,
  handleArchiveClick: () => {},
  handleDialogOpen: () => {}
};

class Noteboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSad: true,
      showHappy: true
    };
  }

  renderNotes() {
    return this.getFilteredNotes().map( note =>
      <div key={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`}>
        <Note id={`${note.dateCreated}-${this.props.teamName}-${this.props.boardName}`} index={note.key} team={this.props.teamName} board={this.props.boardName} />
      </div>
    );
  }

  getFilteredNotes() {
    return _.sortBy(_.filter(this.props.notes, (note) => {
      switch (note.mood) {
        case 'happy':
          return this.state.showHappy;
        case 'sad':
          return this.state.showSad;
      }
    }), 'likes').reverse();
  }

  handleToggleHappy(){
    this.setState({showHappy: !this.state.showHappy});
  }

  handleToggleSad(){
    this.setState({showSad: !this.state.showSad});
  }

  render() {
    return (
      <Paper style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#f7f7f7'}}>
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
              onClick={this.props.handleArchiveClick.bind(this)} />
            <RaisedButton
              label="+ Add Note"
              secondary={true}
              onClick={this.props.handleDialogOpen.bind(this)} />
          </div>
        </div>
        { this.props.loading ? <div style={{height: '82vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={3}/></div> :
          <FlipMove
            className={styles.content}
            enterAnimation="elevator"
            leaveAnimation="elevator">
            { this.renderNotes() }
          </FlipMove>
        }
      </Paper>
    );
  }
}

Noteboard.defaultProps = defaultProps;

export default Noteboard;
