import styles from 'styles/Noteboard.css';
import React from 'react';
import FlipMove from 'react-flip-move';
import Note from 'components/Note'
import { Paper, FlatButton, RaisedButton } from 'material-ui';

class Noteboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  renderNotes() {
    return this.state.notes.map( note =>
      <div key={`${note.key}-${this.state.team}-${this.state.board}`}>
        <Note index={note.key} team={this.state.team} board={this.state.board} />
      </div>
    );
  }

  render() {
    return (
      <Paper style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
        <div className={styles.toolbar}>
          <div style={{display: 'flex'}}>
            <FlatButton
              label={this.state.showHappy ? 'Hide Happy' : 'Show Happy'}
              secondary={true}
              onClick={this.state.handleToggleHappy.bind(this)} />
            <FlatButton
              label={this.state.showSad ? 'Hide Sad' : 'Show Sad'}
              secondary={true}
              onClick={this.state.handleToggleSad.bind(this)} />
          </div>
          <div style={{display: 'flex'}}>
            <FlatButton
              label="Archive"
              secondary={true}
              onClick={this.state.handleArchiveClick.bind(this)} />
            <RaisedButton
              label="+ Add Note"
              secondary={true}
              onClick={this.state.handleDialogOpen.bind(this)} />
          </div>
        </div>
        <FlipMove
          className={styles.content}
          enterAnimation="elevator"
          leaveAnimation="elevator">
          { this.renderNotes() }
        </FlipMove>
      </Paper>
    );
  }
}


export default Noteboard;
